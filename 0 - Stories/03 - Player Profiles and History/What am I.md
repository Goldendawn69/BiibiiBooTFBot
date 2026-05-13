For yourself:

/whatami

For another registered user:

/whatami user:@Becci

But I would make other-user lookups respect privacy. If mental changes/private flavour are enabled, those should probably only show to the player themselves unless they explicitly allow public viewing.

A good structure would be:

Public or ephemeral summary:

What Am I?

Current Form: Living Plush Bunny
Base Character: Becci, Human
Categories: Animal, Plushie, Toy
Traits: Soft, Floppy, Cute, Comforting, Hard to Take Seriously
Transformed By: Random Transformation
Transformed At: 13 May 2026, 8:30 PM
Image: attached

Then, if the user is checking themselves and has mental changes enabled:

Mental Change:
You feel softer, cuddlier, and less able to take dramatic situations seriously. You remain fully yourself, but dramatic moods are harder to hold onto while your plush bunny instincts keep nudging you towards comfort, flopping, and accidental cuteness.

Mental Rules:
• Keep it playful and agency-safe.
• You can follow, resist, ignore, or reinterpret the prompt.
• Nothing here overrides your choices.

That is useful, cute, and safe.

I’d split the command behaviour like this:

/whatami
Shows your own full current form status. Could be DM or ephemeral.

/whatami public:true
Optional later. Lets you post a safe summary in the channel.

/whatami user:@someone
Shows only what that user allows others to see.

Tiny firm correction, Trinket: do not DM someone else’s mental changes to you. That should stay private to the transformed user unless they deliberately choose to share it. Otherwise the bot starts leaking the more intimate roleplay layer, and that will get messy fast. 🎀

Data-wise, this means each transformation could gain traits:

{
  "id": "living_plush_bunny",
  "name": "Living Plush Bunny",
  "categories": ["animal", "plushie", "toy"],
  "traits": ["soft", "floppy", "cute", "comforting", "hard_to_take_seriously"],
  "text": "{user} has become a living plush bunny, dangerously huggable and impossible to take seriously.",
  "privateText": "A soft, fuzzy warmth settles through you...",
  "mentalChange": "The transformed user feels softer, cuddlier, and less able to take dramatic situations seriously.",
  "mentalChangeRules": [
    "Keep it soft, cosy, and playful.",
    "Do not remove the user's agency.",
    "Focus on comfort, floppiness, and accidental cuteness."
  ]
}

And the user record could eventually store how the transformation happened:

{
  "registered": true,
  "currentForm": "Living Plush Bunny",
  "currentTransformationId": "living_plush_bunny",
  "lastTransformSource": "category:plushie",
  "lastTransformedAt": "2026-05-13T08:30:00.000Z"
}

I would strongly suggest storing currentTransformationId, not just currentForm. Right now if you only store "Living Plush Bunny", the bot has to match by name later, which is more fragile. ID is cleaner.

So this idea becomes bigger than traits. It is really:

Current Form Identity / What Am I Command

Purpose:

Show a player their current transformation state, including visual form, categories, traits, transformation source, image, optional mental changes, and recovery options.

This could become one of the most-used commands because it gives the player a proper “character sheet” for their current cursed state.

I’d include buttons later too:

Recover
Show Public Summary
Get Scene Prompt
Get Reinforcement Prompt
Reset Form

That turns /whatami into a hub.

My verdict: yes, build this idea. It is stronger than “Form Traits” as a standalone story. Form Traits become the data behind /whatami, scene cards, recovery, and future RPG mechanics.

The story file should probably be called:

Current Form Identity - What Am I Command.md

And it belongs under:

0 - Stories/Player State Upgrades/

or possibly:

0 - Stories/Core Fun/

My pick: Player State Upgrades, because it is about showing and using stored player state.