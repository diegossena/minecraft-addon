import { EntityComponentTypes, Player, system, world } from '@minecraft/server'
import { player_attribute_t } from 'types'

export const MAX_LEVEL = 220
export const STAMINA_MODIFIER = 3.5
export const STAMINA_REGEN_RATE = 1
export const STRENGHT_MODIFIER = 2.5

export function player_reset(player: Player) {
  player_level_set(player, 1)
  player_xp_set(player, 0)
  player_stamina_set(player, STAMINA_MODIFIER)
  player_attribute_points_set(player, 0)
  player_strenght_set(player, 1)
  player_agility_set(player, 1)
  player_hp_set(player, player_hp_from_level(1))
}
// hud
export function player_hud_update(player: Player) {
  const hp = player_hp_get(player)
  const level = player_level_get(player)
  const max_hp = player_hp_from_level(level)
  const stamina = player_stamina_get(player)
  const max_stamina = player_max_stamina_get(player)
  const health_bar = `health_bar:${Math.floor(hp / max_hp * 100)}`
  const stamina_bar = `stamina_bar:${Math.floor(stamina / max_stamina * 100)}`
  const hp_label = `${Math.floor(hp)}/${max_hp}`.padStart(13, ' ')
  const level_label = level.toString().padStart(3, ' ')
  player.onScreenDisplay.setTitle(health_bar + stamina_bar, {
    fadeInDuration: 0,
    fadeOutDuration: 0,
    stayDuration: 0,
    subtitle: `hud_label:§r${hp_label}  LV: ${level_label}`
  })
}
// level
export function player_level_get(player: Player) {
  return <number>player.getProperty('sao:level')
}
function player_level_set(player: Player, level: number) {
  player.setProperty('sao:level', level)
}
// xp
export function player_xp_get(player: Player) {
  return <number>player.getDynamicProperty('sao:xp')
}
function player_xp_set(player: Player, value: number) {
  player.setDynamicProperty('sao:xp', value)
}
export function player_xp_gain(player: Player, value: number) {
  let level = player_level_get(player)
  let xp = player_xp_get(player) + value
  let attribute_points = 0
  while (true) {
    const player_xp_to_levelup = player_level_to_xp(level + 1)
    if (xp >= player_xp_to_levelup) {
      // levelup
      xp -= player_xp_to_levelup
      ++level
      attribute_points += 3
    } else {
      break
    }
  }
  system.run(() => {
    if (attribute_points > 0) {
      player_attribute_points_set(player, player_attribute_points_get(player) + attribute_points)
      player_level_set(player, level)
    }
    player_xp_set(player, xp)
  })
}
// attribute_points
export function player_attribute_points_get(player: Player) {
  return <number>player.getDynamicProperty('sao:attribute_points')
}
function player_attribute_points_set(player: Player, value: number) {
  player.setDynamicProperty('sao:attribute_points', value)
}
export function player_attribute_add(player: Player, attribute: player_attribute_t, quantity: number) {
  const attribute_points = player_attribute_points_get(player)
  if (quantity > attribute_points) {
    return
  }
  switch (attribute) {
    case player_attribute_t.strength:
      player_strenght_set(player, player_strenght_get(player) + quantity)
      break
    case player_attribute_t.agility:
      player_agility_set(player, player_agility_get(player) + quantity)
      break
  }
  player_attribute_points_set(player, attribute_points - quantity)
}
// hp
export function player_hp_get(player: Player) {
  const health = player.getComponent(EntityComponentTypes.Health)
  return <number>health.currentValue
}
export function player_hp_set(player: Player, value: number) {
  const health = player.getComponent(EntityComponentTypes.Health)
  health.setCurrentValue(value)
  player_hud_update(player)
}
// max_hp
export function player_max_hp_get(player: Player) {
  const level = player_level_get(player)
  return player_hp_from_level(level)
}
// stamina
export function player_stamina_get(player: Player) {
  return <number>player.getDynamicProperty('sao:stamina')
}
export function player_max_stamina_get(player: Player) {
  const agility = player_agility_get(player)
  return agility * STAMINA_MODIFIER
}
export function player_stamina_set(player: Player, value: number) {
  player.setDynamicProperty('sao:stamina', value)
  player_hud_update(player)
}
// strenght
export function player_strenght_get(player: Player) {
  return <number>player.getDynamicProperty('sao:strenght')
}
function player_strenght_set(player: Player, value: number) {
  player.setDynamicProperty('sao:strenght', value)
}
// agility
export function player_agility_get(player: Player) {
  return <number>player.getDynamicProperty('sao:agility')
}
function player_agility_set(player: Player, value: number) {
  player.setDynamicProperty('sao:agility', value)
}

// stats

/*
 * HP
 * LvL 1 250
 * LvL 40 8120
 * LvL 48 9560
 * lvl 70 13126
 * lvl 78 14500
 * lvl 96 18500
 * 
 * MAX lvl 220 101734
*/
export function player_hp_from_level(level: number) {
  return Math.round(
    -0.0000017743718 * Math.pow(level, 5) +
    0.000759665868 * Math.pow(level, 4) -
    0.0924773996 * Math.pow(level, 3) +
    3.89494445 * Math.pow(level, 2) +
    148.651198 * level +
    97.545577
  )
}
export function player_level_to_xp(level: number) {
  return Math.floor((50 / 3) * (Math.pow(level, 3) - 6 * Math.pow(level, 2) + 17 * level - 12))
}
export function player_level_from_xp(xp: number) {
  for (let level = 1; level <= 220; level++) {
    const required_xp = player_level_to_xp(level)
    if (xp < required_xp)
      return level - 1
  }
  return 1000
}
export function player_skill_slots_from_level(level: number) {
  let slots = 2
  if (level >= 6) {
    slots += 3
  }
  if (level >= 12) {
    slots += 4
  }
  if (level >= 20) {
    slots += 5
  }
  if (level >= 30) {
    slots += Math.floor((level - 20) / 10)
  }
  return slots
}