<script setup>
import { storeToRefs } from 'pinia'
import { RouterView } from 'vue-router'
import Breadcrumb from './components/Breadcrumb.vue'
import { useTreeStore } from './stores/tree'

const treeStore = useTreeStore(),
    { items } = storeToRefs(treeStore)

treeStore.getTree()
</script>

<template>
    <Breadcrumb :items="items" />
    <router-view />
</template>
