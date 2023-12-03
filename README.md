# Monitora é um projeto para controle de estoque

Este é parte do back end, onde irei desenvolver toda logica de back-end usando as seguintes tecnologias:

- express
- dotenv
- sequelize
- pg
- pg-hstore
- bcryptjs
- date-fns
- yup

Como Dev dependência para ajudar no desenvolvimento irei usar as seguintes tecnologias:

- nodemon
- sucrase
- eslint
- prettierrc
- sequelize-cli
- sucrase

# Para criar as tabelas vou usar o ORM com sequelize

## Criar uma migration

- yarn sequelize migration:create --name=create-localSites

## Executar a migrate

- yarn sequelize db:migrate

## Remover uma tabelas

- yarn sequelize db:migrate:undo

## Remover todas as tabelas

- yarn sequelize db:migrate:undo:all
