# Current Form Identity / What Am I Command

Status: In Progress  
Priority: High  
Size: Medium  
Tags: player-state, transformations, current-form, embeds, rpg-foundation, whatami

## Goal

Create a richer way for users to understand their current transformation state.

The bot should not only remember that someone is transformed. It should also be able to explain what they currently are, what that form looks like, what categories it belongs to, and later what traits, mental effects, private flavour, or RPG state are attached to it.

This feature is the foundation for making transformations feel persistent rather than one-off jokes.

## Current Direction

The `/whatami` command should become the main identity/status command for current transformed state.

The command has two broad uses:

1. Self-check  
   The user checks their own current form and receives full details privately by DM.

2. Other-user lookup  
   A user checks what another registered user currently looks like, receiving only safe visible information.

The self-check and other-user lookup should not expose the same amount of information.

## Important Design Decision

Default `/whatami` should DM the user.

The current form embed can be large because it may include an image, categories, description, later traits, and eventually mental/private information. Sending that into the main server channel would clutter the game space.

Current MVP behaviour:

    /whatami

The bot sends the full current-form details to the user's DMs, then replies ephemerally in the channel with a short confirmation.

Example confirmation:

    I have sent your current transformation details to your DMs.

This keeps the channel clean.

## Current MVP State

The MVP version has already established the key behaviour:

- `/whatami` checks the user’s own current form.
- The full embed is sent by DM.
- The server-channel response is only a short ephemeral confirmation.
- The embed shows current form, categories, transformed time, public description, and image if available.
- The command uses `currentTransformationId` for stable lookup.
- The command can fall back to `currentForm` for older user data.

This is a good first foundation.

## Key Data Requirement

The bot should store both the display name and the stable transformation ID.

Example:

    {
      "registered": true,
      "currentForm": "Rainbow Slime Girl",
      "currentTransformationId": "rainbow_slime_girl",
      "lastTransformedAt": "2026-05-13T10:25:04.992Z"
    }

Reason:

`currentForm` is useful for display.

`currentTransformationId` is useful for lookup.

The ID lets the bot reliably find the matching transformation data, image, categories, future traits, mental changes, private flavour, and staged transformation data.

## Relationship To /form

`/form` can remain the simple quick check.

Possible behaviour:

    Your current form is: Rainbow Slime Girl

`/whatami` is the richer version.

It should show a proper current-form identity card, privately by DM.

This gives users both options:

- `/form` for a tiny quick check.
- `/whatami` for a richer private status view.

## Other-User Lookup

The likely future direction is:

    /whatami user:@name

This should answer:

    What does this person currently look like?

This is probably cleaner than adding a `public:true` option.

The use case is not really:

    I want to publicly dump my whole form card.

The use case is more likely:

    I want to see what someone else currently is.

So the future command should support looking up another registered user’s visible current form.

## Other-User Privacy Rules

Other-user lookup must only show safe visible information.

It may show:

- Current form name.
- Transformation image.
- Categories.
- A short appearance summary.
- Maybe public traits, if traits are safe and visible.

It should not show:

- Mental changes.
- Private flavour.
- Reinforcement prompts.
- Mental change rules.
- Consent settings.
- Hidden player notes.
- Anything the target user has marked private.
- Full personal profile details unless visibility settings allow it.

This protects the more intimate roleplay layer.

## Why `public:true` Is Not Preferred For Now

A `public:true` option was considered, but it may not be the cleanest design.

Potential problem:

    /whatami public:true

could encourage users to post large personal form embeds into the channel.

That risks cluttering the game channel.

It also mixes two different use cases:

- The user checking their own full details.
- Other users wanting to know what someone looks like.

A better future direction is:

    /whatami

for private self-checks.

    /whatami user:@name

for visible other-user appearance checks.

This is clearer and easier to control.

## Appearance Summary

The current transformation `text` field is written as a transformation result.

Example style:

    {user} has become a rainbow slime girl...

That works well for public transformation posts.

However, it is not always ideal for a current-state lookup.

Later, transformations may benefit from an `appearanceSummary` field.

Example:

    "appearanceSummary": "A colourful rainbow slime girl with glossy dripping hair, bright cheerful eyes, and a soft squishy form that catches the light like magical jelly."

