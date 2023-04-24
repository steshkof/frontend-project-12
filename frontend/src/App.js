import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page404 from './chat/pages/Page404.jsx';
import LoginPage from './chat/pages/LoginPage.jsx';
import ChatPage from './chat/pages/ChatPage.jsx';
import SignUpPage from './chat/pages/SignUpPage.jsx';

import routes from './chat/routes.js';

function App() {
  return (
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <Routes>
          <Route path={routes.pages.chat} element={<ChatPage />} />
          <Route path={routes.pages.login} element={<LoginPage />} />
          <Route path={routes.pages.signUp} element={<SignUpPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
