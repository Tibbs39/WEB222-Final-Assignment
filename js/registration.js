window.onload = function () {
    // get form
    form = document.form1
    // reset form on load
    //form.reset(); used for testing, no longer needed

    // generate onchange for each input
    form.username.onchange = function() { validateUsername() }
    form.password.onchange = function() { 
        validatePassword();  
        validateCPassword();
    }
    form.cPassword.onchange = function() { validateCPassword() }
    form.phNum.onchange = function() { validatePhoneNumber() }
    form.city.onchange = function() { validateCity() }
    form.postalCode.onchange = function() { validatePostalCode() }
    form.email.onchange = function() { validateEmail() }
}

// final form validation. Recheck all forms before submitting
function formValidation() {

    return (validateUsername() &&     // check username
            validatePassword() &&     // check password
            validateCPassword() &&    // check confirm password
            validateCity() &&         // check city
            validatePostalCode() &&   // check postal code
            validateEmail() &&        // check email
            validatePhoneNumber());   // check phone number
}

// validates the username
function validateUsername() {
    var err = getError(0);
    var str = getValue("username");
    var field = getField("username");

    // reset the error msg
    reset(field, err);

    var pass = false;
    str = str.toUpperCase();
    // check requirements
    if (str.length >= 6) { // minimum 6 chars
        if (str.charAt(0) >= 'A' && str.charAt(0) <= 'Z') { // begins with a char
            pass = true;
        } else {
            // print appropriate error
            msg(field, err, "Must begin with a letter");
        }
    } else {
        msg(field, err, "Username not long enough");
    }

    return pass;
}

// validates the password
function validatePassword() {
    var err = getError(1);
    var str = getValue("password");
    var field = getField("password");

    // reset the error msg
    reset(field, err);

    var pass = false;
    // check length
    if (str.length >= 8) {
        // check if it contains a capital letter and number
        var digit = false, capital = false;
        var first = str.toUpperCase().charAt(0);
        if (first >= 'A' && first <= 'Z') {
            for (var i = 0; i < str.length; i++) {
                c = str.charAt(i);
                if (capital == false && (c >= 'A' && c <= 'Z')) {
                    capital = true;
                } else if (digit == false && parseInt(c) == c) {
                    digit = true;
                }
            }
            // return appropriate error message
            if (digit && capital) {
                pass = true;
            } else if (!digit) {
                msg(field, err, "Must contain at least 1 number");
            } else if (!capital) {
                msg(field, err, "Must contain at least 1 uppercase letter");
            }
        } else {
            msg(field, err, "Must begin with a letter");
        }
    } else {
        msg(field, err, "Must be at least 8 characters");
    }

    return pass;
}

// validate the confirm password
function validateCPassword() {
    var err = getError(2);
    var str1 = getValue("password");
    var str2 = getValue("cPassword");
    var field = getField("cPassword");
    
    // reset error msg
    reset(field, err);

    var pass = true;
    if (str1 != str2) {
        pass = false;
        msg(field, err, "Passwords do not match");
    }

    return pass;
}

// validate phone number
function validatePhoneNumber() {
    var err = getError(3);
    var str = getValue("phNum");
    var field = getField("phNum");
    // reset the error msg
    reset(field, err);

    // check if the phone number contains only digits
    var pass = true;
    // if number is valid but has missing hyphens, add them
    // for convenience
    if (str.length == 10) {
        for (var i = 0; i < str.length; i++) {
            var c = str.charAt(i);
            if (parseInt(c) != c) {
                pass = false;
            }
        }
        if (pass) {
            var x = str.substr(0,3);
            var y = str.substr(3,3);
            var z = str.substr(5,4);
            newStr = x + '-' + y + '-' + z;
            form.phNum.value = newStr;
        }
    } else if (str.length == 12) {
        for (var i = 0; i < str.length; i++) {
            var c = str.charAt(i);
            if (i == 3 || i == 7) {
                if (c != '-') {
                pass = false;
                }
            } else if (parseInt(c) != c) {
                pass = false;
            }
        } 
    } else {
        pass = false;
    }

    if (!pass) {
        msg(field, err, "Please enter a valid phone number");
    }

    return pass;
}

// validate city
function validateCity() {
    var err = getError(4);
    var str = getValue("city");
    var field = getField("city");
    // reset the error msg
    reset(field, err);
    var pass = true;

    // check if the field contains no numbers
    for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i);
        if (parseInt(c) == c) {
            pass = false;
            msg(field, err, "Must contain no numbers");
        } 
    }

    return pass;
}

// validate the postal code
function validatePostalCode() {
    var err = getError(5);
    var str = getValue("postalCode");
    var field = getField("postalCode");
    var pass = true;
    
    // reset the error msg
    reset(field, err);
    
    // set the field to uppercase
    str = str.toUpperCase()
    form.postalCode.value = str;

    // check if string contains only 6 chars
    // as well as A1A1A1 format
    if (str.length <= 6) {
        for (var i = 0; i < 5; i++) {
            if (str.charAt(i) < 'A' || str.charAt(i) > 'Z') {
                pass = false;
            }
            i++;
        }
        for (var i = 1; i < 6; i++) {
            var d = str.charAt(i);
            if (parseInt(d) != d) {
                pass = false;
            }
            i++;
        }
    } else {
        pass = false;
    }
    
    if (!pass) {
        msg(field, err, "Must follow A1A1A1 format")
    }

    return pass;
}

// validate email
function validateEmail() {
    var err = getError(6);
    var str = getValue("email");
    var field = getField("email");
    var pass = false;

    // reset the error msg
    reset(field, err);
    
    // email must contain an @ and . char
    var at = str.indexOf("@");
    var dot = str.lastIndexOf(".");
    if (at > 0 &&                  // @ cannot be the first char
        dot > (at + 1) &&          // . cannot preceed the @ OR be the first char after it
        dot < (str.length - 2)) {  // . cannot be the last char in the string
            pass = true;
    } else {
        msg(field, err, "Please enter a valid email address");
    }

    return pass;
}

// helper functions
// resets innerHTML
function reset(field, err) {
    err.innerHTML = "";
    field.style.border = "1px solid #232323";
    field.style.boxShadow = "0px 0px 0px"
}

// adds string to innerHTML
function msg(field, err, str) {
    err.appendChild(document.createTextNode("* " + str));
    field.style.border = "1px solid red";
    field.style.boxShadow = "0px 0px 4px red"
}

// get the correct span for respective id
function getError(z) {
    return document.getElementById("error" + z);
}

// returns the input value
function getValue(str) {
    return form[str].value;
}

// returns the input object
function getField(str) {
    return document.getElementById(str);
}
