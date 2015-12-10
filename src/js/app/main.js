define(['jquery','app/keyboard'], function($, Keyboard) {

	var module = {

        keyboard: null,

		init: function() {
			console.log('main init');

            this.keyboard = new Keyboard({id:'keyboard'});

		}

	};

	return module;
});
