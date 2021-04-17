import React from 'react';
import './TransactionForm.scss';

const typeNameMap = {
  'Asset': '자산',
  'Liability': '부채',
  'Revenue': '수입',
  'Expense': '지출'
};

function TransactionForm({accounts, form, onChange, onSubmit, errorMessage}) {
  const [sources, destinations] = [[], []];
  const setOptions = (srcType, dstType) => {
    sources.push(<option key={0} value={""} className={"default"}>({typeNameMap[srcType]})</option>);
    destinations.push(<option key={0} value={""} className={"default"}>({typeNameMap[dstType]})</option>);
    accounts.forEach(account => {
      const items = <option key={account.id} value={account.id}>{account.name}</option>;
      if (account.type === srcType) sources.push(items);
      if (account.type === dstType) destinations.push(items);
    });
  };

  switch (form.type) {
    case "SELL":
      setOptions('Revenue', 'Asset');
      break;
    case "PURCHASE_BY_CASH":
      setOptions('Asset', 'Expense');
      break;
    case "PURCHASE_BY_CREDIT":
      setOptions('Liability', 'Expense');
      break;
    case "BORROW":
      setOptions('Liability', 'Asset');
      break;
    case "REPAY":
      setOptions('Asset', 'Liability');
      break;
    case "TRANSFER":
      setOptions('Asset', 'Asset');
      break;
    default:
      sources.push(<option key={0} value={""} className={"default"}>출발</option>);
      destinations.push(<option key={0} value={""} className={"default"}>도착</option>);
  }

  return (
    <div className={"transaction-form"}>
      <form onSubmit={onSubmit}>
        <div className={"radio-area"}>
          <input name={"type"} type={"radio"} value={"SELL"} id={"sell"} onChange={onChange}/>
          <label htmlFor={"sell"}>판매</label>
          <input name={"type"} type={"radio"} value={"PURCHASE_BY_CASH"} id={"cash"} onChange={onChange}/>
          <label htmlFor={"cash"}>현금 구매</label>
          <input name={"type"} type={"radio"} value={"PURCHASE_BY_CREDIT"} id={"credit"} onChange={onChange}/>
          <label htmlFor={"credit"}>신용 구매</label>
          <input name={"type"} type={"radio"} value={"BORROW"} id={"borrow"} onChange={onChange}/>
          <label htmlFor={"borrow"}>대출</label>
          <input name={"type"} type={"radio"} value={"REPAY"} id={"repay"} onChange={onChange}/>
          <label htmlFor={"repay"}>상환</label>
          <input name={"type"} type={"radio"} value={"TRANSFER"} id={"transfer"} onChange={onChange}/>
          <label htmlFor={"transfer"}>이동</label>
        </div>
        <div className={"select-area"}>
          <select name={"sourceId"} onChange={onChange}>
            {sources}
          </select>
          <select name={"destinationId"} onChange={onChange}>
            {destinations}
          </select>
        </div>
        <div className={"input-area"}>
          <input
            name={"amount"}
            type={"text"}
            placeholder={"금액"}
            onChange={onChange}
            value={form.amount}
          />
          <input
            name={"description"}
            type={"text"}
            placeholder={"설명"}
            onChange={onChange}
            value={form.description}
          />
        </div>
        {errorMessage ? <div className={"error"}>{errorMessage}</div> : <></>}
        <button>거래 등록</button>
      </form>
    </div>
  );
}

export default TransactionForm;
