const chai = require('chai')
const chaiHttp = require('chai-http')
const fs = require('fs')
chai.use(chaiHttp)

const should = chai.should();
const server = require('../app')

console.log(__dirname)

describe('Make Data Dummy', function () {
var token_user = ''
    it('Register Mukmin/user/register', function (done) {
        chai.request(server)
        .post('/user/register')
        .send({
            name: 'Mukmin',
            email : 'mukmin@gmail.com', 
            password : '123456', 
            role : 'admin', 
        })
        .end(function(err, res) {
        done()
        })
    })
    it('Login Mukmin /user/login', function (done) {
        chai.request(server)
        .post('/user/login')
        .send({
            email : 'mukmin@gmail.com', 
            password : '123456', 
        })
        .end(function(err, res) {
            token_user=res.body.token
        done()
        })
    })
    it('Make article 1', function (done) {
        chai.request(server)
        .post('/article/')
        .set('token', token_user)
        .set('Content-Type','multipart/form-data')
        .attach('imagefile', __dirname+'/Gambar-Ciri-ciri-Kucing-Stres.jpg', 'Gambar-Ciri-ciri-Kucing-Stres.jpg')
        .field('title', 'Ciri-ciri Kucing Stres')
        .field('description', 
        `Hai pecinta kucing! Para pecinta kucing yang budiman, pernahkah kamu merasakan stres? Tentu pernah kan, apa iya hidup bahagia terus, pasti pernah merasa sedih, stres, bimbang dan tentunya bahagia.
            Kalau pecinta kucing pernah merasakan semua itu, kucing-kucing pun demikian, pernah merasakan rasa sebagaimana yang dirasakan manusia. Kali ini, kami akan membahas tentang ciri-ciri kucing stres.
            
            Saat mengalami stres, tentu si kucing mengalami gejala-gejala yang berbeda dari biasanya. Mungkin kamu bingung dengan keadaan kucingnya dan nggak tahu kenapa penyebab stresnya.
            
            Bila kucing mengalami stres, tentu sangat mempengaruhi kesehatan kucing, dan dapat memunculkan berbagai penyakit pada kucing disebabkan menurunnya kekebalan imun dan kesehatannya`
        )
        .end(function(err, res) {

        done()
        })
    })
    it('Make article 2', function (done) {
        chai.request(server)
        .post('/article/')
        .set('token', token_user)
        .set('Content-Type','multipart/form-data')
        .attach('imagefile', __dirname+'/Kenali-Ciri-ciri-Kucing-Mau-Melahirkan-Sebentar-Lagi-600x300.jpg', 'Kenali-Ciri-ciri-Kucing-Mau-Melahirkan-Sebentar-Lagi-600x300.jpg')
        .field('title', 'Ciri-ciri Kucing Mau Melahirkan')
        .field('description', 
        `Ciri-ciri kucing mau melahirkan gimana ya? Memelihara kucing sebenarnya sudah menjadi hobi banyak orang, mulai dari anak-anak sampai orang dewasa pun senang memelihara kucing bahkan mengkoleksinya. Tetapi, ketika kucing yang dipelihara berjenis kelamin betina, tentunya akan membutuhkan lebih banyak perhatian karena kucing betina memiliki masa kehamilan.

        Selain memberi perhatian lebih, ada baiknya anda juga harus memperhatikan kondisi kehamilan kucing dengan cara menggali informasi tentang cara membantu kucing melahirkan.
        
        Pada dasarnya kucing bisa melahirkan sendiri secara alamiah tanpa bantuan manusia, karena induk kucing yang akan melahirkan justru terganggu dengan kehadiran manusia.
        
        Tetapi kadang-kadang tetap saja terjadi gangguan atau kesulitan yang dirasakan oleh calon induk kucing tersebut. Gangguan yang terjadi ketika kucing melahirkan bisa mengakibatkan anak kucing yang dilahirkan menjadi cacat, bahkan mati.
        
        Itulah sebabnya anda harus paham bagaimana cara menangani kucing yang akan melahirkan.`
        )
        .end(function(err, res) {

        done()
        })
    })
   
})

