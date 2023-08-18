import { GetServerSidePropsContext, NextPage, NextPageContext } from "next";
import Router from "next/router";
import {
  CookieValueTypes,
  deleteCookie,
  getCookie,
  setCookie,
} from "cookies-next";

export const roles = {
  admin: {
    path: "/admin",
  },
  cliente: {
    path: "/cliente",
  },
  auxiliar: {
    path: "/auxiliar",
  },
};

interface IRole {
  path: string;
}

export interface IRoles {
  admin: IRole;
  cliente: IRole;
  auxiliar: IRole;
}

interface HOCProps {
  loggedOnly?: boolean;
  roleOnly?: "admin" | "cliente" | "auxiliar" | "root";
}

export interface PropsWithToken {
  token: CookieValueTypes | null;
}

export const getToken = (
  context?: GetServerSidePropsContext
): PropsWithToken["token"] => getCookie("token", context) || null;

export const auth = (
  ctx?: GetServerSidePropsContext
): PropsWithToken | undefined => {
  const token: PropsWithToken["token"] = getToken(ctx);

  if (ctx && ctx.req && !token) {
    ctx.res?.writeHead(302, { Location: "/auth/signin" });
    ctx.res.end();
    return;
  }

  if (typeof window !== "undefined" && !token) {
    Router.push("/auth/signin");
    return;
  }

  return { token };
};

export const login = (token: string) => {
  setCookie("token", token);
  return Router.push("/dashboard");
};

function redirect(
  ctx: GetServerSidePropsContext | undefined,
  options?: { path?: string }
) {
  const path = options?.path ?? "/auth/signin";
  if (ctx?.res) {
    // SSR
    ctx?.res.writeHead(302, { Location: path });
    ctx?.res.end();
  } else {
    // Client side
    Router.push(path);
  }
}

export function withAuthSync<P extends HOCProps & PropsWithToken>(
  WrappedComponent: React.ComponentType<P> & NextPage<P>,
  { loggedOnly = false, roleOnly = "admin" }: HOCProps
) {
  const withAuthSession = (props: P & HOCProps): JSX.Element => {
    return <WrappedComponent {...props} />;
  };
  withAuthSession.getInitialProps = async (
    ctx: NextPageContext & GetServerSidePropsContext
  ) => {
    let token = getToken(ctx);

    if (loggedOnly && !token) redirect(ctx);
    let componentProps = {};
    if (WrappedComponent.getInitialProps) {
      componentProps = await WrappedComponent.getInitialProps(ctx);
    }
    return { token, ...componentProps };
  };

  return withAuthSession;
}

export const logout = () => {
  deleteCookie("token");
  // To trigger the event listener we save some random data into the `logout` key
  Router.push("/auth/signin");
};
