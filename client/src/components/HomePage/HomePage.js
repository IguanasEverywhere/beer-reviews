import React from "react";
import beerLogoImg from './olga-nayda-Tr3YOCJR8Ro-unsplash.jpg';
import styles from './HomePage.module.css'

function HomePage() {
  return <div className={styles.landingLayout}>
    <img className={styles.logoImg} src={beerLogoImg} alt='beer-logo-img'></img>


    Photo by <a href="https://unsplash.com/@olianayda?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Olga Nayda</a> on <a href="https://unsplash.com/photos/clear-drinking-glass-with-brown-liquid-Tr3YOCJR8Ro?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

  </div>
}

export default HomePage;

