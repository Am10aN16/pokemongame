import axios from 'axios';
import { useEffect, useState } from 'react';



const UserAPI = (token) => {

    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [id , setId] = useState(); 
   
   

    useEffect(()=>{
        if(token){
            const getUser = async() =>{
                try {
                    const res = await axios.get('/user/infor',{
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                     setId(res.data._id);

                    // console.log(res);

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser()
        }
    },[token])





  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin:  [isAdmin, setIsAdmin],
    id: [id,setId]
 
  }
}


export default UserAPI