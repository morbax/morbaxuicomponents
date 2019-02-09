require('@babel/register');
require('@babel/plugin-proposal-class-properties');

module.exports = {
    webpackConfig: Object.assign({}, require('./scripts/webpack/build.js'), {
        module: {
            rules: [
                {
                    test: /\.js?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader?modules'
                },
                {
                    test:    /\.jpe?g|png|svg$/,
                    use:     {
                        loader:  'url-loader',
                        options: {
                            fallback: 'file-loader',
                            limit:    8192,
                            name:     'images/[name].[hash:5].[ext]',
                        },
                    },
                },
            ]
        }
    }),
    sections: [
        {
            name: 'd3.js Charts',
            components: [
                './source/components/RadarChart/index.js',
                './source/components/ProgressChart/index.js',
                './source/components/FunnelChart/index.js',
            ],
            exampleMode: 'expand',
    		    usageMode: 'expand',
        }
    ],
    theme: {
        color: {
            link: '#fff',
            linkHover: '#aaa',
            sidebarBackground: '#5a59ca',
        },
        fontFamily: {
            base: 'monospace'
        }
    },
    styles: {
        Logo: {
            // We're changing the LogoRenderer component
            logo: {
                color: '#fff',
                animation: 'blink ease-in-out 300ms infinite'
            },
            '@keyframes blink': {
                to: { opacity: 0 }
            }
        }
    }
};
