import { createContext, useContext, useState, useEffect } from "react";
import { api, sendRequest } from "@/libs/fetcher";
import wompi from "@/libs/wompi";
import useSWRMutation from "swr/mutation";
import { IProduct } from "@/types/product";
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
}

const CartContext = createContext<CartContextValue>({
  cartItems: [],
  totalPrice: 0,
  addItemToCart: () => {},
  lessItemToCart: () => {},
  removeItemFromCart: () => {},
  getTotalPrice: () => 0,
  onBuyItems: () => {},
});

export const useCart = () => useContext(CartContext);

interface Props {
  children: React.ReactNode;
}

const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // const { trigger } = useSWRMutation<ResponseData, null, string, FormValues>(
  //   `${api}/purchases`,
  //   (url, { arg }) =>
  //     sendRequest({
  //       url,
  //       method: "POST",
  //       body: arg,
  //     })
  // );

  const onBuyItems = async () => {
    const data = cartItems.map(({ id, quantity }) => ({
      product: id,
      quantity,
    }));
    // const response = await trigger({ data });
    // if (response && response.success)
    //   wompi({ amount: totalPrice, reference: response.data.id });
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
  };

  const lessItemToCart = (id: number) => {
    const data = [...cartItems];
    let itemIndex = data.findIndex((elem) => elem.id === id);
    if (itemIndex !== -1) {
      data[itemIndex].quantity -= 1;
      setCartItems(data);
    }
  };

  const removeItemFromCart = (id: number) => {
    const index = cartItems.findIndex((cartItem) => cartItem.id === id);
    if (index !== -1) {
      const newCartItems = [...cartItems];
      newCartItems.splice(index, 1);
      setCartItems(newCartItems);
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

  const contextValue: CartContextValue = {
    cartItems,
    totalPrice,
    addItemToCart,
    lessItemToCart,
    removeItemFromCart,
    getTotalPrice,
    onBuyItems,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
