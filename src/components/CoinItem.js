import { useEffect, useState } from "react";

// Routing
import { Link } from "react-router-dom";

// Styles
import style from "../styles/coin/coin-item.module.css";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownLong, faUpLong } from "@fortawesome/free-solid-svg-icons";

// Helper functions
import { numberFormatter, rateDetermine } from "../helpers/functions";

// Api
import { useGetCoinChartQuery } from "../service/api/coinsApi";

// Chart
import { AreaChart, ResponsiveContainer, Area } from "recharts";

const CoinItem = ({ coin }) => {
  const { data: coinChart, isSuccess } = useGetCoinChartQuery(coin.id);
  const [isHigh, setIsHigh] = useState(false);

  let chartData = [];
  if (isSuccess) {
    chartData = coinChart.total_volumes.map((singleData) => ({
      price: singleData[1],
    }));
  }

  useEffect(() => {
    if (isSuccess) {
      const length = coinChart.total_volumes.length;
      setIsHigh(
        coinChart.total_volumes[length - 1][1] >=
          coinChart.total_volumes[length - 2][1]
      );
    }
  }, [isSuccess]);
  return (
    <li className={style["coin-item"]}>
      <div className={style["image-container"]}>
        <img src={coin.image} alt={coin.name.toLowerCase()} />
      </div>
      <div className={style["coin-name"]}>
        <h4>
          <Link to={`/coins/${coin.id}`}>{coin.name}</Link>
        </h4>
      </div>
      <div className={style["price-container"]}>
        <p>
          Price: {numberFormatter(coin.current_price)}${" "}
          <span
            className={`${style["price-change"]} ${
              style[rateDetermine(coin.price_change_percentage_24h)]
            }`}
          >
            {coin.price_change_percentage_24h.toFixed(2)}%
          </span>
        </p>
        <div className={style["high-and-low-prices"]}>
          <span className={style["high-day"]}>
            <FontAwesomeIcon style={{ fontSize: "12px" }} icon={faUpLong} />
            {numberFormatter(coin.high_24h)}$
          </span>
          <span className={style["low-day"]}>
            <FontAwesomeIcon style={{ fontSize: "12px" }} icon={faDownLong} />
            {numberFormatter(coin.low_24h)}$
          </span>
        </div>
        <div className={style["market-cap-container"]}>
          <p className={"market-cap"}>
            Market Cap: {numberFormatter(coin.market_cap)}{" "}
            <span
              className={`${style["market-cap-rate"]} ${
                style[rateDetermine(coin.market_cap_change_percentage_24h)]
              }`}
            >
              {coin.market_cap_change_percentage_24h.toFixed(2)}%
            </span>
          </p>
        </div>
      </div>
      <div className={style["chart-container"]}>
        <ResponsiveContainer>
          <AreaChart data={chartData}>
            <Area
              type="monotone"
              fill={`${isHigh ? "#9fff9f" : "#f95b5b"}`}
              fillOpacity={0.6}
              stroke="none"
              dataKey="price"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </li>
  );
};

export default CoinItem;
