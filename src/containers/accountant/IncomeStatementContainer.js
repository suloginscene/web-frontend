import React from 'react';
import IncomeStatement from "../../components/accountant/IncomeStatement";

function IncomeStatementContainer() {
  const incomeStatement = {
    "start": "2021-04-13",
    "inclusiveEnd": "2021-04-13",
    "days": 1,
    "total": {
      "revenueSum": 1,
      "expenseSum": 9876543210,
      "profit": -1
    },
    "revenues": [{
      "id": 26,
      "name": "REVENUE",
      "occurred": 9876543210,
      "monthlyBudget": 9876543210
    }],
    "expenses": [{
      "id": 28,
      "name": "EXPENSE",
      "occurred": 1,
      "monthlyBudget": 30
    }, {
      "id": 30,
      "name": "EXPENSE",
      "occurred": 1,
      "monthlyBudget": 30
    }]
  };

  return (
    <IncomeStatement
      incomeStatement={incomeStatement}
    />
  );
}

export default IncomeStatementContainer;
