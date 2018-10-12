import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toolsFilter'
})
export class ToolsPipe implements PipeTransform {

  transform(tools: any[], searchText: string): any[] {
    if(!tools) return [];
    if(!searchText) return tools;
    searchText = searchText.toLowerCase();
    return tools.filter( tool => {
          return tool.name.toLowerCase().includes(searchText);
    });
  }

}
