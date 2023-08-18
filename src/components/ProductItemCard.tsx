import { ICartItem, useCart } from "@/context/cart.context";
import styles from "@/styles/Cart.module.scss";
import Link from "next/link";
import { Icon } from "./Icon";

export default function ProductItemCard(product: ICartItem) {
  const { lessItemToCart, addItemToCart, removeItemFromCart } = useCart();
  const onAddItemtoCart = () => addItemToCart({ ...product, quantity: 1 });
  const onRemoveItemtoCart = () => lessItemToCart(product.id);
  const onRemoveItemCart = () => removeItemFromCart(product.id);
  const disabeRemoveButton = product.quantity < 2;
  return (
    <div className={styles.card}>
      <div>
        <Link href={`/products/${product.id}`}>
          <h2>{product.name}</h2>
        </Link>
        <p>
          <b>Subtotal:</b> $ {product.price * product.quantity}
        </p>
      </div>
      <div className={styles.cardButtons}>
        <div>
          <button onClick={onRemoveItemtoCart} disabled={disabeRemoveButton}>
            -
          </button>
          <span>{product.quantity}</span>
          <button onClick={onAddItemtoCart}>+</button>
        </div>
        <button className={styles.cardButtonDelete} onClick={onRemoveItemCart}>
          <Icon name="Trash" size={20} />
        </button>
      </div>
    </div>
  );
}
