const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: ['tr']
    })
  ],
  
     module: {
      rules: [
        {
          test: /\.module\.scss$/,
          use: [
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
      ],
    },
  
};