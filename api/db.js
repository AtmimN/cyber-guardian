import fs from 'fs';
import path from 'path';
import { Redis } from '@upstash/redis';

// Cek konfigurasi Upstash Redis dari Environment Variables Vercel
const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

let redisClient = null;
if (redisUrl && redisToken) {
    try {
        redisClient = new Redis({
            url: redisUrl,
            token: redisToken
        });
        console.log('[DB] Upstash Redis connected successfully.');
    } catch (e) {
        console.warn('[DB] Failed to initialize Upstash Redis, fallback to local DB:', e.message);
    }
}

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

export async function readDb() {
    // 1. Prioritaskan Upstash Redis jika tersedia
    if (redisClient) {
        try {
            const data = await redisClient.get('cyber_guardian_db');
            if (data) {
                return typeof data === 'string' ? JSON.parse(data) : data;
            }
            // Jika belum ada record di Redis, simpan initialData
            await redisClient.set('cyber_guardian_db', initialData);
            return JSON.parse(JSON.stringify(initialData));
        } catch (err) {
            console.error('[DB] Redis read error, falling back to local storage:', err.message);
        }
    }

    // 2. Fallback ke file JSON lokal (untuk offline/testing)
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

export async function writeDb(data) {
    // 1. Simpan ke Upstash Redis jika tersedia
    if (redisClient) {
        try {
            await redisClient.set('cyber_guardian_db', data);
            return;
        } catch (err) {
            console.error('[DB] Redis write error, falling back to local storage:', err.message);
        }
    }

    // 2. Fallback simpan ke file JSON lokal
    ensureDbFile();
    try {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
        console.warn('Error writing DB file, updating memory fallback:', err.message);
    }
    memoryDb = data;
}
