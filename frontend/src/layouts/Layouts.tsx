import { Footer } from "./Footer";
import { Hero } from "./Hero";
import SearchBar from "./SearchBar";
import { Header } from "./Header";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto">
        <SearchBar />
      </div>
      <div className="container mx-auto py-5 flex-1">{children}</div>
      <Footer />
    </div>
  );
};
