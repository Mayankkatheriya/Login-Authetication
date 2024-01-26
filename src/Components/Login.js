import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../Context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const context = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const response = await context.login(
        emailRef.current.value,
        passwordRef.current.value
      );
      context.setCurrentUser(response);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Failed to log in");
    }

    setLoading(false);
  }

  const handleGoogleLogin = async () => {
    try {
      setError("");
      setLoading(true);
      await context.signInWithGoogle();
    } catch (error) {
      console.error("Google Sign-In Error", error.message);
      setError("Failed to create an account");
    }
    setLoading(false);
    navigate("/");
  };

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
                <Button
                  variant="outline-secondary"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                </Button>
              </div>
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgotpassword">Forgot Password?</Link>
          </div>
          <p className="py-1 text-center">Or</p>
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
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
