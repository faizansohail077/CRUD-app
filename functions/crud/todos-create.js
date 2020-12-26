import faunadb from 'faunadb'
const q = faunadb.query


const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {
    const data = JSON.stringify(event.body)
    console.log("function `todo-create` invoked ", data)
    const todoItem = {
        data: data
    }
    return client.query(q.Create(q.Ref('classes/todos'), todoItem)
        .then((response) => {
            console.log("success", response)
            return callback(null, {
                statusCode: 200,
                body: JSON.stringify(response)
            })
        })
        .catch((error) => {
            console.log('error', error)
            return callback(null, {
                statusCode: 400,
                body: JSON.stringify(error)
            })

        })
    )
}
