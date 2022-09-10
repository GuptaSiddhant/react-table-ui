#!/usr/bin/env node
// @ts-check

const args = process.argv.slice(2)
const isWatchMode = args.includes('watch')

/** @type import('esbuild').WatchMode */
const watchMode = {
  onRebuild(error, result) {
    if (error) console.error('Build failed:', error)
    else {
      console.log('Build succeeded')
      ;(result?.warnings || []).forEach(console.log)
    }
  }
}

/** @type import('esbuild').BuildOptions */
const esbuildOptions = {
  watch: isWatchMode && watchMode,
  entryPoints: ['./src/index.ts'],
  bundle: true,
  outdir: 'dist',
  format: 'esm',
  minify: true,
  platform: 'neutral',
  sourcemap: 'external',
  splitting: true,
  external: ['react', 'react-*'],
  treeShaking: true,
  chunkNames: 'chunks/[name]-[hash]',
  color: true,
  logLevel: 'info',
  logLimit: 5
}

console.log('Building types...')
require('child_process').spawnSync(
  'npx',
  isWatchMode ? ['tsc', '--watch'] : ['tsc']
)

// Execute ESBuild
console.log('Building with ESBuild...')
require('esbuild')
  .build({ ...esbuildOptions })
  .catch(() => process.exit(1))
