import { getCategoryTree } from "@/lib/getCategoryTree";
import NavBar from "@/components/Navbar/Navbar";

export default async function NavWrapper() {
  const categoryTree = await getCategoryTree();

  console.log("categoryTree", categoryTree);

  return <NavBar categories={categoryTree} />;
}
