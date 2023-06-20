import Login from '../components/Login';
import { Inter } from 'next/font/google';
import Header from '../components/Header';

const inter = Inter({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-inter"
});

function Home() {
  return (
    <div className={`${inter.className}`}>
      <Header />
      <Login />
    </div>
  )
};

export default Home;
