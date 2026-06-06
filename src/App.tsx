import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { ProtectedRoute } from './components/layout/ProtectedRoute'

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

function ContactPage() {
  const { t } = useTranslation();
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
                  <a href={item.href} className="text-garage-dark font-medium hover:text-garage-accent transition-colors">
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
          <form className="p-6 space-y-4" onSubmit={e => e.preventDefault()}>
            {[
              { label: t('contact_page.name'),   placeholder: t('contact_page.name_ph'),    type: "text" },
              { label: t('contact_page.email'), placeholder: t('contact_page.email_ph'), type: "email" },
            ].map(f => (
              <div key={f.label}>
                <label className="text-xs font-bold uppercase tracking-widest text-garage-darkSub block mb-1.5">{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} className="input-light" required />
              </div>
            ))}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-garage-darkSub block mb-1.5">{t('contact_page.msg')}</label>
              <textarea rows={4} placeholder={t('contact_page.msg_ph')} className="input-light resize-none" required />
            </div>
            <button type="submit" className="btn-primary w-full py-3.5 flex items-center justify-center gap-2">
              <Mail size={16} /> {t('contact_page.submit')}
            </button>
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
