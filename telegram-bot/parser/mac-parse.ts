import { JSDOM } from 'jsdom';
import * as fs from 'fs';
import { IItem } from './item.interface';
import { ICategory } from './category.interface';

function generatePersonalItemNumber(): number {
  return Math.floor(Math.random() * 100000000000);;
}

function parseDom(document: any): void {
  const tabsCont = document.querySelectorAll('.RestaurantPageMenuCategory_root');

  const categories: ICategory[] = [];

  tabsCont.forEach((tabCont: any) => {
    const categoryTitle = tabCont.querySelector('h2').textContent;
    if (categoryTitle !== 'Вы заказывали') {
      const categoryItems = tabCont.querySelectorAll('.RestaurantPageMenuCategory_item');
  
      // console.log('>>>>', categoryTitle);   
      const parsedCategoryItems: IItem[] = [];
      categoryItems.forEach((item: any) => {
        const parsedItem = parseItem(item);
        if (parsedItem !== null) {
          parsedCategoryItems.push(parsedItem);
        }
      });

      if(parsedCategoryItems.length) {
        const category: ICategory = {
          name: categoryTitle,
          items: parsedCategoryItems
        };
        categories.push(category);
      }
    }
  });

  // save to file

  fs.writeFile("mc-categories.json", JSON.stringify(categories, null, 2), (err) => {
    console.log(err);
  });
}

function parseItem(item: any): IItem | null {
  let price = item.querySelector('.UILoader_root').textContent;
  if (price !== 'Временно нет') {
    price = parseInt(price);
    const title = item.querySelector('.RestaurantPageMenuItem_title').textContent;
    const weight = item.querySelector('.RestaurantPageMenuItem_weight').textContent;
    const coverStyle = item.querySelector('.RestaurantPageMenuItem_pictureImage').getAttribute('style');
    const descriptionCont = item.querySelector('.RestaurantPageMenuItem_description');
  
    let coverUrl = null;
    let description = null;
  
    if (coverStyle !== null) {
      coverUrl = coverStyle.split('"')[1];
    }
    
    if (descriptionCont !== null) {
      description = descriptionCont.textContent;
    }
  
    const objItem: IItem = {
      personalNumber: generatePersonalItemNumber(),
      title,
      weight,
      price,
      description,
      coverUrl
    }

    return objItem;
  }

  return null;
}

fs.readFile('./htmls/mcdonalds.html', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return
  }

  const { document } = (new JSDOM(data)).window;
  parseDom(document);

})