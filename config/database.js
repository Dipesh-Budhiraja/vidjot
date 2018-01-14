if(process.env.NODE_ENV === 'production'){
  module.exports = {mongoURI: 'mongodb://admin:admin@ds249727.mlab.com:49727/vidjot'}
} else {
  module.exports = {mongoURI: 'mongodb://localhost/vidjot-dev'}
}