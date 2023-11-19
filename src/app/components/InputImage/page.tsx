"use client"
import React from "react"
import styles from "../../styles/inputImage.module.css";

interface InputImageProps {
  inputImageData: (data : FileList) => void
}

const InputImage: React.FC<InputImageProps> = ({inputImageData}) => {
    const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(files) {
            inputImageData(files)
        }
    }

 

      

    return (
        <div className={styles.inputImageBody}>

            
          
            <div className={styles.inputDiv}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageInput}
              multiple
            />
          </div>
            

        </div>
      );
    };
export default InputImage