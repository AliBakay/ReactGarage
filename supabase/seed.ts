import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Read .env.local to get Supabase credentials
const envPath = path.join(process.cwd(), '.env.local');
let supabaseUrl = '';
let supabaseKey = '';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    if (line.startsWith('VITE_SUPABASE_URL=')) supabaseUrl = line.split('=')[1].trim();
    if (line.startsWith('VITE_SUPABASE_ANON_KEY=')) supabaseKey = line.split('=')[1].trim();
  });
}

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const mockCars = [
  {
    make: 'BMW',
    model: 'M4 Competition',
    year: 2023,
    price: 95000,
    mileage: 12000,
    fuel_type: 'gasoline',
    images_url: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e73a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617814076778-98e6c43666f2?q=80&w=1200&auto=format&fit=crop'
    ],
    specs_json: {
      horsepower: 503,
      torque: 650,
      engine: '3.0L Twin-Turbo Inline-6',
      transmission: '8-Speed Automatic',
      drivetrain: 'RWD / AWD',
      acceleration: '3.8s',
      top_speed: 290,
      seating: 4,
      color: 'Sao Paulo Yellow',
      doors: 2
    },
    featured: true,
    description: 'Pristine condition M4 Competition. Full service history and remaining factory warranty.'
  },
  {
    make: 'Porsche',
    model: '911 Carrera S',
    year: 2022,
    price: 135000,
    mileage: 8500,
    fuel_type: 'gasoline',
    images_url: [
      'https://images.unsplash.com/photo-1503376713356-20092c6c39f2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580274455059-a86d26732dc2?q=80&w=1200&auto=format&fit=crop'
    ],
    specs_json: {
      horsepower: 443,
      torque: 530,
      engine: '3.0L Twin-Turbo Flat-6',
      transmission: '8-Speed PDK',
      drivetrain: 'RWD',
      acceleration: '3.5s',
      top_speed: 308,
      seating: 4,
      color: 'Guards Red',
      doors: 2
    },
    featured: true,
    description: 'Iconic 911 in stunning Guards Red. Sport Chrono package included.'
  },
  {
    make: 'Tesla',
    model: 'Model S Plaid',
    year: 2024,
    price: 105000,
    mileage: 3000,
    fuel_type: 'electric',
    images_url: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop'
    ],
    specs_json: {
      horsepower: 1020,
      torque: 1420,
      engine: 'Tri-Motor Electric',
      transmission: 'Single Speed',
      drivetrain: 'AWD',
      acceleration: '1.99s',
      top_speed: 322,
      seating: 5,
      color: 'Solid Black',
      doors: 4
    },
    featured: true,
    description: 'Mind-bending performance. Yoke steering and full self-driving capability.'
  },
  {
    make: 'Mercedes-Benz',
    model: 'G63 AMG',
    year: 2021,
    price: 185000,
    mileage: 35000,
    fuel_type: 'gasoline',
    images_url: [
      'https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1200&auto=format&fit=crop'
    ],
    specs_json: {
      horsepower: 577,
      torque: 850,
      engine: '4.0L Bi-Turbo V8',
      transmission: '9-Speed Automatic',
      drivetrain: '4WD',
      acceleration: '4.5s',
      top_speed: 240,
      seating: 5,
      color: 'Obsidian Black',
      doors: 5
    },
    featured: false,
    description: 'Luxury off-roader with aggressive styling and immense power.'
  },
  {
    make: 'Audi',
    model: 'RS6 Avant',
    year: 2023,
    price: 128000,
    mileage: 18000,
    fuel_type: 'hybrid',
    images_url: [
      'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=1200&auto=format&fit=crop'
    ],
    specs_json: {
      horsepower: 591,
      torque: 800,
      engine: '4.0L Twin-Turbo V8 Mild Hybrid',
      transmission: '8-Speed Automatic',
      drivetrain: 'Quattro AWD',
      acceleration: '3.5s',
      top_speed: 305,
      seating: 5,
      color: 'Nardo Grey',
      doors: 5
    },
    featured: true,
    description: 'The ultimate family supercar. Finished in iconic Nardo Grey.'
  }
];

async function seed() {
  console.log('Seeding database...');
  for (const car of mockCars) {
    const { error } = await supabase.from('cars').insert(car);
    if (error) {
      console.error(`Error inserting ${car.make} ${car.model}:`, error.message);
    } else {
      console.log(`Inserted ${car.make} ${car.model}`);
    }
  }
  console.log('Seeding complete.');
}

seed();
