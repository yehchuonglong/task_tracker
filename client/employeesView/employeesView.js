Template.employeesView.events({

	'click #addEmployee': function (event) {
		event.preventDefault();
		var lastName = $('#last-name').val();
		var firstName = $('#first-name').val();
		var phoneNum = $('#phone-num').val();
		Meteor.call("addEmployee", firstName, lastName, phoneNum, function(error) {
			if (error) {
				console.log(error);
			} else {
				$('#last-name').val("");
				$('#first-name').val("");
				$('#phone-num').val("");
				$('#newEmployeeModal').modal('hide');
			}
		});
	},

	'click .openEditEmployeeModal': function (event) {
		event.preventDefault();
		Session.set('currentEdit', this);
	},

	'click #editEmployee': function (event) {
		event.preventDefault();
		var employeeId = Session.get('currentEdit')._id;
		var lastName = $('#edit-last-name').val();
		var firstName = $('#edit-first-name').val();
		var phoneNum = $('#edit-phone-num').val();
		Meteor.call("editEmployee", employeeId, firstName, lastName, phoneNum, function (error) {
			if (error) {
				console.log(error);
			} else {
				$('#editEmployeeModal').modal('hide');
			}
		});
	},

	'click #removeEmployee': function (event) {
		event.preventDefault();
		Meteor.call("removeEmployee", Session.get('currentEdit')._id, function (error) {
			if (error) {
				console.log(error);
			} else {
				$('#editEmployeeModal').modal('hide');
				$('#removeWarningModal').modal('hide');
			}
		});
	}	
});

Template.employeesView.helpers({

	'allEmployees': function () {
		return Employees.find().fetch();
	},

	'currentEdit': function () {
		return Session.get('currentEdit');
	}

});


