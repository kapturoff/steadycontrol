import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTreeStore = defineStore('tree', () => {
    const items = ref([]),
        currentItem = ref()

    /**
     * Запрашивает у API информацию о древе и сохраняет ее в сторе
     */
    function getTree() {
        fetch('/api/tree')
            .then((response) => response.json())
            .then((data) => {
                for (const item of data) {
                    items.value.push(item)
                }
            })
    }

    function chooseTreeNode(index) {
        currentItem.value = items.value[index]
    }

    return { items, currentItem, getTree, chooseTreeNode }
})
