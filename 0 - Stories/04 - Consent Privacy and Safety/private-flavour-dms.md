# Private Flavour / Inner Effects DMs

Status: Idea  
Priority: Medium  
Size: Medium  
Tags: transformations, consent, roleplay, dms, user-settings

## Goal

Add an optional private flavour system for transformation results.

Public transformation messages should describe the visible or funny result in the channel, while optional private DMs can describe the internal feeling, behavioural pull, or roleplay flavour of the transformation.

This lets players decide how much they want to roleplay the inner effects of a transformation without making those details public or forcing them onto anyone.

## Core Idea

Each transformation can have two layers of text.

1. Public Text  
   Shown in the Discord channel.  
   Describes the visible result, final form, and public joke.

2. Private Flavour Text  
   Sent by DM to the transformed user only, if they have opted in.  
   Describes optional inner effects, feelings, instincts, habits, or roleplay prompts.

The private text should be treated as a suggestion, not a command. The player can follow it, resist it, ignore it, exaggerate it, or reinterpret it however they like.

## Consent / Opt-In Behaviour

Private Flavour must be opt-in.

Users should explicitly enable it before receiving transformation flavour DMs.

Possible command:

    /flavour on
    /flavour off

Alternative command:

    /form privateflavour:on
    /form privateflavour:off

Preferred option: `/flavour on` and `/flavour off`, because it keeps the setting clear and avoids turning `/form` into a cluttered settings command.

## Suggested User-Facing Explanation

Enable message:

    Private Flavour is now enabled.

    When you are transformed, the bot may DM you an optional inner effect for that form. These are roleplay prompts only. You decide whether your character follows, resists, ignores, or adapts them.

Disable message:

    Private Flavour is now disabled.

    You will still receive public transformation results, but the bot will not send you private inner-effect DMs.

## Data Changes

Add a new user setting in `data/users.json`.

Example user entry:

    {
      "registered": true,
      "currentForm": "Living Plush Bunny",
      "lastTransformedAt": "2026-05-13T08:20:00.000Z",
      "privateFlavour": true
    }

Existing users should default to:

    "privateFlavour": false

This keeps the feature safe and opt-in.

## Transformation Data Changes

Current transformation entries use a single `text` field.

Future structure could split this into:

    {
      "id": "living_plush_bunny",
      "name": "Living Plush Bunny",
      "categories": ["animal", "plushie", "toy"],
      "publicText": "{user} has become a living plush bunny, dangerously huggable and impossible to take seriously.",
      "privateText": "A soft, fuzzy warmth settles through you. You are still yourself, but dramatic thoughts feel harder to hold onto, and your plush paws keep turning every serious gesture into something painfully cute."
    }

Migration option:

- Keep `text` for now as the public text.
- Add `privateText` later.
- Eventually rename `text` to `publicText` once the system is stable.

Recommended first step:

    {
      "id": "living_plush_bunny",
      "name": "Living Plush Bunny",
      "categories": ["animal", "plushie", "toy"],
      "text": "{user} has become a living plush bunny, dangerously huggable and impossible to take seriously.",
      "privateText": "A soft, fuzzy warmth settles through you. You are still yourself, but dramatic thoughts feel harder to hold onto, and your plush paws keep turning every serious gesture into something painfully cute."
    }

This avoids breaking existing code immediately.

## Behaviour Flow

When a transformation happens:

1. Bot picks the transformation.
2. Bot posts the public transformation embed in the allowed game channel.
3. Bot checks whether the transformed user has `privateFlavour: true`.
4. If false, nothing else happens.
5. If true, bot checks whether the selected transformation has `privateText`.
6. If private text exists, bot attempts to DM it to the transformed user.
7. If the DM fails because the user has DMs closed, the bot should handle it quietly or send an ephemeral warning.

## DM Failure Handling

If the bot cannot DM the user, avoid throwing an error that breaks the public command.

Possible behaviour:

- Public transformation still completes.
- Bot sends an ephemeral message to the transformed user.

Example message:

    I tried to send your Private Flavour note, but your DMs appear to be closed.

Recommended first version: fail silently and log the error.

## Writing Guidelines For Private Flavour

Private flavour should:

- Be optional roleplay flavour.
- Use “you” because it is sent directly to the transformed user.
- Focus on feelings, instincts, habits, sensations, or playful behavioural pulls.
- Keep the player’s agency intact.
- Avoid sounding like an order the player must obey.
- Stay non-explicit by default.
- Be easy to ignore or reinterpret.

Good pattern:

    A soft, fuzzy warmth settles through you. You are still yourself, but serious thoughts feel harder to hold onto, and your new plush paws keep turning every dramatic gesture into something accidentally adorable.

Avoid:

    You can no longer resist your new instincts and must act like a plush bunny forever.

Reason: too forceful, removes player agency, and makes the feature feel less playful.

## Public Text vs Private Text

Public text should answer:

- What did everyone see happen?
- What is the final form?
- What is the funny public result?

Private text should answer:

- What does it feel like?
- What subtle instinct or habit comes with it?
- What roleplay hook does the player privately receive?

Example public text:

    {user} has become a living plush bunny, dangerously huggable and impossible to take seriously.

Example private text:

    A soft, fuzzy warmth settles through you. You are still yourself, but dramatic thoughts feel strangely harder to hold onto, and your floppy paws keep making every serious gesture look painfully cute.

## Implementation Notes

Possible new command file:

    src/commands/flavour.js

Possible command names:

    /flavour on
    /flavour off
    /flavour status

Possible user field:

    privateFlavour: false

Possible helper function:

    async function sendPrivateFlavour(targetUser, transformation) {
      if (!transformation.privateText) {
        return;
      }

      try {
        await targetUser.send({
          content: transformation.privateText,
        });
      } catch (error) {
        console.warn("Could not send private flavour DM:", error);
      }
    }

## Open Questions

- Should private flavour be sent as plain text or as an embed?
- Should private flavour include the transformation image?
- Should `/form` show whether Private Flavour is enabled?
- Should users be able to preview an example before opting in?
- Should some transformations have no private flavour text?
- Should there be different intensity levels later, such as soft, normal, spicy, or silly?

## Recommendation

Start simple.

First version:

- Add `privateFlavour` boolean to users.
- Add `/flavour on`, `/flavour off`, and `/flavour status`.
- Keep existing `text` as the public result.
- Add optional `privateText` to transformations.
- DM the private text only when the user has opted in.
- If DM fails, log the issue and do not break the public transformation.

Do not add intensity levels yet. That can come later if the basic system feels fun.
