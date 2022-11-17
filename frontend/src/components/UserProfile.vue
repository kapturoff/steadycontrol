<template>
    <a class="user" ref="userElement">
        <img class="user__icon" src="../assets/person-fill.svg" />
        {{ item.name }}
    </a>

    <div v-if="elementIsHovered" class="tooltip">
        {{ user?.city_name }}, {{ user?.city_citizens_amount }} жителей
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { defineProps, onMounted, ref } from 'vue'
import { useUsersStore } from '../stores/users'

const userElement = ref(null),
    elementIsHovered = ref(false)

const { item } = defineProps({
    item: {
        name: String,
        city_id: Number,
        groups: Array,
        id: Number
    }
})

const userStore = useUsersStore(),
    { getUser, closeUser } = userStore,
    { user } = storeToRefs(userStore)

onMounted(() => {
    const element = userElement.value

    element.addEventListener('mouseenter', () => {
        elementIsHovered.value = true
        getUser(item.id)
    })

    element.addEventListener('mouseleave', () => {
        elementIsHovered.value = false
        closeUser()
    })
})
</script>

<style scoped>
.user {
    display: flex;
    align-items: center;

    padding: 0 0.5rem;
}

.user__icon {
    margin-right: 0.5rem;
}

.tooltip {
    position: absolute;
    left: 100px;
    width: 230px;
    background-color: var(--vt-c-white-mute);
    z-index: 10;
    padding: 0 0.75em;
    border-radius: 0.75em;
}
</style>
