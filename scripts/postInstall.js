#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

let isTSProject = false

let rootPath = process.env.INIT_CWD
if (!rootPath) {
  console.log('Skipping post-install.')
  process.exit(0)
}

// Check TS
const pathTSConfig = path.join(rootPath, 'tsconfig.json')
const isTSConfigExist = fs.existsSync(pathTSConfig)
if (!isTSConfigExist) {
  console.log('Not a TS project.')
  process.exit(0)
}
isTSProject = true

// Check RTUI config
const rtConfigFilename = 'react-table-config.d.ts'
const pathRTConfig = path.join(
  rootPath,
  'node_modules',
  'react-table-ui',
  rtConfigFilename
)
const isRTConfigExist = fs.existsSync(pathRTConfig)
if (!isRTConfigExist) {
  console.log('RTUI is not installed.')
  process.exit(1)
}

const pathRTConfigDestination = path.join(rootPath, 'src', rtConfigFilename)
try {
  fs.copyFileSync(pathRTConfig, pathRTConfigDestination)
  console.log('SUCCESS: React Table configuration added.')
  process.exit(0)
} catch {
  console.log(`FAILED: React Table configuration couldn't be added.`)
  process.exit(1)
}
