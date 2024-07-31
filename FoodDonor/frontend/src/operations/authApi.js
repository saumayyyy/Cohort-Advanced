import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../Slice/authSlice"
import { setUser } from "../Slice/profileSlice"
import { apiConnector } from "./apiConnector"
import { endpoints } from "./apis"


const {
    SIGNUP_API,
    LOGIN_API
} = endpoints;


export function signUp(
    role,
    name,
    
){

}