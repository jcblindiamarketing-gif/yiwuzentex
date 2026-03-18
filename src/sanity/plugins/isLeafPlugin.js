export function isLeafPlugin() {
    return {
        name: 'is-leaf-updater',
        document: {
            async beforePublish({ patch, document, getClient }) {
                const client = getClient({ apiVersion: '2025-04-08' })

                const childCount = await client.fetch(
                    `count(*[_type == "productCategory" && parent._ref == $id])`,
                    { id: document._id }
                )

                const isLeaf = childCount === 0

                patch.set({ isLeaf })
            }
        }
    }
}
