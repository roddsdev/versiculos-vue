<script setup>
import interact from "interactjs";
import CardContent from "@/components/CardContent.vue";
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'

const props = defineProps({
  card: {
    type: Object,
    required: true
  },
  isCurrent: {
    type: Boolean,
    required: true
  }
})

const ACCEPT_CARD = "cardAccepted";
const REJECT_CARD = "cardRejected";
const SKIP_CARD = "cardSkipped";
const options = {
  static: {
    interactMaxRotation: 15,
    interactOutOfSightXCoordinate: 500,
    interactOutOfSightYCoordinate: 600,
    interactYThreshold: 150,
    interactXThreshold: 100
  }
}
const interactElement = ref(null)
const isInteractAnimating = ref(true)
const isInteractDragged = ref(null)
const interactPosition = ref({
  x: 0,
  y: 0,
  rotation: 0
})
let isShowing = true

const transformString = computed( () => {
  if (!isInteractAnimating.value || isInteractDragged.value) {
    const { x, y, rotation } = interactPosition.value
    return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
  }
  return null;
})

onMounted( () => {
  const element = interactElement.value
  interact(element).draggable({
    onstart: () => {
      isInteractAnimating.value = false
    },
    onmove: event => {
      const { interactMaxRotation, interactXThreshold } = options.static
      const x = interactPosition.value.x + event.dx
      const y = interactPosition.value.y + event.dy
      let rotation = interactMaxRotation * (x / interactXThreshold)
      if (rotation > interactMaxRotation)
          rotation = interactMaxRotation;
      else if (rotation < -interactMaxRotation)
          rotation = -interactMaxRotation;
      interactSetPosition({ x, y, rotation })
    },
    onend: () => {
      const { x, y } = interactPosition.value;
      const { interactXThreshold, interactYThreshold } = options.static;
      isInteractAnimating.value = true;
      if (x > interactXThreshold)
        playCard(ACCEPT_CARD);
      else if (x < -interactXThreshold)
        playCard(REJECT_CARD);
      else if (y > interactYThreshold)
        playCard(SKIP_CARD);
      else
        resetCardPosition();
    }
  });
})
onBeforeUnmount( () => {
  interact(interactElement.value).unset();
})

const emit = defineEmits(["hideCard", "cardAccepted", "cardRejected", "cardSkipped"]);
const hideCard = () => {
  setTimeout(() => {
    isShowing = false
    emit("hideCard", props.card)
  }, 300);
}
const playCard = (interaction) => {
  const { interactOutOfSightXCoordinate, interactOutOfSightYCoordinate, interactMaxRotation } = options.static;
  interactUnsetElement();
  switch (interaction) {
    case ACCEPT_CARD:
      interactSetPosition({
        x: interactOutOfSightXCoordinate,
        rotation: interactMaxRotation
      });
      emit(ACCEPT_CARD);
      break;
    case REJECT_CARD:
      interactSetPosition({
        x: -interactOutOfSightXCoordinate,
        rotation: -interactMaxRotation
      });
      emit(REJECT_CARD);
      break;
    case SKIP_CARD:
      interactSetPosition({
        y: interactOutOfSightYCoordinate
      });
      emit(SKIP_CARD);
      break;
  }
  hideCard();
}
const interactSetPosition = (coordinates) => {
    const { x = 0, y = 0, rotation = 0 } = coordinates
    interactPosition.value = { x, y, rotation }
}
const interactUnsetElement = () => {
  interact(interactElement.value).unset()
  isInteractDragged.value = true
}
const resetCardPosition = () => {
  interactSetPosition({ x: 0, y: 0, rotation: 0 })
}
</script>

<template>
  <div
    v-if="isShowing"
    ref="interactElement"
    :class="{
      isAnimating: isInteractAnimating,
      isCurrent: isCurrent
    }"
    class="card"
    :style="{ transform: transformString }"
  >
    <CardContent :card="card" />
  </div>
</template>
  
<style scoped>
@import "@/styles/card.scss";
</style>