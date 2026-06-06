ALTER TABLE reviews 
ADD COLUMN rating INT NOT NULL DEFAULT 5 
CHECK (rating >= 1 AND rating <= 5);
