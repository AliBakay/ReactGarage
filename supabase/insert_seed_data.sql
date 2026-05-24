-- Insert BMW M4 Competition
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'BMW',
  'M4 Competition',
  2023,
  95000,
  12000,
  'gasoline',
  '{"horsepower": 503, "torque": 650, "engine": "3.0L Twin-Turbo Inline-6", "transmission": "8-Speed Automatic", "drivetrain": "RWD / AWD", "acceleration": "3.8s", "top_speed": 290, "seating": 4, "color": "Sao Paulo Yellow", "doors": 2}',
  true,
  'Pristine condition M4 Competition. Full service history and remaining factory warranty.'
);

-- Insert Porsche 911 Carrera S
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  'Porsche',
  '911 Carrera S',
  2022,
  135000,
  8500,
  'gasoline',
  '{"horsepower": 443, "torque": 530, "engine": "3.0L Twin-Turbo Flat-6", "transmission": "8-Speed PDK", "drivetrain": "RWD", "acceleration": "3.5s", "top_speed": 308, "seating": 4, "color": "Guards Red", "doors": 2}',
  true,
  'Iconic 911 in stunning Guards Red. Sport Chrono package included.'
);

-- Insert Tesla Model S Plaid
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '33333333-3333-3333-3333-333333333333',
  'Tesla',
  'Model S Plaid',
  2024,
  105000,
  3000,
  'electric',
  '{"horsepower": 1020, "torque": 1420, "engine": "Tri-Motor Electric", "transmission": "Single Speed", "drivetrain": "AWD", "acceleration": "1.99s", "top_speed": 322, "seating": 5, "color": "Solid Black", "doors": 4}',
  true,
  'Mind-bending performance. Yoke steering and full self-driving capability.'
);

-- Insert Mercedes-Benz G63 AMG
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '44444444-4444-4444-4444-444444444444',
  'Mercedes-Benz',
  'G63 AMG',
  2021,
  185000,
  35000,
  'gasoline',
  '{"horsepower": 577, "torque": 850, "engine": "4.0L Bi-Turbo V8", "transmission": "9-Speed Automatic", "drivetrain": "4WD", "acceleration": "4.5s", "top_speed": 240, "seating": 5, "color": "Obsidian Black", "doors": 5}',
  false,
  'Luxury off-roader with aggressive styling and immense power.'
);

-- Insert Audi RS6 Avant
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '55555555-5555-5555-5555-555555555555',
  'Audi',
  'RS6 Avant',
  2023,
  128000,
  18000,
  'hybrid',
  '{"horsepower": 591, "torque": 800, "engine": "4.0L Twin-Turbo V8 Mild Hybrid", "transmission": "8-Speed Automatic", "drivetrain": "Quattro AWD", "acceleration": "3.5s", "top_speed": 305, "seating": 5, "color": "Nardo Grey", "doors": 5}',
  true,
  'The ultimate family supercar. Finished in iconic Nardo Grey.'
);

-- Insert Mercedes-Benz CLA 180
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '66666666-6666-6666-6666-666666666666',
  'Mercedes-Benz',
  'CLA 180 SHOOTING BRAKE',
  2015,
  9750,
  216000,
  'gasoline',
  '{"horsepower": 122, "torque": 0, "engine": "1595 cc", "transmission": "6-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Grijs", "doors": 5}',
  true,
  'Topstaat! Belgische auto. Prijs: € 9750 incl. 1 JAAR GARANTIE. Zetelverwarming, Navi, Parkeersensoren.'
);

-- Insert Opel Combo
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '77777777-7777-7777-7777-777777777777', 'Opel', 'Combo Tour 1.3 CDTI', 2011, 3000, 190000, 'diesel',
  '{"horsepower": 75, "torque": 0, "engine": "1248 cc", "transmission": "5-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 2, "color": "Wit", "doors": 5}', false,
  'Deze wagen komt van eerste eigenaar wordt gekeurd voor verkoop met carpass. Lichte vracht.'
);

-- Insert BMW 325iA Coupé
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '88888888-8888-8888-8888-888888888888', 'BMW', '325iA Coupé LPG', 2007, 6950, 229000, 'gasoline',
  '{"horsepower": 218, "torque": 0, "engine": "2498 cc", "transmission": "Automatic", "drivetrain": "RWD", "acceleration": "N/A", "top_speed": 0, "seating": 4, "color": "Zwart", "doors": 3}', false,
  'LPG geldig tot 2033. Deze wagen start en rijdt nog perfect. Motor en versnellingsbak 100%.'
);

-- Insert Renault Trafic
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '99999999-9999-9999-9999-999999999999', 'Renault', 'Trafic 1.6 dCi L2H1', 2018, 7950, 220000, 'diesel',
  '{"horsepower": 125, "torque": 0, "engine": "1598 cc", "transmission": "6-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 3, "color": "Zwart", "doors": 5}', true,
  'Renault Trafic 1.6 dCi L2H1 LICHTE VRACHT.'
);

-- Insert BMW 320d GT
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'BMW', '320d GT Gran Turismo', 2015, 10000, 219000, 'diesel',
  '{"horsepower": 163, "torque": 0, "engine": "1995 cc", "transmission": "Automatic", "drivetrain": "RWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Zwart", "doors": 5}', true,
  'Volledig historie. Deze wagen wordt keuringsvrij afgeleverd met Detailverslag (80 controlepunten + Carpass en GARANTIE).'
);

-- Insert Volkswagen Golf 5
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Volkswagen', 'Golf 5 1.6 i', 2006, 4000, 168000, 'gasoline',
  '{"horsepower": 100, "torque": 0, "engine": "1595 cc", "transmission": "6-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Zwart", "doors": 5}', false,
  'Gekeurd voor verkoop met carpass, onmiddellijk beschikbaar.'
);

