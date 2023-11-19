"use client"
import React, { useState, useEffect } from "react";
import RangeSlider from "../RangeSlider/page";
import styles from '../../styles/imageCompressor.module.css'

interface ImageCompressorProps {
  sendCompressorData: (data: number) => void;
  range: number;
} 

const ImageCompressor: React.FC<ImageCompressorProps> = ({ sendCompressorData, range }) => {
  const [rangeValue, setRangeValue] = useState<number>(range);

  useEffect(() => {
    sendCompressorData(rangeValue);
  }, [sendCompressorData, rangeValue]);

  const handleRange = (value: number) => {
    setRangeValue(value);
  };

  return (
    <div className={styles.compressorDiv}>
      <h3>compressor</h3>
      <div>
        <div>
          <RangeSlider sendRangeData={handleRange} min={0} max={100} val={rangeValue} />
        </div>
      </div>
    </div>
  );
};

export default ImageCompressor;
