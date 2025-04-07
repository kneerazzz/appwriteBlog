import React, {useEffect , useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function Protected({
    children,
    authentication = true
}) {
    const navigate = useNavigate()
    const[loader , setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)
    useEffect(() => {
        //todo make it more easy
        if(authentication && authStatus !== authentication){
            navigate("/login")
        }else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)

    } , [authStatus, navigate, authentication])

    return loader ? 
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
        </div> : <>{children}</>
}