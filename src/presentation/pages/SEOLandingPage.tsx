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
        <p className="lead text-lg mb-6">Ben je op zoek naar een kwalitatieve, betaalbare en volledig gekeurde <strong>tweedehands auto in Maasmechelen</strong>? Dan ben je bij Garage van Hozeham aan het juiste adres! Wij zijn dé onafhankelijke occasion dealer van de regio en helpen je met persoonlijke en eerlijke service graag bij het vinden van de perfecte wagen.</p>
        
        <h2>Waarom een occasion kopen in Maasmechelen?</h2>
        <p>Het kopen van een occasion biedt tegenwoordig talloze voordelen. Niet alleen bespaar je aanzienlijk op de torenhoge afschrijving die gepaard gaat met een splinternieuwe wagen, maar je rijdt ook direct de showroom uit zonder lange levertijden. Door te kiezen voor een lokale dealer in <strong>Maasmechelen</strong> zoals Garage van Hozeham, geniet je van de zekerheid dat je altijd dichtbij terecht kunt voor vragen, service of onderhoud. Geen anonieme megadealers, maar persoonlijk contact.</p>

        <h3>Onze strenge kwaliteitsgarantie</h3>
        <p>Wij begrijpen dat de aankoop van een tweedehands auto best spannend kan zijn. Daarom nemen wij alle zorgen uit handen. Hoe doen we dat?</p>
        <ul>
          <li><strong>Uitgebreide Inspectie:</strong> Voordat een wagen onze showroom (aan de Slakweidestraat) in mag, wordt deze op tientallen kritieke technische en visuele punten gecontroleerd.</li>
          <li><strong>100% Transparantie met Car-Pass:</strong> Elke auto wordt geleverd met een officiële Car-Pass. Zo ben je absoluut zeker van een logische en gegarandeerde kilometerstand. Geen verrassingen achteraf.</li>
          <li><strong>Keuring voor Verkoop:</strong> We leveren onze wagens altijd af met een blanco keuringsbewijs, zodat je weet dat de auto technisch volledig in orde is en veilig de weg op kan.</li>
        </ul>

        <h2>Voor iedereen de juiste auto</h2>
        <p>Of je nu net je rijbewijs hebt en op zoek bent naar een voordelige, compacte stadsauto om in Maasmechelen en omstreken te rijden, of juist een ruime en veilige gezinswagen (stationwagon of SUV) nodig hebt voor de vakanties; wij streven naar een zeer gevarieerd aanbod. Wij selecteren wagens van diverse topmerken zoals Volkswagen, BMW, Audi, Peugeot en Toyota, gericht op betrouwbaarheid en lage onderhoudskosten.</p>

        <h3>Overname van je huidige wagen</h3>
        <p>Heb je al een auto en wil je deze inruilen? Dat is bij ons geen enkel probleem. We bieden een eerlijke en marktconforme overnameprijs voor je huidige wagen. Zo hoef je je geen zorgen te maken over de particuliere verkoop en kun je dat bedrag direct inzetten voor je nieuwe droomauto.</p>

        <h2>Kom langs voor een vrijblijvende proefrit</h2>
        <p>Genoeg gelezen? Auto's moet je ervaren! We nodigen je van harte uit in onze garage aan de <strong>Slakweidestraat 40G 1A in Maasmechelen</strong>. De koffie staat altijd klaar. Je kunt in alle rust ons aanbod bekijken, en als je jouw ideale wagen hebt gevonden, leggen wij de sleutels direct voor je klaar voor een uitgebreide proefrit.</p>
        <p>Neem gerust contact met ons op via <strong>+32 492 44 05 14</strong> (ook via WhatsApp bereikbaar!) om een afspraak in te plannen.</p>
      </>
    )
  },
  "tweedehands-auto-limburg": {
    title: "Tweedehands Auto Limburg | Betrouwbare Occasions met Garantie",
    desc: "Zoekt u een betrouwbare tweedehands auto in Limburg? Garage van Hozeham (Maasmechelen) biedt de beste occasions van de provincie. Eerlijk, gekeurd en betaalbaar.",
    h1: "Dé Specialist voor uw Tweedehands Auto in Limburg",
    text: (
      <>
        <p className="lead text-lg mb-6">Het vinden van de juiste <strong>tweedehands auto in Limburg</strong> kan aanvoelen als een flinke zoektocht. U wilt immers niet zomaar een mooie wagen, maar een voertuig waarop u jarenlang blindelings kunt vertrouwen. Garage van Hozeham is uw betrouwbare partner in de Limburgse automobielsector.</p>
        
        <h2>Waarom kopers uit heel Limburg naar ons komen</h2>
        <p>Hoewel we gevestigd zijn in Maasmechelen, mogen we wekelijks tevreden klanten verwelkomen uit heel Limburg: van Genk en Hasselt tot Dilsen-Stokkem en Lanaken. Onze uitstekende reputatie is gebouwd op één simpele kernwaarde: <strong>eerlijkheid</strong>. Bij ons vindt u geen gladde praatjes of verborgen gebreken, maar transparante communicatie en topkwaliteit occasions.</p>

        <h3>Wat mag u van onze wagens verwachten?</h3>
        <p>Een auto aankopen is een grote investering. Daarom laten we niets aan het toeval over. Elk voertuig in ons Limburgse wagenpark ondergaat een rigoureuze selectieprocedure:</p>
        <ul>
          <li><strong>Aantoonbare Historiek:</strong> We kopen enkel auto's in waarvan het onderhoudsverleden sluitend en aantoonbaar is. Geen vage import zonder papieren.</li>
          <li><strong>Diepgaande Technische Controle:</strong> Remmen, distributieriem, vloeistoffen en elektronica worden nauwkeurig nagekeken door ervaren specialisten.</li>
          <li><strong>Car-Pass Garantie:</strong> De kilometerstand is heilig. Met het meegeleverde Car-Pass document garanderen wij dat de gereden kilometers 100% correct zijn.</li>
        </ul>

        <h2>Een breed aanbod occasions in Limburg</h2>
        <p>Omdat we weten dat elke bestuurder in Limburg unieke behoeften heeft, zorgen we voor een sterk wisselend en veelzijdig aanbod. Zoekt u een zuinige benzine of hybride voor woon-werkverkeer naar Hasselt? Een robuuste diesel voor langere afstanden? Of een sportieve cabrio voor de zonnige weekenden in het Heuvelland? Grote kans dat u het bij ons vindt.</p>
        
        <h3>Uw oude auto inruilen?</h3>
        <p>Zit u nog met uw huidige auto? Wij bieden een vlotte overnameservice. We taxeren uw wagen ter plekke en bieden een eerlijke handelsprijs, zodat uw aankoop soepel en in één vlotte beweging kan worden afgehandeld. Zo bespaart u zich de moeite van advertenties plaatsen en testritten met onbekenden.</p>

        <h2>Ervaar onze Limburgse gastvrijheid</h2>
        <p>Een auto koopt u niet vanaf een foto. Wij snappen dat het gevoel achter het stuur doorslaggevend is. Blader gerust door onze actuele voorraad op deze website. Ziet u een model dat uw hart sneller doet kloppen? Kom dan langs voor een vrijblijvende bezichtiging en een testrit. Wij zetten de koffie klaar en helpen u graag verder met persoonlijk advies.</p>
      </>
    )
  },
  "betrouwbare-occasions": {
    title: "Betrouwbare Occasions Kopen | Garage van Hozeham",
    desc: "Veilig en zonder zorgen een occasion kopen? Bekijk de betrouwbare tweedehands auto's van Garage van Hozeham. Gekeurd, direct rijklaar en eerlijk geprijsd.",
    h1: "Betrouwbare Occasions Kopen met 100% Zekerheid",
    text: (
      <>
        <p className="lead text-lg mb-6">Een occasion kopen is voor veel mensen een kwestie van vertrouwen. Bij Garage van Hozeham begrijpen we als geen ander dat u op zoek bent naar <strong>betrouwbare occasions</strong> zonder onaangename verrassingen achteraf. Uw veiligheid en gemoedsrust staan bij ons op de eerste plaats.</p>
        
        <h2>Wanneer is een occasion écht betrouwbaar?</h2>
        <p>De markt staat vol met tweedehands auto's, maar het scheiden van het kaf en het koren is een vak apart. Wij nemen dat risico volledig voor u weg. Een occasion in onze garage krijgt pas het predicaat "betrouwbaar" als deze aan onze loodzware kwaliteitseisen voldoet.</p>

        <ul>
          <li><strong>Selectieve Inkoop:</strong> We kopen uitsluitend wagens in van betrouwbare partners of particulieren waarbij we de volledige onderhoudsgeschiedenis kunnen inzien.</li>
          <li><strong>Technisch Rapport:</strong> Elk voertuig wordt binnenste buiten gekeerd. Slijtage-onderdelen zoals banden en remmen die hun beste tijd hebben gehad, worden op voorhand door ons vernieuwd.</li>
          <li><strong>Volledige Transparantie:</strong> Heeft een auto een krasje of kleine gebruikerssporen? We vertellen het u direct. Transparantie zorgt voor de beste klantrelatie op lange termijn.</li>
        </ul>

        <h2>Gekeurd voor verkoop & Car-Pass</h2>
        <p>Wettelijke zekerheid is de basis van een betrouwbare occasion. Al onze wagens worden afgeleverd inclusief een <strong>blanco keuringsbewijs voor verkoop</strong> (inclusief het bijbehorende 80-punten controleverslag van de keuringsinstantie) én een officiële <strong>Car-Pass</strong>. Dit sluit kilometerfraude uit en geeft u de zwart-op-wit garantie dat uw nieuwe auto technisch in een uitstekende staat verkeert.</p>

        <h2>Klaar om in te stappen?</h2>
        <p>Een extra voordeel bij Garage van Hozeham: onze betrouwbare occasions staan nagenoeg allemaal <strong>direct rijklaar</strong>. Doordat we de technische checks al hebben uitgevoerd, hoeft u na de aankoop vaak niet meer weken te wachten. Kopen, overschrijven en direct genieten van uw nieuwe wagen!</p>

        <p>Kies voor gemoedsrust en bekijk ons aanbod aan zorgvuldig geselecteerde, betrouwbare occasions. Heeft u vragen over een specifiek model of de staat van een wagen? Bel ons op <strong>+32 492 44 05 14</strong> of stuur eenvoudig een berichtje via WhatsApp. We staan voor u klaar.</p>
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
