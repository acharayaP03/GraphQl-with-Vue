
module.exports = {
    Query: {
        get_posts: async (_ , args, { Post }) => {
            const posts = await Post.find({}).sort({ created_at: 'desc'}).populate({
                path: 'author',
                model: 'User'
            })
            return posts
        } 
    },
    Mutation: {
        add_post: async (_, { title, image_url, categories, description, author_id}, { Post }) =>{
            const new_post = await new Post({
                title,
                image_url,
                categories,
                description,
                author: author_id
            }).save()

            return new_post;
        },
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