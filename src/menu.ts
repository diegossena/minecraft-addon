import {
  ItemStack, ItemTypes, ItemLockMode,
  system,
  Player,
  EntityComponentTypes,
  world,
} from '@minecraft/server'
import { ActionFormData, ActionFormResponse } from '@minecraft/server-ui'
import { player_agility_get, player_agility_set, player_hp_get, player_level_get, player_level_to_xp, player_max_hp_get, player_stat_points_get, player_stat_points_set, player_strenght_get, player_strenght_set, player_xp_get } from 'player'
import { item_t, cursor_t } from 'types'


export function menu_inicialize(player: Player) {
  const inventory = player.getComponent('minecraft:inventory')?.container
  if (!inventory)
    return
  const menu_slot = inventory.getSlot(8)
  if (menu_slot.getItem()?.typeId === item_t.menu)
    return
  const menu_item = ItemTypes.get(item_t.menu)
  const menu_stack = new ItemStack(menu_item, 1)
  system.run(() => {
    menu_stack.keepOnDeath = true
    menu_stack.lockMode = ItemLockMode.slot
    menu_slot.setItem(menu_stack)
  })
}
/**
 * Level
 * Experiencia
 * Vida
 * Força: 9.0
 * Agilidade: 1.0
 * Resistencia: 0.0
 */
export function menu_display(player: Player) {
  const player_level = player_level_get(player)
  const player_xp = player_xp_get(player)
  const player_levelup_xp = player_level_to_xp(player_level + 1)
  const player_hp = player_hp_get(player)
  const player_max_hp = player_max_hp_get(player)
  const strenght = player_strenght_get(player)
  const agility = player_agility_get(player)
  const skill_points = player_stat_points_get(player)
  const cursor_id = cursor_t.green
  const form = new ActionFormData()
    .title('sao.ui.main')
    .header(player.name)
    .body({
      translate: 'sao.ui.status.text',
      with: {
        rawtext: [
          {
            text: `: §9${player_level}§r\n`
          },
          {
            text: `: §9${player_xp}§r/${player_levelup_xp}\n`
          },
          {
            text: `: §c${Math.floor(player_hp)}§r/${player_max_hp}\n`
          },
          {
            rawtext: [
              { text: ': §9' },
              { translate: `sao.cursor.${cursor_id}` },
              { text: '§r\n' },
            ]
          },
          {
            text: `: ${skill_points > 0 ? '§q' : '§9'}${skill_points}§r\n\n`
          },
        ]
      }
    })
    .button(`Strength: §9${strenght}`)
    .button(`Agility: §9${agility}`)
    .button(`Resistance: §9${0.0}`)
  function onresponse(response: ActionFormResponse) {
    if (skill_points > 0) {
      switch (response.selection) {
        case 0:
          player_strenght_set(player, player_strenght_get(player) + 1)
          player_stat_points_set(player, skill_points - 1)
          break
        case 1:
          player_agility_set(player, player_agility_get(player) + 1)
          player_stat_points_set(player, skill_points - 1)
          break
      }
    }
    if (!response.canceled) {
      menu_display(player)
    }
  }
  function display() {
    form.show(<any>player).then(onresponse)
  }
  system.run(display)
}