-- Insert Peugeot 207 Cabriolet
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  'cccccccc-cccc-cccc-cccc-cccccccccccc', 'Peugeot', '207 Cabriolet 1.6 hdi', 2009, 2000, 210000, 'diesel',
  '{"horsepower": 110, "torque": 0, "engine": "1560 cc", "transmission": "5-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 4, "color": "Zwart", "doors": 3}', false,
  'Peugeot 207 Cabriolet 1.6 hdi export!!!'
);

-- Insert Citroen Grand C4 Picasso
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  'dddddddd-dddd-dddd-dddd-dddddddddddd', 'Citroen', 'Grand C4 Picasso 1.6 HDi', 2017, 8000, 206000, 'diesel',
  '{"horsepower": 116, "torque": 0, "engine": "1560 cc", "transmission": "6-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 7, "color": "N/A", "doors": 5}', false,
  'Citroen C4 Grand Picasso 1.6 HDi 1°EIG. GARANTIE 7zit. Nette wagen binnen zoals buiten.'
);

-- Insert Renault Espace
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Renault', 'Espace 1.6 Blue dCi Intens', 2018, 14750, 105383, 'diesel',
  '{"horsepower": 160, "torque": 0, "engine": "1598 cc", "transmission": "Automatic", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Grijs", "doors": 5}', true,
  '100% ongevalvrije wagen ! Absolute Toptoestand ! Komt van eerste eigenaar.'
);

-- Insert Opel Astra Cabriolet
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  'ffffffff-ffff-ffff-ffff-ffffffffffff', 'Opel', 'Astra 1.6-16V BERTONE CABRIOLET', 2001, 3750, 250000, 'gasoline',
  '{"horsepower": 101, "torque": 0, "engine": "1598 cc", "transmission": "5-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 4, "color": "Grijs", "doors": 3}', false,
  'Deze wagen komt van eerste eigenaar Belgische auto in zeer goede staat interieur exterieur.'
);

-- Insert Opel Corsa
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '10000000-0000-0000-0000-000000000001', 'Opel', 'Corsa 1.4 i', 2007, 4750, 48000, 'gasoline',
  '{"horsepower": 90, "torque": 0, "engine": "1398 cc", "transmission": "5-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Grijs", "doors": 5}', false,
  'Opel Corsa 1.4 i benzine GARANTIE /KM 48.000 Pano Airco. Financiering mogelijk, snelle goedkeuring.'
);

-- Insert Mercedes E-Klasse
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '10000000-0000-0000-0000-000000000002', 'Mercedes-Benz', 'E-Klasse E 220 CDI Avantgarde', 2009, 7500, 227000, 'diesel',
  '{"horsepower": 163, "torque": 0, "engine": "2143 cc", "transmission": "Automatic", "drivetrain": "RWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Bruin", "doors": 5}', true,
  'Mercedes-Benz E 220 CDI Avantgarde AUTOMAAT. Deze wagen wordt verkocht met keuring en Carpass.'
);

-- Insert Renault Grand Scenic
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '10000000-0000-0000-0000-000000000003', 'Renault', 'Grand Scenic ENERGY TCe 130 BOSE', 2017, 10950, 106000, 'gasoline',
  '{"horsepower": 132, "torque": 0, "engine": "1198 cc", "transmission": "6-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 7, "color": "Rood", "doors": 5}', true,
  'Grand Scenic ENERGY TCe 130 BOSE EDITION 7PL. In alle emissiezones toegelaten.'
);

-- Insert Renault Laguna
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '10000000-0000-0000-0000-000000000004', 'Renault', 'Laguna 2.0 dCi 4Control', 2010, 3950, 237000, 'diesel',
  '{"horsepower": 150, "torque": 0, "engine": "1995 cc", "transmission": "6-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Zwart", "doors": 5}', false,
  'Renault Laguna 2.0 dCi 4Control pano Navi Xenon Leder. Prachtige staat !! Belgische voertuig.'
);

-- Insert Renault Kadjar
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '10000000-0000-0000-0000-000000000005', 'Renault', 'Kadjar 1.2 Tce S-Edition', 2018, 8950, 169583, 'gasoline',
  '{"horsepower": 131, "torque": 0, "engine": "1197 cc", "transmission": "6-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Grijs", "doors": 5}', true,
  'Renault Kadjar 1.2 Tce S-Edition LED Camera Navi 1de °EIG GARANTIE. 100% ongevalvrije wagen.'
);

-- Insert Ford Grand C-Max
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '10000000-0000-0000-0000-000000000006', 'Ford', 'Grand C-Max 1.6 TDCi', 2014, 6750, 166647, 'diesel',
  '{"horsepower": 116, "torque": 0, "engine": "1560 cc", "transmission": "6-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Grijs", "doors": 5}', false,
  'Ford Grand C-MAX 1.6 TDCi GARANTIE 1de °EIG. Distributieriem vervangen.'
);

-- Insert Peugeot Expert
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '10000000-0000-0000-0000-000000000007', 'Peugeot', 'Expert Combi 1.6HDi', 2012, 5350, 196000, 'diesel',
  '{"horsepower": 90, "torque": 0, "engine": "1560 cc", "transmission": "6-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 3, "color": "Wit", "doors": 5}', false,
  'Motors volledig gereviseerd nieuwe distributie. Nieuwe koppeling, nieuwe cilinderkop.'
);

