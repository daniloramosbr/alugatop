import Header from "@/components/Header";
import { Divider } from "@nextui-org/react";
import Posts from "@/components/Posts";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { apiController } from "@/controllers/ApiController";
import Loading from "@/components/loading";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ion-icon": any;
    }
  }
}

export default function Home() {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    async function getRents() {
      try {
        const res: any = await apiController.getAll();
        setData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getRents();
  }, []);

  console.log(data)
  return (
    <main className="cont-home">
      <Header />
      <Divider orientation="horizontal" />
      <h1>
        testeeeeeeeeeeeeeeeee
      </h1>
      <Footer />
    </main>
  );
}
