import React from 'react';
import './MemberInfo.scss';

function MemberInfo({email, form, onChange, onSubmit, onClickWithdraw}) {
  return (
    <div className={"member-info"}>

      <div className={"info"}>
        <h3>이메일</h3>
        <div className={"email"}>{email}</div>
      </div>

      <div className={"change"}>
        <h3>비밀번호 변경</h3>
        <form onSubmit={onSubmit}>
          <input
            name={"newPassword"}
            type={"password"}
            placeholder={"새 비밀번호"}
            onChange={onChange}
            value={form.newPassword}
          />
          <input
            name={"newPasswordConfirm"}
            type={"password"}
            placeholder={"새 비밀번호 확인"}
            onChange={onChange}
            value={form.newPasswordConfirm}
          />
          <button type={"submit"}>변경하기</button>
        </form>
      </div>

      <div className={"withdraw"}>
        <h3>회원 탈퇴</h3>
        <button onClick={onClickWithdraw}>탈퇴하기< /button>
      </div>

    </div>
  );
}

export default MemberInfo;