-- Insert Volkswagen Passat Variant
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '10000000-0000-0000-0000-000000000008', 'Volkswagen', 'Passat Variant GTE 1.4 eHybrid', 2022, 17950, 195000, 'hybrid',
  '{"horsepower": 160, "torque": 0, "engine": "1395 cc", "transmission": "Automatic", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Grijs", "doors": 5}', true,
  'VW Passat GTE plug in "REAL" hybrid met slechts 38.g CO². Volledige onderhoudsbeurt en keuringsverslag.'
);

-- Insert Volkswagen Beetle Cabrio
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '10000000-0000-0000-0000-000000000009', 'Volkswagen', 'Beetle Cabrio 1.9 TDi', 2008, 5500, 209217, 'diesel',
  '{"horsepower": 105, "torque": 0, "engine": "1896 cc", "transmission": "5-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 4, "color": "Grijs", "doors": 3}', false,
  'Belgische wagen van eerste eigenaar. Volledig historie. Financiering mogelijk, snelle goedkeuring.'
);

-- Insert Opel Zafira
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '10000000-0000-0000-0000-00000000000a', 'Opel', 'Zafira OPC line 1.7 DTL CDTi', 2008, 2950, 354000, 'diesel',
  '{"horsepower": 125, "torque": 0, "engine": "1686 cc", "transmission": "6-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 7, "color": "Zwart", "doors": 5}', false,
  'Opel Zafira OPC line 1.7 DTL CDTi 92 kW airco+navi+7 zit. Start en rijdt nog perfect.'
);

-- Insert Porsche Cayenne
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '20000000-0000-0000-0000-000000000001', 'Porsche', 'Cayenne S E-HYBRID', 2015, 27500, 220677, 'hybrid',
  '{"horsepower": 453, "torque": 0, "engine": "2995 cc", "transmission": "Automatic", "drivetrain": "AWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Zwart", "doors": 5}', true,
  'PORSCHE CAYENNE S E - HYBRID 3.0i V6 PHEV Full GARANTIE. 100% ongevalvrije wagen!'
);

-- Insert Peugeot 3008
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '20000000-0000-0000-0000-000000000002', 'Peugeot', '3008 PureTech 130', 2016, 6750, 111000, 'gasoline',
  '{"horsepower": 131, "torque": 0, "engine": "1199 cc", "transmission": "6-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Zwart", "doors": 5}', false,
  'Peugeot 3008 PureTech 130 Stop benzine GARANTIE EUR6B. Met volledig historiek onderhoud.'
);

-- Insert Infiniti FX
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '20000000-0000-0000-0000-000000000003', 'Infiniti', 'FX 37 AWD 3.7 i V6', 2009, 12750, 223515, 'gasoline',
  '{"horsepower": 320, "torque": 0, "engine": "3696 cc", "transmission": "Automatic", "drivetrain": "AWD", "acceleration": "N/A", "top_speed": 0, "seating": 2, "color": "Bruin", "doors": 5}', true,
  'Infiniti FX 37 AWD 3.7 i V6 AUT. LICHTE VRACHT. BOSE muziekinstallatie. Geen BIV.'
);

-- Insert Peugeot 208
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '20000000-0000-0000-0000-000000000004', 'Peugeot', '208 1.2i PureTech STYLE', 2021, 10950, 62083, 'gasoline',
  '{"horsepower": 75, "torque": 0, "engine": "1199 cc", "transmission": "5-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "N/A", "doors": 5}', false,
  'Peugeot 208 1.2i PureTech STYLE 1°EIG. NEW STAAT 62.083 KM. Belgische wagen.'
);

-- Insert Renault Express
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '20000000-0000-0000-0000-000000000005', 'Renault', 'Express Confort 1.5Blue dCi', 2021, 8000, 149000, 'diesel',
  '{"horsepower": 95, "torque": 0, "engine": "1461 cc", "transmission": "6-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 2, "color": "Zwart", "doors": 5}', false,
  'Renault Express Confort 1.5Blue dCi LICHTE VRACHT. IN PERFECTE STAAT !! Eerst eigenaar Voor zelfstandigen btw aftrekbaar.'
);

-- Insert Opel Corsa
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '30000000-0000-0000-0000-000000000001', 'Opel', 'Corsa 1.4 i Turbo', 2017, 5750, 152000, 'gasoline',
  '{"horsepower": 90, "torque": 0, "engine": "1398 cc", "transmission": "5-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Grijs", "doors": 5}', false,
  'Opel Corsa 1.4 i Turbo EUR6b GARANTIE. 100% ongevalvrije wagen.'
);

-- Insert Peugeot 2008
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '30000000-0000-0000-0000-000000000002', 'Peugeot', '2008 1.2i PureTech Style', 2018, 6950, 113000, 'gasoline',
  '{"horsepower": 114, "torque": 0, "engine": "1199 cc", "transmission": "5-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Rood", "doors": 5}', true,
  'Peugeot 2008 1.2i PureTech Style Navi Cam pano. Belgische wagen.'
);

-- Insert Fiat Barchetta
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '30000000-0000-0000-0000-000000000003', 'Fiat', 'Barchetta Cabrio 1.8i 16V', 1996, 11950, 108944, 'gasoline',
  '{"horsepower": 131, "torque": 0, "engine": "1747 cc", "transmission": "5-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 2, "color": "Rood", "doors": 3}', false,
  'Fiat Barchetta Cabrio 1.8i benzine 16V 96Kw met Hard top oldtimer. Sport /Cabriolet GARANTIE oldtimer.'
);

-- Insert Peugeot 208 (Yellow)
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '30000000-0000-0000-0000-000000000004', 'Peugeot', '208 1.2i PureTech STYLE (Geel)', 2021, 11750, 62083, 'gasoline',
  '{"horsepower": 75, "torque": 0, "engine": "1199 cc", "transmission": "5-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Geel", "doors": 5}', false,
  'Peugeot 208 1.2i PureTech STYLE 1°EIG. NEW STAAT 62.083 KM. Belgische wagen.'
);

