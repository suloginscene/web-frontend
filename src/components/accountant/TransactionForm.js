import React from 'react';
import './TransactionForm.scss';

function TransactionForm() {
  return (
    <div className={"transaction-form"}>
      <form>
        <div className={"radio-area"}>
          <input name={"type"} type={"radio"} id={"sell"}/><label htmlFor={"sell"}>판매</label>
          <input name={"type"} type={"radio"} id={"cash"}/><label htmlFor={"cash"}>현금 구매</label>
          <input name={"type"} type={"radio"} id={"credit"}/><label htmlFor={"credit"}>신용 구매</label>
          <input name={"type"} type={"radio"} id={"borrow"}/><label htmlFor={"borrow"}>대출</label>
          <input name={"type"} type={"radio"} id={"repay"}/><label htmlFor={"repay"}>상환</label>
          <input name={"type"} type={"radio"} id={"transfer"}/><label htmlFor={"transfer"}>이동 / 대부</label>
        </div>
        <div className={"select-area"}>
          <select name={"sourceId"}>
            <option value={""} className={"default"}>출발</option>
            <option value={""}>월급</option>
          </select>
          <select name={"destinationId"}>
            <option value={""} className={"default"}>도착</option>
            <option value={""}>하나은행</option>
          </select>
        </div>
        <div className={"input-area"}>
          <input
            name={"amount"}
            type={"text"}
            placeholder={"금액"}
          />
          <input
            name={"description"}
            type={"text"}
            placeholder={"설명"}
          />
        </div>
        <button>거래 등록</button>
      </form>
    </div>
  );
}

export default TransactionForm;
