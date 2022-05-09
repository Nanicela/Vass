# Vass
### Configuración
Vass utiliza Nuxt, Node.js, NPM, axios, Bootstrap vue, json-server.


## Instalar dependencias
```
npm i
```

### Correr en local con Hot Reload (carga instantánea de cambios).

### Para frontend.
```
npm run dev
```


### Para Backend.
```
npm run json-server
```

### Para Backend de pruebas.
```
npm run json-server-test
```

### Para correr las pruebas unitarias.
```
npm run test
```


Es necesario correr primero el backend de pruebas para que al momento del test, este funcione de forma correcta:
```
npm run json-server-tests // Correr servidor de pruebas
```

```
npm run test
```
