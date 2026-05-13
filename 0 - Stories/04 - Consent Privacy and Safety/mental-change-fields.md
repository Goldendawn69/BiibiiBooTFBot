# Mental Change Fields For Transformations

Status: Idea  
Priority: Medium  
Size: Medium  
Tags: transformations, private-flavour, consent, roleplay, user-settings, data-model

## Goal

Add structured mental change information to each transformation.

This gives the bot a consistent way to describe optional inner effects when a user has opted into mental-change flavour.

The aim is not to force behaviour. The aim is to provide roleplay prompts that the player can use, resist, exaggerate, reinterpret, or ignore.

## Core Idea

Each transformation can include two new optional fields:

- `mentalChange`
- `mentalChangeRules`

`mentalChange` describes the inner effect or behavioural pull of the transformation.

`mentalChangeRules` tells the bot how to write future DMs and reinforcement prompts for that transformation.

This separates the visible transformation from the internal roleplay flavour.

## Consent Requirement

Mental changes must be opt-in.

No user should receive mental-change DMs unless they have explicitly enabled the feature.

This should be separate from normal registration.

A user can be registered for public transformation commands without consenting to mental-change flavour.

## Suggested User Setting

Add a user setting such as:

    "mentalChanges": false

Later, this could become more detailed:

    "mentalChanges": {
      "enabled": true,
      "reinforcementDms": true,
      "intensity": "soft"
    }

Recommended first version:

    "mentalChanges": false

or:

    "privateFlavour": true

If `privateFlavour` already exists, decide whether mental changes are part of Private Flavour or a separate opt-in.

Recommendation:

Keep them separate.

Private Flavour = receives a private DM when transformed.  
Mental Changes = consents to inner-effect flavour and possible later reinforcement prompts.

## Transformation Data Changes

Example transformation entry:

    {
      "id": "living_plush_bunny",
      "name": "Living Plush Bunny",
      "categories": ["animal", "plushie", "toy"],
      "text": "{user} has become a living plush bunny, dangerously huggable and impossible to take seriously.",
      "privateText": "A soft, fuzzy warmth settles through you. You are still yourself, but dramatic thoughts feel harder to hold onto, and your plush paws keep turning every serious gesture into something painfully cute.",
      "mentalChange": "The transformed user feels softer, cuddlier, and less able to take dramatic situations seriously. They remain fully themselves, but their mood leans towards playful comfort, harmless flopping, and accidental cuteness.",
      "mentalChangeRules": [
        "Keep the effect playful and agency-safe.",
        "Do not imply the user loses control.",
        "Focus on softening serious moods, making dramatic gestures look cute, and encouraging cuddly or cosy behaviour.",
        "Use gentle language such as nudges, pulls, habits, or instincts.",
        "Avoid explicit content."
      ]
    }

## Field Meanings

### text

Public channel result.

This is what everyone sees.

It should describe the visible transformation and the public joke.

### privateText

Optional private DM sent immediately after transformation.

This can describe how the change feels.

### mentalChange

A summary of the inner effect.

This is mainly for bot logic, writing consistency, and future prompts.

It should be written in plain language.

### mentalChangeRules

Rules for how the bot should write prompts for this transformation.

These should guide tone, limits, and recurring motifs.

## Why Use Rules?

Different forms should create different kinds of inner effects.

A plushie form should not feel like a vampire form.

A mannequin form should not feel like a dragon form.

A robot form should not feel like a glamour enchantress.

Rules help keep the flavour consistent.

Example:

Living Plush Bunny:
- soft
- cuddly
- playful
- hard to be serious
- floppy gestures
- cosy instincts

Boutique Mannequin:
- poised
- display-like
- stillness
- graceful posing
- awareness of lighting
- polished confidence

Tiny Clockwork Dragon:
- bright
- energetic
- whirring curiosity
- tiny pride
- dramatic little steam puffs
- hoarding shiny objects

## Writing Guidelines

Mental changes should:

