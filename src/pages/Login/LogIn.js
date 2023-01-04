import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import LinkM from "@mui/material/Link";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { useForm } from "react-hook-form";
import { Navigate, Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useTranslation } from "react-i18next";

const LogIn = () => {
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    try {
      const data = await dispatch(fetchAuth(values));
      if (!data.payload) {
        setError(`${t("loginErr")}`);
        setTimeout(() => setError(""), 3000);
        return;
      }
      if ("token" in data.payload) {
        window.localStorage.setItem("token", data.payload.token);
      }
      if (data.payload.user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate(`/users/${data.payload.user._id}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          {t("login_p")}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            sx={{ mb: 3 }}
            label={t("user_email")}
            type="email"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register("email", { required: `${t("email_log")}` })}
            fullWidth
          />
          <TextField
            sx={{ mb: 3 }}
            label={t("user_pas")}
            type="password"
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register("password", {
              required: `${t("pas_log")}`,
            })}
            fullWidth
          />
          {error && (
            <Alert sx={{ my: 2 }} severity="error">
              {error}
            </Alert>
          )}
          <Button
            disabled={!isValid}
            type="submit"
            size="large"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 3 }}
          >
            {t("but_n4_LN")}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <LinkM
                component={Link}
                color="primary.main"
                underline="hover"
                to="/registration"
                sx={{ fontSize: 16, fontWeight: 500 }}
              >
                {t("login_p_link")}
              </LinkM>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default LogIn;
