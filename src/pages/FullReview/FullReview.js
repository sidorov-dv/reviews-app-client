import React, { useEffect, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Review from "../../components/Review/Review";
import Grid from "@mui/material/Grid";
import AddComment from "../../components/AddComment/AddComment";
import CommentsBlock from "../../components/SideBlock/CommentsBlock";
import axios from "../../axios";
import { fetchAuthMe, selectIsAuth } from "../../redux/slices/auth";

const FullReview = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchAuthMe());
    axios
      .get(`/reviews/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);

  const getUpdateReview = useCallback(async () => {
    const { data } = await axios.get(`/reviews/${id}`);
    setData(data);
  }, [id]);

  useEffect(() => {
    let timerID;
    timerID = setInterval(getUpdateReview, 5000);
    return () => {
      clearInterval(timerID);
    };
  });

  if (isLoading) {
    return <Review isLoading={isLoading} />;
  }

  return (
    <Grid sx={{ mt: 15 }} container spacing={2} justifyContent="center">
      <Grid xs={12} sm={10} item>
        <Review
          _id={data._id}
          reviewName={data.reviewName}
          subjectName={data.subjectName}
          category={data.category}
          imageUrl={data.imageUrl ? data.imageUrl : []}
          user={data.user}
          authorRating={data.authorRating}
          likes={data.likesCount}
          createdAt={data.createdAt}
          tags={data.tags}
          isFull={true}
          isEditable={false}
        >
          <ReactMarkdown children={data.text} />
        </Review>
        <CommentsBlock
          comments={data.comments}
          isLoading={!data.comments.length}
        >
          {isAuth && (
            <AddComment reviewId={id} getNewComments={getUpdateReview} />
          )}
        </CommentsBlock>
      </Grid>
    </Grid>
  );
};

export default FullReview;
