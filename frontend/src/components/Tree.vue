<script setup>
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTreeStore } from '../stores/tree'
import TreeItem from './TreeItem.vue'

const route = useRoute(),
    treeStore = useTreeStore(),
    { chooseTreeNode } = treeStore,
    { currentItem } = storeToRefs(treeStore)

watch(
    () => route.params.id,
    () => chooseTreeNode(route.params.id)
)
</script>

<template>
    <div class="tree" v-if="currentItem">
        <TreeItem :item="currentItem" class="tree__item" />
    </div>
</template>

<style scoped>
.tree__item {
    margin: 0 !important;
}
</style>
