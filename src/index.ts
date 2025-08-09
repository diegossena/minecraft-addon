import { CommandPermissionLevel, CustomCommandParamType, CustomCommandStatus, EntityComponentTypes, EntityDamageCause, EntityDieAfterEvent, EntityHealthChangedAfterEvent, EntityHurtAfterEvent, ItemUseBeforeEvent, Player, PlayerInteractWithEntityBeforeEvent, PlayerSpawnAfterEvent, StartupEvent, system, world } from '@minecraft/server'
import { MinecraftEntityTypes } from 'vanilla-data/index'
import { menu_display, menu_inicialize } from 'menu'
import {
  player_agility_get,
  player_hp_from_level,
  player_hp_get,
  player_hp_set,
  player_hud_update,
  player_level_get,
  player_max_hp_get,
  player_max_stamina_get,
  player_reset,
  player_stamina_get,
  player_stamina_set,
  player_strenght_get,
  player_xp_gain,
  STAMINA_MODIFIER,
  STAMINA_REGEN_RATE,
  STRENGHT_MODIFIER
} from 'player'
import { item_t } from 'types'
import { tooltip_damage_indicator, tooltip_display_name } from 'tooltip'

function main_tick() {
  for (const player of world.getAllPlayers()) {
    // exhaustion
    const previous_exhaustion = <number>player.getDynamicProperty('sao:exhaustion') || 0
    const exhaustion = player.getComponent(EntityComponentTypes.Exhaustion)
    if (previous_exhaustion !== exhaustion.currentValue) {
      player.setDynamicProperty('sao:exhaustion', exhaustion.currentValue)
      const value = exhaustion.currentValue - previous_exhaustion
      if (value > 0 && value < 1) {
        player_stamina_set(player, player_stamina_get(player) - value)
      }
    }
    // stamina_regen
    if (system.currentTick % 80 === 0) {
      const agility = player_agility_get(player)
      const max_stamina = agility * STAMINA_MODIFIER
      const stamina_regen = agility * STAMINA_REGEN_RATE
      const player_stamina = player_stamina_get(player)
      const stamina = Math.min(player_stamina + stamina_regen, max_stamina)
      if (stamina != player_stamina) {
        player_stamina_set(player, stamina)
      }
    }
  }
}

function onstartup(event: StartupEvent) {
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
    const max_hp = player_max_hp_get(player)
    return {
      status: CustomCommandStatus.Success,
      message: `Health ${max_hp}`
    }
  })
  customCommandRegistry.registerCommand({
    name: 'sao:stamina',
    description: 'SAO Player Stamina',
    permissionLevel: CommandPermissionLevel.Any,
    cheatsRequired: false,
  }, event => {
    const player = <Player>event.sourceEntity
    const stamina = player_stamina_get(player)
    const max_stamina = player_max_stamina_get(player)
    return {
      status: CustomCommandStatus.Success,
      message: `Stamina ${stamina}/${max_stamina}`
    }
  })
  customCommandRegistry.registerCommand({
    name: 'sao:reset',
    description: 'SAO Player Reset',
    permissionLevel: CommandPermissionLevel.Any,
    cheatsRequired: false,
  }, event => {
    system.run(() => {
      player_reset(<Player>event.sourceEntity)
    })
    return { status: CustomCommandStatus.Success }
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
    tooltip_display_name(player, `§l§fExp ${quantity}\n`)
    player_xp_gain(player, quantity)
    return {
      status: CustomCommandStatus.Success
    }
  })
}

function onplayerspawn(event: PlayerSpawnAfterEvent) {
  const { player, initialSpawn } = event
  // player_inicialize
  const level = player_level_get(player)
  if (initialSpawn) {
    player_reset(player)
    menu_inicialize(player)
  }
  player_hp_set(player, player_hp_from_level(level))
}
function onitemuse(event: ItemUseBeforeEvent) {
  const { itemStack, source } = event
  switch (itemStack.typeId) {
    case item_t.menu:
      menu_display(source)
      break
  }
}
function onentityhurt(event: EntityHurtAfterEvent) {
  const { damageSource, hurtEntity, damage } = event
  let additional_damage = 0
  if (
    damageSource.damagingEntity?.typeId === MinecraftEntityTypes.Player
    && damageSource.cause === EntityDamageCause.entityAttack
  ) {
    const player = <Player>damageSource.damagingEntity
    additional_damage = player_strenght_get(player) * STRENGHT_MODIFIER
    const stamina = player_stamina_get(player) - additional_damage
    if (stamina >= 0) {
      player_stamina_set(player, stamina)
    } else {
      additional_damage = 0
    }
  }
  const target_health = hurtEntity.getComponent(EntityComponentTypes.Health)
  const target_hp = Math.max(target_health.currentValue - additional_damage, 0)
  target_health.setCurrentValue(target_hp)
  if (hurtEntity.typeId === MinecraftEntityTypes.Player) {
    player_hud_update(<Player>hurtEntity)
  }
  tooltip_damage_indicator(hurtEntity, -Math.floor(damage + additional_damage))
}
function onhealthchange(event: EntityHealthChangedAfterEvent) {
  const { entity, oldValue } = event
  let newValue = event.newValue
  if (newValue > oldValue) {
    if (entity.typeId === MinecraftEntityTypes.Player) {
      // player_health_cap
      const player = <Player>entity
      newValue = Math.min(newValue, player_max_hp_get(player))
      player_hp_set(player, newValue)
    }
    const result = Math.floor(newValue - oldValue)
    if (result > 0) {
      tooltip_damage_indicator(entity, Math.floor(newValue - oldValue))
    }
  }
}
function onplayerinteractentity(event: PlayerInteractWithEntityBeforeEvent) {
  const { target } = event
  tooltip_display_name(target, `§l§f${target.typeId}`)
}
function onentitydie(event: EntityDieAfterEvent) {
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
}

system.beforeEvents.startup.subscribe(onstartup)
world.afterEvents.playerSpawn.subscribe(onplayerspawn)
world.beforeEvents.itemUse.subscribe(onitemuse)
world.afterEvents.entityHurt.subscribe(onentityhurt)
world.afterEvents.entityHealthChanged.subscribe(onhealthchange)
world.beforeEvents.playerInteractWithEntity.subscribe(onplayerinteractentity)
world.afterEvents.entityDie.subscribe(onentitydie)
system.runInterval(main_tick)