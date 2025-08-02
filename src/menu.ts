import { ItemStack, ItemTypes, ItemLockMode, PlayerSpawnAfterEvent, ItemUseBeforeEvent, system, world } from '@minecraft/server'
import { ActionFormData } from '@minecraft/server-ui'
import { item_t } from 'types'

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
  const form = new ActionFormData()
    .title('stk.ui.main')
    .button("button1")
  system.run(() => {
    form.show(source).then(value => {
      world.sendMessage(`button ${value.selection}`)
    })
  })
}