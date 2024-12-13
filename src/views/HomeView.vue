<script setup>
import HomeSection from '@/components/HomeSection.vue';
import AboutSection from '@/components/AboutSection.vue';
import MySkillsSection from '@/components/MySkillsSection.vue';
import ContactSection from '@/components/ContactSection.vue';
import FooterSection from '@/components/FooterSection.vue';
</script>

<template>
  <main class="px-6 sm:px-8 md:px-16 py-8">
    <!-- Home Section -->
    <HomeSection />

    <!-- About Me Section -->
    <AboutSection />

    <!-- My Skills Section -->
    <MySkillsSection />

    <!-- Contact Me Section -->
    <ContactSection />

  </main>
  <!-- Footer Section -->
  <FooterSection />
</template>


