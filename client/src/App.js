import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import OtherPage from './OtherPage';
import Fib from './Fib';

function App() {
	return (
		<Router>
			<div className="App">
				<header className="App-header">
					<Link to="/">Home</Link>
					<Link to="/otherpage">Other Pasgesss</Link>
				</header>
			</div>
			<Route exact path="/" component={Fib} />
			<Route exact path="/otherpage" component={OtherPage} />
		</Router>
		
	);
}

export default App;
