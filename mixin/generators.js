exports.randomName = function() {
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var result = ""
    var chaactersLength = characters.length;

    for (var i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() * chaactersLength));
    }
    return result;
}