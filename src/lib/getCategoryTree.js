import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client"; // Your sanity client

const query = groq`
  *[
    _type == "productCategory" &&
    (isActive == true || !defined(isActive))
  ]{
    _id,
    title,
    "slug": slug.current,
    "parent": parent->_id,
    isActive
  }
`;


// export async function getCategoryTree() {
//     const categories = await client.fetch(query);

//     const categoryMap = new Map();
//     const roots = [];

//     // Map categories
//     categories.forEach(cat => {
//         categoryMap.set(cat._id, { ...cat, sublinks: [] });
//     });

//     // Build tree
//     categories.forEach(cat => {
//         if (cat.parent) {
//             const parent = categoryMap.get(cat.parent);
//             if (parent) parent.sublinks.push(categoryMap.get(cat._id));
//         } else {
//             roots.push(categoryMap.get(cat._id));
//         }
//     });

//     return roots;
// }

export async function getCategoryTree() {
    const categories = await client.fetch(query);

    const categoryMap = new Map();

    // First, map categories with empty sublinks and a placeholder for fullSlug
    categories.forEach(cat => {
        categoryMap.set(cat._id, { ...cat, sublinks: [], fullSlug: "" });
    });

    const roots = [];

    // Build tree and fullSlug paths
    categories.forEach(cat => {
        const node = categoryMap.get(cat._id);

        if (cat.parent) {
            const parent = categoryMap.get(cat.parent);
            if (parent) {
                // Push current node as sublink of parent
                parent.sublinks.push(node);

                // Construct fullSlug by appending current slug to parent's fullSlug
                node.fullSlug = parent.fullSlug
                    ? `${parent.fullSlug}/${cat.slug}`
                    : `/product-segment/${cat.slug}`;
            }
        } else {
            // Root node: fullSlug starts with 'product-segment'
            node.fullSlug = `/product-segment/${cat.slug}`;
            roots.push(node);
        }
    });

    return roots;
}
