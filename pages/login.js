import Sign from "../component/Sign";
import Link from "next/link";
import style from "./login.module.css"
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import router from 'next/router';

export default function Login(){
    const token = Cookies.get('token');
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[data,setData] = useState(null);
    useEffect(()=>{
        if(token!==undefined){
            router.push("/")
        }

    },[])
    const url = "http://localhost:5000/signin"
    useEffect(()=>{
        if(data!=null){
            async function Signin(){
                const response = await fetch(url,{
                    method: 'POST',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    redirect: 'follow',
                    body: JSON.stringify(data)
                })
                if(response.status!=200){
                    return "something wrong"
                }
                return response.json();
            }

            Signin()
            .then(value=>{
                console.log(value);
                if(value=="something wrong"){
                    alert("Email or password are incorrect")
                }else{
                    Cookies.set("token",value);
                    router.push("/")
                }
            })
            .catch(e=>{alert(e)})
        }
    },[data])

    return(
            <Sign>
                <h2 className={style.loginTitle}>Login</h2>
                <p>Don't have an account? <Link href="/signup"><a className={style.linkAway}>Creat your account</a></Link>, it takes less than a minute.</p>
                <form className={style.loginForm} onSubmit={e=>{
                    e.preventDefault();
                    setData({email,password});
                    console.log(data)
                }}>
                    <input className={style.loginInput} type="email" placeholder="Email" required onChange={e=>{setEmail(e.target.value)}}/>
                    <input className={style.loginInput} type="password" placeholder="Password" required onChange={e=>{setPassword(e.target.value)}}/>
                    <input className={style.loginBtn} type="submit" value="Login"/>
                </form>
            </Sign>
    )
}