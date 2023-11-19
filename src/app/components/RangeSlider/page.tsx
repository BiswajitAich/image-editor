import React, { useState, ChangeEvent } from "react";
import styles from '../../styles/rangeSlider.module.css'

const RangeSlider: React.FC<{ sendData: (e: number) => void; min: number; max: number; val: number }> = ({ sendData, min, max, val }) => {
  const [rangeValue, setRangeValue] = useState<number>(val);



  const handleRange = (e: ChangeEvent<HTMLInputElement>) => {
    sendData(parseInt(e.target.value, 10));
    setRangeValue(parseInt(e.target.value, 10))
  };

  return (
    <div className={styles.rangeSlider}>
  
        <input type="range" 
                min={min} 
                max={max} 
                value={rangeValue} 
                onChange={handleRange} 
                />

      <span>{rangeValue}</span>
    </div>
  );
};

export default RangeSlider;
