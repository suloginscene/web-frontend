import React from 'react';
import './Ledger.scss';

const transactionNameMap = {
  SELL: '판매',
  PURCHASE_BY_CASH: '현금',
  PURCHASE_BY_CREDIT: '신용',
  BORROW: '대출',
  REPAY: '상환',
  TRANSFER: '이동'
};

function TransactionItem({type, amount, debit, credit, description, createdAt}) {
  return (
    <tr>
      <td className={"date"}>{createdAt.substring(5, 10)}</td>
      <td className={"transaction-name"}>{transactionNameMap[type]}</td>
      <td className={"account-name"}>{credit}</td>
      <td className={"account-name"}>{debit}</td>
      <td className={"amount"}>{amount.toLocaleString()} 원</td>
      <td className={"description"}>{description}</td>
    </tr>
  );
}

function Ledger({ledger}) {
  const transactions = ledger.doubleTransactions.map((transaction, index) => (
      <TransactionItem
        key={index}
        type={transaction.type}
        amount={transaction.amount}
        debit={transaction.debit}
        credit={transaction.credit}
        description={transaction.description}
        createdAt={transaction.createdAt}
      />
    )
  ).reverse();

  return (
    <div className={"ledger"}>
      <h3>장부</h3> <span>총 {transactions.length} 건</span>
      <div className={"transactions"}>
        <table>
          <thead>
            <tr>
              <th>날짜</th>
              <th>종류</th>
              <th>출발</th>
              <th>도착</th>
              <th>금액</th>
              <th className={"description"}>설명</th>
            </tr>
          </thead>
          <tbody>
            {transactions}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Ledger;
