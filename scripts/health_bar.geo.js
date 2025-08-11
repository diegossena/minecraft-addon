texture_width = 24
texture_height = 4
origin_y = 28
origin_z = -16
size_x = texture_width / 100

rotate = -22.5
rotate_rate = -0.859

bones = Array.from(Array(100), (_, i) => {
  const value = 100 - i
  const cube = {
    "origin": [0, 28, origin_z],
    "size": [size_x, texture_height, 0.1],
    "pivot": [0, 0, 0],
    "rotation": [0, rotate + i * rotate_rate, 0],
    "uv": [texture_width - i * size_x, 0]
  }
  if (value === 100) {
    cube.origin[1] = 31.9
    cube.size[1] = 0.1
  } else if (value > 50) {
    cube.origin[1] = 30
    cube.size[1] = 2
  }
  return {
    name: `bar_${value}`,
    pivot: [0, origin_y, 0],
    cubes: [cube]
  }
})
JSON.stringify(bones)
