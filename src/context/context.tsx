import { createContext, useState } from "react";

let myVar: any;

export const ContextJsx = createContext(myVar);                //criando  context

type TitleProps = {
  children: any;
}

export const ContextProvider: any = ({ children }: TitleProps) => {

    const [info, setInfo] = useState({})
    const [edit, setEdit] = useState({})

  return (
    <ContextJsx.Provider value={{ info, setInfo, edit, setEdit  }}>{children}</ContextJsx.Provider>
  );
}