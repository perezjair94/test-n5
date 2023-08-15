// import Footer from "./Footer";
import Header from "./Header";
import Wrapper from "./Wrapper";

interface Props {
  title?: string;
  children: React.ReactNode;
}

export default function Layout({ title = "Test N5", children }: Props) {
  return (
    <Wrapper title={title}>
      <Header />
      {children}
      {/* <Footer /> */}
    </Wrapper>
  );
}
