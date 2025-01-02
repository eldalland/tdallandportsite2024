import React from 'react';
import styles from './loadingscreen.module.css';

const LoadingScreen = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingText}>TENTSHAPE</div>
    </div>
  );
};

export default LoadingScreen;