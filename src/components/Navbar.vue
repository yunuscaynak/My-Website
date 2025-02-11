<template>
  <nav
    :class="{
      'shadow-lg bg-[#0D197B]': isScrolled,
    }"
    class="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-16 flex justify-between items-center transition-all duration-300"
  >
    <!-- Logo -->
    <div class="text-white text-2xl font-bold">
      <a href="/" class="font-bruno">Y.</a>
    </div>

    <!-- Desktop Navigation Links -->
    <div class="hidden lg:flex space-x-6 text-white">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="font-bruno text-lg hover:text-gray-300 hover:scale-110 transition-all duration-300 b-2"
      >
        {{ link.text }}
      </RouterLink>
    </div>

    <!-- Hamburger Menu Button (for small and medium screens) -->
    <button
      @click="toggleMenu"
      class="hamburger-btn text-white focus:outline-none relative z-50 lg:hidden"
    >
      <div
        :class="{ 'rotate-45 translate-y-2': isMenuOpen }"
        class="w-8 h-1 bg-white mb-1 transition-all duration-300"
      ></div>
      <div
        :class="{ 'opacity-0': isMenuOpen }"
        class="w-8 h-1 bg-white mb-1 transition-opacity duration-300"
      ></div>
      <div
        :class="{ '-rotate-45 -translate-y-2': isMenuOpen }"
        class="w-8 h-1 bg-white transition-all duration-300"
      ></div>
    </button>

    <!-- Mobile Menu -->
    <div
      :class="{ 'translate-x-0': isMenuOpen, 'translate-x-full': !isMenuOpen }"
      class="fixed top-0 right-0 w-3/4 h-full bg-[#0D197B] text-white flex flex-col items-center py-16 space-y-8 shadow-lg transition-transform duration-500 lg:hidden"
    >
      <RouterLink
        v-for="link in links"
        :key="link.to"
        @click="closeMenu"
        :to="link.to"
        class="font-bruno text-xl hover:text-gray-300"
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
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* No custom CSS needed anymore, everything is handled by Tailwind */
</style>
