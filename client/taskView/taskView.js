Template.taskView.onRendered(function () {
	this.$('.datetimepicker').datetimepicker();
});

Template.taskView.helpers({

	'AllEmployees': function () {
		return Employees.find().fetch();
	},

	'isAssigned': function () {
		var isAssigned = Tasks.find({_id: Router.current().params.taskId, assignees: this._id}).fetch();
		if(isAssigned[0]) {
			return true 
		} else {
			return false
		}
	},
	
	'getEmployeeName': function () {
		var employee = Employees.find({_id: String(this)}).fetch();
		var employeeName = employee[0].firstName + " " + employee[0].lastName;
		return employeeName;
	}
});

Template.taskView.events({

	'click .assignment': function (event) {
		event.preventDefault();
		var isAssigned = Tasks.find({_id: Router.current().params.taskId, assignees: this._id}).fetch();
		if(isAssigned[0]) {
			Meteor.call('unassginEmployee', Router.current().params.taskId, this._id);
		} else {
			Meteor.call('assginEmployee', Router.current().params.taskId, this._id);
		}	
	},

	'click #editTask': function (event) {
		event.preventDefault();
		var taskId = Router.current().params.taskId;
		var title = $('#edit-title').val();
		var detail = $('#edit-detail').val();
		var assignees = this.assignees;
		var deadline = $('#edit-deadline').val();
		Meteor.call('editTask', taskId, title, detail, assignees, deadline, function (error) {
			if (error) {
				console.log(error);
			} else {
				$('#editTaskModal').modal('hide');
			}
		})
	},

	'click #removeTask': function (event) {
		event.preventDefault();
		var taskId = Router.current().params.taskId;
		Meteor.call('removeTask', taskId, function (error) {
			if (error) {
				console.log(error);
			} else {
				$('#removeTaskModal')
				.on('hidden.bs.modal', function() {
					Router.go('/');
				})
				.modal('hide');
			}
		})
	}
});