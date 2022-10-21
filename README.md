![image](https://user-images.githubusercontent.com/6539258/154814361-066e5010-40a8-4820-a706-ed9803a319a1.png)

<div align="center">
⚠️ THIS SOFTWARE IS STILL IN ALPHA AND MAY CONTAIN BUGS ⚠️
</div>
  
# For Users

ODeck is a free and open source alternative to StreamDeck made with React, React Native, Electron, Socket.IO and some other tecnologies. It allows you to easily control some features of your computer with the power of a tap on your smartphone.

It tends to be a cheaper alternative to StreamDeck because you can use your current smartphone or clean the dust from an older device from the bottom of your drawer and give another pourpose of life to this device.

## Suported OS

Currently ODeck is not yet supported on all platforms, but it should be in the near future. See the listing of the current OS suported.

### Deck

- Android

### Admin Dashboard

- Windows

## Current Features

- Open an URL
- Emit a combination of keys to invoke hotkeys
- Run an EXE file
- Media keys to interact with media playing on your system
- Create multiple pages
- Play any sound when pressing a button
- Navigate between pages
- Pair app with QR Code

## Upcoming features

- OBS integration
- Image upload input
- Prevent broken layout with custom key amount
- Twitch integration
- Add Linux and mac support for Admin Dashboard
- Add iOS support for the ODeck App

### Deck preview

https://user-images.githubusercontent.com/6539258/154787245-872187a9-b05e-44c4-b162-42037ace352a.mp4

### Admin dashboard preview

https://user-images.githubusercontent.com/6539258/154787603-3cf7bcd0-f82c-4092-96b9-28546fe16568.mp4

## Docs

### Deck

#### Navigate

This action allows you to navigate between the deck pages

#### Go Back

This action allows you to go to the previows page shown

### System

#### Run executable

This action when pressed, opens an especified EXE file. To use it, you must put the complete path of the desired .exe file direct into the "Path" input. (In the near future there will be a button where you will navigate to find your desired file)

![image](https://user-images.githubusercontent.com/6539258/154814786-f08d6a64-04b2-4bfc-833f-6d68076fdf55.png)

#### Hotkey

With this action you will be able to invoke any hotkeys in your machine. It simulate the press of multiple keys in your machine, just like a normal keyboard but with just on touch of your finger.

By now you need to check this documentation here to see all available keys you can use (http://robotjs.io/docs/syntax#keyboard). The most common keys is listed bellow.

- shift
- control
- alt
- tab
- right_shift
- space
- Numbers and letters are represented by their own values. (a-z,0-9)

For example, if you want to simulate the press of this combination of keys (CTRL + ALT + SHIFT + 1) you will need to replace the key with their value shown on the documentation and separete them with a comma.

`control,shift,alt,1`

![image](https://user-images.githubusercontent.com/6539258/154814990-24aa87ed-6bb4-4cd1-8836-c7ade215749b.png)

Obs: In the near future will be an input to record all keys your key pressed and use this recored keys as value.

### Media

This sections is self explanatory. When pressed, it will invoke the button action.

# For Contributors

## Install

Clone the repo and install dependencies:

```bash
git clone https://github.com/willianrod/ODeck.git ODeck
cd ODeck
yarn install
```

## Starting Development

Start the app in the `dev` environment:

```bash
yarn start
```

## Packaging for Production

To package apps for the local platform:

```bash
yarn package
```

## Maintainers

- [Willian Rodrigues](https://github.com/WillianRod)

## License

Credits to [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) for making an awesome template for creating electron based React application.

MIT © [ODeck](https://github.com/WillianRod/ODeck)
