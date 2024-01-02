import { cardsStore } from '@/stores/cards.js';

export default class ABibliaOnlineApiService {
    
    // https://github.com/omarciovsena/abibliadigital/blob/master/DOCUMENTATION.md
    
    constructor (httpAdapter) {
        this.httpAdapter = httpAdapter
        this.httpAdapter.setUrl('https://www.abibliadigital.com.br/api/')
        this.addCardContent = cardsStore().addCardContent;
    }

    updateTokenFromStore () {
        if (!this.token) this.token = cardsStore().getToken()
    }

    async createUser (params) {
        let headers = {"Content-type": "application/json; charset=UTF-8", "Accept": "application/json"}
        const response = await this.httpAdapter.post('users', params, headers)
        const data = await response;
        return data;
    }

    async resendPassword (email) {        
        const response = await this.httpAdapter.post('users/password/'+email)
        const data = await response;
        return data;
    }

    async login (params) {
        let headers = {"Content-type": "application/json; charset=UTF-8"}
        const response = await this.httpAdapter.put('users/token', params, headers)
        const data = await response;
        return data;
    }

    async addRandomVerseToCard (posicao) {
        this.updateTokenFromStore()
        let headers = {}
        if (this.token) headers.Authorization = 'Bearer '+this.token
        if (posicao > 1 && cardsStore().limiteAlcancado == 1) return
        const data = await this.httpAdapter.get('verses/nvi/random', headers)
        this.addVersesToStore(data)
    }
    
    addVersesToStore = (data) => {
        if (data.status == 500) return { msg: "Houve um erro interno do servidor. Recarregue a página."}
        if (!data.text) return cardsStore().limiteAlcancado = 1
        cardsStore().limiteAlcancado = 0
        let dados = {
            text: data.text,
            reference: data.book.name+' '+data.chapter+':'+data.number
        }
        this.addCardContent(dados)
    }
}