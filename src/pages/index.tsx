import { Inter } from "next/font/google";
import Terminal from "@/components/Terminal";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <>
      <Terminal />
    </>
  );
}
