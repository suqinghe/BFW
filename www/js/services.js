angular.module('starter.services', [])
.factory('products', function($http) {
  var products = [{
    id: 0,
    name: '建筑钢材',
    paytype: '货到付款',
    shiptype:'卖方物流',
    subtitle:'高级优质钢',
    price:3000,    
    qty:3,
    unit:'吨',
    image: 'img/prd_07.jpg'
  }, {
    id: 1,
    name: '建筑铜材',
    paytype: '货到付款',
    shiptype:'卖方物流',
    subtitle:'铜材首选，建筑之王',
    price:5000,    
    qty:1,
    unit:'吨',
    image: 'img/prd_1.jpg'
  }, {
    id: 3,
    name: '建筑方砖',
    paytype: '货到付款',
    shiptype:'卖方物流',
    subtitle:'优质耐火砖，建筑首选',
    price:1500,    
    qty:3,
    unit:'吨',
    image: 'img/prd_04.jpg'
  }, {
    id:4,
    name: '建筑脚手架',
    paytype: '货到付款',
    shiptype:'卖方物流',
    subtitle:'建筑脚手架，不再怕风雨',
    price:1800,    
    qty:3,
    unit:'批',
    image: 'img/prd_05.jpg'
  }, {
    id: 5,
    name: '挖掘机',
    paytype: '货到付款',
    shiptype:'卖方物流',
    subtitle:'蓝翔专用挖掘机',
    price:150000,    
    qty:1,
    unit:'台',
    image: 'img/prd_06.jpg'
  }];

  return {
    all: function() {
      return products;
    },
    remove: function(product) {
      products.splice(products.indexOf(product), 1);
    },
    get: function(productId) {
      for (var i = 0; i < products.length; i++) {
        if (products[i].id === parseInt(productId)) {
          return products[i];
        }
      }
      return null;
    }
  };
})
.factory('companys', function($http) {
  var companys = [];

  return {
    all: function() {
      if(companys.length <= 0)
      {
        $http.get("http://api.szsei.com/api/company/getbyid/"+id)
        .success(
          function (response) {
           companys= response;
         }
         );
      }
      return companys;
    },
    remove: function(company) {
      companys.splice(companys.indexOf(company), 1);
    },
    get: function(companyId) {
      for (var i = 0; i < companys.length; i++) {
        if (companys[i].id === parseInt(companyId)) {
          return companys[i];
        }
      }
      return null;
    }
  };
});
