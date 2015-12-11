define(['jquery', 'minivents', 'app/key'], function($, Events, Key) {

    function Keyboard(opts) {

        opts = opts || {};

        this.id = opts.id;
        this.codeAttr = opts.codeAttr || 'data-key-code';
        this.nameAttr = opts.nameAttr || 'data-key-name';
        this.el = $('#'+this.id);
        this.keys = [];
        this.display = $('#'+opts.displayId);
        this.value = '';

        this.specials = [];

        var self = this;

        this.eventManager = new Events();
        this.eventManager.on('KEY_UP', function(data){
            self.handleKeyUp(data)
        });

        this.el.find('['+this.codeAttr+']').each(function(){
            var code = parseInt($(this).attr(self.codeAttr)),
                name = $(this).attr(self.nameAttr),
                el = $(this),
                key = new Key({
                    el: el,
                    name: name,
                    code: code,
                    eventManager: self.eventManager
                });

            self.keys[code] = key;

            if (name.length > 1) {
                self.specials[key.name] = key;
            }
        });

        $('body').keydown(function(e){

            if (self.keys[e.keyCode]) {
                e.preventDefault();
                self.keys[e.keyCode].keydown();
            }

        });

        $('body').keyup(function(e){

            if (self.keys[e.keyCode]) {
                e.preventDefault();
                self.keys[e.keyCode].keyup();
            }

        });

    };

    Keyboard.prototype.handleKeyUp = function(data) {
        var key = data;

        if (!this.specials[key.name]) {
            this.addCharacter(key.name);
        } else {
            switch (key.name) {
                case 'space':
                    this.addCharacter(' ');
                    break;
                case 'backspace':
                    this.deleteCharacter();
                    break;
                case 'tab':
                    this.addCharacter('\t');
                    break;
                case 'enter':
                    this.addCharacter('\n');
                    break;
                default:
                    break;
            }
        }
    }

    Keyboard.prototype.addCharacter = function(c) {
        if (this.specials['shift'].pressed) {
            c = c.toUpperCase();
        }
        this.value += c;
        this.updateDisplay();
    }

    Keyboard.prototype.deleteCharacter = function() {
        this.value = this.value.slice(0, -1);
        this.updateDisplay();
    }

    Keyboard.prototype.updateDisplay = function() {
        this.display.focus();
        this.display.val(this.value);
    }

    return Keyboard;

});
