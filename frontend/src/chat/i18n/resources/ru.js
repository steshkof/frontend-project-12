const ru =  {
  translation: {
    headerTitle: 'Hexlet Chat',
    auth: {
      login: 'Войти',
      logout: 'Выйти',      
      signup: 'Зарегистрироваться',
      registration: 'Регистрация',
      required: 'Обязательное поле',
      nickname: 'Ваш ник',
      username: 'Имя пользователя',
      password: 'Пароль',
      passwordConfirm: 'Подтвердите пароль',
      usernameLength: 'От 3 до 20 символов',
      passwordLength: 'Не менее 6 символов',
      passwordsMatch: 'Пароли должны совпадать',
      authFaild: 'Неверные имя пользователя или пароль',
      noAccount: 'Нет аккаунта? ',
      existedUser: 'Такой пользователь уже существует',
    },
    page404: {
      title: 'Страница не найдена',
      message: 'Но вы можете перейти',
      homepage: 'на главную страницу'
    }
  }
}

export default ru;

// import { useTranslation } from 'react-i18next';
// const { t } = useTranslation();