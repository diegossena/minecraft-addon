texture_width = 16
texture_height = 4
origin_y = 28
origin_z = -8
size_x = texture_width / 100

rotate = 1.145

bones = Array.from(Array(100), (_, i) => {
  return {
    name: `bar_${100 - i}`,
    pivot: [0, origin_y, 0],
    cubes: [
      {
        "origin": [0, 28, origin_z],
        "size": [size_x, texture_height, 0],
        "pivot": [0, 0, 0],
        "rotation": [0, i * 1.145, 0],
        "uv": [texture_width - i * size_x, 0]
      },
    ]
  }
})
JSON.stringify(bones)
