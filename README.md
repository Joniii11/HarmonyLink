
<a name="readme-top"></a>


<br/>

<div align="center">
  <a href="https://github.com/Joniii11/HarmonyLink">
    <img src="images/HarmonyLink.jpg" alt="Logo" width="180" height="180" style="border-radius: 50%;">
  </a>

<h3 align="center">HarmonyLink</h3>
  <p align="center">
    Seamlessly connect to Lavalink, NodeLink, and FrequenC nodes for high-quality audio streaming in your Discord bots. Supports Discord.js, Eris, Oceanic.js, and a powerful plugin system.
    <br />
    <a href="https://joniii.dev/docs/harmonylink"><strong>Explore the docs »</strong></a>
    <br />
  <br />
    <a href="#demo">View Demo</a>
    ·
    <a href="https://github.com/Joniii11/HarmonyLink/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/Joniii11/HarmonyLink/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>

<p align="center">
  <a href="https://www.npmjs.com/package/harmonylink"><img src="https://img.shields.io/npm/v/harmonylink.svg" alt="npm version"></a>
  <a href="https://github.com/Joniii11/HarmonyLink/blob/master/LICENSE"><img src="https://img.shields.io/github/license/Joniii11/HarmonyLink.svg" alt="MIT License"></a>
  <a href="https://joniii.dev/docs/harmonylink"><img src="https://img.shields.io/badge/docs-online-blue.svg" alt="Docs"></a>
</p>

   <h4>Built With</h4>

  [![TypeScript][ts]][ts-url]

  [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br>
  <a href="https://nodei.co/npm/harmonylink/">
    <img src="https://nodei.co/npm/harmonylink.png?downloads=true&downloadRank=true&stars=true" alt="HarmonyLink NPM Package"/>
    </a> 
</div>

> [!NOTE]
> **HarmonyLink v2.0+** introduces advanced type safety with Result types, generic filter builders and a better plugin system cause the old one was not good enough ig. See [Migration Guide](#migration-guide) for upgrading from older versions.

> [!WARNING]  
> Support for Lavalink Version 3 is planned, but not confirmed to be done.

<details>
  <summary>Table of Contents</summary>

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Quick Start](#quick-start-discordjs-v14)
- [Documentation](#documentation)
- [Plugins](#plugins)
- [Migration Guide](#migration-guide)
- [Contributing](#contributing)
- [License](#license)

</details>

## Features

- **Multi-library support:** Discord.js v14, Eris, Oceanic.js
- **Plugin system:** Extensible with lifecycle management
- **Type safety:** Full TypeScript support, neverthrow Result types
- **Advanced filters:** Type-safe audio filter builder
- **Robust node/player management**
- **Modern, well-documented API**

## Demo

| URL | Features | Additional Information |
|-----|----------|------------------------|
| [RhythmCore](https://rhythmcorehq.com/) | Advanced Music bot With AI | [Invite](https://discord.com/oauth2/authorize?client_id=971355817280430110&permissions=279176400136&scope=applications.commands+bot) |
| [Example Bot](https://github.com) | Verry basic example bot | coming soon |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Installation
```sh
npm install harmonylink
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

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
  // Create a player - using unwrapOr for cleaner code
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
_For more examples, please refer to the [Documentation](https://joniii.dev/docs/harmonylink)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Documentation
- [API Reference & Guides](https://joniii.dev/docs/harmonylink)
- [Class Docs](https://joniii.dev/docs/harmonylink/classes/)
- [Function Docs](https://joniii.dev/docs/harmonylink/functions/)
- [Plugin System](https://joniii.dev/docs/harmonylink/classes/AbstractPlugin)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Plugins
HarmonyLink supports plugins for custom features and integrations. See the [Plugin Guide](https://joniii.dev/docs/harmonylink/classes/AbstractPlugin) and [loadPlugins](https://joniii.dev/docs/harmonylink/functions/loadPlugins) for details.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Migration Guide

### From v1.x to v2.x

**Breaking Changes:**

1. **Result Types:** All async methods now return `Result<T, E>` instead of throwing errors
   ```ts
   // v1.x (old)
   try {
     const player = await music.createPlayer(options);
   } catch (error) {
     console.error(error);
   }
   
   // v2.x (new)
   const playerResult = await music.createPlayer(options);
   if (playerResult.isOk()) {
     const player = playerResult.value;
   } else {
     console.error(playerResult.error);
   }
   
   // Or use unwrapOr for cleaner code
   const player = (await music.createPlayer(options)).unwrapOr(null);
   ```

2. **Plugin System:** New lifecycle-based plugin architecture
   ```ts
   // v1.x (old)
   class MyPlugin extends Plugin {
     load() { /* ... */ }
   }
   
   // v2.x (new)
   class MyPlugin extends AbstractPlugin {
     async initialize(manager: HarmonyLink): Promise<Result<void, Error>> {
       // Plugin initialization logic
       return ok();
     }
   }
   ```

3. **Import Changes:** Package exports have been reorganized
   ```ts
   // v1.x (old)
   import { HarmonyLink } from "harmonylink/dist/HarmonyLink";
   
   // v2.x (new)
   import { HarmonyLink } from "harmonylink";
   ```

**New Features in v2.x:**
- **Type-safe filters:** Enhanced audio filter system with better TypeScript support
- **Improved error handling:** Comprehensive Result types throughout the API
- **Better plugin lifecycle:** More robust plugin loading and management

For detailed migration assistance, see the [full documentation](https://joniii.dev/docs/harmonylink).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


[contributors-shield]: https://img.shields.io/github/contributors/Joniii11/HarmonyLink.svg?style=for-the-badge
[contributors-url]: https://github.com/Joniii11/HarmonyLink/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Joniii11/HarmonyLink.svg?style=for-the-badge
[forks-url]: https://github.com/Joniii11/HarmonyLink/network/members
[stars-shield]: https://img.shields.io/github/stars/Joniii11/HarmonyLink.svg?style=for-the-badge
[stars-url]: https://github.com/Joniii11/HarmonyLink/stargazers
[issues-shield]: https://img.shields.io/github/issues/Joniii11/HarmonyLink.svg?style=for-the-badge
[issues-url]: https://github.com/Joniii11/HarmonyLink/issues
[license-shield]: https://img.shields.io/github/license/Joniii11/HarmonyLink.svg?style=for-the-badge
[license-url]: https://github.com/Joniii11/HarmonyLink/blob/master/LICENSE.txt
[product-screenshot]: images/screenshot.png
[ts]: https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white
[ts-url]: https://www.typescriptlang.org/
