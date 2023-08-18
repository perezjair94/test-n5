import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { api } from "@/libs/fetcher";
import { ICartItem } from "@/context/cart.context";
import { IProduct } from "@/types/product";
import { productList, updateProduct } from "@/services/product.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body || [];
    const products = await productList();

    if (products.length) {
      const filteredProducts = data.map((item: ICartItem) => {
        const product = products.find(
          (product: IProduct) => product.id === item.id
        );
        product.amount -= item.quantity;
        return product ? { ...product, quantity: item.quantity } : null;
      });
      updateProduct(filteredProducts)
        .then((updatedProducts) => {
          res.json({
            message: "Save prodcut successfully",
            data: updatedProducts,
            success: true,
          });
        })
        .catch((error) => {
          res.json({
            message: "Error updating products",
            error,
            success: false,
          });
        });
    }
  } else {
    res.status(405).end();
  }
}
