# About
Book Market is a simple app for selling second-hand books, that was created as a final project for the *Modern Markup Languages and Their Applications* course at FI MU.

# Features

- listing all available books for sale
- searching for books according to their author or name
- filtering books by genres, languages and prices
- adding new book listings
- editing and removing existing listings
- adding books to the cart and ordering them
- listing your previous orders
- generating a PDF invoice with the order summary

# Authors
- [Diana Janíčková](https://gitlab.fi.muni.cz/xjanick2)
- [Katarína Sieklová](https://gitlab.fi.muni.cz/xsieklov)
- [Jakub Uličný](https://gitlab.fi.muni.cz/xulicny)
- [Josef Žižka](https://gitlab.fi.muni.cz/xzizka1)

# Setup

## Backend
1) setup database:
- install Postgres  
    `sudo apt install postgresql`
- run Postgres  
    `sudo -u postgres psql`
- create database  
    `create database "book-market";`
- create an user with name *username* and password *Password*  
    `create user username with encrypted password 'Password';`
- add DB privileges to the user  
    `grant all privileges on database "book-market" to username;`
- exit Postgress and copy .env.example and adjust it according to your credentials  
    `cp .env.example .env`
- seed database  
    `npm run seed`
2) install packages:  
   `npm i`
3) start the API:  
`npm run dev`

## Frontend
1) install packages:  
`npm i`
2) start the client:  
`npm run dev`
