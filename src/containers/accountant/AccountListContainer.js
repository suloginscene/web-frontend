import React from 'react';
import AccountList from "../../components/accountant/AccountList";

function AccountListContainer() {

  const accounts = [{
    "id": 6,
    "name": "ASSET",
    "type": "Asset",
    "_links": {
      "self": {
        "href": "http://localhost:8080/api/accounts/6"
      }
    }
  }, {
    "id": 7,
    "name": "LIABILITY",
    "type": "Liability",
    "_links": {
      "self": {
        "href": "http://localhost:8080/api/accounts/7"
      }
    }
  }, {
    "id": 8,
    "name": "REVENUE",
    "type": "Revenue",
    "_links": {
      "self": {
        "href": "http://localhost:8080/api/accounts/8"
      }
    }
  }, {
    "id": 9,
    "name": "EXPENSE",
    "type": "Expense",
    "_links": {
      "self": {
        "href": "http://localhost:8080/api/accounts/9"
      }
    }
  }];


  return (
    <AccountList
      accounts={accounts}
    />
  );
}

export default AccountListContainer;
