/**  @type {import('lint-staged').Config} */
export default {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.json': ['prettier --write'],
  '*.vue': ['eslint --fix', 'prettier --write', 'stylelint --fix --allow-empty-input'],
  '*.{scss,less,styl,html}': ['stylelint --fix --allow-empty-input', 'prettier --write'],
  '*.md': ['prettier --write'],
};
