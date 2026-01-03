<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import VideoBackground from './components/VideoBackground.vue';

// import { onMounted, onBeforeUnmount } from 'vue';

// onMounted(() => {
//   // Mouse move eventi artık dinlenmeyecek
// });

// onBeforeUnmount(() => {
//   // Mouse move event listener kaldırılacak
// });
</script>

<template>
  <div id="app">
    <header>
      <div class="wrapper">
        <nav>
          <Navbar />
        </nav>
      </div>
    </header>
    <main>
      <VideoBackground />
      <RouterView />
    </main>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bruno+Ace+SC&family=Space+Grotesk:wght@400;500;600;700&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');
body{
  background: radial-gradient(circle at 15% 20%, rgba(205, 141, 96, 0.14), transparent 32%),
    radial-gradient(circle at 80% 12%, rgba(109, 175, 140, 0.12), transparent 30%),
    radial-gradient(circle at 60% 80%, rgba(255, 214, 153, 0.16), transparent 28%),
    linear-gradient(180deg, #0c0a09 0%, #0f1410 45%, #0a0c0a 100%);
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: 100vh;
  overflow-x: hidden;
  color: #e7dfd4;
  font-family: "Space Grotesk", "Roboto Mono", system-ui, -apple-system, sans-serif;
}

html {
  scroll-behavior: smooth;
}

.bruno-ace-sc-regular {
  font-family: "Bruno Ace SC", sans-serif;
  font-weight: 400;
  font-style: normal;
}

</style>
