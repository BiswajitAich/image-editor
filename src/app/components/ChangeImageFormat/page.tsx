// components/ChangeImageFormat.tsx
import React from "react";
import styles from '../../styles/changeImageFormat.module.css';

interface ChangeImageFormatProps {
  sendFormatData: (data: string) => void;
}

const ChangeImageFormat: React.FC<ChangeImageFormatProps> = ({ sendFormatData }) => {
  const handleFormatData = (data: string) => {
    sendFormatData(data);
  };

  return (
    <div className={styles.changeImageFormatDiv}>
      <h3>Choose Image format to convert</h3>
      <div>
        <div>
          {typeof window !== 'undefined' ? (
            <button onClick={() => handleFormatData("jpeg")}>jpeg</button>
          ) : (
            <p>Rendering on the server, button disabled</p>
          )}
        </div>
        <div>
          {typeof window !== 'undefined' ? (
            <button onClick={() => handleFormatData("webp")}>webp</button>
          ) : (
            <p>Rendering on the server, button disabled</p>
          )}
        </div>
        <div>
          {typeof window !== 'undefined' ? (
            <button onClick={() => handleFormatData("png")}>png</button>
          ) : (
            <p>Rendering on the server, button disabled</p>
          )}
        </div>
        <div>
          {typeof window !== 'undefined' ? (
            <button onClick={() => handleFormatData("svg+xml")}>svg or svg+xml</button>
          ) : (
            <p>Rendering on the server, button disabled</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangeImageFormat;
