import { createContext, useContext, useRef, useCallback, useState, useEffect } from 'react'

const AudioContext = createContext(null)

export function AudioProvider({ children }) {
    const audioContextRef = useRef(null)
    const [soundEnabled, setSoundEnabled] = useState(true)
    const [isReady, setIsReady] = useState(false)

    // Initialize audio context ONLY when needed (lazy initialization)
    const initAudioContext = useCallback(() => {
        if (!audioContextRef.current) {
            try {
                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
                setIsReady(true)
            } catch (e) {
                console.warn('AudioContext not supported:', e)
            }
        }
        return audioContextRef.current
    }, [])

    // Setup user interaction listeners to resume audio context
    useEffect(() => {
        const handleInteraction = () => {
            if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
                audioContextRef.current.resume().then(() => {
                    setIsReady(true)
                }).catch(err => {
                    console.warn('Failed to resume AudioContext:', err)
                })
            }
        }

        // Listen for user interactions to unlock audio
        document.addEventListener('click', handleInteraction)
        document.addEventListener('touchstart', handleInteraction)
        document.addEventListener('keydown', handleInteraction)

        return () => {
            document.removeEventListener('click', handleInteraction)
            document.removeEventListener('touchstart', handleInteraction)
            document.removeEventListener('keydown', handleInteraction)
        }
    }, [])

    const resumeAudio = useCallback(() => {
        const ctx = audioContextRef.current
        if (ctx && ctx.state === 'suspended') {
            ctx.resume()
        }
    }, [])

    const toggleSound = useCallback(() => {
        setSoundEnabled(prev => !prev)
    }, [])

    // Keyboard click sound
    const playKeyboardSound = useCallback(() => {
        const ctx = initAudioContext()
        if (!ctx || !soundEnabled) return
        resumeAudio()

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
    }, [initAudioContext, resumeAudio, soundEnabled])

    // Main letter sound (for VCAMP animation)
    const playMainLetterSound = useCallback((index) => {
        const ctx = initAudioContext()
        if (!ctx || !soundEnabled) return
        resumeAudio()

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
    }, [initAudioContext, resumeAudio, soundEnabled])

    // Whoosh sound for logo reveal
    const playWhooshSound = useCallback(() => {
        const ctx = initAudioContext()
        if (!ctx || !soundEnabled) return
        resumeAudio()

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
    }, [initAudioContext, resumeAudio, soundEnabled])

    // Click sound
    const playClickSound = useCallback(() => {
        const ctx = initAudioContext()
        if (!ctx || !soundEnabled) return
        resumeAudio()

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
    }, [initAudioContext, resumeAudio, soundEnabled])

    // Navigation sound - target lock-on effect
    // Navigation sound - Professional UI click (short, crisp, modern)
    const playNavSound = useCallback(() => {
        const ctx = initAudioContext()
        if (!ctx || !soundEnabled) return
        resumeAudio()

        const time = ctx.currentTime

        // Primary click - short sine pulse
        const osc1 = ctx.createOscillator()
        const gain1 = ctx.createGain()
        const filter1 = ctx.createBiquadFilter()

        // Secondary harmonic - adds depth
        const osc2 = ctx.createOscillator()
        const gain2 = ctx.createGain()

        // Master output
        const masterGain = ctx.createGain()
        const compressor = ctx.createDynamicsCompressor()

        // Routing
        osc1.connect(filter1)
        filter1.connect(gain1)
        gain1.connect(masterGain)

        osc2.connect(gain2)
        gain2.connect(masterGain)

        masterGain.connect(compressor)
        compressor.connect(ctx.destination)

        // Primary tone - clean sine with quick decay
        osc1.type = 'sine'
        osc1.frequency.setValueAtTime(1400, time)
        osc1.frequency.exponentialRampToValueAtTime(800, time + 0.06)

        filter1.type = 'lowpass'
        filter1.frequency.setValueAtTime(3000, time)
        filter1.Q.setValueAtTime(0.5, time)

        gain1.gain.setValueAtTime(0, time)
        gain1.gain.linearRampToValueAtTime(0.12, time + 0.003)
        gain1.gain.exponentialRampToValueAtTime(0.001, time + 0.08)

        // Secondary harmonic - subtle depth
        osc2.type = 'triangle'
        osc2.frequency.setValueAtTime(700, time)
        osc2.frequency.exponentialRampToValueAtTime(400, time + 0.04)

        gain2.gain.setValueAtTime(0, time)
        gain2.gain.linearRampToValueAtTime(0.04, time + 0.002)
        gain2.gain.exponentialRampToValueAtTime(0.001, time + 0.05)

        // Master settings
        masterGain.gain.setValueAtTime(0.7, time)

        compressor.threshold.setValueAtTime(-12, time)
        compressor.knee.setValueAtTime(6, time)
        compressor.ratio.setValueAtTime(4, time)
        compressor.attack.setValueAtTime(0.001, time)
        compressor.release.setValueAtTime(0.1, time)

        // Start and stop
        osc1.start(time)
        osc2.start(time)

        osc1.stop(time + 0.1)
        osc2.stop(time + 0.06)
    }, [initAudioContext, resumeAudio, soundEnabled])

    const value = {
        soundEnabled,
        isReady,
        toggleSound,
        playKeyboardSound,
        playMainLetterSound,
        playWhooshSound,
        playClickSound,
        playNavSound,
        initAudioContext,
        resumeAudio
    }

    return (
        <AudioContext.Provider value={value}>
            {children}
        </AudioContext.Provider>
    )
}

export function useAudio() {
    const context = useContext(AudioContext)
    if (!context) {
        throw new Error('useAudio must be used within AudioProvider')
    }
    return context
}
