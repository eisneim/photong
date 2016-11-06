PHOTONG (working in progress)
==============
self hosted photo manager writen in nodejs, koa2, react, redux


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
create a config file at project roo directory: `_config.js`
```
// ------ _config.js --------
module.exports = {
  token: 'userLoginToken',
  username: 'username',
  port: 4000, // server port
  devPort: 4003,
  client: {
    siteTitle: 'ΞISNΞIM Photography',
    aboutHTML: '
      <p>some html content</p> \
    ',
    aboutLinks: [
      { text: 'Instagram', link: 'http://instagram.com/eisneim' },
      { text: 'Vimeo', link: 'https://vimeo.com/eisneim' },
      { text: 'github', link: 'https://github.com/eisneim' },
    ],
    mySiteLink: { text: 'my site', link: 'http://glexe.com' },
  }
}
```

install all dependency
```
$ npm install
```
boundle the client app
```
$ npm run build
```
start dev server,
```
$ npm start
```
it's a better idea to run an nginx server in front of you node server, and you should also use a runner for your node eg. [pm2](https://www.npmjs.com/package/pm2) or [forever](https://www.npmjs.com/package/forever)
