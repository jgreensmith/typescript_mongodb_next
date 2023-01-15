import { Schema, model, models } from "mongoose"

interface IMeal {
    food: string,
    drink: string
}
export interface IUser {
    name: string,
    age: number,
    meals?: IMeal[]
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    meals: Array
})

const User = models.User || model<IUser>("User", userSchema);
export default User;