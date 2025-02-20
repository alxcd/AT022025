import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { store } from './store';
import { Provider } from 'react-redux';
import { AppStore } from './store';
import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
	<Provider store={store as AppStore}>
		<StrictMode>
			<Router>
				<App />
			</Router>
		</StrictMode>
	</Provider>,
);
