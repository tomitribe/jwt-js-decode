import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import uglify from 'rollup-plugin-uglify';
import camelCase from 'lodash.camelcase';

import pkg from './package.json';

const libraryName = pkg.name;

const baseConfig = {
    input: 'src/index.ts',
    watch: {
        include: 'src/**'
    },
    plugins: [
        json(),
        typescript({useTsconfigDeclarationDir: true}),
        commonjs(),
        resolve(),
        sourceMaps()
    ]
};

const es6Config = Object.assign({}, baseConfig, {
    output: {
        file: pkg.es6,
        format: 'es',
        sourcemap: true
    },
    external: ['pako'],
    plugins: [
        json(),
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
        resolve(),
        sourceMaps()
    ]
});

// separate lib with external `pako` lib as a base
const libConfig = Object.assign({}, baseConfig, {
    external: ['pako'],
    output: [
        {
            file: pkg.module,
            format: 'es',
            sourcemap: true,
            globals: ['pako']
        },
        {
            file: pkg.main,
            name: camelCase(libraryName),
            format: 'umd',
            sourcemap: true,
            exports: 'named',
            globals: ['pako']
        },
        {
            file: pkg.common,
            name: camelCase(libraryName),
            format: 'cjs',
            sourcemap: true,
            exports: 'named',
            globals: ['pako']
        }
    ]
});

const browserConfig = Object.assign({}, baseConfig, {
    output: {
        file: pkg.browser,
        name: camelCase(libraryName),
        format: 'umd',
        exports: 'named',
        sourcemap: false
    },
    plugins: [json(), typescript(), commonjs(), resolve(), uglify()]
});

const packedConfig = Object.assign({}, baseConfig, {
    output: {
        file: pkg.packed,
        name: camelCase(libraryName),
        format: 'iife',
        exports: 'named',
        sourcemap: false
    },
    plugins: [json(), typescript(), commonjs(), resolve(), uglify()]
});

export default [es6Config, libConfig, browserConfig, packedConfig];
