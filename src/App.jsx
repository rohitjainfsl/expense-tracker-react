import { useRef, useState } from "react";

function App() {
  const [budget, setBudget] = useState({
    total: 0,
    spent: 0,
    remaining: 0,
  });
  const [form, setForm] = useState({
    detail: "",
    amount: 0,
  });
  const [expenses, setExpenses] = useState([]);
  const [stage, setStage] = useState(0);

  const sno = useRef(1);

  function startExpenseTracker() {
    setBudget({ ...budget, remaining: budget.total });
    setStage(1);
  }

  function handleSubmit(e) {
    e.preventDefault();

    //create expense
    const expense = {
      id: Date.now(),
      sno: sno.current,
      detail: form.detail,
      amount: form.amount,
    };
    setExpenses([...expenses, expense]);

    //adjust budget
    setBudget({
      ...budget,
      spent: Number(budget.spent) + Number(form.amount),
      remaining: budget.remaining - form.amount,
    });

    //increment serial number
    sno.current += 1;

    //reset the form
    setForm({
      detail: "",
      amount: 0,
    });
  }

  return (
    <>
      <div className={`budgetDiv ${stage > 0 ? `unUseAble` : `useAble`}`}>
        <input
          type="text"
          placeholder="Enter budget for this month"
          value={budget.total}
          onChange={(e) => setBudget({ ...budget, total: e.target.value })}
        />
        <button type="submit" onClick={startExpenseTracker}>
          Set Budget
        </button>
      </div>

      <div
        className={`expenseTracker ${stage === 0 ? `unUseAble` : `useAble`}`}
      >
        <div className="info">
          <div className="total">
            <p>
              <strong>Total: </strong>
              <span>{budget.total > 0 ? budget.total : ""}</span>
            </p>
          </div>
          <div className="spent">
            <p>
              <strong>Spent: </strong> <span>{budget.spent}</span>
            </p>
          </div>
          <div className="remaining">
            <p>
              <strong>Remaining: </strong> <span>{budget.remaining}</span>
            </p>
          </div>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Expense Details"
            value={form.detail}
            onChange={(e) => setForm({ ...form, detail: e.target.value })}
          />
          <input
            type="text"
            placeholder="Expense Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
          <button type="submit">Add Expense</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>S.no</th>
              <th>Info</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => {
              return (
                <tr key={expense.id}>
                  <td>{expense.sno}</td>
                  <td>{expense.detail}</td>
                  <td>{expense.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
