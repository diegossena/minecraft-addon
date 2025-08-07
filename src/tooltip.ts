import { Entity, system } from "@minecraft/server"
import { random_range } from "utils/math"

export function tooltip_damage_indicator(target: Entity, damage: number) {
  const color = damage < 0 ? '§e' : '§a'
  const signal = damage < 0 ? '' : '+'
  const tooltip = target.dimension.spawnEntity(
    <any>'sao:tooltip', target.location,
    { spawnEvent: 'sao:damage_indicator' }
  )
  tooltip.nameTag = `§l${color}${signal}${damage}`
  tooltip.applyImpulse({
    x: random_range(0, 0.01),
    y: 0.05,
    z: random_range(0, 0.01)
  })
}
export function tooltip_display_name(target: Entity, text: string) {
  system.run(() => {
    const location = target.getHeadLocation()
    const tooltip = target.dimension.spawnEntity(<any>'sao:tooltip', {
      x: location.x,
      y: location.y + .5,
      z: location.z
    }, { spawnEvent: 'sao:display_name' })
    tooltip.nameTag = text
  })
}