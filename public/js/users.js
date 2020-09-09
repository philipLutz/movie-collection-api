//Create New Account
function createNewUser() {
	let email = $('input[id="js-signup-email"]').val();
	let password = $('input[id="js-signup-password"]').val();
	postNewUser(email, password);
}

function postNewUser(email, password) {
	$.ajax({
		url: '/api/users/register',
		type: 'POST',
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify({
			"email": `${email}`,
			"password": `${password}`
		}),
		success: (data) => {
			if(data) {
				location.href = '/login.html';
				$('input[id="js-signup-email"]').val('');
				$('input[id="js-signup-password"]').val('');
			}
		},
		error: (...rest) => {

		}
	});
}

$('#js-signup-form').submit(event => {
	event.preventDefault();
	createNewUser();
});

//Login Existing User
function loginExistingUser() {
	let email = $('input[id="js-login-email"]').val();
	let password = $('input[id="js-login-password"]').val();
	postExistingUser(email, password);
}

function postExistingUser(email, password) {
	$.ajax({
		url: '/api/users/login',
		type: 'POST',
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify({
			"email": `${email}`,
			"password": `${password}`
		}),
		success: (token) => {
			localStorage.setItem('authToken', token.token);
			location.href = '/home.html';
		},
		error: (jqXHR, exception) => {
			
		}
	});
}

$('#js-login-form').submit(event => {
	event.preventDefault();
	loginExistingUser();
});

//Login Button
$('#log-in-button').click(event => {
	window.location.href = './login.html';
	return false;
});

//Signup Button
$('#sign-up-button').click(event => {
	window.location.href = './signup.html';
	return false;
});

// Go to home if there is a token
$(function() {
	const token = localStorage.getItem('authToken');
	if (token) {
		location.href = '/home.html';
	}
});