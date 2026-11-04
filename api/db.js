import fs from 'fs';
import path from 'path';

const isVercel = Boolean(process.env.VERCEL);
const dbPath = isVercel
    ? path.join('/tmp', 'cyber_guardian_db.json')
    : path.join(process.cwd(), 'data', 'cyber_guardian_db.json');

// Initial seed data leaderboard
const initialData = {
    leaderboard: [
        {
            id: 'lb_1',
            username: 'Nayla_Sentinel',
            school: 'SMA 3 Bandung',
            totalScore: 9150,
            timeTakenSeconds: 38,
            badges: ['Integritas', 'Tanggung Jawab', 'Empati Privasi', 'Kebijaksanaan'],
            completedAt: new Date(Date.now() - 3600000 * 2).toISOString()
        },
        {
            id: 'lb_2',
            username: 'Rian_CyberShield',
            school: 'SMAN 8 Jakarta',
            totalScore: 8820,
            timeTakenSeconds: 46,
            badges: ['Integritas', 'Tanggung Jawab', 'Empati Privasi', 'Kebijaksanaan'],
            completedAt: new Date(Date.now() - 3600000 * 5).toISOString()
        },
        {
            id: 'lb_3',
            username: 'Fathir_AntiHoax',
            school: 'SMA Taruna Nusantara',
            totalScore: 8450,
            timeTakenSeconds: 54,
            badges: ['Integritas', 'Tanggung Jawab', 'Empati Privasi', 'Kebijaksanaan'],
            completedAt: new Date(Date.now() - 3600000 * 12).toISOString()
        },
        {
            id: 'lb_4',
            username: 'Dinda_Guardian',
            school: 'SMAN 1 Surabaya',
            totalScore: 7900,
            timeTakenSeconds: 68,
            badges: ['Integritas', 'Tanggung Jawab', 'Empati Privasi'],
            completedAt: new Date(Date.now() - 3600000 * 24).toISOString()
        }
    ]
};

let memoryDb = null;

function ensureDbFile() {
    try {
        const dir = path.dirname(dbPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        if (!fs.existsSync(dbPath)) {
            fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2), 'utf-8');
        }
    } catch (err) {
        console.warn('Filesystem access warning, falling back to in-memory DB:', err.message);
        if (!memoryDb) {
            memoryDb = JSON.parse(JSON.stringify(initialData));
        }
    }
}

export function readDb() {
    ensureDbFile();
    try {
        if (fs.existsSync(dbPath)) {
            const raw = fs.readFileSync(dbPath, 'utf-8');
            return JSON.parse(raw);
        }
    } catch (err) {
        console.warn('Error reading DB file, using memory fallback:', err.message);
    }
    if (!memoryDb) {
        memoryDb = JSON.parse(JSON.stringify(initialData));
    }
    return memoryDb;
}

export function writeDb(data) {
    ensureDbFile();
    try {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
        console.warn('Error writing DB file, updating memory fallback:', err.message);
    }
    memoryDb = data;
}
