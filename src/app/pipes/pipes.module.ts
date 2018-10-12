import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsPipe } from './tools/tools.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ 
    ToolsPipe
  ],
  exports: [
    ToolsPipe
  ]
})
export class PipesModule { }
