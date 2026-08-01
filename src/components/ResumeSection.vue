<template>
  <section id="resume" class="pt-10">
    <div class="sectionShell">
      <div class="heroBand">
        <div class="sectionHeader">
          <p class="eyebrow">CV Snapshot</p>
          <h1 class="title">Full-Stack & Data Analytics Developer</h1>
          <p class="lede">
            I build enterprise web applications, admin panels, REST APIs, and data-driven dashboards.
          </p>
        </div>

        <a href="/yunuscaynak-cv.pdf" download class="downloadButton" aria-label="Download Yunus Caynak CV">
          <Download class="buttonIcon" />
          Download CV
        </a>
      </div>

      <div class="infoGrid">
        <article v-for="item in profileFacts" :key="item.label" class="infoCard">
          <component :is="item.icon" class="infoIcon" />
          <p class="infoLabel">{{ item.label }}</p>
          <p class="infoValue">{{ item.value }}</p>
        </article>
      </div>

      <div class="contentGrid">
        <div class="mainColumn">
          <article class="panel">
            <div class="panelHeading">
              <BriefcaseBusiness class="headingIcon" />
              <div>
                <p class="panelKicker">Experience</p>
                <h2>Experience</h2>
              </div>
            </div>

            <div class="experienceStack">
              <div v-for="role in experiences" :key="role.title" class="experienceItem">
                <div class="itemTop">
                  <div>
                    <h3>{{ role.title }}</h3>
                    <p class="itemMeta">{{ role.company }}</p>
                  </div>
                  <span class="itemBadge">{{ role.type }}</span>
                </div>
                <ul class="detailList">
                  <li v-for="point in role.points" :key="point">{{ point }}</li>
                </ul>
              </div>
            </div>
          </article>

          <article class="panel">
            <div class="panelHeading">
              <GraduationCap class="headingIcon" />
              <div>
                <p class="panelKicker">Education</p>
                <h2>Education</h2>
              </div>
            </div>

            <div class="educationCard">
              <div>
                <h3>Bartin University - Computer Programming</h3>
                <p>Theoretical and practical education in software development, data analysis, database management, and web technologies.</p>
              </div>
              <span>2023 - 2025</span>
            </div>
          </article>
        </div>

        <aside class="sideColumn">
          <article class="panel compactPanel">
            <div class="panelHeading">
              <Wrench class="headingIcon" />
              <div>
                <p class="panelKicker">Services</p>
                <h2>What I Build</h2>
              </div>
            </div>

            <div class="serviceList">
              <div v-for="service in services" :key="service.title" class="serviceItem">
                <p>{{ service.title }}</p>
                <span>{{ service.detail }}</span>
              </div>
            </div>
          </article>

          <article class="panel compactPanel analyticsPanel">
            <div class="panelHeading">
              <ChartNoAxesCombined class="headingIcon" />
              <div>
                <p class="panelKicker">Data Analytics</p>
                <h2>Reporting Stack</h2>
              </div>
            </div>

            <div class="analyticsGrid">
              <span v-for="tool in analyticsTools" :key="tool">{{ tool }}</span>
            </div>
            <p class="analyticsNote">
              I turn Excel and SQL data into Python-based dashboards and decision-support reports.
            </p>
          </article>
        </aside>
      </div>

      <div class="timelinePanel">
        <div class="panelHeading">
          <Milestone class="headingIcon" />
          <div>
            <p class="panelKicker">Timeline</p>
            <h2>Career Path</h2>
          </div>
        </div>

        <div class="timelineTrack">
          <article v-for="step in timeline" :key="step.title" class="timelineItem">
            <span class="timelineDot"></span>
            <p class="timelineDate">{{ step.date }}</p>
            <h3>{{ step.title }}</h3>
            <p>{{ step.body }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  BriefcaseBusiness,
  CalendarRange,
  ChartNoAxesCombined,
  Download,
  GraduationCap,
  Languages,
  MapPin,
  Milestone,
  Wrench,
} from 'lucide-vue-next';