-- Insert Opel Insignia
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '30000000-0000-0000-0000-000000000005', 'Opel', 'Insignia Sports Tourer 2.0 CDTi', 2013, 3750, 274000, 'diesel',
  '{"horsepower": 160, "torque": 0, "engine": "1956 cc", "transmission": "Automatic", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Grijs", "doors": 5}', false,
  'Opel Insignia Sports Tourer 2.0 CDTi Automaat 118KW. Start en rijdt nog perfect.'
);

-- Insert Ford C-Max
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '30000000-0000-0000-0000-000000000006', 'Ford', 'C-Max 1.0i Ecoboost', 2013, 6450, 167000, 'gasoline',
  '{"horsepower": 125, "torque": 0, "engine": "998 cc", "transmission": "6-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Grijs", "doors": 5}', false,
  'Ford C-Max 1.0i Ecoboost 125 PK GARANTIE. Recente nieuwe distributieriem.'
);

-- Insert Fiat Bravo
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '30000000-0000-0000-0000-000000000007', 'Fiat', 'Bravo 1.6 Multijet Active', 2008, 2500, 234000, 'diesel',
  '{"horsepower": 90, "torque": 0, "engine": "1598 cc", "transmission": "6-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Grijs", "doors": 5}', false,
  'Fiat Bravo 1.6 Multijet Active. Recent nieuwe koppeling. Start en rijdt nog perfect.'
);

-- Insert Alfa Romeo Spider
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '40000000-0000-0000-0000-000000000001', 'Alfa Romeo', 'Spider 2.0 Twin Spark Cabrio', 1998, 5000, 268477, 'gasoline',
  '{"horsepower": 155, "torque": 0, "engine": "1970 cc", "transmission": "5-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 2, "color": "Rood", "doors": 3}', false,
  'Alfa Romeo Spider 2.0 Twin Spark Cabrio Airco. Start en rijdt perfect.'
);

-- Insert Mercedes E 500
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '40000000-0000-0000-0000-000000000002', 'Mercedes-Benz', 'E 500 V8 T 7G-TRONIC', 2003, 9750, 236000, 'gasoline',
  '{"horsepower": 385, "torque": 0, "engine": "4966 cc", "transmission": "Automatic", "drivetrain": "RWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Grijs", "doors": 5}', false,
  'Mercedes-Benz E 500 V8 T 7G-TRONIC Avantgarde. Start en rijdt perfect met Duits papieren.'
);

-- Insert Chevrolet Aveo
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '40000000-0000-0000-0000-000000000003', 'Chevrolet', 'Aveo 1.4 i 16v LT', 2009, 3750, 106660, 'gasoline',
  '{"horsepower": 100, "torque": 0, "engine": "1399 cc", "transmission": "5-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Zwart", "doors": 5}', false,
  'Chevrolet Aveo 1.4 i 16v LT Airco GARANTIE.'
);

-- Insert Opel Vectra
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '40000000-0000-0000-0000-000000000004', 'Opel', 'Vectra C 1.6 i', 2007, 3750, 148812, 'gasoline',
  '{"horsepower": 105, "torque": 0, "engine": "1598 cc", "transmission": "6-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Grijs", "doors": 5}', false,
  'Opel Vectra C 1.6 i Benzine. Belgische auto in zeer goede staat interieur exterieur.'
);

-- Insert Renault Grand Scenic (Blue)
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '40000000-0000-0000-0000-000000000005', 'Renault', 'Grand Scenic 1.6 i', 2013, 4250, 201000, 'gasoline',
  '{"horsepower": 110, "torque": 0, "engine": "1598 cc", "transmission": "6-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Blauw", "doors": 5}', false,
  'Renault Grand Scenic 1.6 i benzine Export!!!!'
);

-- Insert Kia Soul
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '40000000-0000-0000-0000-000000000006', 'Kia', 'Soul 1.6i AUTOMAAT FULL', 2016, 8950, 164000, 'gasoline',
  '{"horsepower": 132, "torque": 0, "engine": "1591 cc", "transmission": "Automatic", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Rood", "doors": 5}', false,
  'Kia Soul 1.6i AUTOMAAT FULL. Trekhaak afneembaar.'
);

-- Insert Peugeot 5008
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '40000000-0000-0000-0000-000000000007', 'Peugeot', '5008 GT Line 1.5 BlueHDI EAT8', 2020, 18950, 110712, 'diesel',
  '{"horsepower": 131, "torque": 0, "engine": "1499 cc", "transmission": "Automatic", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 7, "color": "Zwart", "doors": 5}', true,
  'Peugeot 5008 GT Line 1.5 BlueHDI EAT8 / 7 ZITPL / GPS / PDC+CAM. 100% ongevalvrije wagen!'
);

-- Insert Mercedes E 250 D
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '50000000-0000-0000-0000-000000000001', 'Mercedes-Benz', 'E 250 D OLDTiMER', 1995, 11750, 165000, 'diesel',
  '{"horsepower": 113, "torque": 0, "engine": "2497 cc", "transmission": "Automatic", "drivetrain": "RWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Bruin", "doors": 5}', true,
  'Mercedes-Benz E 250 D OLDTiMER AUTOMAAT NEW STAAT. Oldtimer perfecte staat.'
);

-- Insert Jaguar XE
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '50000000-0000-0000-0000-000000000002', 'Jaguar', 'XE 2.0 D E-Performance Prestige', 2016, 7500, 139000, 'diesel',
  '{"horsepower": 163, "torque": 0, "engine": "1968 cc", "transmission": "6-Speed Manual", "drivetrain": "RWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Grijs", "doors": 5}', false,
  'Jaguar XE 2.0 D E-Performance Prestige. Deze wagen wordt verkocht zo mee te nemen of export nieuwe distributieketting.'
);

