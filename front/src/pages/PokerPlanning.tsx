import type React from 'react';
import { useState } from 'react';
import { Card } from '../components/card';
import { voteService } from '../services/api';
import { fibonacciValues } from '../utils/fibonacciArray';
import styles from './PokerPlanning.module.css';

export const PokerPlanning: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleCardClick = async (value: number) => {
    setSelectedCard(value);

    try {
      await voteService.saveVote(value);
    } catch (_error) {}
  };

  return (
    <div className={styles.pokerPlanning}>
      <h3>Poker Planning</h3>
      <div className={styles.cardsContainer}>
        {fibonacciValues.map((cardValue) => (
          <Card
            key={cardValue.value}
            cardContent={cardValue}
            isSelected={selectedCard === cardValue.value}
            onClick={() => handleCardClick(cardValue.value)}
          />
        ))}
      </div>
    </div>
  );
};
