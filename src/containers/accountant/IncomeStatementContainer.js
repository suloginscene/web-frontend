import React from 'react';
import IncomeStatement from "../../components/accountant/IncomeStatement";
import {useSelector} from "react-redux";

function IncomeStatementContainer() {
  const {incomeStatement} = useSelector(({accountant}) => ({incomeStatement: accountant.incomeStatement}));

  return (
    <IncomeStatement
      incomeStatement={incomeStatement}
    />
  );
}

export default IncomeStatementContainer;
