import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../service/ApiService";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container, TextField } from "@mui/material";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const res = await auth(user); // this now returns token + user
      console.log("res and res.token: ", res, res.token);
      if (res && res.token) {
        localStorage.setItem("Loginstatus", "true");

        // role-based redirect
        if (res.user.role === "MANAGER") {
          navigate("/dashboard/manager");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError("Invalid login response");
      }
    } catch (err) {
      setError("Incorrect credentials!");
      console.error(err);
    }
  }

  function changeHandler(event) {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5eadb",
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={15} style={{ padding: "20px", textAlign: "center" }}>
          <Container maxWidth="lg" style={{ margin: "auto" }}>
            <Box
              component="form"
              noValidate
              onSubmit={submitHandler}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                value={user.email}
                onChange={changeHandler}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={user.password}
                onChange={changeHandler}
              />
              {error && (
                <Typography color="error" variant="body2" sx={{ mt: 1, mb: 1 }}>
                  {error}
                </Typography>
              )}
              <Button type="submit" variant="contained" sx={{ mt: 1, mb: 1 }}>
                Sign In
              </Button>
            </Box>
          </Container>
        </Paper>
      </Container>
    </div>
  );
}

export default Login;
