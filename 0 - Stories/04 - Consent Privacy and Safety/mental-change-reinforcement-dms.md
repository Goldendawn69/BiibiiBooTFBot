# Mental Change Reinforcement DMs

Status: Idea  
Priority: Medium  
Size: Medium-Large  
Tags: transformations, private-flavour, dms, consent, roleplay, scheduling, player-state

## Goal

Add optional random DM prompts that reinforce a user’s current transformation mental change.

These prompts are sent privately to users who have explicitly opted in.

The prompts should act as roleplay nudges, not commands.

## Core Idea

If a user has opted into mental-change reinforcement, the bot can occasionally DM them a small prompt based on their current form.

Example:

    A soft little plushie instinct tugs at you for a moment. Nothing you have to follow, but your bunny paws do make that dramatic gesture in your head look much less serious.

These DMs help the transformation feel ongoing rather than being a one-off public message.

## Important Consent Rule

This feature must be opt-in.

A user must explicitly agree to receive reinforcement DMs.

Registration alone is not enough.

Private Flavour alone may not be enough either, unless the opt-in wording clearly includes later reinforcement DMs.

Recommended separate setting:

    mentalReinforcement: false

Possible full user settings later:

    "mentalChanges": {
      "enabled": true,
      "reinforcementDms": true,
      "intensity": "soft",
      "lastPromptAt": "2026-05-13T08:30:00.000Z"
    }

## Suggested User-Facing Explanation

Enable message:

    Mental reinforcement DMs are now enabled.

    While you are transformed, the bot may occasionally DM you small optional roleplay prompts based on your current form. These are suggestions only. You decide whether your character follows, resists, ignores, or adapts them.

Disable message:

    Mental reinforcement DMs are now disabled.

    You will no longer receive random private prompts based on your current form.

Status message:

    Mental reinforcement DMs: Enabled
    Current form: Living Plush Bunny
    Prompt intensity: Soft

## Suggested Commands

Possible command group:

    /mentalchanges on
    /mentalchanges off
    /mentalchanges status

Possible separate reinforcement controls:

    /mentalchanges reinforcement on
    /mentalchanges reinforcement off

Simpler first version:

    /reinforce on
    /reinforce off
    /reinforce status

Recommended naming:

Use `/mentalchanges` if you want clarity.

Use `/flavour` if you want a softer bot tone.

Avoid using `/nsfw` for this. It makes the feature sound more explicit than it should be.

## Prompt Frequency

Do not send prompts too often.

These should feel like little surprises, not spam.

Recommended first version:

- No more than once every 6 to 12 hours per user.
- Only send while the user has a current form.
- Only send if they have opted in.
- Only send if the current transformation has mental change data.
- Do not send at night if you later add timezone settings.

Simpler first version:

Only send a reinforcement DM when the user runs a command such as:

    /reinforce now

This avoids needing scheduled jobs at first.

## Recommended Build Order

Do not build fully random background DMs first.

Build this in phases.

### Phase 1: Manual Prompt

Add:

    /reinforce now

Behaviour:

1. User runs `/reinforce now`.
2. Bot checks they are registered.
3. Bot checks they have opted into mental changes.
4. Bot checks they have a current form.
5. Bot finds the current transformation.
6. Bot sends or displays one reinforcement prompt.

This proves the writing and data model.

### Phase 2: Opt-In Random Prompt

Add:

    /reinforce on
    /reinforce off

Behaviour:

1. User opts in.
2. Bot stores the setting.
3. Random prompts can be sent later.

### Phase 3: Scheduled Background Prompts

Add occasional automated DMs.

This requires a scheduling loop, timer, cron process, or hosted bot runtime that stays online reliably.

Do this later.

## Prompt Style

Reinforcement DMs should:

- Be short.
- Be optional.
- Use “you” because they are private.
- Match the current form.
- Preserve player agency.
- Avoid sounding like an order.
- Avoid explicit sexual content.
- Stay playful, stylish, or spooky depending on the form.
- Be easy to ignore.

Good prompt:

    A tiny clockwork thrill ticks through you as something shiny catches your eye. You do not have to chase it, obviously, but your little dragon instincts seem very proud of having noticed it first.

Too forceful:

    You must collect the shiny object and cannot stop yourself.

Reason: removes agency and feels too heavy.

## Using mentalChange And mentalChangeRules

Each transformation can define:

    "mentalChange": "The transformed user feels softer, cuddlier, and less able to take dramatic situations seriously.",
    "mentalChangeRules": [
      "Keep it soft, cosy, and playful.",
      "Mention floppy paws, twitchy nose, cuddly instincts, or difficulty seeming serious.",
      "Do not remove the user's agency."
    ]

The bot can use these fields to choose or generate prompts.

First version should not require AI generation.

Use prepared prompt pools instead.

## Prepared Prompt Pool Option

Add a `reinforcementPrompts` field to transformations.

