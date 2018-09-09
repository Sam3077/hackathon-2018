import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GroupsList from './pages/GroupsList';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<GroupsList />, div);
	ReactDOM.unmountComponentAtNode(div);
});
