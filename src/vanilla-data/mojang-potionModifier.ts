/**
 * All possible MinecraftPotionModifierTypes
 */
export enum MinecraftPotionModifierTypes {
  Long = "Long",
  Normal = "Normal",
  Strong = "Strong"
}
/**
 * Union type equivalent of the MinecraftPotionModifierTypes enum.
 */
export type MinecraftPotionModifierTypesUnion = keyof typeof MinecraftPotionModifierTypes;
