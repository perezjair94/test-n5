import { login } from "@/libs/auth";
import { sendRequest } from "@/libs/fetcher";
import { FormData, ResponseData } from "@/types/login";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import styles from "@/styles/Login.module.scss";

export default function LoginPage() {
  const [message, setMessage] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<FormData>({});
  const { trigger, isMutating } = useSWRMutation<
    ResponseData,
    null,
    string,
    FormData
  >("/api/auth", (url, { arg }) =>
    sendRequest({
      url,
      method: "POST",
      body: arg,
    })
  );

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const response = await trigger(data);
    if (!response?.success) {
      setMessage("Correo o contraseña incorrecta");
      setTimeout(() => {
        setMessage(null);
      }, 2000);
      return;
    }
    return login(response?.token);
  };

  return (
    <div className={styles.container}>
      <div>
        <h2>Iniciar sesion</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="email"
              placeholder="Correo electronico"
              {...register("email", { required: true })}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              {...register("password", { required: true })}
              required
            />
          </div>
          <button>Iniciar sesión</button>
          <p>{message}</p>
        </form>
      </div>
    </div>
  );
}