const profileFacts = [
  { label: 'Location', value: 'Caycuma, Zonguldak', icon: MapPin },
  { label: 'Language', value: 'English B1', icon: Languages },
  { label: 'Education', value: 'Computer Programming', icon: GraduationCap },
  { label: 'Period', value: '2023 - 2025', icon: CalendarRange },
];

const experiences = [
  {
    title: 'Web Development Intern',
    company: 'Quantum Cyber Security',
    type: 'Internship',
    points: [
      'Developed full-stack web applications with Vue.js, Node.js, Express.js, and MongoDB.',
      'Worked on REST API development and JWT-based authentication flows.',
      'Handled frontend-backend integration, debugging, and performance improvements.',
      'Contributed to team development workflows using Git.',
    ],
  },
  {
    title: 'Full-Stack & Data Analytics Developer',
    company: 'Freelancer',
    type: 'Freelance',
    points: [
      'Built data analysis, reporting, and dashboard solutions with Python, Excel, and SQL.',
      'Analyzed business data to create decision-support reports and visualizations.',
      'Developed data-driven web applications with Next.js, NestJS, and TypeScript.',
      'Managed REST API, database management, and frontend-backend integration processes.',
    ],
  },
];

const services = [
  { title: 'Corporate Web Apps', detail: 'Enterprise web applications and responsive interfaces' },
  { title: 'Admin Panels', detail: 'Admin panels, table workflows, and operations screens' },
  { title: 'REST APIs', detail: 'Node.js, Express.js, NestJS, and JWT-based services' },
  { title: 'ERP/CRM Systems', detail: 'Manageable platform structures built around business processes' },
  { title: 'Reporting Automation', detail: 'Reporting automations with Excel, SQL, and Python' },
];

const analyticsTools = ['Python', 'SQL', 'Excel', 'Pandas', 'Streamlit', 'Plotly', 'SQLite', 'Dashboarding'];

const timeline = [
  {
    date: '2023',
    title: 'Bartin University',
    body: 'Started Computer Programming education, focusing on software, data analysis, and web technologies.',
  },
  {
    date: 'Internship',
    title: 'Quantum Cyber Security',
    body: 'Gained full-stack development experience with Vue, Node, Express, MongoDB, REST API, and JWT flows.',
  },
  {
    date: 'Freelance',
    title: 'Full-Stack & Data Analytics',
    body: 'Developed data-driven applications with Python, Excel, SQL, Next.js, NestJS, and TypeScript.',
  },
  {
    date: 'Projects',
    title: 'QR Menu SaaS, Sales Dashboard, Sheet2DB',
    body: 'Built a live project portfolio around SaaS, reporting, and automation.',
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
    linear-gradient(135deg, rgba(20, 19, 16, 0.95), rgba(8, 10, 9, 0.96));
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
  background: radial-gradient(circle, rgba(126, 191, 159, 0.52), transparent 65%);
  right: -2.5rem;
}

.heroBand,
.infoGrid,
.contentGrid,
.timelinePanel {
  @apply relative z-10;
}

.heroBand {
  @apply flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between;
}

.sectionHeader {
  @apply max-w-4xl space-y-3;
}

.eyebrow,
.panelKicker {
  @apply inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em];
  border-color: rgba(231, 223, 212, 0.2);
  color: #f29f67;
  background: rgba(231, 223, 212, 0.05);
}

.title {
  @apply font-bruno text-3xl sm:text-5xl;
  color: #e7dfd4;
}

.lede {
  @apply font-bruno text-base leading-relaxed sm:text-xl;
  color: rgba(231, 223, 212, 0.78);
}

.downloadButton {
  @apply inline-flex w-fit items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold uppercase tracking-wide transition duration-300;
  border-color: rgba(242, 159, 103, 0.45);
  background: linear-gradient(90deg, rgba(242, 159, 103, 0.95), rgba(126, 191, 159, 0.95));
  color: #0b0a09;
  box-shadow: 0 16px 32px rgba(242, 159, 103, 0.18);
}

