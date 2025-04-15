const  mysql = require ('mysql2');

const pool = mysql.createConnection ({
    "user" :"root",
    "password" :"root",
    "database" : "idev-3", 
    "host" : "localhost", 
     "port" : "3307"
})

exports.execute = (query, param = [], varPool=pool) => {
    return new Promise((resolve, reject) => {
        varPool.query(query, param, (error, result) => {
            if(error){
                reject(error);
            }else{
                resolve(result);
            }
        });
    });
}

exports.pool = pool;