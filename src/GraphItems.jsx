import { useState, useEffect } from "react";

export default function GraphItems({ formData }) {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (formData && formData.length > 0) {
      setTotalAmount(formData.reduce((acc, item) => acc + item.amount, 0));
    }
  }, [formData]);

  return (
    <div className="GraphItems rounded-2xl h-48 w-full bg-white flex justify-around text-4xl font-black bg-violet-950 items-center">
      <div className="flex-row gap-5">
        <h1 className="mb-2">Total Expense : </h1>
        <div className="flex items-center justify-center gap-2">
          <p className="text-base font-thin">
            Your total expense represents the sum of all your expenditures
          </p>
          <img className="w-5 h-5" src="./right.png" alt="right" />
        </div>
      </div>
      <div className="totalExpense p-6 rounded-xl">
        <h1>{totalAmount} Rs.</h1>
      </div>
    </div>
  );
}
