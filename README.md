
# Culqi challenge

Reto técnico para Culqi, generación de tokens y recuperación de información.

## API Reference

#### Generar token

```http
  POST /DESA/V2/card
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**. Token generado |

#### Obtener información

```http
  POST /DESA/V2/tokens
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Correo |
| `cardNumber`      | `string` | **Required**. Número de tarjeta |
| `cvv`      | `string` | **Required**. CVV |
| `expirationYear`      | `string` | **Required**. Año de expiración |
| `expirationMonth`      | `string` | **Required**. Mes de expiración |


## Scripts

Para instalar las dependencias del proyecto

```bash
  npm install
```

Para ejecutar el proyecto localmente
```bash
  npm run dev
```

Creación de índice para TTL en MongoDB
```bash
db.tokens.createIndex({ createdAt: 1 }, { expireAfterSeconds: 900 });
```
## Environment Variables

Para ejecutar el proyecto, necesitará las siguientes variables de entorno en un archivo .env en la raíz del proyecto

`MONGO_USER`

`MONGO_PASSWORD`

`MONGO_CLUSTER`

`MONGO_DATABASE`

## Tech Stack

**Server:** Node, TS, Serverless, AWS, Mongo

