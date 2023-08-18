import { useCart } from "@/context/cart.context";
import { Icon } from "./Icon";
import ToggleThemeButton from "./ToggleThemeButton";
import styles from "@/styles/Header.module.scss";
import Link from "next/link";

export default function Header() {
  const { cartItems } = useCart();
  const cartItemsLength = cartItems.length || null;
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.content}>
          <Link href="/">
            <h2>Test N5</h2>
          </Link>
          <div className={styles.nav}>
            <Link href="/cart">
              <div className={styles.navCart}>
                {!!cartItems.length && <span>{cartItemsLength}</span>}
                <Icon name="ShoppingCart" size={20} />
              </div>
            </Link>
            <ToggleThemeButton />
          </div>
        </div>
      </div>
    </header>
  );
}
