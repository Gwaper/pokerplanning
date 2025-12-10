import React from 'react';

interface CardSvgProps {
  value: number;
}

export const CardSvg: React.FC<CardSvgProps> = ({ value }) => {

  // Palette uniforme par carte
  const colors: Record<number, { bg: string; stroke: string; text: string }> = {
    1:  { bg: "#FFD1E6", stroke: "#FF4DAA", text: "#FF4DAA" },
    2:  { bg: "#FFE5F5", stroke: "#FF70C8", text: "#FF70C8" },
    3:  { bg: "#F1D4FF", stroke: "#BB6BFF", text: "#9F33FF" },
    5:  { bg: "#D9E6FF", stroke: "#6CA3FF", text: "#2B65D9" },
    8:  { bg: "#FFE9C7", stroke: "#FFB347", text: "#D67700" },
    13: { bg: "#E4FFD9", stroke: "#60D659", text: "#2D8A25" },
    21: { bg: "#E6DAFF", stroke: "#9966FF", text: "#5B2ECC" },
    34: { bg: "#FFE2DF", stroke: "#FF7267", text: "#C73528" },
    55: { bg: "#CCF7FF", stroke: "#65D1E8", text: "#1289A6" },
  };

  const col = colors[value] ?? {
    bg: "#eee",
    stroke: "#999",
    text: "#333"
  };

  return (
  <svg viewBox="0 0 120 120">
    <rect
      x="10"
      y="10"
      width="100"
      height="100"
      rx="20"
      fill={col.bg}
      stroke={col.stroke}
      strokeWidth="4"
    />
    <text
      x="60"
      y="70"
      fontSize="32"
      fontWeight="900"
      textAnchor="middle"
      dominantBaseline="middle"
      fill={col.text}
    >
      {value}
    </text>
  </svg>
  );
}
