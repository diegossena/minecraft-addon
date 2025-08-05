export const mobs = [
  // Primeiro Andar: Cidade do Gênese, Campo Oeste
  {
    name: 'Frenzy Boar',
    location: 'Floor 1',
    // stats
    hp: 300,
    atk: 5,
    def: 5,
    spd: 2,
    // rewards
    exp: 24,
    col: 30,
    items: [
      {
        name: 'Boar Meat',
        chance: .75
      },
      {
        name: 'Leather',
        chance: .5
      }
    ]
  },
  {
    name: 'Dire Wolf',
    location: 'Floor 1',
    // stats
    hp: 400,
    atk: 4,
    def: 1,
    spd: 3,
    // rewards
    exp: 24,
    col: 50,
    items: [
      {
        name: 'Dire Wolf Meat',
        chance: .3
      },
      {
        name: 'Dire Wolf Skin',
        chance: .5
      }
    ]
  },
  {
    name: 'Little nepent',
    type: ['normal', 'flower', 'fruit'],
    // stats
    hp: 500,
    atk: 6,
    def: 2,
    spd: 1,
    // rewards
    exp: 30,
    col: 100,
    items: [
      {
        name: 'Óvulo da Little Nepent [Little Nepent com Flor / Apenas Durante Medicina Secreta da Floresta / 100%]',
        // https://swordartonline.fandom.com/wiki/Secret_Medicine_of_the_Forest#Completed_By
        quest: 'Secret Medicine of the Forest',
        type: 'flower'
      }
    ]
  },
  {
    name: 'Scavenger toad',
    // rewards
    exp: 100,
    col: 6000,
    items: [
      {
        name: 'Scavenger Toad Meat'
      }
    ]
  },
  {
    name: 'Kobold Ruin Ranger',
    // stats
    hp: 600,
    atk: 12,
    def: 3,
    spd: 4,
    // rewards
    exp: 30,
    col: 150
  },
  {
    name: 'Kobold Sentinel of Ruin',
    // stats
    hp: 700,
    atk: 14,
    def: 6,
    spd: 3,
    // rewards
    exp: 40,
    col: 200
  },
  {
    name: 'The kobold lord illfang',
    // stats
    hp: [800, 800, 800, 800], // 800/bar
    atk: 25,
    def: 8,
    spd: [4, 4, 4, 10],
    // rewards
    exp: 5000,
    col: 7000,
    share_rewards: true,
    items: [
      {
        name: 'Coat of Midnight',
        shared: false
      }
    ]
  }
]

// {
//     name: "Ragout Rabbit's Meat",
//     col: 100000,
//   }