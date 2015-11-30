var generateHash = function(password) {
    hash = randomize(password, 20);
    hash = hash.substring(0, hash.length / 2) + randomize(hash, 40) + hash.substring(hash.length / 2, hash.length);
    hash = hash.substring(0, hash.length / 3) + randomize(hash, 20) + hash.substring(hash.length / 3, hash.length);
    hash = hash.substring(0, 2 * hash.length / 3) + randomize(hash, 30) + hash.substring(2 * hash.length / 3, hash.length);
    return hash.substring(0, 16);
}

var randomize = function(key, randomNumber) {
    var hash = "";
    for(index = 0;index < key.length; index++) {
        hash = hash.concat(String.fromCharCode(key[index].charCodeAt(0) - (key.length - index + randomNumber) + 5168))
    }
    return hash;
}
