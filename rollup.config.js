import path from 'path'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

const files = [
  'index', 'count'
]
export default files.map(f => ({
  input: path.resolve(__dirname, 'public', 'js', `${f}.ts`),
  output: [
    {
      name: `reactive-${f}`,
      file: path.resolve(__dirname, 'public', 'js', `${f}.js`),
      format: 'es',
    }
  ],
  external: [...Object.keys(pkg.devDependencies || {})],
  plugins: [
    typescript()
  ]
}))
