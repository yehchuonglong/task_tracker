Router.route('/', function () {
	this.subscribe('allTasks').wait();
	if (this.ready()) {
		this.render('homeView');
	} else {
		this.render('loading')	
	}
});

Router.route('/employees', function () {
	this.subscribe('allEmployees').wait();
	if (this.ready()) {
		this.render('employeesView');
	} else {
		this.render('loading')	
	}
});

Router.route('/tasks/:taskId', function () {
	this.subscribe('allEmployees').wait();
	this.subscribe('taskContent', this.params.taskId).wait();
	if (this.ready()) {
		this.render('taskView', {
			data: function () {
				return Tasks.findOne({_id: this.params.taskId});
			}
		});
	} else {
		this.render('loading')	
	}
});