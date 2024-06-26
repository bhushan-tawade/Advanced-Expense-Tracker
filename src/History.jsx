import React, { useEffect, useState } from "react";
import GraphComponent from "./GraphComponent";
import GraphItems from "./GraphItems";
import { LatestTransaction } from "./latestTransaction";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function History({ formData }) {
  const [aggregatedData, setAggregatedData] = useState([]);
  const [paymentMethodData, setPaymentMethodData] = useState([]);

  useEffect(() => {
    const aggregateData = () => {
      const result = formData.reduce((acc, current) => {
        const { date, amount } = current;
        const existingEntry = acc.find((entry) => entry.date === date);
        if (existingEntry) {
          existingEntry.amount += amount;
        } else {
          acc.push({ date, amount });
        }
        return acc;
      }, []);
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
      setAggregatedData(result);
    };

    const calculatePaymentMethodData = () => {
      const result = formData.reduce((acc, current) => {
        const { paymentMethod, amount } = current;
        const existingEntry = acc.find(
          (entry) => entry.paymentMethod === paymentMethod
        );
        if (existingEntry) {
          existingEntry.amount += amount;
        } else {
          acc.push({ paymentMethod, amount });
        }
        return acc;
      }, []);
      setPaymentMethodData(result);
    };

    aggregateData();
    calculatePaymentMethodData();
  }, [formData]);
  // console.log(aggregatedData);

  // Define a mapping between payment methods and their colors
  const COLORS = {
    upi: "#0088FE",
    cash: "#00C49F",
    netbanking: "#FFBB28",
    creditCard: "#FF8042",
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="historyComponent flex justify-between p-0 m-0">
      <div className="Graphleft bg-white w-96 h-full flex-col justify-center items-center p-auto pt-8">
        {formData.length > 0 ? (
          <>
            <div className="PieContainer w-96 mb-5">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                  <Pie
                    data={paymentMethodData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="amount"
                  >
                    {paymentMethodData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[entry.paymentMethod]} // Use the color mapping
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center">
              <table className="flex justify-center">
                <tbody>
                  <tr>
                    <td>
                      <div
                        className="UPIbar w-5 h-5"
                        style={{ backgroundColor: COLORS["upi"] }}
                      ></div>
                    </td>
                    <td>UPI</td>
                  </tr>
                  <tr>
                    <td>
                      <div
                        className="Cashbar w-5 h-5"
                        style={{ backgroundColor: COLORS["cash"] }}
                      ></div>
                    </td>
                    <td>Cash</td>
                  </tr>
                  <tr>
                    <td>
                      <div
                        className="Netbankingbar w-5 h-5"
                        style={{ backgroundColor: COLORS["netbanking"] }}
                      ></div>
                    </td>
                    <td>Netbanking</td>
                  </tr>
                  <tr>
                    <td>
                      <div
                        className="CreditCardbar w-5 h-5"
                        style={{ backgroundColor: COLORS["creditCard"] }}
                      ></div>
                    </td>
                    <td>Credit Card</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="PieChart rounded-xl flex items-center justify-center ">
            <h1 className="mb-5 ">Pie Chart will appear here 🎯</h1>
          </div>
        )}
        {formData.length > 0 ? (
          <div className="newTransactions p-5 w-full flex-col justify-center mt-5">
            <h1 className="latest text-lg">Latest Transactions:</h1>
            {formData.slice(-4).map((ele) => (
              <LatestTransaction where={ele.where} amount={ele.amount} />
            ))}
          </div>
        ) : (
          <div className="newTransactions p-5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar />
            </LocalizationProvider>
          </div>
        )}
      </div>
      <div className="Graphright pl-10 pr-10 pt-3 gap-2 justify-around flex flex-col bg-red-500">
        <GraphComponent aggregatedData={aggregatedData} />
        <GraphItems formData={formData} />
      </div>
    </div>
  );
}
