const fs = require('fs');

const data = {
  nl: {
    badges: ["✓ Volledig nagekeken", "✓ Inclusief CarPass", "✓ Transparante historie", "✓ Persoonlijke service"],
    why_us_sub: "Waarom voor ons kiezen?",
    why_us_title: "Uw vertrouwde garage in de buurt",
    features: [
      { title: "Gekeurd & Betrouwbaar", body: "Elk voertuig wordt grondig nagekeken en volledig gekeurd voordat het wordt aangeboden, zodat u veilig de weg op kan." },
      { title: "Kwalitatieve Occasions", body: "We bieden een eerlijk en zorgvuldig gekozen aanbod aan tweedehands auto's voor elk budget." },
      { title: "Eerlijke Prijzen", body: "Transparante prijzen zonder verborgen kosten of verrassingen achteraf. We houden het graag duidelijk." }
    ],
    testimonials_sub: "Wat klanten over ons zeggen",
    testimonials_title: "Tevreden klanten uit de regio",
    contact_sub: "Neem contact op",
    contact_title: "Heeft u een <1>vraag?</1>",
    contact_desc: "Kom gerust langs voor een kop koffie en een proefrit. We helpen u graag op weg!",
    filters: {
      title: "Filters", clear: "Wissen", search: "Zoeken", search_placeholder: "Merk, model...",
      make: "Merk", all_makes: "Alle merken", max_price: "Max Prijs", fuel: "Brandstof",
      year: "Bouwjaar", from: "Van", to: "Tot", cars_count: "{{count}} auto's"
    },
    detail: {
      loading: "Voertuig laden...", not_found: "Auto niet gevonden.", about: "Over deze auto", specs_title: "Technische Specificaties",
      specs: { engine: "Motor", power: "Vermogen", torque: "Koppel", transmission: "Transmissie", drivetrain: "Aandrijving", accel: "0–100 km/u", top_speed: "Topsnelheid", seats: "Zitplaatsen", color: "Kleur", doors: "Deuren", doors_unit: "deuren", seats_unit: "plaatsen" },
      inquiry: { title: "Informatie Aanvragen", subtitle: "Wij antwoorden binnen 24 uur", name: "Naam", email: "E-mail", phone: "Telefoon", message: "Bericht", submit: "Verstuur Aanvraag", call: "Direct Bellen", success_title: "Aanvraag verzonden!", success_desc: "We nemen binnen 24 uur contact met u op.", badges: ["Veilig", "Betrouwbaar", "Gekeurd"] }
    }
  },
  en: {
    badges: ["✓ Fully inspected", "✓ CarPass included", "✓ Transparent history", "✓ Personal service"],
    why_us_sub: "Why choose us?",
    why_us_title: "Your trusted local garage",
    features: [
      { title: "Inspected & Reliable", body: "Every vehicle is thoroughly checked and fully inspected before it is offered." },
      { title: "Quality Used Cars", body: "We offer an honest and carefully chosen selection of used cars for every budget." },
      { title: "Fair Prices", body: "Transparent prices without hidden costs or surprises." }
    ],
    testimonials_sub: "What clients say about us",
    testimonials_title: "Happy clients from the region",
    contact_sub: "Get in touch",
    contact_title: "Do you have a <1>question?</1>",
    contact_desc: "Feel free to drop by for a coffee and a test drive. We are happy to help!",
    filters: {
      title: "Filters", clear: "Clear", search: "Search", search_placeholder: "Make, model...",
      make: "Make", all_makes: "All makes", max_price: "Max Price", fuel: "Fuel",
      year: "Year", from: "From", to: "To", cars_count: "{{count}} cars"
    },
    detail: {
      loading: "Loading vehicle...", not_found: "Car not found.", about: "About this car", specs_title: "Technical Specifications",
      specs: { engine: "Engine", power: "Power", torque: "Torque", transmission: "Transmission", drivetrain: "Drivetrain", accel: "0–100 km/h", top_speed: "Top speed", seats: "Seats", color: "Color", doors: "Doors", doors_unit: "doors", seats_unit: "seats" },
      inquiry: { title: "Request Information", subtitle: "We reply within 24 hours", name: "Name", email: "E-mail", phone: "Phone", message: "Message", submit: "Send Request", call: "Call Directly", success_title: "Request sent!", success_desc: "We will contact you within 24 hours.", badges: ["Secure", "Reliable", "Inspected"] }
    }
  },
  tr: {
    badges: ["✓ Ekspertizli", "✓ CarPass dahil", "✓ Şeffaf geçmiş", "✓ Kişisel hizmet"],
    why_us_sub: "Neden bizi seçmelisiniz?",
    why_us_title: "Güvenilir yerel galeriniz",
    features: [
      { title: "Kontrollü & Güvenilir", body: "Satışa sunulmadan önce her araç detaylıca incelenir." },
      { title: "Kaliteli 2. El", body: "Her bütçeye uygun dürüst ve özenle seçilmiş araçlar sunuyoruz." },
      { title: "Dürüst Fiyatlar", body: "Gizli masraf veya sonradan sürprizler olmadan şeffaf fiyatlar." }
    ],
    testimonials_sub: "Müşterilerimiz ne diyor?",
    testimonials_title: "Bölgeden mutlu müşteriler",
    contact_sub: "İletişime geçin",
    contact_title: "Bir <1>sorunuz</1> mu var?",
    contact_desc: "Kahve içmek ve test sürüşü yapmak için uğramaktan çekinmeyin. Size yardımcı olmaktan mutluluk duyarız!",
    filters: {
      title: "Filtreler", clear: "Temizle", search: "Ara", search_placeholder: "Marka, model...",
      make: "Marka", all_makes: "Tüm markalar", max_price: "Maks. Fiyat", fuel: "Yakıt",
      year: "Yıl", from: "Başlangıç", to: "Bitiş", cars_count: "{{count}} araç"
    },
    detail: {
      loading: "Araç yükleniyor...", not_found: "Araç bulunamadı.", about: "Bu araç hakkında", specs_title: "Teknik Özellikler",
      specs: { engine: "Motor", power: "Güç", torque: "Tork", transmission: "Şanzıman", drivetrain: "Çekiş", accel: "0–100 km/s", top_speed: "Maks. hız", seats: "Koltuk", color: "Renk", doors: "Kapı", doors_unit: "kapı", seats_unit: "koltuk" },
      inquiry: { title: "Bilgi İste", subtitle: "24 saat içinde yanıtlıyoruz", name: "İsim", email: "E-posta", phone: "Telefon", message: "Mesaj", submit: "İstek Gönder", call: "Hemen Ara", success_title: "İstek gönderildi!", success_desc: "24 saat içinde sizinle iletişime geçeceğiz.", badges: ["Güvenli", "Güvenilir", "Onaylı"] }
    }
  },
  de: {
    badges: ["✓ Vollständig geprüft", "✓ Inklusive CarPass", "✓ Transparente Historie", "✓ Persönlicher Service"],
    why_us_sub: "Warum uns wählen?",
    why_us_title: "Ihre vertrauenswürdige lokale Werkstatt",
    features: [
      { title: "Geprüft & Zuverlässig", body: "Jedes Fahrzeug wird vor dem Verkauf gründlich geprüft." },
      { title: "Qualitäts-Gebrauchtwagen", body: "Wir bieten eine ehrliche und sorgfältig ausgewählte Auswahl an Gebrauchtwagen." },
      { title: "Faire Preise", body: "Transparente Preise ohne versteckte Kosten." }
    ],
    testimonials_sub: "Was Kunden über uns sagen",
    testimonials_title: "Zufriedene Kunden aus der Region",
    contact_sub: "Kontakt aufnehmen",
    contact_title: "Haben Sie eine <1>Frage?</1>",
    contact_desc: "Kommen Sie gerne auf einen Kaffee und eine Probefahrt vorbei. Wir helfen Ihnen gerne weiter!",
    filters: {
      title: "Filter", clear: "Löschen", search: "Suche", search_placeholder: "Marke, Modell...",
      make: "Marke", all_makes: "Alle Marken", max_price: "Max. Preis", fuel: "Kraftstoff",
      year: "Baujahr", from: "Von", to: "Bis", cars_count: "{{count}} Autos"
    },
    detail: {
      loading: "Fahrzeug wird geladen...", not_found: "Auto nicht gefunden.", about: "Über dieses Auto", specs_title: "Technische Daten",
      specs: { engine: "Motor", power: "Leistung", torque: "Drehmoment", transmission: "Getriebe", drivetrain: "Antrieb", accel: "0–100 km/h", top_speed: "Höchstgeschwindigkeit", seats: "Sitzplätze", color: "Farbe", doors: "Türen", doors_unit: "Türen", seats_unit: "Sitzplätze" },
      inquiry: { title: "Informationen anfordern", subtitle: "Wir antworten innerhalb von 24 Stunden", name: "Name", email: "E-Mail", phone: "Telefon", message: "Nachricht", submit: "Anfrage senden", call: "Direkt anrufen", success_title: "Anfrage gesendet!", success_desc: "Wir werden Sie innerhalb von 24 Stunden kontaktieren.", badges: ["Sicher", "Zuverlässig", "Geprüft"] }
    }
  },
  fr: {
    badges: ["✓ Entièrement inspecté", "✓ CarPass inclus", "✓ Historique transparent", "✓ Service personnel"],
    why_us_sub: "Pourquoi nous choisir?",
    why_us_title: "Votre garage local de confiance",
    features: [
      { title: "Inspecté et Fiable", body: "Chaque véhicule est minutieusement vérifié et inspecté avant d'être proposé." },
      { title: "Occasions de Qualité", body: "Nous offrons une sélection honnête et soignée de voitures d'occasion." },
      { title: "Prix Équitables", body: "Prix transparents sans frais cachés ni surprises." }
    ],
    testimonials_sub: "Ce que disent nos clients",
    testimonials_title: "Clients satisfaits de la région",
    contact_sub: "Prendre contact",
    contact_title: "Avez-vous une <1>question ?</1>",
    contact_desc: "N'hésitez pas à passer pour un café et un essai routier. Nous serons ravis de vous aider!",
    filters: {
      title: "Filtres", clear: "Effacer", search: "Rechercher", search_placeholder: "Marque, modèle...",
      make: "Marque", all_makes: "Toutes marques", max_price: "Prix Max", fuel: "Carburant",
      year: "Année", from: "De", to: "À", cars_count: "{{count}} voitures"
    },
    detail: {
      loading: "Chargement du véhicule...", not_found: "Voiture non trouvée.", about: "À propos de cette voiture", specs_title: "Spécifications Techniques",
      specs: { engine: "Moteur", power: "Puissance", torque: "Couple", transmission: "Boîte", drivetrain: "Transmission", accel: "0–100 km/h", top_speed: "Vitesse max", seats: "Sièges", color: "Couleur", doors: "Portes", doors_unit: "portes", seats_unit: "places" },
      inquiry: { title: "Demander des Informations", subtitle: "Nous répondons sous 24h", name: "Nom", email: "E-mail", phone: "Téléphone", message: "Message", submit: "Envoyer la Demande", call: "Appeler Directement", success_title: "Demande envoyée!", success_desc: "Nous vous contacterons dans les 24 heures.", badges: ["Sécurisé", "Fiable", "Inspecté"] }
    }
  }
};

const langs = ['nl', 'en', 'tr', 'de', 'fr'];
langs.forEach(lang => {
  const filePath = `./src/locales/${lang}.json`;
  const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  fileContent.home = { ...fileContent.home, ...data[lang] };
  fileContent.filters = data[lang].filters;
  fileContent.detail = data[lang].detail;

  fs.writeFileSync(filePath, JSON.stringify(fileContent, null, 2));
});
