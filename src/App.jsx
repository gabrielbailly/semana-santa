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
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickTen(level) {
  return shuffle(QUESTIONS.filter(q => q.difficulty === level)).slice(0, 10);
}

function useGameSounds(enabled) {
  const ctxRef = useRef(null);

  const getCtx = () => {
    if (!enabled) return null;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!ctxRef.current) ctxRef.current = new AudioCtx();
    return ctxRef.current;
  };

  const beep = (freq, dur = 0.1) => {
    const ctx = getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    osc.stop(ctx.currentTime + dur);
  };

  return {
    correct: () => beep(600),
    error: () => beep(200),
    final: () => { beep(500); setTimeout(() => beep(700), 120); },
    tick: () => beep(900, 0.05)
  };
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [level, setLevel] = useState("facil");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flash, setFlash] = useState(null);
  const [presentationMode, setPresentationMode] = useState(false);

  const sounds = useGameSounds(soundEnabled);

  const q = questions[current];
  const progress = questions.length ? ((current + 1) / questions.length) * 100 : 0;
  const timerPct = `${(timeLeft / QUESTION_TIME) * 100}%`;

  const startGame = lvl => {
    setLevel(lvl);
    setQuestions(pickTen(lvl));
    setCurrent(0);
    setScore(0);
    setScreen("quiz");
    setTimeLeft(QUESTION_TIME);
  };

  const answer = index => {
    if (locked) return;
    const correct = index === q.correctAnswer;

    setSelected(index);
    setLocked(true);

    if (correct) {
      sounds.correct();
      setFlash("correct");
      setScore(s => s + 1);
    } else {
      sounds.error();
      setFlash("wrong");
    }

    setTimeout(next, 900);
  };

  const next = () => {
    setFlash(null);
    setSelected(null);
    setLocked(false);

    if (current + 1 >= questions.length) {
      sounds.final();
      setScreen("results");
      return;
    }

    setCurrent(c => c + 1);
    setTimeLeft(QUESTION_TIME);
  };

  useEffect(() => {
    if (screen !== "quiz") return;

    const i = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          sounds.error();
          next();
          return QUESTION_TIME;
        }

        if (t <= 3) sounds.tick();
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(i);
  }, [screen, current]);

  const medal = score >= 9 ? "🥇" : score >= 7 ? "🥈" : score >= 5 ? "🥉" : "🎖";

  return (
    <div className={`app ${flash || ""}`}>

<div className="topbar">
  <button className="toggleBtn" onClick={()=>setSoundEnabled(v=>!v)}>{soundEnabled ? "🔊 Sonido" : "🔇 Silencio"}</button>
  <button className="toggleBtn" onClick={()=>setPresentationMode(v=>!v)}>{presentationMode ? "🖥️ Modo normal" : "🎥 Modo presentación"}</button>
</div>

<style>{`

body{margin:0;font-family:system-ui;background:#fff7ed}

.app{min-height:100vh;padding:16px;transition:background .25s ease}
.app.correct{background:#ecfdf5}
.app.wrong{background:#fef2f2}

.hero{max-width:900px;margin:32px auto;text-align:center}
.hero img{width:100%;border-radius:20px;box-shadow:0 12px 32px rgba(0,0,0,.18)}
.hero h1{font-size:clamp(2rem,4vw,3.4rem);margin:18px 0 8px}

.topbar{max-width:1100px;margin:0 auto 12px;display:flex;justify-content:flex-end;gap:10px;flex-wrap:wrap}
.toggleBtn,.homeBtn,button{padding:14px 18px;border-radius:14px;border:none;font-weight:700;cursor:pointer}
.toggleBtn{background:#fff;box-shadow:0 6px 18px rgba(0,0,0,.08)}

.levels{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:20px}
.levels button{background:white;box-shadow:0 10px 24px rgba(0,0,0,.08)}

.quiz{max-width:1100px;margin:20px auto;background:white;padding:20px;border-radius:24px;box-shadow:0 16px 40px rgba(0,0,0,.08)}
.quiz.present{max-width:1280px;padding:28px}
.quizGrid{display:grid;grid-template-columns:1.05fr .95fr;gap:22px;align-items:start}
.quiz.present .quizGrid{grid-template-columns:1fr}

.metaRow{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:12px}
.pill{background:#f3f4f6;padding:8px 12px;border-radius:999px;font-size:.95rem;font-weight:700}

.questionImage{width:100%;border-radius:18px;display:block;object-fit:cover;max-height:520px;background:#f3f4f6}
.quiz.present .questionImage{max-height:46vh}

.questionPanel h2{font-size:clamp(1.45rem,2.6vw,2.6rem);line-height:1.15;margin:8px 0 18px}
.quiz.present .questionPanel h2{font-size:clamp(2rem,4vw,3.6rem)}

.options{display:grid;gap:12px;margin-top:15px}
.options button{background:white;border:2px solid #e5e7eb;text-align:left;display:flex;gap:14px;align-items:center;padding:16px 18px;transition:.18s ease}
.options button:hover{border-color:#f59e0b;background:#fffbeb}
.options button:disabled{opacity:.88}
.quiz.present .options{grid-template-columns:1fr 1fr;gap:16px}
.quiz.present .options button{min-height:92px;font-size:1.3rem;padding:22px}
.optionKey{width:42px;height:42px;border-radius:999px;background:#f3f4f6;display:inline-flex;align-items:center;justify-content:center;font-weight:900;flex:0 0 auto}
.quiz.present .optionKey{width:56px;height:56px;font-size:1.45rem}

.sidePanel{display:grid;gap:16px}
.timerCard,.scoreCard{background:#fff7ed;border:1px solid #fed7aa;border-radius:20px;padding:18px}
.quiz.present .sidePanel{grid-template-columns:1fr 1fr}

.timerWrap{display:flex;justify-content:center;align-items:center;padding:8px 0}
.circleTimer{width:160px;height:160px;border-radius:50%;display:grid;place-items:center;font-weight:900;font-size:2.5rem;color:#111827;position:relative;background:conic-gradient(#f97316 var(--p), #e5e7eb 0)}
.circleTimer::before{content:"";position:absolute;inset:12px;background:#fff;border-radius:50%}
.circleTimer span{position:relative;z-index:1}
.quiz.present .circleTimer{width:210px;height:210px;font-size:3.5rem}

.progressBar{width:100%;height:12px;background:#e5e7eb;border-radius:999px;overflow:hidden;margin-top:10px}
.progressFill{height:100%;background:linear-gradient(90deg,#f59e0b,#f97316)}

.autoText{color:#6b7280;font-size:.95rem;text-align:center}
.results{text-align:center;max-width:900px;margin:40px auto;background:white;padding:28px;border-radius:24px;box-shadow:0 16px 40px rgba(0,0,0,.08)}
.results h1{font-size:4rem;margin:0}
.results h2{font-size:2.3rem;margin:6px 0}
.results p{color:#6b7280}

@media (max-width: 900px){
  .levels{grid-template-columns:1fr}
  .quizGrid,.quiz.present .quizGrid,.quiz.present .options,.quiz.present .sidePanel{grid-template-columns:1fr}
  .quiz.present .options button{font-size:1.05rem;min-height:unset}
  .circleTimer,.quiz.present .circleTimer{width:140px;height:140px;font-size:2.2rem}
}

`}</style>

{screen==="home" && (
<div className="hero">
<img src="/images/portada.png" />
<h1>Trivial de Semana Santa</h1>
<div className="levels">
<button onClick={()=>startGame("facil")}>Fácil</button>
<button onClick={()=>startGame("medio")}>Medio</button>
<button onClick={()=>startGame("dificil")}>Difícil</button>
</div>
</div>
)}

{screen==="quiz" && q && (
<div className={`quiz ${presentationMode ? "present" : ""}`}>
  <div className="metaRow">
    <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
      <span className="pill">Nivel {LEVEL_LABELS[level]}</span>
      <span className="pill">Pregunta {current + 1} / {questions.length}</span>
    </div>
    <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
      <span className="pill">Puntuación {score}</span>
    </div>
  </div>

  <div className="quizGrid">
    <div>
      <img className="questionImage" src={q.image} alt={q.text} />
    </div>

    <div className="questionPanel">
      <h2>{q.text}</h2>

      <div className="options">
        {q.options.map((o,i)=>(
          <button key={i} onClick={()=>answer(i)} disabled={locked}>
            <span className="optionKey">{String.fromCharCode(65+i)}</span>
            <span>{o}</span>
          </button>
        ))}
      </div>
    </div>
  </div>

  <div className="sidePanel" style={{marginTop:20}}>
    <div className="timerCard">
      <div className="timerWrap">
        <div className="circleTimer" style={{"--p": timerPct}}><span>{timeLeft}</span></div>
      </div>
      <div className="autoText">Tiempo restante</div>
    </div>

    <div className="scoreCard">
      <div style={{fontWeight:800,fontSize:"1.1rem",marginBottom:6}}>Progreso de partida</div>
      <div className="progressBar"><div className="progressFill" style={{width:`${progress}%`}} /></div>
      <div className="autoText" style={{marginTop:10}}>Las preguntas avanzan automáticamente</div>
    </div>
  </div>
</div>
)} disabled={locked}>{o}</button>
))}
</div>
</div>
)}

{screen==="results" && (
<div className="results">
  <h1>{medal}</h1>
  <h2>{score}/10</h2>
  <p>{score >= 9 ? "¡Excelente!" : score >= 7 ? "Muy buen resultado" : score >= 5 ? "Buen trabajo" : "Puedes volver a intentarlo"}</p>
  <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginTop:18}}>
    <button className="homeBtn" onClick={()=>startGame(level)}>Jugar otra vez</button>
    <button className="homeBtn" onClick={()=>setScreen("home")}>Cambiar nivel</button>
  </div>
</div>
)}>Volver a jugar</button>
</div>
)}

</div>
  );
}
