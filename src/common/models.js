
//商品类
export class Goods{
    constructor(itemInfo,shopInfo,columns){
        this.iid= itemInfo.iid;
        this.title = itemInfo.title;
        this.desc= itemInfo.desc
        this.price = itemInfo.price;
        this.realPrice = itemInfo.lowNowPrice;
        this.oldPrice = itemInfo.oldPrice;
        this.disCount = itemInfo.discountDesc;
        this.columns=columns;
      
        this.services = shopInfo.services

    }
}
//店铺类
export class Shop{
    constructor(shopInfo){
        this.title = shopInfo.name;
        this.logo = shopInfo.shopLogo;
        this.cSells = shopInfo.cSells;
        this.cGoods = shopInfo.cGoods;
        this.score=shopInfo.score;
    }
}

//商品参数
export class ShopParams{
    constructor(info,rules){
        this.info = info.set;
        this.sizes = rules.tables[0];
        
    }
}