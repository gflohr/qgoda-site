module.exports = {
    parser: 'postcss-scss',
    plugins: [
        require('postcss-import'),
        require('postcss-cssnext'),
        require('postcss-font-magician')()
    ]
}
