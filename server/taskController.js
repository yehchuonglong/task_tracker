Meteor.methods({

	'addTask': function (title, detail, assignees, deadline) {
		Tasks.insert({title: title, detail: detail, assignees: assignees, deadline: deadline, modifiedAt: new Date()});
	},

	'editTask': function (taskId, title, detail, assignees, deadline) {
		Tasks.update(taskId, {$set: {title: title, detail: detail, assignees: assignees, deadline: deadline, modifiedAt: new Date()}})
	},

	'removeTask': function (taskId) {
		Tasks.remove({_id: taskId});
	},

	'assginEmployee': function (taskId, employeeId) {
		Tasks.update(taskId, {$push: {assignees: employeeId}});
	},

	'unassginEmployee': function (taskId, employeeId) {
		Tasks.update(taskId, {$pull: {assignees: employeeId}});
	}
});

Meteor.publish('allTasks', function(){
	return Tasks.find();
});

Meteor.publish('taskContent', function(taskId){
	return Tasks.find({_id: taskId});
});