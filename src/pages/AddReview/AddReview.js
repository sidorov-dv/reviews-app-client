import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import SimpleMDE from "react-simplemde-editor";
import { selectIsAuth } from "../../redux/slices/auth";
import { Navigate, useNavigate, useParams, Link } from "react-router-dom";
import "easymde/dist/easymde.min.css";
import axios from "../../axios";
import Axios from "axios";
import styles from "./AddReview.module.scss";
import { useTranslation } from "react-i18next";

const words = [
  { id: 1, title: "Movies" },
  { id: 2, title: "Music" },
  { id: 3, title: "Games" },
  { id: 4, title: "Books" },
  { id: 5, title: "Wondeful" },
  { id: 6, title: "Crazy" },
  { id: 7, title: "Ridiculous" },
  { id: 8, title: "Amazing" },
  { id: 9, title: "Masterpiece" },
];

const baseStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 3,
  borderColor: "grey",
  borderStyle: "dashed",
  backgroundColor: "rgb(238, 233, 233)",
  color: "grey",
  fontSize: 18,
  fontWeight: 500,
  transition: "border .3s ease-in-out",
  cursor: "pointer",
  marginBottom: 20,
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const defaultProps = {
  options: words.map((option) => option.title),
};

const AddReview = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [reviewName, setReviewName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [authorRating, setAuthorRating] = useState(null);
  const userId = useRef("");

  const isEditing = Boolean(id);

  const onClickRemoveImage = () => {
    setImageUrl([]);
  };

  const onChange = useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      const fields = {
        reviewName,
        subjectName,
        category,
        imageUrl,
        tags,
        text,
        authorRating,
        user: userId.current,
      };
      const { data } = isEditing
        ? await axios.patch(`/reviews/${id}`, fields)
        : await axios.post("/reviews", fields);
      const _id = isEditing ? id : data._id;
      navigate(`/reviews/${_id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const url = "https://api.cloudinary.com/v1_1/dutrxxv4n/upload/";

    acceptedFiles.forEach(async (acceptedFile) => {
      const formData = new FormData();
      formData.append("file", acceptedFile);
      formData.append("upload_preset", "gallery");
      const { data } = await Axios.post(url, formData);
      setImageUrl((prev) => [...prev, data.secure_url]);
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "200px",
      autofocus: true,
      placeholder: "Enter text ...",
      status: false,
      autosave: {
        enabled: true,
        delay: 7000,
        uniqueId: "ID1",
      },
    }),
    []
  );

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      userId.current = localStorage.getItem("userId");
    }
    if (id) {
      axios
        .get(`/reviews/${id}`)
        .then(({ data }) => {
          setReviewName(data.reviewName);
          setSubjectName(data.subjectName);
          setCategory(data.category);
          setTags(data.tags);
          setText(data.text);
          setImageUrl(data.imageUrl);
          setAuthorRating(data.authorRating);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line
  }, []);

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper
      style={{
        padding: 20,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 110,
        marginBottom: 20,
        maxWidth: 1000,
      }}
      elevation={6}
    >
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className={styles.text}>{t("drag_n2")}</p>
        ) : (
          <p className={styles.text}>{t("drag_n1")}</p>
        )}
        <div className={styles.blockImages}>
          {imageUrl.map((item) => (
            <img key={item} src={item} alt="loaded" />
          ))}
        </div>
      </div>
      {Boolean(imageUrl.length) && (
        <Button
          variant="contained"
          color="error"
          onClick={onClickRemoveImage}
          sx={{ mb: 2 }}
        >
          {t("but_n12_DI")}
        </Button>
      )}
      <TextField
        classes={{ root: styles.reviewName }}
        variant="standard"
        placeholder={t("rev_name")}
        value={reviewName}
        onChange={(e) => setReviewName(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.subjectName }}
        variant="standard"
        placeholder={t("sub_name")}
        value={subjectName}
        onChange={(e) => setSubjectName(e.target.value)}
        fullWidth
      />
      <FormControl variant="standard" sx={{ mt: 1, minWidth: 150 }}>
        <InputLabel id="simple-select-label">{t("cat")}</InputLabel>
        <Select
          autoWidth
          labelId="simple-select-label"
          id="simple-select"
          value={category}
          label={t("cat")}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value={"Movies"}>{t("cat_n1")}</MenuItem>
          <MenuItem value={"Music"}>{t("cat_n2")}</MenuItem>
          <MenuItem value={"Games"}>{t("cat_n3")}</MenuItem>
          <MenuItem value={"Books"}>{t("cat_n4")}</MenuItem>
        </Select>
      </FormControl>
      <Autocomplete
        {...defaultProps}
        sx={{ my: 1.5 }}
        id="autocomplete"
        fullWidth
        autoComplete
        autoHighlight
        autoSelect
        freeSolo
        multiple
        value={tags}
        onChange={(event, newValue) => {
          setTags(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label={t("tags_n1")} variant="standard" />
        )}
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <Typography component="legend">{t("auth_rat")}</Typography>
      <Rating
        sx={{ mb: 2 }}
        max={10}
        value={authorRating}
        onChange={(event, newValue) => {
          setAuthorRating(newValue);
        }}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} variant="contained">
          {isEditing ? `${t("but_n11_SE")}` : `${t("but_n9_P")}`}
        </Button>
        <Button
          variant="contained"
          color="warning"
          component={Link}
          to={userId.current ? `/users/${userId.current}` : `/`}
        >
          {t("but_n10_C")}
        </Button>
      </div>
    </Paper>
  );
};

export default AddReview;
