
"use client"
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { Provider } from 'react-redux'; // Import the Redux Provider
import store from '@/redux/store'; // Import the Redux store
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden min-h-screen max-w-[430px] min-w-[350px] mx-auto flex flex-col justify-between">
        <Provider store={store}> {/* Wrap the whole app in Redux Provider */}
          <Header />
          <main className="h-full bg-[url(../../public/images/45562.jpg)] bg-no-repeat bg-right-top bg-cover overflow-y-auto scroll-hidden">
            {/* Overlay */}
            <div className="bg-gray-500 bg-cover bg-opacity-75 h-full overflow-y-auto scroll-hidden px-5">
              <div className="h-full">
                {children}
              </div>
            </div>
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
