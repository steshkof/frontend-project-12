import ReactDOM from 'react-dom/client';
import init from './init';

const root = ReactDOM.createRoot(document.getElementById('chat'));
init().then((app) => root.render(app));
