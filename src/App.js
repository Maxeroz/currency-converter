// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [selectCurrency1, setSelectCurrency1] = useState("USD");
  const [selectCurrency2, setSelectCurrency2] = useState("EUR");
  const [output, setOutput] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const controller = new AbortController();

  async function fetchCurrency() {
    setIsLoading(true);
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${inputValue}&from=${selectCurrency1}&to=${selectCurrency2}`,
      { signal: controller.signal }
    );

    const data = await res.json();

    setOutput(data.rates[selectCurrency2]);
    setIsLoading(false);
  }

  useEffect(
    function () {
      if (!inputValue || selectCurrency1 === selectCurrency2) {
        setOutput(inputValue);
        return;
      }
      fetchCurrency();

      // return function () {
      //   controller.abort();
      // };
    },
    [inputValue, selectCurrency1, selectCurrency2]
  );

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={selectCurrency1}
        onChange={(e) => setSelectCurrency1(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={selectCurrency2}
        onChange={(e) => setSelectCurrency2(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {output} {selectCurrency2}
      </p>
    </div>
  );
}
