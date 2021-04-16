import React, {useEffect} from 'react';
import Ledger from "../../components/accountant/Ledger";
import {useDispatch, useSelector} from "react-redux";
import {getLedger} from "../../modules/accountant";
import toErrorMessage from "../../lib/error/toErrorMessage";
import Loading from "../../components/common/Loading";

function LedgerContainer() {
  const dispatch = useDispatch();
  const {jwt} = useSelector(({member}) => ({jwt: member.jwt}));
  const {getLedgerLink, ledger, errorResponse} = useSelector(({accountant}) => ({
    getLedgerLink: accountant.links.getLedger,
    ledger: accountant.ledger,
    errorResponse: accountant.errorResponse
  }));

  useEffect(() => {
    dispatch(getLedger(getLedgerLink, jwt));
  }, [dispatch, getLedgerLink, jwt]);

  useEffect(() => {
    if (errorResponse) {
      alert(toErrorMessage(errorResponse));
    }
  }, [errorResponse]);


  return ledger ? (
    <Ledger
      ledger={ledger}
    />
  ) : <Loading/>;
}

export default LedgerContainer;
