/*global describe, it, before, after, beforeEach, afterEach*/

require('coffee-script')

var assert = require('assert')
  , RailFence = require('../src/RailFence')
  , rf

describe('RailFence', function () {
    beforeEach(function () {
        rf = new RailFence()
    })
    
    afterEach(function () {
        console.log(rf)
    })
    
    it('encrypt w/ an offset > length', function () {
        assert(rf.encrypt('Hello, World!', 3, 15))
    })
    
    it('encrypt spaces & ASCII', function () {
        assert(rf.encrypt('▐╝+Ü Ä╒á', 4))
    })
    
    it('encrypt unicode', function () {
        assert(rf.encrypt('♩♩♪♪♫♫♬♬', 2, 2))
    })
})