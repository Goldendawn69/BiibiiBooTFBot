# Base Character Profiles

Status: Idea  
Priority: Medium  
Size: Medium  
Tags: characters, registration, rpg, user-data, profiles, future-mechanics

## Goal

Add a system that lets registered users create and store a base character profile.

The base character is the user’s normal or starting form in the game. Transformations then change their current form, but the bot can still remember who they were before the magic, nonsense, plushification, clockwork, teapot curse, or other silliness happened.

This gives the bot a stronger foundation for future RPG elements.

## Core Idea

Separate a user’s normal identity from their current transformation state.

Base Form = who the player normally is.  
Current Form = what the player is currently transformed into.

This allows the bot to support future mechanics such as stats, resistance, roleplay prompts, character sheets, transformation history, and personalised transformation effects.

## Why This Matters

Right now, the bot mainly tracks whether someone is registered and what their current transformation is.

That works for a simple transformation game, but RPG-style features will need more structure.

A base character profile could later support:

- Character names.
- Pronouns.
- Base species or form.
- Short character descriptions.
- Public or private character sheets.
- Stats.
- Dice rolls.
- Transformation resistance.
- Transformation history.
- Roleplay hooks.
- Private flavour differences.
- Future mini-game mechanics.

## Recommended First Version

Start simple.

Do not build a full RPG character creator immediately.

First version should only save a basic character profile:

- Character name.
- Pronouns.
- Base form or species.
- Short description.
- Visibility setting.
- Created date.
- Updated date.

Stats, dice rolling, and more advanced mechanics can come later.

## Suggested User Data Structure

Add a `baseCharacter` object to each registered user.

Example:

    {
      "registered": true,
      "baseCharacter": {
        "name": "Becci",
        "pronouns": "she/her",
        "baseForm": "Human",
        "description": "A tired but curious survivor with too many ideas and not enough tea.",
        "visibility": "private",
        "createdAt": "2026-05-13T08:20:00.000Z",
        "updatedAt": "2026-05-13T08:20:00.000Z"
      },
      "currentForm": "Living Plush Bunny",
      "lastTransformedAt": "2026-05-13T08:30:00.000Z",
      "privateFlavour": false
    }

Existing users should be allowed to remain registered without a character profile.

The bot should treat `baseCharacter` as optional until the user creates one.

## Future Expanded User Data Structure

Later, the profile could include stats.

Example:

    {
      "registered": true,
      "baseCharacter": {
        "name": "Becci",
        "pronouns": "she/her",
        "baseForm": "Human",
        "description": "A tired but curious survivor with too many ideas and not enough tea.",
        "visibility": "private",
        "stats": {
          "charm": 1,
          "mischief": 1,
          "willpower": 1,
          "weirdness": 1,
          "luck": 1
        },
        "createdAt": "2026-05-13T08:20:00.000Z",
        "updatedAt": "2026-05-13T08:20:00.000Z"
      },
      "currentForm": "Living Plush Bunny",
      "lastTransformedAt": "2026-05-13T08:30:00.000Z",
      "privateFlavour": false
    }

## Suggested Commands

Use a separate command group for character profiles.

Recommended commands:

    /character create
    /character view
    /character edit
    /character reset

Optional later commands:

    /character rollstats
    /character setstats
    /character visibility
    /character view user:@user

## Do Not Put This Into /register

Registration should stay simple.

`/register` should mean:

“I opt into the bot’s transformation game.”

Character creation should be a second step.

Suggested flow:

1. User runs `/register`.
2. Bot registers them.
3. Bot suggests they can create a character with `/character create`.
4. User can ignore that and still use the basic bot.
5. If they want RPG features later, they create a base character.

Example registration message addition:

    You are now registered for silly transformation games.
    If you want to set up a base character for future RPG features, use `/character create`.

## Discord Interaction Options

There are three possible ways to build this.

### Option 1: Slash Command Fields

Example:

    /character create name:Becci pronouns:she/her baseform:Human description:A tired but curious survivor.

