/**
 * AreaLevel
 * 
 * Bônus de Velocidade de Ataque: 1,80
 * Bônus de Defesa da Arma: 1,50
 * Bônus de Tempo de Recarga: 1,20.
 * 
 * 
 * Força (FOR): Seu nível afeta sua força e faz com que os itens pareçam mais
 * leves para segurar/levantar/carregar. Uma força alta permite que você levante
 * o próprio peso do corpo até a beira de um penhasco ou manuseie objetos
 * pesados com facilidade. Essa força também afeta sua capacidade de carga.
 * 
 * Agilidade (AGI): Aumenta a velocidade de corrida e de movimento geral,
 * incluindo mover os braços, o que aumenta a velocidade de movimento da sua
 * arma, se for uma arma leve, como uma espada ou uma adaga.
 * 
 * SAO utiliza um sistema baseado em níveis para determinar a força de um
 * jogador. Assim que o jogador ganha EXP suficiente, seu avatar brilha em um
 * tom dourado e seu nível atual é aumentado em um. Três pontos de atributo são
 * concedidos a cada subida de nível, que o jogador pode usar para aumentar seu
 * atributo FOR ou seu atributo AGI. SAO não tinha um limite de nível no momento
 * em que foi concluído, embora se o jogo tivesse continuado e um limite fosse
 * necessário, o Sistema Cardinal teria gerado um.
 * 
 * Items:
 * 
 * Ring of Agility
 * +20 AGI
 */

export interface player_property_t {
  'sao:level': number
}

/**
 * 3 attributes per level
 * 
 * item requires attributes
 */
export interface player_stat_t {
  /**
   * This determines the base damage added to any attack, with any weapon.
   */
  strength: number
  /**
   * This determines your speed when running.
   */
  agility: number
}
export enum player_attribute_t {
  strength,
  agility
}
/**
 * Skill levels are independent of player levels. A skill's level is increased
 * via usage of the skill.
 * 
 * In general, skills must be equipped in a limited amount of skill slots.
 * Players are given two initial slots, with a third slot granted at level six,
 * a fourth one granted at level twelve, a fifth on level twenty, and an
 * additional slot every ten levels afterwards.Skills may be trained up to
 * level 1,000, at which it is considered «Completed». If a skill is removed
 * from its slot, its proficiency is reset to zero, unless a special item is
 * used to store the skill. It is rumored that there is an almost unlimited
 * number of skills in Sword Art Online.
 */
export enum skill_t {

}
export enum item_t {
  menu = 'sao:menu'
}
export enum cursor_t {
  /**
   * Players that have not directly committed an infraction receive a green
   * cursor. Most players in Sword Art Online have green cursors.
   * 
   * Jogadores que não cometeram uma infração diretamente recebem um cursor verde.
   */
  green = 'green',
  /**
   * Em Sword Art Online, jogadores que cometeram um crime recebem um cursor
   * laranja. Uma infração é iniciada tipicamente pelo primeiro ato de atacar
   * um jogador verde fora da zona segura, já que o efeito de Área em cidades
   * nega tanto a possibilidade de ferir outros jogadores quanto a possibilidade
   * de roubar itens, portanto, ladrões geralmente ganham seu cursor laranja
   * atacando jogadores para assediá-los por itens, em vez de roubá-los
   * diretamente. Alternativamente, o cursor de um jogador pode mudar para
   * laranja se eles atacarem um NPC neutro [ 8 ] ou roubarem itens de um NPC.
   */
  orange = 'orange',
  /**
   * Monstros inativos, certos NPCs e animais de estimação têm um cursor amarelo.
   */
  yellow = 'yellow',
  /**
   * All active monsters have a red cursor of various shades. The shade of red
   * can be used as a reference to the monster's power when compared to the
   * player's level. The cursor of monsters that need to be killed for a quest
   * appear with a narrow yellow border surrounding the cursor.
   */
  red = 'red',
  /**
   * Monsters that are considerably weaker than the player and reward little to
   * no experience points have light pink, close to white, cursors.
   */
  light_pink = 'light_pink',
  /**
   * Monsters that are equal in level to the player have a pure red cursor.
   */
  pure_red = 'pure_red',
  /**
   * Active monsters that are of a higher level than the level range of a
   * player receive purple cursors.
   */
  purple = 'purple',
  /**
   * Monsters with an overwhelming disparity in level and which cannot be
   * defeated by the player, no matter how hard one tries, have a dark crimson
   * cursor.
   */
  dark_crimson = 'dark_crimson',
  /**
   * Monsters that are even more powerful than those with a dark crimson cursor.
   */
  black = 'black'
}

export enum sao_entity_t {
  "sao:frenzy_boar" = "Frenzy Boar"
}