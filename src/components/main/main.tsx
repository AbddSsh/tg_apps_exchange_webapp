import { memo, useEffect } from "react";
import { useFetchExchangers } from "../../api/api";
import { useCashStore, useSelectsStore } from "../../store/store";
import { DirectionTabs } from "../directionTabs";
import { ExchangerLoader } from "../exchangerLoader";
import { LocationSelect } from "../locationSelect";
import { ResultArrow } from "../resultArrow";
import { SelectsForm } from "../selectsForm";
import styles from "./styles.module.scss";

export const Main = memo(() => {
  const give = useSelectsStore((state) => state.giveSelect);
  const get = useSelectsStore((state) => state.getSelect);
  const setGetSelect = useSelectsStore((state) => state.setGetSelect);

  const { location } = useCashStore((state) => state);

  const {
    data: exchangers,
    isLoading,
    isFetching,
    refetch,
    isSuccess,
    error,
  } = useFetchExchangers({
    from: give?.code_name,
    to: get?.code_name,
    city: location?.location?.city.code_name,
  });
  console.log(isSuccess);
  useEffect(() => {
    if (error) {
      setGetSelect(null);
    }
  }, [error, setGetSelect]);

  return (
    <div className={styles.main}>
      <DirectionTabs />
      <LocationSelect />
      <div className={styles.main__body}>
        <SelectsForm get={get} give={give} refetch={refetch} />
        <div className={styles.resultArrow}>
          <ResultArrow isSuccess={isSuccess} />
        </div>
        <ExchangerLoader
          error={error}
          exchangers={exchangers}
          isFetching={isFetching}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
});
