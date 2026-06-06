const fs = require('fs');

const data = {
  nl: {
    stats: { customers: "Tevreden Klanten", reliable: "Betrouwbaar", inspected: "Volledig Gekeurd", experience: "Jaar Ervaring" },
    contact_btn: "Neem contact op",
    footer: {
      desc: "Betrouwbare tweedehands voertuigen. Professioneel gekeurd, eerlijk geprijsd en klaar om te rijden.",
      contact: "Contact", address: "Adres", vat: "BTW", phone: "Telefoon", email: "E-mail",
      nav: "Navigatie", privacy: "Privacybeleid", rights: "Alle rechten voorbehouden.",
      links: { buy: "Auto Kopen Maasmechelen", second_hand: "Tweedehands Auto Limburg", reliable: "Betrouwbare Occasions" },
      slogan: "Professioneel gekeurd · Eerlijk geprijsd · Betrouwbaar"
    },
    contact_page: {
      sub: "Contact", title: "Neem Contact Op", desc: "Ons team staat klaar om uw vragen te beantwoorden.",
      info_title: "Contactgegevens",
      labels: { address: "Adres", vat: "BTW", phone: "Telefoon", email: "E-mail", hours: "Openingsuren" },
      hours_val: "Ma-Vr: 9:00 – 18:00\nZa: 10:00 – 16:00",
      form_title: "Stuur een Bericht", form_sub: "We antwoorden binnen 24 uur",
      name: "Naam", name_ph: "Uw naam", email: "E-mail", email_ph: "uw@email.com", msg: "Bericht", msg_ph: "Uw bericht...",
      submit: "Verstuur Bericht"
    }
  },
  en: {
    stats: { customers: "Happy Customers", reliable: "Reliable", inspected: "Fully Inspected", experience: "Years Experience" },
    contact_btn: "Contact Us",
    footer: {
      desc: "Reliable used vehicles. Professionally inspected, fairly priced, and ready to drive.",
      contact: "Contact", address: "Address", vat: "VAT", phone: "Phone", email: "E-mail",
      nav: "Navigation", privacy: "Privacy Policy", rights: "All rights reserved.",
      links: { buy: "Buy Car Maasmechelen", second_hand: "Used Car Limburg", reliable: "Reliable Used Cars" },
      slogan: "Professionally inspected · Fairly priced · Reliable"
    },
    contact_page: {
      sub: "Contact", title: "Get In Touch", desc: "Our team is ready to answer your questions.",
      info_title: "Contact Information",
      labels: { address: "Address", vat: "VAT", phone: "Phone", email: "E-mail", hours: "Opening Hours" },
      hours_val: "Mon-Fri: 9:00 – 18:00\nSat: 10:00 – 16:00",
      form_title: "Send a Message", form_sub: "We reply within 24 hours",
      name: "Name", name_ph: "Your name", email: "E-mail", email_ph: "your@email.com", msg: "Message", msg_ph: "Your message...",
      submit: "Send Message"
    }
  },
  tr: {
    stats: { customers: "Mutlu Müşteri", reliable: "Güvenilir", inspected: "Tam Kontrollü", experience: "Yıl Deneyim" },
    contact_btn: "Bize Ulaşın",
    footer: {
      desc: "Güvenilir ikinci el araçlar. Profesyonelce incelendi, adil fiyatlandırıldı ve sürüşe hazır.",
      contact: "İletişim", address: "Adres", vat: "KDV", phone: "Telefon", email: "E-posta",
      nav: "Navigasyon", privacy: "Gizlilik Politikası", rights: "Tüm hakları saklıdır.",
      links: { buy: "Araç Satın Al Maasmechelen", second_hand: "İkinci El Araç Limburg", reliable: "Güvenilir İkinci El" },
      slogan: "Profesyonel kontrol · Adil fiyat · Güvenilir"
    },
    contact_page: {
      sub: "İletişim", title: "Bizimle İletişime Geçin", desc: "Ekibimiz sorularınızı yanıtlamaya hazır.",
      info_title: "İletişim Bilgileri",
      labels: { address: "Adres", vat: "KDV", phone: "Telefon", email: "E-posta", hours: "Çalışma Saatleri" },
      hours_val: "Pzt-Cum: 9:00 – 18:00\nCmt: 10:00 – 16:00",
      form_title: "Mesaj Gönder", form_sub: "24 saat içinde yanıtlıyoruz",
      name: "İsim", name_ph: "İsminiz", email: "E-posta", email_ph: "email@adresiniz.com", msg: "Mesaj", msg_ph: "Mesajınız...",
      submit: "Mesajı Gönder"
    }
  },
  de: {
    stats: { customers: "Zufriedene Kunden", reliable: "Zuverlässig", inspected: "Vollständig Geprüft", experience: "Jahre Erfahrung" },
    contact_btn: "Kontakt",
    footer: {
      desc: "Zuverlässige Gebrauchtfahrzeuge. Professionell geprüft, fair bepreist und fahrbereit.",
      contact: "Kontakt", address: "Adresse", vat: "MwSt", phone: "Telefon", email: "E-Mail",
      nav: "Navigation", privacy: "Datenschutzrichtlinie", rights: "Alle Rechte vorbehalten.",
      links: { buy: "Auto Kaufen Maasmechelen", second_hand: "Gebrauchtwagen Limburg", reliable: "Zuverlässige Gebrauchtwagen" },
      slogan: "Professionell geprüft · Fair bepreist · Zuverlässig"
    },
    contact_page: {
      sub: "Kontakt", title: "Kontakt aufnehmen", desc: "Unser Team steht bereit, um Ihre Fragen zu beantworten.",
      info_title: "Kontaktinformationen",
      labels: { address: "Adresse", vat: "MwSt", phone: "Telefon", email: "E-Mail", hours: "Öffnungszeiten" },
      hours_val: "Mo-Fr: 9:00 – 18:00\nSa: 10:00 – 16:00",
      form_title: "Nachricht Senden", form_sub: "Wir antworten innerhalb von 24 Stunden",
      name: "Name", name_ph: "Ihr Name", email: "E-Mail", email_ph: "ihre@email.com", msg: "Nachricht", msg_ph: "Ihre Nachricht...",
      submit: "Nachricht Senden"
    }
  },
  fr: {
    stats: { customers: "Clients Satisfaits", reliable: "Fiable", inspected: "Entièrement Inspecté", experience: "Années d'Expérience" },
    contact_btn: "Nous contacter",
    footer: {
      desc: "Véhicules d'occasion fiables. Inspectés professionnellement, à prix juste et prêts à rouler.",
      contact: "Contact", address: "Adresse", vat: "TVA", phone: "Téléphone", email: "E-mail",
      nav: "Navigation", privacy: "Politique de confidentialité", rights: "Tous droits réservés.",
      links: { buy: "Acheter Voiture Maasmechelen", second_hand: "Voiture d'Occasion Limburg", reliable: "Occasions Fiables" },
      slogan: "Inspecté professionnellement · Prix juste · Fiable"
    },
    contact_page: {
      sub: "Contact", title: "Prenez Contact", desc: "Notre équipe est prête à répondre à vos questions.",
      info_title: "Informations de Contact",
      labels: { address: "Adresse", vat: "TVA", phone: "Téléphone", email: "E-mail", hours: "Heures d'ouverture" },
      hours_val: "Lun-Ven: 9:00 – 18:00\nSam: 10:00 – 16:00",
      form_title: "Envoyer un Message", form_sub: "Nous répondons sous 24 heures",
      name: "Nom", name_ph: "Votre nom", email: "E-mail", email_ph: "votre@email.com", msg: "Message", msg_ph: "Votre message...",
      submit: "Envoyer le Message"
    }
  }
};

const langs = ['nl', 'en', 'tr', 'de', 'fr'];
langs.forEach(lang => {
  const filePath = `./src/locales/${lang}.json`;
  const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  fileContent.home = { ...fileContent.home, stats: data[lang].stats, contact_btn: data[lang].contact_btn };
  fileContent.footer = data[lang].footer;
  fileContent.contact_page = data[lang].contact_page;

  fs.writeFileSync(filePath, JSON.stringify(fileContent, null, 2));
});
