#!/usr/bin/env node
// Script to publish CLI to NPM.
// @ts-check

const { npmPublish } = require('@jsdevtools/npm-publish')
const { readFileSync, writeFileSync } = require('fs')
const { spawnSync } = require('child_process')
const manifestPath = './package.json'

publishToNpm().then(handleSuccess).catch(handleError)

async function publishToNpm() {
  console.log('Publishing package to NPM...')

  const manifest = getPackageJson()
  const { name, version: currentVersion } = manifest
  const publishedVersion = getPublishedVersion(name)

  if (publishedVersion === currentVersion) {
    return publishCanary(manifest)
  }

  return publishLatest()
}

async function publishLatest() {
  const result = await npmPublish({ checkVersion: true })

  return result
}

async function publishCanary(manifest, tag = 'canary') {
  const canaryVersion = `${manifest.version}-${tag}.${Date.now().valueOf()}`
  const canaryManifest = { ...manifest, version: canaryVersion }
  writeFileSync(manifestPath, JSON.stringify(canaryManifest, null, 2))

  console.log('Publishing', tag, 'version:', canaryVersion)
  return npmPublish({ tag })
}

/** @param {import("@jsdevtools/npm-publish").Results} results */
function handleSuccess({ version, package: packageName }) {
  console.log(
    `Link : https://www.npmjs.com/package/${packageName}/v/${version}`
  )
}

function handleError(error) {
  console.error(error.message)
  process.exit(1)
}

function getPackageJson() {
  const packageJson = readFileSync(manifestPath, 'utf8')
  return JSON.parse(packageJson)
}

function getPublishedVersion(name) {
  const result = spawnSync('npm', ['view', name, 'version', '--silent'], {
    encoding: 'utf-8'
  })
  return result.stdout.trim().split('\\')[0]
}
