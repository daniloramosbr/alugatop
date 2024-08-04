import { useRouter } from "next/navigation";
import {Image} from "@nextui-org/image";
import { useContext } from "react";
import { ContextJsx } from "@/context/context";

interface userData {
  id: string;
  img : string;
  title: string;
  price: number;
  city: string;
  userId: string;  
  name: string;  
  created_at: string;   
}

export default function Posts({id, img, title, price, city, userId, name, created_at}: userData) {

  const dataFormat = new Date(created_at).toLocaleString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const {setInfo} = useContext(ContextJsx)

  const router = useRouter();

  function goinfo () {

    setInfo({id, img, title, price, city, userId, name, created_at})  //setando dados para usar na info page

    router.push(`/info/${id}`)
  }

  return (
    <main className="cont-posts dark:bg-dark-bg " onClick={goinfo}>
     <Image
    isZoomed
      alt="NextUI hero Image"
      src={img}/>
      <div className="posts">
        <div className="cont-title">
          <h1>{title}</h1>
          <span> {city} | {dataFormat} </span>
        </div>
        <div className="cont-info">
          <h1>
          R$ {price}
          </h1>
        <div>
        <ion-icon  size="large" name="heart-outline"></ion-icon>
        </div>
          </div>
      </div>
      
    </main>
  );
}
