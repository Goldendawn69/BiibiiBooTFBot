# Personal Transformation Note System

Status: Idea  
Priority: High  
Size: Medium  
Tags: private-notes, transformations, consent, dms, roleplay, user-settings

## User Story

As a registered player who enjoys private roleplay prompts,  
I want to opt into receiving personal transformation notes by DM,  
so that I can explore how a transformation feels without making those details public or forcing that experience onto anyone else.

## Context

Some transformation details are better kept private.

The public channel should show the visible transformation result, while the personal note can describe how the change feels, what subtle instincts or habits come with it, or what optional roleplay hook the player may want to use.

This is the first safe step towards richer mental-change flavour, but it is not the full mental-change system yet.

## Acceptance Criteria

- Given I am a registered player  
  When I use `/personalnotes on`  
  Then Personal Transformation Notes are enabled for me, validation only seen by the user.

- Given I have enabled Personal Transformation Notes  
  When I use `/personalnotes off`  
  Then Personal Transformation Notes are disabled for me, validation only seen by the user.

- Given I am a registered player  
  When I use `/personalnotes status`  
  Then the bot tells me whether Personal Transformation Notes are enabled or disabled, report only seen by the user.

- Given I have not enabled Personal Transformation Notes  
  When I am transformed  
  Then I do not receive a personal note DM.

- Given I have enabled Personal Transformation Notes  
  And the selected transformation has a `personalNote`  
  When I am transformed  
  Then the bot sends the `personalNote` to me by DM.

- Given I have enabled Personal Transformation Notes  
  And the selected transformation does not have a `personalNote`  
  When I am transformed  
  Then the public transformation still works and no personal note DM is sent.

- Given another player transforms me with `/transform user`  
  And I have enabled Personal Transformation Notes  
  And the selected transformation has a `personalNote`  
  When the transformation completes  
  Then the personal note is DM’d to me, not to the player who used the command.

- Given `/randomtransform` selects me  
  And I have enabled Personal Transformation Notes  
  And the selected transformation has a `personalNote`  
  When the transformation completes  
  Then the personal note is DM’d to me.

- Given my DMs are closed and `/personalNote on`
  When the bot tries to send a personal note  
  Then the public transformation still completes and the bot does not crash, the bot will give user seen only information that their personal transformation note couldn't be delivered.

- Given I am not registered  
  When I use `/personalnotes on`, `/personalnotes off`, or `/personalnotes status`  
  Then the bot tells me to register first.

- Given existing users do not have the new setting yet  
  When the bot reads their user record  
  Then they are treated as having Personal Transformation Notes disabled, until they turn it on.

## Coding Directions

### Naming

Use the same wording across code, data, commands, and stories.

Feature name:

    Personal Transformation Notes

Command:

    /personaltransformationnotes

User setting:

    personalTransformationNotes

Transformation field:

    personalTransformationNote

Avoid using `flavour` in code or command names for this feature.

### User Data

Add this setting to user records:

    "personalTransformationNotes": false

Example user record:

    {
      "registered": true,
      "currentForm": "Living Plush Bunny",
      "currentTransformationId": "living_plush_bunny",
      "lastTransformedAt": "2026-05-13T08:30:00.000Z",
      "personalTransformationNotes": true
    }

Default should be false.

Do not require a migration script for existing users. Missing value should behave as false.

### Transformation Data

Add an optional `personalNote` field to transformations.

Example:

    {
      "id": "living_plush_bunny",
      "name": "Living Plush Bunny",
      "categories": ["animal", "plushie", "toy"],
      "text": "{user} has become a living plush bunny...",
      "personalTransformationNote": "A soft, fuzzy warmth settles through you. You are still yourself, but serious thoughts feel harder to hold onto while your plush paws make every dramatic gesture look accidentally adorable."
    }

If `personalTransformationNote` is missing, skip the DM.

### Commands

Add:

    /personalnotes on
    /personalnotes off
    /personalnotes status

Suggested enable message:

    Personal Transformation Notes are now enabled.

    When you are transformed, the bot may DM you an optional private roleplay note about how the change feels. These notes are prompts only. You decide whether your character follows, resists, ignores, or adapts them.

Suggested disable message:

    Personal Transformation Notes are now disabled.

    You will still receive public transformation results, but the bot will not send you private transformation notes.

Suggested status messages:

    Personal Transformation Notes: Enabled

    Personal Transformation Notes: Disabled

### Files Likely To Change

Add:

    src/commands/personaltransformationnotes.js

Update:

    src/commands/index.js
    src/register-commands.js
    src/commands/transform.js
    src/commands/randomtransform.js

Possible helper file:

    src/utils/personalNotes.js

### Suggested Helper

Create a helper that sends the note safely.

    async function sendPersonalTransformationNote(discordUser, transformation) {
      if (!transformation.personalNote) {
        return;
      }

      try {
        await discordUser.send({
          content: transformation.personalNote,
        });
      } catch (error) {
        console.warn("Could not send personal transformation note DM:", error);
      }
    }

Only call this helper after checking the transformed user has `personalTransformationNotes` enabled.

### Writing Rules For Personal Transformation Notes

Personal notes should:

- Use “you”.
- Be optional roleplay prompts.
- Keep player agency intact.
- Avoid sounding like orders.
- Avoid explicit content by default.
- Avoid loss-of-control wording.
- Be easy to ignore, resist, or reinterpret.

Good:

    You feel a gentle pull towards cosy, floppy behaviour, but you are still yourself and can choose how much you play into it.

Avoid:

    You cannot resist and must act like this forever.

### Not In Scope

Do not add these in this story:

- Random reinforcement DMs.
- Mental change rules.
- Intensity levels.
- Public sharing.
- Resend buttons.
- AI-generated notes.
- Staged personal notes.
- `/whatami` personal note display.
- Recovery or grounding commands.

Those belong in later stories.

## Future Notes

This story creates the first private roleplay layer.

Later stories can build on it with:

- Mental change fields.
- Mental change rules.
- Reinforcement DMs.
- `/whatami` resend personal transformation note.
- Recovery or grounding commands.
- Staged transformations.

Do not build those until the basic opt-in personal note system works.