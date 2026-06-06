import { Link, useParams } from "react-router-dom";
import { SEO } from "../../components/seo/SEO";
import { useCars } from "../hooks/useCars";
import { CarCard } from "../../components/inventory/CarCard";
import { Shield, CheckCircle, MapPin, ArrowRight } from "lucide-react";

const SEO_CONTENT: Record<string, { title: string, desc: string, h1: string, text: React.ReactNode }> = {
  "auto-kopen-maasmechelen": {
    title: "Auto kopen in Maasmechelen? Ontdek Garage van Hozeham",
    desc: "Tweedehands auto kopen in Maasmechelen? Bij Garage van Hozeham vind je betrouwbare occasions met garantie. Bekijk direct ons actuele aanbod online.",
    h1: "Betrouwbare Auto Kopen in Maasmechelen",
    text: (
      <>
        <p>Ben je op zoek naar een kwalitatieve, betaalbare en volledig gekeurde <strong>tweedehands auto in Maasmechelen</strong>? Dan ben je bij Garage van Hozeham aan het juiste adres! Wij zijn dé occasion dealer van de regio en helpen je graag bij het vinden van de perfecte wagen.</p>
        
        <h2>Waarom kiezen voor een occasion in Maasmechelen?</h2>
        <p>Het kopen van een occasion biedt talloze voordelen. Niet alleen bespaar je aanzienlijk op de afschrijving ten opzichte van een nieuwe wagen, maar bij Garage van Hozeham geniet je ook van zekerheid. Wij inspecteren elke auto grondig op meer dan 100 punten in onze moderne werkplaats aan de Slakweidestraat.</p>

        <h3>Onze zekerheden bij het kopen van een auto</h3>
        <ul>
          <li><strong>Lokale Service:</strong> Gelegen in het hart van Maasmechelen (Slakweidestraat 40G 1A), we zijn altijd dichtbij voor onderhoud.</li>
          <li><strong>Eerlijke Prijzen:</strong> Geen verborgen kosten, heldere prijzen.</li>
          <li><strong>Direct Rijden:</strong> Al onze wagens zijn technisch nagelopen en kunnen vaak dezelfde dag nog mee.</li>
        </ul>

        <h2>Vind Jouw Ideale Wagen Vandaag Nog</h2>
        <p>Of je nu een compacte stadsauto zoekt voor de ritten in en rond Maasmechelen, een ruime gezinswagen of een stoere SUV, ons wisselende aanbod heeft voor ieder wat wils. We kopen regelmatig nieuwe auto's in en leveren deze af met een geldig keuringsbewijs en Car-Pass.</p>
        <p>Neem gerust contact met ons op via <strong>+32 492 44 05 14</strong> of breng een bezoekje aan onze showroom. Onze deuren staan open voor een vrijblijvende proefrit en eerlijk advies.</p>
      </>
    )
  },
  "tweedehands-auto-limburg": {
    title: "Tweedehands Auto Limburg | Betrouwbare Occasions",
    desc: "Zoekt u een betrouwbare tweedehands auto in Limburg? Garage van Hozeham biedt de beste occasions van de provincie. Eerlijk, gekeurd en betaalbaar.",
    h1: "Dé Specialist voor uw Tweedehands Auto in Limburg",
    text: (
      <>
        <p>Het vinden van de juiste <strong>tweedehands auto in Limburg</strong> kan een flinke zoektocht zijn. U wilt immers niet alleen een mooie wagen, maar ook eentje waar u op kunt vertrouwen. Garage van Hozeham, centraal gelegen in Limburg (Maasmechelen), is uw betrouwbare partner in de automobielsector.</p>
        
        <h2>De Grootste Kwaliteit in Occasions</h2>
        <p>Als Limburgs garagebedrijf hechten wij enorm veel waarde aan persoonlijk contact en eerlijk zakendoen. Elke wagen die wij aanbieden is onderworpen aan een strenge technische controle. Hierdoor kunnen wij garanderen dat onze tweedehands auto's veilig en betrouwbaar de weg op gaan.</p>

        <h3>Uw voordelen op een rij:</h3>
        <ul>
          <li>Groot en divers aanbod van alle bekende automerken.</li>
          <li>Inclusief Car-Pass voor een gegarandeerde kilometerstand.</li>
          <li>Gevestigd in Limburg, dus makkelijk bereikbaar vanuit Genk, Hasselt of Lanaken.</li>
          <li>Professionele overname van uw huidige wagen.</li>
        </ul>

        <h2>Maak een Proefrit in Limburg</h2>
        <p>Ziet u een mooie wagen in ons aanbod? Kom dan zeker langs in onze showroom. Wij leggen de sleutels graag voor u klaar voor een uitgebreide proefrit. Een tweedehands auto kopen in Limburg was nog nooit zo zorgeloos. Bekijk hieronder direct een greep uit ons actuele aanbod.</p>
      </>
    )
  },
  "betrouwbare-occasions": {
    title: "Betrouwbare Occasions Kopen | Garage van Hozeham",
    desc: "Veilig en zorgeloos een occasion kopen? Bekijk de betrouwbare tweedehands auto's van Garage van Hozeham. Gekeurd, direct rijklaar en eerlijke prijzen.",
    h1: "Betrouwbare Occasions Kopen met Zekerheid",
    text: (
      <>
        <p>Een occasion kopen is een kwestie van vertrouwen. Bij Garage van Hozeham begrijpen we dat u op zoek bent naar <strong>betrouwbare occasions</strong> zonder verborgen gebreken. Wij screenen al onze voertuigen uiterst zorgvuldig voordat ze de showroom in mogen.</p>
        
        <h2>Wat Maakt Onze Occasions Betrouwbaar?</h2>
        <p>Er zijn tegenwoordig veel tweedehands wagens op de markt, maar kwaliteit is cruciaal. Wij selecteren onze inkoop streng en focussen op voertuigen met een aantoonbare en correcte onderhoudshistoriek. Daardoor koopt u bij ons geen kat in de zak.</p>

        <ul>
          <li><strong>Strenge Kwaliteitscontrole:</strong> Elke auto krijgt een volledige technische inspectie.</li>
          <li><strong>Gecontroleerde Historiek:</strong> We controleren de papieren, de onderhoudshistorie en leveren altijd de Car-Pass.</li>
          <li><strong>Transparantie:</strong> We vertellen u eerlijk de staat van de auto, inclusief eventuele gebruikerssporen, zodat u precies weet waar u aan toe bent.</li>
        </ul>

        <h2>Uw Occasion Dealer</h2>
        <p>Wij investeren liever in langdurige klantrelaties dan in snelle verkopen. Bent u op zoek naar specifieke occasions? Laat het ons weten, dan zoeken wij met u mee. Neem een kijkje in ons aanbod of bel ons direct op +32 492 44 05 14 voor advies op maat.</p>
      </>
    )
  }
};

