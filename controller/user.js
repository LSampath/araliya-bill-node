const {connection} = require('../connection');
const jwt = require('jsonwebtoken');
const config = require('../config');

const authUser = (username, password) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM user WHERE user_name=? AND password=MD5(?)",
            [username, password],
            (err, res) => {
                if (err) {
                    reject(err);
                } else if (res.length) {
                    var token = jwt.sign(
                        {"username": username},
                        config.secret
                    );
                    resolve({
                        auth: true,
                        token: token
                    });
                } else {
                    resolve({
                        auth: false
                    });
                }
            });
    });
}

const validateToken = (token) => {
    return new Promise((resolve, reject) => {
        if (!token) {
            reject(
                {auth: false, message: 'No token provided'}
            );
        } else {
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    reject({auth: false, message: 'Unable to authenticate'});
                }
                connection.query("SELECT user_name FROM user WHERE user_name=?",
                    [decoded['username']],
                    (err1, res) => {
                        if (err1) {
                            reject({auth: false, message: 'Unable to authenticate'});
                        } else if (res.length) {
                            resolve({auth: true, message: 'Authenticated'});
                        } else {
                            reject({auth: false, message: 'User not found'});
                        }
                    });
            })
        }
    })
}

const addUser = (user) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO user (user_name, full_name, email, password) VALUES (?,?,?,MD5(?))",
            [user.user_name, user.full_name, user.email, user.password],
            (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
    });
};

const getUsers = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT user_name, full_name, email FROM USER",
            (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
    });
};

const getUser = (user_id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT user_name, full_name, email FROM USER WHERE user_id=?",
            [user_id],
            (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
    });
};

// const updateUser = (user) => {
//     return new Promise((resolve, reject) => {
//         connection.query("U")
//     })
// }

module.exports = {
    authUser, addUser, getUsers, getUser, validateToken
}