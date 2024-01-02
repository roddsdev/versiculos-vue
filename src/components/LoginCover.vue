<script setup>
import { cardsStore } from '@/stores/cards.js';
import IconSwipeHand from '@/components/icons/IconSwipeHand.vue';
import { computed, inject, ref } from 'vue';
import { useRouter } from 'vue-router';

const store = cardsStore();
const limiteAlcancado = computed( () => store.limiteAlcancado)
const email = computed( () => store.email)
const iconGreenStar = "data:image/png;base64,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"
const formEmail = ref();
const formPassword = ref();
const showLoginArea = ref(false);
const apiMsg = ref();
const bibliaApiService = inject('$bibliaApiService')
const router = useRouter();

const login = async () => {
  let params = {
    "email": formEmail.value,
    "password": formPassword.value
  }
  const responseLogin = await bibliaApiService.login(params)
  if (responseLogin.token) {
    localStorage.token = responseLogin.token
    localStorage.email = formEmail.value
    return router.go()
  }
  if (responseLogin.msg) apiMsg.value = responseLogin.msg
}

const create = async () => {
  let emailSplit = formEmail.value.split("@")
  let params = {
    "name": emailSplit[0],
    "email": formEmail.value,
    "password": "aboveallpowers",
    "notifications": true
  }
  const responseCreate = await bibliaApiService.createUser(params)
  if (responseCreate.token) {
    localStorage.token = responseCreate.token
    return router.go()
  }
  if (responseCreate.msg) apiMsg.value = responseCreate.msg
}

const createOrLogin = async () => {
  // check if email exists
  const responseResendPassword = await bibliaApiService.resendPassword(formEmail.value)
  if (responseResendPassword.msg) apiMsg.value = responseResendPassword.msg
  // if user email exists, show login area
  if (responseResendPassword.status == 200) return showLoginArea.value = true
  // if user not found (error 404), try create user
  if (responseResendPassword.status == 404 ) create()
}
</script>

<template>
  <div>
    <IconSwipeHand />
    <h3 class="cardVerseText">Arraste para os lados</h3>
    <div class="cardReferenceText">Deus te abençoe!</div>
    
    <div v-if="limiteAlcancado == 1" class="limite">
      Limite de requisições gratuitas foi alcançado. Tente novamente em 1 hora ou faça o login.
      
      <div v-if="showLoginArea" class="button-area">
        <input type="password" v-model="formPassword" placeholder="Insira a senha" />
        <button @click="login"> Login </button>
      </div>
      <div v-else class="button-area">
        <input type="email" v-model="formEmail" placeholder="Digite o email" />
        <button @click="createOrLogin"> Acessar </button>
      </div>

      <div v-if="apiMsg" class="apiMsg-area">
        {{ apiMsg }}
      </div>

    </div>
    
    <div class="api-info-area">
      <div v-if="email" class="logged-email-area">
        <img :src="iconGreenStar" alt="Registered to" width="20px" style="margin-right: 3px;" /> {{ email }}
      </div>
      Created by <a href="https://github.com/roddsdev" target="_blank">Rodrigo Borges</a>
      | Api provided by <a href="https://www.abibliadigital.com.br/" target="_blank">ABibliaDigital</a>
    </div>
  </div>
</template>

<style scoped>
@import "@/styles/card.scss";
</style>