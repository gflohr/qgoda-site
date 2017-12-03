module.exports = {
    parser: 'postcss-scss',
    plugins: [
        require('postcss-import'),
        require('postcss-cssnext'),
        require('postcss-modules')({
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        }),
        require('postcss-font-magician')()
    ]
}
