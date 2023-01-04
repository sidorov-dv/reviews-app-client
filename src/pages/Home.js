import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import Review from "../components/Review/Review";
import TagsBlock from "../components/SideBlock/TagsBlock";
import {
  fetchReviews,
  fetchTags,
  fetchReviewsByTags,
} from "../redux/slices/reviews";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const [showReviews, setShowReviews] = useState("new");
  const dispatch = useDispatch();
  const { reviews, tags } = useSelector((state) => state.reviews);

  const isReviewsLoading = reviews.status === "loading";
  const isTagsLoading = tags.status === "loading";

  useEffect(() => {
    dispatch(fetchReviews("new"));
    dispatch(fetchTags());
    // eslint-disable-next-line
  }, []);

  const handleChange = (event, newValue) => {
    setShowReviews(newValue);
    switch (newValue) {
      case "new":
        dispatch(fetchReviews("new"));
        break;
      case "popular":
        dispatch(fetchReviews("popular"));
        break;
      case "rating":
        dispatch(fetchReviews("rating"));
        break;
      default:
        dispatch(fetchReviews("new"));
    }
  };

  const findReviewsByTagsHandler = (tag) => {
    dispatch(fetchReviewsByTags(tag));
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
          <Tab value="popular" label={t("tab_n2")} />
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
        {(isReviewsLoading ? [...Array(3)] : reviews.items).map(function (
          obj,
          index
        ) {
          if (isReviewsLoading) {
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
                reviewName={obj.reviewName}
                subjectName={obj.subjectName}
                category={obj.category}
                text={obj.text}
                imageUrl={obj.imageUrl ? obj.imageUrl : []}
                user={obj.user}
                authorRating={obj.authorRating}
                subjectRating={avgRating}
                likes={obj.likesCount}
                createdAt={obj.createdAt}
                tags={obj.tags}
                isEditable={false}
                isFull={false}
              />
            );
          }
        })}
      </Grid>
    </Grid>
  );
};

export default Home;
