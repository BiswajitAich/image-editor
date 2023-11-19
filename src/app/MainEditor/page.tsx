"use client"
import React, { useState } from "react"
import ChangeImageFormat from "../components/ChangeImageFormat/page"
import ImageCompressor from "../components/ImageCompressor/page"
// import Filter from "../components/Filter/page"
import { useRouter } from 'next/navigation';
import styles from "../styles/mainEditor.module.css";
import InputImage from "../components/InputImage/page"


const MainEditer: React.FC = () => {
  const [display, setDisplay] = useState<string | null>(null);
  const [format, setFormat] = useState<string | null>("jpeg")
  const [rangeValue, setRangeValue] = useState<number>(80);
  const [images, setImages] = useState<File[]>([]);

  const router = useRouter();


  const handleGoToHome = () => {
    router.push('/');
  };

  const handleComponentChange = (component: string) => {
    if (component === "X") {
      setDisplay(null);
    } else setDisplay(component);
  };

  const handleFormatData = (data: any) => {
    if (data !== null) setFormat(data);

  }

  const handleCompressData = (data: any) => {
    if (data !== null) setRangeValue(data);
    console.log(images)
  }

  const InputImageData = (data: any) => {
    if (data !== null) setImages(data);
  }

  const handleRemoveImage = (indexToRemove: number) => {
    if (images) {
      const updatedImages = Array.from(images).filter((_, index) => index !== indexToRemove);
      setImages(updatedImages);
      console.log(images)
    }
  };

  const handleRemoveAllImages = (e: any) => {
    e.preventDefault();
    setImages([])
  };

  const handleDovnloadAllImages = (e: any) => {
    e.preventDefault();

    images.forEach((images, index) => {
      handleDownloadImage(index);
    })

  };

  const handleDownloadImage = (indexToDownload: number) => {
    if (images) {
      const img = new Image();

      img.src = URL.createObjectURL(images[indexToDownload]);

      img.onload = () => {
        const imgHeight = img.naturalHeight;
        const imgWidth = img.naturalWidth;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = imgWidth;
        canvas.height = imgHeight;
if(ctx)
        ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
        const num = (100 - rangeValue) / 100;

        const downloadLink = document.createElement('a');
        downloadLink.href = canvas.toDataURL(`image/${format}`, num);

        downloadLink.download = `edited-image.${format}`;
        downloadLink.click();

      }
    }
  };


  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <button onClick={handleGoToHome}>HOME</button>
      </header>

      <div className={styles.options}>

        <button onClick={() => handleComponentChange("A")}>
          Compress
        </button>

        <button onClick={() => handleComponentChange("B")}>
          format
        </button>

        {/* <button onClick={() => handleComponentChange("C")}>
          Filter
        </button> */}

        <button onClick={() => handleComponentChange("X")} style={{ minWidth: '40px' }}>
          &darr;
        </button>

      </div>

      <div className={styles.card}>
        <div className={styles.changes}>

          <div>
            {display === "A" ? (
              <ImageCompressor sendCompressorData={handleCompressData} range={rangeValue}/>
            ) : null}
          </div>

          <div>
            {display === "B" ? (
              <ChangeImageFormat sendData={handleFormatData} />
            ) : null}
          </div>
          {/* 
          <div>
            {display === "C" ? (
              <Filter />
            ) : null}
          </div> 
          */}

        </div>
        {images.length > 0 ? (
          <div className={styles.imageCardBody}>
            <h2>
              <button onClick={handleRemoveAllImages}>Remove All</button>
              <button onClick={handleDovnloadAllImages}>Download All</button>
            </h2>

            {Array.from(images).map((image, index) => (
              <div key={index} className={styles.imageCard}>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`image-${index}`}
                  style={{ maxWidth: "50px", maxHeight: "50px", margin: "5px" }}
                />


                <button
                  onClick={() => handleRemoveImage(index)}
                  className={styles.removeButton}
                >
                  Remove
                </button>

                <button onClick={() => handleDownloadImage(index)}>Download</button>
              </div>
            ))}
          </div>
        ) : (
          <InputImage inputImageData={InputImageData} />
        )}


        {
          images.length > 0 ? (
            <div className={styles.changedDetails}>
              <div>Expected Image Format to be Downloaded in : {format}</div>
              <div>Expected Image Compress : {rangeValue} %</div>
            </div>
          ) : null
        }


      </div>
    </div>
  )
}
export default MainEditer