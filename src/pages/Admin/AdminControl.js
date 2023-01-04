import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { fetchAllUsers, selectIsAuth } from "../../redux/slices/auth";
import { useTranslation } from "react-i18next";

const AdminControl = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userDataBase = useSelector((state) => state.auth.allUsers);

  useEffect(() => {
    dispatch(fetchAllUsers());
    // eslint-disable-next-line
  }, []);

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 20, mx: "auto" }} elevation={6}>
      <Table
        sx={{ maxWidth: 1000, mx: "auto" }}
        aria-label="simple table"
        stickyHeader
      >
        <TableHead>
          <TableRow>
            <TableCell align="left">{t("user_email")}</TableCell>
            <TableCell align="center">{t("user_name")}</TableCell>
            <TableCell align="center">{t("user_role")}</TableCell>
            <TableCell align="center">{t("date_cr")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userDataBase.length > 0 &&
            userDataBase.map((user) => (
              <TableRow
                key={user._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="left">
                  <Link
                    to={`/users/${user._id}`}
                    style={{
                      textDecoration: "none",
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {user.email}
                  </Link>
                </TableCell>
                <TableCell align="center">{user.nickname}</TableCell>
                <TableCell align="center">{user.role}</TableCell>
                <TableCell align="center">
                  {new Date(user.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminControl;
