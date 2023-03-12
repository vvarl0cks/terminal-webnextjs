import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Terminal from "@/components/Terminal";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(e)
  };
  
  return (
    <>
    <Terminal/>
    </>
  );
}
