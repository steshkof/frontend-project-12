import init from "./init";
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('chat'));
init().then((app) => root.render(app))
