import React from 'react';
import './IncomeStatement.scss';

function IncomeStatementForm() {
  return (
    <form>
      <div className={"date-area"}>
        <label> 시작
          <input
            name={"beginDate"}
            type={"date"}
          />
        </label>
        <label> 종료
          <input
            name={"inclusiveEndDate"}
            type={"date"}
          />
        </label>
      </div>
      <button>손익계산서 요청</button>
    </form>
  );
}

function AccountItem({account}) {
  return (
    <tr>
      <td>{account.name}</td>
      <td className={"occurred"}>{account.occurred} 원</td>
      <td className={"monthly-budget"}>{account.monthlyBudget} 원</td>
    </tr>
  );
}

function IncomeStatement({incomeStatement}) {
  const revenues = incomeStatement.revenues.map(revenue =>
    <AccountItem key={revenue.id} account={revenue}/>);
  const expenses = incomeStatement.expenses.map(expense =>
    <AccountItem key={expense.id} account={expense}/>);

  return (
    <div className={"income-statement"}>
      <IncomeStatementForm/>
      {incomeStatement ?
        <div className={"data"}>
          <div className={"heading"}>
            <h3>손익계산서</h3>
            <span>{incomeStatement.start} ~ {incomeStatement.inclusiveEnd} ({incomeStatement.days}일)</span>
          </div>
          <div className={"profit"}>
            이익 &nbsp; {incomeStatement.total.profit} 원
          </div>
          <div className={"detail"}>
            <table>
              <thead>
                <tr>
                  <th>수입</th>
                  <th>{incomeStatement.total.revenueSum} 원</th>
                  <th className={"monthly-budget"}>예산</th>
                </tr>
              </thead>
              <tbody>
                {revenues}
              </tbody>
            </table>
            <div className={"vertical-line"}/>
            <table>
              <thead>
                <tr>
                  <th>지출</th>
                  <th>{incomeStatement.total.expenseSum} 원</th>
                  <th className={"monthly-budget"}>예산</th>
                </tr>
              </thead>
              <tbody>
                {expenses}
              </tbody>
            </table>
          </div>
        </div>
        : <></>}
    </div>
  );
}

export default IncomeStatement;
