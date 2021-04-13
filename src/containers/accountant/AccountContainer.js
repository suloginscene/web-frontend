import React from 'react';
import Account from "../../components/accountant/Account";

function AccountContainer({id}) {
  const account = {
    "id": 11,
    "name": "ASSET",
    "type": "Revenue",
    "moneyAmount": 4,
    "singleTransactions": [{
      "type": "INCREASE",
      "amount": 1,
      "description": "설명",
      "createdAt": "2021-04-13 21:41:29"
    }, {
      "type": "INCREASE",
      "amount": 1,
      "description": "설명",
      "createdAt": "2021-04-13 21:41:29"
    }, {
      "type": "INCREASE",
      "amount": 1,
      "description": "설명",
      "createdAt": "2021-04-13 21:41:29"
    }],
    "_links": {
      "changeName": {
        "href": "http://localhost:8080/api/accounts/11/name"
      },
      "changeBudget": {
        "href": "http://localhost:8080/api/accounts/11/budget"
      },
      "deleteAccount": {
        "href": "http://localhost:8080/api/accounts/11"
      }
    }
  };

  return (
    <Account
      account={account}
    />
  );
}

export default AccountContainer;
