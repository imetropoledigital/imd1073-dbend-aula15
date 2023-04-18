## Apresentação

Projeto trabalhado durante a disciplina de desenvolvimento backend do curso técnico do instituto Metrópole Digital UFRN.

## Iniciando

Para iniciar o projeto em modo de desenvolvimento execute os seguintes comandos:

```shell
$ npm install
$ npm run dev
```

> No modo de desenvolvimento é utilizado o banco SQLite. Você pode alterar essa configuração em /src/db/config/config.json

Em produção o comando deve ser:

```shell
$ npm install
$ npm start
```
> Em produção, o sistema utilizará a variável de ambiente DATABASE_URL para o acesso ao PostgreSQL.

## Migrações

Por padrão o sistema executa as migrações, ainda não executadas, na sua inicialização. Caso deseje executar manualmente faça:

```shell
$ npx sequelize-cli db:migrate 
```

## Sementes

Caso deseje, você pode executar a semente para criar o primeiro usuário do sistema. Para executá-la utilize:

```shell
$ npx sequelize-cli db:seed:all
```

Ao executar, o seguinte usuário/senha será criado: root@gmail.com/segredo

## Variáveis de ambiente

A tabela abaixo lista as variáveis de ambiente disponíveis. Algumas delas são obrigatórias para que a aplicação possa subir corretamente.

| Variável            | Descrição                       | Obrigatória? |
|---------------------|---------------------------------|--------------|
| ACCESS_TOKEN_SECRET | Secret do token JWT             | Sim          |
| NODE_ENV            | Ambiente do Node.js             | Não          |
| DATABASE_URL        | URl de acesso ao banco de dados | Apenas para produção |
