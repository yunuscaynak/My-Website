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
  @apply relative overflow-hidden rounded-2xl border px-6 py-10 sm:px-10;
  border-color: rgba(231, 223, 212, 0.12);
  background:
    repeating-linear-gradient(0deg, rgba(231, 223, 212, 0.03), rgba(231, 223, 212, 0.03) 1px, transparent 1px, transparent 26px),
    repeating-linear-gradient(90deg, rgba(231, 223, 212, 0.02), rgba(231, 223, 212, 0.02) 1px, transparent 1px, transparent 26px),
    linear-gradient(140deg, rgba(19, 18, 15, 0.9), rgba(10, 10, 9, 0.95));
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.32);
}

.sectionShell::before,
.sectionShell::after {
  content: '';
  @apply absolute inset-y-0 w-56 rounded-full blur-3xl;
  opacity: 0.2;
}

.sectionShell::before {
  background: radial-gradient(circle, rgba(242, 159, 103, 0.45), transparent 65%);
  left: -2.5rem;
}

.sectionShell::after {
  background: radial-gradient(circle, rgba(126, 191, 159, 0.5), transparent 65%);
  right: -2.5rem;
}

.sectionHeader {
  @apply relative z-10 max-w-3xl space-y-3;
}

.eyebrow {
  @apply inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em];
  border-color: rgba(231, 223, 212, 0.2);
  color: #f29f67;
  background: rgba(231, 223, 212, 0.05);
}

.title {
  @apply font-bruno text-4xl sm:text-5xl;
  color: #e7dfd4;
}

.lede {
  @apply font-bruno text-lg sm:text-xl;
  color: rgba(231, 223, 212, 0.78);
}

.skillGrid {
  @apply relative z-10 mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3;
}

.skillCard {
  @apply rounded-xl border p-6 transition duration-300 hover:-translate-y-1;
  border-color: rgba(231, 223, 212, 0.12);
  background: rgba(18, 18, 16, 0.82);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.28);
  clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
  position: relative;
  overflow: hidden;
}

.skillCard::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 5px;
  background: linear-gradient(180deg, #f29f67, #7ebf9f);
  opacity: 0.9;
}

.cardTop {
  @apply mb-4 flex items-center gap-3;
}

.orb {
  @apply h-10 w-10 rounded-full border shadow-md;
  border-color: rgba(231, 223, 212, 0.24);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}

.cardTitle {
  @apply font-bruno text-xl;
  color: #e7dfd4;
}

.cardHint {
  @apply text-sm;
  color: rgba(231, 223, 212, 0.65);
}

.pillWrap {
  @apply flex flex-wrap gap-2;
}

.pill {
  @apply rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide;
  border-color: rgba(231, 223, 212, 0.22);
  background: rgba(231, 223, 212, 0.08);
  color: #e7dfd4;
}

.meter {
  @apply mt-4 h-2 overflow-hidden rounded-full;
  background: rgba(231, 223, 212, 0.12);
}

.meterFill {
  @apply block h-full rounded-full;
  box-shadow: 0 8px 24px rgba(242, 159, 103, 0.2);
}

.signalGrid {
  @apply relative z-10 mt-8 grid gap-4 md:grid-cols-3;
}

.signalCard {
  @apply rounded-lg border px-4 py-5 transition duration-300;
  border-color: rgba(231, 223, 212, 0.12);
  background: rgba(18, 17, 16, 0.85);
  transform: translateY(0);
  clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
  position: relative;
  overflow: hidden;
}

.signalCard:hover {
  border-color: rgba(242, 159, 103, 0.35);
  background: rgba(231, 223, 212, 0.07);
  transform: translateY(-4px) scale(1.01);
}

.signalCard::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, #f29f67, #7ebf9f);
  opacity: 0.85;
}

.signalLabel {
  @apply text-xs uppercase tracking-wide transition duration-300;
  color: rgba(231, 223, 212, 0.6);
}

.signalBody {
  @apply font-bruno text-base transition duration-300;
  color: rgba(231, 223, 212, 0.78);
}

.signalCard:hover .signalLabel {
  color: #f29f67;
}

.signalCard:hover .signalBody {
  color: #e7dfd4;
}
</style>
