import { FC } from "react";
import { Options } from "../../model/Options";
import { useSelectsStore } from "../../store/store";
import ChangeIcon from "../../assets/icons/ChangeIcon";
import styles from "./switcher.module.scss";

interface SwitcherProps {
  refetch: () => void;
  give: Options | null;
  get: Options | null;
}

export const Switcher: FC<SwitcherProps> = ({ refetch, give, get }) => {
  const switchOptions = useSelectsStore((state) => state.switchOptions);
  const handleSwitch = async () => {
    await switchOptions();
    await refetch();
  };
  return (
    <i className={styles.switcher__icon}>
      <ChangeIcon
        width="40px"
        height="40px"
        fill={get ? "#3CAE6A" : "#585857"}
        onClick={() => {
          get && give && handleSwitch();
        }}
      />
    </i>
  );
};
