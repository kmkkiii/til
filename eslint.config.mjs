import antfu from '@antfu/eslint-config';

export default antfu({
  stylistic: {
    semi: true,
    indent: 2,
  },
  markdown: true,
  astro: true,
  yaml: true,
  ignores: [
    '.pages.yml',
  ],
});
