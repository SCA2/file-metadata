const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const readFileSync = require("fs").readFileSync;
const expect = chai.expect;

chai.use(chaiHttp);

describe('file metadata service', () => {
  describe('/foo', () => {
    it('should redirect to /', (done) => {
      chai.request(server)
      .get('/foo').redirects(0)
      .end((err, res) => {
        expect(res).to.redirectTo('/');
        done();
      });
    });
  });

  describe('/', () => {
    it('should respond with status 200', (done) => {
      chai.request(server)
      .get('/api/imagesearch/kittens')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      })
    })

    it('should generate a simple form', (done) => {
      chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res.text).to.include('<form action="/get-file-size"');
        done();
      })
    })
  })

  describe('/get-file-size', () => {
    it('it should return the file size', (done) => {
      chai.request(server)
      .post('/get-file-size')
      .attach('fileToUpload', readFileSync(__dirname + '/test.txt'), 'test.txt')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.size).to.equal(20);
        done();
      });
    });
  });
})