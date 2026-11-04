import express from 'express';
import cors from 'cors';
import { readDb, writeDb } from './db.js';

const app = express();

app.use(cors());
app.use(express.json());

// -------------------------------------------------------------
// HEALTH CHECK
// -------------------------------------------------------------
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'CyberShield Mission Backend API',
        timestamp: new Date().toISOString()
    });
});

// -------------------------------------------------------------
// CHECK USERNAME / STUDENT NAME UNIQUENESS
// -------------------------------------------------------------
app.get('/api/check-name', (req, res) => {
    try {
        const name = (req.query.name || '').trim().toLowerCase();
        if (!name) {
            return res.json({ available: false, message: 'Nama tidak boleh kosong.' });
        }
        const db = readDb();
        const exists = (db.leaderboard || []).some(
            entry => (entry.username || '').trim().toLowerCase() === name
        );
        if (exists) {
            return res.json({
                available: false,
                message: `Nama agen "${req.query.name}" sudah digunakan! Silakan gunakan nama unik lain.`
            });
        }
        return res.json({ available: true, message: 'Nama agen tersedia!' });
    } catch (err) {
        console.error('Check name error:', err);
        res.json({ available: true });
    }
});

// -------------------------------------------------------------
// LEADERBOARD: GET TOP PLAYERS
// -------------------------------------------------------------
app.get('/api/leaderboard', (req, res) => {
    try {
        const db = readDb();
        const list = (db.leaderboard || []).slice();

        // Sort: totalScore descending, then timeTakenSeconds ascending
        list.sort((a, b) => {
            if (b.totalScore !== a.totalScore) {
                return b.totalScore - a.totalScore;
            }
            return a.timeTakenSeconds - b.timeTakenSeconds;
        });

        // Add rank numbering
        const ranked = list.slice(0, 50).map((entry, idx) => ({
            rank: idx + 1,
            ...entry
        }));

        res.json({ leaderboard: ranked });
    } catch (err) {
        console.error('Get leaderboard error:', err);
        res.status(500).json({ error: 'Gagal mengambil data leaderboard.' });
    }
});

// -------------------------------------------------------------
// LEADERBOARD: SUBMIT SCORE (TANPA PASSWORD/LOGIN)
// -------------------------------------------------------------
app.post('/api/leaderboard/submit', (req, res) => {
    try {
        const { username, school, totalScore, timeTakenSeconds, badges } = req.body;

        const effectiveUser = (username && username.trim()) || 'Agen Rahasia';
        const effectiveSchool = (school && school.trim()) || 'SMA Pelajar';

        const scoreNum = Math.max(0, parseInt(totalScore, 10) || 0);
        const timeNum = Math.max(1, parseInt(timeTakenSeconds, 10) || 0);

        const db = readDb();
        if (!db.leaderboard) db.leaderboard = [];

        // Cek apakah username sudah ada di leaderboard
        const existingIdx = db.leaderboard.findIndex(
            e => e.username.toLowerCase() === effectiveUser.toLowerCase()
        );

        if (existingIdx !== -1) {
            // Perbarui hanya jika skor baru lebih tinggi atau sama dengan waktu lebih cepat
            const old = db.leaderboard[existingIdx];
            if (scoreNum > old.totalScore || (scoreNum === old.totalScore && timeNum < old.timeTakenSeconds)) {
                db.leaderboard[existingIdx] = {
                    ...old,
                    school: effectiveSchool,
                    totalScore: scoreNum,
                    timeTakenSeconds: timeNum,
                    badges: badges || old.badges || [],
                    completedAt: new Date().toISOString()
                };
            }
        } else {
            const newEntry = {
                id: 'lb_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
                username: effectiveUser,
                school: effectiveSchool,
                totalScore: scoreNum,
                timeTakenSeconds: timeNum,
                badges: badges || [],
                completedAt: new Date().toISOString()
            };
            db.leaderboard.push(newEntry);
        }

        writeDb(db);

        res.status(201).json({
            message: 'Skor berhasil dicatat ke Leaderboard Cyber Guardian!',
            entry: {
                username: effectiveUser,
                totalScore: scoreNum,
                timeTakenSeconds: timeNum
            }
        });
    } catch (err) {
        console.error('Submit leaderboard error:', err);
        res.status(500).json({ error: 'Gagal mencatat skor ke leaderboard.' });
    }
});

export default app;
