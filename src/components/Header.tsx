import { Button } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";
import LoginMod from "./LoginMod";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {useTheme} from "next-themes";

export default function Header() {

  const router = useRouter();
  
  const [isChecked, setIsChecked] = useState((Cookies.get('userTheme') === 'true'))    //inicia com o valor que tem no cookie,se n existir da false

  Cookies.set('userTheme', isChecked === false ? false.toString() : true.toString());    //se isChecked for false, envia false pro cookie, e se for true, true

  const handleCheckboxChange = (e: any) => {                //funçao que muda o valor do checkbox 
    setIsChecked(e.target.checked);
  };

  const [mounted, setMounted] = useState(false)

  const { theme, setTheme } = useTheme()

  const userToken: any = Cookies.get('user');     //funcionando logado

  const decode: any = userToken ? jwtDecode(userToken) : false

  useEffect(() => {

    isChecked === true ? setTheme('dark') : setTheme('light')          //verificaçao se eh false ou true pra mudar o tema

    setMounted(true)

  }, [isChecked, setTheme])

  if(!mounted) return null

 

  function goLogin() {
    if (decode === false) {
      return alert("Por favor, Faça login.");
    }

    router.push("/create");
  }

  function goMyPost() {
    if (decode === false) {
      return alert("Por favor, Faça login.");
    }

    router.push("/mypost");
  }

  return (
    <main className="cont-header ">
      <h1 className="px-5"
        onClick={() => {
          router.push("/");
        }}
      >
        <ion-icon name="home-outline"></ion-icon> ALUGA TOP
      </h1>
      <div className="h-btn px-5">
        <Button variant="ghost" onClick={goMyPost}>
          <ion-icon name="grid-outline"></ion-icon> Meus Anúncios
        </Button>
        <div>
          <LoginMod />
        </div>
        <Button className="bg-[#F28000] text-white" onClick={goLogin}>
          Anúnciar
        </Button>
        <Tooltip content="Mudar tema">
          <input type="checkbox" checked={isChecked}
        onChange={handleCheckboxChange} className="theme-checkbox"></input>
        </Tooltip>
      </div>
    </main>
  );
}
