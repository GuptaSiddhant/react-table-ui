#!/usr/bin/env node
// @ts-check

const args = process.argv.slice(2)

const isWatchMode = args.includes('watch')

const externalPackages = [
  'react-table-sticky',
  'react-table',
  'react',
  '@types/react-table',
  '@types/react'
]

/** @type import('esbuild').WatchMode */
const watchMode = {
  onRebuild(error, result) {
    if (error) console.error('Build failed:', error)
    else {
      console.log('Build succeeded')
      result.warnings.forEach(console.log)
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
  external: externalPackages,
  treeShaking: true,
  chunkNames: 'chunks/[name]-[hash]',
  color: true,
  logLevel: 'info',
  logLimit: 5
}

// Execute ESBuild
require('esbuild')
  .build({ ...esbuildOptions })
  .catch(() => process.exit(1))