Example:

    {
      "id": "living_plush_bunny",
      "name": "Living Plush Bunny",
      "categories": ["animal", "plushie", "toy"],
      "mentalChange": "The transformed user feels softer, cuddlier, and less able to take dramatic situations seriously.",
      "mentalChangeRules": [
        "Keep it soft, cosy, and playful.",
        "Do not remove the user's agency."
      ],
      "reinforcementPrompts": [
        "Your plush bunny instincts give a tiny nudge, making the nearest comfy seat look suspiciously perfect.",
        "A soft little thought bounces through you: serious gestures are much harder when your paws want to flop.",
        "Your bunny nose gives an imaginary twitch, as if your new form has opinions about snacks, cushions, or both."
      ]
    }

This is safer, more predictable, and easier to moderate than generating text dynamically.

## Dynamic Prompt Option

Later, the bot could create prompts from:

- Current form.
- mentalChange.
- mentalChangeRules.
- User intensity setting.
- Current server event.
- User base character.

However, dynamic generation is more complex and harder to moderate.

Recommendation:

Do not start with dynamic generation.

Prepared prompt pools first. Tiny paws before giant machinery.

## Possible User Data

Simple version:

    {
      "registered": true,
      "currentForm": "Living Plush Bunny",
      "mentalChanges": true,
      "mentalReinforcement": true,
      "lastMentalPromptAt": "2026-05-13T08:30:00.000Z"
    }

More structured version:

    {
      "registered": true,
      "currentForm": "Living Plush Bunny",
      "mentalChanges": {
        "enabled": true,
        "reinforcementDms": true,
        "intensity": "soft",
        "lastPromptAt": "2026-05-13T08:30:00.000Z"
      }
    }

Recommended first version:

Use the structured version if you are sure this feature will grow.

Use the simple version if you want the fastest implementation.

## Intensity Levels For Later

Possible intensity levels:

- soft
- playful
- glamour

Avoid using explicit labels like NSFW unless the bot truly needs them.

Suggested meanings:

Soft = gentle, cute, easy to ignore.  
Playful = more noticeable instincts, sillier habits, stronger roleplay hook.  
Glamour = mature, stylish, confident, flirtier tone, but still non-explicit.

Example glamour-safe prompt:

    A polished confidence settles into your posture for a moment, like the room has become a stage and you know exactly where the light should fall.

This feels adult-adjacent without becoming explicit.

## DM Failure Handling

If the bot cannot DM the user:

- Do not crash.
- Do not break public commands.
- Log the failure.
- Optionally tell the user ephemerally the next time they use a related command.

Possible message:

    I tried to send a reinforcement DM, but your DMs appear to be closed.

First version can fail silently and log.

## Safety And Comfort Rules

This feature should never surprise users who did not opt in.

The bot should avoid:

- Loss of control wording.
- Permanent mental alteration wording.
- Explicit sexual commands.
- Non-consensual framing.
- Anything that makes the user feel trapped.
- Too many DMs.

The bot should prefer:

- Optional nudges.
- Temporary feelings.
- Roleplay prompts.
- Gentle instincts.
- Cute habits.
- Stylish confidence.
- Playful complications.
- Clear opt-out.

## Example Prompts

### Living Plush Bunny

    A soft little plushie instinct tugs at you. Nothing you have to follow, but your new bunny paws make the thought of dramatic seriousness feel extremely difficult.

    Your bunny nose gives a tiny imaginary twitch. Somewhere in the back of your mind, cushions and snacks have become much more important than they were a moment ago.

### Boutique Mannequin

    A quiet display-window stillness settles over your thoughts for a second. You can move whenever you like, but holding a perfect pose suddenly feels oddly satisfying.

    Your posture seems to correct itself before you think about it, polished and elegant, as if bad lighting has personally offended you.

### Tiny Clockwork Dragon

    A bright little tick-tick-tick of excitement runs through you as your clockwork thoughts notice something shiny nearby.

    A tiny puff of imaginary steam escapes your mood. Your little dragon pride is absolutely convinced that you handled that moment with mechanical elegance.

### Moonlit Vampire Lady

    A velvet calm settles into your voice for a moment, making every word feel just a little more deliberate.

    Moonlit confidence curls through your posture. You do not have to make a dramatic entrance, but your current form clearly thinks it would suit you.

## Open Questions

- Should reinforcement DMs be manually requested first?
- Should random DMs require the bot to be hosted continuously?
- Should prompts only happen while the user is active?
- Should users choose intensity?
- Should there be a daily maximum?
- Should users be able to pause prompts without disabling mental changes entirely?
- Should reinforcement prompts expire when the user resets form?
- Should locked forms allow longer-term reinforcement prompts?

## Recommendation

Start with a manual version.

First version:

- Add mental-change fields to a few transformations.
- Add `reinforcementPrompts` to those transformations.
- Add `/reinforce now`.
- Require opt-in before it works.
- Send the prompt by DM.
- Do not add background random scheduling yet.

Once that feels good:

- Add `/reinforce on`.
- Add occasional background DMs.
- Add cooldowns and daily limits.
- Add intensity settings if needed.

Keep the player in charge.

The fun comes from the prompt being tempting, not compulsory.
