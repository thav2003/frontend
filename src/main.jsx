import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
	BrowserRouter ,
	Routes
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store,persistor } from './redux/store';

import { ToastContainer } from 'react-toastify';

import './index.scss';
import './assets/modules/_reset.scss';
import 'react-toastify/dist/ReactToastify.css';

import { routes,renderRoutes  } from './routes';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<ToastContainer />
				{/* <RouterProvider router={router} /> */}
				<BrowserRouter>
					{renderRoutes(routes)}
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
