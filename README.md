# MovieView
MovieWiew is an application which allows you to explore movies from TMDb API, and see users movies lists or create your own movies lists

### install and run
```
  $ git clone https://github.com/RomanLevak/movie-view.git
  $ cd movie-view
  $ npm install
  $ npm start
```
it will run both client webpack-dev-server at http://localhost:6060  
and node server at http://localhost:3000

##### server will try to connect mongodb at port 27017

##### default users:
* email: u1@gmail.com\
    password: 1234

* email: u2@gmail.com\
    password: 1234

##### start only client server
```
  $ npm run client
  webpack-dev-server will start at http://localhost:6060
```
#### start only node server
###### server will try to connect mongodb at port 27017
```
    $ npm run server
    node server will start at http://localhost:3000/
```
