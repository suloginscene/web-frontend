export function isValidEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function toErrorMessage(errorResponse) {
  const status = errorResponse.status;
  if (status === 400) {
    const error = errorResponse.data.error;
    const errorDescription = errorResponse.data.errorDescription;
    switch (error) {
      // TODO exception type
      case 'RequestException':
        return errorDescription;
      default:
        return error + ': ' + errorDescription;
    }
  } else {
    return status + ' ' + errorResponse.data;
  }
}
