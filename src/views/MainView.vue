<script setup>
import CardsStack from '@/components/CardsStack.vue';
import { onMounted, computed, inject } from 'vue';
import { cardsStore } from '@/stores/cards.js';

const store = cardsStore();
const visibleCards = computed( () => store.contentArray)

const handleCardAccepted = () => {
  console.log("handleCardAccepted");
}
const handleCardRejected = () => {
  console.log("handleCardRejected");
}
const handleCardSkipped = () => {
  console.log("handleCardSkipped");
}
const removeCardFromDeck = () => {
  visibleCards.value.shift();
}

if (localStorage.token) store.setToken(localStorage.token)
if (localStorage.email) store.setEmail(localStorage.email)
const bibliaApiService = inject('$bibliaApiService')

onMounted( async () => {
  const firstCard = {"cover": 1}
  store.addCardContent(firstCard)
  
  const numberCards = 3;
  for (let i=1; i<=numberCards; i++)  {
    await bibliaApiService.addRandomVerseToCard(i)
  }
})
</script>

<template>
  <div id="app">
		<CardsStack
			:cards="visibleCards"
			@cardAccepted="handleCardAccepted"
			@cardRejected="handleCardRejected"
			@cardSkipped="handleCardSkipped"
			@hideCard="removeCardFromDeck"
		/>
  </div>
</template>

<style lang="scss">
@import "@/styles/mixins.scss";
@import "@/styles/main.scss";
</style>