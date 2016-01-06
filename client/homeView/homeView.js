Template.homeView.onRendered(function () {
	this.$('.datetimepicker').datetimepicker();
});

Template.homeView.helpers({

	'includedEmployees': function () {
		return Session.get('includedEmployees');
	},

	'allTasks': function () {
		return Tasks.find().fetch();
	} 
});

Template.homeView.events({

	'click #addTask': function(event) {
		event.preventDefault();
		var title = $('#title').val();
		var detail = $('#detail').val();
		var assignees = [];
		var deadline = $('#deadline').val();
		Meteor.call("addTask", title, detail, assignees, deadline, function(error, result) {
			if (error) {
				console.log(error);
			} else {
				console.log(result);
				$('#title').val("");
				$('#detail').val("");
				$('#deadline').val("");
				$('#homeModal').modal('hide');

			}
		});
	}	
});