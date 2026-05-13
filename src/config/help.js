const HELP_CONFIG = {
  title: "BiiBiiBoo TF Bot Help",
  description:
    "A silly opt-in transformation bot for light Discord fun. People must register before they can be transformed.",

  sections: [
    {
      name: "Consent Commands",
      commands: [
        {
          name: "/register",
          description: "Opt into silly transformation games.",
        },
        {
          name: "/unregister",
          description: "Opt out of silly transformation games.",
        },
      ],
    },
    {
      name: "Form Commands",
      commands: [
        {
          name: "/form",
          description: "Check your current silly transformation form.",
        },
        {
          name: "/resetform",
          description: "Clear your current form while staying registered.",
        },
        {
          name: "/settings",
          description: "Open your private settings panel.",
        },
      ],
    },
    {
      name: "Transformation Commands",
      commands: [
        {
          name: "/transform me",
          description: "Transform yourself into something silly.",
        },
        {
          name: "/transform user target:@user",
          description:
            "Transform another user, but only if they have registered.",
        },
        {
          name: "/randomtransform",
          description: "Randomly transform one registered user.",
        },
      ],
    },
  ],

  footer: "Keep it silly, light, and consensual.",
};

module.exports = {
  HELP_CONFIG,
};
