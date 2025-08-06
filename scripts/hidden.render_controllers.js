part_visibility = Object.fromEntries(
  Array.from(Array(100), (_, i) => {
    const id = 100 - i
    return [
      `bar_${id}`, `query.health / query.max_health >= ${id / 100}`,
    ]
  })
)
JSON.stringify(part_visibility)
