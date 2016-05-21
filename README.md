PHOTONG (working in progress)
==============
self hosted photo manager writen in nodejs, koa2, preact, redux

feature:
 - no database required currently

lib used:
 - *koa2* server
 - *redux* for server and client app store
 - *preact* fro client side rendering

## install
first you need to install [nodejs](https://nodejs.org/), and make sure ImageMagick is installed on your server.
```
//On Ubuntu
$ apt-get install imagemagick

//On Mac OS X
$ brew install imagemagick

//On CentOS
$ yum install imagemagick
```
install all dependency
```
$ npm install
```
boundle the client app
```
$ npm run build
```
start the server,
```
$ npm start
```
it's a better idea to run an nginx server in front of you node server, and you should also use a runner for your node eg. [pm2](https://www.npmjs.com/package/pm2) or [forever](https://www.npmjs.com/package/forever)
