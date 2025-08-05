import { CommandPermissionLevel, CustomCommandStatus, EntityComponentTypes, Player, system, world } from '@minecraft/server'
import { MinecraftEntityTypes } from 'vanilla-data/index'
import { menu_display, menu_inicialize } from 'menu'
import { player_health_bar_update, player_hp_get, player_inicialize, player_max_hp_get } from 'player'
import { item_t } from 'types'
import { random_range } from 'utils/math'

system.beforeEvents.startup.subscribe(event => {
  const { customCommandRegistry } = event
  customCommandRegistry.registerCommand({
    name: 'sao:menu',
    description: 'SAO Menu Display',
    permissionLevel: CommandPermissionLevel.Any,
    cheatsRequired: false,
  }, event => {
    const player = <Player>event.sourceEntity
    menu_inicialize(player)
    menu_display(player)
    return {
      status: CustomCommandStatus.Success
    }
  })
  customCommandRegistry.registerCommand({
    name: 'sao:health',
    description: 'SAO Player Health',
    permissionLevel: CommandPermissionLevel.Any,
    cheatsRequired: false,
  }, event => {
    const player = <Player>event.sourceEntity
    return {
      status: CustomCommandStatus.Success,
      message: `Max Health ${player_hp_get(player)}`
    }
  })
  customCommandRegistry.registerCommand({
    name: 'sao:max_health',
    description: 'SAO Player Max Health',
    permissionLevel: CommandPermissionLevel.Any,
    cheatsRequired: false,
  }, event => {
    const player = <Player>event.sourceEntity
    return {
      status: CustomCommandStatus.Success,
      message: `Health ${player_max_hp_get(player)}`
    }
  })
})
world.afterEvents.playerSpawn.subscribe(event => {
  const { player } = event
  player_inicialize(player)
  menu_inicialize(player)
})
world.beforeEvents.itemUse.subscribe(event => {
  const { itemStack, source } = event
  switch (itemStack.typeId) {
    case item_t.menu:
      menu_display(source)
      break
  }
})
world.afterEvents.entityHealthChanged.subscribe(event => {
  const { entity, newValue, oldValue } = event
  if (entity.typeId === MinecraftEntityTypes.Player) {
    const player = <Player>entity
    const max_hp = player_max_hp_get(player)
    if (newValue > max_hp) {
      const health = player.getComponent(EntityComponentTypes.Health)
      health.setCurrentValue(max_hp)
    }
    player_health_bar_update(player)
  }
  // damage_indicator
  const damage = Math.floor(newValue - oldValue)
  const color = damage < 0 ? '§e' : '§a'
  const signal = damage < 0 ? '' : '+'
  const variant = entity.getComponent('minecraft:variant')
  const mob_health = entity.getComponent('minecraft:health')
  // entity.name
  world.sendMessage(`${entity.typeId} variant ${variant?.value}`)
  entity.nameTag = `§l${entity.typeId} (${mob_health.currentValue}/${mob_health.effectiveMax})`
  const damage_indicator = entity.dimension.spawnEntity(<any>'sao:damage_indicator', entity.location)
  damage_indicator.nameTag = `§l${color}${signal}${damage}`
  damage_indicator.applyImpulse({
    x: random_range(0, 0.01),
    y: 0.05,
    z: random_range(0, 0.01)
  })
})