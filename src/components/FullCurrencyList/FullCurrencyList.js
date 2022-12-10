import React, { useState, useEffect } from "react";
import styles from "./FullCurrencyList.module.css";
import clsx from "clsx";

const apiKey = "b654fac5cfd743c43b31f9446d690ca6";
const baseUrl = "https://api.currencybeacon.com/v1";
const fullCurrencyListEndpoint = "/currencies";
const requestParams = `?api_key=${apiKey}`;
const urlGetFullCurrencyList = `${baseUrl}${fullCurrencyListEndpoint}${requestParams}`;

function FullCurrencyList() {
  const [fullList, setFullList] = useState({});
  const [searchQuery, setSearchQuery] = useState([]);
  const [searchResult, setSearchResult] = useState(["all"]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(urlGetFullCurrencyList);
        if (response.ok) {
          const data = await response.json();
          setFullList(data.response.fiats);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // The returned data is a object, we need to convert it to an array to use the 'map' methods
  const fullListArray = Object.keys(fullList).map((key) => {
    return fullList[key];
  });

  // Remove 'un-real' currency
  const filteredFullListArray = fullListArray.filter(
    (item) => !['UYI', 'XBA', 'XBB', 'XBC', 'XBD', 'USN', 'MXV', 'COU', 'XXX'].includes(item.currency_code)
  );

  // Get List of Currency Names
  const currencyNameList = [];
  filteredFullListArray.map((item) => {
    currencyNameList.push(item.currency_name);
  });

  // Handle Search method
  const handleSearch = (e) => {
    const input = e.target.value;
    setSearchQuery(input);
    setSearchResult(
      currencyNameList.filter((name) => {
        return name.toLowerCase().includes(input.toLowerCase());
      })
    );
  };

  const search = (items) => {
    if (searchResult == "all") {
      return items;
    } else if (searchResult.length === 0) {
      return [];
    } else {
      return items.filter((item) => searchResult.includes(item.currency_name));
    }
  };

  // Return JSX
  return (
    <section className={styles.fullListSection}>
      <div className={styles.fullListContainer}>
        <h1 className={clsx(styles.fullListHeading, "heading")}>
          Find your currency
        </h1>
        <input
          type="text"
          placeholder="Example: Australian dollar"
          value={searchQuery}
          onChange={handleSearch}
          className={styles.fullListSearchInput}
        />

        <div className={styles.fullListContent}>
          {search(filteredFullListArray).length === 0 ? (
            <div>There is no results for '{searchQuery}'</div>
          ) : (
            search(filteredFullListArray).map((currency) => {
              return (
                <div className={styles.fullListCurrencyItem} key={currency.currency_code}>
                  <div className={styles.fullListCurrencyCode}>{currency.currency_code}</div>
                  <div className={styles.fullListCurrencyName}>{currency.currency_name}</div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default FullCurrencyList;
