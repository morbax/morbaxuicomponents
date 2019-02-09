/* eslint-disable no-console */

// Core
import merge from 'webpack-merge';
import chalk from 'chalk';

// Constants
import { SOURCE, BUILD } from '../../constants';

// Webpack modules
import {
    loadJavaScript,
    loadFonts,
    loadImages,
    setupHtml,
    setupContextReplacement,
    initializeEnvVariables,
} from '../modules';

export default () => {
    const { NODE_ENV } = process.env;

    return merge(
        // Loaders
        loadJavaScript(),
        loadFonts(),
        loadImages(),

        // Plugins
        setupHtml(),
        setupContextReplacement(),
        initializeEnvVariables({
            __ENV__:  JSON.stringify(NODE_ENV),
            __DEV__:  NODE_ENV === 'development',
            __PROD__: NODE_ENV === 'production',
        }),
        {
            entry: ['regenerator-runtime/runtime', SOURCE],
            output: {
                path:       BUILD,
                publicPath: '/',
            },
            resolve: {
                extensions: [
                    '.mjs',
                    '.js',
                    '.json',
                    '.css',
                    '.m.css',
                    '.png',
                    '.jpg',
                ],
                modules: [ SOURCE, 'node_modules' ],
            },
            optimization: {
                nodeEnv: NODE_ENV,
            },
            stats: false,
        },
    );
};
