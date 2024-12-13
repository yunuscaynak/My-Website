<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import VideoBackground from './components/VideoBackground.vue';

import { ref, onMounted, onBeforeUnmount } from 'vue';

const cursorTrail = ref([]);
let isMouseMoving = false;

const createTrail = (e) => {
  isMouseMoving = true;

  const trailElement = document.createElement('div');
  trailElement.classList.add('cursor-trail');
  trailElement.style.left = `${e.pageX}px`;
  trailElement.style.top = `${e.pageY}px`;
  document.body.appendChild(trailElement);

  cursorTrail.value.push(trailElement);

  if (cursorTrail.value.length > 60) {
    const removed = cursorTrail.value.shift();
    removed && removed.remove();
  }

  setTimeout(() => {
    isMouseMoving = false;
  }, 900);
};

const clearTrails = () => {
  if (!isMouseMoving) {
    while (cursorTrail.value.length) {
      const removed = cursorTrail.value.shift();
      removed && removed.remove();
    }
  }
};

onMounted(() => {
  window.addEventListener('mousemove', createTrail);
  setInterval(clearTrails, 100);
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', createTrail);
});
</script>

<template>
  <div id="app">
    <VideoBackground />
    <header>
      <div class="wrapper">
        <nav>
          <Navbar />
        </nav>
      </div>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bruno+Ace+SC&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');
body{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: linear-gradient(to right, #1e3c72, #2a5298);
  height: 100vh;
  margin: 0;
  overflow-x: hidden;
}

.bruno-ace-sc-regular {
  font-family: "Bruno Ace SC", sans-serif;
  font-weight: 400;
  font-style: normal;
}


.cursor-trail {
  position: absolute;
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, rgba(0, 153, 255, 1) 0%, rgba(0, 89, 247, 0.6) 70%, rgba(0, 89, 247, 0) 100%);
  border-radius: 50%;
  pointer-events: none;
  mix-blend-mode: color-dodge;
  animation: trailFade 1s ease-out;
}

@keyframes trailFade {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}


::-webkit-scrollbar {
  width: 12px; 
}

::-webkit-scrollbar-track {
  background: #000;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #0099ff, #00296b); 
  border-radius: 6px;
  border: 2px solid #000; 
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #33aaff, #00408f); 
}


</style>
