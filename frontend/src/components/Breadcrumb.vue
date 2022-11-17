<template>
    <div class="breadcrumb">
        <span
            class="breadcrumb__item"
            v-for="(item, index) in items"
            @click="linkPressed(index)">
            {{ item.name }}
        </span>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineProps({
    items: Array
})

const router = useRouter()

function linkPressed(index) {
    router.push('/' + index)
}
</script>

<style scoped>
.breadcrumb {
    width: 100%;
    padding: 1.25em;
    border-bottom: 1px solid var(--vt-c-divider-light-1);
    margin-bottom: 1.25em;
    text-align: center;
}

.breadcrumb__item {
    cursor: pointer;
    padding: 0 0.25em;
    transition: 0.25s;
}

.breadcrumb__item:hover {
    background-color: var(--vt-c-white-mute);
    border-radius: 5px;
}

.breadcrumb > *:not(:last-child)::after {
    content: ' /';
    font-weight: 500;
}
</style>
