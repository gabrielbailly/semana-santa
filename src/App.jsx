import React, { useEffect, useMemo, useRef, useState } from "react";

const QUESTION_TIME = 7;

const LEVEL_LABELS = {
  facil: "Fácil",
  medio: "Medio",
  dificil: "Difícil",
};

const QUESTIONS = [
  { id: 1, text: "¿Qué celebración aparece en esta escena?", options: ["La Última Cena", "La Resurrección", "La Ascensión", "Pentecostés"], correctAnswer: 0, difficulty: "facil", image: "/images/1.jpg" },
  { id: 2, text: "¿Cuántos discípulos estaban con Jesús en la Última Cena?", options: ["10", "12", "7", "15"], correctAnswer: 1, difficulty: "facil", image: "/images/1.jpg" },
  { id: 3, text: "¿Qué alimento parte Jesús en la Última Cena?", options: ["Pan", "Pescado", "Cordero", "Fruta"], correctAnswer: 0, difficulty: "facil", image: "/images/1.jpg" },
  { id: 4, text: "¿Dónde reza Jesús antes de ser arrestado?", options: ["Monte Tabor", "Huerto de Getsemaní", "Nazaret", "Jerusalén"], correctAnswer: 1, difficulty: "facil", image: "/images/2.jpg" },
  { id: 5, text: "¿Qué hacen los discípulos mientras Jesús reza?", options: ["Hablan", "Duermen", "Comen", "Huyen"], correctAnswer: 1, difficulty: "facil", image: "/images/2.jpg" },
  { id: 6, text: "¿Qué está haciendo Jesús en esta escena?", options: ["Predicando", "Rezando", "Caminando", "Comiendo"], correctAnswer: 1, difficulty: "facil", image: "/images/2.jpg" },
  { id: 7, text: "¿Ante quién comparece Jesús en esta escena?", options: ["Herodes", "Pilato", "Caifás", "Pedro"], correctAnswer: 1, difficulty: "facil", image: "/images/3.jpg" },
  { id: 8, text: "¿Qué autoridad juzga a Jesús?", options: ["Romana", "Griega", "Egipcia", "Persa"], correctAnswer: 0, difficulty: "facil", image: "/images/3.jpg" },
  { id: 9, text: "¿Qué lleva Jesús sobre sus hombros?", options: ["Una cruz", "Una espada", "Una corona", "Un estandarte"], correctAnswer: 0, difficulty: "facil", image: "/images/4.jpg" },
  { id: 10, text: "¿Hacia dónde se dirige Jesús con la cruz?", options: ["Nazaret", "Calvario", "Belén", "Cafarnaúm"], correctAnswer: 1, difficulty: "facil", image: "/images/4.jpg" },
  { id: 11, text: "¿A quién encuentra Jesús en el camino al Calvario según la tradición?", options: ["Su madre", "Juan Bautista", "Herodes", "Un sacerdote"], correctAnswer: 0, difficulty: "facil", image: "/images/5.jpg" },
  { id: 12, text: "¿Cómo se llama este camino tradicionalmente?", options: ["Camino de Santiago", "Vía Crucis", "Camino Real", "Sendero Santo"], correctAnswer: 1, difficulty: "facil", image: "/images/5.jpg" },
  { id: 13, text: "¿Dónde muere Jesús?", options: ["En una cruz", "En un templo", "En una casa", "En un barco"], correctAnswer: 0, difficulty: "facil", image: "/images/6.jpg" },
  { id: 14, text: "¿Cuántas cruces aparecen normalmente en esta escena?", options: ["Dos", "Tres", "Cuatro", "Cinco"], correctAnswer: 1, difficulty: "facil", image: "/images/6.jpg" },
  { id: 15, text: "¿Qué están haciendo con el cuerpo de Jesús?", options: ["Lo están enterrando", "Lo están bajando de la cruz", "Lo están coronando", "Lo están llevando a Roma"], correctAnswer: 1, difficulty: "facil", image: "/images/7.jpg" },
  { id: 16, text: "¿Cómo se llama este momento?", options: ["Descendimiento", "Ascensión", "Bautismo", "Transfiguración"], correctAnswer: 0, difficulty: "facil", image: "/images/7.jpg" },
  { id: 17, text: "¿Dónde colocan el cuerpo de Jesús?", options: ["En una tumba", "En el templo", "En el río", "En una cueva"], correctAnswer: 0, difficulty: "facil", image: "/images/8.jpg" },
  { id: 18, text: "¿Qué cerraba la entrada del sepulcro?", options: ["Una puerta", "Una gran piedra", "Un muro", "Una cortina"], correctAnswer: 1, difficulty: "facil", image: "/images/8.jpg" },
  { id: 19, text: "¿Quién aparece junto al sepulcro vacío?", options: ["Un ángel", "Un soldado", "Pedro", "Pilato"], correctAnswer: 0, difficulty: "facil", image: "/images/9.jpg" },
  { id: 20, text: "¿Quién se encuentra con Jesús resucitado?", options: ["María Magdalena", "María y Marta", "Verónica", "Salomé"], correctAnswer: 0, difficulty: "facil", image: "/images/10.jpg" },

  { id: 21, text: "¿Qué sacramento instituye Jesús en la Última Cena?", options: ["Bautismo", "Eucaristía", "Confirmación", "Matrimonio"], correctAnswer: 1, difficulty: "medio", image: "/images/1.jpg" },
  { id: 22, text: "¿Qué bebida comparte Jesús con sus discípulos?", options: ["Agua", "Vino", "Leche", "Aceite"], correctAnswer: 1, difficulty: "medio", image: "/images/1.jpg" },
  { id: 23, text: "¿Qué fiesta judía celebraban durante esta cena?", options: ["Pentecostés", "Pascua", "Hanukkah", "Yom Kippur"], correctAnswer: 1, difficulty: "medio", image: "/images/1.jpg" },
  { id: 24, text: "¿Qué discípulo acompañan más de cerca a Jesús en Getsemaní?", options: ["Pedro, Santiago y Juan", "Mateo, Tomás y Andrés", "Felipe, Bartolomé y Judas", "Simón, Judas y Mateo"], correctAnswer: 0, difficulty: "medio", image: "/images/2.jpg" },
  { id: 25, text: "¿Qué pidió Jesús al Padre en su oración?", options: ["Poder", "Gloria", "Que se hiciera su voluntad", "Riquezas"], correctAnswer: 2, difficulty: "medio", image: "/images/2.jpg" },
  { id: 26, text: "¿Qué gobernaba Pilato en Judea?", options: ["El ejército", "El imperio romano", "El templo", "La sinagoga"], correctAnswer: 1, difficulty: "medio", image: "/images/3.jpg" },
  { id: 27, text: "¿Qué preso fue liberado en lugar de Jesús?", options: ["Barrabás", "Herodes", "Simón", "Caifás"], correctAnswer: 0, difficulty: "medio", image: "/images/3.jpg" },
  { id: 28, text: "¿Quién ayudó a Jesús a llevar la cruz?", options: ["Simón de Cirene", "Pedro", "Juan", "Andrés"], correctAnswer: 0, difficulty: "medio", image: "/images/4.jpg" },
  { id: 29, text: "¿Qué mujeres lloraban al ver a Jesús?", options: ["Las mujeres de Jerusalén", "Las romanas", "Las fariseas", "Las samaritanas"], correctAnswer: 0, difficulty: "medio", image: "/images/4.jpg" },
  { id: 30, text: "¿Qué mujer secó el rostro de Jesús según la tradición?", options: ["Verónica", "Magdalena", "Salomé", "Marta"], correctAnswer: 0, difficulty: "medio", image: "/images/5.jpg" },
  { id: 31, text: "¿Qué signo se colocó sobre la cruz de Jesús?", options: ["INRI", "XP", "IHS", "ALFA"], correctAnswer: 0, difficulty: "medio", image: "/images/6.jpg" },
  { id: 32, text: "¿Quién estaba junto a Jesús en las otras cruces?", options: ["Dos ladrones", "Dos soldados", "Dos discípulos", "Dos sacerdotes"], correctAnswer: 0, difficulty: "medio", image: "/images/6.jpg" },
  { id: 33, text: "¿Quién pidió el cuerpo de Jesús para enterrarlo?", options: ["José de Arimatea", "Pedro", "Herodes", "Barrabás"], correctAnswer: 0, difficulty: "medio", image: "/images/7.jpg" },
  { id: 34, text: "¿Qué discípulo ayudó también en el entierro?", options: ["Nicodemo", "Mateo", "Tomás", "Felipe"], correctAnswer: 0, difficulty: "medio", image: "/images/7.jpg" },
  { id: 35, text: "¿De qué material estaba excavado el sepulcro?", options: ["Roca", "Madera", "Arena", "Arcilla"], correctAnswer: 0, difficulty: "medio", image: "/images/8.jpg" },
  { id: 36, text: "¿Qué día fue enterrado Jesús?", options: ["Viernes", "Domingo", "Lunes", "Miércoles"], correctAnswer: 0, difficulty: "medio", image: "/images/8.jpg" },
  { id: 37, text: "¿Qué anuncia el ángel en el sepulcro?", options: ["Que Jesús ha resucitado", "Que Jesús dormía", "Que Jesús partió", "Que Jesús regresará luego"], correctAnswer: 0, difficulty: "medio", image: "/images/9.jpg" },
  { id: 38, text: "¿Qué mujeres fueron al sepulcro?", options: ["María Magdalena y otras mujeres", "Solo María", "Las romanas", "Las discípulas"], correctAnswer: 0, difficulty: "medio", image: "/images/9.jpg" },
  { id: 39, text: "¿Qué día ocurrió la resurrección?", options: ["Domingo", "Viernes", "Jueves", "Sábado"], correctAnswer: 0, difficulty: "medio", image: "/images/10.jpg" },
  { id: 40, text: "¿Qué reconoce María Magdalena al ver a Jesús?", options: ["Que está vivo", "Que es un ángel", "Que es Pedro", "Que es un soldado"], correctAnswer: 0, difficulty: "medio", image: "/images/10.jpg" },

  { id: 41, text: "¿Qué gesto de servicio realizó Jesús durante la Última Cena?", options: ["Lavó los pies a los discípulos", "Curó a un enfermo", "Multiplicó panes", "Resucitó a Lázaro"], correctAnswer: 0, difficulty: "dificil", image: "/images/1.jpg" },
  { id: 42, text: "¿Quién traicionó a Jesús?", options: ["Judas Iscariote", "Pedro", "Juan", "Santiago"], correctAnswer: 0, difficulty: "dificil", image: "/images/1.jpg" },
  { id: 43, text: "¿Qué nuevo mandamiento dio Jesús en la Última Cena?", options: ["Amaos unos a otros", "Conquistad el mundo", "Construid templos", "Haced sacrificios"], correctAnswer: 0, difficulty: "dificil", image: "/images/1.jpg" },
  { id: 44, text: "¿Qué discípulo cortó la oreja de un soldado?", options: ["Pedro", "Juan", "Tomás", "Felipe"], correctAnswer: 0, difficulty: "dificil", image: "/images/2.jpg" },
  { id: 45, text: "¿Cómo se llamaba el soldado cuya oreja fue cortada?", options: ["Malco", "Lucas", "Cayo", "Tito"], correctAnswer: 0, difficulty: "dificil", image: "/images/2.jpg" },
  { id: 46, text: "¿Qué pregunta famosa hizo Pilato a Jesús?", options: ["¿Qué es la verdad?", "¿Quién eres?", "¿Dónde naciste?", "¿Quién te envía?"], correctAnswer: 0, difficulty: "dificil", image: "/images/3.jpg" },
  { id: 47, text: "¿Qué gesto hizo Pilato para mostrar que no era responsable?", options: ["Se lavó las manos", "Se arrodilló", "Rasgó sus vestiduras", "Escribió una carta"], correctAnswer: 0, difficulty: "dificil", image: "/images/3.jpg" },
  { id: 48, text: "¿Cuántas caídas de Jesús recuerda la tradición del Vía Crucis?", options: ["Tres", "Dos", "Cinco", "Cuatro"], correctAnswer: 0, difficulty: "dificil", image: "/images/4.jpg" },
  { id: 49, text: "¿Cómo se llama el monte donde fue crucificado Jesús?", options: ["Gólgota", "Tabor", "Carmelo", "Hermón"], correctAnswer: 0, difficulty: "dificil", image: "/images/4.jpg" },
  { id: 50, text: "¿Qué frase dirige Jesús a las mujeres de Jerusalén?", options: ["No lloréis por mí", "Seguidme", "Escuchadme", "Esperad aquí"], correctAnswer: 0, difficulty: "dificil", image: "/images/5.jpg" },
  { id: 51, text: "¿Qué dijo Jesús al buen ladrón?", options: ["Hoy estarás conmigo en el Paraíso", "Te perdono", "Te salvaré", "Ven conmigo"], correctAnswer: 0, difficulty: "dificil", image: "/images/6.jpg" },
  { id: 52, text: "¿Qué palabras finales pronunció Jesús según el evangelio de Juan?", options: ["Todo está cumplido", "Padre ayúdame", "Tengo sed", "Venid a mí"], correctAnswer: 0, difficulty: "dificil", image: "/images/6.jpg" },
  { id: 53, text: "¿Cómo se llama la escena de María con Jesús muerto en brazos?", options: ["La Piedad", "La Gloria", "La Misericordia", "La Esperanza"], correctAnswer: 0, difficulty: "dificil", image: "/images/7.jpg" },
  { id: 54, text: "¿Qué tela envolvió el cuerpo de Jesús?", options: ["Una sábana", "Un manto púrpura", "Un velo", "Una túnica"], correctAnswer: 0, difficulty: "dificil", image: "/images/7.jpg" },
  { id: 55, text: "¿Qué especias llevaron al sepulcro?", options: ["Mirra y áloe", "Canela y miel", "Aceite y sal", "Incienso y vino"], correctAnswer: 0, difficulty: "dificil", image: "/images/8.jpg" },
  { id: 56, text: "¿Qué soldados vigilaban el sepulcro?", options: ["Romanos", "Judíos", "Griegos", "Egipcios"], correctAnswer: 0, difficulty: "dificil", image: "/images/8.jpg" },
  { id: 57, text: "¿Qué dice el ángel a las mujeres?", options: ["No está aquí, ha resucitado", "Está dormido", "Volverá mañana", "Buscad en otro lugar"], correctAnswer: 0, difficulty: "dificil", image: "/images/9.jpg" },
  { id: 58, text: "¿Qué sucede con la piedra del sepulcro?", options: ["Está removida", "Está rota", "Está sellada", "Está enterrada"], correctAnswer: 0, difficulty: "dificil", image: "/images/9.jpg" },
  { id: 59, text: "¿Qué palabra hebrea dice María Magdalena al reconocer a Jesús?", options: ["Rabbuní", "Hosanna", "Amen", "Shalom"], correctAnswer: 0, difficulty: "dificil", image: "/images/10.jpg" },
  { id: 60, text: "¿Qué significa Rabbuní?", options: ["Maestro", "Rey", "Señor", "Padre"], correctAnswer: 0, difficulty: "dificil", image: "/images/10.jpg" },
];

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickTen(level) {
  return shuffle(QUESTIONS.filter((question) => question.difficulty === level)).slice(0, 10);
}

