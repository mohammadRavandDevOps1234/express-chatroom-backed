var bcrypt = require("bcryptjs");
exports.hashPassword= function(password){
    return bcrypt.hashSync(
        password,
        bcrypt.genSaltSync(15)
    );
}