import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUsersStore = defineStore('users', () => {
    const user = ref(null)

    /**
     * Запрашивает информацию о пользователе у API и сохраняет
     * его в сторе
     *
     * @param { number } user_id
     */
    function getUser(user_id) {
        fetch('/api/users/' + user_id)
            .then((response) => response.json())
            .then((data) => {
                user.value = data
            })
            .catch(() => {
                user.value = null
            })
    }

    function closeUser() {
        user.value = null
    }

    return { user, getUser, closeUser }
})
