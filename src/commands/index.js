const { handleRegister } = require("./register");
const { handleUnregister } = require("./unregister");
const { handleForm } = require("./form");
const { handleResetForm } = require("./resetform");
const { handleTransform } = require("./transform");
const { handleRandomTransform } = require("./randomtransform");
const { handleBBHelp } = require("./bbhelp");
const { handleWhatAmI } = require("./whatami");

const commandHandlers = {
  register: handleRegister,
  unregister: handleUnregister,
  form: handleForm,
  resetform: handleResetForm,
  transform: handleTransform,
  randomtransform: handleRandomTransform,
  bbhelp: handleBBHelp,
  whatami: handleWhatAmI,
};

module.exports = {
  commandHandlers,
};