-- Create the cars table
CREATE TABLE cars (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  make        TEXT NOT NULL,
  model       TEXT NOT NULL,
  year        INT  NOT NULL,
  price       NUMERIC(12,2) NOT NULL,
  mileage     INT  NOT NULL,
  fuel_type   TEXT NOT NULL CHECK (fuel_type IN ('gasoline','diesel','electric','hybrid')),
  images_url  TEXT[] NOT NULL DEFAULT '{}',
  specs_json  JSONB NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  featured    BOOLEAN NOT NULL DEFAULT false,
  description TEXT NOT NULL DEFAULT ''
);

-- Create indexes to improve filter query performance
CREATE INDEX idx_cars_price ON cars(price);
CREATE INDEX idx_cars_make  ON cars(make);
CREATE INDEX idx_cars_year  ON cars(year);
CREATE INDEX idx_cars_featured ON cars(featured);

-- Enable Row Level Security (RLS)
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

-- Allow public read access (anyone can view cars)
CREATE POLICY "public_read" ON cars FOR SELECT USING (true);

-- Allow authenticated users to perform writes (Admin write-access)
CREATE POLICY "admin_write" ON cars FOR ALL USING (auth.role() = 'authenticated');