function useGameSounds(enabled) {
  const audioContextRef = useRef(null);

  const ensureAudioContext = () => {
    if (typeof window === "undefined") return null;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    if (!audioContextRef.current) audioContextRef.current = new AudioCtx();
    if (audioContextRef.current.state === "suspended") audioContextRef.current.resume();
    return audioContextRef.current;
  };

  const playTone = (type) => {
    if (!enabled) return;
    const ctx = ensureAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const gain = ctx.createGain();
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.0001, now);

    const note = (frequency, start, duration, waveform = "triangle") => {
      const osc = ctx.createOscillator();
      osc.type = waveform;
      osc.frequency.setValueAtTime(frequency, start);
      osc.connect(gain);
      osc.start(start);
      osc.stop(start + duration);
    };

    if (type === "correct") {
      note(523.25, now, 0.12);
      note(659.25, now + 0.1, 0.16);
      gain.gain.exponentialRampToValueAtTime(0.08, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
    }

    if (type === "error") {
      note(220, now, 0.14, "sawtooth");
      note(180, now + 0.08, 0.18, "sawtooth");
      gain.gain.exponentialRampToValueAtTime(0.07, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
    }

    if (type === "final") {
      note(392, now, 0.14);
      note(523.25, now + 0.12, 0.16);
      note(659.25, now + 0.26, 0.24);
      gain.gain.exponentialRampToValueAtTime(0.08, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
    }
  };

  return { ensureAudioContext, playTone };
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [level, setLevel] = useState("facil");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [imageVisible, setImageVisible] = useState(true);

  const timeoutHandledRef = useRef(false);
  const { ensureAudioContext, playTone } = useGameSounds(soundEnabled);

  const currentQuestion = questions[current];
  const progress = questions.length ? ((current + 1) / questions.length) * 100 : 0;
  const timerProgress = (timeLeft / QUESTION_TIME) * 100;

  const stats = useMemo(() => {
    const correct = answers.filter((item) => item.isCorrect).length;
    return { correct, wrong: answers.length - correct };
  }, [answers]);

  const startGame = (selectedLevel) => {
    ensureAudioContext();
    setLevel(selectedLevel);
    setQuestions(pickTen(selectedLevel));
    setCurrent(0);
    setSelected(null);
    setLocked(false);
    setScore(0);
    setAnswers([]);
    setTimeLeft(QUESTION_TIME);
    setImageVisible(true);
    timeoutHandledRef.current = false;
    setScreen("quiz");
  };

  const registerAnswer = (optionIndex, isTimeout = false) => {
    if (!currentQuestion || locked) return;

    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    setSelected(optionIndex);
    setLocked(true);
    timeoutHandledRef.current = true;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      playTone("correct");
    } else {
      playTone("error");
    }

    setAnswers((prev) => [
      ...prev,
      {
        question: currentQuestion.text,
        options: currentQuestion.options,
        selected: optionIndex,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect,
        timedOut: isTimeout,
      },
    ]);
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
      setSelected(null);
      setLocked(false);
      setTimeLeft(QUESTION_TIME);
      setImageVisible(true);
      timeoutHandledRef.current = false;
      return;
    }
    playTone("final");
    setScreen("results");
  };

  useEffect(() => {
    if (screen !== "quiz" || !currentQuestion || locked) return undefined;

    setTimeLeft(QUESTION_TIME);
    setImageVisible(true);
    timeoutHandledRef.current = false;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (!timeoutHandledRef.current) registerAnswer(null, true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [screen, current, locked]);

  const optionClassName = (index) => {
    if (!locked) return "optionButton";
    if (index === currentQuestion.correctAnswer) return "optionButton optionCorrect";
    if (index === selected) return "optionButton optionWrong";
    return "optionButton optionMuted";
  };

  return (
    <div className="appShell">
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif; background: #fff8f1; }
        button { font: inherit; }
        .appShell {
          min-height: 100vh;
          background: linear-gradient(135deg, #fff7ed 0%, #ffffff 45%, #fff1e6 100%);
          color: #1f2937;
          padding: 20px;
        }
        .container {
          max-width: 980px;
          margin: 0 auto;
        }
        .topBar {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 18px;
        }
        .soundButton, .primaryButton, .secondaryButton, .levelButton {
          border: none;
          border-radius: 16px;
          cursor: pointer;
          transition: transform 0.15s ease, opacity 0.15s ease, box-shadow 0.15s ease;
        }
        .soundButton:hover, .primaryButton:hover, .secondaryButton:hover, .levelButton:hover { transform: translateY(-1px); }
        .soundButton {
          background: #ffffff;
          padding: 12px 16px;
          box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
          color: #374151;
        }
        .hero {
          text-align: center;
          margin-bottom: 22px;
        }
        .hero h1 {
          margin: 0;
          font-size: clamp(2rem, 4vw, 3.5rem);
          line-height: 1.05;
        }
        .hero p {
          margin: 10px auto 0;
          max-width: 700px;
          color: #6b7280;
          font-size: 1rem;
        }
        .homeButtons {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-top: 28px;
        }
        .levelButton {
          background: white;
          padding: 26px 18px;
          box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
          text-align: center;
        }
        .levelButtonTitle {
          display: block;
          font-size: 1.4rem;
          font-weight: 800;
          margin-bottom: 8px;
        }
        .levelButtonText {
          display: block;
          color: #6b7280;
          font-size: 0.95rem;
        }
        .card {
          background: white;
          border-radius: 28px;
          box-shadow: 0 18px 42px rgba(15, 23, 42, 0.08);
          overflow: hidden;
        }
        .cardBody {
          padding: 20px;
        }
        .metaRow {
          display: flex;
          gap: 12px;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }
        .metaLeft, .metaRight {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .pill {
          background: #f3f4f6;
          padding: 8px 12px;
          border-radius: 999px;
          font-size: 0.92rem;
          font-weight: 600;
          color: #374151;
        }
        .progressTrack {
          width: 100%;
          height: 12px;
          background: #e5e7eb;
          border-radius: 999px;
          overflow: hidden;
          margin-bottom: 10px;
        }
        .progressFill {
          height: 100%;
          background: linear-gradient(90deg, #f59e0b, #f97316);
          border-radius: 999px;
          transition: width 0.25s ease;
        }
        .timerFill {
          background: linear-gradient(90deg, #ef4444, #f59e0b);
        }
        .questionImage {
          width: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          display: block;
          background: #f3f4f6;
        }
        .questionTitle {
          font-size: clamp(1.2rem, 2vw, 1.9rem);
          font-weight: 800;
          line-height: 1.25;
          margin: 18px 0;
        }
        .optionsGrid {
          display: grid;
          gap: 12px;
        }
        .optionButton {
          width: 100%;
          text-align: left;
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 18px;
          padding: 16px;
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        .optionButton:hover { border-color: #f59e0b; background: #fffbeb; }
        .optionCorrect { border-color: #22c55e; background: #ecfdf5; }
        .optionWrong { border-color: #ef4444; background: #fff1f2; }
        .optionMuted { opacity: 0.7; }
        .optionLetter {
          width: 34px;
          height: 34px;
          border-radius: 999px;
          background: #f3f4f6;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          flex: 0 0 auto;
        }
        .feedbackBox {
          margin-top: 18px;
          padding: 16px;
          border-radius: 18px;
          background: #f9fafb;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .primaryButton {
          background: linear-gradient(135deg, #f59e0b, #ea580c);
          color: white;
          padding: 13px 18px;
          font-weight: 700;
        }
        .secondaryButton {
          background: white;
          color: #374151;
          padding: 13px 18px;
          border: 1px solid #d1d5db;
          font-weight: 700;
        }
        .resultsScore {
          font-size: clamp(2.6rem, 6vw, 4.5rem);
          font-weight: 900;
          margin: 8px 0 0;
        }
        .statsGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin-top: 22px;
        }
        .statBox {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          padding: 18px;
          text-align: center;
        }
        .statLabel { color: #6b7280; font-size: 0.95rem; }
        .statValue { margin-top: 6px; font-size: 1.8rem; font-weight: 800; }
        .resultsButtons {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 24px;
        }
        .reviewList {
          display: grid;
          gap: 12px;
          margin-top: 22px;
        }
        .reviewItem {
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: flex-start;
          flex-wrap: wrap;
        }
        .tag {
          border-radius: 999px;
          padding: 8px 12px;
          color: white;
          font-size: 0.88rem;
          font-weight: 700;
        }
        .tag.ok { background: #16a34a; }
        .tag.bad { background: #dc2626; }
        @media (max-width: 768px) {
          .appShell { padding: 14px; }
          .homeButtons, .statsGrid { grid-template-columns: 1fr; }
          .cardBody { padding: 16px; }
          .feedbackBox { align-items: stretch; }
          .primaryButton, .secondaryButton, .soundButton, .levelButton { width: 100%; }
        }
      `}</style>

      <div className="container">
        <div className="topBar">
          <button
            className="soundButton"
            onClick={() => {
              ensureAudioContext();
              setSoundEnabled((prev) => !prev);
            }}
          >
            {soundEnabled ? "🔊 Sonido activado" : "🔇 Sonido desactivado"}
          </button>
        </div>

        <div className="hero" style={{position:"relative"}}>
          <div style={{position:"relative",overflow:"hidden",borderRadius:20,maxWidth:720,margin:"0 auto 20px",boxShadow:"0 12px 40px rgba(0,0,0,0.2)"}}>
            <img 
              src="/images/portada.png" 
              alt="Portada Semana Santa" 
              style={{width:"100%",display:"block",transform:"scale(1.05)",animation:"zoomHero 20s ease-in-out infinite alternate"}}
            />
            <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(0,0,0,0.15),rgba(0,0,0,0.45))",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:14,color:"white",textAlign:"center",padding:20}}>
              <div style={{fontSize:"clamp(2rem,4vw,3rem)",fontWeight:900,letterSpacing:1}}>Trivial de Semana Santa</div>
              <div style={{fontSize:"1rem",opacity:0.9,maxWidth:500}}>Pon a prueba tus conocimientos sobre la Pasión, Muerte y Resurrección de Jesús</div>
              <button
                onClick={() => document.getElementById("levels")?.scrollIntoView({behavior:"smooth"})}
                style={{marginTop:8,background:"linear-gradient(135deg,#f59e0b,#ea580c)",border:"none",borderRadius:14,padding:"14px 26px",fontWeight:800,color:"white",cursor:"pointer",fontSize:16,boxShadow:"0 8px 20px rgba(0,0,0,0.25)"}}
              >▶ JUGAR</button>
            </div>
          </div>
          <p style={{maxWidth:700,margin:"0 auto",color:"#6b7280"}}>Elige un nivel y responde 10 preguntas aleatorias. Todas las imágenes pueden ir juntas dentro de <strong>public/images</strong>.</p>
          <style>{`@keyframes zoomHero { from { transform: scale(1.05);} to { transform: scale(1.15);} }`}</style>
        </div>

        {screen === "home" && (
          <div id="levels" className="homeButtons">
            {Object.entries(LEVEL_LABELS).map(([key, label]) => (
              <button key={key} className="levelButton" onClick={() => startGame(key)}>
                <span className="levelButtonTitle">{label}</span>
                <span className="levelButtonText">10 preguntas aleatorias de un banco de 20</span>
              </button>
            ))}
          </div>
        )}

        {screen === "quiz" && currentQuestion && (
          <div className="card">
            {currentQuestion.image && imageVisible && (
              <img
                key={currentQuestion.id}
                className="questionImage"
                src={currentQuestion.image}
                alt={currentQuestion.text}
                onError={() => setImageVisible(false)}
              />
            )}

            <div className="cardBody">
              <div className="metaRow">
                <div className="metaLeft">
                  <span className="pill">Nivel {LEVEL_LABELS[level]}</span>
                  <span className="pill">Pregunta {current + 1} / {questions.length}</span>
                </div>
                <div className="metaRight">
                  <span className="pill">Puntuación: {score}</span>
                  <span className="pill">⏱ {timeLeft}s</span>
                </div>
              </div>

              <div className="progressTrack">
                <div className="progressFill" style={{ width: `${progress}%` }} />
              </div>
              <div className="progressTrack">
                <div className="progressFill timerFill" style={{ width: `${timerProgress}%` }} />
              </div>

              <div className="questionTitle">{currentQuestion.text}</div>

              <div className="optionsGrid">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={option}
                    className={optionClassName(index)}
                    disabled={locked}
                    onClick={() => registerAnswer(index, false)}
                  >
                    <span className="optionLetter">{String.fromCharCode(65 + index)}</span>
                    <span>{option}</span>
                  </button>
                ))}
              </div>

              {locked && (
                <div className="feedbackBox">
                  <div>
                    {selected === currentQuestion.correctAnswer && <strong>✅ ¡Correcta!</strong>}
                    {selected !== currentQuestion.correctAnswer && selected !== null && (
                      <strong>❌ La correcta es: {currentQuestion.options[currentQuestion.correctAnswer]}</strong>
                    )}
                    {selected === null && <strong>⌛ Tiempo agotado. La correcta es: {currentQuestion.options[currentQuestion.correctAnswer]}</strong>}
                  </div>
                  <button className="primaryButton" onClick={nextQuestion}>
                    {current < questions.length - 1 ? "Siguiente" : "Ver resultados"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {screen === "results" && (
          <div>
            <div className="card">
              <div className="cardBody" style={{ textAlign: "center" }}>
                <div style={{ fontSize: 56 }}>🏆</div>
                <h2 style={{ marginBottom: 0 }}>Resultado final</h2>
                <p style={{ color: "#6b7280" }}>Nivel {LEVEL_LABELS[level]}</p>
                <div className="resultsScore">{score}/10</div>

                <div className="statsGrid">
                  <div className="statBox">
                    <div className="statLabel">Aciertos</div>
                    <div className="statValue" style={{ color: "#16a34a" }}>{stats.correct}</div>
                  </div>
                  <div className="statBox">
                    <div className="statLabel">Fallos</div>
                    <div className="statValue" style={{ color: "#dc2626" }}>{stats.wrong}</div>
                  </div>
                  <div className="statBox">
                    <div className="statLabel">Nivel</div>
                    <div className="statValue" style={{ color: "#d97706" }}>{LEVEL_LABELS[level]}</div>
                  </div>
                </div>

                <div className="resultsButtons">
                  <button className="primaryButton" onClick={() => startGame(level)}>Jugar otra vez</button>
                  <button className="secondaryButton" onClick={() => setScreen("home")}>Cambiar nivel</button>
                </div>
              </div>
            </div>

            <div className="card" style={{ marginTop: 22 }}>
              <div className="cardBody">
                <h3 style={{ marginTop: 0 }}>Revisión de respuestas</h3>
                <div className="reviewList">
                  {answers.map((item, index) => (
                    <div key={`${item.question}-${index}`} className="reviewItem">
                      <div>
                        <div style={{ fontWeight: 800 }}>{index + 1}. {item.question}</div>
                        <div style={{ marginTop: 8, color: "#6b7280" }}>
                          Tu respuesta: <strong>{item.selected === null ? "Sin responder" : item.options[item.selected]}</strong>
                        </div>
                        {!item.isCorrect && (
                          <div style={{ marginTop: 6, color: "#166534" }}>
                            Correcta: <strong>{item.options[item.correctAnswer]}</strong>
                          </div>
                        )}
                      </div>
                      <div className={`tag ${item.isCorrect ? "ok" : "bad"}`}>
                        {item.isCorrect ? "Correcta" : item.timedOut ? "Sin tiempo" : "Incorrecta"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
