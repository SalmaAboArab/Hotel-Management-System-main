import React from 'react';
import { toast } from "react-toastify";
import axios from 'axios';

export default function DeleteFavoriteRoom() {
    async function deleteFavRoom(roomId) {
        try {
          const response= await axios.delete(`${baseUrl}/portal/favorite-rooms/${roomId}`, {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNjdlN2RiNzVhYzQ5ODAzNTY5ZDYiLCJyb2xlIjoidXNlciIsInZlcmlmaWVkIjpmYWxzZSwiaWF0IjoxNzE0MDE1MzU3LCJleHAiOjE3MTUyMjQ5NTd9.4AZOGtoXVEQ0Ss55wiav379QUL6EcBaDETCr0FRZTG0",
            },
                
          }
         
        );
          console.log(response);
          
        } catch (error) {
          console.error(error);
        }
      }
  return (
   <>

   </>
  )
}
