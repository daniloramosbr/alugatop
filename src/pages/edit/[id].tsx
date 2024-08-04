import {Button,Input, } from "@nextui-org/react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import Header from "@/components/Header"
import { Divider } from "@nextui-org/react"
import Footer from "@/components/Footer";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { apiController } from "@/controllers/ApiController";
import { useRouter } from "next/router"
import { states } from "@/components/states";
import { images } from "@/components/images";
import { ContextJsx } from "@/context/context";
import { Image } from "@nextui-org/react";

interface RentData {
  //tipando elementos
  titulo: string;
  price: number;
  name: string;
  userId: string;
}

export default function Post() {


  const {edit} = useContext(ContextJsx)

  const router = useRouter();

  const userToken: any = Cookies.get('user');     //funcionando logado
    const decode: any = userToken ? jwtDecode(userToken) : false

    console.log()

  const [dataForm, setDataForm] = useState<RentData>({
    //info dos input
    name: decode.name,
    userId: decode.id,
    titulo: "",
    price: 0,
  });

  const HandleChange = (event: any) => {
    //funçao que envia pro determinado state
    setDataForm((dataForm) => ({
      ...dataForm,
      [event.target.name]: event.target.value,
    }));
  };

  const [selectedState, setSelectedState] = useState('Pará');

  const handleSelectionState = (value: any) => {
    // Atualiza o estado com o valor selecionado
    setSelectedState(value);
  }

  const [selectedImage, setSelectedImage] = useState('');

  const handleSelectionChange = (value: any) => {
    // Atualiza o estado com o valor selecionado
    setSelectedImage(value);
  }

  async function EditPost () {

    if (!dataForm.titulo || !dataForm.price) {
      return
    }

    try {

  const {id}: any = router.query 

      const res: any = await apiController.editPost(id, selectedImage, dataForm.titulo, dataForm.price, selectedState)
      router.push('/')

      
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(()=> {

    if (edit) {
      setDataForm({
        name: edit.name,
        userId: edit.userId,
        titulo: edit.title,
        price: edit.price,
      })
      setSelectedState(edit.city)
      setSelectedImage(edit.img)
    }
},[])

  return (
    <main>
      <Header/>
    <Divider orientation="horizontal"/>
    <div className="post">
    <main className="main-post">
    <h1>
   Edite seu anúncio
    </h1>
    <form onChange={HandleChange} >
  <div>
    <label>Título</label>
    <Input variant="bordered" type="text" name="titulo" onChange={HandleChange} value={dataForm.titulo} />
  </div>
  <div>
    <label>Preço</label>
    <Input variant="bordered" type="number" name="price" onChange={HandleChange} value={dataForm.price.toString()} />
  </div>
  <div>
    <label>Estado</label>
    <div>
 <Autocomplete 
        label="Selecione uma estado" 
         variant="bordered"
         onSelectionChange={handleSelectionState}
      >
        {states.map((image) => (
          <AutocompleteItem key={image.value} value={image.value}>
            {image.label}
          </AutocompleteItem>
        ))}
      </Autocomplete>
 </div>
  </div>
  <div>
    <label>Fotos</label>
 <div className="flex mb-5">
 <Autocomplete 
        label="Selecione uma imagem" 
         variant="bordered"
         onSelectionChange={handleSelectionChange}
      >
        {images.map((image) => (
          <AutocompleteItem key={image.value} value={image.value}>
            {image.label}
          </AutocompleteItem>
        ))}
      </Autocomplete>
 </div>
{selectedImage && <Image width={100} src={selectedImage} alt="rent-img" />}

  </div>
    </form>
    <div className="flex justify-between">
    <Link href='/'>
    <Button variant="ghost">Voltar</Button></Link>
    <Button className="bg-[#F28000] text-white" onClick={EditPost}>Editar Anúncio</Button>
    </div>
    </main>
    </div>
    <Footer/>
    </main>
  )
}
