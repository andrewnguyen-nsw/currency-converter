import React, { useState, useEffect } from "react";
import clsx from 'clsx';
import CurrencyInput from "../CurrencyInput/CurrencyInput";
import SwitchButton from "../SwitchButton/SwitchButton";
import styles from "./CurrencyConverter.module.css"

// API source: https://currencybeacon.com/api-documentation
const apiKey = "b654fac5cfd743c43b31f9446d690ca6";
const baseUrl = "https://api.currencybeacon.com/v1";
const latestRatesEndpoint = "/latest";
const requestParams = `?api_key=${apiKey}`;
const urlGetLastestRates = `${baseUrl}${latestRatesEndpoint}${requestParams}`;

function CurrencyConverter(props) {
  const [currencyList, setCurrencyList] = useState([]);
  const [fromAmount, setFromAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toAmount, setToAmount] = useState(1);
  const [toCurrency, setToCurrency] = useState("AUD");
  const [rateList, setRateList] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(urlGetLastestRates);
        if (response.ok) {
          const data = await response.json();
          setRateList(data.response.rates);
          setCurrencyList(Object.keys(data.response.rates));
          console.log(">> fetch API successfully");
          console.log(data.response);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    // API need time to be called, so we only do this step once the API-call is completed (once rateList exist)
    if (!!rateList) {
      setToAmount(
        formatAmount(
          (fromAmount * rateList[toCurrency]) / rateList[fromCurrency]
        )
      );
    }
  }, [rateList]);

  function formatAmount(amount) {
    return amount.toFixed(3);
  }

  const handleFromAmountChange = ({ target }) => {
    const amount = target.value;
    setFromAmount(amount);
    setToAmount(
      formatAmount((amount * rateList[toCurrency]) / rateList[fromCurrency])
    );
  };

  const handleFromCurrencyChange = ({ target }) => {
    const newFromCurrency = target.value;
    setFromCurrency(newFromCurrency);
    setToAmount(
      formatAmount(
        (fromAmount * rateList[toCurrency]) / rateList[newFromCurrency]
      )
    );
  };

  const handleToCurrencyChange = ({ target }) => {
    const newToCurrency = target.value;
    setToCurrency(newToCurrency);
    setFromAmount(
      formatAmount(
        (toAmount * rateList[fromCurrency]) / rateList[newToCurrency]
      )
    );
  };

  const handleSwitchCurrency = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setToAmount(
      formatAmount((fromAmount * rateList[fromCurrency]) / rateList[toCurrency])
    );
  };

  // Return JSX
  return (
    <section className={styles.converterSection}>
      <div className={styles.converterContainer}>
        <h1 className={clsx(styles.converterHeading, "heading")}>Currency Converter</h1>
        <div className={styles.converter}>
          <div className={styles.converterInput}>
            <CurrencyInput
              currency={fromCurrency}
              currencies={currencyList}
              amount={fromAmount}
              onAmountChange={handleFromAmountChange}
              onCurrencyChange={handleFromCurrencyChange}
            />
            <CurrencyInput
              currency={toCurrency}
              currencies={currencyList}
              amount={toAmount}
              onCurrencyChange={handleToCurrencyChange}
              isDisabled={true}
            />
          </div>
          <div className={styles.converterSwitchButton}>
            <SwitchButton onButtonClick={handleSwitchCurrency} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CurrencyConverter;
