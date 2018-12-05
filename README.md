# PecintaKucing

### Installation and Getting Started
### Using Mongodb 
```sh
$ npm i -g nodemon
### server side
$ cd server
$ npm i
$ nppm test (make data dummy)
$ npm start (server side)

### client side
$ cd client
$ npm i
$ npm run dev (client side)

###Try to login with 
###name: 'Mukmin',
###email : 'mukmin@gmail.com', 
###password : '123456', 
###role : 'admin', 

### List of API  
##### http://localhost:3000/


| Route | HTTP | Description   |
| ----- | ---- | ------------- |
| /user | GET  | Get data user |

#### result should give data users  


| Route          | HTTP | Description        |
| -------------- | ---- | ------------------ |
| /user/register | POST | register data user |

#####  Input User 
###### name: e.g. citra (put in req.body)
###### email: e.g. email@citra.com (put in req.body)
###### password: e.g. 123456 (put in req.body)
###### role: e.g. admin (put in req.body)

| Route       | HTTP | Description     |
| ----------- | ---- | --------------- |
| /user/login | POST | login data user |

#####  Input login 
###### email: e.g. email@citra.com (put in req.body)
###### password: e.g. 123456 (put in req.body)
#### result should give data users and token  


| Route  | HTTP | Description    |
| ------ | ---- | -------------- |
| /user/ | PUT  | edit data user |

#####  Input User 
###### name: e.g. citra (put in req.body)
###### email: e.g. email@citra.com (put in req.body)
###### password: e.g. 123456 (put in req.body)
###### token: e.g. 123456789 (put in req.header)

| Route  | HTTP   | Description      |
| ------ | ------ | ---------------- |
| /user/ | DELETE | delete data user |



| Route    | HTTP | Description       |
| -------- | ---- | ----------------- |
| /article | GET  | Get data articles |

#####  Input article 
###### title: e.g. Ciri-ciri Kucing Stres (put in req.body)
###### description: e.g. kucing tidur (put in req.body)
###### imagefile: e.g. fileimage (put in req.body)
###### imagefile should be save at ..client/public/assets

| Route    | HTTP | Description       |
| -------- | ---- | ----------------- |
| /article | PUT  | edit data article |

| Route    | HTTP   | Description         |
| -------- | ------ | ------------------- |
| /article | DELETE | delete data article |
###### articleid : e.g. 123456789 (put in req.body)


| Route           | HTTP | Description      |
| --------------- | ---- | ---------------- |
| /article/search | Get  | get data article |

#####  Input search article by title
###### search me: e.g. Ciri-ciri Kucing Stres (put in req.body)
