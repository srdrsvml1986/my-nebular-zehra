import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {

 /**
     * @param {?} items object from array
     * @param {?} term term's search
     * @return {?}
     */
 transform(items, term) {
  if (!term || !items)
      return items;
  return FilterPipe.filter(items, term);
}
      /**
     *
     * @param {?} items List of items to filter
     * @param {?} term  a string term to compare with every property of the list
     *
     * @return {?}
     */
      static filter(items, term) {
        const /** @type {?} */ toCompare = term.toLowerCase();
        /**
         * @param {?} item
         * @param {?} term
         * @return {?}
         */
        function checkInside(item, term) {
            for (let /** @type {?} */ property in item) {
                if (item[property] === null || item[property] == undefined) {
                    continue;
                }
                console.log(property);
                
                if (property!="menu") {
                    continue;
                }
                if (typeof item[property] === 'object') {
                    if (checkInside(item[property], term)) {
                        return true;
                    }
                }
                if (item[property].toString().toLowerCase().includes(toCompare)) {
                    return true;
                }
            }
            return false;
        }
        return items.filter(function (item) {
            return checkInside(item, term);
        });
    }
}
