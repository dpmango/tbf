export const ErrorMessages = {
  500: 'С сервером что-то не так',
  422: 'Неправильный логин или пароль',
  DEFAULT: 'Что-то пошло не так :(',
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
