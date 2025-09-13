export const generateToken = async (user, message, statusCode, res) => {
  const token = await user.generateAccessToken();
  const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";
  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() +  Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .send({
      success: true,
      message,
      user,
      token,
    });
};
