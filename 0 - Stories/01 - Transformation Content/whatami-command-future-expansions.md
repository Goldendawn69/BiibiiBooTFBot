# What Am I Command - Future Expansions

Status: Idea  
Priority: Medium  
Size: Large  
Tags: player-state, whatami, rpg, privacy, mental-changes, recovery, future

## Goal

Track future expansions for `/whatami` after the MVP self-view works.

The MVP should stay simple. This file exists so the bigger ideas are not lost.

## Expansion 1: Show Form Traits

Once transformations have `traits`, show them in `/whatami`.

Example:

    Traits:
    Soft, Floppy, Cuddly, Hard To Take Seriously

This gives users more roleplay hooks.

## Expansion 2: Show Mental Change Summary

If the user has opted into mental changes, `/whatami` can show their current form’s mental change summary.

This must only show to the user themselves unless explicit sharing is added later.

Example:

    Mental Change:
    Your current form gently nudges you towards soft, cosy, playful behaviour. You remain yourself and can follow, resist, ignore, or reinterpret this however you like.

Do not show mental change details to other users by default.

## Expansion 3: Show Private Flavour Availability

If the current form has `privateText`, `/whatami` can indicate that private flavour exists.

Example:

    Private Flavour:
    Available

Possible button:

    Send Private Flavour Again

This should only work for the transformed user.

## Expansion 4: Recovery And Grounding Buttons

Add buttons to the `/whatami` embed.

Possible buttons:

- Ground
- Recover
- Reset Form
- Get Scene Prompt
- Get Reinforcement Prompt

First recovery option should be gentle and safe.

Example:

    Ground:
    You take a moment to steady yourself. The form is still there, but the magical pull quiets enough for you to feel like yourself again.

## Expansion 5: Public Summary

Add an option to share a safe public summary.

Example:

    /whatami public:true

This should show only non-private details:

- Current form.
- Categories.
- Traits.
- Image.
- Public description.

It should not show:

- Mental changes.
- Private flavour.
- reinforcement prompt details.
- hidden player settings.

## Expansion 6: Other-User Lookup

Add:

    /whatami user:@someone

This should respect visibility settings.

Possible visibility values:

- private
- summary
- public

Private:

    That user’s form details are private.

Summary:

    Show form name, categories, and image.

Public:

    Show public form description and non-private traits.

Do not show mental changes unless the target user has explicitly made them shareable.

## Expansion 7: Base Character Integration

Once base character profiles exist, `/whatami` can show:

- Base character name.
- Base form.
- Current form.
- Difference between base and current state.

Example:

    Base Form:
    Human

    Current Form:
    Living Plush Bunny

This supports the RPG direction without needing heavy mechanics.

## Expansion 8: Staged Transformation Progress

If staged transformations are added, `/whatami` can show the current stage.

Example:

    Staged Transformation:
    Stage 2 of 3 - Taking Hold

    Progress:
    Plush paws and softer instincts have appeared, but the transformation is not complete.

Possible button:

    Progress Form

## Expansion 9: Active Modifiers And Conditions

If temporary modifiers are added, show them.

Example:

    Active Modifiers:
    Extra Fluffy
    Too Cute To Argue

This makes `/whatami` the main state hub.

## Expansion 10: Transformation History Link

Later, `/whatami` could show a short recent history.

Example:

    Recent Forms:
    Living Plush Bunny
    Haunted Teapot
    Boutique Mannequin

This may belong in a separate `/history` command instead.

## Privacy Rules

The user’s own `/whatami` can show everything they have opted into.

Other-user lookup must be restricted.

Never show these to other users by default:

- Mental changes.
- Private flavour.
- reinforcement prompts.
- private character notes.
- consent settings.

## Recommendation

Do not build these expansions until the MVP is working.

Suggested order:

1. MVP self-view.
2. Store current transformation ID.
3. Add traits.
4. Show traits in `/whatami`.
5. Add recovery/grounding buttons.
6. Add mental-change section for self-view.
7. Add public summary.
8. Add other-user lookup with visibility controls.

Keep `/whatami` as the player state hub, but grow it carefully.
