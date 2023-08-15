import { IProduct } from "@/types/product";
import styles from "@/styles/Home.module.scss";
import Link from "next/link";
import { Icon } from "./Icon";
import { useCart } from "@/context/cart.context";

export default function ProductCardHome(product: IProduct) {
  const { addItemToCart } = useCart();
  const onAddItemtoCart = () => addItemToCart({ quantity: 1, ...product });
  return (
    <div className={styles.card}>
      <Link href={`/products/${product.id}`}>
        <h3>{product.name}</h3>
      </Link>
      <p>$ {product.price}</p>
      <button onClick={onAddItemtoCart}>
        <Icon name="ShoppingCart" />
        <span>Agregar al carrito</span>
      </button>
    </div>
  );
}
