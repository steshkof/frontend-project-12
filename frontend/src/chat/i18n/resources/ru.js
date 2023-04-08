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
      pagenotFound: 'Страница не найдена',
      message: 'Но вы можете перейти',
      homepage: 'на главную страницу'
    },
    errors: {
      network: 'Ошибка соединения',
      unknown: 'Неизвестная ошибка',
      unauthorized: 'Ошибка авторизации',
    },
    modals: {
      remove: 'Удалить',
      cancel: 'Отменить',
      submit: 'Отправить',
      addChannel: 'Добавить канал',
      renameChannel: 'Переименовать канал',
      removeChannel: 'Удалить канал',
      channelName: 'Имя канала',
      nameLength: 'От 3 до 20 символов',
      required: 'Обязательное поле',
      uniqueName: 'Должно быть уникальным',
      areYouSure: 'Уверены?',
    },
    chatroom: {
      send: 'Отправить',
      channels: 'Каналы',
      newMessage: 'Новое сообщение',
      enterMessage: 'Введите сообщение...',
      rename: 'Переименовать',
      remove: 'Удалить',
      manageChannel: 'Управление каналом',
      messagesCounter: {
        messagesCount_zero: '{{count}} сообщений',
        messagesCount_one: '{{count}} сообщение',
        messagesCount_few: '{{count}} сообщения',
        messagesCount_many: '{{count}} сообщений',
      },
    },
    notifications: {
      channelCreated: 'Канал создан',
      channelRemoved: 'Канал удален',
      channelRenamed: 'Канал переименован',
    }
  }
}

export default ru;

// import { useTranslation } from 'react-i18next';
// const { t } = useTranslation();