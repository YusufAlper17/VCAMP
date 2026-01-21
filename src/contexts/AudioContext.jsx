import { createContext, useContext, useRef, useCallback, useState, useEffect } from 'react'

const AudioContextReact = createContext(null)

export function AudioProvider({ children }) {
    const audioContextRef = useRef(null)
    const [soundEnabled, setSoundEnabled] = useState(true)
    const [isReady, setIsReady] = useState(false)
    const hasUserInteracted = useRef(false)

    // Only create AudioContext after user interaction
    const getAudioContext = useCallback(() => {
        // Don't create if user hasn't interacted yet
        if (!hasUserInteracted.current) {
            return null
        }

        if (!audioContextRef.current) {
            try {
                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
                if (audioContextRef.current.state === 'running') {
                    setIsReady(true)
                }
            } catch (e) {
                console.warn('AudioContext not supported')
                return null
            }
        }
        return audioContextRef.current
    }, [])

    // Setup user interaction listeners
    useEffect(() => {
        const handleInteraction = () => {
            hasUserInteracted.current = true

            // Create and resume AudioContext on first interaction
            if (!audioContextRef.current) {
                try {
                    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
                } catch (e) {
                    return
                }
            }

            if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
                audioContextRef.current.resume().then(() => {
                    setIsReady(true)
                }).catch(() => { })
            } else if (audioContextRef.current) {
                setIsReady(true)
            }
        }

        // Listen for user interactions
        document.addEventListener('click', handleInteraction)
        document.addEventListener('touchstart', handleInteraction)
        document.addEventListener('keydown', handleInteraction)

        return () => {
            document.removeEventListener('click', handleInteraction)
            document.removeEventListener('touchstart', handleInteraction)
            document.removeEventListener('keydown', handleInteraction)
        }
    }, [])

    const toggleSound = useCallback(() => {
        setSoundEnabled(prev => !prev)
    }, [])

    // Safe sound player wrapper
    const safePlaySound = useCallback((soundFn) => {
        if (!hasUserInteracted.current || !soundEnabled) return

        const ctx = audioContextRef.current
        if (!ctx || ctx.state !== 'running') return

        try {
            soundFn(ctx)
        } catch (e) {
            // Silently fail
        }
    }, [soundEnabled])

    // Keyboard click sound
    const playKeyboardSound = useCallback(() => {
        safePlaySound((ctx) => {
            const time = ctx.currentTime

            const osc = ctx.createOscillator()
            const osc2 = ctx.createOscillator()
            const gain = ctx.createGain()
            const gain2 = ctx.createGain()
            const filter = ctx.createBiquadFilter()

            osc.connect(filter)
            osc2.connect(gain2)
            filter.connect(gain)
            gain.connect(ctx.destination)
            gain2.connect(ctx.destination)

            osc.type = 'sine'
            osc.frequency.setValueAtTime(3500, time)
            osc.frequency.exponentialRampToValueAtTime(1200, time + 0.015)

            osc2.type = 'triangle'
            osc2.frequency.setValueAtTime(2000 + Math.random() * 500, time)
            osc2.frequency.exponentialRampToValueAtTime(600, time + 0.02)

            filter.type = 'highpass'
            filter.frequency.setValueAtTime(800, time)

            gain.gain.setValueAtTime(0, time)
            gain.gain.linearRampToValueAtTime(0.04, time + 0.001)
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04)

            gain2.gain.setValueAtTime(0, time)
            gain2.gain.linearRampToValueAtTime(0.02, time + 0.002)
            gain2.gain.exponentialRampToValueAtTime(0.001, time + 0.03)

            osc.start(time)
            osc2.start(time)
            osc.stop(time + 0.05)
            osc2.stop(time + 0.04)
        })
    }, [safePlaySound])

    // Main letter sound (for VCAMP animation)
    const playMainLetterSound = useCallback((index) => {
        safePlaySound((ctx) => {
            const time = ctx.currentTime
            const frequencies = [220, 261.63, 293.66, 349.23, 392]
            const freq = frequencies[index] || 293.66

            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            const filter = ctx.createBiquadFilter()

            osc.connect(filter)
            filter.connect(gain)
            gain.connect(ctx.destination)

            osc.type = 'sine'
            osc.frequency.setValueAtTime(freq, time)

            filter.type = 'lowpass'
            filter.frequency.setValueAtTime(1500, time)
            filter.frequency.exponentialRampToValueAtTime(500, time + 0.2)
            filter.Q.setValueAtTime(1, time)

            gain.gain.setValueAtTime(0, time)
            gain.gain.linearRampToValueAtTime(0.06, time + 0.01)
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3)

            osc.start(time)
            osc.stop(time + 0.35)
        })
    }, [safePlaySound])

    // Whoosh sound for logo reveal
    const playWhooshSound = useCallback(() => {
        safePlaySound((ctx) => {
            const time = ctx.currentTime

            const bufferSize = ctx.sampleRate * 1.2
            const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
            const output = noiseBuffer.getChannelData(0)
            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1
            }

            const noise = ctx.createBufferSource()
            const filter = ctx.createBiquadFilter()
            const gain = ctx.createGain()

            noise.buffer = noiseBuffer
            noise.connect(filter)
            filter.connect(gain)
            gain.connect(ctx.destination)

            filter.type = 'bandpass'
            filter.frequency.setValueAtTime(200, time)
            filter.frequency.exponentialRampToValueAtTime(1500, time + 0.4)
            filter.frequency.exponentialRampToValueAtTime(400, time + 1.0)
            filter.Q.setValueAtTime(2, time)

            gain.gain.setValueAtTime(0, time)
            gain.gain.linearRampToValueAtTime(0.05, time + 0.2)
            gain.gain.setValueAtTime(0.05, time + 0.5)
            gain.gain.linearRampToValueAtTime(0, time + 1.2)

            noise.start(time)
            noise.stop(time + 1.2)
        })
    }, [safePlaySound])

    // Click sound
    const playClickSound = useCallback(() => {
        safePlaySound((ctx) => {
            const time = ctx.currentTime

            const osc = ctx.createOscillator()
            const osc2 = ctx.createOscillator()
            const gain = ctx.createGain()
            const gain2 = ctx.createGain()
            const filter = ctx.createBiquadFilter()

            osc.connect(filter)
            osc2.connect(gain2)
            filter.connect(gain)
            gain.connect(ctx.destination)
            gain2.connect(ctx.destination)

            osc.type = 'sine'
            osc.frequency.setValueAtTime(1800, time)
            osc.frequency.exponentialRampToValueAtTime(600, time + 0.03)

            osc2.type = 'triangle'
            osc2.frequency.setValueAtTime(4000, time)
            osc2.frequency.exponentialRampToValueAtTime(1500, time + 0.02)

            filter.type = 'bandpass'
            filter.frequency.setValueAtTime(1200, time)
            filter.Q.setValueAtTime(1, time)

            gain.gain.setValueAtTime(0, time)
            gain.gain.linearRampToValueAtTime(0.1, time + 0.002)
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08)

            gain2.gain.setValueAtTime(0, time)
            gain2.gain.linearRampToValueAtTime(0.04, time + 0.001)
            gain2.gain.exponentialRampToValueAtTime(0.001, time + 0.04)

            osc.start(time)
            osc2.start(time)
            osc.stop(time + 0.1)
            osc2.stop(time + 0.05)
        })
    }, [safePlaySound])

    // Navigation sound - Professional UI click
    const playNavSound = useCallback(() => {
        safePlaySound((ctx) => {
            const time = ctx.currentTime

            const osc1 = ctx.createOscillator()
            const gain1 = ctx.createGain()
            const filter1 = ctx.createBiquadFilter()

            const osc2 = ctx.createOscillator()
            const gain2 = ctx.createGain()

            const masterGain = ctx.createGain()
            const compressor = ctx.createDynamicsCompressor()

            osc1.connect(filter1)
            filter1.connect(gain1)
            gain1.connect(masterGain)

            osc2.connect(gain2)
            gain2.connect(masterGain)

            masterGain.connect(compressor)
            compressor.connect(ctx.destination)

            osc1.type = 'sine'
            osc1.frequency.setValueAtTime(1400, time)
            osc1.frequency.exponentialRampToValueAtTime(800, time + 0.06)

            filter1.type = 'lowpass'
            filter1.frequency.setValueAtTime(3000, time)
            filter1.Q.setValueAtTime(0.5, time)

            gain1.gain.setValueAtTime(0, time)
            gain1.gain.linearRampToValueAtTime(0.12, time + 0.003)
            gain1.gain.exponentialRampToValueAtTime(0.001, time + 0.08)

            osc2.type = 'triangle'
            osc2.frequency.setValueAtTime(700, time)
            osc2.frequency.exponentialRampToValueAtTime(400, time + 0.04)

            gain2.gain.setValueAtTime(0, time)
            gain2.gain.linearRampToValueAtTime(0.04, time + 0.002)
            gain2.gain.exponentialRampToValueAtTime(0.001, time + 0.05)

            masterGain.gain.setValueAtTime(0.7, time)

            compressor.threshold.setValueAtTime(-12, time)
            compressor.knee.setValueAtTime(6, time)
            compressor.ratio.setValueAtTime(4, time)
            compressor.attack.setValueAtTime(0.001, time)
            compressor.release.setValueAtTime(0.1, time)

            osc1.start(time)
            osc2.start(time)

            osc1.stop(time + 0.1)
            osc2.stop(time + 0.06)
        })
    }, [safePlaySound])

    const value = {
        soundEnabled,
        isReady,
        toggleSound,
        playKeyboardSound,
        playMainLetterSound,
        playWhooshSound,
        playClickSound,
        playNavSound,
        initAudioContext: getAudioContext,
        resumeAudio: () => { }
    }

    return (
        <AudioContextReact.Provider value={value}>
            {children}
        </AudioContextReact.Provider>
    )
}

export function useAudio() {
    const context = useContext(AudioContextReact)
    if (!context) {
        throw new Error('useAudio must be used within AudioProvider')
    }
    return context
}
