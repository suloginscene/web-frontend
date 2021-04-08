import React from 'react';
import {Link} from "react-router-dom";

function AccountListPage() {
  return (
    <>
      AccountListPage
      <Link to={"/account/:id"}>계정</Link>
    </>
  );
}

export default AccountListPage;
