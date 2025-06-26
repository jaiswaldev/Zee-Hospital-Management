import {ApiError} from "../utils/ApiError.js"

export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validatePassword(password) {
    if (!password) {
        throw new ApiError(400, "Password is required.");
    }
    const minLength = 8;
    const maxLength = 16;
    const lengthRegex = new RegExp(`^.{${minLength},${maxLength}}$`);
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /\d/;
    const specialCharRegex = /[@$!%*?&]/;
    const whitespaceRegex = /\s/;

    if (!lengthRegex.test(password)) {
        throw new ApiError(400,"Password must be between 8 to 16 characters!!")
    }
    if (!uppercaseRegex.test(password)) {
        throw new ApiError(400,"Password must include at least one uppercase letter!!")
    }
    if (!lowercaseRegex.test(password)) {
        throw new ApiError(400,"Password must include at least one lowercase letter!!")
    }
    if (!numberRegex.test(password)) {
        throw new ApiError(400,"Password must include at least one number!!")
    }
    if (!specialCharRegex.test(password)) {
        throw new ApiError(400,"Password must include at least one special character like (@, $, !, %, *, ?, &)!!")
    }
    if (whitespaceRegex.test(password)) {
        throw new ApiError(400,"Password must not include whitespace characters!!")
    }
}