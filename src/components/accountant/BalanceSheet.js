import React from 'react';
import './BalanceSheet.scss';

function AccountItem({account}) {
  return (
    <tr>
      <td>{account.name}</td>
      <td className={"balance"}>{account.balance.toLocaleString()} 원</td>
    </tr>
  );
}

function BalanceSheet({balanceSheet}) {
  const assets = balanceSheet.assets.map(asset =>
    <AccountItem key={asset.id} account={asset}/>);
  const liabilities = balanceSheet.liabilities.map(liability =>
    <AccountItem key={liability.id} account={liability}/>);

  return (
    <div className={"balance-sheet"}>
      <h3>재무상태표</h3>
      <div className={"net"}>
        순 자산 &nbsp; {balanceSheet.total.net.toLocaleString()} 원
      </div>
      <div className={"detail"}>
        <table>
          <thead>
            <tr>
              <th>자산</th>
              <th>{balanceSheet.total.assetSum.toLocaleString()} 원</th>
            </tr>
          </thead>
          <tbody>
            {assets}
          </tbody>
        </table>
        <div className={"vertical-line"}/>
        <table>
          <thead>
            <tr>
              <th>부채</th>
              <th>{balanceSheet.total.liabilitySum.toLocaleString()} 원</th>
            </tr>
          </thead>
          <tbody>
            {liabilities}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BalanceSheet;
