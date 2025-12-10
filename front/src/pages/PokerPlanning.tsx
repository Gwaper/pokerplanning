import React, { useState } from 'react';
import { Card } from '../components/card';
import { voteService } from '../services/api';
import styles from './PokerPlanning.module.css';
import {fibonacciValues} from '../utils/fibonacciArray'



export const PokerPlanning: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<string | number | null>(null);

  const handleCardClick = async (value: string | number) => {
    setSelectedCard(value);

    try {
      await voteService.saveVote(value);
    } catch (error) {
    }
  };

  return (
 
    <div className={styles.pokerPlanning}>
      <h3>Poker Planning</h3>
      <div className={styles.cardsContainer}>
        {fibonacciValues.map((fibonacciValues, index) => (
          <Card
            key={index}
            cardContent={fibonacciValues}
            isSelected={selectedCard === fibonacciValues.value}
            onClick={() => handleCardClick(fibonacciValues.value)}
          />
        ))}
      </div>
    </div>
  );
};
