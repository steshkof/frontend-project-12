import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import routes from '../routes.js';
import { useAuth } from '../contexts/contexts';
import TopPanel from '../components/TopPanel';
import notify from '../notifications';
import images from '../images/images.js';

const LoginPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    if (auth?.user?.token) {
      navigate(routes.pages.chat);
    }
  }, [auth, navigate]);

  const [authFailed, setAuthFailed] = useState(false);

  const loginSchema = yup.object({
    username: yup.string().trim().required(),
    password: yup.string().trim().required(),
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
          auth.logIn(response.data);
          navigate(routes.pages.chat);
          setAuthFailed(false);
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            notify('error', t('errors.unauthorized'));
            setAuthFailed(true);
          } else {
            notify('error', t('errors.network'));
          }
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
                    alt={t('auth.login')}
                  />
                </div>
                <form
                  onSubmit={formik.handleSubmit}
                  onChange={formChangeHandler}
                  className="col-12 col-md-6 mt-3 mt-mb-0"
                >
                  <h1 className="text-center mb-4">{t('auth.login')}</h1>
                  <div className="form-floating mb-3">
                    <input
                      name="username"
                      autoComplete="username"
                      required
                      placeholder={t('auth.nickname')}
                      id="username"
                      className={authFailed === true ? 'form-control is-invalid' : 'form-control'}
                      value={formik.values.username}
                      onChange={formik.handleChange}
                    />
                    <label htmlFor="username">{t('auth.nickname')}</label>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      name="password"
                      autoComplete="current-password"
                      required
                      placeholder={t('auth.password')}
                      type="password"
                      id="password"
                      className={authFailed === true ? 'form-control is-invalid' : 'form-control'}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    <label className="form-label" htmlFor="password">{t('auth.password')}</label>
                    {authFailed && <div className="invalid-tooltip">{t('auth.authFaild')}</div>}
                  </div>

                  <button
                    type="submit"
                    className="w-100 mb-3 btn btn-outline-primary"
                  >
                    {t('auth.login')}
                  </button>
                </form>
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>{t('auth.noAccount')}</span>
                  <a href="/signup">{t('auth.registration')}</a>
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
