-- Maak de reviews tabel
CREATE TABLE reviews (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  car_bought  TEXT NOT NULL,
  text        TEXT NOT NULL,
  avatar      TEXT NOT NULL,
  published   BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Zet RLS (Row Level Security) aan
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Iedereen (ook niet-ingelogd) mag gepubliceerde reviews zien
CREATE POLICY "public_read_reviews" 
ON reviews FOR SELECT 
USING (published = true);

-- Ingelogde beheerders mogen alles zien, aanmaken, aanpassen en verwijderen
CREATE POLICY "admin_all_reviews" 
ON reviews FOR ALL 
USING (auth.role() = 'authenticated');
