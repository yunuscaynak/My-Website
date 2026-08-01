<script setup>
import { onMounted } from 'vue'
import AboutSection from '@/components/AboutSection.vue';
import ResumeSection from '@/components/ResumeSection.vue';
import MySkillsSection from '@/components/MySkillsSection.vue';
import ProjectsSection from '@/components/ProjectsSection.vue';
import ContactSection from '@/components/ContactSection.vue';
import FooterSection from '@/components/FooterSection.vue';

onMounted(() => {
  // Update the page title
  document.title = 'Yunus Caynak'

  // Update meta tags
  const descriptionMetaTag = document.querySelector('meta[name="description"]')
  if (descriptionMetaTag) {
    descriptionMetaTag.setAttribute('content', 'Information about Yunus Caynak web development projects.')
  } else {
    const newMetaTag = document.createElement('meta')
    newMetaTag.setAttribute('name', 'description')
    newMetaTag.setAttribute('content', 'Information about Yunus Caynak web development projects.')
    document.head.appendChild(newMetaTag)
  }
})
</script>
<template>
  <main class="relative">
    <div class="pointer-events-none absolute inset-0 opacity-60">
      <div class="absolute -left-10 top-24 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl"></div>
      <div class="absolute right-6 bottom-10 h-72 w-72 rounded-full bg-purple-500/15 blur-3xl"></div>
    </div>
    <div class="relative px-6 py-4 md:px-12">
      <AboutSection />
      <ResumeSection />
      <MySkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  </main>

  <FooterSection />
</template>
