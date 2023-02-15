import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    username: String,
    email: String,
    password: String
})

//If already have a model in database, use that, otherwise create a new one.
const Users = models.user || model('user', userSchema)

export default Users;