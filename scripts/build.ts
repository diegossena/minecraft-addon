import path from 'path'
import { Zip } from 'zip-lib'
import package_json from '../package.json'
import './manifest'

const target_path = path.resolve('.', '.minecraft')

const behavior_path = path.join(target_path, `${package_json.name}.bp.mcpack`)
const resource_path = path.join(target_path, `${package_json.name}.rp.mcpack`)
const addon_path = path.join(target_path, `${package_json.name}.mcaddon`)

async function behavior_mcpack() {
  const zip = new Zip()
  zip.addFolder('behavior_pack')
  zip.addFolder('.script', 'scripts')
  await zip.archive(behavior_path)
}
async function resource_mcpack() {
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