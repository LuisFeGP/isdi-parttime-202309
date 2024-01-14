const { User, Post } = require('../data/models')
const validate = require('./helpers/validate')
const { SystemError, CredentialsError, NotFoundError, ContentError } = require('./errors')

function updatePostText(userId, postId, text, callback) {
    validate.id(userId, 'user id')
    validate.id(postId, 'post id')
    validate.text(text, 'text')
    validate.function(callback, 'callback')

    Post.findById(postId)
        .then(post => {
            if (!post) {
                callback(new NotFoundError('post id not matched'))
                return
            }

            if (post.author.toString() !== userId) {
                callback(new CredentialsError('post do not belong to user'))
                return
            }

            post.text = text
            post.save()
                .then(callback(null))
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

module.exports = updatePostText