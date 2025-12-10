-- Migration: Create vote table
-- Created: 2025-12-10

CREATE TABLE IF NOT EXISTS vote (
  id SERIAL PRIMARY KEY,
  value INTEGER NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_vote_user ON vote(user_name);
CREATE INDEX IF NOT EXISTS idx_vote_created_at ON vote(created_at);
