// Menu Highlighting
$(document).ready(function() {

	// Vars
	var active;                      // The menu item marked as active
	var last_id;                     // The id of the last item scrolled through
	var spacing = 50;                // Between the top of the window and the active item
	var nav = $('#main-header nav'); // The main <nav>
	var content = $('#content');     // The content to spy on
	var menu_items = nav.find('a');  // The list of links in the nav
	var scroll_items;                // The list of items the nav maps to

	scroll_items = menu_items.map(function(){
		if ($(this).length) return $($(this).attr('href'));
	})

	// Animate clicks
	menu_items.click(function(e) {
		var href = $(this).attr('href');
		var elm = $(href);
		var offset = (href === '#') ? 0 : elm.offset().top;
		$('html, body').stop().animate({ 
			scrollTop: offset - spacing + 1
		}, 300);
		window.location.hash = elm[0].id;
		e.preventDefault();
	})

	// React to scroll
	$(window).scroll(function() {
		var position = $(this).scrollTop();
		var current;
		var current_id;
		scroll_items.map(function(){
			if ($(this).offset().top < position + spacing) {
				current = this;
			}
		})
		current_id = current && current.length ? current[0].id : '';
		if (last_id !== current_id) {
			last_id = current_id;
			if (active) active.removeClass('active');
			active = menu_items.filter('[href=#'+current_id+']');
			active.addClass('active');
		}
	})
})
