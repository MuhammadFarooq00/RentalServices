import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import AuthProviderCom from "@/components/ClientSession";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: 'Rental Services App',
  description: 'Modern and responsive rental services application.',
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex  flex-col`}
      >
        {/* <ClientSessionProvider> */}
        <AuthProviderCom>
        <Header />
          
       
        <main className="flex-grow">
          {children}
        </main>
        <Toaster position="top-right" reverseOrder={false} />
        <Footer />
        </AuthProviderCom>
        {/* </ClientSessionProvider> */}
      </body>
    </html>
  );
}
