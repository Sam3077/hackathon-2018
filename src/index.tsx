import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import SignIn from './pages/SignIn';
import GroupsList from './pages/GroupsList';
import Group from './pages/Group';
<<<<<<< HEAD
import Scan from './pages/Scan';
=======
import NewGroup from './pages/NewGroup';
>>>>>>> newGroup
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<Router>
		<div>
			<Route exact={true} path="/" component={SignIn} />
			<Route exact={true} path="/GroupsList" component={GroupsList} />
			<Route exact={true} path="/Scan/:groupName" component={Scan} />
			<Route exact={true} path="/Scan" component={Scan} />
			<Route exact={true} path="/Group/:group" component={Group} />
			<Route exact={true} path="/NewGroup" component={NewGroup} />
		</div>
	</Router>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();
