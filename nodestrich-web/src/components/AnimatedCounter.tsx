'use client';

import { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  className?: string;
}

const AnimatedCounter = ({ end, duration = 1500, className = '' }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (end === 0) return;

    const increment = end / (duration / 10);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 10);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span className={className}>{count.toLocaleString()}</span>;
};

export default AnimatedCounter;