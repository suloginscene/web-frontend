import React from 'react';
import './Account.scss';

const accountNameMap = {
  Asset: '자산',
  Liability: '부채',
  Revenue: '수입',
  Expense: '지출'
};

const moneyNameMap = {
  Asset: '잔액',
  Liability: '잔액',
  Revenue: '예산',
  Expense: '예산'
};

const transactionSignMap = {
  INCREASE: '+',
  DECREASE: '-',
  OCCUR: ''
};

function TransactionItem({type, amount, description, createdAt}) {
  return (
    <tr>
      <td className={"date"}>{createdAt.substring(5, 10)}</td>
      <td className={"amount"}>{transactionSignMap[type]} {amount.toLocaleString()} 원</td>
      <td className={"description"}>{description}</td>
    </tr>
  );
}

function Account({account, form, onChange, onSubmitName, onSubmitBudget, onClickDelete}) {
  const typeName = accountNameMap[account.type];
  const moneyName = moneyNameMap[account.type];
  const transactions = account.singleTransactions.map((transaction, index) => (
      <TransactionItem
        key={index}
        type={transaction.type}
        amount={transaction.amount}
        description={transaction.description}
        createdAt={transaction.createdAt}
      />
    )
  );
  const isDeletable = (typeName === '수입' || typeName === '지출') || (account.moneyAmount === 0);

  return (
    <div className={"account"}>

      <div className={"info"}>
        <div><h3>{account.name}</h3><span>{typeName}</span></div>
        <div className={"money"}>{moneyName}: {account.moneyAmount.toLocaleString()} 원</div>
      </div>

      <div className={"configure"}>
        <div className={"row"}>
          <h4>이름 변경</h4>
          <form onSubmit={onSubmitName}>
            <input
              name={"newName"}
              type={"text"}
              placeholder={"새 이름"}
              onChange={onChange}
              value={form.newName}
            />
            <button type={"submit"}>변경</button>
          </form>
        </div>
        {(moneyName === '예산') ?
          <div className={"row"}>
            <h4>예산 변경</h4>
            <form onSubmit={onSubmitBudget}>
              <input
                name={"newBudget"}
                type={"text"}
                placeholder={"새 예산"}
                onChange={onChange}
                value={form.newBudget}
              />
              <button type={"submit"}>변경</button>
            </form>
          </div>
          : <></>}
        <div className={"row"}>
          <h4>계정 삭제</h4>
          {isDeletable ?
            <button onClick={onClickDelete}>삭제</button>
            : (
              <div className={"not-deletable"}>
                <span>잔액이 존재합니다.</span>
                <button>삭제</button>
              </div>
            )
          }
        </div>
      </div>

      <div className={"transactions"}>
        <h3>거래 기록</h3><span>총 {transactions.length} 건</span>
        <table>
          <tbody>{transactions}</tbody>
        </table>
      </div>

    </div>
  );
}

export default Account;
