import PageLayout from '../components/PageLayout'
import './Team.css'

const TEAM_MEMBERS = [
    { name: 'Yusuf Alper İlhan', role: 'Takım Kaptanı', category: 'leadership' },
    { name: 'Elif Yılmaz', role: 'Product Manager', category: 'leadership' },
    { name: 'Can Öztürk', role: 'Lead Developer', category: 'development' },
    { name: 'Zeynep Kaya', role: 'UI/UX Designer', category: 'design' },
    { name: 'Ahmet Demir', role: 'Backend Developer', category: 'development' },
    { name: 'Selin Arslan', role: 'Frontend Developer', category: 'development' },
    { name: 'Burak Çelik', role: 'AI Engineer', category: 'development' },
    { name: 'Ayşe Korkmaz', role: 'Marketing Lead', category: 'marketing' },
]

function Team() {
    return (
        <PageLayout title="Ekibimiz" number="02">
            <div className="team-intro">
                <p>Farklı disiplinlerden gelen, girişimci ruhlu öğrencilerden oluşan güçlü bir ekibiz.</p>
            </div>

            <div className="team-grid">
                {TEAM_MEMBERS.map((member, i) => (
                    <div key={i} className={`team-card ${member.category === 'leadership' ? 'featured' : ''}`}>
                        <div className="member-image">
                            <div className="image-placeholder">
                                <i className="fas fa-user"></i>
                            </div>
                        </div>
                        <div className="member-info">
                            <h3>{member.name}</h3>
                            <span className="role">{member.role}</span>
                        </div>
                        <div className="member-social">
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-github"></i>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </PageLayout>
    )
}

export default Team
