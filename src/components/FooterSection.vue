<template>
  <footer class="footerShell">
    <div class="max-w-6xl mx-auto grid gap-8 px-6 py-10 sm:px-10 lg:grid-cols-3">
      <div class="space-y-3">
        <p class="eyebrow">Yunus Caynak</p>
        <h2 class="title">Futuristic web experiences.</h2>
        <p class="hint">Nuxt/Vue front-ends, fast APIs, design-forward delivery.</p>
      </div>

      <div class="grid gap-2 text-white/80">
        <p class="font-bruno text-white">Quick Links</p>
        <a href="#home" class="link">Home</a>
        <a href="#about" class="link">About</a>
        <a href="#mySkills" class="link">Skills</a>
        <a href="#contact" class="link">Contact</a>
      </div>

      <div class="space-y-3">
        <p class="font-bruno text-white">Get in touch</p>
        <a href="mailto:caynakyunus21@gmail.com" class="link">caynakyunus21@gmail.com</a>
        <p class="hint">Built with Vue, Tailwind, Firebase.</p>
      </div>
    </div>
    <div class="border-t border-white/10 text-center text-white/50 py-4 text-sm">
      © 2024 Yunus Caynak. All rights reserved.
    </div>
  </footer>
</template>

<style scoped>
.footerShell {
  @apply relative mt-auto text-white;
  background: linear-gradient(180deg, #0f0e0c 0%, #0b0a09 100%);
  border-top: 1px solid rgba(231, 223, 212, 0.12);
}

.eyebrow {
  @apply inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em];
  border-color: rgba(231, 223, 212, 0.2);
  color: #f29f67;
  background: rgba(231, 223, 212, 0.05);
}

.title {
  @apply font-bruno text-2xl;
  color: #e7dfd4;
}

.hint {
  @apply text-sm;
  color: rgba(231, 223, 212, 0.6);
}

.link {
  @apply text-sm transition duration-200;
  color: rgba(231, 223, 212, 0.7);
}
.link:hover {
  color: #f29f67;
}
</style>
