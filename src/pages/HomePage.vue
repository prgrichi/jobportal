<template>
  <HeroSection />
  <ThreeJobsTeaser />
  <WhySection />
  <InfoStripSection />
  <TechStackSection />
</template>

<script>
import HeroSection from '@/components/home/HeroSection.vue';
import ThreeJobsTeaser from '@/components/home/ThreeJobsTeaser.vue';
import WhySection from '@/components/home/WhySection.vue';
import InfoStripSection from '@/components/home/InfoStripSection.vue';
import TechStackSection from '@/components/home/TechStackSection.vue';

export default {
  name: 'HomePage',
  components: {
    HeroSection,
    ThreeJobsTeaser,
    InfoStripSection,
    TechStackSection,
    WhySection
  },
}
</script>

<style scoped></style>