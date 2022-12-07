import React, { useEffect, useState } from "react";
import "./ExpnensesTracker.css";

export const ExpensesTracker = () => {
  const initialState = {
    name: "",
    amount: "",
    catagory: "",
  };
  const [expList, setExpList] = useState([]);
  const [expense, setExpense] = useState(initialState);
  const [expPerc, setExpPerc] = useState({
	  food: 100,
	  travel: 100,
	  shopping: 100,
	  other: 100,
	});
	
	let newSum = 0;
	const [totalExp, setTotalExp] = useState({
	  Food: 0,
	  Travel: 0,
	  Shopping: 0,
	  Other: 0,
	});
	
  for (const property in totalExp) {
    newSum = newSum + totalExp[property];
  }

  

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      expense.name === "" ||
      !parseInt(expense.amount) ||
      parseInt(expense.amount) < 0 ||
      expense.catagory===""
    ) {
     if (expense.name==="") {
        alert("Expense Name required");
      }
      else if (!parseInt(expense.amount) || parseInt(expense.amount) < 0) {
        alert("Expense Amount required and should be greater than 0");
      }
     else if (expense.catagory==="") {
        alert("Please Choose Expense Type");
      }
    } else {
      setExpList((prevState) => [...prevState, expense]);
    }
  };

  const handleChange = (event) => {
    event.persist();
    setExpense((prevState) => ({
      ...prevState,
      [event?.target?.name]: event?.target?.value,
    }));
  };

  useEffect(() => {
    const temp = expList?.forEach((expense) => {
      setTotalExp({
        ...totalExp,
        [expense?.catagory]:
          parseInt(totalExp[expense?.catagory]) + parseInt(expense?.amount),
      });
    });
  }, [expList]);

  const { Food, Travel, Shopping, Other } = totalExp;

  useEffect(() => {
    if (
      totalExp?.Food ||
      totalExp?.Travel ||
      totalExp?.Shopping ||
      totalExp?.Other
    ) {
      setExpPerc({
        food: totalExp?.Food ? (totalExp?.Food * 100) / newSum : 0,
        travel: totalExp?.Travel
          ? (totalExp?.Travel * 100) / newSum
          : 0,
        shopping: totalExp?.Shopping
          ? (totalExp?.Shopping * 100) / newSum
          : 0,
        other: totalExp?.Other ? (totalExp?.Other * 100) / newSum : 0,
      });
    }
  }, [Food, Travel, Shopping, Other]);

  return (
    <div className="mt-50 layout-column justify-content-center align-items-center">
      <div>
        <form onSubmit={handleSubmit}>
          <section
            className="my-30 layout-row align-items-center justify-content-center"
            style={{ width: "1000px" }}
          >
            <input
              type="text"
              value={expense?.name}
              placeholder="New Expense"
              style={{ width: "40%", marginRight: "10px" }}
              name="name"
              data-testid="expense-name"
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Enter Amount"
              style={{ width: "40%" }}
              name="amount"
              value={expense?.amount}
              data-testid="expense-amount"
              onChange={handleChange}
            />
            <select
              className="ml-2"
              name="catagory"
              onChange={handleChange}
              data-testid="expense-type"
            >
              <option disabled selected>
                Select Type
              </option>
              <option data-testid="expense-type-1" value={"Food"}>
                Food
              </option>
              <option data-testid="expense-type-2" value={"Travel"}>
                Travel
              </option>
              <option data-testid="expense-type-3" value={"Shopping"}>
                Shopping
              </option>
              <option data-testid="expense-type-4" value={"Other"}>
                Other
              </option>
            </select>
            <button
              type="submit"
              style={{ width: "20%" }}
              data-testid="expense-submit-button"
            >
              Add Expense
            </button>
          </section>
        </form>
      </div>
      <div className="flex" style={{ width: "100%" }}>
        <div style={{ width: "48%" }} className="mx-5 m-10 card">
          <p className="title">Expense List</p>
          <table>
            <thead>
              <tr>
                <td>Sr No</td>
                <td>Expense</td>
                <td>Amount</td>
                <td>Catagory</td>
              </tr>
            </thead>
            <tbody>
              {expList?.map((expense, id) => (
                <tr key={id}>
                  <td>{id + 1}</td>
                  <td>{expense?.name}</td>
                  <td>{expense?.amount}</td>
                  <td>{expense?.catagory}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card ml-5 m-10" style={{ width: "50%" }}>
          <p className="title">Expenses Breakdown</p>
          <br />
          <div style={{ height: "30px", display: "flex" }}>
            <div
              data-testid="expense-distribution-food"
              style={{
                width: `${expPerc?.food}%`,
              }}
              className="lightblue"
            ></div>
            <div
              data-testid="expense-distribution-travel"
              style={{
                width: `${expPerc?.travel}%`,
              }}
              className="red"
            ></div>
            <div
              data-testid="expense-distribution-shopping"
              style={{
                width: `${expPerc?.shopping}%`,
              }}
              className="lightgreen"
            ></div>
            <div
              data-testid="expense-distribution-other"
              style={{
                width: `${expPerc?.other}%`,
              }}
              className="orange"
            ></div>
          </div>
          <br />
          <div className="flex ml-10 mb-2">
            <div className="lightblue hight-20 width-20"></div> &nbsp; Food
          </div>
          <div className="flex ml-10 mb-2">
            <div className="red hight-20 width-20"></div> &nbsp; Travel
          </div>
          <div className="flex ml-10 mb-2">
            <div className="lightgreen hight-20 width-20"></div> &nbsp; Shopping
          </div>
          <div className="flex ml-10 mb-10">
            <div className="orange hight-20 width-20"></div> &nbsp; Other
          </div>
        </div>
      </div>
    </div>
  );
};
