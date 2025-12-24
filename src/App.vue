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
@import url('https://fonts.googleapis.com/css2?family=Bruno+Ace+SC&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');
body{
  background: linear-gradient(180deg, #05060a 0%, #0a0f1e 45%, #040507 100%);
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: 100vh;
  margin: 0;
  overflow-x: hidden;
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
