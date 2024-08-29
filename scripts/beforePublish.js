const { execSync } = require('child_process')
const package = require('../package.json')


const check = async () => {
  const npmVersion = package.version
  const releaseVersion = execSync(`git ls-remote https://github.com/stakewise/v3-deposit-data-parser refs/tags/v${npmVersion}`, { encoding: 'utf8' })
    .replace(/.*\//, '')
    .replace(/v/g, '')
    .trim()

    console.log('releaseVersion ---', releaseVersion)

  if (npmVersion !== releaseVersion || !releaseVersion) {
    console.error(`Please add ${npmVersion} release to Github https://github.com/stakewise/v3-deposit-data-parser/releases/new`)
    process.exit(1)
  }
  else {
    process.exit(0)
  }
}

check()
