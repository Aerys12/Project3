export const validateUsername = (username) => {
	const pattern = /^[a-zA-Z0-9_]{6,}$/;
	if (!pattern.test(username)) {
		return { valid: false, message: "Username is invalid" };
	} else {
		return { valid: true, message: "" };
	}
};

export const validateEmail = (email) => {
	const emailPattern =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,6})+$/;
	const isValid = emailPattern.test(email) && !email.includes("..");

	if (email.length === 0 || isValid) {
		return { valid: true, message: "" };
	} else {
		return { valid: false, message: "Email is invalid" };
	}
};

export const validatePasswords = (password1, password2) => {
    const passwordPattern =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    let password1Valid = passwordPattern.test(password1);
    let passwordsMatch = password1 === password2;

    return {
        password1: {
            valid: password1Valid,
            message: password1Valid ? "" : "Password is invalid",
        },
        password2: {
            valid: passwordsMatch,
            message: passwordsMatch ? "" : "Passwords don't match.",
        },
    };
};

export const validatePhone = (phone) => {
	const phonePattern = /^\d{3}-\d{3}-\d{4}$/;

	if (phone.length > 0 && !phonePattern.test(phone)) {
		return { valid: false, message: "Phone is invalid" };
	} else {
		return { valid: true, message: "" };
	}
};
