export default function toErrorMessage(errorResponse) {
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
