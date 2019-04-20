## Tips

El comando `react-native android` es para generar la apk a nuestro dispositivo android y el comando `react-native start` es para empezar a trabajar.

El comando `adb shell input keyevent 82` es para iniciar la configuración del dispositivo, y el comando `adb reverse tcp:8081 tcp:8081` es para asegurar la conexión que se hace al iniciar el proyecto y mi celular.

En react-native solo existe Flexbox para los estilos, además la propiedad `display: flex;` está por defecto en cada `key` del stylesheet y por defecto cada `key` tiene la propiedad de `flex-direction: column`.

La propiedad `background` no existe.

## Configurar Debugger

En caso de que al debuggear les abra una pestaña con la url: http://localhost:8081/debugger-ui con el error de que no es posible conectarse hay que hacer lo siguiente:

- Activar el menú de herramientas en el emulador CMD+M o CTRL+M o con dispositivos fisicos `adb shell input keyevent 82`.
- Ir a Dev Settings
- Ir a Debugging en Debug Server Host & Port for Device
- Escribir localhost:8081

Ahora donde van a debuggear será en localhost:8081/debugger-ui

![Example](https://i.imgur.com/athdSF8.gif)