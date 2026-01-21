import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAudio } from '../contexts/AudioContext'
import { hasNavigated, setNavigated } from '../utils/navigationState'
import LightRays from '../components/LightRays'
import TargetCursor from '../components/TargetCursor'
import './Home.css'

const VCAMP_DATA = [
    { letter: 'V', expansion: 'ISION' },
    { letter: 'C', expansion: 'OMMUNITY' },
    { letter: 'A', expansion: 'ND' },
    { letter: 'M', expansion: 'AKING' },
    { letter: 'P', expansion: 'ROJECT' }
]

const NAV_LINKS = [
    { path: '/about', label: 'Hakkımızda', number: '01' },
    { path: '/team', label: 'Ekibimiz', number: '02' },
    { path: '/projects', label: 'Projeler', number: '03' },
    { path: '/achievements', label: 'Başarılar', number: '04' },
    { path: '/contact', label: 'İletişim', number: '05' }
]

function Home() {
    const navigate = useNavigate()
    const audioRef = useRef(null)
    const { playMainLetterSound, playKeyboardSound, playWhooshSound, playNavSound, soundEnabled, toggleSound } = useAudio()

    // Store audio functions in ref to avoid stale closures
    useEffect(() => {
        audioRef.current = { playMainLetterSound, playKeyboardSound }
    }, [playMainLetterSound, playKeyboardSound])

    // Animation phases
    const [phase, setPhase] = useState('dark')
    const [visibleRows, setVisibleRows] = useState([])
    const [visibleLetters, setVisibleLetters] = useState({})
    const [showNav, setShowNav] = useState(false)
    const [showCursor, setShowCursor] = useState(false)
    const [showLightRays, setShowLightRays] = useState(false)

    // Determine if this is a fresh page load or SPA navigation
    useEffect(() => {
        // Check if user navigated back from another page (SPA navigation)
        // vs a fresh page load/refresh
        const isFromNavigation = hasNavigated()

        if (isFromNavigation) {
            // Coming back from another page - skip animation
            setPhase('complete')
            setVisibleRows([0, 1, 2, 3, 4])
            setVisibleLetters({
                0: [0, 1, 2, 3, 4],
                1: [0, 1, 2, 3, 4, 5, 6, 7],
                2: [0, 1],
                3: [0, 1, 2, 3, 4],
                4: [0, 1, 2, 3, 4, 5]
            })
            setShowNav(true)
            setShowCursor(true)
            setShowLightRays(true)
            return
        }

        // Fresh page load - play animation
        // Mark that we've now loaded the page (future navigations will skip)

        // Start animation sequence
        // Phase 1: Dark (already)

        // Phase 2: Logo appears
        const logoTimer = setTimeout(() => {
            setPhase('logo')
            playWhooshSound()
        }, 500)

        // Phase 3: Logo settles
        const settleTimer = setTimeout(() => {
            setPhase('logoSettled')
        }, 2500)

        // Phase 4: Light rays
        const lightTimer = setTimeout(() => {
            setPhase('lightRays')
            setShowLightRays(true)
        }, 3500)

        // Phase 5: Start VCAMP animation
        const vcampTimer = setTimeout(() => {
            setPhase('vcamp')
            animateVCAMP()
        }, 4500)

        return () => {
            clearTimeout(logoTimer)
            clearTimeout(settleTimer)
            clearTimeout(lightTimer)
            clearTimeout(vcampTimer)
        }
    }, [playWhooshSound])

    // VCAMP Animation - Uses explicit timing
    const animateVCAMP = () => {
        const timers = []
        let currentDelay = 0

        // Calculate all timings upfront
        const animations = []

        VCAMP_DATA.forEach((item, rowIndex) => {
            // Main letter animation
            animations.push({
                type: 'row',
                rowIndex,
                delay: currentDelay
            })

            currentDelay += 400 // Wait after main letter

            // Each expansion letter
            const letters = item.expansion.split('')
            letters.forEach((_, letterIndex) => {
                animations.push({
                    type: 'letter',
                    rowIndex,
                    letterIndex,
                    delay: currentDelay
                })
                currentDelay += 80 // 80ms between letters
            })

            currentDelay += 300 // Pause before next row
        })

        // Schedule all animations
        animations.forEach(anim => {
            const timer = setTimeout(() => {
                if (anim.type === 'row') {
                    setVisibleRows(prev => {
                        if (prev.includes(anim.rowIndex)) return prev
                        return [...prev, anim.rowIndex]
                    })
                    if (audioRef.current) {
                        audioRef.current.playMainLetterSound(anim.rowIndex)
                    }
                } else if (anim.type === 'letter') {
                    setVisibleLetters(prev => {
                        const existing = prev[anim.rowIndex] || []
                        if (existing.includes(anim.letterIndex)) return prev
                        return {
                            ...prev,
                            [anim.rowIndex]: [...existing, anim.letterIndex]
                        }
                    })
                    if (audioRef.current) {
                        audioRef.current.playKeyboardSound()
                    }
                }
            }, anim.delay)
            timers.push(timer)
        })

        // Show navbar after VCAMP completes
        const navTimer = setTimeout(() => {
            setPhase('nav')
            setShowNav(true)
        }, currentDelay + 500)
        timers.push(navTimer)

        // Show cursor after navbar
        const cursorTimer = setTimeout(() => {
            setPhase('complete')
            setShowCursor(true)
        }, currentDelay + 1500)
        timers.push(cursorTimer)
    }

    const handleNavClick = useCallback((e, path) => {
        e.preventDefault()
        playNavSound()

        // Mark that we're doing SPA navigation (not fresh page load)
        setNavigated()

        setTimeout(() => {
            navigate(path)
        }, 200)
    }, [navigate, playNavSound])

    const isLetterVisible = (rowIndex, letterIndex) => {
        return visibleLetters[rowIndex]?.includes(letterIndex) || false
    }

    // Check if device supports hover
    const hasHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches

    return (
        <div className={`home ${showCursor ? 'cursor-visible' : 'cursor-hidden'}`}>
            {/* Target Cursor - Only visible after animations complete */}
            {showCursor && hasHover && <TargetCursor isHomePage={true} />}

            {/* Light Rays Background */}
            {showLightRays && (
                <div className="light-rays-bg visible">
                    <LightRays
                        raysOrigin="top-center"
                        raysColor="#ffffff"
                        raysSpeed={0.8}
                        lightSpread={1.2}
                        rayLength={2.5}
                        pulsating={true}
                        fadeDistance={1.2}
                        saturation={0.8}
                        followMouse={true}
                        mouseInfluence={0.15}
                        noiseAmount={0.05}
                        distortion={0.3}
                    />
                </div>
            )}

            {/* Grid Lines */}
            <div className={`grid-lines ${showLightRays ? 'visible' : ''}`}></div>

            {/* Particles */}
            <div className={`particles ${showLightRays ? 'visible' : ''}`}>
                {Array.from({ length: 15 }).map((_, i) => (
                    <div
                        key={i}
                        className="particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 20}s`,
                            animationDuration: `${25 + Math.random() * 15}s`
                        }}
                    />
                ))}
            </div>

            {/* Sound Toggle */}
            {showCursor && (
                <button className={`sound-toggle ${soundEnabled ? 'playing' : ''}`} onClick={toggleSound}>
                    <i className={`fas ${soundEnabled ? 'fa-volume-up' : 'fa-volume-mute'}`}></i>
                </button>
            )}

            {/* Logo Splash */}
            <div className={`logo-splash ${phase}`}>
                <div className="logo-container">
                    <img
                        src="/logo.svg"
                        alt="VCAMP Logo"
                        className="splash-logo"
                    />
                    <div className="logo-glow"></div>
                </div>
            </div>

            {/* Hero Content */}
            <section className="hero-section">
                <div className="hero-layout">
                    {/* Left Side - VCAMP */}
                    <div className={`vcamp-container ${phase === 'vcamp' || phase === 'nav' || phase === 'complete' ? 'visible' : ''}`}>
                        <div className="vcamp-stack">
                            {VCAMP_DATA.map((item, rowIndex) => (
                                <div
                                    key={rowIndex}
                                    className={`letter-row ${visibleRows.includes(rowIndex) ? 'visible' : ''}`}
                                >
                                    <span className="main-letter">{item.letter}</span>
                                    <div className="expansion-horizontal">
                                        {item.expansion.split('').map((char, letterIndex) => (
                                            <span
                                                key={letterIndex}
                                                className={isLetterVisible(rowIndex, letterIndex) ? 'visible' : ''}
                                            >
                                                {char}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={`tagline ${showNav ? 'visible' : ''}`}>
                            <span>İTÜ Girişimcilik Takımı</span>
                        </div>
                    </div>

                    {/* Right Side - Navigation */}
                    <nav className={`hero-nav ${showNav ? 'visible' : ''}`}>
                        <div className="nav-items">
                            {NAV_LINKS.map((link, i) => (
                                <a
                                    key={link.path}
                                    href={link.path}
                                    className="hero-nav-link"
                                    data-index={i}
                                    onClick={(e) => handleNavClick(e, link.path)}
                                >
                                    <span className="nav-number">{link.number}</span>
                                    <span className="nav-text">{link.label}</span>
                                </a>
                            ))}
                        </div>

                        <div className="social-bar">
                            <a href="https://www.instagram.com/ituvcamp/" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://www.linkedin.com/company/ituvcamp/" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a href="mailto:vcampteam@itu.edu.tr">
                                <i className="fas fa-envelope"></i>
                            </a>
                        </div>
                    </nav>
                </div>
            </section>
        </div>
    )
}

export default Home
