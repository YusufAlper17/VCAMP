import PageLayout from '../components/PageLayout'
import './Projects.css'

const PROJECTS = [
    {
        name: 'Mindly',
        description: 'Terapistler için AI destekli seans yönetim ve transkript analiz platformu.',
        status: 'active',
        tech: ['React', 'Node.js', 'AI/ML', 'Firebase'],
        team: 8,
        icon: 'fa-brain'
    },
    {
        name: 'VCAMP Website',
        description: 'Takımın kurumsal web sitesi ve portfolyo platformu.',
        status: 'active',
        tech: ['React', 'Vite', 'WebGL'],
        team: 3,
        icon: 'fa-globe'
    }
]

function Projects() {
    return (
        <PageLayout title="Projeler" number="03">
            <div className="projects-grid">
                {PROJECTS.map((project, i) => (
                    <div key={i} className={`project-card ${project.status === 'active' ? 'featured' : ''}`}>
                        <div className="project-header">
                            <div className="project-icon">
                                <i className={`fas ${project.icon}`}></i>
                            </div>
                            <span className={`project-tag ${project.status}`}>
                                {project.status === 'active' ? 'Aktif' : 'Geliştirme'}
                            </span>
                        </div>
                        <div className="project-content">
                            <h3>{project.name}</h3>
                            <p>{project.description}</p>
                            <div className="project-meta">
                                <span><i className="fas fa-users"></i> {project.team} Kişi</span>
                            </div>
                            <div className="project-tech">
                                {project.tech.map((tech, j) => (
                                    <span key={j}>{tech}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </PageLayout>
    )
}

export default Projects
