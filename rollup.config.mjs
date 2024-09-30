// Config file for running Rollup in "normal" mode (non-watch)
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';

export default {
    input: 'src/js/index.js',
    output: [
        {
            file: "build/js/wrf-domain-wizard.js",
            format: 'umd',
            name: 'WRF',
            sourcemap: true,
            extend: true,
        }
    ],
    plugins: [
        resolve(),
        commonjs(),
        babel({
            // only transpile our source code
            exclude: 'node_modules/**',
            babelHelpers: 'bundled'
        }),
        json()
    ],
    watch: {
        include: './src/js/**',
        clearScreen: false
    }
};
