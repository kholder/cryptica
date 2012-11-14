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
    
    it('encode w/ an offset > length', function () {
        assert(rf.encode('Hello, World!', 3, 15))
    })
    
    it('encode spaces & ASCII', function () {
        assert(rf.encode('▐╝+Ü Ä╒á', 4))
    })
    
    it('encode unicode', function () {
        assert(rf.encode('♩♩♪♪♫♫♬♬', 2, 2))
    })
})