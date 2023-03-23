const config = require('config')

const app = require('./src/app')

const { port } = config.get('server')

app.listen(port, () => console.log('listening on port ' + port))
