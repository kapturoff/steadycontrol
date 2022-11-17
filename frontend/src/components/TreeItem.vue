<template>
    <li v-if="item.children" class="tree-item">
        <img
            class="tree-item__dropdown__icon"
            src="../assets/caret-right-fill.svg"
            @click="changeChildrenVisible"
            v-if="toggled" />
        <img
            class="tree-item__dropdown__icon"
            src="../assets/caret-down-fill.svg"
            @click="changeChildrenVisible"
            v-else />

        <span>{{ item.name }}</span>

        <ul v-if="item.children && toggled">
            <TreeItem v-for="child in item.children" :item="child" />
        </ul>
    </li>

    <UserProfile :item="item" v-else />
</template>

<script setup>
import { defineProps, ref } from 'vue'
import UserProfile from './UserProfile.vue'

const toggled = ref(true)

function changeChildrenVisible() {
    toggled.value = !toggled.value
}

defineProps({
    item: { name: String, children: Array }
})
</script>

<style scoped>
.tree-item {
    display: d-flex;
    align-items: center;
}

.tree-item__dropdown__icon {
    cursor: pointer;
    margin-right: 0.25em;
}
</style>
