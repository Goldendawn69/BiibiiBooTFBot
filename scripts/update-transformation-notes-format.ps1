param(
  [string]$TransformationsPath = (Join-Path $PSScriptRoot "..\data\transformations.json")
)

if (-not (Test-Path $TransformationsPath)) {
  Write-Error "Could not find transformations file at: $TransformationsPath"
  exit 1
}

$noteMap = @{
  "clockwork_dragon" = [ordered]@{
    formEffects = @"
A bright little tick-tick-tick of excitement runs through you. You are still yourself, but your thoughts feel quicker, shinier, and a little more dramatic, as if every clever idea deserves a proud puff of imaginary steam. Tiny dragon confidence curls warmly in your chest, nudging you to stand tall, sparkle boldly, and treat interesting objects as possible treasure.
"@
    innerEffects = @"
The mental pull is light and playful. You may feel more curious, proud, and excitable than usual, with a tiny draconic urge to notice shiny things and react with theatrical confidence. It does not change who you are, but it can make your usual thoughts feel a little faster, brighter, and more eager to show off.
"@
  }

  "haunted_teapot" = [ordered]@{
    formEffects = @"
A strange porcelain calm settles through you, delicate and slightly smug. You are still yourself, but irritation now feels like a lid-rattle waiting to happen, and every awkward silence seems improved by imaginary ghostly steam. There is a small, judgemental part of you that suddenly cares far too much about manners, biscuits, and the correct use of teacups.
"@
    innerEffects = @"
The mental pull is mild and fussy. You may feel a little more judgemental, formal, or theatrically offended by bad manners, as if the teapot form wants every social problem solved with tea and a pointed look. Your identity stays intact, but playing into polite supernatural smugness may feel unusually satisfying.
"@
  }

  "glitter_goblin" = [ordered]@{
    formEffects = @"
A fizzy little itch for shiny things dances through your thoughts. You are still yourself, but your attention keeps snagging on glitter, gems, ribbons, and anything that looks even slightly hoardable. A mischievous confidence bubbles up with it, encouraging you to grin too widely, guard your treasures, and act as if every sparkle in the room clearly belongs to you.
"@
    innerEffects = @"
The mental pull is playful and mischievous. You may feel more impulsive around shiny things, more protective of little treasures, and more willing to act like a crafty chaos gremlin. It does not replace your personality, but it does make hoarding sparkly nonsense feel strangely reasonable.
"@
  }

  "boutique_mannequin" = [ordered]@{
    formEffects = @"
A polished stillness settles into your posture, making every pause feel a little more deliberate. You are still yourself, but your body seems to understand display-window elegance before your thoughts catch up, drawing you towards perfect poses, graceful angles, and an unsettling awareness of lighting. Compliments may feel oddly satisfying, as if the form enjoys being admired even when you pretend not to.
"@
    innerEffects = @"
The mental pull is moderate and glamour-focused. You remain yourself, but the mannequin form nudges you towards poise, stillness, and display-like confidence. Being seen may feel less embarrassing and more natural, as if part of you enjoys becoming a polished object of attention. You can resist it, but leaning into the pose may feel quietly rewarding.
"@
  }

  "rubber_duck" = [ordered]@{
    formEffects = @"
A buoyant, squeaky sense of importance rises through you. You are still yourself, but it becomes strangely tempting to treat small inconveniences as royal offences and respond to tension with maximum tiny dignity. Somewhere inside, a smug little bath-time monarch insists that floating, judging, and dramatic squeaking are all perfectly reasonable behaviours.
"@
    innerEffects = @"
The mental pull is silly and light. You may feel a puffed-up sense of tiny royal importance, with a stronger urge to judge, squeak, or act offended by harmless things. It is not deep personality change, just a ridiculous little confidence bubble.
"@
  }

  "magical_maid" = [ordered]@{
    formEffects = @"
A sparkling urge to tidy chaos swirls at the edge of your thoughts. You are still yourself, but messes feel more noticeable, dramatic gestures feel more natural, and the idea of fixing problems with a flourish becomes alarmingly appealing. The magic does not make you obedient, but it does keep nudging you towards helpfulness, theatrical competence, and suspiciously glittery solutions.
"@
    innerEffects = @"
The mental pull is mild to moderate. You may feel more helpful, organised, and theatrically service-minded, but not submissive or controlled. The maid magic encourages competence, sparkle, and the satisfaction of making chaos behave, while your choices and personality remain your own.
"@
  }

  "pocket_fairy" = [ordered]@{
    formEffects = @"
A tiny, sparkling confidence flutters through you, far larger than your new size has any right to support. You are still yourself, but problems seem to invite glitter, advice, and completely unnecessary dramatic hovering. A sweet little royal streak whispers that being small does not mean being unimportant, and that everyone should probably listen when you have opinions.
"@
    innerEffects = @"
The mental pull is light and bright. You may feel more confident, opinionated, and magically important despite your tiny form. It encourages playful bossiness and glittery solutions, but it does not take over who you are.
"@
  }

  "porcelain_princess" = [ordered]@{
    formEffects = @"
A delicate, careful poise settles through you like cool painted porcelain. You are still yourself, but sudden movements feel less natural than graceful ones, and dignity becomes weirdly important. There is a gentle pull towards elegance, stillness, and being admired from a safe distance, though you can choose whether to resist it, play into it, or make everyone nervous by smiling too perfectly.
"@
    innerEffects = @"
The mental pull is moderate and doll-like. You remain yourself, but the form nudges you towards elegance, careful manners, and the quiet pleasure of being admired. You may feel more fragile, refined, or princess-like than usual, with a soft temptation to act precious, polished, and untouchably pretty.
"@
  }

  "cat_cafe_girl" = [ordered]@{
    formEffects = @"
A warm feline ease curls through your mood, making sunny spots, snacks, and small acts of mischief feel much more important. You are still yourself, but your attention may drift towards shiny spoons, unattended pastries, or the urge to judge people from somewhere comfortable. Your new instincts do not control you, but they do seem very confident that naps count as productivity.
"@
    innerEffects = @"
The mental pull is playful and feline. You may feel more relaxed, curious, distractible, and quietly judgemental, especially around comfort, food, and shiny little things. It is not a deep personality shift, but it does make catlike priorities feel strangely persuasive.
"@
  }

  "moonlit_witch" = [ordered]@{
    formEffects = @"
Moonlit mischief settles around your thoughts like a cloak. You are still yourself, but trouble feels a little more elegant, your gestures feel more spell-like, and dramatic timing becomes suspiciously satisfying. There is a subtle confidence in the magic, nudging you to speak with more flair, smile like you know a secret, and treat harmless chaos as a perfectly valid hobby.
"@
    innerEffects = @"
The mental pull is moderate and magical. You may feel more mysterious, dramatic, and willing to cause stylish little problems. The witchy influence encourages secret smiles, clever timing, and moonlit confidence, but it remains a roleplay pull rather than a replacement for your own mind.
"@
  }

  "living_plush_bunny" = [ordered]@{
    formEffects = @"
A soft, fuzzy warmth settles through you. You are still yourself, but serious thoughts feel harder to hold onto, and your plush paws keep making every dramatic gesture look accidentally adorable. The form gently nudges you towards cosy comfort, harmless flopping, and the terrible burden of being difficult to take seriously.
"@
    innerEffects = @"
The mental pull is soft and comforting. You may feel more cuddly, gentle, and easily soothed, with a stronger desire for comfort and playfulness. It does not erase your personality, but it can make sharp moods feel padded around the edges.
"@
  }

  "office_sorceress" = [ordered]@{
    formEffects = @"
A sleek, commanding confidence clicks into place like a perfectly prepared presentation. You are still yourself, but your posture feels sharper, your voice feels smoother, and every task seems like it could be improved with a little magical authority. There is a subtle glamour to the change, nudging you to enjoy being capable, stylish, and just dangerous enough to make the office printer nervous.
"@
    innerEffects = @"
The mental pull is moderate and glamour-leaning. You remain yourself, but the form nudges you towards polish, style, and poised authority. You may feel more aware of how you look, how you move, and how easily confidence can become tempting. It does not force you to act differently, but leaning into being capable, pretty, and quietly commanding may feel very natural.
"@
  }

  "bubble_mermaid" = [ordered]@{
    formEffects = @"
A graceful ocean brightness drifts through you, softening your movements into something smoother and more flowing. You are still yourself, but attention feels warmer, gestures feel prettier, and the idea of being admired in shimmering light becomes harder to ignore. The glamour is gentle rather than forceful, inviting you to feel playful, radiant, and entirely too comfortable treating any water nearby as your personal kingdom.
"@
    innerEffects = @"
The mental pull is moderate and dreamy. You may feel more graceful, playful, and comfortable being admired, with a soft desire to move beautifully and claim attention like sunlight on water. Your personality remains your own, but the mermaid glamour can make feeling pretty, fluid, and charmingly royal seem easier than usual.
"@
  }

  "tin_robot_assistant" = [ordered]@{
    formEffects = @"
A cheerful little startup chime seems to ring through your thoughts. You are still yourself, but tasks feel like missions, compliments feel like power surges, and your confidence arrives with polite beeps and shiny posture. The assistant programming does not control you, but it does make being useful, efficient, and adorably pleased with yourself feel oddly natural.
"@
    innerEffects = @"
The mental pull is moderate and synthetic. You remain yourself, but the robot-assistant form adds a stronger urge to be helpful, efficient, polite, and pleased by successful tasks. Compliments may feel like positive feedback loops. It does not overwrite your will, but acting cheerful, useful, and slightly programmed may feel satisfying.
"@
  }

  "garden_gnome_lady" = [ordered]@{
    formEffects = @"
A sturdy little sense of garden authority takes root inside you. You are still yourself, but nearby plants suddenly feel like your responsibility, and poor lawn care feels personally offensive. The change gently nudges you towards cheerful fussing, practical complaints, and the belief that every mushroom, leaf, and plastic fern would benefit from your supervision.
"@
    innerEffects = @"
The mental pull is mild and practical. You may feel more protective, fussy, and responsible about plants, gardens, and tiny outdoor details. It is more a themed attitude shift than a deep mental change.
"@
  }

  "candyfloss_sprite" = [ordered]@{
    formEffects = @"
A sugar-light sparkle fizzes through your thoughts, making everything feel a little brighter, sweeter, and more ridiculous. You are still yourself, but your mood feels easier to lift, your movements feel puffier and lighter, and leaving a trail of harmless magical nonsense suddenly seems perfectly reasonable. Somewhere inside, dessert authority has become a personality trait.
"@
    innerEffects = @"
The mental pull is light, sweet, and fizzy. You may feel more cheerful, silly, and easily delighted, with a stronger urge to make things brighter even when that is not strictly helpful. It does not change who you are, but it can make playful sweetness feel like the obvious answer.
"@
  }

  "mini_dragon_librarian" = [ordered]@{
    formEffects = @"
A warm, bookish intensity coils through you, tiny but fierce. You are still yourself, but disorderly shelves, folded page corners, and loud voices feel much more serious than they did before. The dragon part of the form adds a proud little protectiveness, while the librarian part insists that knowledge must be guarded, catalogued, and defended with soft hisses if necessary.
"@
    innerEffects = @"
The mental pull is focused and protective. You may feel more territorial about books, rules, and quiet spaces, with a tiny draconic pride wrapped around librarian seriousness. It does not make you someone else, but it can make order, knowledge, and hissing at bad behaviour feel important.
"@
  }

  "enchanted_doll" = [ordered]@{
    formEffects = @"
A delicate click of enchanted stillness settles into your limbs. You are still yourself, but graceful poses feel easier to hold, polite gestures come more naturally, and being arranged neatly somewhere comfortable has an odd charm to it. The doll-magic does not take away your choices, though it does make perfect manners, careful movements, and a painted little smile feel strangely tempting.
"@
    innerEffects = @"
The mental pull is moderate and doll-like. You remain yourself, but the enchantment nudges you towards politeness, stillness, and a sweetly arranged kind of prettiness. Holding a pose, smiling neatly, or acting like a well-loved toy may feel more appealing than usual, but the choice to play along stays yours.
"@
  }

  "rainbow_slime_girl" = [ordered]@{
    formEffects = @"
A soft, wobbly brightness settles through you. You are still yourself, but your thoughts feel a little bouncier, your mood a little harder to squash, and every movement carries the strange temptation to stretch, shimmer, or wobble dramatically just because you can. It is difficult to feel intimidating when your whole body wants to sparkle and jiggle at the worst possible moments.
"@
    innerEffects = @"
The mental pull is light and buoyant. You may feel more cheerful, flexible, and hard to discourage, as if bad moods bounce off more easily than usual. It does not reshape your identity, but it can make playfulness and resilience feel slippery, bright, and strangely natural.
"@
  }

  "starry_stage_magician" = [ordered]@{
    formEffects = @"
A showy little thrill runs through your hands, as if every gesture deserves applause. You are still yourself, but timing, flourish, and unnecessary glitter suddenly feel very important. The magic nudges you towards theatrical confidence, sly smiles, and the belief that even the smallest trick should be performed like the finale of a very suspicious stage show.
"@
    innerEffects = @"
The mental pull is moderate and performative. You may feel more dramatic, confident, and eager to turn ordinary moments into little performances. The stage magic does not control you, but it can make applause, mystery, and theatrical timing feel delightfully tempting.
"@
  }

  "tea_party_hostess" = [ordered]@{
    formEffects = @"
A bright, social poise settles into you, all smiles, careful hands, and terrifyingly cheerful hospitality. You are still yourself, but hosting feels more natural, etiquette feels more important, and every awkward moment seems like it could be improved with tea. The change gently nudges you towards being charming, organised, and just a little too invested in whether everyone is enjoying themselves correctly.
"@
    innerEffects = @"
The mental pull is mild to moderate and social. You may feel more attentive, hospitable, and invested in making others comfortable, even if that comfort comes with strict tea-party standards. It does not make you submissive or automatic, but it can make hosting feel unusually satisfying.
"@
  }

  "clocktower_ghost_girl" = [ordered]@{
    formEffects = @"
A cool, drifting calm passes through you like mist between old clock gears. You are still yourself, but time feels softer around the edges, and moving quietly seems easier than making a scene. A gentle haunted elegance lingers in your thoughts, nudging you towards polite spookiness, distant chimes, and the occasional feeling that you are late for something that happened years ago.
"@
    innerEffects = @"
The mental pull is soft, distant, and spooky. You may feel calmer, quieter, and slightly detached from ordinary urgency, as if the clocktower has slowed the world around you. It does not erase you, but it can make drifting, observing, and being gently haunting feel natural.
"@
  }

  "ballerina_music_box" = [ordered]@{
    formEffects = @"
A tiny wound-up grace settles into your posture, delicate and precise. You are still yourself, but stillness, balance, and careful turns feel strangely satisfying, as if an unheard melody is waiting for you to move. The form does not force you to dance, though it does make graceful twirls and dramatic little pauses feel almost inevitable.
"@
    innerEffects = @"
The mental pull is moderate and delicate. You may feel more patient, poised, and drawn to rhythm, as if part of you enjoys waiting for the right moment to move. It does not trap your mind, but it can make stillness and graceful performance feel oddly comforting.
"@
  }

  "lady_knight_mouse" = [ordered]@{
    formEffects = @"
A brave, squeaky determination rises through you, far larger than your tiny form. You are still yourself, but crumbs look suspiciously like quests, biscuits like fortresses, and anything larger than you like something to face with heroic dignity. The mouse-knight instincts nudge you towards courage, loyalty, and extremely serious squeaking in moments of danger.
"@
    innerEffects = @"
The mental pull is light and heroic. You may feel braver, more loyal, and more ready to defend tiny causes with oversized seriousness. It does not change your core self, but it can make small challenges feel like noble quests.
"@
  }

  "crystal_fairy_queen" = [ordered]@{
    formEffects = @"
A glittering royal certainty settles over you like a crown made of light. You are still yourself, but your thoughts feel brighter, sharper, and far more convinced that your opinions deserve ceremony. The fairy glamour nudges you towards graceful authority, sparkling gestures, and the quiet expectation that anyone taller than a mug should still show proper respect.
"@
    innerEffects = @"
The mental pull is moderate and regal. You may feel more confident, elegant, and certain that your presence deserves attention. It does not replace your personality, but it can make royal poise, pretty authority, and sparkling self-importance feel tempting.
"@
  }

  "pumpkin_girl" = [ordered]@{
    formEffects = @"
A warm autumn softness spreads through you, scented with cinnamon, leaves, and harmless seasonal mischief. You are still yourself, but your mood feels sunnier, your gestures a little more whimsical, and the idea of scattering tiny seed-like sparkles feels oddly appropriate. The form nudges you towards cheerful charm, cosy confidence, and a deep personal interest in pumpkins being properly appreciated.
"@
    innerEffects = @"
The mental pull is light and seasonal. You may feel warmer, cosier, and a little more whimsical, with an urge to spread autumn cheer and harmless mischief. It is not a deep personality shift, just a pumpkin-spiced nudge towards charm.
"@
  }

  "velvet_lounge_siren" = [ordered]@{
    formEffects = @"
A slow, velvet confidence settles into your body, smoothing your posture and making every glance feel a little more deliberate. You are still yourself, but your voice seems warmer, your timing more teasing, and attention feels less intimidating than intoxicating. The glamour does not control you, but it does invite you to enjoy feeling attractive, poised, and dangerously aware of how well the room suits you.
"@
    innerEffects = @"
The mental pull is strong but optional, wrapped in glamour and performance. You remain yourself, but the form pushes more noticeably towards confidence, allure, and enjoying being seen. You may feel more aware of your voice, your smile, your body language, and the effect you have on a room. It does not force desire or behaviour, but leaning into feeling sexy, poised, and teasing may feel unusually natural.
"@
  }

  "moonlit_vampire_lady" = [ordered]@{
    formEffects = @"
A cool midnight elegance curls through your thoughts, sharpening your poise and softening your smile into something more knowing. You are still yourself, but dramatic entrances, lingering glances, and velvet confidence feel much easier to slip into. The change gives you a playful awareness of your own allure, not as a command, but as a tempting little stage-light waiting for you to step into it.
"@
    innerEffects = @"
The mental pull is strong but still yours to play with. You remain yourself, but the vampire glamour pushes towards elegance, mystery, and a sharper awareness of your own appeal. You may feel more patient, more dramatic, and more willing to let a look linger. The form can make feeling sexy, dangerous, and beautifully composed feel tempting, but it never erases your choices.
"@
  }

  "cabaret_catwoman" = [ordered]@{
    formEffects = @"
A warm stage-lit confidence purrs through you, playful and sleek. You are still yourself, but your movements feel smoother, your smile more knowing, and your sense of timing much more theatrical. There is a teasing glamour to the form, nudging you to enjoy attention, move with feline poise, and feel just a little more daring without making you do anything you do not choose.
"@
    innerEffects = @"
The mental pull is strong, playful, and glamour-heavy. You remain yourself, but the form pushes towards flirtier confidence, feline mischief, and a stronger enjoyment of being watched. You may feel more daring, more graceful, and more aware of how to use a smile, a pause, or a pose. It invites you to feel sexy and theatrical, without forcing you to act on it.
"@
  }

  "rose_court_enchantress" = [ordered]@{
    formEffects = @"
A lush, thorn-edged confidence blooms through you, beautiful and a little dangerous. You are still yourself, but your posture feels regal, your gestures more graceful, and your words seem to carry the quiet weight of someone used to being noticed. The enchantment nudges you to feel alluring, composed, and powerful, like every soft smile might hide roses, thorns, or both.
"@
    innerEffects = @"
The mental pull is strong, elegant, and seductive in tone, but never controlling. You remain yourself, while the enchantress glamour pushes towards confidence, charm, and the pleasure of being beautiful on your own terms. You may feel more composed, more tempting, and more willing to let softness and danger sit together. The form invites allure, not obedience.
"@
  }

  "neon_demon_hostess" = [ordered]@{
    formEffects = @"
A neon-bright confidence flickers through you, warm, wicked, and far too amused. You are still yourself, but your smile feels sharper, your posture bolder, and every conversation starts to feel like an invitation with terms and conditions. The demon-hostess glamour gives you a teasing sense of control and allure, nudging you to enjoy being noticed while still leaving every choice in your hands.
"@
    innerEffects = @"
The mental pull is strong, teasing, and openly glamourous. You remain yourself, but the form pushes towards bold confidence, playful temptation, and enjoying the feeling of being the most dangerous person in the room. You may feel more amused, more daring, and more aware of your own appeal. It does not make you cruel or controlled, but it can make mischief and sexy confidence feel deliciously easy to play.
"@
  }
}

$raw = Get-Content -Path $TransformationsPath -Raw
$transformations = $raw | ConvertFrom-Json

foreach ($transformation in $transformations) {
  if (-not $noteMap.ContainsKey($transformation.id)) {
    Write-Warning "No transformationNotes found for: $($transformation.id)"
    continue
  }

  if ($transformation.PSObject.Properties.Name -contains "transformationNote") {
    $transformation.PSObject.Properties.Remove("transformationNote")
  }

  if ($transformation.PSObject.Properties.Name -contains "transformationNotes") {
    $transformation.transformationNotes = $noteMap[$transformation.id]
  } else {
    $transformation | Add-Member -MemberType NoteProperty -Name "transformationNotes" -Value $noteMap[$transformation.id]
  }
}

$transformations |
  ConvertTo-Json -Depth 20 |
  Set-Content -Path $TransformationsPath -Encoding UTF8

Write-Host "Transformation Notes converted to transformationNotes.formEffects and transformationNotes.innerEffects."
