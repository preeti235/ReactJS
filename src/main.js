$ = JQuery = require('JQuery');
/*var App=console.log('hello class from hi');

module.exports=App;*/
var React = require('react');
var ReactDom=require('react-dom');
var Home = require('./components/homepage');
var About=require('./components/about/aboutPage');
var Header = require('./components/common/header');

var App = React.createClass({
		render:function(){
			var Child;//acts like directive

			switch(this.props.route){//get the property of router page as it is about or home

				case 'about': Child= About; break;
				default: Child= Home;
			}

			return(
					<div>
						<Header />
						<Child/>
					</div>
					

				)
		}


}) 

function render(){
	var route= window.location.hash.substr(1);//hash value of window url.
	ReactDom.render(<App route={route}/>, document.getElementById('app'));
}

window.addEventListener('hashchange',render);
render();

/*ReactDom.render(<Home />, document.getElementById('app'));*/