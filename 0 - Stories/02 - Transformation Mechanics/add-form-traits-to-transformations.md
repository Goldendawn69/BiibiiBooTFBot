# Add Form Traits To Transformations

Status: Idea  
Priority: Medium  
Size: Medium  
Tags: transformations, traits, rpg-foundation, data-model, roleplay

## Goal

Add traits to transformation entries so forms can describe not only what they are, but how they behave.

Categories answer:

    What type of form is this?

Traits answer:

    What qualities does this form have?

## Core Idea

Each transformation can have a `traits` array.

Example:

    {
      "id": "living_plush_bunny",
      "name": "Living Plush Bunny",
      "categories": ["animal", "plushie", "toy"],
      "traits": ["soft", "floppy", "cute", "comforting", "hard_to_take_seriously"]
    }

Traits can later be shown in `/whatami` and used by future RPG/roleplay features.

## Difference Between Categories And Traits

Categories are broad filter groups.

Examples:

- animal
- plushie
- doll
- object
- glamour
- spooky
- magic

Traits are descriptive qualities.

Examples:

- soft
- floppy
- poised
- elegant
- uncanny
- tiny
- cheerful
- dramatic
- mischievous
- fragile
- shiny
- clockwork
- cuddly
- judgemental

A form can have a category of `doll` and traits like `fragile`, `painted`, `elegant`, and `still`.

## Why This Matters

Traits can support many later systems:

- `/whatami` richer details.
- Scene cards.
- Form complications.
- Mental change prompts.
- Recovery text.
- Staged transformation flavour.
- Resistance/embrace choices.
- RPG mechanics.
- Form interactions.

## Suggested Examples

Living Plush Bunny:

    "traits": ["soft", "floppy", "cute", "cuddly", "comforting", "hard_to_take_seriously"]

Boutique Mannequin:

    "traits": ["poised", "still", "elegant", "displayed", "glossy", "uncanny"]

Tiny Clockwork Dragon:

    "traits": ["tiny", "clockwork", "shiny", "proud", "curious", "steamy"]

Haunted Teapot:

    "traits": ["haunted", "porcelain", "judgemental", "tea_scented", "spooky", "smug"]

Moonlit Vampire Lady:

    "traits": ["elegant", "spooky", "glamorous", "moonlit", "dramatic", "mischievous"]

## Naming Rules

Use lowercase snake_case for multi-word traits.

Good:

    hard_to_take_seriously
    tea_scented
    display_window
    moonlit

Avoid:

    Hard To Take Seriously
    hard to take seriously
    hard-to-take-seriously

Snake case is easier to filter and validate.

## MVP Scope

Do not add this before `/whatami` MVP unless there is time.

First trait version should only:

- Add `traits` to transformation data.
- Validate that `traits` is an array of strings if present.
- Show traits in `/whatami`.

Do not build mechanics from traits yet.

## Validation Ideas

Update `scripts/validate-data.js` later to check:

- `traits` is optional.
- If present, `traits` must be an array.
- Every trait must be a non-empty string.
- Trait values should be lowercase.
- Trait values should not contain spaces.
- Warn about duplicate traits on one transformation.

## Open Questions

- Should traits be curated from a fixed allowed list?
- Should traits be free-form at first?
- Should traits be shown publicly?
- Should traits affect future resistance rolls?
- Should traits affect mental-change reinforcement prompts?

## Recommendation

Add traits after `/whatami` works.

Traits are useful, but they matter more once there is a player-facing command that can show them.
