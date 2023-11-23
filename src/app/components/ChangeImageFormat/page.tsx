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
          <button onClick={() => handleFormatData("jpeg")}>jpeg</button>
        </div>
        <div>
          <button onClick={() => handleFormatData("webp")}>webp</button>
        </div>
        <div>
          <button onClick={() => handleFormatData("png")}>png</button>
        </div>
        <div>
          <button onClick={() => handleFormatData("svg+xml")}>svg or svg+xml</button>
        </div>
      </div>
    </div>
  );
};

export { ChangeImageFormat };
