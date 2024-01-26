// Importing necessary dependencies and components
import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../Context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

// Defining the Signup component
const Signup = () => {
  // Accessing authentication context
  const context = useAuth();

  // Creating refs and state variables
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // Accessing navigation functionality
  const navigate = useNavigate();

  // Function to handle form submission for user registration
  const handleSumbit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);

      // Attempting user registration using authentication context
      const response = await context.signUp(
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log(response);

      // Setting current user in the authentication context
      context.setCurrentUser(response);
    } catch (err) {
      console.log(err);
      // Displaying error message in case of registration failure
      setError("Failed to create an account");
    }
    setLoading(false);

    // Navigating to the home page upon successful registration
    navigate("/");
  };

  // Function to handle Google login for user registration
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

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to toggle password confirmation visibility
  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  // Rendering the component UI
  return (
    <div className="w-100 mt-5" style={{ maxWidth: "400px" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSumbit}>
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
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showPasswordConfirm ? "text" : "password"}
                  ref={passwordConfirmRef}
                  required
                />
                {/* Button to toggle password confirmation visibility */}
                <Button
                  variant="outline-secondary"
                  onClick={togglePasswordConfirmVisibility}
                >
                  {showPasswordConfirm ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </Button>
              </div>
            </Form.Group>
            {/* Button to submit the registration form */}
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Sign Up
            </Button>
          </Form>
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
        {/* Link to navigate to the login page */}
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
};

// Exporting the Signup component as the default export
export default Signup;
