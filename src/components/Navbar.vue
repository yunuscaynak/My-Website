<template>
  <nav
    class="navShell"
    :class="{ 'navScrolled': isScrolled }"
  >
    <div class="brand">
      <a href="/" class="brandMark">Y.</a>
      <span class="brandHint">Portfolio</span>
    </div>

    <div class="desktopLinks">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="navLink"
        active-class="navLinkActive"
      >
        <span class="dot"></span>
        {{ link.text }}
      </RouterLink>
    </div>

    <button @click="toggleMenu" class="menuButton lg:hidden" aria-label="Toggle menu">
      <span :class="{ open: isMenuOpen }" class="menuIcon"></span>
    </button>

    <div
      class="mobilePanel"
      :class="{ open: isMenuOpen }"
    >
      <RouterLink
        v-for="link in links"
        :key="link.to"
        @click="closeMenu"
        :to="link.to"
        class="mobileLink"
        active-class="navLinkActive"
      >
        {{ link.text }}
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isScrolled = ref(false);
const isMenuOpen = ref(false);

const links = [
  { to: '#home', text: 'Home' },
  { to: '#about', text: 'About Me' },
  { to: '#mySkills', text: 'My Skills' },
  { to: '#contact', text: 'Contact Me' },
];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = '';
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
  document.body.style.overflow = '';
});
</script>

<style scoped>
.navShell {
  @apply fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-4 md:px-12 transition-all duration-300;
  background: linear-gradient(120deg, rgba(34, 211, 238, 0.15), rgba(99, 102, 241, 0.15));
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
}

.navScrolled {
  @apply shadow-lg shadow-purple-500/10;
  background: linear-gradient(120deg, rgba(34, 211, 238, 0.3), rgba(99, 102, 241, 0.3));
}

.brand {
  @apply flex items-center gap-2 text-white;
}

.brandMark {
  @apply text-2xl font-bruno text-white transition duration-300 hover:text-cyan-300;
}

.brandHint {
  @apply text-xs uppercase tracking-[0.2em] text-white/60 hidden sm:inline;
}

.desktopLinks {
  @apply hidden items-center gap-5 lg:flex;
}

.navLink {
  @apply relative flex items-center gap-2 font-bruno text-sm text-white/80 uppercase tracking-wide transition duration-300 hover:text-white;
  padding-bottom: 6px;
}

.navLink::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #22d3ee, #6366f1);
  border-radius: 9999px;
  opacity: 0;
  transition: width 200ms ease, opacity 200ms ease;
}

.navLink:hover::after,
.navLinkActive::after {
  width: 100%;
  opacity: 1;
}

.navLink .dot {
  @apply h-1 w-1 rounded-full bg-white/40 transition duration-300;
}

.navLinkActive {
  @apply text-white;
}

.navLinkActive .dot {
  @apply bg-cyan-300 w-2;
}

.menuButton {
  @apply relative h-10 w-10 rounded-full border border-white/20 bg-white/5 p-2 text-white shadow-md shadow-cyan-400/20 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200/60 hover:bg-white/10;
}

.menuIcon,
.menuIcon::before,
.menuIcon::after {
  @apply absolute left-1/2 h-0.5 w-6 -translate-x-1/2 bg-white transition-all duration-300;
  content: '';
}

.menuIcon {
  @apply top-1/2 -translate-y-1/2;
}

.menuIcon::before {
  @apply -top-2;
}

.menuIcon::after {
  @apply top-2;
}

.menuIcon.open {
  @apply bg-transparent;
}

.menuIcon.open::before {
  @apply top-0 rotate-45;
}

.menuIcon.open::after {
  @apply top-0 -rotate-45;
}

.mobilePanel {
  @apply fixed top-0 right-0 flex h-full w-3/4 translate-x-full flex-col items-center gap-6 bg-gradient-to-b from-[#0b1228]/95 via-[#111d3b]/95 to-[#0b1228]/95 px-8 py-16 text-white shadow-2xl transition-transform duration-500 lg:hidden;
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
}

.mobilePanel.open {
  @apply translate-x-0;
}

.mobileLink {
  @apply font-bruno text-xl uppercase tracking-wide text-white/80 transition duration-300 hover:text-white;
  position: relative;
  padding: 8px 0;
}

.mobileLink::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #22d3ee, #6366f1);
  border-radius: 9999px;
  opacity: 0;
  transition: width 200ms ease, opacity 200ms ease;
}

.mobileLink:hover::after,
.mobileLink.navLinkActive::after {
  width: 100%;
  opacity: 1;
}
</style>
