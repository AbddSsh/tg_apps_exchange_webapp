import { FC, useEffect, useRef } from "react";
import { Categories } from "../../model/Categories";
import { ValuteCard } from "../valuteCard";
import { OptionFilter } from "../optionFilter";
import { OptionSearch } from "../optionSearch";
import { Popup } from "../ui/popup";
import { useFiltersStore } from "../../store/store";
import styles from "./modal.module.scss";
import { useTranslation } from "react-i18next";

interface ModalProps {
  options?: Categories;
  handleModal: () => void;
  type: string;
  filter: string | null;
  show: boolean;
}

export const Modal: FC<ModalProps> = ({
  options,
  handleModal,
  type,
  filter,
  show,
}) => {
  const search = useFiltersStore((state) => state.search);

  // const setFilter = useFiltersStore((state) => state.setFilter);
  const { t } = useTranslation();
  const filteredOptions = filter
    ? options?.[filter]?.filter((option) =>
        option.name.toLowerCase().includes(search.toLowerCase())
      )
    : Object.values(options || {}).flatMap((category) =>
        category.filter((option) =>
          option.name.toLowerCase().includes(search.toLowerCase())
        )
      );

  // scrollToTop
  const ulRef = useRef<HTMLUListElement | null>(null);
  useEffect(() => {
    if (ulRef.current && show) {
      ulRef.current.scrollTop = 0;
    }
  }, [show]);
  return (
    <Popup closeModal={handleModal} show={show}>
      <section className={styles.valutesPopup}>
        {options && Object.keys(options).length > 0 ? (
          <>
            <h3>{type === "give" ? t("ОТДАЮ") : t("ПОЛУЧАЮ")}</h3>
            <OptionFilter categories={options} />
            <OptionSearch />
            <ul ref={ulRef}>
              {filteredOptions && filteredOptions?.length > 0 ? (
                filteredOptions.map((option) => (
                  <ValuteCard
                    key={option.id}
                    option={option}
                    handleModal={handleModal}
                    type={type}
                  />
                ))
              ) : (
                <p className={styles.empty}>{t("Нет доступных направлений")}</p>
              )}
            </ul>
          </>
        ) : (
          <p className={styles.empty}>
            {t("Для данного направления на данный момент нет доступных валют")}
          </p>
        )}
      </section>
    </Popup>
  );
};
