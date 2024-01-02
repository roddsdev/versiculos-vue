import { ref } from 'vue'
import { defineStore } from 'pinia'

export const cardsStore = defineStore('cards', () => {
  const limiteAlcancado = ref(0)
  const token = ref('')
  const email = ref('')
  const contentArray = ref([])

  const addCardContent = (obj) =>  {
    return contentArray.value.push(obj);
  }

  const setToken = (tokenText) => {
    return token.value = tokenText
  }

  const getToken = () => {
    return token.value
  }

  const setEmail = (emailText) => {
    return email.value = emailText
  }

  return { contentArray, addCardContent, limiteAlcancado, getToken, setToken, email, setEmail }
})
