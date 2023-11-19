"use client"
import styles from './page.module.css'
import React from 'react'
import { useRouter } from 'next/navigation';

const Home: React.FC = () => {

  const router = useRouter();

  const handleGetStartedClick = () => {
    router.push('/MainEditor');
  };



  return (
    <main className={styles.main}>
      <h2>FREE FOR ALL USSERS</h2>
      <div >
      <h1>BEST QUALITY IMAGE</h1>
      <p style={{fontSize: '20px'}}>COMPRESS AND FORMAT CONVERTION</p>
      <button className={styles.getStarted} onClick={handleGetStartedClick}>
        GET STARTED
      </button>
      </div>

    </main>
  );
}
export default Home;