import '../styles/button.css';

export default function Profile() {
  return (
    <main>
      <div className="flex items-center justify-center">

        <button>
          <div className="base">Log In</div>
          <div className="onHover">Connect Wallet</div>
        </button>

      </div>
    </main>
  );
}