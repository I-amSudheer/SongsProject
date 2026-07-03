import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

function SignUp() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        // Check if passwords match
        if (user.password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {

            await register(user);

            alert("Registration Successful");

            navigate("/");

        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert("User already exists");
            } else {
                alert("Registration Failed");
            }
        }

    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">

            <div className="bg-gray-900 p-8 rounded-xl shadow-2xl w-96">

                <h2 className="text-3xl font-bold text-white text-center mb-6">
                    Create Account
                </h2>

                <p className="text-gray-400 text-center mb-6">
                    Register to access the Music Store
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
                    />

                    <div className="relative">

                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>

                    </div>

                    <div className="relative">

                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
                        />

                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                            {showConfirmPassword ? "Hide" : "Show"}
                        </button>

                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-300"
                    >
                        Register
                    </button>

                </form>

                <p className="text-gray-400 text-center mt-6">
                    Already have an account?
                </p>

                <button
                    onClick={() => navigate("/")}
                    className="mt-3 w-full border border-green-500 text-green-500 hover:bg-green-500 hover:text-white py-3 rounded-lg transition duration-300"
                >
                    Back to Login
                </button>

            </div>

        </div>
    );
}

export default SignUp;