import { client } from "@/sanity/lib/client";

const groqQuery = `
  *[_type == "product" && (
    name match $q || slug.current match $q
  )][0...10]{
    _id,
    name,
    slug,
  "image": image{
        asset->{
          url
        }
      }  
  }
`;


export const getSearchResults = async (query) => {
  const wildcardQuery = `${query}*`; // OR `*${query}*` if partial middle match is needed
  const products = await client.fetch(groqQuery, { q: wildcardQuery });
  return products;
};

