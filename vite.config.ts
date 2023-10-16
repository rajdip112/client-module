import { UserConfigExport, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { name } from './package.json'
// import dts from 'vite-plugin-dts'

const App = async (): Promise<UserConfigExport> => {
  // https://vitejs.dev/config/
  return defineConfig({
    server: {
      port: 4200,
      host: 'localhost',
    },
    plugins: [
      react(),
      // dts({ insertTypesEntry: true })
    ],
    publicDir: false,
    // base: getBaseUrl(mode) + '/data/_ajax.php',
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/lib/index.ts'),
        name,
        formats: ['es', 'umd'],
        fileName: (format) => `${name}.${format}.js`
      },
      // outDir: `./mui`,
      // assetsDir: './index.ts',
      rollupOptions: {
        external: ['react', 'react-dom', '@mui/material', '@mui/x-data-grid-pro'],

        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            '@mui/material': '@mui/material',
            '@mui/x-data-grid-pro': '@mui/x-data-grid-pro'
          },
          // entryFileNames: 'index.js' //name of bundle
        }
      }
    },

  })
}

export default App

