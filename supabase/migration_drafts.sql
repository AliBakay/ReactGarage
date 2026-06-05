-- 1. Verwijder alle bestaande auto's (en gekoppelde foto's door ON DELETE CASCADE)
-- Zodat we met een schone lei kunnen starten.
DELETE FROM cars;

-- 2. Voeg de 'status' kolom toe aan de cars tabel
ALTER TABLE cars 
ADD COLUMN status TEXT NOT NULL DEFAULT 'published' 
CHECK (status IN ('draft', 'published'));

-- 3. Zorg ervoor dat publieke gebruikers enkel 'published' auto's kunnen zien
-- Eerst droppen we de oude policy
DROP POLICY IF EXISTS "public_read" ON cars;

-- Dan maken we een nieuwe policy
CREATE POLICY "public_read" ON cars FOR SELECT USING (status = 'published');
