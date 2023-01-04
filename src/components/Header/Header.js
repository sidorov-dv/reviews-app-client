import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltSharpIcon from "@mui/icons-material/PersonAddAltSharp";
import LogoutIcon from "@mui/icons-material/Logout";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuth, logout, fetchAuthMe } from "../../redux/slices/auth";
import { globalSearchReviews } from "../../redux/slices/reviews";
import { useTranslation } from "react-i18next";
import Axios from "axios";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("lg")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: "100%",
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("lg")]: {
      width: "15ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Header = ({ changeLang }) => {
  const [textSearch, setTextSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.auth.user);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchAuthMe());
    // eslint-disable-next-line
  }, []);

  const onClickLogout = async () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userId");
    dispatch(logout());
    await Axios.get(`${REACT_APP_URL}auth/logout`);
    navigate("/");
  };

  const userHandler = () => {
    if (userData?.role === "ADMIN") {
      navigate("/admin");
    } else {
      navigate(`/users/${userData._id}`);
    }
  };

  const globalSearchHandler = (e) => {
    setTextSearch(e.target.value);
  };

  const find = async (search) => {
    dispatch(globalSearchReviews(search));
    navigate("/search");
  };

  const startSearchHandler = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      dispatch(globalSearchReviews(textSearch));
      navigate("/search");
    }
  };

  return (
    <AppBar
      color="primary"
      position="fixed"
      sx={{
        py: 1,
      }}
    >
      <Toolbar>
        <Box sx={{ display: { xs: "none", sm: "inline-block" } }}>
          <Link to="/">
            <IconButton size="large" edge="start" sx={{ mr: 1 }}>
              <MovieFilterIcon sx={{ mr: 1, color: "#1adb37" }} />
              <LibraryMusicIcon sx={{ mr: 1, color: "#db1adb" }} />
              <SportsEsportsIcon sx={{ color: "#ccac00" }} />
            </IconButton>
          </Link>
        </Box>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", lg: "block" } }}
        >
          {t("head_t")}
        </Typography>
        <Search sx={{ mr: 1 }}>
          <SearchOutlinedIcon
            sx={{
              position: "absolute",
              top: "20%",
              left: "10px",
              zIndex: 10,
              cursor: "pointer",
            }}
            onClick={() => find(textSearch)}
          />
          <StyledInputBase
            value={textSearch}
            onChange={globalSearchHandler}
            placeholder={t("search_n1")}
            inputProps={{ "aria-label": "search" }}
            onKeyDown={startSearchHandler}
          />
        </Search>
        {isAuth ? (
          <>
            <Button
              variant="contained"
              color="secondary"
              onClick={userHandler}
              sx={{
                mx: 1,
                textAlign: "center",
                minWidth: 130,
                display: { xs: "none", md: "inline-block" },
              }}
            >
              {userData?.role === "ADMIN"
                ? `${t("but_n6_A")}`
                : `${t("but_n1_MR")}`}
            </Button>
            <Button
              variant="contained"
              color="warning"
              component={Link}
              to="/add-review"
              sx={{
                mx: 1,
                textAlign: "center",
                minWidth: 156,
                display: { xs: "none", md: "inline-block" },
              }}
            >
              {t("but_n2_CR")}
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={onClickLogout}
              sx={{
                ml: 1,
                textAlign: "center",
                minWidth: 92,
                display: { xs: "none", md: "inline-block" },
              }}
            >
              {t("but_n3_LOG")}
            </Button>
            <Button
              onClick={userHandler}
              sx={{ display: { xs: "inline", md: "none" } }}
            >
              <AdminPanelSettingsIcon
                color="secondary"
                sx={{
                  fontSize: 45,
                  verticalAlign: "middle",
                }}
              />
            </Button>
            <Link to="/add-review">
              <NoteAddIcon
                color="warning"
                sx={{
                  fontSize: 45,
                  verticalAlign: "middle",
                  display: { xs: "inline", md: "none" },
                }}
              />
            </Link>
            <Button
              onClick={onClickLogout}
              sx={{ display: { xs: "inline", md: "none" } }}
            >
              <LogoutIcon
                color="error"
                sx={{
                  fontSize: 45,
                  verticalAlign: "middle",
                }}
              />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/login"
              sx={{
                mx: 1,
                textAlign: "center",
                minWidth: 100,
                display: { xs: "none", md: "inline-block" },
              }}
            >
              {t("but_n4_LN")}
            </Button>
            <Button
              variant="contained"
              color="success"
              component={Link}
              to="/registration"
              sx={{
                ml: 1,
                textAlign: "center",
                minWidth: 140,
                display: { xs: "none", md: "inline-block" },
              }}
            >
              {t("but_n5_SP")}
            </Button>
            <Link to="/login">
              <LoginIcon
                color="warning"
                sx={{
                  fontSize: 45,
                  mr: 2,
                  verticalAlign: "middle",
                  display: { xs: "inline", md: "none" },
                }}
              />
            </Link>
            <Link to="/registration">
              <PersonAddAltSharpIcon
                color="error"
                sx={{
                  fontSize: 45,
                  verticalAlign: "middle",
                  display: { xs: "inline", md: "none" },
                }}
              />
            </Link>
          </>
        )}
        <ButtonGroup
          sx={{ ml: 2 }}
          variant="contained"
          orientation="vertical"
          size="small"
          aria-label="outlined button group"
        >
          <Button color="info" onClick={() => changeLang("en")}>
            {t("but_n13_LG")}
          </Button>
          <Button color="info" onClick={() => changeLang("ru")}>
            {t("but_n14_LG")}
          </Button>
        </ButtonGroup>
      </Toolbar>
      <IconButton
        onClick={() => navigate("/")}
        color="primary"
        aria-label="home"
        sx={{
          position: "fixed",
          bottom: 60,
          right: 4,
          zIndex: 30,
          display: { xs: "inline-block", sm: "none" },
        }}
      >
        <HomeIcon sx={{ fontSize: 36 }} />
      </IconButton>
    </AppBar>
  );
};

export default Header;
