### Database Later

JSON storage is fine for the prototype.

If the bot grows, SQLite would be the next sensible step.

Possible migration path:

```text
users.json → SQLite
transformations.json stays as content data
cooldowns stay in memory unless needed
```