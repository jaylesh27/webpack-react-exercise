var webpack = require('webpack');
var path = require('path');
// Section 5.36
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 5.34 VENDOR_LIBS will contain an array of strings with each item in the array being the name of the 3rd party library we want to include in the separate vendor file (aka each npm module).  Get the dependencies from the package.json file (don't include dev_dependencie).  We don't have to list every single dependency inside this array, if there's a dependency that will be updated very often you can exclude it from this list
const VENDOR_LIBS = [
	'faker', 'lodash', 'react', 'react-dom', 'react-input-range', 'react-redux', 'react-router', 'redux', 'redux-form', 'redux-thunk'
];

module.exports = {
  // below line commented out for implementing code splitting in Section 5.34
  // entry: './src/index.js',
  // 5.34  by changing the entry point into an object, we can have multiple entry points for our application
  entry: {
  	// 5.34 running only the below line would create the same output of bundle.js as we have covered prior to code splitting
  	bundle: './src/index.js',
  	// 5.34 this second key-value pair tells webpack that we want to create a separate bundle file from the one above that is our usual bundle.js.  We want to call this bundle 'vendor.js'
  	vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    // 5.34 below line commented out for Section 5.34 code
    // filename: 'bundle.js'
    // 5.34  in the below line, the '[name]' will get replaced with the same name as the key specified in the entry object
    // filename: '[name].js'
    // 5.37 cache busting: what chunkhash does is every time we make changes in our files, webpack will automatically hash the contents of the file and add a hashed string of characters (more specifically, a hash of the contents of the file it is identifying) to the file name (example: vendor.js and bundle.js will have these characters added to their file name in the dist directory when changes are made in them).  Because the file name will have changed, that will tell the browser to download the file and therefore not used the older, obsolete cached version of the file
    filename: '[name].[chunkhash].js'
  },

  module: {
  	rules: [
  		{
  			use: 'babel-loader',
  			test: /\.js$/,
  			// 5.30 The 'exclude' property tells webpack to not apply babel to any files inside of the specified directory (which in this case is the node_modules folder).  we are assuming that all of the files in the node_modules directory have already been transpiled to ES5 code from ES6.  We can run babel on them but it isn't necessary and therefore would be a waste of resources
  			exclude: /node_modules/
  		},
  		{
  			// 5.31 css-loader allows webpack to understand and read the contents of CSS files imported into our project structure.  style-loader takes those CSS modules and sticks them into a style tag inside of our HTML document
  			use: ['style-loader', 'css-loader'],
  			test: /\.css$/
  		}
  	]
  },
  // 5.35 Remember, plugins are like loaders but they look at/work with the total sum of input or output rather than individual files like loaders do
  plugins: [
  	// 5.35 what the CommonsChunkPlugin does is check both of the outputted bundled js files (vendor and bundle) and if there are copies or duplicates between the two, it will pull them out and add them only to the vendor entry point and therefore will only be included in the vendor.js file
  	new webpack.optimize.CommonsChunkPlugin({
  		// 5.35
  		// name: 'vendor'
  		// 5.37 cache busting: Webpack won't by default know when we've made a change to the vendor.js file.  When we change our bundle.js file, webpack will also think that we changed our vendor.js file as well.  Changing 'name' to 'names' with an array of vendor and manifest will create a third JS file in our dist directory called manifest.js.  What manifest.js will do is to better tell the browser on whether or not the vendor.js file got changed...this wasn't described well in the course, look up a better explanation.
  		names: ['vendor', 'manifest']
  	}),
  	// 5.36
  	new HtmlWebpackPlugin({
  		// the template option allows us to specify which HTML file to use as a template when generating the script tags for our various bundled JS files.  Since we have custom code in our index.html file, we provide the location of our index.html and use it to serve as our template.  The index.html file with the added script tags will be created in the dist directory alongside the javascript files
  		template: 'src/index.html'
  	})
    // 8.45
    // new webpack.DefinePlugin({
      // 8.45 by adding the below line, we make sure React doesn't do a lot of error checking when this app is deployed to production.  too much error checking, especially when the app is in production, will make it less performant.  The below line is also available globally on the window scope by using the DefinePlugin plugin of webpack.  UPDATE: webpack 2 makes this part obsolete, running 'webpack-p' automatically sets NODE_ENV to production
      // 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    // })
  ]
};