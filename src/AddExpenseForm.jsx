import { useEffect, useState } from "react";

export default function AddExpenseForm({ formData, setFormData }) {
  const [where, setWhere] = useState("");
  const [amount, setAmount] = useState();
  const [date, setDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [description, setDescription] = useState("");

  const [status, setStatus] = useState(false);

  useEffect(() => {
    setStatus(where !== "" && amount > 0 && paymentMethod !== "");
  }, [where, amount, paymentMethod]);

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    setDate(formattedDate);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData((prev) => [
      ...prev,
      {
        where: where,
        amount: amount,
        date: date,
        paymentMethod: paymentMethod,
        description: description,
      },
    ]);
  };
  // console.log(formData);

  return (
    <div className="Add_form w-5/12 h-full text-xl gap-2 rounded">
      <form
        className="px-10 flex flex-col justify-around"
        onSubmit={handleSubmit}
      >
        <h1 className="Add_Expense text-2xl font-bold text-center my-4">
          Add Expense
        </h1>
        <div className="flex justify-between mb-5">
          <label>
            Where do you spend?<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="where"
            onChange={(e) => setWhere(e.target.value)}
            placeholder="Enter where you spend"
          />
        </div>
        <div className="flex justify-between mb-5">
          <label>
            How much do you spend?<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="amount"
            onChange={(e) => setAmount(Number(e.target.value))}
            value={amount}
            placeholder="Enter Amount"
          />
        </div>
        <div className="flex justify-between mb-5">
          <label>
            Date<span className="text-red-500">*</span>:
          </label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <p>
            Via<span className="text-red-500">*</span>:
          </p>
          <ul>
            <li>
              <input
                type="radio"
                name="paymentMethod"
                id="cash"
                value="cash"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="cash">Cash</label>
            </li>
            <li>
              <input
                type="radio"
                name="paymentMethod"
                id="upi"
                value="upi"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="upi">UPI</label>
            </li>
            <li>
              <input
                type="radio"
                name="paymentMethod"
                id="netbanking"
                value="netbanking"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="netbanking">Netbanking</label>
            </li>
            <li>
              <input
                type="radio"
                name="paymentMethod"
                id="creditCard"
                value="creditCard"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="creditCard">Credit Card</label>
            </li>
          </ul>
        </div>
        <p>Description:</p>
        <input
          type="text"
          name="description"
          id="Description"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description (optional)"
        />

        {status && (
          <div className="mt-8 flex justify-center">
            <button
              className="bg-blue-500 p-2 rounded text-white font-bold hover:scale-110"
              type="submit"
            >
              Add Expense
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
