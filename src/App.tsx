import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://anybtcupfycqqdhitxcj.supabase.co",
  "sb_publishable_g1hz9SoW5eExzDmLpou9zw_Dak3WVbD"
);

export default function YogaWebsite() {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [needsPillow, setNeedsPillow] = useState(false);
  const [trialModal, setTrialModal] = useState(false);
  const [trialCourse, setTrialCourse] = useState("");
  const [trialDate, setTrialDate] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    const { data } = await supabase
      .from("bookings")
      .select("*");

    if (data) {
      setBookings(data);
    }
  }

  async function handleBooking(course: any) {
    if (!name || !selectedDate) return;

    await supabase.from("bookings").insert([
      {
        name,
        course: course.title,
        booking_date: selectedDate,
        needs_pillow: needsPillow
      }
    ]);

    setSuccess(true);
    loadBookings();
  }

  const courses = [
    {
      id: 1,
      title: "Abend Yoga",
      time: "Montag · 18:00 - 19:00 Uhr",
      trainer: "Jenny",
      places: 12,
      booked: 8,
      level: "Alle Level",
      price: "12 € pro Stunde"
    },
    {
      id: 2,
      title: "Yoga für Einsteiger",
      time: "Dienstag · 17:00 - 18:00 Uhr",
      trainer: "Jenny",
      places: 15,
      booked: 11,
      level: "Einsteiger",
      price: "12 € pro Stunde"
    },
    {
      id: 3,
      title: "Abend Flow Yoga",
      time: "Dienstag · 18:30 - 19:30 Uhr",
      trainer: "Jenny",
      places: 10,
      booked: 5,
      level: "Fortgeschritten",
      price: "12 € pro Stunde"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8d8f1] via-[#fbe7f5] to-[#f4c8ea] text-rose-950 overflow-hidden relative">
      <div className="absolute inset-0 bg-pink-100 opacity-70" />
      <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      <header className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_#ffffff,_transparent_35%)]" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="uppercase tracking-[0.45em] text-sm font-semibold text-[#7b1e5b] mb-6">
              RUHE · KRAFT · BALANCE
            </p>

            <h1 className="text-6xl lg:text-8xl font-serif font-bold leading-none text-[#6e114f] drop-shadow-sm">
              YOGA mit
              <span className="block text-[#8a1d67] mt-2">JENNY</span>
            </h1>

            <div className="flex items-center gap-4 mt-8 mb-8">
              <div className="h-px flex-1 bg-rose-300" />
              <div className="text-3xl text-[#8a1d67]">🪷</div>
              <div className="h-px flex-1 bg-rose-300" />
            </div>

            <p className="text-xl leading-relaxed text-[#6e114f]/80 max-w-xl">
              Entdecke entspannende Yoga-Kurse in Zeesen. Stärke Körper und Geist mit professionellen Yoga-Einheiten für Anfänger und Fortgeschrittene.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <a
                href="#kurse"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#b04ac9] to-[#ff8ad8] text-white font-semibold shadow-2xl hover:scale-105 hover:shadow-[0_0_25px_rgba(255,138,216,0.6)] active:scale-95 transition-all duration-300 border border-white/40"
              >
                Kurse ansehen
              </a>

              <a
                href="#kontakt"
                className="px-8 py-4 rounded-full bg-white/50 backdrop-blur-xl border border-white/70 font-semibold hover:bg-white/80 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg"
              >
                Kontakt
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-8 -left-8 w-40 h-40 bg-white/40 rounded-full blur-3xl" />

            <div className="relative rounded-[3rem] p-5 bg-white/20 backdrop-blur-2xl border border-white/40 shadow-[0_0_80px_rgba(255,105,180,0.3)]">
              <img
                src="/mnt/data/feacf2d6-90dd-4ee7-9395-a95ffeef3cef.jpeg"
                alt="Yoga"
                className="rounded-[2.5rem] h-[650px] w-full object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </header>

      <section className="relative max-w-7xl mx-auto px-6 py-24" id="kurse">
        <div className="text-center mb-20">
          <p className="uppercase tracking-[0.4em] text-sm text-[#8a1d67] font-semibold">
            Unsere Kurse
          </p>

          <h2 className="text-4xl font-bold mt-4">
            Deine Yoga Kurse
          </h2>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {courses.map((course) => {
            const bookedCount = bookings.filter(
              (booking: any) => booking.course === course.title
            ).length;

            const available = course.places - bookedCount;
            const percent = (bookedCount / course.places) * 100;

            return (
              <div
                key={course.id}
                className="bg-white/40 backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-[0_10px_40px_rgba(190,24,93,0.15)] border border-white/60 hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(255,138,216,0.35)] transition-all duration-500 overflow-hidden relative"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#b04ac9] to-[#ff8ad8] text-white text-sm font-semibold shadow-lg">
                    {course.level}
                  </span>

                  <span className="text-sm text-gray-500">
                    {course.time}
                  </span>
                </div>

                <h3 className="text-3xl font-serif font-bold mb-4 text-rose-950">
                  {course.title}
                </h3>

                <div className="text-gray-600 mb-8 space-y-2">
                  <p>
                    Trainerin: {course.trainer}
                  </p>
                  <p>
                    Preis: {course.price}
                  </p>
                </div>

                <div className="mb-4 flex justify-between text-sm font-medium">
                  <span>Verfügbare Plätze</span>
                  <span>{available} von {course.places}</span>
                </div>

                <div className="w-full h-3 bg-white/60 rounded-full overflow-hidden mb-8">
                  <div
                    className="h-full bg-gradient-to-r from-[#9d4edd] via-[#d46bf5] to-[#ff8ad8] rounded-full shadow-lg"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <button
                  onClick={() => {
                    setSelectedCourse(course);
                    setSuccess(false);
                  }}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#b04ac9] to-[#ff8ad8] text-white font-semibold shadow-xl hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,138,216,0.7)] active:scale-95 transition-all duration-300"
                >
                  Jetzt einschreiben
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-3 gap-8">
          <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-xl border border-white/60">
            <div className="text-4xl mb-5">🧘</div>
            <h3 className="text-2xl font-bold mb-4">Entspannung</h3>
            <p className="text-gray-600 leading-relaxed">
              Finde Ruhe und Balance im Alltag durch gezielte Atem- und Yogaübungen.
            </p>
          </div>

          <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-xl border border-white/60">
            <div className="text-4xl mb-5">🌿</div>
            <h3 className="text-2xl font-bold mb-4">Gesundheit</h3>
            <p className="text-gray-600 leading-relaxed">
              Stärke deinen Körper, verbessere deine Beweglichkeit und steigere dein Wohlbefinden.
            </p>
          </div>

          <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-xl border border-white/60">
            <div className="text-4xl mb-5">✨</div>
            <h3 className="text-2xl font-bold mb-4">Community</h3>
            <p className="text-gray-600 leading-relaxed">
              Trainiere gemeinsam mit motivierten Teilnehmern in entspannter Atmosphäre.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-24 text-center relative" id="kontakt">
        <p className="uppercase tracking-[0.3em] text-sm text-rose-600 font-semibold mb-4">
          Kontakt
        </p>

        <h2 className="text-4xl font-bold mb-6">
          Starte noch heute deine Yoga Reise
        </h2>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10">
          Die Anmeldung erfolgt telefonisch oder per WhatsApp unter
          <span className="font-semibold text-rose-600"> 03375 / 49 51 0 11</span>.
          
          Die Kurse finden in der Kita Spatzennest, Puschkinstr. 74 in Zeesen statt.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setTrialModal(true)}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#b04ac9] to-[#ff8ad8] text-white font-semibold hover:scale-105 hover:shadow-[0_0_25px_rgba(255,138,216,0.6)] active:scale-95 transition-all duration-300"
          >
            Probestunde buchen
          </button>

          <a
            href="mailto:jenny.wenger@t-online.de?subject=Yoga"
            className="px-8 py-4 rounded-2xl bg-white/70 border border-white/70 font-semibold hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg"
          >
            E-Mail senden
          </a>
        </div>
      </section>

      <footer className="border-t border-white/30 bg-white/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-rose-600">
              Yoga mit Jenny
            </h3>
            <p className="text-[#6e114f]/70 mt-1">
              RUHE · KRAFT · BALANCE
            </p>
          </div>

          <p className="text-[#6e114f]/70 text-sm">
            © 2026 Yoga mit Jenny – Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>

      {selectedCourse && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="w-full max-w-md bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-2xl border border-white/70 relative">
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-5 right-5 text-2xl text-[#8a1d67] hover:scale-110 transition"
            >
              ×
            </button>

            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🪷</div>
              <h3 className="text-3xl font-serif font-bold text-[#6e114f]">
                Kurs buchen
              </h3>
              <p className="text-[#7b1e5b]/80 mt-3">
                {selectedCourse.title}
              </p>
            </div>

            {!success ? (
              <>
                <label className="block text-sm font-semibold text-[#6e114f] mb-3">
                  Dein Name
                </label>

                <input
                  type="text"
                  placeholder="Name eingeben"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl border border-rose-200 bg-white/70 outline-none focus:ring-2 focus:ring-rose-400 mb-6"
                />

                <div className="space-y-5 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#6e114f] mb-3">
                      Datum auswählen
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl border border-rose-200 bg-white/70 outline-none focus:ring-2 focus:ring-rose-400"
                    />
                  </div>

                  <label className="flex items-center gap-3 bg-white/60 rounded-2xl p-4 border border-white/70 cursor-pointer hover:bg-white/80 transition-all">
                    <input
                      type="checkbox"
                      checked={needsPillow}
                      onChange={(e) => setNeedsPillow(e.target.checked)}
                      className="w-5 h-5 accent-pink-500"
                    />
                    <span className="text-[#6e114f] font-medium">
                      Ich benötige ein Polster
                    </span>
                  </label>
                </div>

                <button
                  onClick={() => handleBooking(selectedCourse)}
                  className="block text-center w-full py-4 rounded-full bg-gradient-to-r from-[#b04ac9] to-[#ff8ad8] text-white font-semibold shadow-xl hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,138,216,0.7)] active:scale-95 transition-all duration-300"
                >
                  Jetzt buchen
                </button>

                <p className="text-sm text-center text-[#7b1e5b]/70 mt-4 leading-relaxed">
                  Die Anmeldung wird direkt gespeichert und die verfügbaren Plätze aktualisieren sich automatisch.
                </p>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="text-6xl mb-4">✨</div>
                <h4 className="text-2xl font-bold text-[#6e114f] mb-3">
                  Anmeldung vorbereitet
                </h4>
                <p className="text-[#7b1e5b]/80 leading-relaxed">
                  Deine Nachricht wurde vorbereitet und kann jetzt versendet werden.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {trialModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="w-full max-w-md bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-2xl border border-white/70 relative">
            <button
              onClick={() => setTrialModal(false)}
              className="absolute top-5 right-5 text-2xl text-[#8a1d67] hover:scale-110 transition"
            >
              ×
            </button>

            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🪷</div>
              <h3 className="text-3xl font-serif font-bold text-[#6e114f]">
                Probestunde buchen
              </h3>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#6e114f] mb-3">
                  Kurs auswählen
                </label>
                <select
                  value={trialCourse}
                  onChange={(e) => setTrialCourse(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl border border-rose-200 bg-white/70 outline-none focus:ring-2 focus:ring-rose-400"
                >
                  <option value="">Bitte wählen</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.title}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#6e114f] mb-3">
                  Datum auswählen
                </label>
                <input
                  type="date"
                  value={trialDate}
                  onChange={(e) => setTrialDate(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl border border-rose-200 bg-white/70 outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <a
                href={`mailto:jenny.wenger@t-online.de?subject=Probestunde Yoga&body=Hallo Jenny,%0D%0A%0D%0AIch möchte eine Probestunde buchen.%0D%0AKurs: ${trialCourse}%0D%0ADatum: ${trialDate}%0D%0A%0D%0AViele Grüße`}
                className="block text-center w-full py-4 rounded-full bg-gradient-to-r from-[#b04ac9] to-[#ff8ad8] text-white font-semibold shadow-xl hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,138,216,0.7)] active:scale-95 transition-all duration-300"
              >
                Probestunde anfragen
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
