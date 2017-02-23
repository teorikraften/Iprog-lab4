// selectDistViewController
var NavBarViewController = function(view, model, stateController) {
	
	view.$li_home.click(function() {
		view.$ul.find("li").removeClass("active");
		view.$li_home.addClass("active");
		stateController.hideAll();
		stateController.showSidebar();
		stateController.showSelectDish();
	});

	view.$li_overview.click(function() {
		view.$ul.find("li").removeClass("active");
		view.$li_overview.addClass("active");
		stateController.hideAll();
		stateController.showOverview();
	});

	view.$li_dishes.click(function() {
		view.$ul.find("li").removeClass("active");
		view.$li_dishes.addClass("active");
		stateController.hideAll();
		stateController.showSidebar();
		stateController.showSelectDish();
	});

	view.$li_instructions.click(function() {
		view.$ul.find("li").removeClass("active");
		view.$li_instructions.addClass("active");
		stateController.hideAll();
		stateController.showInstructions();
	});

	$(".container").on('click', '*', function() {
		stateController.shownStates.forEach(function(state) {
			switch(state) {
				case 'overview':
					view.$ul.find("li").removeClass("active");
					view.$li_overview.addClass("active");
					break;

				case 'home':
					view.$ul.find("li").removeClass("active");
					view.$li_home.addClass("active");
					break;

				case 'dishes':
					view.$ul.find("li").removeClass("active");
					view.$li_dishes.addClass("active");
					break;

				case 'instructions':
					view.$ul.find("li").removeClass("active");
					view.$li_instructions.addClass("active");
					break;
			}
		});
	});
}