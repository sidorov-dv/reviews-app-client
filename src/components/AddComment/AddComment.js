import React from "react";
import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { green } from "@mui/material/colors";
import axios from "../../axios";
import { useTranslation } from "react-i18next";

const AddComment = ({ reviewId, getNewComments }) => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      textComment: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    try {
      const userComment = {
        ...values,
        user: {
          nickname: user.nickname,
          role: user.role,
          avatarUrl: user.avatarUrl || "",
        },
      };
      await axios.patch(`/reviews/comments/${reviewId}`, userComment);
      resetField("textComment");
      setTimeout(getNewComments, 750);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          alt={user.nickname}
          src={user.avatarUrl ? user.avatarUrl : ""}
          sx={{ bgcolor: green[600], fontWeight: 500 }}
        >
          {user.nickname[0]}
        </Avatar>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            error={Boolean(errors.textComment?.message)}
            helperText={errors.textComment?.message}
            {...register("textComment", { required: `${t("text")}` })}
            label={t("wr_com")}
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button variant="contained" disabled={!isValid} type="submit">
            {t("but_n7_Sub")}
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddComment;
