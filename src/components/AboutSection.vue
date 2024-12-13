<template>
  <section id="about" class="pt-10">
    <h1 class="font-bruno text-lg sm:text-5xl text-white pb-4 pt-10">
      About Me
    </h1>
    <div class="aboutText hover-effect">
      <p class="font-bruno text-white py-6 text-justify text-lg sm:text-xl">
        I am a Computer Programming student with a strong focus on web
        development.
      </p>
      <p class="font-bruno text-white py-6 text-justify text-lg sm:text-xl">
        I have worked on various projects using Vue.js and have gained
        proficiency in modern web technologies.
      </p>
      <p class="font-bruno text-white py-6 text-justify text-lg sm:text-xl">
        Currently, I am focused on enhancing my back-end skills.
      </p>
      <p class="font-bruno text-white py-6 text-justify text-lg sm:text-xl">
        My goal is to become a full-stack developer, specializing in both
        front-end and back-end development.
      </p>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.aboutText {
  text-align: justify;
  text-justify: inter-word;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 25px;
  border-radius: 10px;
  transition: background-color 0.5s, box-shadow 0.5s;
  position: relative;
  overflow: hidden;
}

.aboutText:hover {
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}

.aboutText::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.5) 0%,
    transparent 80%
  );
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.5s;
  pointer-events: none;
}

.aboutText:hover::before {
  transform: translate(-50%, -50%) scale(1);
}
</style>
