<script setup>
import LoginCover from "@/components/LoginCover.vue";

defineProps({
  card: {
    type: Object,
    required: true
  },
})
</script>

<template>
  <LoginCover v-if="card.cover" />

  <div v-else>
    <h3 class="cardVerseText">{{ card.text }}</h3>
    <div class="cardReferenceText">{{ card.reference }}</div>
  </div>
</template>

<style scoped>
@import "@/styles/card.scss";
</style>