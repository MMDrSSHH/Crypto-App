// Api
import { useGetCoinsQuery } from "../service/api/coinsApi";

// Style
import style from "../styles/coins/coins-list.module.css";

// Components
import CoinItem from "./CoinItem";

const CoinsList = () => {
  const {
    data: coins,
    isFetching,
    isSuccess,
    isError,
  } = useGetCoinsQuery({ perPage: 10, pageNum: 1 });

  let content = null;
  if (isFetching) {
    content = <span className={style["loading-message"]}>Loading ...</span>;
  } else if (isSuccess) {
    content = (
      <ul className={style.list}>
        {coins.map((coin) => (
          <CoinItem key={coin.id} coin={coin} />
        ))}
      </ul>
    );
  } else if (isError) {
    content = <span className={style["error-message"]}>Error :(</span>;
  }

  return (
    <>
      <div className={style["coins-list"]}>{content}</div>
    </>
  );
};

export default CoinsList;
