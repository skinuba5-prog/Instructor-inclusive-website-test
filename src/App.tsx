import { Route, Routes } from 'react-router-dom'
import Admin from './pages/Admin'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Programs from './pages/Programs'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/programs" element={<Programs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App
