import { useAuth } from '../contexts/contexts';
import { useTranslation } from 'react-i18next';


const TopPanel = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  const loggedIn = auth.loggedIn;
  
  const logOutHandler = () => {
    auth.logOut();
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          {t('headerTitle')}
        </a>

        {loggedIn && (
          <button type="button" className="btn btn-primary" onClick={logOutHandler}>
            {t('auth.logout')}
          </button>
        )}
      </div>
    </nav>
  );
};

export default TopPanel;
