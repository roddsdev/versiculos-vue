<script setup>
import CardArea from "@/components/CardArea.vue";

defineProps({
  cards: {
    type: Array,
    required: true
  }
})

</script>

<template>
  <div class="cards">
    <CardArea
      v-for="(card, index) in cards"
      :key="card"
      :card="card"
      :is-current="index === 0"
      @cardAccepted="$emit('cardAccepted');"
      @cardRejected="$emit('cardRejected');"
      @cardSkipped="$emit('cardSkipped');"
      @hideCard="$emit('hideCard');"
    />
  </div>
</template>

<style scoped>
@import "@/styles/stack.scss";
</style>
