import { Inter } from "next/font/google";
import "./globals.css";
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen max-w-[430px] min-w-[350px]  mx-auto  flex flex-col justify-between`}>
        <Header />
        <main className="h-full bgImage">
          {children}

        </main>
        <Footer />
      </body>
    </html>
  );
}
