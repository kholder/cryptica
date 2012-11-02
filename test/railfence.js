function RailFence () {
    this.fence = []
    this.rails
    this.arg_text
    this.clean_text
    this.cipher_text
}

RailFence.prototype.encode = function (message, rails) {
    var nest_fence = []
      , fence = []
      , index
      , cell
      , forward
      , cipher_text
    
    this.arg_text   = message
    this.clean_text = message.toLocaleUpperCase().replace(/[^a-zA-Z-0-9+]/g, '')
    this.rails      = rails
    
    
    for (cell = 0; cell < this.rails; cell++) {
        nest_fence = []
        for (index = 0; index < this.clean_text.length; index++) {
            nest_fence.push('')
        }
        fence.push(nest_fence)
    }
    
    for (index = 0, cell = 0, forward = true; index < this.clean_text.length; index++) {
        fence[cell][index] = this.clean_text.charAt(index)
        if (cell === rails-1) forward = false
        else if (cell === 0) forward = true
        if (!forward) cell--
        else cell++
    }
    
    this.fence = fence
    
    for (index = 0, cipher_text = ''; index < rails; index++) {
        for (cell = 0; cell < this.clean_text.length; cell++) {
            cipher_text += fence[index][cell]
        }
    }
    
    this.cipher_text = cipher_text
    
    return this.cipher_text
}

var rf = new RailFence()
console.log(rf.encode('rail fence', 3))
console.log(rf.fence)