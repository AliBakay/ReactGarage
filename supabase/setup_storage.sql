-- Maak de storage bucket 'car-images' aan als deze nog niet bestaat
INSERT INTO storage.buckets (id, name, public)
VALUES ('car-images', 'car-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Zorg ervoor dat iedereen afbeeldingen kan bekijken
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'car-images' );

-- Zorg ervoor dat ingelogde beheerders afbeeldingen kunnen uploaden
CREATE POLICY "Admin Upload Access"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'car-images' 
  AND auth.role() = 'authenticated'
);

-- Optioneel: Beheerders mogen ook afbeeldingen verwijderen
CREATE POLICY "Admin Delete Access"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'car-images' 
  AND auth.role() = 'authenticated'
);

-- Optioneel: Om alle test-auto's uit de database te verwijderen (Let op: dit wist alles!)
-- DELETE FROM cars;
