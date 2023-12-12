# Angular with React components

A live demo is available [here](https://wandri.github.io/angular-with-react-components/)

In order to use a React component, you can follow this implementation of [react-spreadsheet](https://github.com/iddan/react-spreadsheet) example:

1. Install the React packages

```
npm i --save react react-dom
npm i --save-dev @types/react @types/react-dom
```

2. Allow the React files in `tsconfig.json`

```json
{
  ...
  "compilerOptions": {
    ...
    "jsx": "react"
  },
  ...
}

```

3. Create your `ReactSpreadsheet.tsx` file to get the React component

```tsx
import React, {FunctionComponent} from "react";
import Spreadsheet, {CellBase, Props} from "react-spreadsheet";

export const ReactSpreadsheet: FunctionComponent<Props<CellBase>> = (props: Props<CellBase>) => {
  return <Spreadsheet data={props.data} onActivate={props.onActivate}/>
};
```

4. Create an angular component as container, and switch the extension from `.ts` to `.tsx`

```tsx
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import {createRoot, Root} from "react-dom/client";
import ReactDOM from "react-dom";
import * as React from "react";
import {ReactSpreadsheet} from "./ReactSpreadsheet";

const containerElementRef = "reactComponentContainer"

@Component({
  selector: 'app-react-component',
  standalone: true,
  imports: [],
  template: `
      <div #${containerElementRef}></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactComponentComponent implements OnChanges, OnDestroy, AfterViewInit {
  @ViewChild(containerElementRef, {static: true}) containerRef!: ElementRef;

  @Input() data: { value: string }[][] = [];
  @Output() public onSelect = new EventEmitter<{ row?: number, column?: number }>();
  root?: Root;

  constructor() {
    this.handleActivate = this.handleActivate.bind(this);
  }

  public handleActivate(value: { row?: number, column?: number }): void {
    if (this.onSelect) {
      this.onSelect.emit(value);
      this.render();
    }
  }

  ngOnChanges(): void {
    this.render();
  }

  ngAfterViewInit() {
    this.root = createRoot(this.containerRef.nativeElement);
    this.render();
  }

  ngOnDestroy() {
    ReactDOM.unmountComponentAtNode(this.containerRef.nativeElement);
  }

  private render() {
    if (this.root) {
      const {data, handleActivate} = this;
      this.root.render(
        <React.StrictMode>
          <ReactSpreadsheet
            data={data}
            onActivate={handleActivate}
          />
        </React.StrictMode>
      )
    }
  }
}
```

5. Use `<app-react-component/>` wherever you want as a normal angular component.