-- Insert Chevrolet Aveo Diesel
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '50000000-0000-0000-0000-000000000003', 'Chevrolet', 'Aveo 1.3 Diesel', 2011, 3950, 110000, 'diesel',
  '{"horsepower": 95, "torque": 0, "engine": "1248 cc", "transmission": "5-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Grijs", "doors": 5}', false,
  'Chevrolet Aveo 1.3 Diesel EURO 5.'
);

-- Insert Chrysler PT Cruiser
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '50000000-0000-0000-0000-000000000004', 'Chrysler', 'PT Cruiser 2.0i 16v Limited', 2003, 1500, 112000, 'gasoline',
  '{"horsepower": 141, "torque": 0, "engine": "1996 cc", "transmission": "Automatic", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "N/A", "doors": 5}', false,
  'Chrysler PT Cruiser 2.0i 16v Limited AutoStick. export zo mee te nemen overname wagen.'
);

-- Insert Mercedes Sprinter
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '50000000-0000-0000-0000-000000000005', 'Mercedes-Benz', 'Sprinter 2.2 CDi', 2010, 7500, 297000, 'diesel',
  '{"horsepower": 110, "torque": 0, "engine": "2143 cc", "transmission": "Automatic", "drivetrain": "RWD", "acceleration": "N/A", "top_speed": 0, "seating": 9, "color": "Wit", "doors": 5}', false,
  'Mercedes-Benz Sprinter 2.2 CDi Automaat 9 zitplaats. Elektrische lift met afstandsbediening voor mensen met beperking.'
);

-- Insert Land Rover Range Rover Sport
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '50000000-0000-0000-0000-000000000006', 'Land Rover', 'Range Rover Sport 2.7 TdV6', 2007, 5750, 343000, 'diesel',
  '{"horsepower": 190, "torque": 0, "engine": "2720 cc", "transmission": "Automatic", "drivetrain": "4WD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Zwart", "doors": 5}', false,
  'Land Rover Range Rover Sport 2.7 TdV6 24V HSE. Harman Kardon geluidinstallatie.'
);

-- Insert Dacia Logan
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '50000000-0000-0000-0000-000000000007', 'Dacia', 'Logan 0.9 TCe', 2014, 3950, 111783, 'gasoline',
  '{"horsepower": 90, "torque": 0, "engine": "899 cc", "transmission": "5-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Zwart", "doors": 5}', false,
  'Dacia Logan 0.9 TCe Benzine Navi cruisecontrol.'
);

-- Insert MINI Cooper S
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '50000000-0000-0000-0000-000000000008', 'MINI', 'Cooper S 1.6i 16v', 2013, 9500, 136439, 'gasoline',
  '{"horsepower": 184, "torque": 0, "engine": "1598 cc", "transmission": "6-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 4, "color": "Zwart", "doors": 3}', true,
  'MINI Cooper S 1.6i 16v IN PERFECTE STAAT !! GARANTIE.'
);

-- Insert Opel Astra
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '60000000-0000-0000-0000-000000000001', 'Opel', 'Astra 1.6-16V BERTONE CABRIOLET', 2001, 2950, 250000, 'gasoline',
  '{"horsepower": 101, "torque": 0, "engine": "1598 cc", "transmission": "5-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 4, "color": "Grijs", "doors": 3}', false,
  'Opel Astra 1.6-16V BERTONE CABRIOLET eerste eigenaar.'
);

-- Insert VW Caddy
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '60000000-0000-0000-0000-000000000002', 'Volkswagen', 'Caddy Combi 1.6 Tdi', 2014, 6950, 149000, 'diesel',
  '{"horsepower": 75, "torque": 0, "engine": "1598 cc", "transmission": "5-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 2, "color": "Zwart", "doors": 5}', false,
  'Volkswagen Caddy 1.6 Tdi LICHTE VRACHT IN PERFECTE STAAT !! Eerst eigenaar.'
);

-- Insert Dodge RAM
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '60000000-0000-0000-0000-000000000004', 'Dodge', 'RAM Pickup 4.7 V8 LPG', 2008, 12750, 180000, 'other',
  '{"horsepower": 238, "torque": 0, "engine": "4701 cc", "transmission": "Automatic", "drivetrain": "4WD", "acceleration": "N/A", "top_speed": 0, "seating": 6, "color": "Bruin", "doors": 5}', true,
  'Dodge RAM Pickup 4.7 V8 LPG, LICHTE VRACHT zitplaats 6.'
);

-- Insert Citroen Grand C4 Picasso
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '60000000-0000-0000-0000-000000000005', 'Citroen', 'Grand C4 Picasso 1.6 HDi', 2012, 4500, 213000, 'diesel',
  '{"horsepower": 112, "torque": 0, "engine": "1560 cc", "transmission": "Automatic", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Rood", "doors": 5}', false,
  'Citroen C4 Picasso exclusief 1.6 HDi AUTOMAAT.'
);

-- Insert Renault Espace
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '60000000-0000-0000-0000-000000000006', 'Renault', 'Espace 1.6 Blue dCi Intens', 2018, 15950, 106000, 'diesel',
  '{"horsepower": 160, "torque": 0, "engine": "1598 cc", "transmission": "Automatic", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Grijs", "doors": 5}', true,
  'Renault Espace 1.6 Blue dCi Intens NAVI PANO CAM AUTOMATISCH.'
);

