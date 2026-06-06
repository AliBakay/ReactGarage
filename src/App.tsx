import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { ProtectedRoute } from './components/layout/ProtectedRoute'

const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.052 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const HomePage = lazy(() => import('./presentation/pages/HomePage'))
const InventoryPage = lazy(() => import('./presentation/pages/InventoryPage'))
const CarDetailPage = lazy(() => import('./presentation/pages/CarDetailPage'))
const LoginPage = lazy(() => import('./presentation/pages/LoginPage'))
const AdminDashboardPage = lazy(() => import('./presentation/pages/AdminDashboardPage'))
const AdminCarFormPage = lazy(() => import('./presentation/pages/AdminCarFormPage'))
const AdminReviewsPage = lazy(() => import('./presentation/pages/AdminReviewsPage'))
const PrivacyPolicyPage = lazy(() => import('./presentation/pages/PrivacyPolicyPage'))
const SEOLandingPage = lazy(() => import('./presentation/pages/SEOLandingPage'))

function PageLoader() {
  return (
    <div className="min-h-screen bg-garage-surface pt-28 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-[3px] border-garage-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-garage-darkSub text-sm">Laden...</p>
      </div>
    </div>
  )
}

import { ScrollToTop } from './components/layout/ScrollToTop'

function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

import { useTranslation } from 'react-i18next';
import { useState } from 'react';

function ContactPage() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    fetch("https://formsubmit.co/ajax/info@garagevanhozeham.be", {
      method: "POST",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        naam: data.name,
        email: data.email,
        bericht: data.message,
        _subject: "Nieuw bericht via contactformulier",
        _template: "table"
      })
    })
    .then(res => res.json())
    .then(() => { setSent(true); setLoading(false); })
    .catch(() => { setSent(true); setLoading(false); });
  };

  return (
    <div className="min-h-screen bg-garage-surface">
      {/* Dark header */}
      <div className="bg-garage-bg pt-28 pb-16 px-4 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-garage-accent mb-3">{t('contact_page.sub')}</p>
        <h1 className="font-display text-5xl font-extrabold text-white mb-4">{t('contact_page.title')}</h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto">
          {t('contact_page.desc')}
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact info */}
        <div className="bg-white rounded-2xl border border-garage-border p-8 shadow-sm space-y-6">
          <h2 className="font-display font-bold text-2xl text-garage-dark">{t('contact_page.info_title')}</h2>
          {[
            { icon: <MapPin size={20} />, label: t('contact_page.labels.address'),      value: "Slakweidestraat 40G 1A\n3630 Maasmechelen", href: "https://www.google.com/maps/search/?api=1&query=Slakweidestraat+40G+1A,+3630+Maasmechelen" },
            { icon: <div className="text-sm font-black border-2 border-current px-1 rounded">B</div>, label: t('contact_page.labels.vat'), value: "BE0676463449" },
            { icon: <Phone size={20} />,  label: t('contact_page.labels.phone'),   value: "+32 492 44 05 14", href: "tel:+32492440514" },
            { icon: <WhatsAppIcon size={20} />,  label: "WhatsApp",   value: "+32 492 44 05 14", href: "https://wa.me/32492440514", target: "_blank", textClass: "text-[#25D366] hover:text-[#1DA851]" },
            { icon: <Mail size={20} />,   label: t('contact_page.labels.email'),     value: "info@garagevanhozeham.be", href: "mailto:info@garagevanhozeham.be" },
            { icon: <Clock size={20} />,  label: t('contact_page.labels.hours'), value: t('contact_page.hours_val') },
          ].map(item => (
            <div key={item.label} className="flex items-start gap-4">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-garage-accent shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-garage-muted mb-1">{item.label}</p>
                {item.href ? (
                  <a href={item.href} target={item.target || "_self"} rel={item.target === "_blank" ? "noopener noreferrer" : undefined} className={`font-medium transition-colors ${item.textClass || 'text-garage-dark hover:text-garage-accent'}`}>
                    {item.value}
                  </a>
                ) : (
                  <p className="text-garage-dark font-medium whitespace-pre-line">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick contact form */}
        <div className="bg-white rounded-2xl border border-garage-border shadow-sm overflow-hidden">
          <div className="bg-garage-bg px-6 py-5">
            <h2 className="font-display font-bold text-lg text-white">{t('contact_page.form_title')}</h2>
            <p className="text-sm text-white/60 mt-1">{t('contact_page.form_sub')}</p>
          </div>
          <form className="p-6 space-y-4" onSubmit={handleSubmit}>
            {[
              { label: t('contact_page.name'),   placeholder: t('contact_page.name_ph'),    type: "text", name: "name" },
              { label: t('contact_page.email'), placeholder: t('contact_page.email_ph'), type: "email", name: "email" },
            ].map(f => (
              <div key={f.label}>
                <label className="text-xs font-bold uppercase tracking-widest text-garage-darkSub block mb-1.5">{f.label}</label>
                <input type={f.type} name={f.name} placeholder={f.placeholder} className="input-light" required disabled={loading} />
              </div>
            ))}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-garage-darkSub block mb-1.5">{t('contact_page.msg')}</label>
              <textarea name="message" rows={4} placeholder={t('contact_page.msg_ph')} className="input-light resize-none" required disabled={loading} />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 disabled:opacity-50">
              <Mail size={16} /> {loading ? "Verzenden..." : t('contact_page.submit')}
            </button>
            {sent && <p className="text-sm text-green-600 font-medium text-center mt-2">Bericht succesvol verzonden! We nemen zo snel mogelijk contact op.</p>}
          </form>
        </div>
      </div>

      {/* Map */}
      <div className="max-w-5xl mx-auto px-4 pb-20">
        <div className="bg-white rounded-2xl border border-garage-border shadow-sm p-2 h-[400px] overflow-hidden">
          <iframe 
            src="https://maps.google.com/maps?q=Slakweidestraat%2040G%201A,%203630%20Maasmechelen&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0, borderRadius: '0.75rem' }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Locatie Garage"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/",          element: <HomePage /> },
      { path: "/inventory", element: <InventoryPage /> },
      { path: "/cars/:id",  element: <CarDetailPage /> },
      { path: "/contact",   element: <ContactPage /> },
      { path: "/privacy",   element: <PrivacyPolicyPage /> },
      { path: "/auto-kopen-maasmechelen", element: <SEOLandingPage /> },
      { path: "/tweedehands-auto-limburg", element: <SEOLandingPage /> },
      { path: "/betrouwbare-occasions", element: <SEOLandingPage /> },
      { path: "/garage-admin-access", element: <LoginPage /> },
      {
        path: "/beheerpaneel",
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: "toevoegen", element: <AdminCarFormPage /> },
          { path: "bewerken/:id", element: <AdminCarFormPage /> },
          { path: "reviews", element: <AdminReviewsPage /> }
        ]
      }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
