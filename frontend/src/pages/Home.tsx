import DestinationHome from "../components/molecules/home/destination";
import HotelsHome from "../components/molecules/home/hotels";
import OfferHome from "../components/molecules/home/offer";
import { Layout } from "../layouts/Layouts";

function Home() {
  return (
    <Layout>
      <OfferHome />
      <DestinationHome />
      <HotelsHome />
    </Layout>
  );
}

export default Home;
