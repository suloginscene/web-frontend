import React from 'react';
import './IncomeStatementForm.scss';

function IncomeStatementForm({onSubmit, errorMessage}) {
  return (
    <div className={"income-statement-form"}>
      <h3>손익계산서 요청</h3>
      <form onSubmit={onSubmit}>
        <div className={"date-area"}>
          <label> 시작
            <input
              name={"beginDate"}
              type={"date"}
            />
          </label>
          <label> 종료
            <input
              name={"inclusiveEndDate"}
              type={"date"}
            />
          </label>
        </div>
        {errorMessage ? <div className={"error"}>{errorMessage}</div> : <></>}
        <button>손익계산서 요청</button>
      </form>
    </div>
  );
}

export default IncomeStatementForm;
