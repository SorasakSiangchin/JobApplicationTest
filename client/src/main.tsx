import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/layout/App';
import { Provider } from 'react-redux';
import { store } from './app/stores/configureStore';
import { BrowserRouter } from 'react-router-dom';




ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
,
)
