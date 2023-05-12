<img src="https://cdn.discordapp.com/avatars/997314418998255667/afadf2fc024dceb4b53b7acd89fd5dc0.webp" alt="Uni-API Logo" width="100" height="auto"/>
<h1> Uni-API </h1>
<b>Uni-API</b> é uma api criada para o servidor <a href=https://discord.gg/cqExFuZpXe> Union Lab </a>, com a finalidade de ajudar a comunidadea gerenciar seus bots.

## Exemplo de como usar: 
```js
const axios = require('axios')
const info = await axios.get('url/api/getBotInfo/?botID=997314418998255667')

console.log(info.data) // {"ownerID":"573812452165156864","votes":9,"language":"Javascript","prefix":"u.","description":"Botlist","verification":true}
```

Para mais informações sobre os endpoints entre em nosso <a href=https://discord.gg/cqExFuZpXe>servidor</a> do discord.
