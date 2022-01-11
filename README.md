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


### Rotas Públicas:

#### `POST /auth/register` -- SIGNUP

Registra um novo usuário.

#### `POST /auth/login` -- LOGIN

Faz o login do usuário.

#### `GET /posts` -- GET POSTS

Lista todos os posts.

#### `GET /posts/search` -- SEARCH POSTS

Rota de busca de posts.

#### `GET /posts/:id` -- GET POST

Retorna um único post.

#### `GET /comments/:postId` -- GET COMMENTS

Retorna os comentários de um post.


### Rotas Privadas:

#### `GET /account` -- GET USER

Retorna um usuário.

#### `PUT /account/edit` -- EDIT USER

Edita um usuário.

#### `DELETE /account/delete` -- DELETE USER

Deleta a conta do usuário, mas mantêm posts e comentários.

#### `DELETE /account/delete-everything` -- DELETE EVERYTHING

Deleta a conta do usuário e apaga posts e comentários.

#### `GET /admin/users` -- ADMIN GET USERS

Rota para listar todos os usuários.

#### `PUT /block/:userID` -- BLOCK USER

Rota para bloquear um usuário.

#### `DELETE /ban/:userId` -- BAN USER

Rota para banir um usuário

#### `DELETE /post/:postId` -- ADMIN DELETE POST

Rota para o Admin deletar um post.

#### `DELETE /comment/:commentId` -- ADMIN DELETE COMMENT

Rota para o Admin deletar um comentário

#### `POST /posts` -- CREATE POST

Rota de Criação de Posts.

#### `PUT /posts/:postId` -- EDIT POSTS

Rota de Edição de Posts.

#### `DELETE /posts/:postId` -- DELETE POSTS

Rota de Deleção de Posts.

#### `POST /comments/:postId` -- CREATE COMMENT

Rota de Criação de Comentários.

#### `PUT /comments/:commentId` -- EDIT COMMENT

Rota de Edição de Comentários.

#### `DELETE /comments/:commentId` -- DELETE COMMENT

Rota de Deleção de Comentários.

## Autores

* Thiago Morais Marques: [LinkedIn](https://www.linkedin.com/in/thiagomoraismarques). 

* João Pedro: [LinkedIn](https://www.linkedin.com/in/joaopedro-teo/)
