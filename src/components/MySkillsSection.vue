<template>
  <section id="mySkills" class="pt-10">
    <div class="sectionShell">
      <div class="sectionHeader">
        <p class="eyebrow">Stack</p>
        <h1 class="title">My Skills</h1>
        <p class="lede">
          A cross-disciplinary toolkit built to ship sleek, high-performing experiences end to end.
        </p>
      </div>

      <div class="skillGrid">
        <div v-for="set in skillSets" :key="set.title" class="skillCard">
          <div class="cardTop">
            <span class="orb" :style="{ background: set.gradient }"></span>
            <div>
              <h3 class="cardTitle">{{ set.title }}</h3>
              <p class="cardHint">{{ set.subtitle }}</p>
            </div>
          </div>

          <div class="pillWrap">
            <span v-for="item in set.items" :key="item" class="pill">
              {{ item }}
            </span>
          </div>

          <div class="meter">
            <span class="meterFill" :style="{ width: set.signal, background: set.gradient }"></span>
          </div>
        </div>
      </div>

      <div class="signalGrid">
        <div v-for="signal in signals" :key="signal.label" class="signalCard">
          <p class="signalLabel">{{ signal.label }}</p>
          <p class="signalBody">{{ signal.body }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const skillSets = [
  {
    title: 'Frontend',
    subtitle: 'Interfaces with motion, clarity, and accessibility baked in.',
    items: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'HTML5/CSS3', 'JavaScript'],
    gradient: 'linear-gradient(90deg, #22d3ee 0%, #6366f1 100%)',
    signal: '88%',
  },
  {
    title: 'Backend & APIs',
    subtitle: 'Scalable services and clean data contracts.',
    items: ['Node.js', 'Express.js', 'Python', 'Django', 'PHP'],
    gradient: 'linear-gradient(90deg, #a855f7 0%, #22d3ee 100%)',
    signal: '82%',
  },
  {
    title: 'Data & Systems',
    subtitle: 'Reliable persistence and tooling for production.',
    items: ['MySQL', 'MongoDB', 'Java', 'Bootstrap', 'GitHub + Linux'],
    gradient: 'linear-gradient(90deg, #06b6d4 0%, #10b981 100%)',
    signal: '76%',
  },
];

const signals = [
  {
    label: 'Rapid prototyping',
    body: 'Design-to-code workflows with reusable components and atomic styling.',
  },
  {
    label: 'API-first',
    body: 'Express/Node and Python services that keep data flowing predictably.',
  },
  {
    label: 'Data layer',
    body: 'Structured schemas in MySQL plus flexible documents in MongoDB for dynamic products.',
  },
];
</script>

<style scoped>
.sectionShell {
  @apply relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-6 py-10 sm:px-10 backdrop-blur;
}

.sectionShell::before,
.sectionShell::after {
  content: '';
  @apply absolute inset-y-0 w-56 rounded-full opacity-25 blur-3xl;
}

.sectionShell::before {
  @apply -left-10 bg-cyan-500/50;
}

.sectionShell::after {
  @apply -right-10 bg-purple-500/60;
}

.sectionHeader {
  @apply relative z-10 max-w-3xl space-y-3;
}

.eyebrow {
  @apply inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-200;
}

.title {
  @apply font-bruno text-4xl text-white sm:text-5xl;
}

.lede {
  @apply font-bruno text-lg text-white/80 sm:text-xl;
}

.skillGrid {
  @apply relative z-10 mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3;
}

.skillCard {
  @apply rounded-xl border border-white/10 bg-gradient-to-b from-white/10 via-white/5 to-white/0 p-6 shadow-lg shadow-cyan-500/10 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/20;
}

.cardTop {
  @apply mb-4 flex items-center gap-3;
}

.orb {
  @apply h-10 w-10 rounded-full border border-white/40 shadow-md shadow-cyan-400/30;
}

.cardTitle {
  @apply font-bruno text-xl text-white;
}

.cardHint {
  @apply text-sm text-white/70;
}

.pillWrap {
  @apply flex flex-wrap gap-2;
}

.pill {
  @apply rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white;
}

.meter {
  @apply mt-4 h-2 overflow-hidden rounded-full bg-white/10;
}

.meterFill {
  @apply block h-full rounded-full shadow-lg shadow-cyan-400/40;
}

.signalGrid {
  @apply relative z-10 mt-8 grid gap-4 md:grid-cols-3;
}

.signalCard {
  @apply rounded-lg border border-white/10 bg-white/5 px-4 py-5 shadow-inner shadow-cyan-500/5 transition duration-300;
  transform: translateY(0);
}

.signalCard:hover {
  @apply border-cyan-300/40 bg-white/10 shadow-cyan-400/15;
  transform: translateY(-4px) scale(1.01);
}

.signalLabel {
  @apply text-xs uppercase tracking-wide text-cyan-200 transition duration-300;
}

.signalBody {
  @apply font-bruno text-base text-white/80 transition duration-300;
}

.signalCard:hover .signalLabel {
  @apply text-cyan-100;
}

.signalCard:hover .signalBody {
  @apply text-white;
}
</style>
