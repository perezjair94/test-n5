import { Icon } from "@/components/Icon";
import Layout from "@/components/Layout";
import ProductItemCard from "@/components/ProductItemCard";
import { useCart } from "@/context/cart.context";
import styles from "@/styles/Cart.module.scss";

export default function CartPage() {
  const { cartItems, totalPrice, onBuyItems, cleanCart } = useCart();
  return (
    <Layout>
      <main className={styles.container}>
        <div className={styles.grid}>
          <div>
            <div className={styles.header}>
              <h2>Carrito de compras</h2>
              {!!cartItems.length && (
                <button onClick={cleanCart}>
                  <Icon name="Trash" />
                  <span>Limpiar carrito</span>
                </button>
              )}
            </div>
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
            <div className={styles.main}>
              <h2>Resumen</h2>
              <div>
                <h2>Total $ {totalPrice}</h2>
                <button onClick={onBuyItems}>Finalizar compra</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
