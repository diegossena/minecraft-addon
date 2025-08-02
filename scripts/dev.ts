import fs from 'fs/promises'
import path from 'path'
import { spawn, exec } from 'child_process'
import assert from 'assert'
import package_json from '../package.json'
import { promisify } from 'util'

assert(process.env['LOCALAPPDATA'])

const root_path = path.resolve(
  process.env['LOCALAPPDATA'], 'Packages',
  'Microsoft.MinecraftUWP_8wekyb3d8bbwe', 'LocalState', 'games', 'com.mojang'
)
function noop() { }
async function resource() {
  const resource_target_path = path.join(root_path, 'development_resource_packs', package_json.name)
  const resource_path = path.resolve('resource_pack')
  await fs.rm(resource_target_path, { recursive: true, force: true }).catch(noop)
  spawn('xcopy', [resource_path, resource_target_path, '/i', '/s']).stdout.pipe(process.stdout)
} resource()
async function behavior() {
  const behavior_path = path.resolve('behavior_pack')
  const behavior_target_path = path.join(root_path, 'development_behavior_packs', package_json.name)
  const script_path = path.resolve('.script')
  const script_target_path = path.join(root_path, 'development_behavior_packs', package_json.name, 'scripts')
  await fs.rm(behavior_target_path, { recursive: true, force: true }).catch(noop)
  spawn('xcopy', [behavior_path, behavior_target_path, '/i', '/s']).stdout.pipe(process.stdout)
  await promisify(exec)('tsc')
  spawn('xcopy', [script_path, script_target_path, '/i', '/s']).stdout.pipe(process.stdout)
} behavior()