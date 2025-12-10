import React from 'react';
import styles from './card.module.css';
import { CardSvg } from './CardSvg';

interface CardProps {
  cardContent: {
    value: number;
  };
  isSelected?: boolean;
  onClick: () => void;
}

export const Card: React.FC<CardProps> = ({ cardContent, isSelected = false, onClick }) => {

  return (
    <div
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
    >
      <div className={styles.cardValue}>
        <CardSvg value={cardContent.value} />
      </div>
    </div>
  );
};
