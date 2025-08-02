import fs from 'fs'
import { v4 as uuid } from 'uuid'
import behavior_manifest from '../behavior_pack/manifest.json'
import resource_manifest from '../resource_pack/manifest.json'

behavior_manifest.header.uuid = uuid()
resource_manifest.header.uuid = uuid()

behavior_manifest.dependencies[0].uuid = resource_manifest.header.uuid
resource_manifest.dependencies[0].uuid = behavior_manifest.header.uuid
// persist
fs.writeFileSync(
  'behavior_pack/manifest.json',
  JSON.stringify(behavior_manifest, null, 2)
)
fs.writeFileSync(
  'resource_pack/manifest.json',
  JSON.stringify(resource_manifest, null, 2)
)