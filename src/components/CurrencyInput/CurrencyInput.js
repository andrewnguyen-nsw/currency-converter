import clsx from "clsx";
import React from "react";
import styles from "./CurrencyInput.module.css";

function CurrencyInput(props) {
  const {
    currency,
    currencies,
    amount,
    onAmountChange,
    onCurrencyChange,
    isDisabled,
  } = props;

  return (
    <div className={styles.inputContainer}>
      <input
        type="number"
        value={amount}
        onChange={onAmountChange}
        disabled={isDisabled}
        className={styles.textInput}
      />
      <select
        value={currency}
        onChange={onCurrencyChange}
        className={styles.selectInput}
      >
        {currencies.map((currency) => {
          return (
            <option key={currency} value={currency}>
              {currency}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default CurrencyInput;
