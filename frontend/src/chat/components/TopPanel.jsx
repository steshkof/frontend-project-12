import { useAuth } from '../contexts/contexts';

const TopPanel = () => {
  const auth = useAuth();
  const loggedIn = auth.loggedIn;

  const logOutHandler = () => {
    auth.logOut();
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          Hexlet Chat
        </a>

        {loggedIn && (
          <button type="button" className="btn btn-primary" onClick={logOutHandler}>
            Выйти
          </button>
        )}
      </div>
    </nav>
  );
};

export default TopPanel;
