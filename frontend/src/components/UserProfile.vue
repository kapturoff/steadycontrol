<template>
    <a class="user" ref="a">
        <img class="user__icon" src="../assets/person-fill.svg" />
        {{ item.name }}
    </a>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
    item: {
        name: String,
        city_id: Number,
        groups: Array,
        id: Number
    }
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
</style>
