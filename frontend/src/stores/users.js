import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useCitiesStore = defineStore('tree', () => {
    const city = reactive({
        id: null,
        name: null,
        citizensAmount: null
    })

    /**
     * Запрашивает информацию о городе у API и устанавливает его в сторе
     *
     * @param { number } city_id
     */
    async function getCity(city_id) {
        fetch('/city/' + city_id)
            .then((response) => response.json())
            .then((data) => {
                city.id = city_id
                city.name = data.name
                city.citizensAmount = data.citizensAmount
            })
            .catch(() => {
                city.id = null
                city.name = null
                city.citizensAmount = null
            })
    }

    async function closeCity() {
        city.id = null
        city.name = null
        city.citizensAmount = null
    }

    return { user, getCity, closeCity }
})
