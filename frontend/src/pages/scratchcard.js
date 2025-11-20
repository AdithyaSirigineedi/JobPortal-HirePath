import { useState, useEffect } from 'react';
import ScratchCard from 'react-scratchcard';
import ReactConfetti from 'react-confetti';
import '../css/scratch.css';
import ScratchImage from '../images/image.png';

const prizes = [
  { title: "You've Won!", message: "A cashback of ₹1000 is yours." },
  { title: "Winner!", message: "You get a 20% discount coupon." },
  { title: "Lucky You!", message: "₹500 cashback has been added to your wallet." },
  { title: "Great Job!", message: "Free resume review unlocked!" },
  { title: "🎁 Bonus!", message: "A surprise gift is waiting for you." },
  { title: "Awesome!", message: "You won a ₹200 voucher." },
  { title: "Superb!", message: "Access to premium job listings for free!" }
];

const LOCAL_STORAGE_KEY = 'hirepathScratchRevealed';

const Scratch = () => {
  const [revealed, setRevealed] = useState(Array(prizes.length).fill(false));
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    document.title = "Scratchcard | HirePath";
    
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setRevealed(JSON.parse(stored));
    }
  }, []);

  const handleReveal = (index) => {
    if (revealed[index]) return;

    const updated = [...revealed];
    updated[index] = true;
    setRevealed(updated);
    setShowConfetti(true);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const settings = {
    width: 310,
    height: 310,
    image: ScratchImage,
    finishPercent: 40
  };

  return (
    <div className="scratchcard-wrapper">
      {showConfetti && <ReactConfetti recycle={false} numberOfPieces={200} />}

      <div className="scratchcard-grid">
        {prizes.map((prize, index) => (
          <div className="scratchcard-container" key={index}>
            {!revealed[index] ? (
              <ScratchCard
                {...settings}
                onComplete={() => handleReveal(index)}
              >
                <div className="prize-content">
                  <h2>{prize.title}</h2>
                  <p>{prize.message}</p>
                </div>
              </ScratchCard>
            ) : (
              <div className="revealed-message">
                <h2>🎉 {prize.title}</h2>
                <p>{prize.message}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Scratch;
