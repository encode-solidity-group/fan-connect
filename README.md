# Fan-Connect

## Overview

Fan-Connect is a blockchain-based platform designed to create a direct, meaningful connection between creators and their subscribers. Built on top of the robust and secure smart contract technology, Fan-Connect empowers creators to share exclusive content with their subscribers and benefit from their craft directly. 

Our smart contract architecture effectively tracks creators' wallets, their set price for community subscriptions, and their respective subscribers. On the flip side, it also keeps track of subscribers and who they are subscribed to, ensuring a seamless user experience for all parties involved. 

The smart contract is not only about maintaining a ledger of creators and subscribers; it also handles payments, ensuring transparency, security, and accuracy in every transaction made on the platform.

## Frontend

Our frontend, built with Next.js, a powerful React framework, provides an intuitive and responsive interface. To start the development server, navigate to the `/frontend` directory in your terminal and run `npm run dev`.

The frontend provides a rich set of features:

- **Set a price for your community:** As a creator, you have the flexibility to set the subscription price for your community.
- **Make posts:** Creators can share updates, including pictures and videos, with their community. 
- **Subscribe to creators:** Users can discover and subscribe to creators, gaining access to exclusive content.
- **Like and bookmark posts:** Engage with the content that creators post, through liking and bookmarking.
- **Send tips to creators:** Show your appreciation for creators by sending them tips.

All posts are stored securely in Firebase, providing a robust and scalable database solution.

## Technologies Used

- **NextJs:** A React framework for production-grade applications that offers server-side rendering and static site generation.
- **Tailwind CSS:** A utility-first CSS framework for rapidly building custom user interfaces.
- **Firebase:** Backend-as-a-Service platform for authentication and database storage.
- **Firestore:** Cloud-hosted NoSQL database for storing user and post data.
- **ethers:** JavaScript library for interacting with the Ethereum blockchain.
- **Wagmi:** Ethereum smart contract library for contract interactions.
- **React Icons:** Library of icons for React components.
- **React Toastify:** Library for displaying toast notifications.
- **Hardhat:** A development environment for Ethereum that helps with contract compilation, testing, and deployment.
- **Alchemy:** An infrastructure provider for Ethereum that offers APIs for accessing blockchain data.
- **Wagmi Hooks:** A library for interacting with Ethereum smart contracts using React hooks.

## Getting Started

1. Clone this repository to your local machine.
2. Navigate to the `/frontend` directory.
3. Run `npm install` to install all dependencies.
4. Run `npm run dev` to start the development server.
5. Open `localhost:3000` on your browser to use the application.

Enjoy using Fan-Connect and feel free to contribute!

