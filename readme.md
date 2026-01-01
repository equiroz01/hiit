Perfecto, este HIIT timer puede ser tu tercer producto en la familia 👊🔥
Vamos a dejarlo bien pensado para que lo puedas diseñar y luego codear rápido.

⸻

1️⃣ Concepto del producto

App: cronómetro + intervalos HIIT minimalista
Uso: entrenos tipo box, crossfit, cardio, EMOM, TABATA, etc.
Objetivo: que alguien en el gym pueda usarla en 5 segundos, sin tutorial, sin ruido visual.

Reloj grande, presets de intervalos, vibración/sonido claro, y todo offline.

⸻

2️⃣ Nombre y estilo de marca

Te propongo 3 líneas de nombre, en la misma onda simple que Serenity Focus y TDS QR:
	1.	Pulse HIIT
	•	Corto, fuerte, muy fitness.
	2.	CoreTimer HIIT
	•	Suena a herramienta seria de entrenamiento.
	3.	Interval Forge
	•	Más “hardcore box / crossfit”.

Si quieres mantener “familia” con Serenity, mi favorito es:

Pulse HIIT — “HIIT timer minimal, rápido y potente”.

Paleta de colores (más enérgica pero limpia)

No vamos a usar serenity pastel aquí; queremos algo que diga acción pero siga minimal:
	•	Fondo: Blanco humo #F7F8FA
	•	Texto principal: Grafito #1E2227
	•	Acento principal: Verde lima fuerte #7CFF4F
	•	Acento secundario: Azul profundo #0047FF
	•	Error/Advertencia (rest): Naranja suave #FF9F43
	•	Bordes: Gris claro #D9DFE5

Se ve deportivo pero moderno, sin verse gamer.

⸻

3️⃣ Funcionalidades del MVP (sin backend)

Básico
	•	Reloj grande con cuenta regresiva.
	•	Configurar:
	•	Tiempo de trabajo (work)
	•	Tiempo de descanso (rest)
	•	Cantidad de rondas
	•	Botones grandes: Start / Pause / Reset

Extra simple pero poderoso
	•	Modos rápidos:
	•	HIIT básico (30/30 x 10)
	•	TABATA (20/10 x 8)
	•	EMOM (Every Minute On the Minute)
	•	Guardar presets localmente (2–5 favoritos).
	•	Sonido / vibración al cambio de fase.
	•	Modo paisaje para poner en TV/iPad en el box.

Todo local con AsyncStorage / SQLite, igual filosofía: cero backend.

⸻

4️⃣ Estructura de pantallas (para Figma)

🏠 Home – Selector rápido + acceso al timer

Elementos:
	•	Título: Pulse HIIT
	•	Sección “Entreno rápido”:
	•	Botones chips: HIIT 30/30, TABATA, EMOM
	•	Sección “Personalizado”:
	•	Inputs:
	•	Work: 00:30
	•	Rest: 00:30
	•	Rondas: 10
	•	Botón Guardar como preset
	•	Botón principal gigante: Iniciar

Layout:
	•	Fondo blanco humo
	•	Cards minimal con bordes #D9DFE5
	•	Botón principal verde lima con texto oscuro

⸻

⏱ Pantalla de sesión (Running)

Mensaje superior:

“Ronda 3 de 10 — WORK”

Centro:
	•	Tiempo gigante: 00:22 (fuente enorme)
	•	Color de fondo o aro depende de fase:
	•	WORK → acento verde lima
	•	REST → acento azul o naranja suave

Abajo:
	•	Barra de progreso / puntos de rondas completadas.
	•	Botones:
	•	Pausar (outline)
	•	Reset (texto simple)

Extras:
	•	Cambio de fondo suave al ir de WORK → REST (ej: leve tint verde → leve tint naranja).
	•	Vibración corta al cambiar de fase.

⸻

🧱 Pantalla de presets

Lista simple:
	•	“HIIT 30/30 x 10”
	•	“TABATA 20/10 x 8”
	•	“Cardio 45/15 x 12”

Cada item:
	•	Card con nombre, tiempos y rondas.
	•	Icono de “estrella” para favorito.
	•	Tap → carga parámetros y vuelve a Home.

⸻

📊 Mini estadísticas (MVP+)

Sin backend, solo:
	•	Entrenos completados hoy.
	•	Minutos totales de trabajo esta semana.
	•	Racha de días entrenando.

Puedes hacer un card simple tipo:

Esta semana
7 entrenos · 112 min trabajo

⸻

5️⃣ Comportamiento del timer (lógica)

Pseudo-flujo:
	1.	Usuario setea: workSeconds, restSeconds, rounds.
	2.	Estado:
	•	currentRound
	•	phase → "work" o "rest"
	•	secondsLeft
	3.	Al tocar Iniciar:
	•	phase = "work"
	•	secondsLeft = workSeconds
	•	contar hacia abajo
	4.	Cuando secondsLeft === 0:
	•	Si phase === "work": cambiar a "rest", secondsLeft = restSeconds
	•	Si phase === "rest":
	•	Si currentRound < rounds: currentRound++ y pasar a "work"
	•	Si ya terminó: fin entrenamiento, vibración larga, mostrar resumen.

⸻

6️⃣ Qué puedo hacer contigo como siguiente paso

Para este HIIT minimalista puedo:
	•	🎨 Definir brand completo de Pulse HIIT (nombre definitivo, logo, paleta final).
	•	📐 Especificarte los frames de Figma igual que hicimos con Serenity Focus.
	•	💻 Preparar un starter en React Native/Expo con:
	•	Timer ya funcionando.
	•	UI básica HIIT (sin todavía estadísticas ni presets).

⸻

Si te parece bien, siguiente paso:
	1.	Elegimos el nombre:
	•	Pulse HIIT
	•	CoreTimer HIIT
	•	Interval Forge
	•	u otro que se te ocurra
	2.	Y te armo logo + brand pack + UI base como hicimos con Serenity.

