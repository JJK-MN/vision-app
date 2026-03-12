// babel.config.js
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    // add any other Babel plugins your project requires above this line
    // **the Reanimated plugin must be the very last entry in the array**
    'react-native-reanimated/plugin',
  ],
};