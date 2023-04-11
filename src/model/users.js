const bcrypt = require('bcryptjs');

const {
    getElement,
    getAllElements,
    changeElement,
    addElement,
    removeElement,
} = require("./commonDbModel");

const RemoveQuery = "DELETE FROM `Users` WHERE id = ?";
const AllUsersQuery = "SELECT `id`, `login`, `name` FROM `Users`";
const AddUserQuery = "INSERT INTO `Users`(`login`, `password`, `name`) VALUES (?,?,?)";
const UpdateUserQuery = "";
const FindUserByLogin = "SELECT * FROM `Users` WHERE login = ?";


function addUser(user) {
    let msg = ''
    return findUserByLogin(user).then((results) => {
        if (results && results[0]) {
            msg = 'Użytkownik o danym loginie istnieje w bazie danych!';
            throw new Error('Użytkownik istnieje');
        } else {
            msg = 'Błąd podczas haszowania hasła';
            return bcrypt.hash(user.password, 12).then((result) => {
              user = { ...user, password: result };
              const values = [user.login, user.password, user.name];
              return addElement(AddUserQuery, values);
            }).catch((err) => {
              return err;
            });
        }
    }).catch((err) => {
          return {
            msg,
            error: err,
          };
    })

}

function findUserByLogin(user) {
    const value = user.login;
    return getElement(value, FindUserByLogin);
}

function isUserAuthenticated(user) {
    return findUserByLogin(user).then((results) => {
        const userFromDb = results[0];
        if (user.login === userFromDb.login) {
            return bcrypt.compare(user.password, userFromDb.password).then((results) => {
                if (results) {
                    return {
                        login: userFromDb.login,
                        name: userFromDb.name,
                        id: userFromDb.id,
                        isAuth: results
                    }
                }
                return {
                    isAuth: false
                }

            }).catch(() => {
                return {isAuth: false}
            });
        }
        return new Promise((resolve, reject) => {
            reject(new Error('Nieprawidłowe dane logowania'));
        });
    });
}

function removeUser(id) {
    return removeElement(id, RemoveQuery);
}

function getAllUsers() {
    return getAllElements(AllUsersQuery);
}

module.exports = {
    findUserByLogin,
    addUser,
    isUserAuthenticated,
    removeUser,
    getAllUsers
}