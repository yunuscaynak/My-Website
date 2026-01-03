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
  @apply relative overflow-hidden rounded-2xl border px-6 py-10 sm:px-10;
  border-color: rgba(231, 223, 212, 0.12);
  background:
    repeating-linear-gradient(0deg, rgba(231, 223, 212, 0.03), rgba(231, 223, 212, 0.03) 1px, transparent 1px, transparent 26px),
    repeating-linear-gradient(90deg, rgba(231, 223, 212, 0.02), rgba(231, 223, 212, 0.02) 1px, transparent 1px, transparent 26px),
    linear-gradient(135deg, rgba(21, 24, 22, 0.9), rgba(12, 10, 9, 0.92));
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
}

.sectionShell::before,
.sectionShell::after {
  content: '';
  @apply absolute inset-y-0 w-56 rounded-full blur-3xl;
  opacity: 0.2;
}

.sectionShell::before {
  background: radial-gradient(circle, rgba(242, 159, 103, 0.5), transparent 65%);
  left: -2.5rem;
}

.sectionShell::after {
  background: radial-gradient(circle, rgba(126, 191, 159, 0.55), transparent 65%);
  right: -2.5rem;
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
  @apply inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em];
  border-color: rgba(231, 223, 212, 0.2);
  color: #f29f67;
  background: rgba(231, 223, 212, 0.04);
}

.title {
  @apply font-bruno text-4xl sm:text-5xl;
  color: #e7dfd4;
}

.lede {
  @apply font-bruno text-lg sm:text-xl;
  color: rgba(231, 223, 212, 0.78);
}

.contentGrid {
  @apply relative z-10 mt-10 grid gap-6 lg:grid-cols-3;
}

.glassCard {
  @apply rounded-xl border p-6 transition duration-300 hover:-translate-y-1;
  border-color: rgba(231, 223, 212, 0.12);
  background: rgba(17, 18, 17, 0.8);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.28);
  clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.cardHeading {
  @apply mb-4 flex items-center gap-3;
  margin-bottom: 0.35rem;
}

.beam {
  @apply inline-block h-10 w-1 rounded-full;
  background: linear-gradient(180deg, #f29f67, #7ebf9f);
}

.glassCard h2 {
  @apply font-bruno text-2xl;
  color: #e7dfd4;
  letter-spacing: 0.01em;
}

.body {
  @apply font-bruno text-base sm:text-lg;
  color: rgba(231, 223, 212, 0.9);
  line-height: 1.7;
  letter-spacing: 0.01em;
  background: rgba(231, 223, 212, 0.04);
  border-left: 3px solid #f29f67;
  padding: 0.75rem 0.9rem;
  border-radius: 12px;
}

.chipRow {
  @apply mt-4 flex flex-wrap gap-2;
}

.chip {
  @apply rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide;
  border-color: rgba(231, 223, 212, 0.3);
  background: rgba(231, 223, 212, 0.08);
  color: #e7dfd4;
}

.list {
  @apply mt-4 space-y-2;
  color: rgba(231, 223, 212, 0.9);
}

.list li {
  @apply flex items-start gap-2 font-bruno text-base leading-relaxed;
  background: rgba(231, 223, 212, 0.04);
  border-radius: 10px;
  padding: 0.55rem 0.7rem;
}

.list li::before {
  content: '▹';
  color: #7ebf9f;
}

.metrics {
  @apply grid gap-4 rounded-xl border p-4 sm:grid-cols-3 lg:grid-cols-1;
  border-color: rgba(231, 223, 212, 0.12);
  background: linear-gradient(135deg, rgba(26, 24, 21, 0.9), rgba(14, 12, 11, 0.9));
}

.metricCard {
  @apply rounded-lg border px-4 py-5 transition duration-300;
  border-color: rgba(231, 223, 212, 0.1);
  background: rgba(231, 223, 212, 0.03);
  transform: translateY(0);
  clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
}

.metricCard:hover {
  border-color: rgba(242, 159, 103, 0.35);
  background: rgba(231, 223, 212, 0.07);
  transform: translateY(-4px) scale(1.01);
}

.metricLabel {
  @apply text-xs uppercase tracking-wide;
  color: rgba(231, 223, 212, 0.6);
}

.metricValue {
  @apply font-bruno text-2xl;
  color: #e7dfd4;
}

.metricHint {
  @apply text-sm transition duration-300;
  color: rgba(231, 223, 212, 0.65);
}

.metricCard:hover .metricLabel {
  color: #f29f67;
}

.metricCard:hover .metricValue {
  color: #e7dfd4;
}

.metricCard:hover .metricHint {
  color: rgba(231, 223, 212, 0.85);
}
</style>
