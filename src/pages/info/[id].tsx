import Header from "@/components/Header";
import { Divider } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Footer from "@/components/Footer";
import { useContext } from "react";
import { ContextJsx } from "@/context/context";
import {Image} from "@nextui-org/image";

export default function Info() {

  const {info} = useContext(ContextJsx)

  return (
    <div className="">
      <Header />
      <Divider orientation="horizontal" />
      <main className="cont-main">
        <div className="cont-start px-5">
          <div className="img-title">
            <Image
              src={info.img}
              alt="rent-img"
            />
            <h1>{info.title}</h1>
            <div className="location"><ion-icon name="location-outline"></ion-icon>{info.city}</div>
            <div className="details">
            <h1>
            Detalhes
            </h1>
            <div>
            Características do imóvel
            </div>
            <div>
            <Button>Academia</Button>  <Button>Armários na cozinha</Button>  <Button>Ar condicionado</Button> <Button> Armários no quarto </Button>
            </div>
        </div>
          </div>

          <div className="price-profile">
          
            <div className="cont-p">
            <h1>R$ {info.price}</h1>
              <p>Criador: {info.name}</p>
              <div>
                <ion-icon name="checkmark-outline"></ion-icon> Informações
                verificadas
              </div>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
