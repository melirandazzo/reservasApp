import * as SQLite from 'expo-sqlite';

let db

export const initDatabase = async () => {
    if (!db) {
        db = await SQLite.openDatabaseAsync('mundogeek.db');
    }
}

export const initSessionTable = async () => {
    //console.log("Iniciando tabla de sesiones")
    await initDatabase();
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS session (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      localId TEXT,
      email TEXT
    );
  `)
}

export const saveSession = async (localId, email) => {
    await initDatabase();
    await db.runAsync('DELETE FROM session WHERE localId = ?;', [localId]);
    await db.runAsync('INSERT INTO session (localId, email) VALUES (?, ?);', [localId, email]);
}

export const getSession = async () => {
    await initDatabase();
    const result = await db.getAllAsync('SELECT * FROM session LIMIT 1;');
    return result.length > 0 ? result[0] : null;
};

export const clearSession = async (localId) => {
    await initDatabase();
    await db.runAsync('DELETE FROM session WHERE localId = ?;', [localId]);
}