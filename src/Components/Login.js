// Importing necessary dependencies and components
import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../Context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

// Defining the Login component
export default function Login() {
  // Creating refs and state variables
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Accessing authentication context
  const context = useAuth();
  const navigate = useNavigate();

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handling form submission for user login
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      // Attempting user login using authentication context
      const response = await context.login(
        emailRef.current.value,
        passwordRef.current.value
      );

      // Setting current user in the authentication context
      context.setCurrentUser(response);

      // Navigating to the home page upon successful login
      navigate("/");
    } catch (err) {
      console.log(err);
      // Displaying error message in case of login failure
      setError("Failed to log in");
    }

    setLoading(false);
  }

  // Handling Google login
  const handleGoogleLogin = async () => {
    try {
      setError("");
      setLoading(true);

      // Initiating Google sign-in using authentication context
      await context.signInWithGoogle();
    } catch (error) {
      console.error("Google Sign-In Error", error.message);
      // Displaying error message in case of Google sign-in failure
      setError("Failed to create an account");
    }

    setLoading(false);

    // Navigating to the home page after Google sign-in
    navigate("/");
  };

  // Rendering the component UI
  return (
    <div className="w-100 mt-5" style={{ maxWidth: "400px" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  ref={passwordRef}
                  required
                />
                {/* Button to toggle password visibility */}
                <Button
                  variant="outline-secondary"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </Button>
              </div>
            </Form.Group>
            {/* Button to submit the login form */}
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            {/* Link to navigate to the forgot password page */}
            <Link to="/forgotpassword">Forgot Password?</Link>
          </div>
          <p className="py-1 text-center">Or</p>
          {/* Button to initiate Google login */}
          <Button
            disabled={loading}
            className="w-100"
            onClick={handleGoogleLogin}
          >
            <i class="fa-brands fa-google"></i> Sign Up with Google
          </Button>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        {/* Link to navigate to the sign-up page */}
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
