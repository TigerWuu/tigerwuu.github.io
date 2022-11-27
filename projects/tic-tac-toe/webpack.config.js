var path = require("path");

module.exports = {
    mode: "development",
    context: path.resolve(__dirname),
    entry: {
        main: './src/main.js',
        nightmare: './src_nightmare/main_nightmare.js'
    },
    output: {
        path: path.resolve(__dirname, 'dst'),
        filename: '[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
};