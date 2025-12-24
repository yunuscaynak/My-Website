<template>
  <section id="about" class="pt-10">
    <div class="sectionShell">
      <div class="sectionHeader">
        <div class="headerText">
          <p class="eyebrow">About</p>
          <h1 class="title">Yunus Caynak</h1>
          <p class="lede">
            I build immersive web experiences that feel futuristic yet human, blending precise engineering with bold visual storytelling.
          </p>
        </div>
        <div class="portraitFrameSm ml-auto">
          <img src="/img/photo.jpeg" alt="Yunus Caynak portrait" class="portraitImg" />
        </div>
      </div>

      <div class="contentGrid">
        <div class="glassCard">
          <div class="cardHeading">
            <span class="beam"></span>
            <h2>Operating Mode</h2>
          </div>
          <p class="body">
            Computer programming student focused on crafting fast, intuitive interfaces with Vue/Nuxt and elevating them with clean design systems. Exploring back-end architectures to keep every experience resilient, scalable, and ready for real-world traffic.
          </p>
          <div class="chipRow">
            <span class="chip">Front-end Engineer</span>
            <span class="chip">UI Systems</span>
            <span class="chip">Full-stack in Progress</span>
          </div>
        </div>

        <div class="glassCard">
          <div class="cardHeading">
            <span class="beam"></span>
            <h2>North Star</h2>
          </div>
          <p class="body">
            Shape digital products that feel alive: micro-interactions that respond instantly, content that adapts to context, and performance budgets that keep every flow light-speed.
          </p>
          <ul class="list">
            <li>Design-forward code that stays maintainable</li>
            <li>API-first thinking for scalable features</li>
            <li>Continuous learning across new stacks</li>
          </ul>
        </div>

        <div class="metrics">
          <div class="metricCard">
            <p class="metricLabel">Focus</p>
            <p class="metricValue">Front-end + UX</p>
            <p class="metricHint">Nuxt / Vue / Tailwind</p>
          </div>
          <div class="metricCard">
            <p class="metricLabel">Building</p>
            <p class="metricValue">Full-stack</p>
            <p class="metricHint">Node, Express, Python</p>
          </div>
          <div class="metricCard">
            <p class="metricLabel">Mindset</p>
            <p class="metricValue">Future-ready</p>
            <p class="metricHint">Performance & clarity</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

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
  @apply relative z-10 flex w-full flex-col gap-6 sm:flex-row sm:items-start sm:justify-between;
}

.headerText {
  @apply space-y-2 max-w-3xl;
}

.portraitFrameSm {
  @apply relative h-72 w-72 flex-shrink-0 overflow-hidden rounded-full border border-white/15 bg-white/5 aspect-square;
  box-shadow: 0 64px 72px rgba(0, 0, 0, 0.28);
}

.portraitFrameSm::before {
  content: '';
  @apply absolute inset-0 rounded-full border border-white/10;
}

.portraitImg {
  @apply h-full w-full rounded-full object-cover;
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

.contentGrid {
  @apply relative z-10 mt-10 grid gap-6 lg:grid-cols-3;
}

.glassCard {
  @apply rounded-xl border border-white/10 bg-white/10 p-6 shadow-lg shadow-cyan-500/10 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/20;
}

.cardHeading {
  @apply mb-4 flex items-center gap-3;
}

.beam {
  @apply inline-block h-10 w-1 rounded-full bg-gradient-to-b from-cyan-400 to-purple-500;
}

.glassCard h2 {
  @apply font-bruno text-2xl text-white;
}

.body {
  @apply font-bruno text-base leading-relaxed text-white/80 sm:text-lg;
}

.chipRow {
  @apply mt-4 flex flex-wrap gap-2;
}

.chip {
  @apply rounded-full border border-cyan-300/40 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-100;
}

.list {
  @apply mt-4 space-y-2 text-white/80;
}

.list li {
  @apply flex items-start gap-2 font-bruno text-base leading-relaxed;
}

.list li::before {
  content: '▹';
  @apply text-cyan-300;
}

.metrics {
  @apply grid gap-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/10 p-4 sm:grid-cols-3 lg:grid-cols-1;
}

.metricCard {
  @apply rounded-lg border border-white/5 bg-white/5 px-4 py-5 shadow-inner shadow-cyan-500/5 transition duration-300;
  transform: translateY(0);
}

.metricCard:hover {
  @apply border-cyan-300/40 bg-white/10 shadow-cyan-400/20;
  transform: translateY(-4px) scale(1.01);
}

.metricLabel {
  @apply text-xs uppercase tracking-wide text-cyan-200;
}

.metricValue {
  @apply font-bruno text-2xl text-white;
}

.metricHint {
  @apply text-sm text-white/70 transition duration-300;
}

.metricCard:hover .metricLabel {
  @apply text-cyan-100;
}

.metricCard:hover .metricValue {
  @apply text-white;
}

.metricCard:hover .metricHint {
  @apply text-white/80;
}
</style>
