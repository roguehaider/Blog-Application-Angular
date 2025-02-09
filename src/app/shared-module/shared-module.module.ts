import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../Pipes/truncate.pipe';
import { HighlightPipe } from '../Pipes/highlight.pipe';



@NgModule({
  declarations: [TruncatePipe],
  imports: [
    CommonModule
  ],
  exports:[TruncatePipe],})
export class SharedModuleModule { }
