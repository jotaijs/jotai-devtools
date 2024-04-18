module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-remove-declaration': {
      remove: {
        body: '*',
      },
    },
  },
};
