Wrap command execution in a shared try/catch handler.

This would prevent a command error from causing silent failures or Discord’s “application did not respond” message.

Possible behaviour:

```text
Log the real error in the terminal.
Send a polite private error message to the user.
```