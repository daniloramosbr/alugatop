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

  return (
    <main className="cont-home">
      <Header />
      <Divider orientation="horizontal" />
      <div className="cont-ad px-5">
        {data.length >= 1 ? (
          data.map((res: any) => (
            <Posts
              key={res.id}
              id={res.id}
              img={res.img}
              title={res.title}
              price={res.price}
              city={res.city}
              created_at={res.created_at}
              name={res.name}
              userId={res.userId}
            />
          ))
        ) : (
          <div>
            <Loading />
            <Loading />
            <Loading />
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
