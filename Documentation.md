# Documentation: Development Experience & Encountered Challenges for Creating a Patreon-style Website 

This documentation focuses on our development experience, the challenges we faced, and the solutions we employed in creating a Patreon-style website using Solidity for smart contracts, Next.js for the frontend, and Firebase to store post data. Our platform supports images, videos, and unique username attachments to wallets.

## System Architecture

Our system is designed with three main components:

1. **Smart Contracts:** The backbone of our platform where all the business logic resides. We used Solidity to create the smart contracts which keep track of the creators, their prices, subscribers, and payments.

2. **Frontend:** Built with Next.js, our front end provides an interface for creators and subscribers to interact with the platform.

3. **Firebase:** We use Firebase as a real-time database to store all post data (images, videos, etc.)

## Development Experience

### Smart Contracts with Solidity

#### Experience:

Our experience developing with Solidity was enlightening. Solidity is a statically-typed language, which brought a level of safety and predictability to our code. It's specifically designed for the Ethereum Virtual Machine, and allowed us to write high-level code for complex transactions.

Deploying our application on the Aurora Mainnet was an effortless and seamless experience. Thanks to Aurora's robust infrastructure, the deployment process was smooth, and we encountered no major hurdles. The transaction fees on Aurora were impressively low, enabling cost-effective operations, while the lightning-fast transaction speeds ensured optimal user experience.

#### Challenges and Solutions:

- **Challenge:** Learning curve with Solidity and the Ethereum ecosystem, especially dealing with gas prices and understanding how transactions are validated on the Ethereum network.

  - **Solution:** Encode Solidity bootcamp materials and online documentation helped us in understanding and implementing the Solidity smart contracts.

- **Challenge:** Writing secure and optimized contracts. Solidity's syntax can lead to unforeseen vulnerabilities.

  - **Solution:** We adopted best practices such as keeping the contracts simple, minimizing the amount of data stored, and conducting rigorous testing and code reviews.

### Frontend with Next.js

#### Experience:

Next.js was an excellent choice for our project, thanks to its efficiency and its out-of-the-box features like server-side rendering and generation of static websites.

#### Challenges and Solutions:

- **Challenge:** Integrating smart contracts into the Next.js frontend was not a straightforward task. 

  - **Solution:** We used Wagmi and ethers library to interact with the Ethereum blockchain. It made communication between the frontend and the blockchain seamless, making it easier to call functions and fetch data from our contracts.

- **Challenge:** Ensuring all aspects of the website were responsive and user-friendly, which initially was a significant challenge.

  - **Solution:** Tailwind CSS and React helped us create responsive layouts. We also spent considerable time planning the user interface before starting to code.

### Firebase

#### Experience:

Firebase offered an easy-to-use, scalable solution for our data storage needs. Its real-time capabilities worked perfectly for our use case, allowing us to track posts as soon as they were published.

#### Challenges and Solutions:

- **Challenge:** Data structure planning was tricky as Firebase is a NoSQL database, which made organizing data different from traditional SQL databases.

  - **Solution:** To handle this, we mapped out our data structures in advance, considering how the data would scale. 

- **Challenge:** Ensuring the security of our data stored on Firebase was a priority concern.

  - **Solution:** We employed Firebase security rules to protect our data from unauthorized access.

## Summary

Overall, the development process, while challenging, was a rewarding experience. Each technology we employed had its own learning curve and specific challenges, but the robustness of these technologies and the support from their respective communities helped us tremendously. Our Patreon-style platform has successfully implemented Solidity smart contracts, a user-friendly frontend with Next.js, and a real-time database with Firebase.
