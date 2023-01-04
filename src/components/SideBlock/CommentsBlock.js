import React from "react";
import SideBlock from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import { blueGrey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

const CommentsBlock = ({ comments, children, isLoading = true }) => {
  const { t } = useTranslation();
  return (
    <SideBlock title={t("com")}>
      <List sx={{ pb: 3 }}>
        {(isLoading ? [...Array(1)] : comments).map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="center">
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar
                    alt={obj.user.nickname}
                    src={obj.user?.avatarUrl}
                    sx={{ bgcolor: blueGrey[600], fontWeight: 500 }}
                  >
                    {obj.user.nickname[0]}
                  </Avatar>
                )}
              </ListItemAvatar>
              {isLoading ? (
                <Typography variant="body2" sx={{ fontSize: 16 }}>
                  {t("com_empty")}
                </Typography>
              ) : (
                <ListItemText
                  primary={obj.user.nickname}
                  secondary={obj.textComment}
                />
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};

export default CommentsBlock;
