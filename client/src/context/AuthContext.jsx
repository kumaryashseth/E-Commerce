import { createContext,useEffect,useState,useContext } from "react";

const AuthContext=createContext()

const [auth,setAuth]=useState(
    {
        user:null,
        token:""
    }
)

const AuthProvider=()=>{
    
}
