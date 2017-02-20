var React = require('react');
var About = React.createClass({
	render:function(){
		return(
			<div>
				<h1>About</h1>
				<p>
					this application use following technology
					<ul>
						<li>React</li>
						<li>React Router</li>
						<li>Flux</li>
						<li>Node</li>
						<li>Gulp</li>
					</ul>
				</p>
			</div>
			);
	}
});

module.exports=About;