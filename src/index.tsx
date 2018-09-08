import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import Starter from './pages/Starter';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<Router>
		<div>
			<Route exact={true} path="/" component={Starter} />
		</div>
	</Router>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();
