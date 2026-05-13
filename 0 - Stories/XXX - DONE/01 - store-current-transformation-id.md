# Store Current Transformation ID

Status: Todo  
Priority: High  
Size: Small  
Tags: player-state, transformations, data-model, foundation

## Goal

Store the transformation ID on the user whenever they are transformed.

This makes later features easier and safer because the bot can look up the exact transformation entry again.

## Problem

The bot currently stores the user’s current form name.

Example:

    "currentForm": "Living Plush Bunny"

This is useful for display, but weak for lookup.

If the form name changes later, the bot may not be able to find the matching transformation data.

## Better User State

When a user is transformed, store both the display name and the transformation ID.

Example:

    "currentForm": "Living Plush Bunny",
    "currentTransformationId": "living_plush_bunny",
    "lastTransformedAt": "2026-05-13T08:30:00.000Z"

## Why This Matters

Future features will need to find the full transformation entry.

Examples:

- `/whatami`
- form traits
- mental changes
- private flavour
- reinforcement DMs
- staged transformations
- recovery commands
- scene cards
- transformation history
- image lookup

All of these are easier if the bot stores the transformation ID.

## Scope

Update transformation saving logic so that every successful transformation stores:

- `currentForm`
- `currentTransformationId`
- `lastTransformedAt`

This should happen for:

- `/transform me`
- `/transform user`
- `/randomtransform`, if it saves transformations separately

## Suggested Code Change

Where the bot currently does:

    users[userId].currentForm = transformation.name;
    users[userId].lastTransformedAt = new Date().toISOString();

Change to:

    users[userId].currentForm = transformation.name;
    users[userId].currentTransformationId = transformation.id;
    users[userId].lastTransformedAt = new Date().toISOString();

## Backwards Compatibility

Existing users may not have `currentTransformationId`.

Commands that need to find transformation details should use fallback lookup:

1. Try `currentTransformationId`.
2. If missing, try matching by `currentForm`.
3. If still missing, show a safe error message.

Do not require manual migration for MVP.

## Acceptance Criteria

- New transformations save `currentTransformationId`.
- Existing user data does not break.
- `/form` still works.
- `/whatami` can use `currentTransformationId` when available.
- Fallback by `currentForm` is available for older data.

## Recommendation

Do this at the same time as the `/whatami` MVP.

It is small, low-risk, and prevents fragile name-based lookup later.
