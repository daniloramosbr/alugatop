import Header from "@/components/Header";
import { Divider } from "@nextui-org/react";
import MyRent from "@/components/MyRent";
import Loading from "@/components/loading";
import { apiController } from "@/controllers/ApiController";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function Mypost() {
  const userToken: any = Cookies.get("user"); //funcionando logado
  const decode: any = userToken ? jwtDecode(userToken) : false;

  const [data, setData] = useState<any>({});

  useEffect(() => {
    async function getRents() {
      try {
        const res: any = await apiController.myRent(decode.id);
        setData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getRents();
  }, []);

  return (
    <div>
      <Header />
      <Divider orientation="horizontal" />
      <h1 className="text-center text-4xl mt-10">Meus anúncios:</h1>

      <div className="cont-ad">
  {data.length >= 1 ? (
    data.map((res: any) => (
      <MyRent
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
    <p>{data.length == 0 ? 'Você ainda não tem anúncios.' : 'Carregando...'}</p>
  )}
</div>

    </div>
  );
}
