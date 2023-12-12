import React, {FunctionComponent} from "react";
import Spreadsheet, {CellBase, Props} from "react-spreadsheet";

export const ReactSpreadsheet: FunctionComponent<Props<CellBase>> = (props: Props<CellBase>) => {
  return <Spreadsheet data={props.data} onActivate={props.onActivate}/>
};
