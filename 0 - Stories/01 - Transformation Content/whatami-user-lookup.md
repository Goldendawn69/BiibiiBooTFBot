# What Am I User Lookup

Status: Idea  
Priority: Medium  
Size: Medium  
Tags: player-state, whatami, user-lookup, privacy, visibility, public-summary

## Goal

Add a way to check what another registered user currently looks like.

This expands `/whatami` from a private self-check into a safe visible-form lookup.

The command should answer:

    What does this person currently look like?

It should not reveal private or mental transformation details.

## Command Idea

Add an optional user parameter to `/whatami`.

Example:

    /whatami user:@Becci

Behaviour:

- If no user is provided, `/whatami` keeps its current behaviour and DMs the command user their full current-form details.
- If a user is provided, the bot shows a safe visible summary of that target user’s current form.

## Important Distinction

Self-check and other-user lookup are different.

Self-check:

    /whatami

Shows full details to the user by DM.

Other-user lookup:

    /whatami user:@name

Shows only visible/public information about the target user's current form.

Do not show the same data in both cases.

## Privacy Rules

Other-user lookup may show:

- Target user mention.
- Current form name.
- Transformation image.
- Categories.
- Short appearance summary, if available.
- Public-safe traits, if added later.

Other-user lookup must not show:

- Mental changes.
- Private flavour.
- Reinforcement prompts.
- Mental change rules.
- User consent settings.
- Hidden player notes.
- Private character profile details.
- Anything marked private.

The lookup should answer what can be seen, not what the transformed user privately feels.

## Suggested Output

Example public or ephemeral response:

    What Is Becci?

    Current Form:
    Rainbow Slime Girl

    Categories:
    Creature, Fantasy

    Appearance:
    Becci is currently a colourful rainbow slime girl with glossy dripping hair, bright cheerful eyes, and a soft squishy form that catches the light like magical jelly.

Include the image if available.

## Response Location

This needs a design decision.

Possible options:

### Option 1: Ephemeral To Requester

The bot replies only to the person who asked.

Pros:

- Avoids clutter.
- Safer.
- Less spammy.
- Good first version.

Cons:

- Other people do not see the lookup.

### Option 2: Public In Game Channel

The bot posts the visible summary in the channel.

Pros:

- More social.
- Lets people easily show current appearances.
- Useful for roleplay.

Cons:

- Can clutter the channel.
- Needs cooldowns.
- Needs stronger visibility rules.

## Recommendation

First version should be ephemeral to the requester.

Later, add a deliberate public option if it still feels useful.

This avoids recreating the same problem as `public:true`, where large embeds could clutter the channel.

## Visibility Setting

Eventually users may control whether others can look them up.

Possible user setting:

    "formVisibility": "summary"

Possible values:

- private
- summary
- public

Suggested meanings:

Private:

    Other users cannot view your current form with `/whatami user:@name`.

Summary:

    Other users can see form name, categories, and image.

Public:

    Other users can see form name, categories, image, and appearance summary.

Recommended first version:

Use summary visibility by default for registered users, or skip visibility settings until there is a reason to restrict.

Safer version:

Default to summary, but never show private details.

## Registration Rules

If the target user is not registered, reply:

    That user has not opted into silly transformation games.

If the target user is registered but has no current form, reply:

    That user is registered, but they are not currently transformed.

If the target user has a current form but the transformation data cannot be found, reply:

    I can see that user has a saved current form, but I could not find the matching transformation data.

## Appearance Summary

The current `text` field is written as a transformation event.

Example:

    {user} has become...

That can work, but it may be too long or awkward for user lookup.

Future transformation entries may need:

    "appearanceSummary": "A colourful rainbow slime girl with glossy dripping hair, bright cheerful eyes, and a soft squishy form that catches the light like magical jelly."

The command can then use:

1. `appearanceSummary` if present.
2. Fallback to a shortened/adjusted version of `text`.
3. Fallback to just the form name and categories.

## Suggested Implementation Approach

Update `/whatami` to accept an optional user option.

If no target user is provided:

- Use the current DM self-check behaviour.

If a target user is provided:

- Load the target user state.
- Check registration.
- Check current form.
- Find the transformation using `currentTransformationId`, with fallback to `currentForm`.
- Build a safe visible-form embed.
- Reply ephemerally to the requester.

## Suggested Files

Update:

    src/register-commands.js

Add optional user parameter to `/whatami`.

Update:

    src/commands/whatami.js

Add branching logic for self-check vs target lookup.

Update or add helper in:

    src/utils/embeds.js

Possible new helper:

    buildVisibleCurrentFormEmbed(targetUser, transformation, targetMention)

## Acceptance Criteria

- `/whatami` still DMs the command user their full current-form details.
- `/whatami user:@name` works for registered target users.
- Other-user lookup does not DM the target user.
- Other-user lookup does not show mental/private data.
- Other-user lookup handles unregistered users politely.
- Other-user lookup handles users with no current form.
- Other-user lookup handles missing transformation data without crashing.
- Other-user lookup includes image if available.
- Other-user lookup includes categories.
- Other-user lookup replies ephemerally in the first version.

## Future Options

Later, consider:

- `visibility` settings.
- Public posting option with cooldown.
- Appearance summary field.
- Public-safe traits.
- Base character summary.
- Buttons such as “Request public share” or “Ask user to reveal full form”.

## Recommendation

Build this after the `/whatami` MVP is stable and after deciding whether to add `appearanceSummary`.

Do not include mental changes or private flavour in this command.

This command is for visible form lookup only.
