import { useState, useEffect } from "react";
import Transaction from "./Transaction";

export function ExpenseList({ formData, handleDelete }) {
  const [selectedSortMethod, setSelectedSortMethod] = useState("newest");
  const [sortedData, setSortedData] = useState([]);

  const sortData = () => {
    if (selectedSortMethod === "newest") {
      const sortedDataByDate = [...formData].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setSortedData(sortedDataByDate);
    } else if (selectedSortMethod === "high") {
      const sortedDatabyAmount = [...formData].sort(
        (a, b) => b.amount - a.amount
      );
      setSortedData(sortedDatabyAmount);
    }
  };

  useEffect(() => {
    sortData();
    // eslint-disable-next-line
  }, [formData, selectedSortMethod]);
  // console.log(sortedData);
  return (
    <div className="Expenselist w-5/12 h-full rounded text-xl bg-gray-500/15 px-8 py-2">
      <h1 className="Expense text-2xl font-bold text-center my-4">
        Expense list
      </h1>
      <label>Sort by: </label>

      <button
        onClick={() => setSelectedSortMethod("newest")}
        className={`h-10 bg-${
          selectedSortMethod === "newest" ? "blue" : "gray"
        }-500 w-32 rounded-md font-bold text-white text-center flex-col justify-center items-center hover:scale-110`}
        value="newest"
      >
        Newest
      </button>
      <button
        onClick={() => setSelectedSortMethod("high")}
        className={`ml-3 h-10 bg-${
          selectedSortMethod === "high" ? "blue" : "gray"
        }-500 w-32 rounded-md font-bold text-white text-center flex-col justify-center items-center hover:scale-110`}
        value="high"
      >
        High
      </button>
      <div className="Transactions   h-5/6 p-1 mt-1 w-full ">
        {sortedData.length > 0 ? (
          sortedData.map((data, index) => (
            <Transaction
              key={index}
              ele={data}
              onDelete={() => handleDelete(index)}
            />
          ))
        ) : (
          <div className="flex justify-center w-full items-center h-5/6">
            <h1>No Transactions yet ❌</h1>
          </div>
        )}
      </div>
    </div>
  );
}
