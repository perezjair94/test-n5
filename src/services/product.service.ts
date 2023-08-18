import { api } from "@/libs/fetcher";

interface IPayload {
  id: number;
  amount: number;
}

export const productList = async () => {
  try {
    const response = await fetch(`${api}/products`);
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const updateProduct = async (data: IPayload[]) => {
  try {
    const updatePromises = data.map(async (item) => {
      const response = await fetch(`${api}/products/${item.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      const updatedProduct = await response.json();
      return updatedProduct;
    });

    const updatedProducts = await Promise.all(updatePromises);
    return updatedProducts;
  } catch (error) {
    return error;
  }
};
