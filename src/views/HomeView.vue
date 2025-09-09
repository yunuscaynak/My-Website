<script setup>
import { onMounted } from 'vue'
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
  <main>
    <div
      class="min-h-screen"
      style="background: linear-gradient(
        180deg,
        rgba(0,0,0,1) 0%,
        rgba(66,0,189,1) 50%,
        rgba(0,0,0,1) 100%
      );"
    >
      <!-- About Me Section -->
      <AboutSection />

      <!-- My Skills Section -->
      <MySkillsSection />
    </div>

    <!-- Contact Me Section -->
<section
  class="py-20"
  style="background: linear-gradient(
    180deg,
    #000000 0%,     /* En üstte siyaha yakın koyu gri */
    #2e003e 40%,    /* Koyu mor (derinlik verir) */
    #4b0082 70%,    /* Indigo (yumuşak mor ton) */
    #0a0a0a 100%    /* En altta tekrar siyaha yakın */
  );"
>
  <ContactSection />
</section>

  </main>

  <FooterSection />
</template>
