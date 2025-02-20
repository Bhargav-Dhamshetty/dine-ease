import { createContext,useEffect,useState } from "react";
export const userOwnerContextObj=createContext()
function UserOwnerContext({children}){
    let [currentUser,setCurrentUser]=useState({
        firstName:'',
        lastName:'',
        email:'',
        profileImageUrl:'',
        role:'',
        address:'',
        mobile:''
    })

    useEffect(()=>{
        const userInStorage=localStorage.getItem('currentuser');
        if(userInStorage){
            setCurrentUser(JSON.parse(userInStorage))
        }
    },[])

    return (
        <userOwnerContextObj.Provider value={{currentUser,setCurrentUser}} >
            {children}
        </userOwnerContextObj.Provider>
    )
}

export default UserOwnerContext;