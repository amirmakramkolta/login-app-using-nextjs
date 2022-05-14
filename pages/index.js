import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useState, useEffect} from 'react'
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
import router from 'next/router';


export default function Home() {
  const [authorthize,setAuthorthize] = useState(Cookies.get('token'));
  function logout(){
    Cookies.remove('token');
    router.push("/login")
  }
  useEffect(()=>{
    if(authorthize==undefined){
      router.push("/login")
    }
  },[])

  return(
    <>
      <h1>Hello</h1>
      <button onClick={logout}>Logout</button>
    </>
  )
}
