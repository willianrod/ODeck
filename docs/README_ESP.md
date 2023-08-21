![image](https://user-images.githubusercontent.com/6539258/154814361-066e5010-40a8-4820-a706-ed9803a319a1.png)

<div align="center">
⚠️ ESTE SOFTWARE TODAVÍA ESTÁ EN ALPHA Y PUEDE CONTENER BUGS ⚠️
</div>
  
# Para usuarios

ODeck es una alternativa gratuita y de código abierto a StreamDeck hecha con React, React Native, Electron, Socket.IO y algunas otras tecnologías. Le permite controlar fácilmente algunas funciones de su computadora con el poder de un toque en su teléfono inteligente.

Suele ser una alternativa más económica a StreamDeck porque puedes usar tu smartphone actual o limpiar el polvo de un dispositivo antiguo del fondo de tu cajón y darle otro propósito de vida a este dispositivo.

## SO compatibles

Actualmente, ODeck aún no es compatible con todas las plataformas, pero debería serlo en un futuro próximo. Consulte la lista de los sistemas operativos compatibles actualmente.

### Deck

- Android

### Panel de administración

- Windows

## Características actuales

- Abrir una URL
- Emite una combinación de teclas para invocar teclas de acceso rápido
- Ejecutar un archivo EXE
- Teclas de medios para interactuar con los medios que se reproducen en su sistema
- Crear varias páginas
- Reproducir cualquier sonido al presionar un botón
- Navegar entre páginas
- Empareje la aplicación con el código QR

## Próximas características

- Integración con OBS
- Input de carga de imagen
- Evitar el diseño roto con una cantidad de teclas personalizadas
- Integración con Twitch
- Agregar compatibilidad con Linux y MacOS para el panel de administración
- Agregar compatibilidad con iOS para la aplicación ODeck

### Vista previa del deck

https://user-images.githubusercontent.com/6539258/154787245-872187a9-b05e-44c4-b162-42037ace352a.mp4

### Vista previa del panel de administración

https://user-images.githubusercontent.com/6539258/154787603-3cf7bcd0-f82c-4092-96b9-28546fe16568.mp4

## Documentación

### Deck

#### Navigación

Esta acción le permite navegar entre las páginas del deck

#### Regresar

Esta acción le permite ir a la página anterior mostrada

### Sistema

#### Ejecutar un EXE

Esta acción, cuando se presiona, abre un archivo EXE específico. Para usarlo, debe colocar la ruta completa del archivo .exe deseado directamente en la entrada "Path". (Próximamente habrá un botón donde navegará para encontrar el archivo deseado)

![image](https://user-images.githubusercontent.com/6539258/154814786-f08d6a64-04b2-4bfc-833f-6d68076fdf55.png)

#### Hotkey

Con esta acción, podrá invocar cualquier tecla de acceso rápido en su máquina. Simula la pulsación de múltiples teclas en su máquina, como un teclado normal pero con solo un toque de su dedo.

Por ahora, debe consultar esta documentación para ver todas las claves disponibles que puede usar (http://robotjs.io/docs/syntax#keyboard). Las teclas más comunes se enumeran a continuación.

- shift
- control
- alt
- tab
- right_shift
- space
- Los números y las letras se representan con sus propios valores. (a-z,0-9)

Por ejemplo, si desea simular la pulsación de esta combinación de teclas (CTRL + ALT + SHIFT + 1), deberá reemplazar la tecla con su valor que se muestra en la documentación y separarlos con una coma.

`control,shift,alt,1`

![image](https://user-images.githubusercontent.com/6539258/154814990-24aa87ed-6bb4-4cd1-8836-c7ade215749b.png)

Obs: En un futuro cercano habrá una entrada para registrar todas las teclas que presionó su tecla y usar estas teclas grabadas como valor.

### Media

Esta sección se explica por sí misma. Cuando se presiona, invocará la acción del botón.

# Para contribuyentes

## Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/willianrod/ODeck.git ODeck
cd ODeck
yarn install
```

## Comenzando el desarrollo

Inicie la aplicación en el ambiente `dev`:

```bash
yarn start
```

## Crear un paquete para producción

Para crear un paquete para una plataforma local:

```bash
yarn package
```

## Maintainers

- [Willian Rodrigues](https://github.com/WillianRod)

## Licencia

Créditos a [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) por hacer una plantilla increíble para crear una aplicación React basada en Electron.

MIT © [ODeck](https://github.com/WillianRod/ODeck)
