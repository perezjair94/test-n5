import useSWR from "swr";
import Layout from "@/components/Layout";
import fetcher, { api } from "@/libs/fetcher";
import { Icon } from "@/components/Icon";
import { IProduct } from "@/types/product";
import styles from "@/styles/Home.module.scss";
import ProductCardHome from "@/components/ProductCardHome";
import Link from "next/link";

export default function Home() {
  const { data, isLoading } = useSWR<IProduct[]>(`${api}/products`);

  return (
    <Layout>
      <main className={styles.container}>
        <div className={styles.header}>
          <h2>Productos</h2>
          <Link href="/dashboard">Añadir producto</Link>
        </div>
        <div className={styles.grid}>
          {isLoading ? (
            <div>
              <Icon name="Loader2" />
              <span>Por favor espere</span>
            </div>
          ) : data ? (
            data.map((product) => (
              <ProductCardHome key={product.id} {...product} />
            ))
          ) : (
            <div>
              <Icon name="HardDrive" />
              <span>Sin datos</span>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
