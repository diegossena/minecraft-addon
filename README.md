https://libresprite.github.io/

%LOCALAPPDATA%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang
development_behavior_packs
development_resource_packs

```sh
# only scrips
/reload
# resources
/reload all
```


## JSON UI

```
"[element_name]@[namespace_reference].[element_name_reference]"
```

## Types

- label - for creating text objects
- image - for rendering images from a filepath provided
- button - for creating interactive and clickable elements
- panel - an empty container where you can store all other elements that may overlap to each other
- stack_panel - an empty container where you can store all other elements in a stack that doesn't overlap to each other
- grid - uses another element as a template, and then renders it repeatedly in multiple rows and columns
- factory - renders an element based off of another element, is capable of calling hardcoded values and variables
- custom - is paired with another property renderer which renders hardcoded JSON UI elements
- screen - elements that are called by the game directly, usually root panel elements

## Minecraft Colors

- ![#000](https://placehold.co/15x15/black/black.png) §0 Black
- ![#00008b](https://placehold.co/15x15/darkblue/darkblue.png) §1 DarkBlue
- ![#006400](https://placehold.co/15x15/darkgreen/darkgreen.png) §2 Dark Green
- ![#40e0d0](https://placehold.co/15x15/turquoise/turquoise.png) §3 Turquoise
- ![#8b0000](https://placehold.co/15x15/darkred/darkred.png) §4 Dark Red
- ![#800080](https://placehold.co/15x15/purple/purple.png) §5 Purple
- ![#daa520](https://placehold.co/15x15/goldenrod/goldenrod.png) §6 Dark Yellow
- ![#d3d3d3](https://placehold.co/15x15/lightgray/lightgray.png) §7 Light Gray
- ![#a9a9a9](https://placehold.co/15x15/darkgray/darkgray.png) §8 Dark Gray
- ![#add8e6](https://placehold.co/15x15/dodgerblue/dodgerblue.png) §9 Light Blue
- ![#90ee90](https://placehold.co/15x15/lightgreen/lightgreen.png) §a Light Green
- ![#87ceeb](https://placehold.co/15x15/skyblue/skyblue.png) §b Light Turquoise
- ![#cd5c5c](https://placehold.co/15x15/cd5c5c/cd5c5c.png) §c Light Red
- ![#ff00ff](https://placehold.co/15x15/magenta/magenta.png) §d Magenta
- ![#ffd700](https://placehold.co/15x15/gold/gold.png) §e Light Yellow
- ![#fff](https://placehold.co/15x15/white/white.png) §f White


## Ideias

- Mostrar a barra de HP do mob apenas enquanto ele estiver tomando dano - OK
- Colocar o cursor que é um cristal na cabeça do mob - OK
- Criar stamina (SP 100); quanto mais stregth mais stamina é gasta; stamina gasta menos com mais agility
- Fazer animação de morte
- Criar andares
- Alterar cor da barra de vida (amarelo <= 50%) (vermelho <= 30%)