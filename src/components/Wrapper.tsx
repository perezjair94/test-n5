import { ReactNode } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

interface Props {
  children?: ReactNode;
  title?: string;
  description?: string;
}

export default function Wrapper(props: Props) {
  const { children, ...custonMeta } = props;
  const router = useRouter();
  const meta = {
    title: "Test N5",
    description: `Test e-commerce web`,
    image: "#",
    type: "website",
    url: "https://test-n5.vercel.app",
    ...custonMeta,
  };
  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`${meta.url}${router.asPath}`} />
        <link rel="canonical" href={`${meta.url}${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Tickets" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
      </Head>
      {children}
    </div>
  );
}
