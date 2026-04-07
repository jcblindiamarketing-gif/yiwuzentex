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

  // 🔧 helper to clean slug (-2 issue)
  const cleanSlug = (slug) => slug?.replace(/-\d+$/, "");

  // Step 1: prepare nodes
  categories.forEach((cat) => {
    categoryMap.set(cat._id, {
      ...cat,
      sublinks: [],
      fullSlug: "",
      newTab: false,
    });
  });

  const roots = [];

  // Step 2: build tree
  categories.forEach((cat) => {
  const node = categoryMap.get(cat._id);

  const isExternal = cat.slug?.startsWith("http");

  // ✅ handle external slug
  if (isExternal) {
    node.fullSlug = cat.slug;
    node.newTab = true;
  }

  if (cat.parent) {
    const parent = categoryMap.get(cat.parent);

    if (parent) {
      parent.sublinks.push(node);

      // ✅ ONLY build slug if NOT external
      if (!isExternal) {
        node.fullSlug = parent.fullSlug
          ? `${parent.fullSlug}/${cleanSlug(cat.slug)}`
          : `/product-segment/${cleanSlug(cat.slug)}`;
      }
    }
  } else {
    if (!isExternal) {
      node.fullSlug = `/product-segment/${cleanSlug(cat.slug)}`;
    }
    roots.push(node);
  }
});

  return roots;
}

