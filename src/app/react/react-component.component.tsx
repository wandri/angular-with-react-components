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
import {ReactSpreadsheet} from "./SpreadsheetProps";

const containerElementRef = "reactComponentContainer"

@Component({
  selector: 'app-react-component',
  standalone: true,
  imports: [],
  template: `
      <div #${containerElementRef}></div>`,
})
export class ReactComponentComponent implements OnChanges, OnDestroy, AfterViewInit {
  @ViewChild(containerElementRef, {static: true}) containerRef!: ElementRef;

  @Input() data: { value: string }[][] = [];
  @Output() public componentClick = new EventEmitter<void>();
  @Output() public onSelect = new EventEmitter<{ row?: number, column?: number }>();
  root?: Root;

  constructor() {
    this.handleClick = this.handleClick.bind(this);
    this.handleActivate = this.handleActivate.bind(this);
  }

  public handleClick(): void {
    this.componentClick.emit();
    this.render();
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
