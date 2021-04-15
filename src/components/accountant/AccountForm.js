import React from 'react';
import './AccountForm.scss'

const moneyNameMap = {
  ASSET: '잔액',
  LIABILITY: '잔액',
  REVENUE: '예산',
  EXPENSE: '예산',
  '': '금액'
};

function AccountForm({form, onChange, onSubmit, errorMessage}) {
  const moneyName = moneyNameMap[form.type];
  return (
    <div className={"account-form"}>
      <h3>계정 등록</h3>
      <form onSubmit={onSubmit}>
        <div className={"radio-area"}>
          <input name={"type"} value={"ASSET"} type={"radio"} id={"asset"} onChange={onChange}/>
          <label htmlFor={"asset"}>자산</label>
          <input name={"type"} value={"LIABILITY"} type={"radio"} id={"liability"} onChange={onChange}/>
          <label htmlFor={"liability"}>부채</label>
          <input name={"type"} value={"REVENUE"} type={"radio"} id={"revenue"} onChange={onChange}/>
          <label htmlFor={"revenue"}>수입</label>
          <input name={"type"} value={"EXPENSE"} type={"radio"} id={"expense"} onChange={onChange}/>
          <label htmlFor={"expense"}>지출</label>
        </div>
        <div className={"input-area"}>
          <input
            name={"name"}
            type={"text"}
            placeholder={"계정 이름"}
            onChange={onChange}
            value={form.name}
          />
          <input
            name={"money"}
            type={"text"}
            placeholder={moneyName}
            onChange={onChange}
            value={form.money}
          />
        </div>
        {errorMessage ? <div className={"error"}>{errorMessage}</div> : <></>}
        <button>계정 등록</button>
      </form>
    </div>
  );
}

export default AccountForm;
