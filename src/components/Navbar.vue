<template>
  <nav
    :class="{
      'shadow-lg': isScrolled,
    }"
    class="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-16 flex justify-between items-center transition-all duration-300"
  >
    <!-- Logo -->
    <div class="text-white text-2xl font-bold">
      <a href="/" class="font-bruno">Y.</a>
    </div>

    <!-- Navigation Linkleri (Desktop) -->
    <div class="hidden sm:flex space-x-6 text-white">
      <!-- Sayfa içi yönlendirme -->
      <RouterLink to="#home" class="font-bruno text-lg hover:text-gray-300">
        Home
      </RouterLink>
      <RouterLink to="#about" class="font-bruno text-lg hover:text-gray-300">
        About Me
      </RouterLink>
      <RouterLink
        to="#mySkills"
        class="font-bruno tex t-lg hover:text-gray-300"
      >
        My Skills
      </RouterLink>
      <RouterLink to="#contact" class="font-bruno tex t-lg hover:text-gray-300">
        Contact Me
      </RouterLink>
    </div>

    <!-- Hamburger Menu Butonu (sadece sm ve daha küçük ekranlar) -->
    <button
      @click="toggleMenu"
      class="hamburger-btn text-white focus:outline-none relative z-50"
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

    <!-- Mobil Menu -->
    <div
      :class="{ 'translate-x-0': isMenuOpen, 'translate-x-full': !isMenuOpen }"
      class="fixed top-0 right-0 w-3/4 h-full bg-gray-900 text-white flex flex-col items-center py-16 space-y-8 shadow-lg transition-transform duration-500 md:hidden"
    >
      <!-- Sayfa içi yönlendirme -->
      <RouterLink
        @click="closeMenu"
        to="#home"
        class="font-bruno text-xl hover:text-gray-300"
      >
        Home
      </RouterLink>
      <RouterLink
        @click="closeMenu"
        to="#about"
        class="font-bruno text-xl hover:text-gray-300"
      >
        About Me
      </RouterLink>
      <RouterLink
        @click="closeMenu"
        to="#mySkills"
        class="font-bruno text-xl hover:text-gray-300"
      >
        My Skills
      </RouterLink>
      <RouterLink
        @click="closeMenu"
        to="#contact"
        class="font-bruno text-xl hover:text-gray-300"
      >
        Contact Me
      </RouterLink>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isScrolled: false,
      isMenuOpen: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 0;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
};
</script>

<style scoped>
nav {
  background-color: transparent;
  box-shadow: none;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

nav.shadow-lg {
  background-color: #35495e;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

a:hover {
  color: #fff;
  border-bottom: 2px solid #fff;
}
.hamburger-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
}

@media (max-width: 639px) {
  .hamburger-btn {
    display: flex;
  }
}

.fixed {
  top: 0;
  right: 0;
}
</style>
