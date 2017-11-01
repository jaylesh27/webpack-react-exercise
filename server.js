// created server.js file in section 9.50

const express = require('express');
const path = require('path');
// Section 9.51, commented out for section 9.52 where we move them down to the if statement
// const webpackMiddleware = require('webpack-dev-middleware');
// const webpack = require('webpack');
// const webpackConfig = require('./webpack.config.js');

const app = express();

// 9.51
// app.use(webpackMiddleware(webpack(webpackConfig)));

// 9.52
if (process.env.NODE_ENV !== 'production') {
	const webpackMiddleware = require('webpack-dev-middleware');
	const webpack = require('webpack');
	const webpackConfig = require('./webpack.config.js');
	app.use(webpackMiddleware(webpack(webpackConfig)));
}else {
	// 9.52 what this line says is that everything inside of the dist directory should be available for use to anything/anyone who asks for it
	app.use(express.static('dist'));
	// 9.52  what the below lines does is that anyone makes a get request to any route on our server, send them back the index.html file.  This is for compatibility with React Router
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'dist/index.html'));
	});
}

// 9.51
// app.listen(3050, () => console.log('Listening on port 3050'));

app.listen(process.env.PORT || 3050, () => console.log('Listening'));