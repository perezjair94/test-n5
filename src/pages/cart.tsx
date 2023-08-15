import { Icon } from "@/components/Icon";
import Layout from "@/components/Layout";
import ProductItemCard from "@/components/ProductItemCard";
import { useCart } from "@/context/cart.context";
import styles from "@/styles/Cart.module.scss";

export default function CartPage() {
  const { cartItems, totalPrice, onBuyItems } = useCart();
  return (
    <Layout>
      <main className={styles.container}>
        <div className={styles.grid}>
          <div>
            <h2>Carrito de compras</h2>
            {!!cartItems.length ? (
              cartItems.map((product) => (
                <ProductItemCard key={product.id} {...product} />
              ))
            ) : (
              <div>
                <Icon name="HardDrive" size={20} />
                <span>Sin datos</span>
              </div>
            )}
          </div>
          {!!cartItems.length && (
            <div>
              <h2>Resumen</h2>
              <div>
                <h3>Total $ {totalPrice}</h3>
                <button onClick={onBuyItems}>Finalizar compra</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
