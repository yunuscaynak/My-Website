<script setup>
import HomeSection from '@/components/HomeSection.vue';
import AboutSection from '@/components/AboutSection.vue';
import MySkillsSection from '@/components/MySkillsSection.vue';
import ContactSection from '@/components/ContactSection.vue';
import FooterSection from '@/components/FooterSection.vue';

useMeta({
  title: 'Yunus Çaynak | Web Geliştirici ve Projelerim',
  meta: [
    { name: 'description', content: 'Yunus Caynak’ın web geliştirme, Vue.js projeleri ve yazılım becerileri hakkında bilgi alabileceğiniz kişisel web sitesi.' },
    { name: 'keywords', content: 'Yunus Caynak, web geliştirici, Vue.js, yazılım, projeler' },
    { name: 'robots', content: 'index, follow' }
  ]
});
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



