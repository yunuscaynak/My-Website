<template>
  <nav
    :class="{
      'backdrop-blur-md bg-[#0D197B]/30': isScrolled,
      'bg-transparent': !isScrolled
    }"
    class="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-16 flex justify-between items-center transition-all duration-300 border-b border-white/10"
  >
    <!-- Logo -->
    <div class="text-white text-2xl font-bold">
      <a href="/" class="font-bruno hover:text-blue-400 transition-colors duration-300">Y.</a>
    </div>

    <!-- Desktop Navigation Links -->
    <div class="hidden lg:flex space-x-6 text-white">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="font-bruno text-lg hover:text-blue-400 transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
      >
        {{ link.text }}
      </RouterLink>
    </div>

    <!-- Hamburger Menu Button -->
    <button
      @click="toggleMenu"
      class="hamburger-btn text-white focus:outline-none relative z-50 lg:hidden"
    >
      <div
        :class="{ 'rotate-45 translate-y-2': isMenuOpen }"
        class="w-8 h-0.5 bg-white mb-2 transition-all duration-300"
      ></div>
      <div
        :class="{ 'opacity-0': isMenuOpen }"
        class="w-8 h-0.5 bg-white mb-2 transition-opacity duration-300"
      ></div>
      <div
        :class="{ '-rotate-45 -translate-y-2': isMenuOpen }"
        class="w-8 h-0.5 bg-white transition-all duration-300"
      ></div>
    </button>

    <!-- Mobile Menu -->
    <div
      :class="{ 'translate-x-0': isMenuOpen, 'translate-x-full': !isMenuOpen }"
      class="fixed top-0 right-0 w-3/4 h-full bg-[#0D197B]/90 backdrop-blur-lg text-white flex flex-col items-center py-16 space-y-8 shadow-lg transition-transform duration-500 lg:hidden border-l border-white/10"
    >
      <RouterLink
        v-for="link in links"
        :key="link.to"
        @click="closeMenu"
        :to="link.to"
        class="font-bruno text-xl hover:text-blue-400 transition-colors duration-300"
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
nav {
  backdrop-filter: blur(4px);
  background: rgba(13, 25, 123, 0.1);
}

.router-link-active {
  color: #ffffff;
}

/* Fix for mobile Safari backdrop-filter */
@supports not (backdrop-filter: blur(4px)) {
  nav {
    background: rgba(13, 25, 123, 0.9);
  }
  .fixed.top-0.right-0 {
    background: rgba(13, 25, 123, 0.95);
  }
}
</style>