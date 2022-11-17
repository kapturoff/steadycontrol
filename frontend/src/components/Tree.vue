<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTreeStore } from '../stores/tree'
import TreeItem from './TreeItem.vue'

const route = useRoute(),
    treeStore = useTreeStore(),
    { chooseTreeNode } = treeStore,
    { currentItem, items } = storeToRefs(treeStore)

onMounted(() => {
    watch(
        () => route.params.id,
        () => chooseTreeNode(route.params.id)
    )
})
</script>

<template>
    <div class="tree" v-if="currentItem">
        <TreeItem :item="currentItem" class="tree__item" />
    </div>

    <div class="tree" v-else>
        <TreeItem v-for="item in items" :item="item" class="tree__item" />
    </div>
</template>

<style scoped>
.tree {
    width: 100%;
    display: flex;
    justify-content: space-around;
}

.tree__item {
    margin: 0 !important;
}
</style>
