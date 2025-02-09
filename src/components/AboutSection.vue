<template>
  <section id="about" class="pt-10">
    <h1 class="font-bruno text-lg sm:text-5xl text-white pb-4 pt-10">
      About Me
    </h1>
    <div class="aboutText">
      <h2 class="sectionTitle">👨‍💻 Who I Am</h2>
      <p class="pText">
        Hi, I'm Yunus, a passionate Computer Programming student with a strong focus on web development. I have a keen interest in creating dynamic, user-friendly web applications and am always excited to explore new technologies and tools.
      </p>
      <h2 class="sectionTitle">🚀 My Skills</h2>  
      <p class="pText">
        I'm proficient in Vue.js, Nuxt.js,  HTML, CSS, and JavaScript, and I'm continually improving my knowledge of modern web technologies. Currently, I’m also diving into back-end development, with a special focus on building robust, scalable server-side applications.
      </p>
      <h2 class="sectionTitle">🎯 My Goal</h2>
      <p class="pText">
        My goal is to become a full-stack developer, bridging the gap between the front-end and back-end to create seamless, efficient web applications. I'm committed to continuous learning and excited to take on new challenges in the tech world.
      </p>
      <h2 class="sectionTitle">💻 What Drives Me</h2>
      <p class="pText">
        I’m driven by the idea of turning creative ideas into reality through code. Whether it's designing intuitive user interfaces or optimizing application performance, I enjoy making a positive impact with technology.
      </p>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.pText {
  @apply font-bruno text-white py-4 text-justify text-lg sm:text-xl;
}

.sectionTitle {
  @apply font-bold text-xl sm:text-2xl text-white pb-2;
}

.aboutText {
  @apply text-justify bg-white/10 text-white py-6 px-8 rounded-lg relative overflow-hidden transition-all duration-500 ease-in-out;
}

.aboutText:hover {
  @apply bg-white/30;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}
</style>
