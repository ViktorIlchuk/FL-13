let login = prompt('Enter your login.');
const user = 'User';
const admin = 'Admin';
const userPass = 'UserPass';
const adminPass = 'RootPass';
const eightPM = 20;
const minLoginLength = 4;
const date = new Date().getHours();

if( login === null || login === '') {
    alert('Canceled'); 
} else if(login.length < minLoginLength) {
    alert(`I don't know any users having name length less than 4 symbols`);   
} else if(login === user) {
    let password = prompt('Enter your password');
    if( password === null || password === '') {
        alert('Canceled'); 
    } else if(login === user && password === userPass) {
        if(date < eightPM) {
            alert('Good day, dear User!”')
        } else if( date >= eightPM) {
            alert('Good evening, dear User!')
        } 
    } else {
        alert('Wrong password.')
    }    
} else if(login === admin) {
    let password = prompt('Enter your password');
    if( password === null || password === '') {
        alert('Canceled'); 
    } else if(login === admin && password === adminPass) {
        if(date < eightPM) {
            alert('Good day, dear Admin!”')
        } else if( date >= eightPM) {
            alert('Good evening, dear Admin!')
        } 
    } else {
        alert('Wrong password.')
    }    
} else {
    alert(`I don’t know you`);
}
