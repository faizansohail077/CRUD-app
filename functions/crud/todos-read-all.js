import faunadb from 'faunadb'
const q = faunadb.query
const client= new faunadb.Client({
    secret:process.env.FAUNADB_SECRET
})

exports.handler=(event,context,callback)=>{
    console.log("fucntion `todo-read-all` invoked ")
    return client.query(q.Paginate(q.Match(q.Ref("indexes/all_todos"))))
    .then((response)=>{
        const todoRefs = response.data
        console.log("Todos ref",todoRefs)
        console.log(`${todoRefs.length} todos found`)
        const getAllTodoDataQuery = todoRefs.map((ref)=>{
            return q.Get(ref)
    })
    return client.query(getAllTodoDataQuery).then((ret)=>{
        return callback(null,{
            statusCode : 200,
            body:JSON.stringify(ret)
        })
    })
    })
    .catch((error)=>{
        console.log('error',error)
        return callback(null,{
            statusCode:400,
            body:JSON.stringify(error)
        })
    })
}
