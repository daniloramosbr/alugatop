
import {Modal,ModalContent,ModalHeader,ModalBody,ModalFooter,Button,useDisclosure,Spinner,Input, } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { apiController } from "@/controllers/ApiController";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useCallback } from "react";
import { jwtDecode } from "jwt-decode";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ion-icon": any;
    }
  }
}

interface UserData {
  //tipando elementos
  name: string;
  email: string;
  password: string;
}

export default function LoginMod() {

  const router = useRouter();

  const [login, setLogin] = useState(false)

  const { isOpen, onOpen, onOpenChange } = useDisclosure(); //modal

  const [error, setError] = useState(false);

  const [msglogin, setMsglogin] = useState(false)

  const [user, setUser] = useState<any>({})

  const [changeLog, setChangeLog] = useState(false); //signin ou signup

  const [loading, setLoading] = useState(false); //loading

  useEffect(()=>{

    const userToken: any = Cookies.get('user');     //funcionando logado
    const decode: any = userToken ? jwtDecode(userToken) : false
setLogin(decode ? false : true)
setUser(decode)

  },[])

  const [dataForm, setDataForm] = useState<UserData>({
    //info dos input
    name: "",
    email: "",
    password: "",
  });

  const HandleChange = (event: any) => {
    //funçao que envia pro determinado state
    setDataForm((dataForm) => ({
      ...dataForm,
      [event.target.name]: event.target.value,
    }));
  };

  const limparDados = () => {
    setDataForm({
      name: "",
      email: "",
      password: "",
    });
  };
  const CreateLogin = useCallback(async () => {

   

    try {
      setLoading(true);
      const res: any = await apiController.createLogin(dataForm.name,dataForm.email,dataForm.password)
      console.log(res)
       Cookies.set('user', res.data.token)                         //salva token no cookie
       limparDados()
       window.location.reload()
       
    } catch (error) {
      console.log(error)
    }
    setLoading(false);
  }, [dataForm.name, dataForm.email, dataForm.password]);
  

  const ValidLogin = async () => {         //valida o login

    if (!dataForm.email || !dataForm.password) {

      setError(true)

      setTimeout(()=> {

        setError(false)

      },3000)

      return
    }

    try {
      setLoading(true);
      const res: any = await apiController.validLogin(dataForm.email,dataForm.password)
      setLogin(false)
      Cookies.set('user', res.data.token)                         //salva token no cookie    
       limparDados()
       window.location.reload()
    } catch (err) {
      setMsglogin(true)
                      
      setTimeout(()=> {

        setMsglogin(false)

      },3000)

    }
    setLoading(false);
  }

  function ExitLogin () {
    Cookies.remove('user')
    window.location.reload()
    router.push('/')
  }

  return (
    <>
    {login ? <Button onPress={onOpen} variant="ghost"><ion-icon name="person-add-outline"></ion-icon> Entrar</Button> : <Button onClick={ExitLogin} variant="ghost"> <ion-icon name="exit-outline"></ion-icon> Sair</Button>  }
   

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader></ModalHeader>
              <ModalBody>
                <div className="cont-login">
                  <h1>{changeLog ? "FAÇA SEU LOGIN" : "CRIE SUA CONTA"}</h1>

                  <form onChange={HandleChange}>
                    {!changeLog && (
                      <span>
                        <ion-icon name="person-outline"></ion-icon>
                        <Input
                          type="name"
                          label="Nome"
                          size="sm"
                          name="name"
                          onChange={HandleChange}
                          value={dataForm.name}
                        />
                      </span>
                    )}
                    <span>
                      <ion-icon name="mail-outline"></ion-icon>
                      <Input
                        type="email"
                        label="Email"
                        size="sm"
                        name="email"
                        onChange={HandleChange}
                        value={dataForm.email}
                      />
                    </span>
                    <span>
                      <ion-icon name="lock-closed-outline"></ion-icon>
                      <Input
                        type="password"
                        label="Senha"
                        size="sm"
                        name="password"
                        onChange={HandleChange}
                        value={dataForm.password}
                      />
                    </span>
                  </form>
                  {loading && <Spinner color="primary" />}
                  {error && <div className="cont-err">POR FAVOR, PREENCHA TODOS OS CAMPOS.</div> }
                  {msglogin && <div className="cont-err">ERRO: EMAIL OU SENHA INCORRETOS.</div> }
                  <div className="cont-btn">
                    {changeLog ? (
                      <Button radius="full" className="btn-1" onClick={ValidLogin}>
                        ENTRAR
                      </Button>
                    ) : (
                      <Button
                        radius="full"
                        className="btn-1"
                        onClick={()=> {

                          if (!dataForm.name || !dataForm.email || !dataForm.password) {

                            setError(true)
                      
                            setTimeout(()=> {
                      
                              setError(false)
                      
                            },3000)
                      
                            return
                          }
                          CreateLogin()
                          
                        }}
                      >
                        CRIAR CONTA
                      </Button>
                    )}
                    {changeLog ? (
                      <Button
                      
                        radius="full"
                        className="btn-2"
                       
                        variant="ghost"
                        onClick={() => {
                          setChangeLog(false);
                          limparDados();
                        }}
                      >
                        AINDA NÃO TEM CONTA?
                      </Button>
                    ) : (
                      <Button
                        radius="full"
                        className="btn-2 dark:text-white"
                       
                        variant="ghost"
                        onClick={() => {
                          setChangeLog(true);
                          limparDados();
                        }}
                      >
                        JÁ TEM UMA CONTA?
                      </Button>
                    )}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
