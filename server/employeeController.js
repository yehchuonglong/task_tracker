Meteor.methods({

	'addEmployee': function (firstName, lastName, phoneNum) {
		var newEmployee = {firstName: firstName, lastName: lastName, phoneNum: phoneNum, modifiedAt: new Date()};
		Employees.insert(newEmployee);
	},

	'editEmployee': function (employeeId, firstName, lastName, phoneNum) {
		Employees.update(employeeId, {$set: {firstName: firstName, lastName: lastName, phoneNum: phoneNum, modifiedAt: new Date()}})
	},

	'removeEmployee': function (employeeId) {
		Employees.remove({_id: employeeId});
		Tasks.update({}, {$pull: {assignees: employeeId}}, { multi: true });
	}
});

Meteor.publish('allEmployees', function(){
	return Employees.find();
});