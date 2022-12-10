import "./App.css";
import GlobalStyles from "./components/GlobalStyles/GlobalStyles";
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter";
import FullCurrencyList from "./components/FullCurrencyList/FullCurrencyList";

function App() {
  return (
    <GlobalStyles>
      <div className="App">
        <CurrencyConverter />
        <FullCurrencyList />
      </div>
    </GlobalStyles>
  );
}

export default App;
