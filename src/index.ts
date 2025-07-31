import { world, system } from '@minecraft/server'

function main_tick() {
  if (system.currentTick % 100 === 0) {
    world.sendMessage('Test4 Tick: ' + system.currentTick)
  }
  system.run(main_tick)
}
system.run(main_tick)