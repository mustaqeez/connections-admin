import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Connections from './pages/Connections'
import Groups from './pages/Groups'
import ConnectionDetail from './pages/ConnectionDetail'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex min-h-screen grid-bg">
          <Sidebar />
          <main className="ml-60 flex-1 min-h-screen">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/connections/:id" element={<ConnectionDetail />} />
              <Route path="/groups" element={<Groups />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
