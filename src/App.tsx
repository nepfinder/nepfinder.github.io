import { Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { Layout } from '@/components/layout/Layout'
import Home from '@/pages/Home'
import type { PageMap } from '@/pages/types'

function PageFallback() {
  return <div className="min-h-[60dvh] pt-11" aria-busy="true" />
}

export default function App({ pages: P }: { pages: PageMap }) {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="*"
          element={
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route path="about" element={<P.About />} />
                <Route path="services" element={<P.Services />} />
                <Route path="services/:slug" element={<P.ServiceDetail />} />
                <Route path="solutions" element={<P.Solutions />} />
                <Route path="technologies" element={<P.Technologies />} />
                <Route path="products" element={<P.Products />} />
                <Route path="products/:slug" element={<P.ProductDetail />} />
                <Route path="projects" element={<P.Projects />} />
                <Route path="projects/:slug" element={<P.ProjectDetail />} />
                <Route path="contact" element={<P.Contact />} />
                <Route path="ncafe/privacy" element={<P.NcafePrivacy />} />
                <Route path="ncafe/policy" element={<P.NcafePrivacy />} />
                <Route path="user-data-delete-request" element={<P.DataDeletion />} />
                <Route path="*" element={<P.NotFound />} />
              </Routes>
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}
