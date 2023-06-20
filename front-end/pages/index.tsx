import { Inter } from 'next/font/google';
import Header from '../components/landingPage/Header';
import Nav from '../components/landingPage/Nav';
import Banner from '../components/landingPage/Banner';
import AboutCreators from '../components/landingPage/AboutCreators';
import AboutUsers from '../components/landingPage/AboutUsers';

const inter = Inter({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-inter"
});

function Home() {

  return (
    <div className={`${inter.className}`}>
      <Header />
      <div className="background-animated py-20" />
      <Banner />
      <div className="background-animated1 py-20  " />
      <AboutCreators />
      <div className="background-animated2 py-20 " />
      <AboutUsers />
      <div className="flex justify-center lg:hidden">
        <Nav />
      </div>
    </div>
  );
};

export default Home;
