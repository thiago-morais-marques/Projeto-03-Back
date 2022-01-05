![alt text](https://github.com/THGMMX/Projeto-03-Front/blob/main/public/Logo.png)

## Ideia do projeto

Projeto de conclusão de curso do bootcamp de desenvolvimento web full stack da Ironhack, onde o escopo foi a criação de um Blog de Tecnologia, Finanças e Sustentabilidade.

## Funcionalidades

Visamos implementar ações de criação, edição e deleção de posts e comentários, bem como autenticação e operações de CRUD em página protegida de perfil de usuário.

## Instalação

Dependências:

- Node >= 16
- MongoDB 4.x
 
```sh
$ npm install
```

## Dev
 
```sh
$ npm run dev
```

## Links do Projeto

* Apresentação em slides: [Link](https://docs.google.com/presentation/d/e/2PACX-1vTPr572gwdh_3VZrYhmjIZ3W_5mg3VDducTdynPFb-GOR5JzP7yKQ7NJHcR7dzouyIq7qdBVIbQdkKT/pub?start=false&loop=false&delayms=3000)

* Repositório front-end: [Link](https://github.com/THGMMX/Projeto-03-Front)

* App: [Link](https://iron-blogger.netlify.app/)

## API

### `POST /users` -- CREATE

Create a new user.

```json
POST /users
{
  "username": "jdoe",
  "password": "toto123"
}
```

response:

```
201 Created
{
  "_id": "kjnc9n213n2384nb1k24jh12g438",
  "username": "jdoe",
  "password": "1324bhj1{24b2j4.k12h%3b4jh1b234j$"
}
```

if already exists:

```
409 Conflict
{
  "message": "This user already exists"
}
```

or if not secure password:

```
422 Unprocessable Entity
{
  "message": "`password` must have at least 6 chars"
}
```


## Autores

* Thiago Morais Marques: [LinkedIn](https://www.linkedin.com/in/thiago-morais-marques). 

* João Pedro: [LinkedIn](https://www.linkedin.com/in/joaopedro-teo/)
