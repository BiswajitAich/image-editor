"use client"
import React from "react"
import styles from "../../styles/inputImage.module.css";


const MainEditer: React.FC<{inputImageData: (data: FileList) => void}> = ({inputImageData}) => {
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
export default MainEditer