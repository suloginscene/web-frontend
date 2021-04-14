import React from 'react';
import BalanceSheet from "../../components/accountant/BalanceSheet";

function BalanceSheetContainer() {
  const balanceSheet = {
    "total": {
      "liabilitySum": 70000,
      "assetSum": 30000,
      "net": -40000
    },
    "assets": [{
      "id": 32,
      "name": "현금",
      "balance": 100000
    }, {
      "id": 33,
      "name": "국민 저축",
      "balance": 20000
    }],
    "liabilities": [{
      "id": 34,
      "name": "신용",
      "balance": 30000
    }, {
      "id": 35,
      "name": "김철수",
      "balance": 40000
    }]
  };

  return (
    <BalanceSheet
      balanceSheet={balanceSheet}
    />
  );
}

export default BalanceSheetContainer;
