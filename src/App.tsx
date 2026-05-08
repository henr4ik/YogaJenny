import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://anybtcupfycqqdhitxcj.supabase.co",
  "sb_publishable_g1hz9SoW5eExzDmLpou9zw_Dak3WVbD"
);
import "./App.css";

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  

 
  const [pillow, setPillow] = useState(false);
  const [bookingsCount, setBookingsCount] = useState(0);
  
  const handleBooking = async () => {
  if (!date || !name) {
    alert("Bitte Name und Datum auswählen");
    return;
  }

  const { error } = await supabase.from("bookings").insert([
    {
      name: name,
      course: selectedCourse.title,
      booking_date: date,
      needs_pillow: pillow,
    },
  ]);

  if (error) {
    console.log(error);
    alert("Fehler bei der Buchung");
  } else {
    alert("Buchung erfolgreich!");

    setBookingsCount(bookingsCount + 1);
  }
};

useEffect(() => {
  const loadBookings = async () => {
    if (!date || !selectedCourse) return;

    const { data } = await supabase
      .from("bookings")
      .select("*")
      .eq("booking_date", date)
      .eq("course", selectedCourse.title);

    if (data) {
      setBookingsCount(data.length);
    }
  };

  loadBookings();
}, [date, selectedCourse]);

  const courses = [
    {
      title: "Yoga für Fortgeschrittene",
      level: "Fortgeschrittene",
      time: "Montag · 17:00 Uhr",
      price: "12€",
    },
    {
      title: "Yoga für Einsteiger",
      level: "Einsteiger",
      time: "Dienstag · 17:00 Uhr",
      price: "12€",
    },
    {
      title: "Yoga für Fortgeschrittene",
      level: "Fortgeschrittene",
      time: "Dienstag · 18:30 Uhr",
      price: "12€",
    },
  ];

  return (
    <div className="app">
      {/* HERO */}
      <section className="hero">
        <p className="hero-top">RUHE · KRAFT · BALANCE</p>

        <h1>YOGA mit JENNY</h1>
        <img
          src="/yoga-logo.jpg"
          alt="Yoga mit Jenny"
          className="main-yoga-image"
        />

        <img
      src="/lotus.png"
      alt="Lotus"
      className="lotus-image"
      />

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

            <img
            src="/lotus.png"
            alt="Lotus"
            className="popup-lotus-image"
            />

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
            
           {date && (
          <div className="spots-info">
            {12 - bookingsCount > 0
              ? `${12 - bookingsCount} Plätze frei`
              : "Leider ausgebucht"}
          </div>
          )}
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

            <button className="mail-btn" onClick={handleBooking}>
            Jetzt buchen
            </button>
          </div>
        </div>
      )}

      {/* KONTAKT */}
      <section className="contact-section" id="kontakt">
        <img
          src="/lotus.png"
          alt="Lotus"
          className="lotus-image"
        />

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