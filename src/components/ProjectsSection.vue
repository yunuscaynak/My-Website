<template>
  <section id="projects" class="pt-10">
    <div class="sectionShell">
      <div class="sectionHeader">
        <p class="eyebrow">Selected Work</p>
        <h1 class="title">Project Links & Demos</h1>
        <p class="lede">
          Live builds from my CV, focused on data products, automation, and full-stack web systems.
        </p>
      </div>

      <div class="projectGrid">
        <article v-for="project in projects" :key="project.title" class="projectCard">
          <div class="projectTop">
            <div>
              <p class="projectType">{{ project.type }}</p>
              <h2>{{ project.title }}</h2>
            </div>
            <span class="statusBadge" :class="{ muted: !project.demoUrl }">
              {{ project.demoUrl ? 'Live demo' : 'Case study' }}
            </span>
          </div>

          <p class="projectBody">{{ project.description }}</p>

          <div class="techRow">
            <span v-for="tech in project.tech" :key="tech" class="techPill">
              {{ tech }}
            </span>
          </div>

          <div class="actionRow">
            <a
              v-if="project.demoUrl"
              :href="project.demoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="primaryAction"
              :aria-label="`${project.title} live demo`"
            >
              <ExternalLink class="actionIcon" />
              Demo
            </a>
            <a
              v-if="project.repoUrl"
              :href="project.repoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="secondaryAction"
              :aria-label="`${project.title} GitHub repository`"
            >
              <Github class="actionIcon" />
              GitHub
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ExternalLink, Github } from 'lucide-vue-next';

const projects = [
  {
    title: 'QR Menu SaaS',
    type: 'Full-stack platform',
    description: 'Multi-business QR menu, order, and table management system for restaurant operations.',
    tech: ['Next.js', 'NestJS', 'Prisma', 'SQLite'],
    demoUrl: '',
    repoUrl: 'https://github.com/yunuscaynak',
  },
  {
    title: 'Reporting Systems',
    type: 'Business reporting',
    description: 'Decision-support reporting flows built around REST APIs, database management, and admin dashboards.',
    tech: ['REST API', 'SQL', 'Excel', 'Dashboard'],
    demoUrl: '',
    repoUrl: 'https://github.com/yunuscaynak',
  },
  {
    title: 'Sales Dashboard',
    type: 'Data analytics',
    description: 'Interactive reporting platform for analyzing sales data and visualizing business signals.',
    tech: ['Python', 'Pandas', 'Streamlit', 'Plotly'],
    demoUrl: 'https://sales-dashboard-gi55wbsbrl7qh6dvcncbzc.streamlit.app/',
    repoUrl: 'https://github.com/yunuscaynak',
  },
  {
    title: 'Sheet2DB',
    type: 'Automation tool',
    description: 'Automation app that cleans Excel files and transfers structured data into a database.',
    tech: ['Python', 'SQLite', 'Excel', 'Streamlit'],
    demoUrl: 'https://yunuscaynak-sheet2db-app-wymotp.streamlit.app/',
    repoUrl: 'https://github.com/yunuscaynak',
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
    linear-gradient(140deg, rgba(18, 17, 15, 0.94), rgba(9, 10, 9, 0.96));
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.34);
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

.projectGrid {
  @apply relative z-10 mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4;
}

.projectCard {
  @apply rounded-xl border p-6 transition duration-300 hover:-translate-y-1;
  border-color: rgba(231, 223, 212, 0.12);
  background: rgba(18, 18, 16, 0.84);
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.3);
  clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
  position: relative;
  overflow: hidden;
}

.projectCard::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 5px;
  background: linear-gradient(180deg, #f29f67, #7ebf9f);
  opacity: 0.9;
}

.projectTop {
  @apply flex min-h-24 items-start justify-between gap-4;
}

.projectType {
  @apply text-xs uppercase tracking-wide;
  color: rgba(231, 223, 212, 0.6);
}

.projectCard h2 {
  @apply mt-2 font-bruno text-2xl;
  color: #e7dfd4;
}

.statusBadge {
  @apply shrink-0 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide;
  border-color: rgba(126, 191, 159, 0.34);
  background: rgba(126, 191, 159, 0.1);
  color: #9ed6ba;
}

.statusBadge.muted {
  border-color: rgba(231, 223, 212, 0.18);
  background: rgba(231, 223, 212, 0.06);
  color: rgba(231, 223, 212, 0.72);
}

.projectBody {
  @apply mt-5 text-base leading-relaxed;
  color: rgba(231, 223, 212, 0.84);
}

.techRow {
  @apply mt-5 flex flex-wrap gap-2;
}

.techPill {
  @apply rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide;
  border-color: rgba(231, 223, 212, 0.22);
  background: rgba(231, 223, 212, 0.08);
  color: #e7dfd4;
}

.actionRow {
  @apply mt-6 flex flex-wrap gap-3;
}

.primaryAction,
.secondaryAction {
  @apply inline-flex min-h-11 items-center gap-2 rounded-lg border px-4 py-2 font-bruno text-sm transition duration-300;
  outline: none;
}

.primaryAction {
  background: linear-gradient(120deg, #f29f67, #7ebf9f);
  border-color: transparent;
  color: #14100d;
  box-shadow: 0 12px 26px rgba(242, 159, 103, 0.2);
}

.secondaryAction {
  border-color: rgba(231, 223, 212, 0.18);
  background: rgba(231, 223, 212, 0.06);
  color: #e7dfd4;
}

.primaryAction:hover,
.secondaryAction:hover {
  transform: translateY(-2px);
}

.primaryAction:focus-visible,
.secondaryAction:focus-visible {
  outline: 2px solid rgba(242, 159, 103, 0.45);
  outline-offset: 4px;
}

.actionIcon {
  @apply h-4 w-4;
}

@media (max-width: 480px) {
  .projectTop {
    @apply min-h-0 flex-col;
  }

  .statusBadge {
    @apply self-start;
  }
}
</style>
