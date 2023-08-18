# test-admin

## Installation

Install JSON Server 

```
npm install -g json-server
```

You'll find a `db.json` file in the `src` directory that includes the users you can use.

Start JSON Server

```bash
json-server --watch db.json
```

Now if you go to [http://localhost:3000/books/1](http://localhost:3000/books/1), you'll get

```json
{ "id": 1, "title": "Book 1", "author": 1 }
```


Install the application dependencies by running:

```sh
npm install
```

## Development

Start the application in development mode by running:

```sh
npm run dev
```

## Production

Build the application in production mode by running:

```sh
npm run build
```

## Authentication

You can sign in to the application with the following usernames and password:
- testn5@mail.com / email
- testn5 / password

## Product list

You'll find a `db.json` file in the `src` directory that includes the products you can use.

## Author
[perezjair94](https://oquendo.vercel.app)

## My portfolio
[Jair Pérez](https://oquendo.verel.app)