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

function RootLayout() {
  return (
    <>
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

function ContactPage() {
  return (
    <div className="min-h-screen bg-garage-surface">
      {/* Dark header */}
      <div className="bg-garage-bg pt-28 pb-16 px-4 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-garage-accent mb-3">Contact</p>
        <h1 className="font-display text-5xl font-extrabold text-white mb-4">Neem Contact Op</h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto">
          Ons team staat klaar om uw vragen te beantwoorden.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact info */}
        <div className="bg-white rounded-2xl border border-garage-border p-8 shadow-sm space-y-6">
          <h2 className="font-display font-bold text-2xl text-garage-dark">Contactgegevens</h2>
          {[
            { icon: <MapPin size={20} />, label: "Adres",      value: "Autostraat 12, 9000 Gent" },
            { icon: <Phone size={20} />,  label: "Telefoon",   value: "+32 000 000 000", href: "tel:+32000000000" },
            { icon: <Mail size={20} />,   label: "E-mail",     value: "info@autodeal.be", href: "mailto:info@autodeal.be" },
            { icon: <Clock size={20} />,  label: "Openingsuren", value: "Ma-Vr: 9:00 – 18:00\nZa: 10:00 – 16:00" },
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
            <h2 className="font-display font-bold text-lg text-white">Stuur een Bericht</h2>
            <p className="text-sm text-white/60 mt-1">We antwoorden binnen 24 uur</p>
          </div>
          <form className="p-6 space-y-4" onSubmit={e => e.preventDefault()}>
            {[
              { label: "Naam",   placeholder: "Uw naam",    type: "text" },
              { label: "E-mail", placeholder: "uw@email.com", type: "email" },
            ].map(f => (
              <div key={f.label}>
                <label className="text-xs font-bold uppercase tracking-widest text-garage-darkSub block mb-1.5">{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} className="input-light" required />
              </div>
            ))}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-garage-darkSub block mb-1.5">Bericht</label>
              <textarea rows={4} placeholder="Uw bericht..." className="input-light resize-none" required />
            </div>
            <button type="submit" className="btn-primary w-full py-3.5 flex items-center justify-center gap-2">
              <Mail size={16} /> Verstuur Bericht
            </button>
          </form>
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
      { path: "/garage-admin-access", element: <LoginPage /> },
      {
        path: "/beheerpaneel",
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: "toevoegen", element: <AdminCarFormPage /> },
          { path: "bewerken/:id", element: <AdminCarFormPage /> }
        ]
      }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
