import withNuxt from './.nuxt/eslint.config.mjs';
import pluginVue from 'eslint-plugin-vue';
import stylisticTs from '@stylistic/eslint-plugin-ts';

export default withNuxt([
  ...pluginVue.configs['flat/strongly-recommended'],
  {
    plugins: {
      '@stylistic/ts': stylisticTs
    },
    rules: {
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 1,
          },
          multiline: {
            max: 1,
          },
        },
      ],
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
      "@stylistic/ts/semi": ["warn", "always"],
    },
  },
]);
