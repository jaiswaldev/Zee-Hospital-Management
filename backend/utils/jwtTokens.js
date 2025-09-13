import jwt from "jsonwebtoken";

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role }, // 👈 include userId here
    process.env.JWT_SECRET,
    { expiresIn: "1d" } // or use COOKIE_EXPIRE if you want the same
  );
};