Pros:

- Simple to code.
- Easy to understand.
- Works like other slash commands.

Cons:

- Can feel cramped.
- Long descriptions are awkward.
- Not very nice for creative character setup.

### Option 2: Discord Modal

Example flow:

1. User runs `/character create`.
2. Bot opens a Discord form/modal.
3. User fills in:
   - Character name.
   - Pronouns.
   - Base form.
   - Short description.
   - Visibility.
4. Bot saves the character profile.

Pros:

- Cleaner user experience.
- Better for creative text.
- Feels like an actual character setup form.

Cons:

- More code than simple slash fields.
- Modals are mostly text inputs.
- Dropdowns and dice buttons are not part of the same modal flow.

### Option 3: Guided Setup With Buttons And Select Menus

Example flow:

1. User runs `/character create`.
2. Bot asks them to choose an origin or base type.
3. User picks from buttons or dropdowns.
4. Bot asks whether to roll stats or assign stats.
5. Bot builds the character step by step.

Pros:

- More fun.
- Feels more like a game.
- Good for future RPG mechanics.

Cons:

- More complicated.
- More state handling.
- Easier to overbuild too early.

## Recommendation

Use Option 2: Discord Modal.

A modal is the best first version because character creation is mostly text-based.

It keeps the command clean and avoids forcing users to squeeze their character idea into slash command fields.

Do not build dice rolling or stat assignment into the first version.

## Visibility

Do not ask users where their stats should be stored in a technical sense.

The bot should store character data in `data/users.json`, under the user’s Discord ID.

Instead, give users control over profile visibility.

Possible visibility values:

- private
- public
- summary

Recommended first version:

    "visibility": "private"

Possible meanings:

Private = only the user can view their full character sheet.  
Public = other users can view the profile.  
Summary = other users can see only basic information, such as name and base form.

## Suggested First Profile Fields

Use these fields for the first implementation:

    {
      "name": "",
      "pronouns": "",
      "baseForm": "",
      "description": "",
      "visibility": "private",
      "createdAt": "",
      "updatedAt": ""
    }

Field notes:

`name` should be the character’s display name.

`pronouns` should be optional.

`baseForm` should describe their normal form, species, or starting identity.

`description` should be short. Avoid allowing huge essays at first.

`visibility` should default to private.

`createdAt` and `updatedAt` help future migration/debugging.

## Suggested Stats For Later

Do not add stats in the first version unless there is a clear use for them.

When stats are added, avoid generic combat RPG stats unless the bot is going to become combat-focused.

Better bot-fitting stats could be:

- Charm
- Mischief
- Willpower
- Weirdness
- Luck

Alternative transformation-focused stats:

- Stability
- Mischief
- Glamour
- Resistance
- Curiosity

Recommended first future stat set:

    {
      "charm": 1,
      "mischief": 1,
      "willpower": 1,
      "weirdness": 1,
      "luck": 1
    }

These fit the silly transformation tone better than strength, dexterity, constitution, and similar combat stats.

## Dice Roll Ideas For Later

Later, users could choose how their stats are created.

Possible modes:

- Roll stats.
- Manual assignment.
- Point buy.
- Random silly profile.

Example command:

    /character rollstats

Possible behaviour:

1. Bot rolls values for each stat.
2. User can accept or reroll once.
3. Bot saves the accepted stats to their base character.

Do not build this until the base profile system works.

## Character View Behaviour

`/character view` should show the user their own character.

If the character is private, only they should see the full version.

Use an ephemeral reply for private character sheets.

Possible self-view:

    Character: Becci
    Pronouns: she/her
    Base Form: Human
    Current Form: Living Plush Bunny
    Description: A tired but curious survivor with too many ideas and not enough tea.
    Visibility: Private

Future public view command:

    /character view user:@someone

If the target user has a private profile, reply:

    That character profile is private.

If the target user has a public profile, show it in the channel or as an ephemeral reply depending on how noisy the command feels.