.downloadButton:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 40px rgba(126, 191, 159, 0.22);
}

.buttonIcon,
.headingIcon,
.infoIcon {
  @apply h-5 w-5;
}

.infoGrid {
  @apply mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4;
}

.infoCard,
.panel,
.timelinePanel {
  @apply rounded-xl border;
  border-color: rgba(231, 223, 212, 0.12);
  background: rgba(18, 18, 16, 0.84);
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.26);
  clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
}

.infoCard {
  @apply p-5;
}

.infoIcon {
  color: #7ebf9f;
}

.infoLabel {
  @apply mt-4 text-xs uppercase tracking-wide;
  color: rgba(231, 223, 212, 0.58);
}

.infoValue {
  @apply mt-1 font-bruno text-base;
  color: #e7dfd4;
}

.contentGrid {
  @apply mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.85fr];
}

.mainColumn,
.sideColumn {
  @apply grid gap-6;
}

.panel,
.timelinePanel {
  @apply p-6;
}

.compactPanel {
  @apply h-fit;
}

.panelHeading {
  @apply flex items-center gap-3;
}

.headingIcon {
  color: #f29f67;
}

.panelHeading h2 {
  @apply mt-2 font-bruno text-2xl;
  color: #e7dfd4;
}

.experienceStack {
  @apply mt-6 grid gap-4;
}

.experienceItem,
.educationCard,
.serviceItem,
.timelineItem {
  @apply rounded-lg border p-4;
  border-color: rgba(231, 223, 212, 0.1);
  background: rgba(231, 223, 212, 0.04);
}

.itemTop,
.educationCard {
  @apply flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between;
}

.experienceItem h3,
.educationCard h3,
.timelineItem h3 {
  @apply font-bruno text-lg;
  color: #e7dfd4;
}

.itemMeta,
.educationCard p,
.timelineItem p,
.analyticsNote,
.serviceItem span {
  @apply text-sm leading-relaxed;
  color: rgba(231, 223, 212, 0.72);
}

.itemBadge,
.educationCard span {
  @apply w-fit rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide;
  border-color: rgba(126, 191, 159, 0.34);
  background: rgba(126, 191, 159, 0.1);
  color: #9ed6ba;
}

.detailList {
  @apply mt-4 grid gap-2;
}

.detailList li {
  @apply flex gap-2 text-sm leading-relaxed;
  color: rgba(231, 223, 212, 0.82);
}

.detailList li::before {
  content: '';
  @apply mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full;
  background: #f29f67;
}

.serviceList {
  @apply mt-6 grid gap-3;
}

.serviceItem p {
  @apply font-bruno text-base;
  color: #e7dfd4;
}

.analyticsPanel {
  background: linear-gradient(135deg, rgba(242, 159, 103, 0.12), rgba(18, 18, 16, 0.88));
}

.analyticsGrid {
  @apply mt-6 flex flex-wrap gap-2;
}

.analyticsGrid span {
  @apply rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide;
  border-color: rgba(231, 223, 212, 0.22);
  background: rgba(231, 223, 212, 0.08);
  color: #e7dfd4;
}

.analyticsNote {
  @apply mt-5;
}

.timelinePanel {
  @apply mt-6;
}

.timelineTrack {
  @apply mt-6 grid gap-4 lg:grid-cols-4;
}

.timelineItem {
  @apply relative min-h-44;
}

.timelineDot {
  @apply mb-4 block h-3 w-3 rounded-full;
  background: linear-gradient(90deg, #f29f67, #7ebf9f);
  box-shadow: 0 0 0 6px rgba(242, 159, 103, 0.12);
}

.timelineDate {
  @apply text-xs uppercase tracking-wide;
  color: #f29f67;
}
</style>
