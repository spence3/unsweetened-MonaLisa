const PASSES = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const BRIE = 'Aged Brie';
const CONJURED = 'Conjured';

class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

//factory function
function Passes(name, sellIn, quality){
  return{
    name,
    sellIn,
    quality,
    updateQuality: function () {
      if(this.sellIn <= 10 && this.sellIn > 5){
        this.quality += 2
      }
      //5 days or less quality increases by 3
      else if(this.sellIn <= 5 && this.sellIn > 0){
        this.quality += 3
      }
      //passed concert date
      else if(this.sellIn <= 0){
        this.quality = 0
      }
      else{
        this.quality++
      }
      this.sellIn--;
    }
  };
}

//Object Initializer
const Sulfuras = {
  name: 'Sulfuras',
  sellIn: 10,
  quality: 80,
  updateQuality() {
    // Sulfuras never changes
  }
}

//Function Constructor
function AgedBrie(name, sellin, quality) {
  this.name = name,
  this.sellIn = sellin,
  this.quality = quality,
  this.updateQuality = function() {
    //Aged Brie quality doesn't pass 50
    if(this.quality > 50){
      this.quality = 50
      //quality +2 after sell in date
    }
    else if(this.sellIn <= 0){
      this.quality += 2
    }
    else{
      this.quality++
    }
    // currItem.sellIn--
    this.sellIn--;
  };
}

class Conjured extends Item {
  updateQuality() {
    if (this.quality > 0 && this.sellIn > 0){
      this.quality -= 2
    }
    //if quality is 1
    else if(this.quality === 1){
      this.quality -= 2
    }
    //expired
    else if(this.quality >= 2 && this.sellIn <= 0) {
      this.quality -= 4
    }
    this.sellIn--;
  }
}

class Regular extends Item {
  updateQuality() {
    if (this.quality > 0 && this.sellIn > 0){
      this.quality --
    }
    //if quality is 1
    else if(this.quality === 1){
      this.quality --
    }
    //expired
    else if(this.quality >= 2 && this.sellIn <= 0) {
      this.quality -= 2
    }
    this.sellIn--;
  }
} 

class Shop {
  constructor(items = []) {
    this.items = items.map(item => {
      switch (item.name) {
        case PASSES:
          return Passes(item.name, item.sellIn, item.quality);
        case SULFURAS:
          return Sulfuras
        case BRIE:
          return new AgedBrie(item.name, item.sellIn, item.quality);
        case CONJURED:
          return new Conjured(item.name, item.sellIn, item.quality);
        default://normal item
          return new Regular(item.name, item.sellIn, item.quality);
      }
    });
  }

  updateQuality() {
    for (const item of this.items) {
      item.updateQuality();
    }
  }
}



module.exports = {
  Item,
  Shop,
};


//Elephant Graveyard

// function main() {
//   const aged = new Shop([new Item("Aged Brie",70, 0)]);
//     for(let i = 0; i < 70; i++){
//       aged.updateQuality();
//     }
//     //aged brie won't pass 50 in quality
//     expect(aged.items[0].quality).toBe(50);
// }

// main();