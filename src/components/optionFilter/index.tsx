import { FC } from "react";
import styles from "./styles.module.scss";
import { ICategories } from "../../model/ICategories";
import { useFiltersStore } from "../../store";

interface OptionFilterProps {
  categories: ICategories;
}

export const OptionFilter: FC<OptionFilterProps> = ({ categories }) => {
  // Zustand
  const filter = useFiltersStore((state) => state.filter);
  const setFilter = useFiltersStore((state) => state.setFilter);

  const handleCategory = (category: string | null) => {
    setFilter(category);
  };
  return (
    <div className={styles.filter}>
      <div
        className={
          !filter
            ? `${styles.filter__item} ${styles.active}`
            : styles.filter__item
        }
        onClick={() => handleCategory(null)}
      >
        Все
      </div>
      {Object.keys(categories).map((category, index) => (
        <div
          onClick={() => handleCategory(category)}
          key={index}
          className={
            category === filter
              ? `${styles.filter__item} ${styles.active}`
              : styles.filter__item
          }
        >
          {category}
        </div>
      ))}
    </div>
  );
};