export default function SEOLandingPage() {
  const { slug } = useParams<{ slug: string }>();
  const content = SEO_CONTENT[slug || ""] || SEO_CONTENT["auto-kopen-maasmechelen"];
  
  const { cars } = useCars();
  // Get 3 random cars for the preview
  const previewCars = [...cars].sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <div className="min-h-screen bg-garage-surface pb-20">
      <SEO 
        title={content.title} 
        description={content.desc} 
        url={`https://garagevanhozeham.be/${slug}`} 
      />

      {/* Hero Banner */}
      <div className="bg-garage-bg pt-32 pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            {content.h1}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            {[
              { icon: <Shield size={18} />, text: "Volledig Gekeurd" },
              { icon: <CheckCircle size={18} />, text: "Direct Rijklaar" },
              { icon: <MapPin size={18} />, text: "Regio Maasmechelen" }
            ].map((badge, i) => (
              <span key={i} className="flex items-center gap-2 text-white/80 bg-white/10 px-4 py-2 rounded-full text-sm font-semibold">
                <span className="text-garage-accent">{badge.icon}</span>
                {badge.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-garage-border prose prose-slate prose-headings:font-display prose-headings:text-garage-dark prose-a:text-garage-accent max-w-none">
            {content.text}
          </div>

          {/* Sidebar / Quick Contact */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-garage-dark rounded-3xl p-8 text-white sticky top-28">
              <h3 className="font-display font-bold text-2xl mb-4">Direct Contact</h3>
              <p className="text-white/70 mb-6 text-sm leading-relaxed">
                Heeft u vragen of wilt u een proefrit inplannen? Ons team staat klaar om u te helpen bij uw zoektocht.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="text-garage-accent shrink-0 mt-1" size={18} />
                  <p className="text-sm font-medium">Slakweidestraat 40G 1A<br/>3630 Maasmechelen</p>
                </div>
              </div>

              <a href="tel:+32492440514" className="btn-primary w-full flex items-center justify-center py-4 rounded-xl font-bold text-base shadow-md shadow-garage-accent/20">
                Bel Nu: +32 492 44 05 14
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Cars Preview */}
      {previewCars.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display font-extrabold text-3xl text-garage-dark mb-2">Ons Actuele Aanbod</h2>
              <p className="text-garage-darkSub">Een kleine greep uit onze occasions.</p>
            </div>
            <Link to="/inventory" className="hidden md:flex items-center gap-2 text-garage-accent font-bold hover:text-garage-dark transition-colors">
              Bekijk alles <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previewCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/inventory" className="btn-ghost-dark w-full flex items-center justify-center gap-2 py-4">
              Bekijk Volledig Aanbod <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
