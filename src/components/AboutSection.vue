<template>
 <section id="about" class="pt-10 px-6 sm:px-8 md:px-16">
<h1 class="font-bruno text-lg sm:text-5xl text-white pb-4 pt-10">
 About Me
</h1>
<div class="aboutText">
<h2 class="sectionTitle">👨‍💻 Who I Am</h2>
<p class="pText">
 Computer Programming graduate with a passion for modern web development. Specialized in Vue.js and front-end technologies.
</p>
<h2 class="sectionTitle">🚀 My Skills</h2>
<p class="pText">
 Vue.js, Nuxt.js, HTML, CSS, JavaScript. Advancing in back-end development to become a full-stack developer.
</p>
<h2 class="sectionTitle">📊 Current Focus</h2>
<p class="pText">
 Diving deep into data science, combining theoretical knowledge with practical applications to create data-driven solutions.
</p>
<h2 class="sectionTitle">💻 What Drives Me</h2>
<p class="pText">
 Turning complex ideas into elegant code. Building intuitive interfaces and optimizing performance for meaningful impact.
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