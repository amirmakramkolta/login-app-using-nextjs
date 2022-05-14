import Sign from "../component/Sign";
import Link from "next/link";
import style from "./login.module.css";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import router from 'next/router';


export default function Login(){
    const token = Cookies.get('token');
    const[firstname,setFirstName] = useState("");
    const[lastname,setLastName] = useState("");
    const[email,setEmail]= useState("");
    const[password,setPassword] = useState("");
    const[data,setData] = useState(null);
    useEffect(()=>{
        if(token!==undefined){
            router.push("/")
        }

    },[])
    const url = "http://localhost:5000/create-user"
    useEffect(()=>{
        if(data!=null){
            async function SigupNow(){
                const response = await fetch(url, {
                    method: 'POST',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    redirect: 'follow',
                    body: JSON.stringify(data)
                    });
                    if(response.status!=200){
                        return "something wrong"
                    }
                    return response.json();
            }
            SigupNow()
                .then((value) => {
                    console.log(value);
                    if(value=="something wrong"){
                        alert("your email or password are not exist")
                    }else{
                        Cookies.set('token',value);
                        router.push("/")
                    }
                })
                .catch(e=>{console.log(e)})
        }
    },[data])

    return(
            <Sign>
                <h2 className={style.loginTitle}>Sign up</h2>
                <p>Have an account? <Link href="/login"><a className={style.linkAway}>Log in now</a></Link>.</p>
                <form className={style.loginForm} onSubmit={(e)=>{
                        e.preventDefault();
                        setData({firstname, lastname, email, password})
                        console.log(data);
                    }}>
                    <input className={style.loginInput} type="text" placeholder="First Name" required onChange={(e)=>setFirstName(e.target.value)}/>
                    <input className={style.loginInput} type="text" placeholder="Last Name" required onChange={(e)=>setLastName(e.target.value)}/>
                    <input className={style.loginInput} type="email" placeholder="Email" required onChange={(e)=>setEmail(e.target.value)}/>
                    <input className={style.loginInput} type="password" placeholder="Password" required onChange={(e)=>setPassword(e.target.value)}/>
                    <input className={style.loginBtn} type="submit" value="Signup"/>
                </form>
            </Sign>
    )
}