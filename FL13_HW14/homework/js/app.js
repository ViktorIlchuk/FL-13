function Student(name, email) {
    this.getName = function() {
        return name
    }

    this.getEmail = function() {
        return email
    }
}

Student.prototype.getHomeworkResults = function() {
    console.log(this.homeworkResults)
}

Student.prototype.addHomeworkResult = function(topic, success) {
    if(this.hasOwnProperty('homeworkResults')) {
        this.homeworkResults.push({topic: topic, success: success})
    } else {
        this.homeworkResults = []
        this.homeworkResults.push({topic: topic, success: success})
    }
}

function FrontendLab(students, failedLimit) {
    this.failedHomeworksLimit = function() {
        return failedLimit
    }
    this.studentsList = function() {
        return students
    }
}

FrontendLab.prototype = new Student();
FrontendLab.prototype.printStudentsList = function() {
    this.studentsList().forEach( element => {
        console.log(`name: ${element.name}, email: ${element.email}`)
        console.log(element.homeworkResults)
    })
}

FrontendLab.prototype.addHomeworkResult = function(currentStudent, topic, success) {
    let student = this.studentsList()[currentStudent];
    if(student.hasOwnProperty('homeworkResults')) {
        student.homeworkResults.push({topic: topic, success: success})
    } else {
        student.homeworkResults = []
        student.homeworkResults.push({topic: topic, success: success})
    }
}

FrontendLab.prototype.addHomeworkResults = function(homeworkResults) {    
    for(let i = 0; i < this.studentsList().length; i++) {    
        for(let valHw of homeworkResults.results) {
            if(this.studentsList()[i].email === valHw.email) {
               this.addHomeworkResult(i, homeworkResults.topic, valHw.success)
            }
        }
    }
}

FrontendLab.prototype.printStudentsEligibleForTest = function() {   
    this.studentsList().forEach( (element, index) => {
        let failedHomeworks = 0;
        for(let i = 0; i < element.homeworkResults.length; i++) {
            if(element.homeworkResults[i].success === false) {
                failedHomeworks++
            }
        }
        if(failedHomeworks <= this.failedHomeworksLimit()) {   
            let student = this.studentsList()[index]
            console.log(`name: ${student.name}, email: ${student.email}`)
        }
    })
}







