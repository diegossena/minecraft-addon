/**
 * All possible MinecraftPotionLiquidTypes
 */
export enum MinecraftPotionLiquidTypes {
  Lingering = "Lingering",
  Regular = "Regular",
  Splash = "Splash"
}
/**
 * Union type equivalent of the MinecraftPotionLiquidTypes enum.
 */
export type MinecraftPotionLiquidTypesUnion = keyof typeof MinecraftPotionLiquidTypes;
