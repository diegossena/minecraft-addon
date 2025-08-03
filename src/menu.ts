import {
  ItemStack, ItemTypes, ItemLockMode, PlayerSpawnAfterEvent, ItemUseBeforeEvent,
  system,
  world
} from '@minecraft/server'
import { ActionFormData } from '@minecraft/server-ui'
import { item_t, cursor_t } from 'types'

export function onplayerspawn(event: PlayerSpawnAfterEvent) {
  const { player } = event
  const inventory = player.getComponent('minecraft:inventory')?.container
  if (!inventory)
    return
  const menu_slot = inventory.getSlot(8)
  if (menu_slot.getItem()?.typeId !== item_t.menu) {
    const menu_item = ItemTypes.get(item_t.menu)
    const menu_stack = new ItemStack(menu_item, 1)
    menu_stack.keepOnDeath = true
    menu_stack.lockMode = ItemLockMode.slot
    menu_slot.setItem(menu_stack)
  }
}
export function onitemuse(event: ItemUseBeforeEvent) {
  const { itemStack, source } = event
  if (itemStack.typeId !== item_t.menu)
    return
  const player_level = 1000
  const player_xp = 998
  const player_levelup_xp = 999
  const cursor_id = cursor_t.green
  const form = new ActionFormData()
    .title('sao.ui.main')
    .header(source.name)
    .body({
      translate: 'sao.ui.status.text',
      with: {
        rawtext: [
          {
            text: ` §9${player_level}§r\n`
          },
          {
            text: ` §9${player_xp}§r/${player_levelup_xp}\n`
          },
          {
            rawtext: [
              { text: ' §9' },
              { translate: `sao.cursor.${cursor_id}` },
              { text: '§r\n\n' },
            ]
          },
        ]
      }
    })
    .button("STR")
    .button("AGI")
  function display_form() {
    form.show(source).then(response => {
      world.sendMessage(`cancelationReason ${response.cancelationReason}`)
      world.sendMessage(`selection ${response.selection}`)
      world.sendMessage(`canceled ${response.canceled}`)
      if (!response.canceled) {
        display_form()
      }
    })
  }
  system.run(display_form)
}