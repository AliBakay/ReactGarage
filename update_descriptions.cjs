const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/aliba/.gemini/antigravity-ide/brain/ceea865d-f9c7-4a08-bc1a-2bf539c4fcb2/.system_generated/logs/transcript.jsonl')
});

let t = '';
rl.on('line', l => {
  try {
    let o = JSON.parse(l);
    if (o.type === 'USER_INPUT') t += '\n' + o.content;
  } catch(e) {}
}).on('close', () => {
  const cars = t.split(/Staat\r?\n/);
  let sql = fs.readFileSync('supabase/insert_seed_data.sql', 'utf8');
  let updated = 0;
  
  for(let car of cars) {
    if(!car.includes('Merk\r\n') && !car.includes('Merk\n')) continue;
    
    let lines = car.split(/\r?\n/).map(l => l.trim());
    let make='', model='', eq='', extra=[];
    let inExtra = false;
    
    for(let i=0; i<lines.length; i++) {
      if(lines[i]==='Merk') make = lines[i+1];
      if(lines[i]==='Model') model = lines[i+1];
      
      if(lines[i].includes('ABS / ') || lines[i].includes('ABS\r') || lines[i].includes('ABS\n') || lines[i].startsWith('ABS')) eq = lines[i];
      
      if(lines[i].startsWith('Bouwjaar: 20') || lines[i].startsWith('Bouwjaar: 19')) inExtra = true;
      if(inExtra && !lines[i].startsWith('Adres') && !lines[i].startsWith('Openingsuren') && !lines[i].includes('Zondag') && lines[i].length > 0) {
        extra.push(lines[i]);
      }
    }
    
    if(make && model) {
      let rMake = new RegExp(`'${make}'`, 'i');
      let mWord = model.split(' ')[0];
      let inserts = sql.split('INSERT INTO cars');
      
      for(let i=1; i<inserts.length; i++) {
        if(inserts[i].match(rMake) && inserts[i].includes(mWord)) {
          let parts = inserts[i].split(/,\s*'/);
          if(parts.length > 2) {
             let lastPart = parts[parts.length-1];
             let match = lastPart.match(/(.*)'\r?\n\);/s);
             
             if(match && match[1].length < 200) {
               let e = extra.join(' ').replace(/'/g, "''");
               let eqEscaped = eq.replace(/'/g, "''");
               let d = match[1] + '\\n\\nUitrusting:\\n' + eqEscaped + '\\n\\nInfo:\\n' + e;
               
               let newBlock = inserts[i].replace(/(.*),\s*'(.*)'\r?\n\);/s, `$1,\n  '${d}'\n);`);
               sql = sql.replace(inserts[i], newBlock);
               updated++;
             }
          }
        }
      }
    }
  }
  fs.writeFileSync('supabase/insert_seed_data.sql', sql);
  console.log('Updated ' + updated);
});
