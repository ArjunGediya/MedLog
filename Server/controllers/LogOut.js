exports.LogOut = async(req, res) =>  {
    try {
        // Clear the token from the client side (e.g., remove it from local storage or delete the cookie)
        res.clearCookie('token'); // Clear the token cookie

        // Clear the token from req.body
        // req.body.token = '';//no need

        // Clear the token from req.headers.authorization
        req.headers.authorization = '';

        // Optionally, you can send a response to indicate successful logout
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


