export const ErrorMessages = {
  500: 'Something went wrong',
  422: 'Please check your login and password',
  DEFAULT: 'Something went wrong',
};

export const handleAuthRequestError = (error, setError) => {
  let errorText = ErrorMessages.DEFAULT;

  if (error.isAxiosError) {
    errorText = error.response ? ErrorMessages[error.response.status] || ErrorMessages[500] : ErrorMessages[500];
  }

  if (error.custom && error.text) {
    errorText = error.text;
  }

  setError(errorText);
};
