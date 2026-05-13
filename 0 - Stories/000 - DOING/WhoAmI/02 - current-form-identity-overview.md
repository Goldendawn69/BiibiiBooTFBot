# Current Form Identity / What Am I Command

Status: Idea  
Priority: High  
Size: Medium  
Tags: player-state, transformations, current-form, embeds, rpg-foundation, whatami

## Goal

Add a better way for a registered user to inspect their current transformation state.

The bot already tracks a user’s current form, but the current `/form` command only shows the form name. The new idea is to create a richer identity/status command that answers the question:

    What am I right now?

This should become the main player-facing view of their current transformed state.

## Core Idea

Create a `/whatami` command that shows a user their current transformation details.

The command should show useful information pulled from the current transformation data, such as:

- Current form name.
- Transformation image, if one exists.
- Categories.
- Public transformation description.
- When the user was transformed.
- How the transformation happened, if available.
- Later: traits, mental changes, private flavour, staged transformation progress, recovery options, and RPG state.

## Why This Matters

This command gives the bot a stronger sense of persistence.

Right now a transformation happens, the embed appears, and then the moment is mostly gone unless the user runs `/form`.

A richer current-form view lets the player return to their state and use it for roleplay.

It also creates a foundation for future RPG features without forcing those features into the first version.

## Important Design Choice

The bot should store the transformation ID on the user, not only the transformation name.

Current approach:

    "currentForm": "Living Plush Bunny"

Better approach:

    "currentForm": "Living Plush Bunny",
    "currentTransformationId": "living_plush_bunny"

Reason:

Names can change.

IDs are stable.

If the bot wants to show categories, images, text, mental changes, traits, or future RPG data, it needs to find the exact transformation entry again.

## MVP Scope

The first version should stay small.

MVP should include:

- Add `currentTransformationId` when a user is transformed.
- Add `/whatami`.
- Let users check their own current form.
- Show an ephemeral embed.
- Include image if available.
- Include categories.
- Include current form name.
- Include transformed time if available.
- Include public description or a shortened version of it.
- Use existing transformation data only.

MVP should not include:

- Other-user lookup.
- Public posting.
- Mental changes.
- Traits.
- Recovery buttons.
- Staged transformation support.
- RPG stats.
- Base character integration.

Those can become separate stories.

## Suggested Command

    /whatami

Possible later options:

    /whatami public:true
    /whatami user:@someone

Do not add the later options in MVP unless they are genuinely needed.

## Suggested MVP Output

The bot replies ephemerally with an embed.

Example:

    What Am I?

    Current Form:
    Living Plush Bunny

    Categories:
    Animal, Plushie, Toy

    Transformed:
    13 May 2026, 8:30 PM

    Description:
    You have become a living girly plush bunny...

The embed should attach the same local image used by the transformation result, if available.

## Privacy

MVP should only show the user their own form.

This avoids privacy problems around future mental changes and private flavour.

Other-user lookup should be a later story with clear visibility rules.

## Relationship To /form

`/form` can stay as the simple quick check.

`/whatami` becomes the richer current-state view.

Possible future direction:

- Keep `/form` as a short text command.
- Use `/whatami` for the richer embed.
- Later, `/form` could point users to `/whatami`.

## Relationship To Future RPG Systems

This command can become the hub for future player state.

Later it could show:

- Base character.
- Current form.
- Traits.
- Current staged transformation progress.
- Mental change summary.
- Active modifiers.
- Form stability.
- Recovery options.
- Scene prompt button.
- Reinforcement prompt button.
- Transformation history link or summary.

Do not build all of this first.

The MVP exists to create the hub.

## Recommended Story Split

This should be split into several stories instead of one large implementation.

Suggested stories:

1. MVP: `/whatami` self-view.
2. Store `currentTransformationId`.
3. Add transformation traits to data.
4. Expand `/whatami` with traits.
5. Add mental change/private flavour section for self-view only.
6. Add recovery/grounding buttons.
7. Add optional public summary.
8. Add other-user lookup with visibility controls.

The first two can be implemented together if preferred, because `/whatami` is much more useful with `currentTransformationId`.

## Recommendation

Build this next.

It improves the existing bot immediately, uses the category work already done, and creates a clean foundation for later RPG systems.

Keep the first version boringly reliable.

The cute weirdness can sit on top once the bones are solid.
