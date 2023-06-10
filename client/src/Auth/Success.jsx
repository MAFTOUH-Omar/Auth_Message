import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
function Success(){
    const [cookies, setCookie] = useCookies(['auth']);
    const [token,setToken] = useState(()=>cookies.auth)
    const navigate = useNavigate()
    useEffect(()=>{
        if(!cookies.auth) navigate("/login")
    },[])

    return(
        <>
            <h1>Success</h1>
        </>
    )
}
export default Success;