## Reset Behaviour

`/character reset` should remove the user’s base character profile, but should not unregister them.

It should not remove their current transformation unless deliberately designed to do so.

Possible reset behaviour:

- Delete `baseCharacter`.
- Keep `registered`.
- Keep `currentForm`.
- Keep `lastTransformedAt`.
- Keep `privateFlavour`.

Suggested warning message:

    This will delete your saved base character profile, but you will remain registered.
    Your current transformation will not be reset.

## Editing Behaviour

First version can be simple.

Possible command:

    /character edit

This opens the same modal as create, pre-filled if possible.

If pre-filling modal values is awkward, the bot can show the current profile first and then ask the user to re-enter the fields.

Do not overcomplicate editing in the first version.

## Implementation Notes

Possible new command file:

    src/commands/character.js

Possible modal custom ID:

    character_create_modal

Possible modal field IDs:

    character_name
    character_pronouns
    character_base_form
    character_description
    character_visibility

Possible helper functions in `src/utils/users.js`:

    ensureUserRecord(users, userId)
    hasBaseCharacter(users, userId)
    setBaseCharacter(users, userId, baseCharacter)
    clearBaseCharacter(users, userId)
    getBaseCharacter(users, userId)

Possible embed helper in `src/utils/embeds.js`:

    buildCharacterEmbed(user, discordUser)

## Behaviour Flow For /character create

1. User runs `/character create`.
2. Bot checks they are registered.
3. If not registered, bot asks them to use `/register`.
4. If registered, bot opens a modal.
5. User submits the modal.
6. Bot validates the fields.
7. Bot saves `baseCharacter` to `data/users.json`.
8. Bot replies with a confirmation.

Possible confirmation:

    Your base character has been saved.
    Transformations will now have something normal to ruin.

## Behaviour Flow For /character view

1. User runs `/character view`.
2. Bot checks they are registered.
3. Bot checks whether they have a `baseCharacter`.
4. If not, bot says they have not created one yet.
5. If yes, bot displays the profile.

Possible no-character message:

    You do not have a base character yet.
    Use `/character create` to set who you are before the magic starts meddling.

## Behaviour Flow For Future RPG Use

Once base characters exist, later transformation commands can refer to them.

Examples:

- Private flavour could mention the base character.
- Transformations could compare base form to current form.
- Stats could influence transformation resistance.
- Mischief could make random transformations sillier.
- Willpower could allow resisting or shortening an effect.
- Glamour could influence stylish or elegant transformations.
- Weirdness could unlock stranger results.
- Luck could affect dice rolls.

## Important Design Rule

Do not make character creation mandatory for simple bot use.

Some users will only want silly transformations.

Others will want deeper roleplay or RPG features.

The base character system should support both.

## Open Questions

- Should character profiles be private by default?
- Should users be able to make only a summary public?
- Should current form always show on the character profile?
- Should transformations change stats later?
- Should base character descriptions have a character limit?
- Should users be able to pick from preset base forms?
- Should the bot support multiple characters per user later?
- Should character creation use modals, slash command fields, or guided setup?
- Should character profile images ever be supported?

## Recommendation

Build this in three phases.

### Phase 1: Basic Character Profile

- Add `/character create`.
- Add `/character view`.
- Add `/character reset`.
- Store `baseCharacter` in `data/users.json`.
- Use Discord modals for creation.
- Keep visibility private by default.
- Do not add stats yet.

### Phase 2: Stats

- Add simple stats.
- Decide whether users roll, assign, or use defaults.
- Add `/character rollstats` or `/character stats`.
- Keep stats lightweight and silly.

### Phase 3: RPG Mechanics

- Use stats in transformation events.
- Add resistance, luck checks, or form instability.
- Connect private flavour to base character and stats.
- Add more game-like consequences once the foundation is stable.

Start with Phase 1 only.

Get the profile saved and displayed first.

Do not let the dice goblin steal the steering wheel too early.
