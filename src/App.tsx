import { useState } from "react";
import "./index.css";

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [pillow, setPillow] = useState(false);

  const courses = [
    {
      title: "Yoga für Einsteiger",
      level: "Einsteiger",
      time: "Montag · 18:00 Uhr",
      places: "12 Plätze frei",
      price: "15€",
    },
    {
      title: "Abend Flow Yoga",
      level: "Mittelstufe",
      time: "Mittwoch · 19:00 Uhr",
      places: "8 Plätze frei",
      price: "18€",
    },
    {
      title: "Ruhe & Balance",
      level: "Alle Level",
      time: "Freitag · 17:30 Uhr",
      places: "10 Plätze frei",
      price: "16€",
    },
  ];

  return (
    <div className="app">
      {/* HERO */}
      <section className="hero">
        <p className="hero-top">RUHE · KRAFT · BALANCE</p>

        <h1>YOGA mit JENNY</h1>

        <div className="lotus">🪷</div>

        <p className="hero-text">
          Entdecke entspannende Yoga-Kurse in Zeesen. Stärke Körper und Geist
          mit professionellen Kursen für Anfänger und Fortgeschrittene.
        </p>

        <div className="hero-buttons">
          <a href="#kurse">Kurse ansehen</a>

          <a href="#kontakt">Kontakt</a>
        </div>
      </section>

      {/* KURSE */}
      <section className="courses-section" id="kurse">
        <p className="section-top">UNSERE KURSE</p>

        <h2>Finde deinen perfekten Yoga Kurs</h2>

        <div className="courses-grid">
          {courses.map((course, index) => (
            <div className="course-card" key={index}>
              <div className="emoji">🧘‍♀️</div>

              <p className="level">{course.level}</p>

              <h3>{course.title}</h3>

              <p>{course.time}</p>

              <p>{course.places}</p>

              <p>{course.price}</p>

              <button onClick={() => setSelectedCourse(course)}>
                Jetzt einschreiben
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* POPUP */}
      {selectedCourse && (
        <div className="popup-overlay">
          <div className="popup">
            <button
              className="close-btn"
              onClick={() => setSelectedCourse(null)}
            >
              ×
            </button>

            <div className="popup-lotus">🪷</div>

            <h3>{selectedCourse.title}</h3>

            <p>{selectedCourse.time}</p>

            <input
              type="text"
              placeholder="Dein Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <button
              type="button"
              className={`pillow-button ${pillow ? "active" : ""}`}
              onClick={() => setPillow(!pillow)}
            >
              <div className="pillow-left">
                <div className="pillow-icon">
                  {pillow ? "🪷" : "☁️"}
                </div>

                <div className="pillow-text">
                  <strong>Yoga Polster</strong>

                  <span>
                    {pillow
                      ? "Polster wird bereitgestellt"
                      : "Polster hinzufügen"}
                  </span>
                </div>
              </div>

              <div className="pillow-status">
                {pillow ? "✓" : "+"}
              </div>
            </button>

            <a
              className="mail-btn"
              href={`mailto:jenny.wenger@t-online.de?subject=Yoga Anmeldung&body=
Hallo Jenny,%0D%0A%0D%0A
ich möchte mich gerne anmelden.%0D%0A%0D%0A
Kurs: ${selectedCourse.title}%0D%0A
Zeit: ${selectedCourse.time}%0D%0A
Datum: ${date}%0D%0A
Name: ${name}%0D%0A
Polster benötigt: ${pillow ? "Ja" : "Nein"}%0D%0A%0D%0A
Liebe Grüße`}
            >
              Jetzt buchen
            </a>
          </div>
        </div>
      )}

      {/* KONTAKT */}
      <section className="contact-section" id="kontakt">
        <div className="lotus">🪷</div>

        <h2>Kontakt</h2>

        <p>Jenny Wenger</p>

        <p>Zeesen</p>

        <p>
          <a href="mailto:jenny.wenger@t-online.de">
            jenny.wenger@t-online.de
          </a>
        </p>
      </section>
    </div>
  );
}