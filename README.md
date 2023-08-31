<div align="center">
  <img src="https://github.com/willianrod/ODeck/assets/6539258/058efe7e-6f92-4ae9-a1a6-a743722f0ea6" width="167px">
  <br/>
  <p>Elevate Your Streaming Experience with ODeck: The Open Source Alternative to StreamDeck</p>
  <p>Read this README in other languages: <a href="https://github.com/willianrod/ODeck/blob/main/README.md">English</a>, <a href="https://github.com/willianrod/ODeck/blob/main/docs/README-pt.md">Português</a>, <a href="https://github.com/willianrod/ODeck/blob/main/docs/README_ESP.md">Español</a></p>
</div>

---

## About

ODeck is a versatile and powerful tool designed to enhance your live streams and boost productivity. Beyond catering to streamers of all levels, ODeck extends its functionality beyond streaming, allowing it to be adapted for various productivity tasks. Inspired by the idea of open-source, the "O" in ODeck underscores its commitment to transparency and customization. Give new purpose to your old, neglected smartphone by transforming it into a valuable tool.

## Technology Stack

- Electron
- React
- React Native
- Socket.io

## Platforms

ODeck is available on the following platforms:

### Supported Platforms:

- Windows
- Mac

### Mobile App:

- [Android](https://play.google.com/store/apps/details?id=com.willianrod.odeck)
- [iOS](https://apps.apple.com/br/app/odeck/id6463042332)

## Unlimited Customization

ODeck offers a high degree of customization to meet your unique needs. Create custom devices with different key layouts, enabling precise control over your actions. Customize each key individually in the following ways:

- Change the background color
- Adjust the label text color
- Add background images to labels
- Hide labels to display only background images

## How to Use

1. Download ODeck on your computer from the [releases page](https://github.com/willianrod/ODeck/releases), where all updates will be made available.
2. Install ODeck on your mobile device.
3. On your computer, create a new device, give it a name, and set the amount of keys vertically and horizontally.
4. Once created, click 'Select' to access the device customization screen and, in the upper left corner, click 'Pair Deck'.
5. A pop-up will appear; if necessary, select your computer's IP address.
6. Open the app on your mobile device and scan the QR code displayed on your computer.
7. Now you can customize your deck to suit your needs.

## Features

ODeck has undergone extensive refinement, making it easy to add new features with minimal effort. Below is a list of the currently supported features:

<details>
<summary><strong>Deck</strong></summary>

- **Navigate:** Allows you to select and navigate between the app's pages.
![Navigate](https://github.com/willianrod/ODeck/assets/6539258/4845e312-ce23-4415-ab96-4d61cf7ad771)

- **Back:** Allows you to return to previously accessed pages.
![Back](https://github.com/willianrod/ODeck/assets/6539258/54a6e405-f88e-4f9b-93c0-7f4aa87981e6)
</details>

<details>
<summary><strong>System</strong></summary>

- **Run Application:** Execute executable files on your computer.
![Run Application](https://github.com/willianrod/ODeck/assets/6539258/ea0d6ec5-b93a-4998-a8a4-ff066ede016c)

- **Shortcut:** Record key combinations as shortcuts.
![Shortcut](https://github.com/willianrod/ODeck/assets/6539258/6ba7d8cb-830b-446c-a82f-a75c390d401a)

- **Play Sound:** Play .mp3 or .wav music files.
![Play Sound](https://github.com/willianrod/ODeck/assets/6539258/a09bbf76-f6e6-4413-9ad5-961c2e96eaab)

- **URL:** Open URLs with a single click.
![URL](https://github.com/willianrod/ODeck/assets/6539258/ff70d8e4-acc0-43a5-a924-5c1578610963)
</details>

<details>
<summary><strong>Media</strong></summary>

Control media playback on your computer with the following options:

- Play
- Pause
- Stop
- Previous
- Next
- Decrease Volume
- Increase Volume
- Mute

![Media](https://github.com/willianrod/ODeck/assets/6539258/b4614ccb-62ef-4ee8-b17c-b389742cbb12)
</details>

# Contributing

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/willianrod/ODeck.git ODeck
cd ODeck
yarn install
```

## Starting Development

Launch the application in the development environment:

```bash
yarn start
```

## Packaging for Production

Package the application for your local platform:

```bash
yarn package
```

## Maintainers

- [Willian Rodrigues](https://github.com/WillianRod)

## License

Special thanks to [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) for providing an excellent template for creating Electron-based React applications.

MIT © [ODeck](https://github.com/WillianRod/ODeck)
