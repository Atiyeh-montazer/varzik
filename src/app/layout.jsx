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
        <main className="h-full  bg-[url(../../public/images/45562.jpg)] bg-no-repeat bg-right-top bg-cover" >
          <div className="bg-gray-500 bg-opacity-75 h-full">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
