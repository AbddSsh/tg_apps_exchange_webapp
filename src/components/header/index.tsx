import { FC } from "react";
import { publicRoutes } from "../../assets/routes";
import styles from "./styles.module.css";
import { Link, useLocation } from "react-router-dom";
import { MAIN_ROUTE } from "../../assets/consts";

export const Header: FC = () => {
  const location = useLocation();

  return (
    <div className={styles.header}>
      <div className={styles.header__wrapper}>
        <Link className={styles.header__logo} to={MAIN_ROUTE}>
          <img src="/logo.png" alt="logo" />
          <span>Money Exchange</span>
        </Link>
        <nav className={styles.header__nav}>
          <ul className={styles.links}>
            {publicRoutes.map(({ path, name }) => (
              <li key={path} className={styles.links__link}>
                <Link
                  to={path}
                  className={location.pathname === path ? styles.active : ""}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
