import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Team from './pages/Team'
import Projects from './pages/Projects'
import Achievements from './pages/Achievements'
import Contact from './pages/Contact'
import './App.css'

function App() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  // Add/remove body class based on page
  useEffect(() => {
    if (isHomePage) {
      document.body.classList.add('home-page')
      document.body.classList.remove('sub-page')
    } else {
      document.body.classList.add('sub-page')
      document.body.classList.remove('home-page')
    }
  }, [isHomePage])

  return (
    <div className={`app ${isHomePage ? 'home-page' : 'sub-page'}`}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App
