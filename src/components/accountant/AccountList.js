import React from 'react';
import './AccountList.scss';
import {Link} from "react-router-dom";

function AccountItem({id, name}) {
  return (
    <div className={"account-item"}>
      <Link to={`/account/${id}`}>{name}</Link>
    </div>
  );
}

function AccountList({accounts, form, onChange, onSubmit, errorMessage}) {
  const [assets, liabilities, revenues, expenses] = [[], [], [], []];

  accounts.forEach(account => {
    const accountItem = <AccountItem key={account.id} id={account.id} name={account.name}/>;
    switch (account.type) {
      case "Asset":
        assets.push(accountItem);
        break;
      case "Liability":
        liabilities.push(accountItem);
        break;
      case "Revenue":
        revenues.push(accountItem);
        break;
      case "Expense":
        expenses.push(accountItem);
        break;
      default:
        throw new Error("타입이 적절하지 않습니다.");
    }
  });

  return (
    <div className={"account-list"}>

      <div className={"list"}>
        <h3>계정 목록</h3>
        <table>
          <tbody>
            <tr>
              <th>자산</th>
              <td>{assets}</td>
            </tr>
            <tr>
              <th>부채</th>
              <td>{liabilities}</td>
            </tr>
            <tr>
              <th>수입</th>
              <td>{revenues}</td>
            </tr>
            <tr>
              <th>지출</th>
              <td>{expenses}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={"register"}>
        <h3>계정 등록</h3>
        <form onSubmit={onSubmit}>
          <div className={"radio-area"}>
            <input name={"type"} value={"ASSET"} type={"radio"} id={"asset"} onChange={onChange}/>
            <label htmlFor={"asset"}>자산</label>
            <input name={"type"} value={"LIABILITY"} type={"radio"} id={"liability"} onChange={onChange}/>
            <label htmlFor={"liability"}>부채</label>
            <input name={"type"} value={"REVENUE"} type={"radio"} id={"revenue"} onChange={onChange}/>
            <label htmlFor={"revenue"}>수입</label>
            <input name={"type"} value={"EXPENSE"} type={"radio"} id={"expense"} onChange={onChange}/>
            <label htmlFor={"expense"}>지출</label>
          </div>
          <div className={"input-area"}>
            <input
              name={"name"}
              type={"text"}
              placeholder={"이름"}
              onChange={onChange}
              value={form.name}
            />
            <input
              name={"money"}
              type={"text"}
              placeholder={"잔액 혹은 예산"}
              onChange={onChange}
              value={form.money}
            />
          </div>
          {errorMessage ? <div className={"error"}>{errorMessage}</div> : <></>}
          <button>계정 등록</button>
        </form>
      </div>

    </div>
  );
}

export default AccountList;
