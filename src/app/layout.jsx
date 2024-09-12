import { Inter } from "next/font/google";
import "./globals.css";
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden min-h-screen  max-h max-w-[430px] min-w-[350px]  mx-auto flex flex-col justify-between">
        <Header />
        <main className="h-full  bg-[url(../../public/images/45562.jpg)] bg-no-repeat bg-right-top bg-cover overflow-y-auto scroll-hidden" >
          {/* روکش */}
          <div className="bg-gray-500 bg-cover bg-opacity-75 h-full overflow-y-auto scroll-hidden px-5">
            <div className=" h-full">
              {children}
            </div>
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
