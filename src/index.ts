import Application from './app'
import database from './database'

database()

const app = new Application()

app.start()
