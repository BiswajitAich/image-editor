"use client"
import React, { useState, ChangeEvent } from "react";
import styles from '../../styles/rangeSlider.module.css'

interface RangeSliderProps {
  sendRangeData: (data: number) => void;
  min: number;
  max: number;
  val: number;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ sendRangeData, min, max, val }) => {
  const [rangeValue, setRangeValue] = useState<number>(val);



  const handleRange = (e: ChangeEvent<HTMLInputElement>) => {
    sendRangeData(parseInt(e.target.value, 10));
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
