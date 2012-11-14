###
Rail Fence Transformation Cipher
@author Kirk Holder
###
module.exports = module.exports ? @

module.exports = class RailFence

    constructor: ->
        @message  = ''
        @cipher   = ''
        @decipher = ''
        @rails    = 0
        @offset   = 0
        @fence    = []
    
    encrypt: (message, rails, offset = 0) ->
        @message = message
        @rails   = rails
        @offset  = offset % rails
        @fence   = _drawZigZag.call @
        
        # build cipher text
        @cipher = ''
        for row in [0...@rails]
            for col in [0...@message.length]
                @cipher += @fence[row][col]
        
        @cipher
    
    decrypt: (cipher, rails, offset = 0) ->
        @decipher = ''
        @cipher   = cipher
        @rails    = rails
        @offset   = offset % rails
        @fence    = _buildEmptyFence @rails, @cipher.length
        
        # draw zig zag with X's
        @message  = ''
        @message += 'X' for [0...@cipher.length]
        @fence    = _drawZigZag.call @
        
        # replace X's with ciphertext chars
        index = 0
        for row in [0...@rails]
            for col in [0...@cipher.length]
                if @fence[row][col] == 'X'
                    @fence[row][col] = @cipher.charAt index
                    index++
        
        # read fence in a zig zag shape
        forward = true
        row     = 0
        for col in [0...@cipher.length]
            @decipher += @fence[row][col]
            forward = false if row == @rails - 1
            forward = true  if row == 0
            if !forward
                row--
            else
                row++
        
        @decipher
        
    _buildEmptyFence = (rows, cols) ->
        fence = []
        nest  = []
        
        # build an array with correct number of columns and rows
        for [0...rows]
            nest = []
            nest.push '' for [0...cols]
            fence.push nest
        
        fence
    
    _drawZigZag = ->
        fence   = _buildEmptyFence @rails, @message.length
        forward = true
        row     = @offset
        
        # fill the array in a zig zag shape
        for col in [0...@message.length]
            fence[row][col] = @message.charAt col
            forward = false if row == @rails - 1
            forward = true  if row == 0
            if !forward
                row--
            else
                row++
        
        fence
    
    _sanitize = (txt) ->
        txt.toLocaleUpperCase().replace /[^a-zA-Z-0-9+]/g, ''