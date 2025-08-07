import { CommandPermissionLevel, CustomCommandParamType, CustomCommandStatus, EntityComponentTypes, Player, system, world } from '@minecraft/server'
import { MinecraftEntityTypes } from 'vanilla-data/index'
import { menu_display, menu_inicialize } from 'menu'
import { player_hp_get, player_hp_set, player_inicialize, player_max_hp_get, player_xp_gain } from 'player'
import { item_t } from 'types'
import { random_range } from 'utils/math'
import { tooltip_damage_indicator, tooltip_display_name } from 'tooltip'

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
  customCommandRegistry.registerCommand({
    name: 'sao:xp_gain',
    description: 'SAO XP Gain',
    permissionLevel: CommandPermissionLevel.Admin,
    cheatsRequired: true,
    mandatoryParameters: [
      { name: 'quantity', type: CustomCommandParamType.Integer }
    ]
  }, (event, quantity) => {
    const player = <Player>event.sourceEntity
    world.sendMessage(`quantity ${quantity} ${typeof quantity}`)
    tooltip_display_name(player, `§l§fExp ${quantity}\n`)
    player_xp_gain(player, quantity)
    return {
      status: CustomCommandStatus.Success
    }
  })
})
world.afterEvents.playerSpawn.subscribe(event => {
  const { player } = event
  player_inicialize(player)
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
  // player_health_cap
  if (entity.typeId === MinecraftEntityTypes.Player) {
    const player = <Player>entity
    const max_hp = player_max_hp_get(player)
    if (newValue > max_hp) {
      return player_hp_set(player, max_hp)
    }
  }
  tooltip_damage_indicator(entity, Math.floor(newValue - oldValue))
})

world.beforeEvents.playerInteractWithEntity.subscribe(event => {
  system.run(() => {
    // display_name
    const { target } = event
    tooltip_display_name(target, `§l§f${target.typeId}`)
  })
})
world.afterEvents.entityDie.subscribe(event => {
  const { damageSource, deadEntity } = event
  if (damageSource.damagingEntity?.typeId === MinecraftEntityTypes.Player) {
    const experience = <number>deadEntity.getProperty('sao:exp') || 0
    const col = <number>deadEntity.getProperty('sao:col') || 0
    tooltip_display_name(
      deadEntity,
      `§l§fResult\n`
      + `§l§fExp ${experience}\n`
      + `§l§fCol ${col}`
    )
    if (experience > 0) {
      const player = <Player>damageSource.damagingEntity
      player_xp_gain(player, experience)
    }
    if (col > 0) {
      const player = <Player>damageSource.damagingEntity
      // player_col_gain(player, col)
    }
  }
})