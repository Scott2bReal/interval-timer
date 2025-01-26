import eslint from '@eslint/js'
import eslintPluginTailwindCss from 'eslint-plugin-tailwindcss'
import tseslint from 'typescript-eslint'

/** @type {import("eslint").Linter.Config} */
export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/enforces-negative-arbitrary-values': 'warn',
      'tailwindcss/enforces-shorthand': 'warn',
      'tailwindcss/migration-from-tailwind-2': 'warn',
      'tailwindcss/no-custom-classname': 'warn',
      'tailwindcss/no-contradicting-classname': 'error',
      'tailwindcss/no-unnecessary-arbitrary-value': 'warn',
    },
    plugins: {
      tailwindcss: eslintPluginTailwindCss,
    },
  }
)
