import React, { useState } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import GradeIcon from "@mui/icons-material/Grade";
import StarsIcon from "@mui/icons-material/Stars";
import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import UserInfo from "../UserInfo/UserInfo";
import ReviewSkeleton from "./ReviewSkeleton";
import Alert from "@mui/material/Alert";
import ReactMarkdown from "react-markdown";
import axios from "../../axios";
import {
  removeReview,
  fetchReviewsByTags,
  fetchUserReviewsByTags,
} from "../../redux/slices/reviews";
import { selectIsAuth } from "../../redux/slices/auth";
import { useTranslation } from "react-i18next";
import styles from "./Review.module.scss";

const Review = ({
  _id,
  userId,
  reviewName,
  subjectName,
  category,
  text,
  authorRating,
  subjectRating,
  likes,
  createdAt,
  imageUrl,
  user,
  tags,
  children,
  isFull,
  isLoading,
  isEditable,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [userRating, setUserRating] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [message, setMessage] = useState("");

  const findReviewsByTagHandler = (tag) => {
    if (userId) {
      dispatch(fetchUserReviewsByTags({ id: userId, tag: tag }));
    } else if (!isFull) {
      dispatch(fetchReviewsByTags(tag));
    }
  };

  const addUserRatingHandler = async () => {
    try {
      const rating = {
        userIdRating: localStorage.getItem("userId") || null,
        grade: userRating,
      };
      const { data } = await axios.patch(`/reviews/rating/${_id}`, rating);
      setMessage(data.message);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.log(err);
    }
  };

  const likeHandler = async () => {
    try {
      setIsLike(true);
      const likeUserId = localStorage.getItem("userId") || null;
      const { data } = await axios.patch(`reviews/likes/${_id}`, {
        like: likeUserId,
      });
      setMessage(data.message);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.log(err);
    }
  };

  const RemoveReviewHandler = () => {
    dispatch(removeReview(_id));
  };

  if (isLoading) {
    return <ReviewSkeleton />;
  }

  return (
    <Paper component="div" elevation={6} classes={{ root: styles.root }}>
      <UserInfo {...user} date={createdAt} likes={likes} />
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/reviews/${_id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={RemoveReviewHandler} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {Boolean(imageUrl.length) && (
        <div className={styles.imageContainer}>
          {imageUrl.map((file) => (
            <img
              key={file}
              className={clsx(styles.image, { [styles.imageFull]: isFull })}
              src={file}
              alt={reviewName}
            />
          ))}
        </div>
      )}
      <Box sx={{ p: 2 }}>
        {isFull ? (
          <Typography
            component="h5"
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "primary.dark",
              fontSize: { xs: "1.25rem", md: "1.5rem" },
            }}
          >
            {reviewName}
          </Typography>
        ) : (
          <Box sx={{ display: "inline-flex", alignItems: "center" }}>
            <Typography
              component={Link}
              to={`/reviews/${_id}`}
              sx={{
                textDecoration: "none",
                color: "primary.dark",
                fontSize: { xs: "1.25rem", md: "1.5rem" },
                fontWeight: 700,
                mr: 1,
              }}
            >
              {reviewName}
            </Typography>
            <StarsIcon color="success" sx={{ marginRight: "5px" }} />
            <Typography
              component="span"
              sx={{
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {subjectRating ? +subjectRating.toFixed(2) : ""}
            </Typography>
          </Box>
        )}
        <Typography
          sx={{ fontWeight: 500, fontSize: { xs: 18, md: "1.25rem" } }}
          component="h6"
          variant="h6"
        >
          {subjectName}
        </Typography>
        {!children && (
          <div className={styles.markdown}>
            <ReactMarkdown children={text} />
          </div>
        )}
        <Chip
          variant="outlined"
          color="error"
          size="small"
          label={category}
          sx={{ fontWeight: 500 }}
        />
        <ul className={styles.tags}>
          {tags.map((name) => (
            <li key={name} onClick={findReviewsByTagHandler.bind(null, name)}>
              #{name}
            </li>
          ))}
        </ul>
        {children && <div className={styles.markdownAll}>{children}</div>}
        <ul className={styles.reviewDetails}>
          <li>
            <GradeIcon color="warning" />
            <span>{authorRating}</span>
          </li>
          {isAuth && isFull && (
            <>
              <li>
                <Rating
                  value={userRating}
                  onChange={(event, newValue) => {
                    setUserRating(newValue);
                  }}
                  icon={<StarsIcon fontSize="inherit" color="success" />}
                  emptyIcon={<StarsOutlinedIcon fontSize="inherit" />}
                />
                <Typography
                  component="span"
                  sx={{ fontSize: 14, fontWeight: 500 }}
                >
                  {userRating}
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  color="success"
                  sx={{ mx: 1 }}
                  onClick={addUserRatingHandler}
                >
                  {t("but_n8_R")}
                </Button>
              </li>
              <li onClick={likeHandler} style={{ cursor: "pointer" }}>
                {isLike && <FavoriteIcon color="error" />}
                {!isLike && <FavoriteBorderIcon color="error" />}
              </li>
            </>
          )}
        </ul>
        {message && (
          <Alert
            sx={{
              my: 2,
              width: "40%",
            }}
            severity="warning"
          >
            {message}
          </Alert>
        )}
      </Box>
    </Paper>
  );
};

export default Review;
