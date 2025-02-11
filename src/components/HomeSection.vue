<template>
  <section id="home" class="pt-10 pb-10 h-screen ">
    <h1 class="font-bruno text-xl sm:text-2xl text-white pt-10 pb-4">
      Hi, my name is
    </h1>
    <p
      class="font-bruno text-5xl sm:text-6xl md:text-7xl text-gray-300 pt-[80px] pb-10"
    >
      Yunus.
    </p>
    <h3
      class="font-bruno text-2xl sm:text-3xl md:text-4xl text-gray-300 pt-[60px] pb-14"
    >
      _I'm a <b>Frontend</b> developer
    </h3>
    <div class="textDiv pt-3">
      <span
        ref="textElement"
        class="textArea font-bruno text-3xl sm:text-4xl md:text-5xl pt-[10px]"
        >{{ displayText }}<span class="cursor">|</span></span
      >
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

const text = "I build things for the web";
const displayText = ref("");

const typeText = () => {
  let index = 0;
  const typeInterval = setInterval(() => {
    if (index < text.length) {
      displayText.value += text[index];
      index++;
    } else {
      clearInterval(typeInterval);
      setTimeout(deleteText, 5000);
    }
  }, 100);
};

const deleteText = () => {
  let index = displayText.value.length;
  const deleteInterval = setInterval(() => {
    if (index > 0) {
      displayText.value = displayText.value.slice(0, index - 1);
      index--;
    } else {
      clearInterval(deleteInterval);
      setTimeout(typeText, 2000);
    }
  }, 50);
};

onMounted(() => {
  typeText();
});
</script>

<style scoped>

.textDiv {
  position: relative;
}

.textArea {
  position: absolute;
  color: #fff;
  font-weight: bold;
  font-size: 5vw;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.6);
  z-index: 10;
  margin-bottom: 300px;
}

.cursor {
  position: absolute;
  color: white;
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

@media (max-width: 640px) {
  .textArea {
    font-size: 8vw;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .textArea {
    font-size: 6vw;
  }
}

@media (min-width: 1025px) {
  .textArea {
    font-size: 3.5rem;
  }
}
</style>
