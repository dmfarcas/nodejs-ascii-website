// Webpack config file
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './nodestuff/views/Default.jsx',
    output: {
        path: __dirname + '/public/js',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx$/,
            loader: 'babel-loader'
        },
			{
				test: /\.(less|css)$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
			}]
    },
    plugins: [
        new ExtractTextPlugin('../styles/default.css')
    ]
};
