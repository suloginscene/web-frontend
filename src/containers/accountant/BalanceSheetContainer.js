import React, {useEffect} from 'react';
import BalanceSheet from "../../components/accountant/BalanceSheet";
import {useDispatch, useSelector} from "react-redux";
import {getBalanceSheet} from "../../modules/accountant";
import toErrorMessage from "../../lib/error/toErrorMessage";
import Loading from "../../components/common/Loading";


function BalanceSheetContainer() {
  const dispatch = useDispatch();

  const {jwt} = useSelector(({member}) => ({jwt: member.jwt}));
  const {getBalanceSheetLink, balanceSheet, errorResponse} = useSelector(({accountant}) => ({
    getBalanceSheetLink: accountant.links.getBalanceSheet,
    balanceSheet: accountant.balanceSheet,
    errorResponse: accountant.errorResponse
  }));


  useEffect(() => {
    dispatch(getBalanceSheet(getBalanceSheetLink, jwt));
  }, [dispatch, getBalanceSheetLink, jwt]);

  useEffect(() => {
    if (errorResponse) {
      alert(toErrorMessage(errorResponse));
    }
  }, [errorResponse]);


  return balanceSheet ? (
      <BalanceSheet
        balanceSheet={balanceSheet}
      />
  ) : <Loading/>;
}


export default BalanceSheetContainer;
