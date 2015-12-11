define(['jquery'], function($) {

    function Key(opts) {
        opts = opts || {};

        this.el = opts.el;
        this.name = opts.name;
        this.code = opts.code;
        this.eventManager = opts.eventManager;
        this.pressed = false;
        this.pressedClass = 'pressed';

        var self = this;
        this.el.click(function(e){
            e.preventDefault();
            self.keydown();
            self.keyup();
        });
    };

    Key.prototype.keydown = function() {
        this.pressed = true;
        this.el.addClass(this.pressedClass);

        if (this.eventManager) {
            this.eventManager.emit('KEY_DOWN', this);
        }
    }

    Key.prototype.keyup = function() {
        this.pressed = false;
        this.el.removeClass(this.pressedClass);

        if (this.eventManager) {
            this.eventManager.emit('KEY_UP', this);
        }
    }

    return Key;

});
