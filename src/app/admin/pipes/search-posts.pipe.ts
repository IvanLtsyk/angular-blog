import { Pipe, PipeTransform } from '@angular/core';
import {Post} from "../../shared/interfaces";

@Pipe({
  name: 'searchPosts'
})
export class SearchPostsPipe implements PipeTransform {

  transform(value: Post[], search: string): Post[] {
    if (!search.trim()){
      return value;
    }

    return value.filter(m=>m.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  }

}
