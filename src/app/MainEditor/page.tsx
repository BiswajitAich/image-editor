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
  const [format, setFormat] = useState<string | undefined>("jpeg")
  const [rangeValue, setRangeValue] = useState<number>(80);
  const [images, setImages] = useState<File[]>([]);
  const [showNotice, setShowNotice] = useState(false);

  const router = useRouter();


  const handleGoToHome = () => {
    router.push('/');
  };

  const handleComponentChange = (component: string) => {

    if (images.length <= 0) {
      setShowNotice(true);

      setTimeout(() => {
        setShowNotice(false);
      }, 3000);
    }

    if (images.length > 0) {
      if (component === "X") {
        setDisplay(null);
      } else setDisplay(component);
    }

  };

  const handleFormatData = (data: string): void => {
    setFormat(data);
  }

  const handleCompressData = (data: any) => {
    setRangeValue(data);
  }

  const InputImageData = (data: any) => {
    setImages(data);
  }

  const handleRemoveImage = (indexToRemove: number) => {
    if (images) {
      const updatedImages = Array.from(images).filter((_, index) => index !== indexToRemove);
      setImages(updatedImages);
      setDisplay(null);
    }
  };

  const handleRemoveAllImages = (e: any) => {
    e.preventDefault();
    setImages([]);
    setDisplay(null);
  };

  const handleDovnloadAllImages = async (e: any) => {
    e.preventDefault();

    if (images) {
      const imgNum = images.length;
      for (let i = 0; i < imgNum; i++)
        handleDownloadImage(i);
    }
  };

  const handleDownloadImage = async (indexToDownload: number) => {
    if (images) {
      const img = new Image();

      img.src = URL.createObjectURL(images[indexToDownload]);

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const imgHeight = img.naturalHeight;
      const imgWidth = img.naturalWidth;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = imgWidth;
      canvas.height = imgHeight;
      if (ctx)
        ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
      const num = (100 - rangeValue) / 100;

      const downloadLink = document.createElement('a');
      downloadLink.href = canvas.toDataURL(`image/${format}`, num);

      downloadLink.download = `edited-image.${format}`;
      downloadLink.click();
      document.body.removeChild(downloadLink);
      document.body.removeChild(canvas)

    }
  };


  const buttonStyle = {
    color: images.length <= 0 ? "#ffd70091" : "",
    backgroundColor: images.length <= 0 ? "#cdc38a3b" : "",
  };


  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <button onClick={handleGoToHome}>HOME</button>
      </header>

      <div className={styles.options}>

        <button onClick={() => handleComponentChange("A")}
          style={buttonStyle}
          disabled={!showNotice}
        >
          Compress
        </button>

        <button onClick={() => handleComponentChange("B")}
          style={buttonStyle}
          disabled={!showNotice}
        >
          format
        </button>

        {/* <button onClick={() => handleComponentChange("C")}>
          Filter
        </button> */}

        <button onClick={() => handleComponentChange("X")} 
          style={{ minWidth: '40px' }}
          disabled={!showNotice}
          >
          &darr;
        </button>

      </div>

      <div className={styles.card}>
        <div className={styles.changes}>

          <div>
            {display === "A" ? (
              <ImageCompressor sendCompressorData={handleCompressData} range={rangeValue} />
            ) : null}
          </div>

          <div>
            {display === "B" ? (
              <ChangeImageFormat sendFormatData={handleFormatData} />
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
              <div>Expected Image Format to be Downloaded in : <p> {format}</p></div>
              <div>Expected Image Compress : <p> {rangeValue} %</p> </div>
            </div>
          ) : null
        }
        {showNotice && <p className={styles.notice}>No image is uploaded. <br /> Please upload an image first !</p>}
      </div>
    </div>
  )
}
export default MainEditer

