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
                        {"user_id": res[0].user_id},
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
                connection.query("SELECT * FROM user WHERE user_id=?",
                    [decoded['user_id']],
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
        connection.query("SELECT user_id, user_name, full_name, email FROM user",
            (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
    });
};

const getUser = (access_token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(access_token, config.secret, (err, decoded) => {
            if (err) {
                reject(err);
            }
            connection.query("SELECT user_id, user_name, full_name, email FROM user WHERE user_id=?",
                [decoded['user_id']],
                (err1, res) => {
                    if (err1) {
                        reject(err1);
                    } else if (res.length) {
                        resolve(res[0]);
                    } else {
                        reject({auth: false});
                    }
                });
        });
        // connection.query("SELECT user_id, user_name, full_name, email FROM user WHERE user_id=?",
        //     [access_token],
        //     (err1, res) => {
        //         if (err1) {
        //             reject(err1);
        //         } else if (res.length) {
        //             resolve(res[0]);
        //         } else {
        //             reject({result: 'Auth failed'});
        //         }
        //     });
    });
};

const updateUser = (access_token, user) => {
    return new Promise((resolve, reject) => {
        jwt.verify(access_token, config.secret, (err, decoded) => {
            if (err) {
                reject(err);
            }
            connection.query("UPDATE user SET user_name=?, full_name=?, email=?, password=MD5(?) WHERE user_id=?",
                [user.user_name, user.full_name, user.email, user.password, decoded['user_id']],
                (err1, res) => {
                    if (err1) {
                        reject(err1);
                    } else {
                        resolve(res);
                    }
                });
        });
    })
}

module.exports = {
    authUser, addUser, getUsers, getUser, validateToken, updateUser
}