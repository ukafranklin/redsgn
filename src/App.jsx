import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Challenge from './pages/Challenge'
import Vote from './pages/Vote'
import Submit from './pages/Submit'
import Leaderboard from './pages/Leaderboard'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.25, ease: 'easeIn' } },
}

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <>
      {/* Background blobs */}
      <div className="bg-blobs" aria-hidden>
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>
      <div className="noise-overlay" aria-hidden />

      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/challenge" element={<PageWrapper><Challenge /></PageWrapper>} />
          <Route path="/vote" element={<PageWrapper><Vote /></PageWrapper>} />
          <Route path="/submit" element={<PageWrapper><Submit /></PageWrapper>} />
          <Route path="/leaderboard" element={<PageWrapper><Leaderboard /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
