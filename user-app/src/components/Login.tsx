import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import {
  Container,
  Button,
  TextField,
  Paper,
  Typography,
  Grid,
  IconButton,
  InputAdornment
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { VisibilityOff, Visibility } from "@mui/icons-material";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (email: string): boolean => {
    if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email address.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password: string): boolean => {
    if (password.trim() === '') {
      setPasswordError("Password cannot be blank.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success("Login Successful!", { position: "bottom-right" });
      navigate("/user");
    } catch (err: any) {
      toast.error(err.response?.data.message || "Error occurred", { position: "bottom-right" });
    }
  };

  const handleShowPassword = () => {
    setShowPassword(show => !show);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
            <Typography component="h1" variant="h5" align="center">
              Login
            </Typography>
            <form onSubmit={handleSubmit} style={{ marginTop: "20px" }} autoComplete="off">
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Email"
                name="email"
                autoFocus
                error={!!emailError}
                helperText={emailError}
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                onBlur={() => validateEmail(email)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                error={!!passwordError}
                helperText={passwordError}
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                onBlur={() => validatePassword(password)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ margin: "20px 0" }}
              >
                Login
              </Button>
            </form>
            <Grid container justifyContent="center" style={{ marginTop: "16px" }}>
              <Typography variant="body2">
                Don't have an account?{' '}
                <Link to="/" style={{ textDecoration: 'none' }}>
                  Register
                </Link>
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
