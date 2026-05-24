const fs = require('fs');

let sql = fs.readFileSync('supabase/insert_seed_data.sql', 'utf8');
let newSql = sql;
let cars = [...sql.matchAll(/INSERT INTO cars.*?VALUES\s*\(\s*'([^']+)',\s*'([^']+)',\s*'([^']+)'/gs)];

let imagesBlock = sql.split('INSERT INTO car_images')[1];
let inserts = imagesBlock.split(';');
let imageLines = inserts[0].split('\n');

cars.forEach(car => {
  let id = car[1];
  let make = car[2].toLowerCase().replace(/[^a-z0-9]+/g, '-');
  let model = car[3].toLowerCase().replace(/[^a-z0-9]+/g, '-');
  let slug = make + '-' + model;
  
  let lineIdx = imageLines.findIndex(l => l.includes(id));
  if(lineIdx !== -1) {
    imageLines[lineIdx] = imageLines[lineIdx].replace(/'REPLACE[^']+'/, `'https://jfhshiingwwoqhnbcxgy.supabase.co/storage/v1/object/public/car-images/${slug}.jpg'`);
  }
  
  // also check if there's a second image
  let secondLineIdx = imageLines.findIndex((l, i) => l.includes(id) && i !== lineIdx);
  if(secondLineIdx !== -1) {
    imageLines[secondLineIdx] = imageLines[secondLineIdx].replace(/'REPLACE[^']+'/, `'https://jfhshiingwwoqhnbcxgy.supabase.co/storage/v1/object/public/car-images/${slug}-2.jpg'`);
  }
});

newSql = sql.split('INSERT INTO car_images')[0] + 'INSERT INTO car_images' + imageLines.join('\n') + ';' + (inserts[1] || '');
fs.writeFileSync('supabase/insert_seed_data.sql', newSql);
console.log('Replaced URLs with slugs successfully!');
