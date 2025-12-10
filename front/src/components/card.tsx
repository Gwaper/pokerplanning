import type React from 'react';
import { CardSvg } from './CardSvg';
import styles from './card.module.css';

interface CardProps {
  cardContent: {
    value: number;
  };
  isSelected?: boolean;
  onClick: () => void;
}

export const Card: React.FC<CardProps> = ({ cardContent, isSelected = false, onClick }) => {
  return (
    <button
      type="button"
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
      aria-label={`Card value ${cardContent.value}`}
      aria-pressed={isSelected}
    >
      <div className={styles.cardValue}>
        <CardSvg value={cardContent.value} />
      </div>
    </button>
  );
};
