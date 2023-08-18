import { logout, withAuthSync } from "@/libs/auth";
import { api, sendRequest } from "@/libs/fetcher";
import { IProduct, FormData } from "@/types/product";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "@/styles/Dashboard.module.scss";

import useSWRMutation from "swr/mutation";
import { Icon } from "@/components/Icon";

function DashboardPage() {
  const [message, setMessage] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<FormData>({});
  const { trigger, isMutating } = useSWRMutation<
    IProduct,
    null,
    string,
    FormData
  >(`${api}/products`, (url, { arg }) =>
    sendRequest({
      url,
      method: "POST",
      body: arg,
    })
  );

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const response = await trigger(data);
    setMessage(
      !response?.id
        ? "Verfica bien los campos"
        : "Producto guardado correctamente"
    );
    setTimeout(() => {
      setMessage(null);
      reset();
    }, 2000);

    return;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Dashboard</h3>
        <button onClick={logout}>
          <Icon name="LogOut" />
          <span>Cerrar sesión</span>
        </button>
      </div>
      <div className={styles.main}>
        <h2>Nuevo producto</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              placeholder="Nombre del producto"
              {...register("name", { required: true })}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Precio"
              {...register("price", { required: true })}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Cantidad"
              {...register("amount", { required: true })}
              required
            />
          </div>
          <div>
            <button>Guardar</button>
            <p>{message}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withAuthSync(DashboardPage, { loggedOnly: true });
