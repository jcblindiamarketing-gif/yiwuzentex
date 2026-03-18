
async function updateIsLeafForCategories() {
    try {
        // Step 1: Fetch all categories
        const allCategories = await client.fetch(`
        *[_type == "productCategory"]{
          _id,
          title
        }
      `);

        if (!allCategories.length) {
            console.log("No categories found.");
            return;
        }

        // Step 2: Fetch all parent references
        const childCategoryRefs = await client.fetch(`
        *[_type == "productCategory" && defined(parent._ref)]{
          parent->{_id}
        }
      `);

        const parentIds = new Set(childCategoryRefs.map((item) => item.parent?._id));

        // Step 3: Loop through all categories and update `isLeaf`
        for (const category of allCategories) {
            const isLeaf = !parentIds.has(category._id);

            await client
                .patch(category._id)
                .set({ isLeaf })
                .commit();

            console.log(`✅ Updated ${category.title}: isLeaf = ${isLeaf}`);
        }

        console.log("🎉 Finished updating all categories.");
    } catch (error) {
        console.error("❌ Error updating isLeaf fields:", error);
    }
}