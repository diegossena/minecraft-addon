import fs from 'fs'
import behavior_manifest from '../behavior_pack/manifest.json'
import resource_manifest from '../resource_pack/manifest.json'
import package_json from '../package.json'

const version = package_json.version.split('.').map(Number)
// behavior
behavior_manifest.header.name = package_json.name
behavior_manifest.header.description = package_json.description
behavior_manifest.header.version = version
behavior_manifest.dependencies[0].version = version
// resource
resource_manifest.header.name = package_json.name
resource_manifest.header.description = package_json.description
resource_manifest.header.version = package_json.version.split('.').map(Number)
resource_manifest.dependencies[0].version = version
// persist
fs.writeFileSync(
  'behavior_pack/manifest.json',
  JSON.stringify(behavior_manifest, null, 2)
)
fs.writeFileSync(
  'resource_pack/manifest.json',
  JSON.stringify(resource_manifest, null, 2)
)