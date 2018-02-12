import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterForName'
})
export class FilterForNamePipe implements PipeTransform {

  transform(clients: any, term?: any): any {
    //check if search term is undefined
    if (term === undefined) return clients;
    //return updated clients array
    return clients.sort();

  }

}