-- Insert Volvo S60
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '70000000-0000-0000-0000-000000000001', 'Volvo', 'S60 2.4i 20v', 2001, 2500, 230000, 'gasoline',
  '{"horsepower": 140, "torque": 0, "engine": "2435 cc", "transmission": "5-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Zwart", "doors": 5}', false,
  'Volvo S60 2.4i 20v EUR4. Belgische wagen volledig onderhoud historie.'
);

-- Insert Opel Astra Cabriolet 2009
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '70000000-0000-0000-0000-000000000002', 'Opel', 'Astra 1.6-16V CABRIOLET', 2009, 5950, 128000, 'gasoline',
  '{"horsepower": 115, "torque": 0, "engine": "1598 cc", "transmission": "5-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 4, "color": "Zwart", "doors": 3}', true,
  'Opel Astra 1.6-16V CABRIOLET 12M GARANTIE. Key card systeem zonder sleutel.'
);

-- Insert Citroen Berlingo
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '80000000-0000-0000-0000-000000000001', 'Citroen', 'Berlingo 1.6i Benzine', 2014, 4500, 227000, 'gasoline',
  '{"horsepower": 99, "torque": 0, "engine": "1598 cc", "transmission": "5-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Bruin", "doors": 5}', false,
  'Citroen Berlingo 1.6i Benzine 5PL Airco GARANTIE. Recent nieuwe koppeling.'
);

-- Insert Peugeot Bipper
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '80000000-0000-0000-0000-000000000002', 'Peugeot', 'Bipper 1.3 HDI Automaat', 2011, 5750, 212000, 'diesel',
  '{"horsepower": 75, "torque": 0, "engine": "1248 cc", "transmission": "Automatic", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 2, "color": "Grijs", "doors": 4}', false,
  'Peugeot Bipper 1.3 HDI / LICHTE VRACHT Automaat.'
);

-- Insert Volvo V60
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '90000000-0000-0000-0000-000000000001', 'Volvo', 'V60 2.0 i benzine', 2017, 9750, 202000, 'gasoline',
  '{"horsepower": 152, "torque": 0, "engine": "1969 cc", "transmission": "6-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Grijs", "doors": 5}', false,
  'Volvo V60 2.0 i benzine +T3 GARANTIE 152PK.'
);

-- Insert BMW X4 M40
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '90000000-0000-0000-0000-000000000002', 'BMW', 'X4 M40 3.0 dAS', 2019, 37950, 138000, 'diesel',
  '{"horsepower": 326, "torque": 0, "engine": "2993 cc", "transmission": "Automatic", "drivetrain": "AWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Grijs", "doors": 5}', true,
  'BMW X4 M40 3.0 dAS (326pk) M SPORT EUR6ei -GARANTIE. Harman Cardon muziekinstallatie.'
);

-- Insert Fiat Talento
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '90000000-0000-0000-0000-000000000003', 'Fiat', 'Talento 2.0 Multijet L2H1', 2020, 11950, 138000, 'diesel',
  '{"horsepower": 145, "torque": 0, "engine": "1997 cc", "transmission": "6-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 3, "color": "Zwart", "doors": 5}', false,
  'Fiat Talento 2.0 Multijet L2H1 145pk. LICHTE VRACHT.'
);

-- Insert Volkswagen Polo Oldtimer
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '90000000-0000-0000-0000-000000000004', 'Volkswagen', 'Polo Coupe Oldtimer', 1985, 6950, 48000, 'gasoline',
  '{"horsepower": 53, "torque": 0, "engine": "1035 cc", "transmission": "4-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 5, "color": "Rood", "doors": 3}', true,
  'Volkswagen Polo Coupe Oldtimer * 48.000 KM GARANTIE.'
);

-- Insert MPM Motors PS160
INSERT INTO cars (id, make, model, year, price, mileage, fuel_type, specs_json, featured, description)
VALUES (
  '90000000-0000-0000-0000-000000000005', 'MPM Motors', 'PS160 1.6i', 2018, 9750, 4000, 'gasoline',
  '{"horsepower": 100, "torque": 0, "engine": "1584 cc", "transmission": "5-Speed Manual", "drivetrain": "FWD", "acceleration": "N/A", "top_speed": 0, "seating": 4, "color": "Wit", "doors": 5}', true,
  'MPM Motors PS160 1.6i motor Mitsubishi 4.000 KM. Belgische wagen originele kilometer met carpass.'
);

-- Insert Car Images
INSERT INTO car_images (car_id, image_url, display_order, is_primary)
VALUES
-- BMW M4 Competition Images
('11111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1617814076367-b759c7d7e73a?q=80&w=1200&auto=format&fit=crop', 0, true),
('11111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1617814076778-98e6c43666f2?q=80&w=1200&auto=format&fit=crop', 1, false),

-- Porsche 911 Carrera S Images
('22222222-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1503376713356-20092c6c39f2?q=80&w=1200&auto=format&fit=crop', 0, true),
('22222222-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1580274455059-a86d26732dc2?q=80&w=1200&auto=format&fit=crop', 1, false),

-- Tesla Model S Plaid Images
('33333333-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop', 0, true),

