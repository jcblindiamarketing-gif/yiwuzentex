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
const categories = await client.fetch(query, {}, {
  cache: "no-store",
});
  const categoryMap = new Map();
  const roots = [];

  const cleanSlug = (slug) => slug?.replace(/-\d+$/, "");

  categories.forEach((cat) => {
    categoryMap.set(cat._id, {
      ...cat,
      sublinks: [],
      newTab: false,
    });
  });

  categories.forEach((cat) => {
    const node = categoryMap.get(cat._id);

    if (cat.parent) {
      const parent = categoryMap.get(cat.parent);
      if (parent) {
        parent.sublinks.push(node);
      }
    } else {
      roots.push(node);
    }
  });

  const buildFullSlug = (node, parentPath = "/product-segment") => {
    const isExternal = node.slug?.startsWith("http");

    if (isExternal) {
      node.fullSlug = node.slug;
      node.newTab = true;
    } else {
      node.fullSlug = `${parentPath}/${cleanSlug(node.slug)}`;
    }

    node.sublinks.forEach((child) =>
      buildFullSlug(child, node.fullSlug)
    );
  };

  roots.forEach((root) => buildFullSlug(root));

  return roots;
}
