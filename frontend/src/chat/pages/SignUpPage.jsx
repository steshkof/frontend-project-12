import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import routes from '../routes.js';
import { useAuth } from '../contexts/contexts';
import TopPanel from '../components/TopPanel';
import images from '../images/images.js';
import notify from '../notifications';

const SignUpPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const inputRef = useRef();
  const { t } = useTranslation();

  const [notUniqeUsername, setNotUniqeUsername] = useState('');

  useEffect(() => {
    if (auth?.user?.token) {
      navigate(routes.pages.chat);
    }
  }, [auth, navigate]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const registrationSchema = yup.object({
    username: yup.string()
      .min(3, t('auth.usernameLength'))
      .max(20, t('auth.usernameLength'))
      .required(t('auth.required')),
    password: yup.string()
      .min(6, t('auth.passwordLength'))
      .required(t('auth.required')),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], t('auth.passwordsMatch'))
      .required(t('auth.required')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registrationSchema,
    onSubmit: (values) => {
      const { username, password } = values;
      axios.post(routes.apiRequests.signUp, { username, password })
        .then((response) => {
          auth.logIn(response.data);
          navigate(routes.pages.chat);
        })
        .catch((error) => {
          if (!error.isAxiosError) notify('error', t('errors.unknown'));

          if (error.response?.status === 409) {
            inputRef.current.select();
            setNotUniqeUsername(t('auth.existedUser'));
            formik.errors.username = t('auth.existedUser');
          } else {
            notify('error', t('errors.network'));
          }
        });
    },
  });

  return (
    <>
      <TopPanel />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <div>
                  <img
                    src={images.signUp}
                    className="rounded-circle"
                    alt={t('auth.login')}
                  />
                </div>
                <form
                  onSubmit={formik.handleSubmit}
                  className="w-50"
                >
                  <h1 className="text-center mb-4">{t('auth.registration')}</h1>
                  <div className="form-floating mb-3">
                    <input
                      name="username"
                      autoComplete="off"
                      ref={inputRef}
                      placeholder={t('auth.username')}
                      id="username"
                      className={formik.errors.username && formik.touched.username ? 'form-control is-invalid' : 'form-control'}
                      value={formik.values.username}
                      onChange={(e) => { formik.handleChange(e); setNotUniqeUsername(''); }}
                      onBlur={formik.handleBlur}
                    />
                    <label htmlFor="username">{t('auth.username')}</label>
                    {formik.errors.username && formik.touched.username && <div className="invalid-tooltip">{notUniqeUsername || t('auth.usernameLength')}</div>}
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      name="password"
                      autoComplete="off"
                      placeholder={t('auth.password')}
                      type="password"
                      id="password"
                      className={formik.errors.password && formik.touched.password ? 'form-control is-invalid' : 'form-control'}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label className="form-label" htmlFor="password">{t('auth.password')}</label>
                    {formik.errors.password && formik.touched.password && <div className="invalid-tooltip">{t('auth.passwordLength')}</div>}
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      name="confirmPassword"
                      autoComplete="off"
                      placeholder={t('auth.passwordConfirm')}
                      type="password"
                      id="confirmPassword"
                      className={formik.errors.confirmPassword && formik.touched.confirmPassword ? 'form-control is-invalid' : 'form-control'}
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                    />
                    <label className="form-label" htmlFor="confirmPassword">{t('auth.passwordConfirm')}</label>
                    {formik.errors.confirmPassword && formik.touched.confirmPassword && <div className="invalid-tooltip">{t('auth.passwordsMatch')}</div>}
                  </div>

                  <button
                    type="submit"
                    className="w-100 mb-3 btn btn-outline-primary"
                  >
                    {t('auth.signup')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
