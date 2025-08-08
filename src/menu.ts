import {
  ItemStack, ItemTypes, ItemLockMode,
  system,
  Player,
  world
} from '@minecraft/server'
import { ActionFormData, ActionFormResponse } from '@minecraft/server-ui'
import {
  player_agility_get,
  player_attribute_add,
  player_attribute_points_get,
  player_hp_get,
  player_level_get,
  player_level_to_xp,
  player_max_hp_get,
  player_strenght_get,
  player_xp_get
} from 'player'
import { item_t, cursor_t, player_attribute_t } from 'types'


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
  const level = player_level_get(player)
  const xp = player_xp_get(player)
  const player_xp_to_levelup = player_level_to_xp(level + 1)
  const player_hp = player_hp_get(player)
  const player_max_hp = player_max_hp_get(player)
  const strenght = player_strenght_get(player)
  const agility = player_agility_get(player)
  const attribute_points = player_attribute_points_get(player)
  const player_armor = player.getComponent('minecraft:equippable').totalArmor
  const cursor_id = cursor_t.green
  const form = new ActionFormData()
    .title('sao.ui.main')
    .header(player.name)
    .body({
      translate: 'sao.ui.status.text',
      with: {
        rawtext: [
          {
            text: `: §9${level}§r\n`
          },
          {
            text: `: §9${xp}§r/${player_xp_to_levelup}\n`
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
            text: `: ${attribute_points > 0 ? '§q' : '§9'}${attribute_points}§r\n\n`
          },
        ]
      }
    })
    .button(`Strength: §9${strenght}`)
    .button(`Agility: §9${agility}`)
    .button(`Resistance: §9${player_armor}`)
  function onresponse(response: ActionFormResponse) {
    if (attribute_points > 0) {
      switch (response.selection) {
        case 0:
          player_attribute_add(player, player_attribute_t.strength, 1)
          break
        case 1:
          player_attribute_add(player, player_attribute_t.agility, 1)
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