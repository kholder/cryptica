/*global describe, it, before, after, beforeEach, afterEach*/

require('coffee-script')

var assert = require('assert')
  , RailFence = require('../src/RailFence')
  , rf
  , plaintext
  , ciphertext
  , rails
  , offset

describe('RailFence', function () {
    beforeEach(function () {
        rf = new RailFence()
    })
    
    afterEach(function () {
        console.log(rf)
    })
    
    it('encrypt w/ an offset > length', function () {
        assert(rf.encrypt('Hello, World!', 3, 16))
    })
    
    it('encrypt spaces & ASCII', function () {
        assert(rf.encrypt('▐╝+Ü Ä╒á', 4))
    })
    
    it('encrypt unicode', function () {
        assert(rf.encrypt('♩♩♪♪♫♫♬♬', 2, 2))
    })
    
    plaintext  = 'Top secret message'
    ciphertext = 'Tseego ertmsaepc s'
    rails      = 3
    offset     = 0
    
    it(['encrypt "', plaintext, '" to "', ciphertext, '"'].join(''), function () {
        assert.equal(ciphertext, rf.encrypt(plaintext, rails, offset))
    })
    
    it(['decrypt "', ciphertext, '" to "', plaintext, '"'].join(''), function () {
        assert.equal(plaintext, rf.decrypt(ciphertext, rails, offset))
    })
})