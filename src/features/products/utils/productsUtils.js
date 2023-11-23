import { getProducts } from "../api/getProducts";

export async function totalProducts() {
  const products = await getProducts();

  return products.length;
}
