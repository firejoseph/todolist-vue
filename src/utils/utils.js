// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
import axios from "axios";

function exists(userId, taskId) {
    let r = false;
    axios.get('http://localhost:8080/exists/' + userId + '/' + taskId).then(res => {
        r = res.data
    })
    return r;
}

export async function update(task) {
    await axios.put('http://localhost:8080/update',
        {id: task.id, userId: task.userId, content: task.content, completed: task.completed}).catch(err => {
        console.log(err);
    })
}

export async function insert(task) {
    await axios.post('http://localhost:8080/insert',
        {id: task.id, userId: task.userId, content: task.content, completed: task.completed}).catch(err => {
        console.log(err);
    })
}

export function setItem(userId, taskList) {
    // 存储
    // localStorage.setItem(key, JSON.stringify(value))
    for (let i = 0; i < taskList.length; ++i) {
        let task = taskList[i]
        if (exists(userId, task.id)) {
            update(task)
        } else {
            insert(task)
        }
    }
}

export async function getItem(userId) {
    // 获取
    // 根据key获取该用户所有的todo
    let r = '';
    await axios.get('http://localhost:8080/getTask/' + userId).then(ret => {
        r = ret.data
    }).catch(err => {
        console.log(err)
    })
    return r;
    // return JSON.parse(localStorage.getItem(key))
}

export async function deleteTask(id) {
    await axios.delete('http://localhost:8080/deleteTask/' + id).catch(err => {
        console.log(err)
    })
}


// export function removeItem(key) {
//     localStorage.removeItem(key)
// }
