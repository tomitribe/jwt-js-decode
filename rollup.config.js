import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import camelCase from 'lodash.camelcase';

import pkg from './package.json';

const {terser} = require('rollup-plugin-terser');

const libraryName = pkg.name;

const baseConfig = {
    input: 'src/index.ts',
    watch: {
        include: 'src/**'
    },
    plugins: [
        typescript({useTsconfigDeclarationDir: true}),
        commonjs(),
        json(),
        sourceMaps()
    ]
};
const es6Config = Object.assign({}, baseConfig, {
    output: {
        file: pkg.es6,
        format: 'es',
        sourcemap: true,
        global: ['crypto']
    },
    external: ['pako', 'crypto'],
    plugins: [
        resolve(),
        typescript({
            useTsconfigDeclarationDir: true,
            tsconfigOverride: {
                compilerOptions: {
                    target: 'es6',
                    declaration: true
                }
            }
        }),
        commonjs(),
        json(),
        sourceMaps()
    ]
});

// separate lib with external `pako` lib as a base
const libConfig = Object.assign({}, baseConfig, {
    external: ['pako', 'crypto'],
    output: [
        {
            file: pkg.module,
            format: 'es',
            sourcemap: true,
            globals: ['pako', 'crypto']
        },
        {
            file: pkg.main,
            name: camelCase(libraryName),
            format: 'umd',
            sourcemap: true,
            exports: 'named',
            globals: ['pako', 'crypto']
        },
        {
            file: pkg.common,
            name: camelCase(libraryName),
            format: 'cjs',
            sourcemap: true,
            exports: 'named',
            globals: ['pako', 'crypto']
        }
    ]
});

const libConfigMin = Object.assign({}, baseConfig, {
    external: ['pako', 'crypto'],
    output: [].concat(libConfig.output, [es6Config.output]).map(function (item) {
        return Object.assign({}, item, {file: item.file.replace(/\.js$/, ".min.js"), sourcemap: false});
    }),
    plugins: [
        resolve(),
        typescript({useTsconfigDeclarationDir: true}),
        commonjs(),
        json(),
        terser({
            compress: {warnings: false},
            output: {comments: false},
            mangle: false
        })]
});

const browserConfig = Object.assign({}, baseConfig, {
    external: ['crypto'],
    output: {
        file: pkg.browser,
        name: camelCase(libraryName),
        format: 'esm',
        exports: 'named',
        sourcemap: false,
        globals: ['crypto']
    },
    plugins: [
        resolve({
            mainFields: ['browser'],
            isBrowser: true
        }),
        typescript({
            useTsconfigDeclarationDir: true,
            tsconfigOverride: {
                compilerOptions: {
                    target: 'esnext',
                    declaration: true
                }
            }
        }),
        json(),
        commonjs(),
        terser({
            compress: {warnings: false},
            output: {comments: false},
            mangle: false
        })]
});

const packedConfig = Object.assign({}, baseConfig, {
    external: ['crypto'],
    output: {
        file: pkg.packed,
        name: camelCase(libraryName),
        format: 'iife',
        exports: 'named',
        sourcemap: false,
        globals: ['crypto']
    },
    plugins: [resolve({
        mainFields: ['browser'],
        isBrowser: true
    }),
        typescript({
            useTsconfigDeclarationDir: true,
            tsconfigOverride: {
                compilerOptions: {
                    target: 'esnext',
                    declaration: true
                }
            }
        }),
        json(),
        commonjs(),
        terser({
            compress: {warnings: false},
            output: {comments: false},
            mangle: false
        })]
});
//
export default [es6Config, libConfig, libConfigMin, packedConfig, browserConfig];
