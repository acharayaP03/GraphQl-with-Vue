module.exports = {
    Query: {
        get_user: () => null
    },
    Mutation: {
        signup_user: async ( _, { username, email, password }, { User }) =>{
            const user = await User.findOne( { username })
            if(user){
                throw new Error('User already exist!')
            }
            // if not exist 
            const new_user = await new User({
                username,
                password,
                email
            }).save();

            return new_user;
        }
    }
}