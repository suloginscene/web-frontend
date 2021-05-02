import React, {useEffect} from 'react';
import IncomeStatement from "../../components/accountant/IncomeStatement";
import {useDispatch, useSelector} from "react-redux";
import {initializeIncomeStatement} from "../../modules/accountant";


function IncomeStatementContainer() {
  const dispatch = useDispatch();

  const {incomeStatement} = useSelector(({accountant}) => ({
    incomeStatement: accountant.incomeStatement
  }));


  useEffect(() => {
    return () => {
      dispatch(initializeIncomeStatement());
    }
  }, [dispatch]);


  return (
    <IncomeStatement
      incomeStatement={incomeStatement}
    />
  );
}


export default IncomeStatementContainer;
