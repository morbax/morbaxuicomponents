require('@babel/register');
require('@babel/plugin-proposal-class-properties');

module.exports = {
    webpackConfig: Object.assign({}, require('./scripts/webpack/build.js'), {
        module: {
            rules: [
                {
                    test:    /\.js?$/,
                    exclude: /node_modules/,
                    loader:  'babel-loader',
                },
                {
                    test:   /\.css$/,
                    loader: 'style-loader!css-loader?modules',
                },
                {
                    test: /\.jpe?g|png|svg$/,
                    use:  {
                        loader:  'url-loader',
                        options: {
                            fallback: 'file-loader',
                            limit:    8192,
                            name:     'images/[name].[hash:5].[ext]',
                        },
                    },
                }
            ],
        },
    }),
    sections: [
        {
            name:       'Cards',
            components: [
                './source/components/StatisticCard/index.js'
            ],
            exampleMode: 'expand',
            usageMode:   'collapse',
        },
        {
            name:       'Charts',
            components: [
                './source/components/RadarChart/index.js',
                './source/components/ProgressChart/index.js',
                './source/components/FunnelChart/index.js'
            ],
            exampleMode: 'expand',
            usageMode:   'collapse',
        }
    ],
    theme: {
        sidebarWidth: 300,
        color:        {
            link:              '#fff',
            linkHover:         '#a4a4a4',
            sidebarBackground: '#5e5cce',
            border:            '#5e5cce',
        },
        fontFamily: {
            base: 'monospace',
        },
    },
    styles: {
        Logo: {
            logo: {
                color: '#fff',
            },
        },
    },
};
