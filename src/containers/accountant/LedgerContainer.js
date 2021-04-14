import React from 'react';
import Ledger from "../../components/accountant/Ledger";

function LedgerContainer() {
  const ledger = {
    "doubleTransactions": [{
      "type": "SELL",
      "amount": 1,
      "debit": "ASSET",
      "credit": "REVENUE",
      "description": "설명",
      "createdAt": "2021-04-13 21:41:33"
    }, {
      "type": "PURCHASE_BY_CASH",
      "amount": 1,
      "debit": "ASSET",
      "credit": "REVENUE",
      "description": "설명",
      "createdAt": "2021-04-13 21:41:33"
    }, {
      "type": "SELL",
      "amount": 1000000001,
      "debit": "현대 신용",
      "credit": "국민 저축 예금 통장",
      "description": "설명",
      "createdAt": "2021-04-13 21:41:33"
    }]
  };

  return (
    <Ledger
      ledger={ledger}
    />
  );
}

export default LedgerContainer;
