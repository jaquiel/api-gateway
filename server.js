/**
 * Server initialization
 */
const app = require('./app')

app.listen( 8081, () => {
    console.log('Server running on port 8081')
})

