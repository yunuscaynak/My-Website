<script setup>
import { onMounted } from 'vue'
import HomeSection from '@/components/HomeSection.vue';
import AboutSection from '@/components/AboutSection.vue';
import MySkillsSection from '@/components/MySkillsSection.vue';
import ContactSection from '@/components/ContactSection.vue';
import FooterSection from '@/components/FooterSection.vue';

onMounted(() => {
  // Sayfa başlığını güncelle
  document.title = 'Yunus Caynak'

  // Meta etiketlerini güncelle
  const descriptionMetaTag = document.querySelector('meta[name="description"]')
  if (descriptionMetaTag) {
    descriptionMetaTag.setAttribute('content', 'Yunus Caynak’ın web geliştirme projeleri hakkında bilgi.')
  } else {
    const newMetaTag = document.createElement('meta')
    newMetaTag.setAttribute('name', 'description')
    newMetaTag.setAttribute('content', 'Yunus Caynak’ın web geliştirme projeleri hakkında bilgi.')
    document.head.appendChild(newMetaTag)
  }
})
</script>

<template>
  <main class="px-6 sm:px-8 md:px-16">
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
