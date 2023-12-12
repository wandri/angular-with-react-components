import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewChild
} from "@angular/core";
import * as React from "react";
import ReactDOM from 'react-dom';
import {createRoot, Root} from "react-dom/client";
import {ReactSpreadsheet} from "./SpreadsheetProps";

const containerElementRef = "customReactComponentContainer";

@Component({
  selector: "imbarco-react-spreadsheet",
  template: `
      <div #${containerElementRef}></div>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpreadsheetWrapper implements OnChanges, OnDestroy, AfterViewInit {
  @ViewChild(containerElementRef, {static: true}) containerRef!: ElementRef;

  @Input() data: { value: string }[][] = [];
  @Output() public onActivate = new EventEmitter();
  private root?: Root;

  constructor() {
    this.handleActivate = this.handleActivate.bind(this);
  }

  public handleActivate(value: any) {
    if (this.onActivate) {
      this.onActivate.emit(value);
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
      const {data} = this;
      this.root.render(
        <React.StrictMode>
          <ReactSpreadsheet
            data={data}
            onActivate={this.handleActivate}
          />
        </React.StrictMode>
      )
    }
  }
}
