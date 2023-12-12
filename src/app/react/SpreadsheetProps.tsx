import React, {FunctionComponent} from "react";
import Spreadsheet from "react-spreadsheet";

export interface SpreadsheetProps {
  data: { value: string }[][];
  onActivate?: (value: { row?: number, column?: number }) => void;
}

export const ReactSpreadsheet: FunctionComponent<SpreadsheetProps> = (props: SpreadsheetProps) => {
  return <Spreadsheet data={props.data} onActivate={props.onActivate}/>
};
