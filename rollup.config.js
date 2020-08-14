import path from 'path'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

export default [
  {
    input: path.resolve(__dirname, 'public', 'js', 'index.ts'),
    output: [
      {
        name: 'reactive',
        file: path.resolve(__dirname, 'public', 'js', 'index.js'),
        format: 'es',
      }
    ],
    external: [...Object.keys(pkg.devDependencies || {})],
    plugins: [
      typescript()
    ]
  }
]
