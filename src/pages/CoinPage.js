// Routing
import { useParams } from "react-router-dom";

// Api
import { useGetCoinQuery, useGetCoinChartQuery } from "../service/api/coinsApi";

// Styles
import style from "../styles/coin/coin-page.module.css";

// Helper functions
import { numberFormatter, rateDetermine } from "../helpers/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownLong, faUpLong } from "@fortawesome/free-solid-svg-icons";

// Recharts
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
} from "recharts";

// Constants
import { dates } from "../constants/constants";

const CoinPage = () => {
  const { coinId } = useParams();
  const {
    data: coin,
    isFetching: isFetchingCoin,
    isSuccess: isSuccessCoin,
    isError: isErrorCoin,
  } = useGetCoinQuery(coinId);
  const {
    data: coinChartData,
    isFetching: isFetchingChart,
    isSuccess: isSuccessChart,
    isError: isErrorChart,
  } = useGetCoinChartQuery(coinId);

  let chartData = [];
  if (isSuccessChart) {
    const { market_caps, prices, total_volumes } = coinChartData;
    for (let index = 0; index < market_caps.length; index++) {
      const date = new Date(prices[index][0]);
      chartData.push({
        date: `${date.getDate()} ${dates.months[date.getMonth()]}`,
        price: prices[index][1],
        market_cap: market_caps[index][1],
        total_volume: total_volumes[index][1],
      });
    }
    console.log(chartData);
  }

  let content;
  if (isFetchingCoin) {
    content = (
      <>
        <span className={style["loading-message"]}>Loading ...</span>
      </>
    );
  } else if (isSuccessCoin) {
    console.log(coin);
    const { name, market_data, image } = coin;
    const {
      current_price,
      price_change_percentage_24h_in_currency: price_change,
      market_cap,
      market_cap_change_percentage_24h_in_currency: market_cap_change,
      high_24h,
      low_24h,
    } = market_data;
    content = (
      <>
        <div className={style["coin-data-container"]}>
          <div className={style["coin-header"]}>
            <h4>{name}</h4>
          </div>
          <div className={style["image-container"]}>
            <img src={image.large} alt={coin.id} />
          </div>
          <div className={style["market-data"]}>
            <div className={style["price-container"]}>
              <p>
                Price: {numberFormatter(current_price.usd)}${" "}
                <span
                  className={`${style["price-change"]} ${
                    style[rateDetermine(price_change.usd)]
                  }`}
                >
                  {price_change.usd.toFixed(2)}%
                </span>
              </p>
            </div>
            <div className={style["high-and-low-prices"]}>
              <span className={style["high-day"]}>
                <FontAwesomeIcon style={{ fontSize: "12px" }} icon={faUpLong} />
                {numberFormatter(high_24h.usd)}$
              </span>
              <span className={style["low-day"]}>
                <FontAwesomeIcon
                  style={{ fontSize: "12px" }}
                  icon={faDownLong}
                />
                {numberFormatter(low_24h.usd)}$
              </span>
            </div>
            <div className={style["market-cap-container"]}>
              <p className={"market-cap"}>
                Market Cap: {numberFormatter(market_cap.usd)}{" "}
                <span
                  className={`${style["market-cap-rate"]} ${
                    style[rateDetermine(market_cap_change.usd)]
                  }`}
                >
                  {market_cap_change.usd.toFixed(2)}%
                </span>
              </p>
            </div>
          </div>
          <div className={style["chart-container"]}>
            <ResponsiveContainer>
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 80,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="5 5" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#525252",
                    color: "#525252",
                  }}
                />
                <Legend
                  wrapperStyle={{
                    bottom: "-5px",
                  }}
                />
                <XAxis stroke="#fff" fillOpacity={0.8} dataKey="date" />
                <YAxis stroke="#fff" fillOpacity={0.8} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#FFD700"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="market_cap"
                  stroke="#9fff9f"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="total_volume"
                  stroke="#f95b5b"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={style["coin-container"]}>{content}</div>
    </>
  );
};

export default CoinPage;
