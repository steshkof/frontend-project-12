import TopPanel from '../components/TopPanel';
import { useFormik } from 'formik';
import * as yup from 'yup';
import images from '../images/images.js';
import routes from '../routes.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useAuth } from '../contexts/contexts';

const LoginPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (auth?.user?.token) {
      navigate(routes.pages.chat);
    }
  }, [auth, navigate]);  

  const [authFailed, setAuthFailed] = useState(false);

  const loginSchema = yup.object({
    username: yup.string().trim().required('Введите логин'),
    password: yup.string().trim().required('Введите пароль'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      axios
        .post(routes.apiRequests.login, values)
        .then((response) => {
          auth.logIn(response.data)
          navigate(routes.pages.chat)
          setAuthFailed(false);
        })
        .catch((error) => {
          setAuthFailed(true);
          console.log(error);
        });
    },
  });

  const formChangeHandler = () => setAuthFailed(false);

  return (
    <>
      <TopPanel />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img
                    src={images.login}
                    className="rounded-circle"
                    alt="Войти"
                  />
                </div>
                <form
                  onSubmit={formik.handleSubmit}
                  onChange={formChangeHandler}
                  className="col-12 col-md-6 mt-3 mt-mb-0"
                >
                  <h1 className="text-center mb-4">Войти</h1>
                  <div className="form-floating mb-3">
                    <input
                      name="username"
                      autoComplete="username"
                      required
                      placeholder="Ваш ник"
                      id="username"
                      className={authFailed === true ? 'form-control is-invalid' : 'form-control'}
                      value={formik.values.username}
                      onChange={formik.handleChange}
                    />
                    <label htmlFor="username">Ваш ник</label>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      name="password"
                      autoComplete="current-password"
                      required
                      placeholder="Пароль"
                      type="password"
                      id="password"
                      className={authFailed === true ? 'form-control is-invalid' : 'form-control'}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    <label className="form-label" htmlFor="password">Пароль</label>
                    {authFailed && <div classname="invalid-tooltip">Неверные имя пользователя или пароль</div>}
                  </div>
                  
                  <button
                    type="submit"
                    className="w-100 mb-3 btn btn-outline-primary"
                  >
                    Войти
                  </button>
                </form>
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>Нет аккаунта?</span> <a href="/signup">Регистрация</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
