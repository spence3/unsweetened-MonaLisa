const PASSES = 'Backstage passes to a TAFKAL80ETC concert'
const SULFURAS = 'Sulfuras, Hand of Ragnaros'
const BRIE = 'Aged Brie'
const CONJURED = 'Conjured'

class Item {
  constructor(name, sellIn, quality) {
    this.name = name
    this.sellIn = sellIn
    this.quality = quality
  }
}

class Shop {
  constructor(items = []) {
    this.items = items
  }

  clamp(value, minimum, maximum){
    return Math.min(Math.max(value, minimum), maximum)
  }

  updateQuality() { 
    /*==================================*/
    /*THIS IS WHERE WE MODIFY THE CODE*/
    /*==================================*/
    var checkSellIn = this.items[0].sellIn
    var checkQuality = this.items[0].quality
    var itemName = this.items[0].name
    var currItem = this.items[0]

    //use clamp everywhere we change item quality.
    switch (itemName){
      case PASSES://factory function
        //Quality increases by 2 when there are 10 days or less
        if(checkSellIn <= 10 && checkSellIn > 5){
          currItem.quality += 2
        }

        //5 days or less quality increases by 3
        else if(checkSellIn <= 5 && checkSellIn > 0){
          currItem.quality += 3
        }

        //passed concert date
        else if(checkSellIn <= 0){
          currItem.quality = 0
        }

        else{
          currItem.quality++
        }
        break

      case SULFURAS://object initializer
        // Quality and sell in don't change with sulfuras
        currItem.sellIn++//to offset the default sellIn--
        break

      case BRIE://funciton constructor
        //Aged Brie quality doesn't pass 50
        if(checkQuality > 50){
          currItem.quality = 50
          //quality +2 after sell in date
        }
        else if(checkSellIn <= 0){
          currItem.quality += 2
        }
        else{
          currItem.quality++
        }
        // currItem.sellIn--
        break
      
      case CONJURED://class
        if (checkQuality > 0 && checkSellIn > 0){
          currItem.quality -= 2
        }
        //if quality is 1
        else if(checkQuality === 1){
          currItem.quality -= 2
        }
        //expired
        else if(checkQuality >= 2 && checkSellIn <= 0) {
          currItem.quality -= 4
        }
        break
        
      //normal items
      default://class
        if (checkQuality > 0 && checkSellIn > 0){
          currItem.quality--
        }
        //if quality is 1
        else if(checkQuality === 1){
          currItem.quality --
        }
        //expired
        else if(checkQuality >= 2 && checkSellIn <= 0) {
          currItem.quality -= 2
        }
        break
    }
    currItem.sellIn--
  }
}

function main(){
  const conjured = new Shop([new Item("Conjured", 10, 20)]);
  const normal = new Shop([new Item("brush", 10, 10)]);
    
  //Conjured starts with higher value, but same sellin value
  //as the normal item, both of them will be 0 value after 10 days
  for(let i = 0; i < 10; i++){
    normal.updateQuality();
    conjured.updateQuality()
  }

  //Normal Quality will go down to 0.
  console.log(conjured.items[0].quality)//.toBe(0);
  console.log(normal.items[0].quality)//.toBe(0);

}

main()

module.exports = {
  Item,
  Shop,
}


//elephant code graveyard

// items that aren't the main items
    // for (let i = 0; i < this.items.length; i++) {
    //    //checks for items that decrease in quality (aged brie and passes do not)
    //   if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
    //     if (this.items[i].quality > 0) {
    //       //sulfuras doesn't decrease in quality so it wouldn't apply to this
    //       if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
    //         this.items[i].quality = this.items[i].quality - 1//decreases quality of item.
    //       }
    //     }

    //     //PASSES
    //   } else {
    //     if (this.items[i].quality < 50) {
    //       this.items[i].quality = this.items[i].quality + 1 //increase quality as days pass
    //       if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
    //         if (this.items[i].sellIn < 11) {//Quality` increases by `2` when there are `10` days or less
    //           if (this.items[i].quality < 50) {//quality can't exceed 50
    //             this.items[i].quality = this.items[i].quality + 1 //increase quality if it's < 50
    //           }
    //         }
    //         if (this.items[i].sellIn < 6) {//quality increases by `3` when there are `5` days or less
    //           if (this.items[i].quality < 50) {
    //             this.items[i].quality = this.items[i].quality + 1
    //           }
    //         }
    //       }
    //     }
    //   }

    //   //!SULFURAS (never has to be sold so it doesn't need a 'sell in' value)
    //   if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
    //     this.items[i].sellIn = this.items[i].sellIn - 1//'sell in' date decreases
    //   }
    //   if (this.items[i].sellIn < 0) {
    //     if (this.items[i].name != 'Aged Brie') {
    //       if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
    //         if (this.items[i].quality > 0) {
    //           if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {//decreases in value of normal item
    //             this.items[i].quality = this.items[i].quality - 1
    //           }
    //         }
    //       } else {//'Quality` drops to `0` after the concert'
    //         this.items[i].quality = this.items[i].quality - this.items[i].quality
    //       }
    //     } else {//increase quality of aged brie
    //       if (this.items[i].quality < 50) {
    //         this.items[i].quality = this.items[i].quality + 1
    //       }
    //     }
    //   }
    // }
    // return this.items
