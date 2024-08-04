import { Divider } from "@nextui-org/react"

export default function Footer() {
  return (
    <footer className="footer">
          <Divider orientation="horizontal"/>
     <main className="cont-f dark:bg-dark-bg"> 
     <div>
        <h1>INFORMAÇÃO</h1>
        <ul>
          <li>Quem somos</li>
          <li>Localização</li>
          <li>Contato</li>
          <li>Ajuda</li>
          <li>Política de Privacidade</li>
          <li>Termos e Condições</li>
          <li>Segurança</li>
        </ul>
      </div>
      <div>
        <h1>LINKS DE INFORMAÇÕES</h1>
        <ul>
          <li>Cartões</li>
          <li>Garantia</li>
          <li>Como Pedir</li>
          <li>Pagamento</li>
          <li>Segurança</li>
          <li>Termos e Condições</li>
          <li>Política de Privacidade</li>
        </ul>
      </div>
      <div>
        <h1>ÁREA DE SUPORTE</h1>
        <ul>
          <li>Fale Conosco</li>
          <li>Ajuda Online</li>
          <li>Chat Online</li>
          <li>Twitter</li>
          <li>Instagram</li>
          <li>Facebook</li>
          <li>YouTube</li>
        </ul>
      </div>
     </main>
     <div className="cont-end">
      <p>
      Copyright Aluga Top | By Danilo Ramos.
      </p>
     </div>
    </footer>
  )
}
