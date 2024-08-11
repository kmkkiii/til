import antfu from '@antfu/eslint-config';

export default antfu({
	stylistic: {
		semi: true,
		indent: 'tab',
	},
	markdown: true,
	astro: true,
	yaml: true,
	ignores: [
		'.pages.yml',
	],
});