-- Mercedes-Benz G63 AMG Images
('44444444-4444-4444-4444-444444444444', 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1200&auto=format&fit=crop', 0, true),

-- Audi RS6 Avant Images
('55555555-5555-5555-5555-555555555555', 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=1200&auto=format&fit=crop', 0, true),

-- Mercedes-Benz CLA 180 Images (Replace the placeholder URLs once you upload to Supabase)
('66666666-6666-6666-6666-666666666666', 'REPLACE_WITH_SUPABASE_STORAGE_URL_1', 0, true),
('66666666-6666-6666-6666-666666666666', 'REPLACE_WITH_SUPABASE_STORAGE_URL_2', 1, false),

-- Opel Combo Images
('77777777-7777-7777-7777-777777777777', 'REPLACE_WITH_SUPABASE_STORAGE_URL_OPEL', 0, true),

-- BMW 325iA Coupé Images
('88888888-8888-8888-8888-888888888888', 'REPLACE_WITH_SUPABASE_STORAGE_URL_BMW_COUPE', 0, true),

-- Renault Trafic Images
('99999999-9999-9999-9999-999999999999', 'REPLACE_WITH_SUPABASE_STORAGE_URL_RENAULT', 0, true),

-- BMW 320d GT Images
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'REPLACE_WITH_SUPABASE_STORAGE_URL_BMW_GT', 0, true),

-- Volkswagen Golf 5 Images
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'REPLACE_WITH_SUPABASE_STORAGE_URL_GOLF', 0, true),

-- Peugeot 207 Cabriolet Images
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'REPLACE_WITH_SUPABASE_STORAGE_URL_PEUGEOT', 0, true),

-- Citroen Grand C4 Picasso Images
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'REPLACE_WITH_SUPABASE_STORAGE_URL_CITROEN', 0, true),

-- Renault Espace Images
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'REPLACE_WITH_SUPABASE_STORAGE_URL_RENAULT_ESPACE', 0, true),

-- Opel Astra Cabriolet Images
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'REPLACE_WITH_SUPABASE_STORAGE_URL_OPEL_ASTRA', 0, true),

-- Opel Corsa Images
('10000000-0000-0000-0000-000000000001', 'REPLACE_WITH_SUPABASE_STORAGE_URL_OPEL_CORSA', 0, true),

-- Mercedes E-Klasse Images
('10000000-0000-0000-0000-000000000002', 'REPLACE_WITH_SUPABASE_STORAGE_URL_MERCEDES_E', 0, true),

-- Renault Grand Scenic Images
('10000000-0000-0000-0000-000000000003', 'REPLACE_WITH_SUPABASE_STORAGE_URL_RENAULT_SCENIC', 0, true),

-- Renault Laguna Images
('10000000-0000-0000-0000-000000000004', 'REPLACE_WITH_SUPABASE_STORAGE_URL_RENAULT_LAGUNA', 0, true),

-- Renault Kadjar Images
('10000000-0000-0000-0000-000000000005', 'REPLACE_WITH_SUPABASE_STORAGE_URL_RENAULT_KADJAR', 0, true),

-- Ford Grand C-Max Images
('10000000-0000-0000-0000-000000000006', 'REPLACE_WITH_SUPABASE_STORAGE_URL_FORD_CMAX', 0, true),

-- Peugeot Expert Images
('10000000-0000-0000-0000-000000000007', 'REPLACE_WITH_SUPABASE_STORAGE_URL_PEUGEOT_EXPERT', 0, true),

-- VW Passat Variant Images
('10000000-0000-0000-0000-000000000008', 'REPLACE_WITH_SUPABASE_STORAGE_URL_VW_PASSAT', 0, true),

-- VW Beetle Cabrio Images
('10000000-0000-0000-0000-000000000009', 'REPLACE_WITH_SUPABASE_STORAGE_URL_VW_BEETLE', 0, true),

-- Opel Zafira Images
('10000000-0000-0000-0000-00000000000a', 'REPLACE_WITH_SUPABASE_STORAGE_URL_OPEL_ZAFIRA', 0, true),

-- Porsche Cayenne Images
('20000000-0000-0000-0000-000000000001', 'REPLACE_WITH_SUPABASE_STORAGE_URL_PORSCHE_CAYENNE', 0, true),

-- Peugeot 3008 Images
('20000000-0000-0000-0000-000000000002', 'REPLACE_WITH_SUPABASE_STORAGE_URL_PEUGEOT_3008', 0, true),

-- Infiniti FX Images
('20000000-0000-0000-0000-000000000003', 'REPLACE_WITH_SUPABASE_STORAGE_URL_INFINITI_FX', 0, true),

-- Peugeot 208 Images
('20000000-0000-0000-0000-000000000004', 'REPLACE_WITH_SUPABASE_STORAGE_URL_PEUGEOT_208', 0, true),

-- Renault Express Images
('20000000-0000-0000-0000-000000000005', 'REPLACE_WITH_SUPABASE_STORAGE_URL_RENAULT_EXPRESS', 0, true),

-- Opel Corsa Images
('30000000-0000-0000-0000-000000000001', 'REPLACE_WITH_SUPABASE_STORAGE_URL_OPEL_CORSA', 0, true),

-- Peugeot 2008 Images
('30000000-0000-0000-0000-000000000002', 'REPLACE_WITH_SUPABASE_STORAGE_URL_PEUGEOT_2008', 0, true),

-- Fiat Barchetta Images
('30000000-0000-0000-0000-000000000003', 'REPLACE_WITH_SUPABASE_STORAGE_URL_FIAT_BARCHETTA', 0, true),

-- Peugeot 208 (Yellow) Images
('30000000-0000-0000-0000-000000000004', 'REPLACE_WITH_SUPABASE_STORAGE_URL_PEUGEOT_208_YELLOW', 0, true),

-- Opel Insignia Images
('30000000-0000-0000-0000-000000000005', 'REPLACE_WITH_SUPABASE_STORAGE_URL_OPEL_INSIGNIA', 0, true),

-- Ford C-Max Images
('30000000-0000-0000-0000-000000000006', 'REPLACE_WITH_SUPABASE_STORAGE_URL_FORD_CMAX', 0, true),

-- Fiat Bravo Images
('30000000-0000-0000-0000-000000000007', 'REPLACE_WITH_SUPABASE_STORAGE_URL_FIAT_BRAVO', 0, true),

