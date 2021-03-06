import React from 'react';
import './Home.scss';

function Home() {
  return (
    <div className={"home"}>

      <h1>SCENE</h1>
      <p>
        개인이 제공하고 있는 서비스입니다. <br/>
        가계부 외에도 생활 관리 기능을 개발할 계획입니다. <br/>
        안정적인 운영을 지향하지만 보장할 수는 없습니다. <br/>
        suloginscene@gmail.com
      </p>

      <hr/>

      <p>
        기능을 살펴보실 수 있는 테스트 회원입니다. <br/>
        <br/>
        이메일: test@email.com <br/>
        비밀번호: password
      </p>

      <hr/>

      <h2>복식부기 가계부</h2>
      <p>
        자금의 흐름을 원인과 결과로 파악할 수 있습니다. 개인이 사용하기에 편리하도록 단순화하였습니다.
        <br/><small> * 정식 회계용어에 정확히 대응하지 않을 수 있습니다.</small>
        <br/><small> * 21억 이하를 다루며, 모바일에서는 일부 정보가 생략될 수 있습니다.</small>
      </p>

      <h3>계정</h3>
      <div>
        <p>
          자산과 부채는 현 시점의 잔액을 갖는 <b>저량</b>이며, 수입과 지출은 기간 내의 발생량을 갖는 <b>유량</b>입니다.<br/>
          각 계정 화면에서 거래 기록을 볼 수 있습니다. 저량 계정의 경우에만 기초 금액 등록이 첫 거래로 기록되어 있습니다.
        </p>
        <table>
          <thead>
            <tr>
              <th>유형</th>
              <th>예시</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>자산</th>
              <td className={"explanation"}>현금, 저축 계좌, 빌려준 돈, 전세금 등 <small>* 주식 및 부동산도 포함되나 금액 변동에 주의</small></td>
            </tr>
            <tr>
              <th>부채</th>
              <td className={"explanation"}>신용카드, 대출 계좌, 빌린 돈 등</td>
            </tr>
            <tr>
              <th>수입</th>
              <td className={"explanation"}>근로소득, 사업소득, 금융소득 등</td>
            </tr>
            <tr>
              <th>지출</th>
              <td className={"explanation"}>식비, 교통/통신비, 생활비, 경조사 등</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>거래</h3>
      <div>
        <p>
          다양한 경제행동을 계정 간 이동 유형에 따라 최소화하였습니다.
          <br/><small> * 해당 유형의 가장 대표적인 행동을 이름으로 하였으나, 이름과 행동이 어울리지 않는 경우가 존재합니다.</small><br/>
          어떤 경제행동을 어떤 거래유형으로 처리해야 하는지는 다소간 개인의 판단에 속합니다.
          <br/><small> * 예를 들어,
          주식을 자산으로 본다면 매수-매도 시 '이동' 처리하고, 등락을 '판매(투자수익)' 또는 '현금구매(투자손해)'로 처리할 수 있습니다.
          주식을 일반 사물처럼 취급한다면 매수를 '현금구매(주식구매)', '판매(주식판매)'로 처리할 수 있습니다.
          전자는 복잡하지만 주식 계정의 역사를 추적할 수 있으며, 후자는 편리하지만 주식 보유 중의 자산이 과소평가됩니다. </small>
        </p>
        <table className={"transaction-description-table"}>
          <thead>
            <tr>
              <th>유형</th>
              <th>이동</th>
              <th>예시</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>판매</th>
              <td>수입 발생 -> 자산 증가</td>
              <td className={"explanation"}>모든 소득 <small>* 신용 판매는 빌려준 돈에 해당하는 자산 계정 사용</small></td>
            </tr>
            <tr>
              <th>현금</th>
              <td>자산 감소 -> 지출 발생</td>
              <td className={"explanation"}>현금, 체크카드 등의 단순 소비</td>
            </tr>
            <tr>
              <th>신용</th>
              <td>부채 증가 -> 지출 발생</td>
              <td className={"explanation"}>신용카드, 외상 등의 단순 소비</td>
            </tr>
            <tr>
              <th>대출</th>
              <td>부채 증가 -> 자산 증가</td>
              <td className={"explanation"}>자금 자체의 대출</td>
            </tr>
            <tr>
              <th>상환</th>
              <td>자산 감소 -> 부채 감소</td>
              <td className={"explanation"}>신용카드 정산 및 대출금 상환</td>
            </tr>
            <tr>
              <th>이동</th>
              <td>자산 감소 -> 자산 증가</td>
              <td className={"explanation"}>내 자산계정 간 이체 및 자산성 구매 <small>* 부동산 구매 등</small></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>보고서</h3>
      <div>
        <p>
          장부, 재무상태표, 손익계산서, 세 종류의 보고서를 제공합니다.
        </p>
        <p>
          <b>장부</b>는 계정 간 일어난 모든 거래를 기록합니다. (저량 계정의 기초 금액 등록은 제외됩니다.)
          자금 흐름의 기록이므로 금액은 언제나 양수이며, 잔액 개념은 존재하지 않습니다.
          계정 이름을 변경하거나, 계정을 삭제한 경우에도 장부는 변하지 않습니다.
        </p>
        <p>
          <b>재무상태표</b>는 자산과 부채의 잔액 현황을 보여줍니다.
          자산과 부채는 저량이므로 조회 시점의 상태만을 보여줍니다.
          계정 이름 변경은 반영되며, 저량 계정은 잔액이 남아있는 경우 삭제할 수 없으므로 신뢰할 수 있는 상태를 유지합니다.
        </p>
        <p>
          <b>손익계산서</b>는 수입과 지출의 발생 현황을 보여줍니다.
          수입과 지출은 유량이므로 조회할 기간을 정해서 요청하여야 합니다.
          계정 이름 변경은 반영되며, 계정을 삭제하는 경우 손익계산서에서 조회되지 않으므로 주의가 필요합니다.
        </p>
      </div>

    </div>
  );
}

export default Home;
