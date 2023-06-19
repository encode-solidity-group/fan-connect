import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useSession } from 'next-auth/react';
import Login  from '../components/Login';
import { Inter } from 'next/font/google';
import Header from '../components/landingPage/Header'
import Nav from '../components/landingPage/Nav'
import Banner from '../components/landingPage/Banner'
import About from '../components/landingPage/About'

const inter = Inter({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-inter"
});

function Home() {
  return (
    <div className={`${inter.className}`}>
      <Header />
      <Banner />
      <About />
      <Nav />
      {/* <Login /> */}
    </div>
  )
};

export default Home;
