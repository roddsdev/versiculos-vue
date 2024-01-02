import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import FetchAdapter from '@/infra/adapters/FetchAdapter'
import ABibliaOnlineApiService from '@/services/api/ABibliaOnlineApiService'


const app = createApp(App)
app.use(createPinia())
app.use(router)
const fetch = new FetchAdapter;
const bibliaApiService = new ABibliaOnlineApiService(fetch);
app.provide('$bibliaApiService', bibliaApiService)

app.mount('#app')
