var React=require('react');
var Router=require('react-router');
var Link=Router.Link;//link the components.combine diff pagestogether

var Home=React.createClass({
	render:function() {
		return(
			<div className="jumbotron">
				<h1>I am learning react</h1>
				<p>you guys awesome</p>
			</div>
	)
	}
});

module.exports =Home;
