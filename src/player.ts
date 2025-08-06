import { EntityComponentTypes, Player } from '@minecraft/server'

export const MAX_LEVEL = 220

export function player_inicialize(player: Player) {
  let max_health = player_max_hp_get(player)
  if (!max_health) {
    player_level_set(player, 1)
    player_xp_set(player, 0)
    max_health = player_hp_from_level(1)
    player_max_hp_set(player, max_health)
    player_strenght_set(player, 1)
    player_agility_set(player, 1)
    player_stat_points_set(player, 0)
    player_skill_slots_set(player, player_skill_slots_from_level(1))
  }
  player_hp_set(player, max_health)
  player_health_bar_update(player)
}

// hud
export function player_health_bar_update(player: Player) {
  const hp = player_hp_get(player)
  const max_hp = player_max_hp_get(player)
  player.onScreenDisplay.setTitle(`health_bar:${Math.floor(hp / max_hp * 100)}`, {
    fadeInDuration: 0,
    fadeOutDuration: 0,
    stayDuration: 0,
    subtitle: `health_bar_label:§r${Math.floor(hp)}/${max_hp}`
  })
}
// level
export function player_level_get(player: Player) {
  return <number>player.getDynamicProperty('sao:level')
}
export function player_level_set(player: Player, level: number) {
  player.setDynamicProperty('sao:level', level)
}
// xp
export function player_xp_get(player: Player) {
  return <number>player.getDynamicProperty('sao:xp')
}
export function player_xp_set(player: Player, xp: number) {
  player.setDynamicProperty('sao:xp', xp)
}
// skill_slots
export function player_skill_slots_get(player: Player) {
  return <number>player.getDynamicProperty('sao:skill_slots')
}
export function player_skill_slots_set(player: Player, value: number) {
  player.setDynamicProperty('sao:skill_slots', value)
}
// stat_points
export function player_stat_points_get(player: Player) {
  return <number>player.getDynamicProperty('sao:stat_points')
}
export function player_stat_points_set(player: Player, value: number) {
  player.setDynamicProperty('sao:stat_points', value)
}
// hp
export function player_hp_get(player: Player) {
  const health = player.getComponent(EntityComponentTypes.Health)
  return <number>health.currentValue
}
export function player_hp_set(player: Player, value: number) {
  const health = player.getComponent(EntityComponentTypes.Health)
  health.setCurrentValue(value)
}
// max_hp
export function player_max_hp_get(player: Player) {
  return <number>player.getDynamicProperty('sao:max_hp')
}
export function player_max_hp_set(player: Player, hp: number) {
  player.setDynamicProperty('sao:max_hp', hp)
  player_health_bar_update(player)
}
// strenght
export function player_strenght_get(player: Player) {
  const value = <number>player.getDynamicProperty('sao:strenght')
  return value
}
export function player_strenght_set(player: Player, value: number) {
  player.setDynamicProperty('sao:strenght', value)
}
// agility
export function player_agility_get(player: Player) {
  const value = <number>player.getDynamicProperty('sao:agility')
  return value
}
export function player_agility_set(player: Player, value: number) {
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