- Be fictional roleplay prompts.
- Preserve player agency.
- Use soft language.
- Avoid commands the player must obey.
- Avoid non-consensual framing.
- Avoid explicit sexual detail.
- Avoid heavy mind-control wording unless a user has clearly opted into that style later.
- Keep the bot playful, charming, and readable.

Prefer wording like:

    You feel a gentle pull towards...

    Your new form seems to nudge you into...

    It becomes strangely tempting to...

    A small habit settles in...

Avoid wording like:

    You are forced to...

    You can no longer resist...

    Your mind is erased...

    You must obey...

## Example Mental Change Sets

### Living Plush Bunny

    "mentalChange": "The transformed user feels softer, cuddlier, and less able to take dramatic situations seriously. They remain fully themselves, but their mood leans towards playful comfort, harmless flopping, and accidental cuteness.",
    "mentalChangeRules": [
      "Keep it soft, cosy, and playful.",
      "Mention floppy paws, twitchy nose, cuddly instincts, or difficulty seeming serious.",
      "Do not remove the user's agency.",
      "Do not make it explicit.",
      "The user should remain themselves underneath the plushie instincts."
    ]

### Boutique Mannequin

    "mentalChange": "The transformed user feels a subtle pull towards stillness, elegance, and display-like poise. They remain aware and themselves, but become more conscious of posture, presentation, and dramatic lighting.",
    "mentalChangeRules": [
      "Use elegant, display-window, fashion, and posing motifs.",
      "Keep the tone polished and slightly uncanny.",
      "Avoid making the user helpless or trapped.",
      "Focus on poise, stillness, and theatrical presentation.",
      "Keep it stylish rather than explicit."
    ]

### Tiny Clockwork Dragon

    "mentalChange": "The transformed user feels bright, energetic, proud, and easily excited by shiny things. They remain themselves, but their thoughts tick along with clockwork enthusiasm and tiny draconic confidence.",
    "mentalChangeRules": [
      "Use clockwork, steam, brass, tiny pride, and curious energy motifs.",
      "Mention shiny-object interest only as a playful nudge.",
      "Keep the tone adventurous and cute.",
      "Do not imply loss of control.",
      "Avoid explicit content."
    ]

### Moonlit Vampire Lady

    "mentalChange": "The transformed user feels more graceful, theatrical, and quietly confident. They remain themselves, but night-time glamour, elegant speech, and dramatic entrances feel more natural.",
    "mentalChangeRules": [
      "Use moonlight, velvet, elegance, dramatic entrances, and quiet confidence.",
      "Keep the glamour mature but non-explicit.",
      "Avoid predatory or coercive framing.",
      "Do not imply the user must seduce anyone.",
      "Make it stylish, poised, and playful."
    ]

## Implementation Notes

First version does not need AI-generated prompts.

The bot can use `privateText` directly.

Later, reinforcement DMs can use `mentalChange` and `mentalChangeRules` to choose from prepared prompt templates.

Possible helper:

    function getMentalChange(transformation) {
      return transformation.mentalChange || null;
    }

Possible validation checks:

- `mentalChange` must be a string if present.
- `mentalChangeRules` must be an array of strings if present.
- No transformation is required to have mental change fields.
- If `mentalChangeRules` exists without `mentalChange`, warn during validation.

## Data Validation Ideas

Update `scripts/validate-data.js` later to check:

- `mentalChange` is optional.
- If present, it must be a non-empty string.
- `mentalChangeRules` is optional.
- If present, it must be an array.
- Each rule must be a non-empty string.
- Warn if a transformation has `mentalChangeRules` but no `mentalChange`.

## Recommendation

Add the fields gradually.

First pass:

- Add `mentalChange` and `mentalChangeRules` to a few transformations only.
- Test the tone.
- See whether the prompts feel fun or too intense.
- Do not add reinforcement DMs until the base private flavour system is working.

Keep this controlled. Mental-change flavour is fun because it is optional, playful, and player-owned.
