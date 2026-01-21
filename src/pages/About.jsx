import PageLayout from '../components/PageLayout'
import './About.css'

function About() {
    return (
        <PageLayout title="Hakkımızda" number="01">
            <section className="about-intro">
                <div className="intro-content">
                    <p className="intro-highlight">
                        <span className="highlight">ITU VCAMP</span> (Vision, Community and Making Project), İstanbul Teknik
                        Üniversitesi girişimcilik ekosisteminin en aktif topluluklarından biri olan VCAMP çatısı altında
                        oluşturulan proje takımıdır.
                    </p>
                    <p className="intro-text">
                        Takımımız, farklı mühendislik ve tasarım disiplinlerinden gelen girişimci ruhlu öğrencilerden
                        oluşmaktadır. Amacımız, yenilikçi iş fikirlerini hızlıca valide etmek, prototiplerini
                        geliştirmek ve potansiyel yatırımcılara sunulabilecek seviyeye getirmektir.
                    </p>
                </div>
            </section>

            <section className="values-section">
                <h2 className="section-subtitle">Değerlerimiz</h2>
                <div className="values-grid">
                    <div className="value-card">
                        <div className="value-icon">
                            <i className="fas fa-brain"></i>
                        </div>
                        <h3>Yapay Zeka</h3>
                        <p>AI destekli uygulamalar geliştiriyoruz</p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon">
                            <i className="fas fa-rocket"></i>
                        </div>
                        <h3>Hızlı Prototipleme</h3>
                        <p>Fikirlerimizi hızla hayata geçiriyoruz</p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon">
                            <i className="fas fa-users"></i>
                        </div>
                        <h3>Disiplinler Arası</h3>
                        <p>Farklı alanlardan uzmanlar bir arada</p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon">
                            <i className="fas fa-lightbulb"></i>
                        </div>
                        <h3>UX Odaklı</h3>
                        <p>Kullanıcı deneyimi önceliğimiz</p>
                    </div>
                </div>
            </section>

            <section className="mission-vision-section">
                <div className="mv-grid">
                    <div className="mv-card mission">
                        <div className="mv-icon"><i className="fas fa-crosshairs"></i></div>
                        <h3>Misyonumuz</h3>
                        <p>Gerçek problemleri hızlı, kullanıcı odaklı ve sürdürülebilir çözümlerle çözmek. Farklı
                            disiplinlerden gelen girişimci öğrenciler olarak; yenilikçi fikirleri valide edip,
                            prototiplerini geliştirerek, teknolojiyi insanların hayatına dokunan ürünlere dönüştürmeyi
                            amaçlıyoruz.</p>
                    </div>
                    <div className="mv-card vision">
                        <div className="mv-icon"><i className="fas fa-eye"></i></div>
                        <h3>Vizyonumuz</h3>
                        <p>Türkiye'nin en etkili öğrenci girişim takımı olarak, global ölçekte etki yaratmak. Hedefimiz, İTÜ
                            VCAMP çatısı altında geliştirdiğimiz projeleri yatırım alabilecek seviyeye getirerek,
                            Türkiye'nin teknoloji girişimciliği ekosistemine öncülük etmek.</p>
                    </div>
                </div>
            </section>

            <section className="stats-section">
                <div className="stats-grid">
                    <div className="stat-card">
                        <span className="stat-value">29</span>
                        <span className="stat-label">Aktif Üye</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-value">2024</span>
                        <span className="stat-label">Kuruluş Yılı</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-value">1</span>
                        <span className="stat-label">Aktif Proje</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-value">1</span>
                        <span className="stat-label">Ödül</span>
                    </div>
                </div>
            </section>
        </PageLayout>
    )
}

export default About
