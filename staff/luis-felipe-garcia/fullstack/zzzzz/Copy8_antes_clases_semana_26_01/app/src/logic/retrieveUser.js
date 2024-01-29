import context from "./context"
import validate from "./helpers/validate"


function retrieveUser(callback) {
    validate.function(callback, 'callback')
    const req = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${context.sessionUserId}`
        },
      //  body: JSON.stringify({ email, password })
    }

    fetch(`${import.meta.env.VITE_API_URL}/users`, req)
        .then(res => {
            if (!res.ok) {
                res.json()
                    .then(body => callback(new Error(body.message)))
                    .catch(error => callback(error))
                return
            }

            res.json()
           // debugger
                .then(user => callback(null, user))
                .catch(error => callback(error))
        })
        .catch(error => callback(error))
}

export default retrieveUser