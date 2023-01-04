import React, { useEffect } from "react";
import Alert from "@mui/material/Alert";
import axios from "axios";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

const SocialGoogle = () => {
  const { t } = useTranslation();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/successGoogle`);
        if ("token" in data.user) {
          window.localStorage.setItem("token", data.user.token);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => window.location.assign("http://localhost:3000"), 3000);
      }
    };
    fetchUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Alert severity="info">{t("soc_acc")}</Alert>
    </Box>
  );
};

export default SocialGoogle;
