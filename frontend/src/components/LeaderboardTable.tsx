import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#5D76CB",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface LeaderboardTable {
  dataArray: string[];
}

export default function LeaderboardTable() {
  const [usersArray, setUsersArray] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/leaderboard").then((r) => {
      setUsersArray(r.data);
    });
  }, []);
  return (
    <TableContainer component={Paper} sx={{ margin: "3rem", width: "1800px" }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Имя</StyledTableCell>
            <StyledTableCell align="right">Выигрыш</StyledTableCell>
            <StyledTableCell align="right">
              Использовано подсказок
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersArray.map((row) => (
            <StyledTableRow key={row["id"]}>
              <StyledTableCell component="th" scope="row">
                {row["user_name"]}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row["user_amount"]}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row["used_hints_quantity"]}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
