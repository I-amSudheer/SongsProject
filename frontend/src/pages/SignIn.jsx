import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

function SignIn() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await login(user);

            localStorage.setItem("token", response.data);

            alert("Login Successful");

            navigate("/home");

        } catch (error) {

            alert("Invalid Credentials");

        }

    };

    return (

        <div className="min-h-screen bg-black flex items-center justify-center">

            <div className="bg-gray-900 p-8 rounded-xl shadow-2xl w-96">

                <h2 className="text-3xl font-bold text-white text-center mb-6">
                    Music Store
                </h2>

                <p className="text-gray-400 text-center mb-6">
                    Sign in to continue
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-300"
                    >
                        Login
                    </button>

                </form>

                <p className="text-gray-400 text-center mt-6">
                    Don't have an account?
                </p>

                <button
                    onClick={() => navigate("/signup")}
                    className="mt-3 w-full border border-green-500 text-green-500 hover:bg-green-500 hover:text-white py-3 rounded-lg transition duration-300"
                >
                    Create Account
                </button>

            </div>

        </div>

    );
}

export default SignIn;