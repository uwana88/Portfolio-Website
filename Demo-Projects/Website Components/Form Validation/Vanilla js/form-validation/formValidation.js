const nameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const numberRegex = /^\d{10,}$/;
const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


let full_name, email, number, pass, pass_c, submitButton, nameLabel, emailLabel, numberLabel, passLabel, passCLabel, submitMessage, form;

document.addEventListener("DOMContentLoaded", () => {
    full_name = document.getElementById("form_name");
    email = document.getElementById("form_email");
    number = document.getElementById("form_number");
    pass = document.getElementById("form_pass");
    pass_c = document.getElementById("form_pass_c");
    nameLabel = document.getElementById("form_name_label");
    emailLabel = document.getElementById("form_email_label");
    numberLabel = document.getElementById("form_number_label");
    passLabel = document.getElementById("form_pass_label");
    passCLabel = document.getElementById("form_pass_c_label");
    submitButton = document.getElementById("form_button");
    closeButton = document.getElementById("close_button");
    submitMessage = document.getElementById("submit_message");
    form = document.getElementById("form");
    submitButton.disabled = true;
});

document.addEventListener("blur", (event) => {
    let value = getValues(event.target);
    if (value) validateForm(value);
}, true);

document.addEventListener("input", (event) => {
    if (event.target === pass_c) {
        validateForm("pass_c");
    }
 });

function getValues(value) {
    if (value === full_name) {
        return "name";
    } else if (value === email) {
        return "email";
    } else if (value === number) {
        return "num";
    } else if (value === pass) {
        return "pass";
    } else if (value === pass_c) {
        return "pass_c";
    }
    return null;
}

function validateForm(value) {

    if (full_name.value.length !== 0){
        if (!nameRegex.test(full_name.value)) {
            nameLabel.innerHTML = "Only letters and spaces are allowed.";
            nameLabel.style.color = "red";
        } else {
            nameLabel.innerHTML = "";
        }
    }else if(value === "name"){
        nameLabel.innerHTML = "Name is required.";
        nameLabel.style.color = "red";
    }

    if (email.value.length !== 0) {
        if (!emailRegex.test(email.value)) {
            emailLabel.innerHTML = "Invalid email format.";
            emailLabel.style.color = "red";
        } else {
            emailLabel.innerHTML = "";
        }
    }else if(value === "email"){
        emailLabel.innerHTML = "Email is required.";
        emailLabel.style.color = "red";
    }

    if (number.value.length !== 0) {
        if (!numberRegex.test(number.value)) {
            numberLabel.innerHTML = "Invalid phone number. Must be 10 digits.";
            numberLabel.style.color = "red";
        } else {
            numberLabel.innerHTML = "";
        }
    }else if(value === "num"){
        numberLabel.innerHTML = "Phone number is required.";
        numberLabel.style.color = "red";
    }

    if (pass.value.length !== 0) {
        if (!passRegex.test(pass.value)) {
            passLabel.innerHTML = "Password must be at least 8 characters, including letters and numbers.";
            passLabel.style.color = "red";
        } else {
            passLabel.innerHTML = "";
        }
    }else if(value === "pass"){
        passLabel.innerHTML = "Password is required.";
        passLabel.style.color = "red";
    }

    if (pass_c.value.length !== 0) {
        if (pass.value !== pass_c.value) {
            passCLabel.innerHTML = "Passwords do not match.";
            passCLabel.style.color = "red";
        } else {
            passCLabel.innerHTML = "";
        }
    }else if(value === "pass_c"){
        passCLabel.innerHTML = "Please confirm your password.";
        passCLabel.style.color = "red";
    }

    if (nameRegex.test(full_name.value) && emailRegex.test(email.value) && numberRegex.test(number.value) && passRegex.test(pass.value) && pass.value === pass_c.value
    && full_name.value.length !== 0 && email.value.length !== 0 && number.value.length !== 0 && pass.value.length !== 0 && pass_c.value.length !== 0) {
        submitButton.disabled = false; 
        return true;
    }else submitButton.disabled = true;
    
    return false;
}

function send() {
    if (validateForm()) {
        form.style.display = "none";
        submitMessage.style.display = "flex";

        full_name.value = "";
        email.value = "";
        number.value = "";
        pass.value = "";
        pass_c.value = "";

        nameLabel.innerHTML = "";
        emailLabel.innerHTML = "";
        numberLabel.innerHTML = "";
        passLabel.innerHTML = "";
        passCLabel.innerHTML = "";
        
        submitButton.disabled = true; 
    }else return;
}

function closeMessage() {
    form.style.display = "flex";
    submitMessage.style.display = "none"; 
    validateForm();
}

