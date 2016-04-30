// Webpack config file
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
        }]
    },
};