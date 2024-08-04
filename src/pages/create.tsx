import {Modal,ModalContent,ModalHeader,ModalBody,ModalFooter,Button,useDisclosure,Spinner,Input, } from "@nextui-org/react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import Header from "@/components/Header"
import { Divider } from "@nextui-org/react"
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { apiController } from "@/controllers/ApiController";
import { useRouter } from "next/navigation"
import { states } from "@/components/states";
import { images } from "@/components/images";
import { Image } from "@nextui-org/react";

interface RentData {
  //tipando elementos
  titulo: string;
  price: number;
  name: string;
  userId: string;
}

export default function Post() {

  const router = useRouter();

  const [erro, setErro] = useState(false)

  const userToken: any = Cookies.get('user');     //funcionando logado
    const decode: any = userToken ? jwtDecode(userToken) : false

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

  const [selectedState, setSelectedState] = useState('');

  const handleSelectionState = (value: any) => {
    // Atualiza o estado com o valor selecionado
    setSelectedState(value);
  }

  const [selectedImage, setSelectedImage] = useState('');

  const handleSelectionChange = (value: any) => {
    // Atualiza o estado com o valor selecionado
    setSelectedImage(value);
  }

  async function CreatePost () {

    if (!dataForm.titulo || !dataForm.price || !setSelectedImage || !selectedState ) {
      setErro(true)
      setTimeout(()=> {
        setErro(false)
      },3000)
      return
    }

    try {

      const res: any = await apiController.createPost(decode.name, decode.id, selectedImage, dataForm.titulo, dataForm.price, selectedState)
      console.log(res.data)
      router.push('/')

      
    } catch (error) {
      console.log(error)
    }

  }
  console.log
  return (
    <main>
      <Header/>
    <Divider orientation="horizontal"/>
    <div className="post">
    <main className="main-post">
    <h1>
    Agora, compartilhe algumas informações sobre seu imóvel
    </h1>
    <form onChange={HandleChange} >
  <div>
    <label>Título</label>
    <Input variant="bordered" type="text" name="titulo" onChange={HandleChange}/>
  </div>
  <div>
    <label>Preço</label>
    <Input variant="bordered" type="number"  name="price" onChange={HandleChange}/>
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
    {erro && <div className="text-white  text-center bg-red-600">Preencha todos os campos!</div> }
    <div className="flex justify-between">
    <Link href='/'>
    <Button variant="ghost">Voltar</Button></Link>
    <Button className="bg-[#F28000] text-white" onClick={CreatePost}>Enviar Anúncio</Button>
    </div>
    </main>
    </div>
    <Footer/>
    </main>
  )
}
