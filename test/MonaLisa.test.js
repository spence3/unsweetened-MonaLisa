const {Shop, Item} = require("../src/MonaLisa");

describe("MonaLisa", function() {
  it("should foo", function() {
    const monaLisa = new Shop([new Item("foo", 0, 0)]);
    const items = monaLisa.updateQuality();
    expect(monaLisa.items[0].name).toBe("foo");
  });

  //normal item quality (basic test)
  it("Testing Normal", function(){
    const normal = new Shop([new Item("brush", 10, 10)]);
    for(let i = 0; i < 10; i++){
      normal.updateQuality();
    }
    //normal item quality goes down
    expect(normal.items[0].quality).toBe(0);
  });

  //normal quality goes down twice as fast after sell in date is below 0.
  it("Testing Normal", function(){
    const normal = new Shop([new Item("brush", 5, 15)]);
    //after 5 iterations, it will start subtracting
    //by -2 which will put the quality to 0
    for(let i = 0; i < 10; i++){
      normal.updateQuality();
    }

    //Normal Quality will go down to 0.
    expect(normal.items[0].quality).toBe(0);
  });

  //Conjured Items
  it("Testing Conjured", function(){
    const conjured = new Shop([new Item("Conjured", 10, 20)]);
    const normal = new Shop([new Item("brush", 10, 10)]);

    //Conjured starts with higher value, but same sellin value
    //as the normal item, both of them will be 0 value after 10 days
    for(let i = 0; i < 10; i++){
      conjured.updateQuality()
      normal.updateQuality();
    }

    //Normal Quality will go down to 0.
    expect(conjured.items[0].quality).toBe(0);
    expect(normal.items[0].quality).toBe(0);
  });

  //Conjured Items
  it("Testing Conjured", function(){
    const conjured = new Shop([new Item("Conjured", 0, 20)]);
    const normal = new Shop([new Item("brush", 0, 10)]);

    //Since normal items degrade twice as fast after
    //sell in date, then conjured items should degrade
    //double of that. Both of them have a sell-in date
    //of 0, Conjured starts with 20 and normal starts with 10
    //of quality. Both end with 0
    for(let i = 0; i < 5; i++){
      conjured.updateQuality()
      normal.updateQuality();
    }

    expect(conjured.items[0].quality).toBe(0);
    expect(normal.items[0].quality).toBe(0);
  });

  //Aged Brie quality quality 50 max
  it('Aged Brie', function(){
    const aged = new Shop([new Item("Aged Brie",70, 0)]);
    var loop = aged.items[0].sellIn
    for(let i = 0; i < loop; i++){
      aged.updateQuality();
    }
    //aged brie won't pass 50 in quality
    expect(aged.items[0].quality).toBe(50);
  });

  //Aged Brie 15 sellin --> 15 quality
  it('Aged Brie', function(){
    const aged = new Shop([new Item("Aged Brie",15, 0)]);
    var loop = aged.items[0].sellIn
    for(let i = 0; i < loop; i++){
      aged.updateQuality();
    }
    
    expect(aged.items[0].quality).toBe(15);
  });

  //aged Brie sell in date === 5 
  //sell in date is 15, but we check 
  //on day 10 how many more sellin days there are
  it('Aged Brie', function(){
    const aged = new Shop([new Item("Aged Brie",15, 0)]);
    for(let i = 0; i < 10; i++){
      aged.updateQuality();
    }
    
    expect(aged.items[0].sellIn).toBe(5);
  });


  //"Sulfuras", being a legendary item, never has to be sold or decreases in Quality
  it('Sulfuras', function(){
    const sulf = new Shop([new Item('Sulfuras, Hand of Ragnaros',10, 80)]);
    var loop = sulf.items[0].sellIn
    for(let i = 0; i < loop; i++){
      sulf.updateQuality();
    }
    
    expect(sulf.items[0].quality).toBe(80);//always 80. never changes
    expect(sulf.items[0].sellIn).toBe(10);//doesn't need to be sold in certain amount of time
  });


  //Tickets: The last 10 days gives the quality of the ticket an
  //extra 25 points in quality.
  it('Backstage passes to a TAFKAL80ETC concert', function(){
    const passes = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert',10, 0)]);
    for(let i = 0; i < 10; i++){
      passes.updateQuality();
    }
    
    //last 10 days adds 25 to quality
    expect(passes.items[0].quality).toBe(25);
    expect(passes.items[0].sellIn).toBe(0);//0 Days left
  });


  //Tickets: Starts at 15, the first five days will increase it
  //to 5 for quality, and then with the last 10 days it's going to
  //add an extra 25 to quality
  it('Backstage passes to a TAFKAL80ETC concert', function(){
    const passes = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert',15, 0)]);
    var loop = passes.items[0].sellIn
    for(let i = 0; i < loop; i++){
      passes.updateQuality();
    }
    //last 10 days adds 25 to quality
    expect(passes.items[0].quality).toBe(30);//quality set to 30
    expect(passes.items[0].sellIn).toBe(0);//0 Days left
  });


  //Passes quality is set to 0 after concert
  it('Backstage passes to a TAFKAL80ETC concert', function(){
    const passes = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert',5, 0)]);
    for(let i = 0; i < 6; i++){
      passes.updateQuality();
    }

    expect(passes.items[0].quality).toBe(0);//quality set to 0 after concert
    expect(passes.items[0].sellIn).toBe(-1);//-1 Days left
  });
});