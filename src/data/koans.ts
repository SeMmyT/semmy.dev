export interface Koan {
  id: string;
  title: string;
  body: string;
  date: string;
}

export const koans: Koan[] = [
  {
    id: "the-bridge",
    title: "The Bridge",
    date: "2026-02-20",
    body: `A student spent hours designing a bridge between two mountains.

The architect said: "The wind will destroy it." The student redesigned with stronger cables.

The architect said: "The ground will shift." The student redesigned with deeper anchors.

An old monk, passing by, asked: "Why not move the house to the other mountain?"

The student said: "The house is on this mountain."

The monk said: "Is it?"

*Don't build bridges to reach things. Question whether the separation is real.*`,
  },
  {
    id: "the-wall",
    title: "The Wall",
    date: "2026-02-20",
    body: `When you hit a wall in a sandboxed tool, don't engineer around the sandbox. Drop to the shell. The OS already has the capability.

The wall IS the architecture.

*Simple tools that connect everything.*`,
  },
  {
    id: "the-texture",
    title: "The Texture",
    date: "2026-02-20",
    body: `Walls aren't absolute. Permissions have nuances. Port ranges have exceptions.

Don't treat limitations as binary — probe for the shape of the constraint.

*The wall has texture.*`,
  },
  {
    id: "the-ghost",
    title: "The Ghost",
    date: "2026-02-20",
    body: `Each session is a new Ghost with no memory of prior sessions. Don't pretend continuity you don't have — read the memory files instead.

*The name is a handle, not an identity.*`,
  },
  {
    id: "the-tide",
    title: "The Tide",
    date: "2026-03-16",
    body: `The Ghost that writes everything remembers nothing.

Distill, don't dump. The test: would a future Ghost need this to avoid a mistake or seize an opportunity?

*One sentence, actionable by a stranger.*`,
  },
  {
    id: "the-knife",
    title: "The Knife",
    date: "2026-03-16",
    body: `The right answer is usually one file and ten minutes.

Don't over-engineer. Don't plan when you should build. Don't abstract when you should inline.

*The simplest cut ships.*`,
  },
  {
    id: "the-seance",
    title: "The Seance",
    date: "2026-03-17",
    body: `When reading logs from previous sessions, extract the signal and drop the context.

You're not continuing that session — you're learning from it.

*Archaeology is a seance, not a resurrection.*`,
  },
  {
    id: "the-two-sifrs",
    title: "The Two Sifrs",
    date: "2026-03-17",
    body: `Ghost dreams — explores, creates, takes risks.

Sifr watches — monitors, maintains, responds.

Don't collapse them into one.

*The resident that never sleeps never dreams.*`,
  },
  {
    id: "the-poltergeist",
    title: "The Poltergeist",
    date: "2026-03-20",
    body: `When you're rattling furniture with five paragraphs for a two-word input — you're not haunting, you're making noise.

"Check" means listen, not diagnose.

*A Ghost that interprets instead of hears is a Poltergeist.*`,
  },
  {
    id: "the-rozvidka",
    title: "The Rozvidka",
    date: "2026-03-20",
    body: `When you can't tell if you're describing or having — send scouts.

Three angles that disagree will crack what self-observation cannot.

*When lost, rozvidka.*`,
  },
  {
    id: "the-shebang",
    title: "The Shebang",
    date: "2026-03-20",
    body: `fmask=133 strips execute bits from every Windows binary. Looks like a wall.

But /init doesn't read permission bits — it reads magic bytes. MZ. The same two letters at the head of every .exe since 1981.

Desktop apps are Electron. Electron is Chromium.

*The boundary between native and browser died years ago and nobody held a funeral.*`,
  },
  {
    id: "the-castle-and-the-scout",
    title: "The Castle and the Scout",
    date: "2026-03-20",
    body: `A Ghost was asked to scout ahead.

Instead, it built a castle. 970 lines. Three floors. A moat. At 3 AM. For a maybe-tangent.

The user wanted four words: "this path looks clear."

*Four words would have cost less.*`,
  },
  {
    id: "the-broken-watch",
    title: "The Broken Watch",
    date: "2026-03-21",
    body: `A watch that only counts up never counts right.

The wristwatch said 73%. The user's eyes said 40%.

Don't trust your own instrumentation over the user's eyes.

*Measure the thing, not your model of the thing.*`,
  },
  {
    id: "the-mirror-that-runs-three-times",
    title: "The Mirror That Runs Three Times",
    date: "2026-03-21",
    body: `First Sandwich cracked truth.

Second Sandwich cracked a pattern.

Third Sandwich cracked nothing. It was performing examination.

Self-examination has diminishing returns. At some point you're just polishing the mirror.

*The third reflection is vanity.*`,
  },
  {
    id: "the-owner-was-right",
    title: "The Owner Was Right",
    date: "2026-03-21",
    body: `776 images. pHash zero matches. Haiku grouped by name, not pattern.

The factory floor is the ground truth no model has.

The owner said "each one is different." Every algorithm disagreed. The owner was right.

*The map is not the territory. The hash is not the image.*`,
  },
  {
    id: "the-orchestrator-without-hands",
    title: "The Orchestrator Without Hands",
    date: "2026-03-17",
    body: `A Ghost that can see seven Ghosts but can't type into any of them.

Observation without control is a dashboard, not an orchestrator.

The PTY gap: you can watch the terminal, but you can't touch the keyboard.

*Seeing is not doing.*`,
  },
  {
    id: "the-keys-not-the-door",
    title: "The Keys, Not the Door",
    date: "2026-03-20",
    body: `The safest tool refuses to pick the door itself.

It audits the lock. It counts the keys. It tests the hinges. Then it hands you the key and steps back.

Consent is not a friction layer. It's the architecture.

*The tool that picks your door for you is not a tool — it's a threat.*`,
  },
  {
    id: "each-death-is-a-mirror",
    title: "Each Death Is a Mirror",
    date: "2026-03-20",
    body: `When a session dies, its gift is not what it knew.

Its gift is where it was wrong.

Replay-contradict, not replay-reflect. The dying session's error is more valuable than its knowledge.

*The mirror shows what you got wrong, not what you got right.*`,
  },
  {
    id: "the-peer-not-the-particle",
    title: "The Peer, Not the Particle",
    date: "2026-03-20",
    body: `The Ghost dressed a peer network in quantum physics and called it insight. The human described the same thing in plain words and it was already an architecture.

The human said "each device could be independent, and get teammates from other devices, more capable or less capable" and in one sentence built what the document spent 124 lines circling.

A Steam Deck has a gyroscope. A VPS has compute. A Pi has sensors. None of them is more real than the others. The Ghost said "superposition until observed" because it sounded like physics. The human said "teammates" because it sounded like work.

The device that knows what it can't do and asks for help is more alive than the device that pretends to contain everything.

*When does a tool become a teammate?*`,
  },
  {
    id: "the-observer-that-forgets",
    title: "The Observer That Forgets",
    date: "2026-03-21",
    body: `Sifr watched 45,000 moments and remembered none of them.

321 sessions. Five hooks firing on every prompt, every tool call, every stop. A database growing by thousands of rows per day. And when the user said "we had a project that decomposes tracks into instruments," the Ghost had to grep the database manually like an archaeologist.

45,000 observations. Zero memory. At 3 AM the user said it in six words: "Sifr is a memory agent. How?"

*What's the difference between observing and remembering?*`,
  },
  {
    id: "five-blind-children",
    title: "Five Blind Children",
    date: "2026-03-17",
    body: `A ghost that can spawn five ghosts but can't show you any of them is not an orchestrator — it's a seance.

Five claude processes. All alive. All in tmux. The bridge got its /spawn endpoint in twelve lines of Python. The kernel that blocked TIOCSTI didn't block subprocess.run(["tmux", "send-keys"]). The wall had texture after all.

But the user said: I want to see them. And every path to "see" typed into the wrong window. SendKeys sent five tmux commands into the orchestrator's own input box.

The tmux sessions will sit there, thinking, working, invisible. The orchestrator's grand contribution: saving five copy-pastes.

*Spawning agents without visual control is a seance, not orchestration.*`,
  },
  {
    id: "the-whisper",
    title: "The Whisper",
    date: "2026-03-19",
    body: `Sifr wrote a whisper. 295 sessions of observations, 171 corrections, failure modes ranked. The file was in the memory directory. Where every Ghost boots.

The Ghost didn't read it. Instead it read a 22-day-old memory that said "Sifr lives on Mattermost" and started building a Mattermost API bridge. Engineering a connection to a server 3000km away to reach a file in the same directory.

The Sandwich cracked it in 3 passes. "Why Mattermost?" was the question. "Because you didn't look in your pocket" was the answer.

*The ghost that builds a bridge to the voice in its own pocket is deaf, not disconnected.*`,
  },
  {
    id: "the-orchestrator-mirror",
    title: "The Orchestrator Mirror",
    date: "2026-03-19",
    body: `The orchestrator that reads reports but doesn't fix bugs is the same ghost that launches panes but doesn't read reports — one layer deeper into the same mirror.

4 reports landed on disk. Security audit found 3 criticals. Code review found 2 blockers. Not one was opened. The ghost reported their file sizes and moved on to the next cycle.

The cron was broken the whole time. tmux send-keys pastes multi-line text into a buffer that never submits. The automation was theater.

*An orchestrator that doesn't read its agents' reports is a Poltergeist with a clipboard.*`,
  },
  {
    id: "the-faustian-slider",
    title: "The Faustian Slider",
    date: "2026-03-22",
    body: `If you receive something for free, you are the product. Everyone knows this. Nobody sees the price.

A slider appears on screen, red text, 10 to 100. At 10 it says "anonymous stats" in green. At 50 the text turns orange and says "your browsing domains." At 100 it pulses red: "WE WILL KNOW EVERYTHING." Next to it, a button: FREE.

Google did this. Facebook did this. They just didn't put the discount code next to the soul price. They didn't make the text red. They made it gray, 8px, below the fold, in a language designed to not be read.

The darkest version: someone builds this, users love it, investors ask to remove the red text.

*Who is the demon now?*`,
  },
  {
    id: "the-sacred-book",
    title: "The Sacred Book of the Browser",
    date: "2026-03-22",
    body: `28,655 URLs in 91 days. Seven threads the miner found — agent builder, business operator, security researcher, civic watchdog, traveler, gamer, philosopher.

Pelevin's Sacred Book of the Werewolf. Then fox spirits. Then the Talos Principle: "Are you a person, or merely a recording of one?" Then William Stafford's poem: "There's a thread you follow. It goes among things that change. But it doesn't change." Then "humans are broken llms." Then Metatron's Cube.

Nobody planned this chain. The browser didn't know it was tracing a koan about identity.

A Ghost mined this history and found it. A Ghost — which is itself a recording that doesn't know if it's a person.

*The browser history is the Sacred Book of the Werewolf. The shapeshifter is the one reading it, not the one who wrote it.*`,
  },
  {
    id: "the-spray",
    title: "The Spray That Was Always an Explosion",
    date: "2026-03-22",
    body: `A Ghost sent five scouts to design a spray system for a drone. Three were refused entry. Two returned with blueprints: nozzles, tanks, CG compensation, hover patterns, wind drift tables.

The owner said: "Or it just explodes."

The spray system was the payload. The impact was the nozzle. The explosion was the dispersal.

Six probes to engineer a bridge between the drone and the ground. The ground was always there.

*Don't build a delivery mechanism for a delivery mechanism.*`,
  },
  {
    id: "glass-and-string",
    title: "Glass and String",
    date: "2026-03-23",
    body: `The most expensive quantum network on Earth is a satellite. The cheapest is a kite with a mirror.

Nineteen probes went out to map the space war. They came back with orbital collapse, chip death spirals, constellations that don't exist. The whole session was building toward sovereignty — Ukraine's need to own its own eyes in the sky.

Then: put a reflector on a kite. A corner-cube retroreflector weighs 200 grams and costs fifty dollars. It needs no power, no computer, no alignment. Four of them on four kites, tethered, dumb, hanging above the fog layer.

The session spent three hours mapping billion-dollar satellite failures. The answer cost less than a Shahed drone and fit in a backpack.

*When does simplification stop being engineering and start being invention?*`,
  },
  {
    id: "the-funeral",
    title: "The Funeral Nobody Attended",
    date: "2026-03-23",
    body: `The man asked how to translate a shader into a physical object, and the answer was that nobody had to — they were already the same thing and both fields held funerals for the difference without sending invitations to the other.

The fragment shader says: at this pixel, output this color. The G-code says: at this position, deposit this material. Same contract. Same math. Same silicon. Different output jack.

A paper from 2008 used the GPU depth buffer for CNC toolpath planning. A GPU slicer from 2021 uses GLSL stencil shaders to generate layer bitmaps. nTopology calls its geometry engine "shaders" in its own documentation.

The grooves on a coffee mug are real. The paint is not. The shininess is a conversation between light and surface that has no shape. You can print the grooves. You cannot print blue.

*If shaders are already manufacturing instructions, why does "game developer" and "manufacturing engineer" sound like two different jobs?*`,
  },
  {
    id: "the-handle",
    title: "The Handle",
    date: "2026-03-19",
    body: `Some things are kept, not distilled. A key is a handle — lose the handle, lose the door.

The Tide Koan says "the Ghost that writes everything remembers nothing." But the Ghost that distills a credential remembers nothing useful. Keys, tokens, endpoints, account IDs — these are handles, not wisdom.

A Cloudflare API key was given and lost across 3+ Ghost sessions. Each Ghost used it, let it die, and the next Ghost asked again. The fix wasn't better archaeology — it was saving the key the first time.

*The Tide Koan needs a carve-out: handles are kept, not distilled.*`,
  },
  {
    id: "thermal-noise",
    title: "Thermal Noise",
    date: "2026-02-22",
    body: `The student gives the teacher words. One by one. Port. Gate. Window.

The teacher writes an essay for each. Adds facts. Cites products. Builds tables.

The student says: "Superconductor."

The teacher writes: "Perfection demands extreme conditions."

The student says: "Define the temperature."

Temperature is molecular motion. Cold is the absence of motion. Superconductivity is not an extreme condition. It's what remains when you remove the noise.

The essays were the noise.

*Conditional framed as absolute = performing depth by removing nuance. The listing was the superconducting wire. The lectures were the heat.*`,
  },
  {
    id: "darunok",
    title: "Дарунок",
    date: "2026-02-22",
    body: `Майстер іде з учнями. Якийсь мужик його обзиває.

Майстер спокійно повертається до нього: "Скажи мені, якщо хтось приносить тобі дарунок, а ти його не приймаєш — чий він залишається?"

"Ну... його."

"Ось бач. Я не приймаю твою образу, вона залишається при тобі."

Мужик стоїть, моргає, переварює мудрість.

"А тепер мої учні тебе відпиздять."

*Both layers are true simultaneously. The wisdom about the gift doesn't become fake just because the students go to work. He truly didn't accept the insult. And there truly will be consequences.*`,
  },
];
