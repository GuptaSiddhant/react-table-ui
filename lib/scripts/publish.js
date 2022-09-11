// @ts-check

const { npmPublish } = require('@jsdevtools/npm-publish')
const { spawnSync } = require('child_process')
const { readFileSync, writeFileSync } = require('fs')
const manifestPath = './package.json'

publishToNpm().then(handleSuccess).catch(handleError)

async function publishToNpm() {
  console.log('Publishing package to NPM...')

  const manifest = getPackageJson()
  const { name, version: currentVersion } = manifest
  const publishedVersion = getPublishedVersion(name)

  console.log('Current published version:', currentVersion)

  if (publishedVersion === currentVersion) {
    return await publishCanary(manifest)
  }

  return await publishLatest(currentVersion)
}

async function publishLatest(version) {
  const result = await npmPublish({ checkVersion: true, access: 'public' })
  gitTag(version)

  return result
}

async function publishCanary(manifest, tag = 'canary') {
  const canaryVersion = `${manifest.version}-${tag}.${Date.now().valueOf()}`
  const canaryManifest = { ...manifest, version: canaryVersion }
  writeFileSync(manifestPath, JSON.stringify(canaryManifest, null, 2))

  console.log('Publishing', tag, 'version:', canaryVersion)
  return npmPublish({ tag, access: 'public' })
}

/** @param {import("@jsdevtools/npm-publish").Results} results */
function handleSuccess({ package: name, tag, version }) {
  console.log()
  console.log(`Usage: npm install ${name}@${tag}`)
  console.log(`Link : https://www.npmjs.com/package/${name}/v/${version}`)
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

/** @param {string} version */
function gitTag(version) {
  spawnSync('git', ['config', '--local', 'user.email', `"action@github.com"`])
  spawnSync('git', ['config', '--local', 'user.name', `"GitHub Action"`])

  spawnSync('git', ['tag', '-a', `v${version}`, '-m', `Release v${version}`])
}
