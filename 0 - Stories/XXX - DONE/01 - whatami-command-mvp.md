# What Am I Command - MVP Self View

Status: Todo  
Priority: High  
Size: Medium  
Tags: player-state, transformations, command, embed, mvp

## Goal

Create the first version of `/whatami`.

This command lets a registered user view their own current transformation state as a richer embed.

## User Story

As a registered user, I want to check what I am currently transformed into, so that I can see my current form, image, categories, and transformation details after the original transformation message has passed.

## Scope

Add a new `/whatami` command.

The MVP should show only the command user’s own current form.

The reply should be ephemeral.

The command should use existing transformation data.

## MVP Behaviour

When a user runs:

    /whatami

The bot should:

1. Check the user is registered.
2. Check the user has a current form.
3. Find the matching transformation entry.
4. Build an embed.
5. Attach the local transformation image if available.
6. Reply ephemerally.

## MVP Embed Content

The embed should include:

- Title: What Am I?
- Current form name.
- Categories.
- Transformed time, if available.
- Public transformation description.
- Transformation image, if available.

Suggested fields:

    Current Form
    Living Plush Bunny

    Categories
    Animal, Plushie, Toy

    Transformed
    13 May 2026, 8:30 PM

    Description
    The public transformation description.

## Not In MVP

Do not include these yet:

- Other-user lookup.
- Public posting.
- Mental changes.
- Private flavour.
- Traits.
- Recovery buttons.
- Scene prompt buttons.
- Staged transformation progress.
- Base character details.
- RPG stats.

These should be later stories.

## Registered User Handling

If the user is not registered, reply ephemerally:

    You are not registered yet. Use `/register` first if you want to join the silly transformation games.

## No Current Form Handling

If the user is registered but has no current form, reply ephemerally:

    You are registered, but you have not been transformed yet.

## Missing Transformation Data Handling

If the user has a saved current form but the bot cannot find the matching transformation entry, reply ephemerally:

    I can see your current form, but I could not find the matching transformation data.
    Your saved form is: [currentForm]

This should not crash the bot.

## Data Lookup

Preferred lookup:

    user.currentTransformationId

Fallback lookup:

    user.currentForm

The MVP should support fallback because existing users may only have `currentForm`.

## Image Handling

Use the same local image lookup approach as transformation result embeds.

If the transformation image exists:

    assets/transformations/[transformation-id].png

Attach it to the embed.

If no image exists, show the embed without an image.

## Suggested File Changes

Possible new command file:

    src/commands/whatami.js

Register the new command in:

    src/register-commands.js

Route the command in:

    src/index.js

Possible helper updates in:

    src/utils/transformations.js
    src/utils/embeds.js

## Suggested Helper Functions

Possible helper in `src/utils/transformations.js`:

    function findTransformationById(transformations, transformationId) {
      return transformations.find((transformation) => transformation.id === transformationId);
    }

Possible fallback helper:

    function findTransformationForUser(transformations, user) {
      if (user.currentTransformationId) {
        return transformations.find((transformation) => transformation.id === user.currentTransformationId);
      }

      if (user.currentForm) {
        return transformations.find((transformation) => transformation.name === user.currentForm);
      }

      return null;
    }

Possible embed helper:

    buildCurrentFormEmbed(user, transformation)

## Acceptance Criteria

- `/whatami` is registered as a slash command.
- `/whatami` works for registered users.
- `/whatami` rejects unregistered users politely.
- `/whatami` handles users with no current form.
- `/whatami` shows current form name.
- `/whatami` shows categories.
- `/whatami` shows transformed time if available.
- `/whatami` attaches the transformation image if it exists.
- `/whatami` does not expose mental/private data.
- Missing transformation data does not crash the bot.
- Existing users with only `currentForm` still work through fallback lookup.

## Recommendation

Build this before adding traits, mental changes, or recovery buttons.

This gives the bot a stronger player-state view immediately and gives later RPG systems somewhere sensible to appear.
