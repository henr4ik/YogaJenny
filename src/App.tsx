import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./App.css";

const supabase = createClient(
  "https://anybtcupfycqqdhitxcj.supabase.co",
  "DEIN_SUPABASE_PUBLIC_KEY"
);

export default function YogaWebsite() {
  const [kurse, setKurse] = useState<any[]>([]);

  useEffect(() => {
    ladeKurse();
  }, []);

  async function ladeKurse() {
    const { data } = await supabase.from("kurse").select("*");
    if (data) setKurse(data);
  }

  return (
    <div className="app">
      {/* HERO */}
      <section className="hero">
        <p className="top-text">RUHE · KRAFT · BALANCE</p>

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
      <section className="kurse-section" id="kurse">
        <h2>Unsere Kurse</h2>

        <div className="kurse-grid">
          {kurse.map((kurs) => (
            <div className="kurs-card" key={kurs.id}>
              <h3>{kurs.name}</h3>

              <p>
                <strong>Level:</strong> {kurs.level}
              </p>

              <p>
                <strong>Tag:</strong> {kurs.tag}
              </p>

              <p>
                <strong>Uhrzeit:</strong> {kurs.uhrzeit}
              </p>

              <p>
                <strong>Trainerin:</strong> Jenny
              </p>

              <p>
                <strong>Preis:</strong> {kurs.preis} €
              </p>

              <p>
                <strong>Freie Plätze:</strong> {kurs.freie_plaetze}
              </p>

              <a
                href={`mailto:jenny.wenger@t-online.de?subject=Yoga Anmeldung&body=
Hallo Jenny,%0D%0A%0D%0A
ich möchte mich gerne anmelden.%0D%0A%0D%0A
Kurs: ${kurs.name}%0D%0A
Tag: ${kurs.tag}%0D%0A
Uhrzeit: ${kurs.uhrzeit}%0D%0A%0D%0A
Name:%0D%0A
Telefon:%0D%0A%0D%0A
Liebe Grüße`}
              >
                <button className="anmelden-btn">
                  Jetzt einschreiben
                </button>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* KONTAKT */}
      <section className="kontakt-section" id="kontakt">
        <h2>Kontakt</h2>

        <p>Jenny Wenger</p>

        <p>Zeesen</p>

        <p>
          E-Mail:{" "}
          <a href="mailto:jenny.wenger@t-online.de">
            jenny.wenger@t-online.de
          </a>
        </p>
      </section>
    </div>
  );
}