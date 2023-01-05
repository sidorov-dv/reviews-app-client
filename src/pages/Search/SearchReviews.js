import React from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Review from "../../components/Review/Review";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

const SearchReviews = () => {
  const { t } = useTranslation();
  const { reviews } = useSelector((state) => state.reviews);

  const isReviewsLoading = reviews.status === "loading";

  if (!reviews.searchReviews.length) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 600,
        }}
      >
        <Alert severity="warning" sx={{ fontWeight: 700, textAlign: "center" }}>
          {t("search_gl")}
        </Alert>
      </Box>
    );
  }

  return (
    <Grid container spacing={4} sx={{ mt: 12 }} justifyContent="center">
      <Grid xs={12} sm={10} item>
        {(isReviewsLoading ? [...Array(3)] : reviews.searchReviews).map(
          function (obj, index) {
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
          }
        )}
      </Grid>
    </Grid>
  );
};

export default SearchReviews;
