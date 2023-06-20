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
import AboutCreators from '../components/landingPage/AboutCreators'
import AboutUsers from '../components/landingPage/AboutUsers'

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
      <AboutCreators />
      <AboutUsers />

      <Nav />
      {/* <Login /> */}
    </div>
  )
};

export default Home;
