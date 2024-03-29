"use client"
import React, { useEffect, useState } from "react"
import styles from "../../styles/inputImage.module.css"

interface ChangeImageSizeProps {
    h: number | null;
    w: number | null;
    sendH: (data: number | null) => void;
    sendW: (data: number | null) => void;
}

const ChangeImageSize: React.FC<ChangeImageSizeProps> = ({ h, w, sendH, sendW }) => {
    const [height, setHeight] = useState<number | null>(h)
    const [width, setWidth] = useState<number | null>(w)
    const [imgNaturalHeight, setImgNaturalHeight] = useState<number | null>(null);
    const [imgNaturalWidth, setImgNaturalWidth] = useState<number | null>(null);

    useEffect(() => {
        if (h !== null && w !== null && imgNaturalHeight===null && imgNaturalWidth===null) {
            setImgNaturalHeight(h);
            setImgNaturalWidth(w);
            setHeight(h);
            setWidth(w);
        }
    }, [h, w]);

    const handleHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
        const height = parseInt(e.target.value, 10);
        setHeight(height);
        sendH(height);
    }
    const handleWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
        const width = parseInt(e.target.value, 10);
        setWidth(width);
        sendW(width);
    }

    const handleReset = () => {
        setHeight(imgNaturalHeight);
        setWidth(imgNaturalWidth);
        sendH(imgNaturalHeight);
        sendW(imgNaturalWidth);
    }

    return (
        <div className={styles.sizeInput}>
            <div>height: {height} px</div>
            <input
                type="number"
                min="1"
                value={Number(height) <= 5 ? 5 : Number(height)}
                onChange={handleHeight}
            />
            <div>width: {width} px</div>
            <input
                type="number"
                min="1"
                value={Number(width) <= 5 ? 5 : Number(width)}
                onChange={handleWidth}
            />
            <button onClick={handleReset} >Reset</button>
        </div>
    )
}

export default ChangeImageSize;