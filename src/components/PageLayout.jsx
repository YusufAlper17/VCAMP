import { Link } from 'react-router-dom'
import { useAudio } from '../contexts/AudioContext'
import { setNavigated } from '../utils/navigationState'
import './PageLayout.css'

function PageLayout({ children, title, number }) {
    const { playClickSound } = useAudio()

    const handleBackClick = () => {
        playClickSound()
        // Mark that we're doing SPA navigation back to home
        setNavigated()
    }

    return (
        <div className="page">
            {/* Back Button */}
            <Link to="/" className="back-button" onClick={handleBackClick}>
                <i className="fas fa-arrow-left"></i>
                <span>Ana Sayfa</span>
            </Link>

            {/* Page Header */}
            <header className="page-header">
                <div className="page-header-content">
                    <span className="section-number">{number}</span>
                    <h1 className="page-title">{title}</h1>
                    <div className="page-line"></div>
                </div>
            </header>

            {/* Main Content */}
            <main className="page-main">
                {children}
            </main>

            {/* Footer */}
            <footer className="page-footer">
                <div className="footer-content">
                    <p>© 2026 İTÜ VCAMP. Vision • Community • And • Making • Project</p>
                </div>
            </footer>
        </div>
    )
}

export default PageLayout
