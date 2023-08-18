import { createContext, useContext, useState, useEffect } from "react";
import { api, sendRequest } from "@/libs/fetcher";
import wompi from "@/libs/wompi";
import useSWRMutation from "swr/mutation";
import { IProduct } from "@/types/product";
import { getCookie, setCookie } from "cookies-next";
// import { FormValues, ResponseData } from "@/types/purchase";

export interface ICartItem extends IProduct {
  quantity: number;
}

interface CartContextValue {
  cartItems: ICartItem[];
  totalPrice: number;
  addItemToCart: (item: ICartItem) => void;
  lessItemToCart: (id: number) => void;
  removeItemFromCart: (id: number) => void;
  getTotalPrice: () => number;
  onBuyItems: () => void;
  cleanCart: () => void;
}

const CartContext = createContext<CartContextValue>({
  cartItems: [],
  totalPrice: 0,
  addItemToCart: () => {},
  lessItemToCart: () => {},
  removeItemFromCart: () => {},
  getTotalPrice: () => 0,
  onBuyItems: () => {},
  cleanCart: () => {},
});

export const useCart = () => useContext(CartContext);

interface Props {
  children: React.ReactNode;
}

const CartProvider: React.FC<Props> = ({ children }) => {
  const cookie = getCookie("cart");

  const initialData = typeof cookie === "string" ? JSON.parse(cookie) : [];

  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const { trigger } = useSWRMutation<{ success: boolean }, null, string, {}>(
    "/api/purchase",
    (url, { arg }) =>
      sendRequest({
        url,
        method: "POST",
        body: arg,
      })
  );

  useEffect(() => {
    setCartItems(initialData);
  }, []);

  const onBuyItems = async () => {
    const data = cartItems.map(({ id, quantity }) => ({
      id,
      quantity,
    }));
    const response = await trigger(data);

    if (response?.success) {
      return setCartItems([]);
    }
  };
  const addItemToCart = (item: ICartItem) => {
    const data = [...cartItems];
    let itemIndex = data.findIndex((elem) => item.id === elem.id);
    if (itemIndex !== -1) {
      data[itemIndex].quantity += item.quantity;
    } else {
      data.push(item);
    }
    setCartItems(data);
    setCookie("cart", JSON.stringify(data));
  };

  const lessItemToCart = (id: number) => {
    const data = [...cartItems];
    let itemIndex = data.findIndex((elem) => elem.id === id);
    if (itemIndex !== -1) {
      data[itemIndex].quantity -= 1;
      setCartItems(data);
      setCookie("cart", JSON.stringify(data));
    }
  };

  const removeItemFromCart = (id: number) => {
    const index = cartItems.findIndex((cartItem) => cartItem.id === id);
    if (index !== -1) {
      const newCartItems = [...cartItems];
      newCartItems.splice(index, 1);
      setCartItems(newCartItems);
      setCookie("cart", JSON.stringify(newCartItems));
    }
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      const total = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      if (total > 0) setTotalPrice(total);
    }
  }, [cartItems]);

  const getTotalPrice = (): number =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const cleanCart = () => {
    setCartItems([]);
    setCookie("cart", JSON.stringify([]));
  };

  const contextValue: CartContextValue = {
    cartItems,
    totalPrice,
    addItemToCart,
    lessItemToCart,
    removeItemFromCart,
    getTotalPrice,
    onBuyItems,
    cleanCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