This could be used by:

- `/whatami user:@name`
- public summaries
- future profile views
- scene prompts
- character sheets

This would keep the full transformation text for the transformation moment, while giving status commands a shorter and cleaner description.

## Future Transformation Data Shape

Current transformation entries already have:

- id
- name
- categories
- text

Future entries may eventually include:

- appearanceSummary
- traits
- privateText
- mentalChange
- mentalChangeRules
- reinforcementPrompts
- stages
- rarity
- pack
- image metadata

Example future shape:

    {
      "id": "living_plush_bunny",
      "name": "Living Plush Bunny",
      "categories": ["animal", "plushie", "toy"],
      "traits": ["soft", "floppy", "cute", "cuddly", "hard_to_take_seriously"],
      "appearanceSummary": "A soft living plush bunny with floppy stitched ears, plush paws, and an accidentally adorable expression.",
      "text": "{user} has become a living girly plush bunny...",
      "privateText": "A soft, fuzzy warmth settles through you...",
      "mentalChange": "The transformed user feels softer, cuddlier, and less able to take dramatic situations seriously.",
      "mentalChangeRules": [
        "Keep the effect playful and agency-safe.",
        "Do not imply the user loses control.",
        "Focus on softening serious moods and making dramatic gestures look cute."
      ]
    }

Do not add all of this at once.

This overview simply shows where the current-form identity system can grow.

## Relationship To Form Traits

Form traits should support current-form identity.

Categories say what type of transformation something is.

Traits say what qualities it has.

Example:

Categories:

    animal, plushie, toy

Traits:

    soft, floppy, cute, cuddly, hard_to_take_seriously

Traits can later appear in `/whatami`.

They can also support:

- scene prompts
- form complications
- mental-change reinforcement
- recovery text
- staged transformations
- RPG mechanics

Do not make traits overly complicated at first.

## Relationship To Mental Changes

Mental changes should only appear in the self-check view if the user has opted into them.

The bot should never show another user’s mental changes through `/whatami user:@name` by default.

Possible self-check section later:

    Mental Change:
    Your current form gently nudges you towards soft, cosy, playful behaviour. You remain yourself and can follow, resist, ignore, or reinterpret this however you like.

This belongs in DM only.

## Relationship To Recovery / Grounding

Later, `/whatami` can become the place where users manage their current state.

Possible future buttons:

- Ground
- Recover
- Reset Form
- Get Scene Prompt
- Get Reinforcement Prompt

These should not be part of the initial overview implementation, but `/whatami` is a natural home for them.

## Relationship To Base Character Profiles

Once base character profiles exist, `/whatami` can eventually show both base state and transformed state.

Example:

    Base Form:
    Human

    Current Form:
    Rainbow Slime Girl

This makes the transformation feel like a change from something, not just a random label.

Do not build this into the current MVP.

## Recommended Story Split

Keep this work split across multiple stories.

Suggested order:

1. Store Current Transformation ID  
   Completed first because `/whatami` needs stable lookup.

2. What Am I Command - MVP Self View  
   Private DM self-check with current form, categories, transformed time, and image.

3. Current Form Identity Overview  
   This document. Defines the wider design direction.

4. Add Form Traits To Transformations  
   Adds richer metadata to transformation data.

5. What Am I Command - Future Expansions  
   Tracks future additions such as mental changes, recovery buttons, user lookup, public summaries, and staged progress.

6. What Am I User Lookup  
   Future story for `/whatami user:@name`.

7. Appearance Summary Field  
   Future story for adding shorter current-form summaries.

## Recommended Next Steps

After the MVP is working, the best next practical additions are:

1. Add form traits to transformations.
2. Show traits in `/whatami`.
3. Add a later story for `/whatami user:@name`.
4. Consider `appearanceSummary` before making other-user lookup public-facing.
5. Keep mental changes private and opt-in.

## Design Principle

`/whatami` should become the player’s current-form mirror.

For the user themselves, it can be detailed and private.

For other users, it should only show what is visibly knowable and safe to share.

Default private.  
Public only by clear design.  
No leaking intimate roleplay details.

Keep the mirror useful, not noisy.