define(['jquery'], function($) {

    function Key(opts) {

        opts = opts || {};

        this.el = opts.el;
        this.name = opts.name;
        this.code = opts.code;
        this.pressed = false;
        this.pressedClass = 'pressed';
    };

    Key.prototype.keydown = function() {
        this.pressed = true;
        this.el.addClass(this.pressedClass);
    }

    Key.prototype.keyup = function() {
        this.pressed = false;
        this.el.removeClass(this.pressedClass);
    }

    return Key;

});
