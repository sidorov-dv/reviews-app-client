import React from "react";
import styles from "./UserInfo.module.scss";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { teal } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

const UserInfo = ({ avatarUrl = "", nickname, date, likes }) => {
  const { t } = useTranslation();
  return (
    <Paper
      classes={{ root: styles.root }}
      variant="outlined"
      sx={{
        bgcolor: "transparent",
        border: 0,
      }}
    >
      {avatarUrl && (
        <img className={styles.avatar} src={avatarUrl} alt={nickname} />
      )}
      {!avatarUrl && (
        <Avatar
          alt={nickname}
          src={avatarUrl ? avatarUrl : ""}
          sx={{
            width: 40,
            height: 40,
            mr: 4,
            bgcolor: teal[500],
            fontWeight: 500,
          }}
        />
      )}
      <Box component="div">
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: "warning.main" }}
        >
          <Typography
            component="span"
            sx={{ fontWeight: 500, color: "secondary.dark" }}
          >
            {t("user_author")}:
          </Typography>{" "}
          {nickname}
        </Typography>
        <Typography
          variant="caption"
          sx={{ fontWeight: 700, color: "warning.main", fontSize: 10 }}
        >
          <Typography
            component="span"
            sx={{ fontWeight: 500, color: "secondary.dark", fontSize: 12 }}
          >
            {t("user_date")}:{" "}
          </Typography>
          {new Date(date).toLocaleString()}
        </Typography>
      </Box>
      <Box component="div" sx={{ position: "absolute", top: 45, left: 40 }}>
        <FavoriteIcon color="error" />
        <Typography component="span" sx={{ fontWeight: 500, fontSize: 14 }}>
          {likes}
        </Typography>
      </Box>
    </Paper>
  );
};

export default UserInfo;
