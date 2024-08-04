import { useRouter } from "next/navigation";
import {Image} from "@nextui-org/image";
import { useContext } from "react";
import { ContextJsx } from "@/context/context";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react"
import { apiController } from "@/controllers/ApiController";

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

export default function MyRent({id, img, title, price, city, userId, name, created_at}: userData) {
  const {setEdit} = useContext(ContextJsx)
    const {setInfo} = useContext(ContextJsx)

    const router = useRouter();
  
    function goinfo () {
  
      setInfo({id, img, title, price, city, userId, name, created_at})  //setando dados para usar na info page
  
      router.push(`/info/${id}`)
    }

    function goEdit () {

      setEdit({id, img, title, price, city, userId, name, created_at}) 

      router.push(`/edit/${id}`)

    }

    async function rentDelete() {

      try {

        const res: any = await apiController.deleteRent(id)
        console.log(res.data)
        window.location.reload()  
      } catch (error) {
        console.log(error);
      }
    }
  
    return (
      <main className="cont-posts dark:bg-dark-bg" onClick={goinfo}>
       <Image
      isZoomed
      width={300}
        alt="NextUI hero Image"
        src={img}/>
        <div className="posts flex justify-center items-center">
          <div className="cont-title ">
            <h1>{title}</h1>
          </div>
          <div className="cont-info">
            <h1>
            R$ {price}
            </h1>
         
            </div>
        </div>
        <div className="flex justify-center items-center cont-sett">
        <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
        >
          <div className='text-2xl flex'>
          <ion-icon name="settings-outline"></ion-icon>
          </div>
        
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="edit" onClick={goEdit}><ion-icon name="create-outline"></ion-icon> Editar</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger" onClick={rentDelete}>
        <ion-icon name="trash-outline"></ion-icon> Excluir 
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
        </div>
      </main>
    );
  }