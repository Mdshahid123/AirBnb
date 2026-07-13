import { createContext, useEffect, useState } from "react";
const userContext=createContext()// it will return provider and consumer

function UserProvider({children}){

      const [userData,setUserData]=useState(null)
      async function getCurrentUser()
      {

          try {

              const api="http://localhost:3000/currentUser"
              const response=await fetch(api,{
                    method:"GET",
                    headers:{
                      "Content-Type":"application/json"
                    },
                    credentials: "include"// tells the browser to send cookies (such as a JWT stored in an HTTP-only cookie) along with the request
               })
               
               const resData=await response.json()
               setUserData(resData)

          }catch (error) {
              setUserData(null)
              console.log(error)
          }
      }

      useEffect(()=>{
            getCurrentUser()
      },[])

      let value={
        userData,
        setUserData
      }

  return(
    <userContext.Provider value={value}>
        {children}
    </userContext.Provider>
  )
}

export { userContext, UserProvider };