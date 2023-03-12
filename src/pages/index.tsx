import { Inter } from "next/font/google";
import Terminal from "@/components/Terminal";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <>
      <Head>
        <title>Al Siam - Terminal Based Developer Portfolio</title>
        <meta
          name="description"
          content="Welcome to Al Siam's developer portfolio! Explore Al's skills, projects, and background through this terminal-based portfolio. Try typing in commands like 'help', 'projects', 'about', and 'skills' to learn more about Al and the work as a developer"
        />
        <meta
          name="keywords"
          content="HTML, CSS, JavaScript, TypeScript, Saif Al Siam, Al Siam, alsiam, "
        />
        <meta name="author" content="Al Siam" />
      </Head>
      <main>
        <Terminal />
      </main>
    </>
  );
}
