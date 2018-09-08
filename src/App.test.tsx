import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Starter from './pages/Starter';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Starter />, div);
	ReactDOM.unmountComponentAtNode(div);
});
