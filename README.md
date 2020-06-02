<a href="http://fvcproductions.com"><img src="https://www.buythelogo.com/wp-content/uploads/2019/03/Letter-E-geometric-line-abstract-shape-logo-vector.jpg" title="FVCproductions" alt="FVCproductions" height=200 ></a>

# Evolve

> DB Project - Music Platform


[![Build Status](http://img.shields.io/travis/badges/badgerbadgerbadger.svg?style=flat-square)](https://travis-ci.org/badges/badgerbadgerbadger) 




**Demo**



All requirements of `CC3057 - Proyecto2.pdf` done

## Table of Contents
- [Evolve](#evolve)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Clone](#clone)
    - [Setup](#setup)
  - [Features](#features)
  - [Team](#team)
  - [License](#license)



---

## Installation
- PostgreSQL DB is already running online in CloudClusters this month. If you want to keep your db on localhost, just run the `evolve.sql` in your local instance, and set connection params on `api/database.js`

```javascript
// Connection params
const pool = new Pool({
  user: YOUR_USER,
  host: YOUR_HOST,
  database: YOUT_DATABASE,
  password: YOUR_PASSWORD,
  port: YOUR_PORT,
});
```

### Clone

- Clone this repo to your local machine using `https://github.com/gusmendez99/evolve`

### Setup

> Run NodeJS server (install dependencies if it's the first time run this) 

```shell
$ cd api
$ yarn install
$ yarn start
```

> Run React app

```shell
$ cd client
$ yarn install
$ yarn start
```

- Server will run on port `3000`, while React app will run on another available port (`3001`).

---

## Features

- React
- Redux
- Tacyons CSS
- PostgreSQL and Mongo
- Express
- Node
- etc.


## Team


| Gustavo Mendez | Luis Urbina | Roberto Figueroa |
| :---: |:---:| :---:|
| [![Gustavo](https://avatars0.githubusercontent.com/u/19374517?s=200&u=c1481289dc10f8babb1bdd0853e0bcf82a213d26&v=4)](http://fvcproductions.com)    | [![Urbina](https://avatars3.githubusercontent.com/u/35355445?s=200&u=851bb2374c95ac3baaaca3de5f51212441ebff57&v=4)](http://fvcproductions.com) | [![Roberto](https://avatars1.githubusercontent.com/u/35494933?s=200&u=5e617360d13f87fa6d62022e81bab94ebf50c4e3&v=4)](http://fvcproductions.com)  |
| <a href="http://github.com/gusmendez99" target="_blank">`github.com/gusmendez99`</a> | <a href="http://github.com/virtualmonkey" target="_blank">`github.com/virtualmonkey`</a> | <a href="http://github.com/RobertoFigueroa" target="_blank">`github.com/RobertoFigueroa`</a> |

---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2020 © <a href="http://gusmendez99.github.io" target="_blank">Gus Mendez</a>.
