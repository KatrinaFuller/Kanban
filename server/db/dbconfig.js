//THIS FILE STAYS BASICALLY THE SAME
import mongoose from 'mongoose'

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connection.on('error', err => {
  console.error('[DATABASE ERROR]:', err)
})

//TODO: ADD YOUR CONNECTION STRING!!!
const connectionString = "mongodb+srv://Stephanieh799:a-Ufy^MCEVgg3De@kanban-s35mo.mongodb.net/Kanban?retryWrites=true&w=majority"

export default class DbContext {
  static async connect() {
    try {
      let status = await mongoose.connect(process.env.CONNECTION_STRING)
      console.log("CONNECTED")
      return status
    } catch (e) {
      console.error(e)
    }
  }
}