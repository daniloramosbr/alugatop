import axios from "axios";
import { Certificate } from "crypto";

class ApiController {

  async createPost (name :string, userId: string, img: string, title: string, price: number, city: string) {

    const newValor = Number(price)

    try {

      return await axios.post("https://api-rent-sigma.vercel.app/rentcreate", {       //cria um novo post
        name,
        userId,
        title,
        price: newValor,
        img,
        city,
      });
      
    } catch (error) {
      console.log(error);
    }
  }

  async getAll () {
    try {
     return await axios.get("https://api-rent-sigma.vercel.app/rentall")    //pega posts
      
    } catch (error) {
      console.log(error);
    }
  }

    async createLogin(name: string, email: string, password: string) {
        try {
            
          return await axios.post("https://api-rent-sigma.vercel.app/signup", {         //cria dados e retorna token
            name,
            email,
            password
          });
    
        } catch (error) {
         console.log(error)
        }
      }
    
      async validLogin (email: string, password: string) {
    
        try {
    
          return await axios.post("https://api-rent-sigma.vercel.app/signin",{       //faz verification no banco
            email,
            password
          });        
          
        } catch (error) {
        console.log(error)
        }
      }

      async myRent (id: string) {
        try {

          return await axios.get(`https://api-rent-sigma.vercel.app/myrent/${id}`);     //pega posts do user
          
        } catch (error) {
          console.log(error)
        }
      }

      async deleteRent (id: string) {

        try {

          return await axios.delete(`https://api-rent-sigma.vercel.app/rentdelete/${id}`);     //deleta post do user
          
        } catch (error) {
          console.log(error)
        }
      }

      async editPost(id: string, img: string, title: string, price: number, city: string) {

        const newValor = Number(price)

        try {

          return await axios.patch(`https://api-rent-sigma.vercel.app/rentedit/${id}`, {
            img: img,
            title: title,
             price: newValor,
            city: city
          
          })
          
        } catch (error) {
          console.log(error)
        }

      }

}

export const apiController = new ApiController()