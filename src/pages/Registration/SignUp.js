import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinkM from "@mui/material/Link";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { Navigate, Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Alert from "@mui/material/Alert";
import { useTranslation } from "react-i18next";

const SignUp = () => {
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
      nickname: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    try {
      const data = await dispatch(fetchRegister(values));
      if (!data.payload) {
        setError(`${t("signUPErr")}`);
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

  const submitOnGoogle = () => {
    window.open(`${REACT_APP_URL}social/auth/google`, "_self");
  };

  const submitOnLinkedIn = () => {
    window.open(`${REACT_APP_URL}social/auth/linkedIn`, "_self");
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
        <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          {t("but_n5_SP")}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label={t("user_name")}
                type="text"
                error={Boolean(errors.nickname?.message)}
                helperText={errors.nickname?.message}
                {...register("nickname", { required: `${t("name_log")}` })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={t("user_email")}
                type="email"
                error={Boolean(errors.email?.message)}
                helperText={errors.email?.message}
                {...register("email", { required: `${t("email_log")}` })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={t("user_pas")}
                type="password"
                error={Boolean(errors.password?.message)}
                helperText={errors.password?.message}
                {...register("password", {
                  required: `${t("pas_log")}`,
                })}
                fullWidth
              />
            </Grid>
          </Grid>
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
            sx={{ mt: 2, mb: 2 }}
            fullWidth
          >
            {t("but_n5_SP")}
          </Button>
          <Divider sx={{ mb: 2 }}> {t("sign_p_S")} </Divider>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="error"
                startIcon={<GoogleIcon />}
                fullWidth
                onClick={submitOnGoogle}
              >
                Google
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<LinkedInIcon />}
                fullWidth
                onClick={submitOnLinkedIn}
              >
                LinkedIn
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <LinkM
                component={Link}
                color="success.main"
                underline="hover"
                to="/login"
                sx={{ fontSize: 16, fontWeight: 500 }}
              >
                {t("sign_p_link")}
              </LinkM>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;
