import Layout from "@/components/Layout";
import fetcher, { api } from "@/libs/fetcher";
import { IProduct } from "@/types/product";
import { NextRouter, withRouter } from "next/router";
import useSWR from "swr";
import { useCart } from "@/context/cart.context";
import styles from "@/styles/Product.module.scss";

interface Props {
  router: NextRouter;
}

function ProductPage({ router }: Props) {
  const { data: product, isLoading } = useSWR<IProduct>(
    router.query.product ? `${api}/products/${router.query.product}` : null
  );

  const { addItemToCart } = useCart();

  const onAddItemToCart = () =>
    product && addItemToCart({ quantity: 1, ...product });

  return (
    <Layout>
      <main className={styles.container}>
        <h1>{product?.name}</h1>
        <p>Cantidad: {product?.amount}</p>
        <p>Precio: $ {product?.price}</p>
        <button
          onClick={onAddItemToCart}
          disabled={product && product?.amount < 1}
        >
          Añadir al carrito
        </button>
      </main>
    </Layout>
  );
}

export default withRouter(ProductPage);
