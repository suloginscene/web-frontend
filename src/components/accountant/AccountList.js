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

function AccountList({accounts}) {
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
      <table>
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
      </table>
    </div>
  );
}

export default AccountList;
