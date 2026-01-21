import { useState } from 'react'
import PageLayout from '../components/PageLayout'
import './Contact.css'

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission
        console.log('Form submitted:', formData)
        alert('Mesajınız gönderildi! En kısa sürede size dönüş yapacağız.')
        setFormData({ name: '', email: '', subject: '', message: '' })
    }

    return (
        <PageLayout title="İletişim" number="05">
            <div className="contact-grid">
                <div className="contact-info">
                    <h3>Bize Ulaşın</h3>
                    <p>
                        Projelerimiz hakkında bilgi almak, işbirliği yapmak veya takımımıza katılmak için
                        bizimle iletişime geçebilirsiniz.
                    </p>

                    <div className="contact-details">
                        <div className="contact-item">
                            <i className="fas fa-envelope"></i>
                            <a href="mailto:vcampteam@itu.edu.tr">vcampteam@itu.edu.tr</a>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <span>İstanbul Teknik Üniversitesi<br />Ayazağa Kampüsü, Maslak</span>
                        </div>
                    </div>

                    <div className="social-links">
                        <a href="https://www.instagram.com/ituvcamp/" target="_blank" rel="noopener noreferrer" className="social-link">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://www.linkedin.com/company/ituvcamp/" target="_blank" rel="noopener noreferrer" className="social-link">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a href="mailto:vcampteam@itu.edu.tr" className="social-link">
                            <i className="fas fa-envelope"></i>
                        </a>
                    </div>
                </div>

                <div className="contact-form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder=" "
                                required
                            />
                            <label>Adınız</label>
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder=" "
                                required
                            />
                            <label>E-posta</label>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder=" "
                                required
                            />
                            <label>Konu</label>
                        </div>
                        <div className="form-group">
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder=" "
                                rows="5"
                                required
                            ></textarea>
                            <label>Mesajınız</label>
                        </div>
                        <button type="submit" className="submit-btn">
                            Gönder
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </div>
        </PageLayout>
    )
}

export default Contact
