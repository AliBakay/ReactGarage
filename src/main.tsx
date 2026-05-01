import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import HomePage from './presentation/pages/HomePage'
import InventoryPage from './presentation/pages/InventoryPage'
import CarDetailPage from './presentation/pages/CarDetailPage'
import './index.css'

function RootLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/inventory", element: <InventoryPage /> },
      { path: "/cars/:id", element: <CarDetailPage /> },
      {
        path: "/contact",
        element: (
          <div className="pt-32 pb-20 min-h-[60vh] flex items-center justify-center text-center">
            <div>
              <h1 className="font-display text-4xl font-bold mb-4">Contact Us</h1>
              <p className="text-garage-sub">Call us at +32 000 000 000 or visit us in Belgium.</p>
            </div>
          </div>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
