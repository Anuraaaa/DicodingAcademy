module.exports = {
    root: true,
    env: {
        commonjs: true,
        es2021: true,
        node: true
    },
    extends: [
        'standard'
    ],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    rules: {
        indent: 'off'
    }
}
