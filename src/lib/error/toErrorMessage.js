export default function toErrorMessage(errorResponse) {
  const status = errorResponse.status;
  switch (status) {
    case 400:
      return toBadRequestMessage(errorResponse);
    case 401:
      return '로그인 연장을 위해 페이지를 새로고침 해주세요.';
    case 403:
      return '권한이 없습니다.';
    case 404:
      return '요청하신 정보를 찾을 수 없습니다.';
    case 424:
      return '외부 서비스에 문제가 있습니다.';
    case 500:
      return '서버에서 문제가 발생했습니다.';
    default:
      return status + ' ' + errorResponse.data;
  }
}

function toBadRequestMessage(errorResponse) {
  const error = errorResponse.data.error;
  const errorDescription = errorResponse.data.errorDescription;

  switch (error) {
    case 'RequestBindException':
      return errorDescription;
    case 'RefreshTokenException':
      return '리프레시 토큰이 만료되었습니다.';
    case 'DuplicateEmailException':
      return '이미 존재하는 이메일입니다.';
    case 'PasswordNotMatchedException':
      return '잘못된 비밀번호입니다.';
    case 'VerificationException':
      return '잘못된 인증토큰입니다.';
    case 'AccountCastingException':
      return '부적절한 계정 유형입니다.';
    case 'StockNotEmptyException':
      return '저량 계정에 잔액이 있습니다.';
    case 'NegativeMoneyException':
      return '금액이 음수가 되는 요청입니다.';
    default:
      return error + ': ' + errorDescription;
  }
}
