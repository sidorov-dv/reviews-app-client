import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import { fetchAuthMe } from "./redux/slices/auth";
import ToggleColorMode from "./ToggleColorMode";
import SignUp from "./pages/Registration/SignUp";
import LogIn from "./pages/Login/LogIn";
import AddReview from "./pages/AddReview/AddReview";
import AdminControl from "./pages/Admin/AdminControl";
import UserReviews from "./pages/UserReviews/UserReviews";
import FullReview from "./pages/FullReview/FullReview";
import SocialGoogle from "./pages/SocialGoogle";
import SocialLinkedIn from "./pages/SocialLinkedIn";
import SearchReviews from "./pages/Search/SearchReviews";
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
    if (window.localStorage.getItem("lang") === "ru") {
      i18n.changeLanguage(window.localStorage.getItem("lang"));
    } else {
      window.localStorage.setItem("lang", "en");
      i18n.changeLanguage("en");
    }
    // eslint-disable-next-line
  }, []);

  const changeLanguageHandler = (language) => {
    window.localStorage.setItem("lang", language);
    i18n.changeLanguage(language);
  };

  return (
    <ToggleColorMode>
      <Header changeLang={changeLanguageHandler} />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminControl />} />
          <Route path="/registration" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/search" element={<SearchReviews />} />
          <Route path="/socialGoogle" element={<SocialGoogle />} />
          <Route path="/socialLinkedIn" element={<SocialLinkedIn />} />
          <Route path="/users/:id" element={<UserReviews />} />
          <Route path="/reviews/:id" element={<FullReview />} />
          <Route path="/reviews/:id/edit" element={<AddReview />} />
          <Route path="/add-review" element={<AddReview />} />
        </Routes>
      </Container>
    </ToggleColorMode>
  );
}

export default App;
