
// SIMPLE SUBSTITUTION
String.prototype.simple = function (shift) {
    var str = '', i
    for (i = 0; i < this.length; i++) {
        str += String.fromCharCode(this.charCodeAt(i) + shift % this.length)
    }
    return str
}

//var assert = require('assert')
//
//describe('Substitution Cipher', function () {
//    it('shift ', function () {
//        assert('Hello'.simple(5))
//    })
//})

console.log('ABC'.simple(3))
console.log('Hello, world'.simple(13))
console.log('This is a test!'.simple(64))