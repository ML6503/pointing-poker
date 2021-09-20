import React, { FC } from "react";
import FileSaver from "file-saver";
import * as xlxs from "xlsx";
import { Button } from "@material-ui/core";
import { nanoid } from "nanoid";
import { IExportCSV, IIssueResultConverted } from "utils/interfaces";

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

const ExportCSV: FC<IExportCSV> = ({ issues }) => {
  const issuesConvert = issues.map<IIssueResultConverted>((item) => ({
    IssueName: item.issue.issueName,
    Priority: item.issue.priority,
    Description: item.issue.issueDescription,
    Score: item.totalScore,
    Ratio: item.score[0] ? item.score[0].ratio : 0,
}));

  const exportToCSV = (issuesData: IIssueResultConverted[], nameFile: string): void => {
    const ws = xlxs.utils.json_to_sheet(issuesData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = xlxs.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, nameFile + fileExtension);
  };

  return (
    <Button
      color="primary"
      variant="contained"
      fullWidth
      onClick={() => exportToCSV(issuesConvert, nanoid())}
    >
      Export
    </Button>
  );
};

export default ExportCSV;
