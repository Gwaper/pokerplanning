import { pool } from '../config/database';
import * as fs from 'fs';
import * as path from 'path';

async function runMigrations() {
  try {
    console.log('Starting migrations...');

    // Créer la table de suivi des migrations
    await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Lire tous les fichiers de migration
    const migrationsDir = __dirname;
    const files = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    for (const file of files) {
      const migrationName = file;

      // Vérifier si la migration a déjà été exécutée
      const result = await pool.query(
        'SELECT * FROM migrations WHERE name = $1',
        [migrationName]
      );

      if (result.rows.length > 0) {
        console.log(`✓ Migration ${migrationName} already executed, skipping...`);
        continue;
      }

      // Lire et exécuter la migration
      const migrationPath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(migrationPath, 'utf8');

      console.log(`Running migration: ${migrationName}...`);
      await pool.query(sql);

      // Enregistrer la migration comme exécutée
      await pool.query(
        'INSERT INTO migrations (name) VALUES ($1)',
        [migrationName]
      );

      console.log(`✓ Migration ${migrationName} executed successfully`);
    }

    console.log('All migrations completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();
