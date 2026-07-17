import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DocLayout } from '@/components/layout/DocLayout'
import { DocPage } from '@/pages/DocPage'
import { NotFound } from '@/pages/NotFound'
import { pageRegistry } from '@/data/pages'

function App() {
  const routes = Object.keys(pageRegistry)

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DocLayout />}>
          {routes.map((path) => (
            <Route key={path} path={path} element={<DocPage />} />
          ))}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
