import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import Blank from './pages/Blank';
import Starter from './pages/Starter';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<Router>
		<div>
			<Route exact={true} path="/" component={Starter} />
			<Route path="/blank" component={Blank} />
		</div>
	</Router>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();
