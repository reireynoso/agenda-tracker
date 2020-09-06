const path = require('path')

module.exports = {
    //entry point is where the app starts and we provide a realtive path value
    entry: './src/index.js', //relative path
    // output property tells webpack where to emit the outputs it creates and hot to name those files. Have to give absolute path value
    output: {
        path: path.join(__dirname, 'public'), //absolute path
        filename: 'bundle.js' //file name
    },
    //tell webpack how to compile jsx into JS code. We use loader. A loader let's us customize the behavior of webpack when it loads certain files. Its going to run certain files through babel.
    //For that, we setup loaer via the module property. It needs an array of rules and a rule let's us define how we want to use our loaders. We have one rule to take JSX and convert it into JS with babel.
    module: {
        rules: [
            //we have one set of rule where loader tells which loader we want to use, babel-loader. test property for what file we actually want to run this loader on which is js and jsx. exclude property to exlude a set of files and we use node modules cause we don't want babel to run through those libraries.
            {
                test: /\.js$||.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            // new rules to load css
            // {
            //     test: /\.css$/,
            //     //css-loader: allows webpack to load out css assets. //style-loader: take css and adds it to the DOM by injecting a <style> tag
            //     use: ['style-loader', 'css-loader']
            // }
            //new rules to load scss
            {
                test: /\.s?css$/,
                use:['style-loader','css-loader', 'sass-loader']
            }
        ]
    },
    //setup source map through the devtool property. It enhances our debuggin process. Displays original JS while debugging.
    devtool: 'cheap-module-eval-source-map',
    //sets up the webpack-dev-server serving up the public directory
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
    }
};
