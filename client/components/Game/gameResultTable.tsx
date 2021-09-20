import React, { FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IGamePageIssue } from 'utils/interfaces';

interface IGameResultsTableProps {
  issues: IGamePageIssue[];
}

const GameResultTable: FC<IGameResultsTableProps> = ({ issues }) => {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Issue name</TableCell>
            <TableCell align="center">Priority&nbsp;</TableCell>
            <TableCell align="center">Description&nbsp;</TableCell>
            <TableCell align="center">Score&nbsp;</TableCell>
            <TableCell align="center">Ratio&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {issues.map((item) => (
            <TableRow
              key={item.issue.issueName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{item.issue.issueName}</TableCell>
              <TableCell align="center">{item.issue.priority}</TableCell>
              <TableCell align="center">{item.issue.issueDescription}</TableCell>
              <TableCell align="center">{item.totalScore}</TableCell>
              <TableCell align="center">{item.score[0] ? item.score[0].ratio : '0'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default GameResultTable;