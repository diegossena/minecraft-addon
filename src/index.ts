import { world } from '@minecraft/server'
import * as menu from 'menu'

world.afterEvents.playerSpawn.subscribe(event => {
  menu.onplayerspawn(event)
})
world.beforeEvents.itemUse.subscribe(event => {
  menu.onitemuse(event)
})