-- Alfa Romeo Spider Images
('40000000-0000-0000-0000-000000000001', 'REPLACE_WITH_SUPABASE_STORAGE_URL_ALFA_SPIDER', 0, true),

-- Mercedes E 500 Images
('40000000-0000-0000-0000-000000000002', 'REPLACE_WITH_SUPABASE_STORAGE_URL_MERCEDES_E500', 0, true),

-- Chevrolet Aveo Images
('40000000-0000-0000-0000-000000000003', 'REPLACE_WITH_SUPABASE_STORAGE_URL_CHEVROLET_AVEO', 0, true),

-- Opel Vectra Images
('40000000-0000-0000-0000-000000000004', 'REPLACE_WITH_SUPABASE_STORAGE_URL_OPEL_VECTRA', 0, true),

-- Renault Grand Scenic (Blue) Images
('40000000-0000-0000-0000-000000000005', 'REPLACE_WITH_SUPABASE_STORAGE_URL_RENAULT_SCENIC_BLUE', 0, true),

-- Kia Soul Images
('40000000-0000-0000-0000-000000000006', 'REPLACE_WITH_SUPABASE_STORAGE_URL_KIA_SOUL', 0, true),

-- Peugeot 5008 Images
('40000000-0000-0000-0000-000000000007', 'REPLACE_WITH_SUPABASE_STORAGE_URL_PEUGEOT_5008', 0, true),

-- Mercedes E 250 D Images
('50000000-0000-0000-0000-000000000001', 'REPLACE_WITH_SUPABASE_STORAGE_URL_MERCEDES_E250D', 0, true),

-- Jaguar XE Images
('50000000-0000-0000-0000-000000000002', 'REPLACE_WITH_SUPABASE_STORAGE_URL_JAGUAR_XE', 0, true),

-- Chevrolet Aveo Diesel Images
('50000000-0000-0000-0000-000000000003', 'REPLACE_WITH_SUPABASE_STORAGE_URL_CHEVROLET_AVEO_DIESEL', 0, true),

-- Chrysler PT Cruiser Images
('50000000-0000-0000-0000-000000000004', 'REPLACE_WITH_SUPABASE_STORAGE_URL_CHRYSLER_PT_CRUISER', 0, true),

-- Mercedes Sprinter Images
('50000000-0000-0000-0000-000000000005', 'REPLACE_WITH_SUPABASE_STORAGE_URL_MERCEDES_SPRINTER', 0, true),

-- Land Rover Range Rover Sport Images
('50000000-0000-0000-0000-000000000006', 'REPLACE_WITH_SUPABASE_STORAGE_URL_RANGE_ROVER_SPORT', 0, true),

-- Dacia Logan Images
('50000000-0000-0000-0000-000000000007', 'REPLACE_WITH_SUPABASE_STORAGE_URL_DACIA_LOGAN', 0, true),

-- MINI Cooper S Images
('50000000-0000-0000-0000-000000000008', 'REPLACE_WITH_SUPABASE_STORAGE_URL_MINI_COOPER_S', 0, true),

-- Opel Astra Images
('60000000-0000-0000-0000-000000000001', 'REPLACE_WITH_SUPABASE_STORAGE_URL_OPEL_ASTRA', 0, true),

-- VW Caddy Images
('60000000-0000-0000-0000-000000000002', 'REPLACE_WITH_SUPABASE_STORAGE_URL_VW_CADDY', 0, true),

-- Dodge RAM Images
('60000000-0000-0000-0000-000000000004', 'REPLACE_WITH_SUPABASE_STORAGE_URL_DODGE_RAM', 0, true),

-- Citroen Grand C4 Picasso Images
('60000000-0000-0000-0000-000000000005', 'REPLACE_WITH_SUPABASE_STORAGE_URL_CITROEN_C4_PICASSO', 0, true),

-- Renault Espace Images
('60000000-0000-0000-0000-000000000006', 'REPLACE_WITH_SUPABASE_STORAGE_URL_RENAULT_ESPACE', 0, true),

-- Volvo S60 Images
('70000000-0000-0000-0000-000000000001', 'REPLACE_WITH_SUPABASE_STORAGE_URL_VOLVO_S60', 0, true),

-- Opel Astra Cabriolet 2009 Images
('70000000-0000-0000-0000-000000000002', 'REPLACE_WITH_SUPABASE_STORAGE_URL_OPEL_ASTRA_2009', 0, true),

-- Citroen Berlingo Images
('80000000-0000-0000-0000-000000000001', 'REPLACE_WITH_SUPABASE_STORAGE_URL_CITROEN_BERLINGO', 0, true),

-- Peugeot Bipper Images
('80000000-0000-0000-0000-000000000002', 'REPLACE_WITH_SUPABASE_STORAGE_URL_PEUGEOT_BIPPER', 0, true),

-- Volvo V60 Images
('90000000-0000-0000-0000-000000000001', 'REPLACE_WITH_SUPABASE_STORAGE_URL_VOLVO_V60', 0, true),

-- BMW X4 M40 Images
('90000000-0000-0000-0000-000000000002', 'REPLACE_WITH_SUPABASE_STORAGE_URL_BMW_X4', 0, true),

-- Fiat Talento Images
('90000000-0000-0000-0000-000000000003', 'REPLACE_WITH_SUPABASE_STORAGE_URL_FIAT_TALENTO', 0, true),

-- VW Polo Oldtimer Images
('90000000-0000-0000-0000-000000000004', 'REPLACE_WITH_SUPABASE_STORAGE_URL_VW_POLO', 0, true),

-- MPM Motors PS160 Images
('90000000-0000-0000-0000-000000000005', 'REPLACE_WITH_SUPABASE_STORAGE_URL_MPM_MOTORS', 0, true);
