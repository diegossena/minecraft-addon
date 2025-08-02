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


# JSON UI

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