module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-prefix-selector': {
      prefix: '#jotai-devtools-root',
      transform(prefix, selector, prefixedSelector) {
        if (selector.startsWith('html') || selector.startsWith('body')) {
          return selector.replace(/^html|^body/, prefix);
        }
        return prefixedSelector;
      },
    },
  },
};
