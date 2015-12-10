define(['jquery', 'minivents', 'app/key'], function($, Events, Key) {

    function Keyboard(opts) {

        opts = opts || {};

        this.id = opts.id;
        this.codeAttr = opts.codeAttr || 'data-key-code';
        this.nameAttr = opts.nameAttr || 'data-key-name';
        this.el = $('#'+this.id);
        this.keys = [];
        this.pressed = [];

        var self = this;
        this.el.find('['+this.codeAttr+']').each(function(){
            var code = parseInt($(this).attr(self.codeAttr)),
                name = $(this).attr(self.nameAttr),
                el = $(this);
            self.keys[code] = new Key({
                el: el,
                name: name,
                code: code
            });
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

    return Keyboard;

});
