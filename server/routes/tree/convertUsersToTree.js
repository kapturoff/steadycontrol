/**
 * @typedef User
 * @property { number } id
 * @property { string } name
 * @property { number } city_id
 * @property { Group[] } groups
 */

/**
 * @typedef Group
 * @property { string } type
 * @property { string } name
 */

/**
 * @typedef TreeItem
 * @property { string } name
 * @property { TreeItem[] | User[] } children
 */

/**
 * Проходит вниз по списку групп каждого пользователя, устанавливая его местоположение в дереве.
 *
 * @param { User[] } users Список пользователей для составления древа
 * @returns { TreeItem[] } Дерево, описывающее иерархию жителей, основываясь на их местоположении
 */
function convertUsersToTree(users) {
    const tail = []
    let intermediate = tail

    for (const user of users) {
        for (const group of user.groups) {
            let existingNode = intermediate.find(
                (node) => node.name === group.name
            )

            if (!existingNode) {
                const newNode = {
                    name: group.name,
                    children: []
                }

                intermediate.push(newNode)
                existingNode = newNode
            }

            intermediate = existingNode.children
        }

        intermediate.push(user)
        intermediate = tail
    }

    return tail
}

module.exports = convertUsersToTree
