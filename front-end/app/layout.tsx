import './globals.css';
import { Inter } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer'

const inter = Inter({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata = {
  title: 'OnlyBlocks',
  description: 'Share your content with your community!',
  keywords: 'Share your content with your community!'
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />

      <body className={`${inter.className}`}>
        <nav className="py-5 bg-[#c23e78]">
          <Header />
        </nav>
        {children}
        {/* <footer >
          <Footer />
        </footer> */}
      </body>
    </html>
  );
}
