-- Insert BMW M4 Competition
INSERT INTO cars (make, model, year, price, mileage, fuel_type, images_url, specs_json, featured, description)
VALUES (
  'BMW',
  'M4 Competition',
  2023,
  95000,
  12000,
  'gasoline',
  ARRAY['https://images.unsplash.com/photo-1617814076367-b759c7d7e73a?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1617814076778-98e6c43666f2?q=80&w=1200&auto=format&fit=crop'],
  '{"horsepower": 503, "torque": 650, "engine": "3.0L Twin-Turbo Inline-6", "transmission": "8-Speed Automatic", "drivetrain": "RWD / AWD", "acceleration": "3.8s", "top_speed": 290, "seating": 4, "color": "Sao Paulo Yellow", "doors": 2}',
  true,
  'Pristine condition M4 Competition. Full service history and remaining factory warranty.'
);

-- Insert Porsche 911 Carrera S
INSERT INTO cars (make, model, year, price, mileage, fuel_type, images_url, specs_json, featured, description)
VALUES (
  'Porsche',
  '911 Carrera S',
  2022,
  135000,
  8500,
  'gasoline',
  ARRAY['https://images.unsplash.com/photo-1503376713356-20092c6c39f2?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1580274455059-a86d26732dc2?q=80&w=1200&auto=format&fit=crop'],
  '{"horsepower": 443, "torque": 530, "engine": "3.0L Twin-Turbo Flat-6", "transmission": "8-Speed PDK", "drivetrain": "RWD", "acceleration": "3.5s", "top_speed": 308, "seating": 4, "color": "Guards Red", "doors": 2}',
  true,
  'Iconic 911 in stunning Guards Red. Sport Chrono package included.'
);

-- Insert Tesla Model S Plaid
INSERT INTO cars (make, model, year, price, mileage, fuel_type, images_url, specs_json, featured, description)
VALUES (
  'Tesla',
  'Model S Plaid',
  2024,
  105000,
  3000,
  'electric',
  ARRAY['https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop'],
  '{"horsepower": 1020, "torque": 1420, "engine": "Tri-Motor Electric", "transmission": "Single Speed", "drivetrain": "AWD", "acceleration": "1.99s", "top_speed": 322, "seating": 5, "color": "Solid Black", "doors": 4}',
  true,
  'Mind-bending performance. Yoke steering and full self-driving capability.'
);

-- Insert Mercedes-Benz G63 AMG
INSERT INTO cars (make, model, year, price, mileage, fuel_type, images_url, specs_json, featured, description)
VALUES (
  'Mercedes-Benz',
  'G63 AMG',
  2021,
  185000,
  35000,
  'gasoline',
  ARRAY['https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1200&auto=format&fit=crop'],
  '{"horsepower": 577, "torque": 850, "engine": "4.0L Bi-Turbo V8", "transmission": "9-Speed Automatic", "drivetrain": "4WD", "acceleration": "4.5s", "top_speed": 240, "seating": 5, "color": "Obsidian Black", "doors": 5}',
  false,
  'Luxury off-roader with aggressive styling and immense power.'
);

-- Insert Audi RS6 Avant
INSERT INTO cars (make, model, year, price, mileage, fuel_type, images_url, specs_json, featured, description)
VALUES (
  'Audi',
  'RS6 Avant',
  2023,
  128000,
  18000,
  'hybrid',
  ARRAY['https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=1200&auto=format&fit=crop'],
  '{"horsepower": 591, "torque": 800, "engine": "4.0L Twin-Turbo V8 Mild Hybrid", "transmission": "8-Speed Automatic", "drivetrain": "Quattro AWD", "acceleration": "3.5s", "top_speed": 305, "seating": 5, "color": "Nardo Grey", "doors": 5}',
  true,
  'The ultimate family supercar. Finished in iconic Nardo Grey.'
);
