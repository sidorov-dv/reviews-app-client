import React, { useEffect, useState } from "react";
import Review from "../../components/Review/Review";
import TagsBlock from "../../components/SideBlock/TagsBlock";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchTags,
  fetchUserReviews,
  fetchSortingUserReviews,
  fetchUserReviewsByTags,
} from "../../redux/slices/reviews";
import { useTranslation } from "react-i18next";

const UserReviews = () => {
  const [showReviews, setShowReviews] = useState("new");
  const { id } = useParams();
  const { tags } = useSelector((state) => state.reviews);
  const { userReviews: reviews, status } = useSelector(
    (state) => state.reviews.reviews
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isTagsLoading = tags.status === "loading";
  const isUserReviewsLoading = status === "loading";

  let urlParams = { id: id, sort: null, tag: null };

  useEffect(() => {
    localStorage.setItem("userId", id);
    dispatch(fetchTags());
    dispatch(fetchUserReviews(id));
    // eslint-disable-next-line
  }, []);

  const findReviewsByTagsHandler = (tag) => {
    dispatch(fetchUserReviewsByTags({ ...urlParams, tag: tag }));
  };

  const handleChange = (event, newValue) => {
    setShowReviews(newValue);
    switch (newValue) {
      case "new":
        dispatch(fetchSortingUserReviews({ ...urlParams, sort: "new" }));
        break;
      case "rating":
        dispatch(fetchSortingUserReviews({ ...urlParams, sort: "rating" }));
        break;
      default:
        dispatch(fetchSortingUserReviews({ ...urlParams, sort: "new" }));
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center" sx={{ mt: 8 }}>
      <Grid xs={10} item>
        <Tabs
          sx={{ my: 1 }}
          value={showReviews}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="secondary"
        >
          <Tab value="new" label={t("tab_n1")} />
          <Tab value="rating" label={t("tab_n3")} />
        </Tabs>
      </Grid>
      <Grid xs={10} item>
        <TagsBlock
          items={tags.items}
          isLoading={isTagsLoading}
          findReviewsByTags={findReviewsByTagsHandler}
        />
      </Grid>
      <Grid xs={10} item>
        {(isUserReviewsLoading ? [...Array(3)] : reviews).map(function (
          obj,
          index
        ) {
          if (isUserReviewsLoading) {
            return <Review key={index} isLoading={true} />;
          } else {
            let avgRatingSum = obj.subjectRating
              .map((obj) => obj?.grade)
              .reduce((acc, item) => acc + item, 0);
            let avgRating = avgRatingSum / obj.subjectRating.length;
            return (
              <Review
                key={obj._id}
                _id={obj._id}
                userId={id}
                user={obj.user}
                reviewName={obj.reviewName}
                subjectName={obj.subjectName}
                category={obj.category}
                text={obj.text}
                imageUrl={obj.imageUrl ? obj.imageUrl : []}
                authorRating={obj.authorRating}
                subjectRating={avgRating}
                likes={obj.likesCount}
                createdAt={obj.createdAt}
                tags={obj.tags}
                isEditable={true}
                isFull={false}
              />
            );
          }
        })}
      </Grid>
    </Grid>
  );
};

export default UserReviews;
