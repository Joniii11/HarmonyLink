# HarmonyLink

<div align="center">
  <a href="https://github.com/Joniii11/HarmonyLink">
    <img src="images/HarmonyLink.jpg" alt="Logo" width="180" height="180" style="border-radius: 50%;">
  </a>

  <h3>HarmonyLink</h3>
  <p>Seamlessly connect to Lavalink, NodeLink, and FrequenC nodes for high-quality audio streaming in your Discord bots. Supports Discord.js, Eris, Oceanic.js, and a powerful plugin system.</p>
  <a href="https://joniii.dev/docs/harmonylink"><strong>Explore the docs »</strong></a>
  <br />
  <a href="https://nodei.co/npm/harmonylink/">
    <img src="https://nodei.co/npm/harmonylink.png?downloads=true&downloadRank=true&stars=true" alt="HarmonyLink NPM Package"/>
  </a>
</div>

<p align="center">
  <a href="https://www.npmjs.com/package/harmonylink"><img src="https://img.shields.io/npm/v/harmonylink.svg" alt="npm version"></a>
  <a href="https://github.com/Joniii11/HarmonyLink/blob/master/LICENSE"><img src="https://img.shields.io/github/license/Joniii11/HarmonyLink.svg" alt="MIT License"></a>
  <a href="https://joniii.dev/docs/harmonylink"><img src="https://img.shields.io/badge/docs-online-blue.svg" alt="Docs"></a>
</p>

---

## Features
- **Multi-library support:** Discord.js v14, Eris, Oceanic.js
- **Plugin system:** Extensible with lifecycle management
- **Type safety:** Full TypeScript support, neverthrow Result types
- **Advanced filters:** Type-safe audio filter builder
- **Robust node/player management**
- **Modern, well-documented API**

---

## Installation
```sh
npm install harmonylink
```

---

## Quick Start (Discord.js v14)
```ts
import { DJSLibrary, HarmonyLink } from "harmonylink";
import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({ 
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] 
});

const music = new HarmonyLink({
  nodes: [{
    name: "Example Node",
    host: "localhost",
    port: 2333,
    password: "youshallnotpass",
    secure: false
  }],
  library: new DJSLibrary(client),
});

client.on("ready", async () => {
  // Create a player - using unwrapOr or you can also use isOk() to check if the player was created successfully
  const player = (await music.createPlayer({
    guildId: "YOUR_GUILD_ID",
    voiceId: "VOICE_CHANNEL_ID",
    textId: "TEXT_CHANNEL_ID"
  })).unwrapOr(null);

  if (player) {
    // Search and play a track
    const response = (await music.resolve({ 
      query: "Rick Astley - Never Gonna Give You Up", 
      requester: client.user 
    })).unwrapOr(null);
    
    if (response && response.tracks.length > 0) {
      player.queue.add(response.tracks[0]);
      await player.play();
      console.log("Now playing!");
    }
  }
});

client.login("YOUR_BOT_TOKEN");
```

**Result Types:**
HarmonyLink uses [neverthrow](https://github.com/supermacro/neverthrow) Result types instead of throwing errors. You can handle them in three ways:

```ts
// Option 1: Check with .isOk() (explicit)
if (result.isOk()) {
  console.log(result.value); // Safe access
} else {
  console.error(result.error); // Handle error
}

// Option 2: Use .unwrapOr() (cleaner)
const value = result.unwrapOr(null); // Returns null if error
if (value) {
  console.log(value); // Use the value
}

// Option 3: Use .match() (pattern matching)
result.match(
  (value) => console.log(value),
  (error) => console.error(error)
);

// So it would look something like this:
const tracks = await <Player>.resolve({ query: "Rick Astley - Never Gonna Give You Up", requester: client.user })

tracks.match(
    (tracks) => <Player>.queue.add(tracks[0]),
    (error) => console.error("Failed to resolve track:", error.message)
);

```

_For more examples and advanced usage, see the [official documentation](https://joniii.dev/docs/harmonylink)._ 

---

## Documentation
- [API Reference & Guides](https://joniii.dev/docs/harmonylink)
- [Class Docs](https://joniii.dev/docs/harmonylink/classes/)
- [Function Docs](https://joniii.dev/docs/harmonylink/functions/)
- [Plugin System](https://joniii.dev/docs/harmonylink/classes/AbstractPlugin)

---

## Plugins
HarmonyLink supports plugins for custom features and integrations. See the [Plugin Guide](https://joniii.dev/docs/harmonylink/classes/AbstractPlugin) and [loadPlugins](https://joniii.dev/docs/harmonylink/functions/loadPlugins) for details.

---

## Contributing
Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines. Bug reports and feature requests are appreciated.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Credits
- Inspired by Lavalink and the Discord music bot community
- Maintained by [Joniii11](https://github.com/Joniii11)

---

*Review and copy any sections you want to keep or update in your README.md. For more usage, see the docs!*
