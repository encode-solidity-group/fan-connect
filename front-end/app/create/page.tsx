'use client';
import '../styles/button.css';
import '@rainbow-me/rainbowkit/styles.css';
// import { ConnectButton } from '@rainbow-me/rainbowkit';


export default function CreatePage() {
  return (
    <main>
      <div className="flex items-center justify-center">

        <button>
          <div className="base">Log In</div>
          <div className="onHover">Connect Wallet</div>
        </button>
        {/* <ConnectButton /> */}

      </div>
    </main>
  );
}