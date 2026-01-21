import { useRef, useEffect, useState } from 'react'
import './TargetCursor.css'

function TargetCursor({ isHomePage }) {
    const cursorRef = useRef(null)
    const cornersRef = useRef([])
    const [isVisible, setIsVisible] = useState(false)
    const [isClicking, setIsClicking] = useState(false)

    const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
    const cursorPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
    const isTargetingRef = useRef(false)
    const targetRectRef = useRef(null)
    const animationRef = useRef(null)

    useEffect(() => {
        if (!isHomePage) {
            setIsVisible(false)
            return
        }

        setIsVisible(true)

        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY }
        }

        const handleMouseDown = () => setIsClicking(true)
        const handleMouseUp = () => setIsClicking(false)

        const handleMouseEnter = (e) => {
            const target = e.target.closest('a, button, .cursor-target, .letter-row, .hero-nav-link')
            if (target) {
                isTargetingRef.current = true
                targetRectRef.current = target.getBoundingClientRect()
                if (cursorRef.current) {
                    cursorRef.current.classList.add('targeting')
                }
            }
        }

        const handleMouseLeave = (e) => {
            const target = e.target.closest('a, button, .cursor-target, .letter-row, .hero-nav-link')
            if (target) {
                isTargetingRef.current = false
                targetRectRef.current = null
                // Reset corners to default position
                cornersRef.current.forEach((corner, i) => {
                    if (corner) {
                        const defaultTransforms = [
                            'translate(-150%, -150%)',
                            'translate(50%, -150%)',
                            'translate(50%, 50%)',
                            'translate(-150%, 50%)'
                        ]
                        corner.style.transform = defaultTransforms[i]
                    }
                })
                if (cursorRef.current) {
                    cursorRef.current.classList.remove('targeting')
                }
            }
        }

        // Animate cursor
        const animate = () => {
            const ease = 0.15
            cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * ease
            cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * ease

            if (cursorRef.current) {
                cursorRef.current.style.left = `${cursorPos.current.x}px`
                cursorRef.current.style.top = `${cursorPos.current.y}px`

                // Update corner positions if targeting
                if (isTargetingRef.current && targetRectRef.current) {
                    const rect = targetRectRef.current
                    const cx = cursorPos.current.x
                    const cy = cursorPos.current.y
                    const pad = 5
                    const size = 12

                    const positions = [
                        { x: rect.left - pad - cx, y: rect.top - pad - cy },
                        { x: rect.right + pad - size - cx, y: rect.top - pad - cy },
                        { x: rect.right + pad - size - cx, y: rect.bottom + pad - size - cy },
                        { x: rect.left - pad - cx, y: rect.bottom + pad - size - cy }
                    ]

                    cornersRef.current.forEach((corner, i) => {
                        if (corner && positions[i]) {
                            corner.style.transform = `translate(${positions[i].x}px, ${positions[i].y}px)`
                        }
                    })
                }
            }

            animationRef.current = requestAnimationFrame(animate)
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mousedown', handleMouseDown)
        document.addEventListener('mouseup', handleMouseUp)
        document.addEventListener('mouseenter', handleMouseEnter, true)
        document.addEventListener('mouseleave', handleMouseLeave, true)

        animationRef.current = requestAnimationFrame(animate)

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mousedown', handleMouseDown)
            document.removeEventListener('mouseup', handleMouseUp)
            document.removeEventListener('mouseenter', handleMouseEnter, true)
            document.removeEventListener('mouseleave', handleMouseLeave, true)
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [isHomePage])

    if (!isVisible) return null

    return (
        <div
            ref={cursorRef}
            className={`target-cursor ${isClicking ? 'clicking' : ''}`}
        >
            <div className="cursor-dot"></div>
            <div className="cursor-corner corner-tl" ref={el => cornersRef.current[0] = el}></div>
            <div className="cursor-corner corner-tr" ref={el => cornersRef.current[1] = el}></div>
            <div className="cursor-corner corner-br" ref={el => cornersRef.current[2] = el}></div>
            <div className="cursor-corner corner-bl" ref={el => cornersRef.current[3] = el}></div>
        </div>
    )
}

export default TargetCursor
