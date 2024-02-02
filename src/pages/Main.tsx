import React, { useEffect, useState } from "react";
import { Main } from "../components/main";
import { Preloader } from "../components/ui/preloader/preloader";
import styles from "./mainPage.module.scss";
import { Telegram } from "../components/telegram";
import clsx from "clsx";
import { MainBg } from "../components/ui/mainBg";

export const MainPage = () => {
  const [progress, setProgress] = useState(0);
  const [preloaderFinished, setPreloaderFinished] = useState(false);
  const [preloaderExtro, setPreloaderExtro] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // telegram object
  const tg = window.Telegram.WebApp;

  useEffect(() => {
    let prevProgress = 0;
    const interval = setInterval(() => {
      const randomIncrement = Math.ceil(Math.random() * 10);
      const newProgress = Math.min(prevProgress + randomIncrement, 100);
      setProgress(newProgress);
      prevProgress = newProgress;
    }, 100);

    // setTimeout(() => {
    //   setPreloaderExtro(true);
    //   console.log("extro");
    // }, 500);

    setTimeout(() => {
      clearInterval(interval);
      tg.expand();
      setPreloaderExtro(true);
      console.log("expand");
    }, 1520);

    setTimeout(() => {
      setPreloaderFinished((prev) => !prev);
      console.log("ui");
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (tg.isExpanded) {
      setIsExpanded(true);
    }
  }, [tg.isExpanded]);

  return (
    <div data-testid="main-page" className="page__wrapper">
      <Telegram />
      {preloaderFinished ? (
        <Main />
      ) : (
        <div
          className={clsx(styles.preloaderContainer, {
            [styles.preloaderFullHeight]: isExpanded,
            [styles.preloaderOpcacity]: preloaderExtro,
          })}
        >
          <Preloader step={20} progress={progress} strokeWidth={20} />
        </div>
      )}
      <MainBg />
    </div>
  );
};
