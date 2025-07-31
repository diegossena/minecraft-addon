import fs from 'fs'
import path from 'path'
import { Zip } from 'zip-lib'
import package_json from '../package.json'
import behavior_manifest from '../behavior_pack/manifest.json'
import resource_manifest from '../resource_pack/manifest.json'

const target_path = path.resolve('.', '.minecraft')

const behavior_path = path.join(target_path, `${package_json.name}.bp.mcpack`)
const resource_path = path.join(target_path, `${package_json.name}.rp.mcpack`)
const addon_path = path.join(target_path, `${package_json.name}.mcaddon`)

async function behavior_mcpack() {
  behavior_manifest.header.name = package_json.name
  behavior_manifest.header.description = package_json.description
  behavior_manifest.header.version = package_json.version.split('.').map(Number)
  behavior_manifest.dependencies[0].uuid = resource_manifest.header.uuid
  behavior_manifest.dependencies[0].version = package_json.version
  await fs.promises.writeFile(
    'behavior_pack/manifest.json',
    JSON.stringify(behavior_manifest, null, 2)
  )
  const zip = new Zip()
  zip.addFolder('behavior_pack')
  zip.addFolder('.script', 'scripts')
  await zip.archive(behavior_path)
}
async function resource_mcpack() {
  resource_manifest.header.name = package_json.name
  resource_manifest.header.description = package_json.description
  resource_manifest.header.version = package_json.version.split('.').map(Number)
  await fs.promises.writeFile(
    'resource_pack/manifest.json',
    JSON.stringify(resource_manifest, null, 2)
  )
  const zip = new Zip()
  zip.addFolder('resource_pack')
  await zip.archive(resource_path)
}
async function mcaddon() {
  const zip = new Zip()
  await Promise.all([behavior_mcpack(), resource_mcpack()])
  zip.addFile(behavior_path)
  zip.addFile(resource_path)
  await zip.archive(addon_path)
}
mcaddon()