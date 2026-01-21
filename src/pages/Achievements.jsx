import PageLayout from '../components/PageLayout'
import './Achievements.css'

const ACHIEVEMENTS = [
    {
        title: '1. Lig - En İyi Proje',
        event: 'ITU Entrepreneurship Summit 2024',
        description: 'Mindly projemiz ile girişimcilik zirvesinde birinci lige yükseldik ve en iyi proje ödülünü kazandık.',
        rank: '1',
        icon: 'fa-trophy'
    }
]

const EVENTS = [
    {
        day: '15',
        month: 'Ara',
        year: '2024',
        title: 'ITU Entrepreneurship Summit',
        description: 'Üniversitemizin en büyük girişimcilik etkinliğinde projemizi sunduk.',
        badge: 'Yarışma',
        location: 'İTÜ Ayazağa Kampüsü'
    }
]

function Achievements() {
    return (
        <PageLayout title="Başarılar" number="04">
            <div className="achievements-grid">
                {ACHIEVEMENTS.map((achievement, i) => (
                    <div key={i} className="achievement-card">
                        <div className="achievement-trophy">
                            <i className={`fas ${achievement.icon}`}></i>
                            <span className="rank">{achievement.rank}</span>
                        </div>
                        <div className="achievement-content">
                            <h3>{achievement.title}</h3>
                            <span className="event">{achievement.event}</span>
                            <p>{achievement.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <section className="events-section">
                <h2 className="section-subtitle">Etkinlikler</h2>
                <div className="events-timeline">
                    {EVENTS.map((event, i) => (
                        <div key={i} className="event-item">
                            <div className="event-date">
                                <span className="day">{event.day}</span>
                                <span className="month">{event.month}</span>
                                <span className="year">{event.year}</span>
                            </div>
                            <div className="event-content">
                                <span className="event-badge">{event.badge}</span>
                                <h3>{event.title}</h3>
                                <p>{event.description}</p>
                                <div className="event-details">
                                    <span><i className="fas fa-map-marker-alt"></i> {event.location}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </PageLayout>
    )
}

export default Achievements
