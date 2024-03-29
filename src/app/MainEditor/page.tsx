"use client"
import React, { useEffect, useState } from "react"
import ChangeImageFormat from "../components/ChangeImageFormat/page"
import ImageCompressor from "../components/ImageCompressor/page"
// import Filter from "../components/Filter/page"
import { useRouter } from 'next/navigation';
import styles from "../styles/mainEditor.module.css";
import InputImage from "../components/InputImage/page"
import ChangeImageSize from "../components/ChangeImageSize/page";


const MainEditer: React.FC = () => {
  const [display, setDisplay] = useState<string | null>(null);
  const [format, setFormat] = useState<string | undefined>("jpeg")
  const [rangeValue, setRangeValue] = useState<number>(80);
  const [images, setImages] = useState<File[]>([]);
  const [showNotice, setShowNotice] = useState(false);
  const [h, setH] = useState<number | null>(null);
  const [w, setW] = useState<number | null>(null);
  const [imgNaturalHeight, setImgNaturalHeight] = useState<number | null>(null);
  const [imgNaturalWidth, setImgNaturalWidth] = useState<number | null>(null);
  const [conformationDisplay, setConformationDisplay] = useState<boolean>(true);


  const router = useRouter();

  useEffect(() => {
    if (images.length === 1)
      setNaturalSize();
  }, [images])

  const setNaturalSize = () => {
    if (h === null && w === null) {
      const img = new Image();
      img.src = URL.createObjectURL(images[0]);
      img.onload = () => {
        const naturalH: number = img.naturalHeight;
        const naturalW: number = img.naturalWidth;
        console.log('Natural Height:', naturalH);
        console.log('Natural Width:', naturalW);
        setH(naturalH);
        setW(naturalW);
      };

    }
  };


  const handleGoToHome = () => {
    router.push('/');
  };

  const handleComponentChange = (component: string) => {
    if (images.length <= 0) {
      setShowNotice(true);

      setTimeout(() => {
        setShowNotice(false);
      }, 3000);
      return
    }
    if (component === "X") {
      setDisplay(null);
    } else if (component === "D") {
      setDisplay(component);
      setNaturalSize();
    } else setDisplay(component);
  };

  const handleSizeChange = (component: string) => {
    if (images.length <= 0) {
      setShowNotice(true);

      setTimeout(() => {
        setShowNotice(false);
      }, 3000);
      return
    }
    if (conformationDisplay) {
      const ans = confirm("Warning : This will change all images size you cant change the size back !");
      setConformationDisplay(!ans)
      console.log(ans)
      if (ans) {
        setDisplay(component);
        setNaturalSize();
      }
    } else if (!conformationDisplay) {
      setDisplay(component);
      setNaturalSize();
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
        await handleDownloadImage(images[i]);
    }
  };

  const handleDownloadImage = async (image: File) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(image);
      img.onload = () => {
        const imgHeight = h;
        const imgWidth = w;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (imgHeight && imgWidth) {
          canvas.width = imgWidth;
          canvas.height = imgHeight;

          if (ctx) ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
          const num = (100 - rangeValue) / 100;

          const downloadLink = document.createElement('a');
          downloadLink.href = canvas.toDataURL(`image/${format}`, num);
          const currentTime = new Date();
          const time = String(currentTime).replace(/GMT.*|[^0-9]/g, '') + currentTime.getMilliseconds();
          downloadLink.download = `edited${time}.${format}`;
          downloadLink.click();
          URL.revokeObjectURL(downloadLink.href);
          resolve();
        } else {
          reject(new Error("Canvas context is null."));
        }
      };
      img.onerror = () => {
        reject(new Error("Canvas error."));
      }
    })
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
          disabled={showNotice}
        >
          Compress
        </button>

        <button onClick={() => handleComponentChange("B")}
          style={buttonStyle}
          disabled={showNotice}
        >
          format
        </button>

        {/* <button onClick={() => handleComponentChange("C")}>
          Filter
        </button> */}

        {/* {images.length === 1 ? (<button onClick={() => handleComponentChange("D")}
          style={buttonStyle}
        >
          Size
        </button>) : null
        } */}
        <button onClick={() => handleSizeChange("D")}
          style={buttonStyle}
        >
          Size
        </button>

        <button onClick={() => handleComponentChange("X")}
          style={{ minWidth: '40px' }}
          disabled={showNotice}
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

          <div>
            {display === "D" ? (
              <ChangeImageSize
                h={h}
                w={w}
                sendH={(data) => setH(data)}
                sendW={(data) => setW(data)}
              />
            ) : null}
          </div>

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

                <button onClick={() => handleDownloadImage(images[index])}>Download</button>
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

              {h !== null && w !== null ? (
                <>
                  <div>Expected Image Height : <p> {h} px</p> </div>
                  <div>Expected Image Width : <p> {w} px</p> </div>
                </>
              ) : null}

            </div>
          ) : null
        }

        {showNotice && <p className={styles.notice}>No image is uploaded. <br /> Please upload an image first !</p>}
      </div>
    </div>
  )
}
export default MainEditer

