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
      <button @click="closeMenu" class="closeButton" aria-label="Menüyü kapat">
        <span class="closeIcon"></span>
        <span class="closeLabel">Close</span>
      </button>
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
  background: rgba(12, 10, 9, 0.92);
  border-bottom: 1px solid rgba(231, 223, 212, 0.12);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
}

.navScrolled {
  @apply shadow-lg;
  background: rgba(12, 10, 9, 0.96);
}

.brand {
  @apply flex items-center gap-2 text-white;
}

.brandMark {
  @apply text-2xl font-bruno text-white transition duration-300;
  color: #e7dfd4;
  letter-spacing: 0.08em;
}

.brandMark:hover {
  color: #f29f67;
}

.brandHint {
  @apply text-xs uppercase tracking-[0.2em] hidden sm:inline;
  color: rgba(231, 223, 212, 0.45);
}

.desktopLinks {
  @apply hidden items-center gap-5 lg:flex;
}

.navLink {
  @apply relative flex items-center gap-2 font-bruno text-sm uppercase tracking-wide transition duration-300;
  padding: 6px 0;
  color: rgba(231, 223, 212, 0.72);
  outline: none;
}

.navLink::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #f29f67, #7ebf9f);
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
  @apply h-1 w-1 rounded-full transition duration-300;
  background: rgba(231, 223, 212, 0.35);
}

.navLinkActive {
  color: #e7dfd4;
}

.navLinkActive .dot {
  @apply w-2;
  background: #f29f67;
}

.navLink:focus-visible {
  outline: 2px solid rgba(242, 159, 103, 0.45);
  outline-offset: 6px;
  border-radius: 10px;
  color: #e7dfd4;
}

.menuButton {
  @apply relative h-10 w-10 rounded-full border p-2 text-white transition duration-300 hover:-translate-y-0.5;
  border-color: rgba(231, 223, 212, 0.18);
  background: rgba(231, 223, 212, 0.08);
  outline: none;
}

.menuButton:focus-visible {
  outline: 2px solid rgba(242, 159, 103, 0.45);
  outline-offset: 4px;
}

.menuIcon,
.menuIcon::before,
.menuIcon::after {
  @apply absolute left-1/2 h-0.5 w-6 -translate-x-1/2 transition-all duration-300;
  content: '';
  background: #e7dfd4;
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
  @apply fixed top-0 right-0 flex h-full w-3/4 translate-x-full flex-col items-center gap-6 px-8 py-16 text-white shadow-2xl transition-transform duration-500 lg:hidden;
  background: rgba(12, 10, 9, 0.98);
  border-left: 1px solid rgba(231, 223, 212, 0.14);
}

.closeButton {
  @apply mb-4 self-end flex items-center gap-2 rounded-full px-3 py-2 text-sm uppercase tracking-wide transition duration-200;
  color: rgba(231, 223, 212, 0.85);
  border: 1px solid rgba(231, 223, 212, 0.18);
  background: rgba(231, 223, 212, 0.06);
}

.closeButton:hover {
  border-color: #f29f67;
  color: #f29f67;
}

.closeButton:focus-visible {
  outline: 2px solid rgba(242, 159, 103, 0.45);
  outline-offset: 4px;
}

.closeIcon {
  position: relative;
  display: inline-block;
  width: 14px;
  height: 14px;
}

.closeIcon::before,
.closeIcon::after {
  content: '';
  position: absolute;
  top: 6px;
  left: 0;
  width: 14px;
  height: 2px;
  background: currentColor;
  transform-origin: center;
}

.closeIcon::before {
  transform: rotate(45deg);
}

.closeIcon::after {
  transform: rotate(-45deg);
}

.closeLabel {
  @apply font-bruno;
}

.mobilePanel.open {
  @apply translate-x-0;
}

.mobileLink {
  @apply font-bruno text-xl uppercase tracking-wide transition duration-300;
  color: rgba(231, 223, 212, 0.82);
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
  background: linear-gradient(90deg, #f29f67, #7ebf9f);
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
