var app = angular.module('starter');

app.factory('companyFactory', function($http,HOST) {



  var companys =[];//[{"Login":null,"Password":null,"ConfirmPwd":null,"VerifyCode":null,"Qualification":null,"Qualifications":"4,1,","Name":"阿里郎","FullName":"阿里啦咯啦咯啦","Address":"啦咯啦咯啦咯啦","Code":"12354","Principal":"大门口","Mobile":"1348069525","Phone":"0755-25452545","Email":"阿里郎","WebSite":"www.fghg.com","ID":87,"No":null,"Remark":"不理解"},{"Login":null,"Password":null,"ConfirmPwd":null,"VerifyCode":null,"Qualification":null,"Qualifications":"5,4,3,2,","Name":"阿里郎","FullName":"阿里啦咯啦咯啦","Address":"啦咯啦咯啦咯啦","Code":"12354","Principal":"大门口","Mobile":"13445693685","Phone":"0755-25452545","Email":"阿里郎","WebSite":"www.fghg.com","ID":86,"No":null,"Remark":"阿里啦咯啦不理解"},{"Login":null,"Password":null,"ConfirmPwd":null,"VerifyCode":null,"Qualification":null,"Qualifications":null,"Name":"阿里郎","FullName":"阿里啦咯啦咯啦","Address":"啦咯啦咯啦咯啦","Code":"12354","Principal":"大门口","Mobile":"13488523685","Phone":"0755-25452545","Email":"阿里郎","WebSite":"www.fghg.com","ID":85,"No":null,"Remark":"阿里啦咯啦不理解"},{"Login":null,"Password":null,"ConfirmPwd":null,"VerifyCode":null,"Qualification":null,"Qualifications":null,"Name":"阿里郎","FullName":"阿里啦咯啦咯啦","Address":"啦咯啦咯啦咯啦","Code":"12354","Principal":"大门口","Mobile":"13480623685","Phone":"0755-25452545","Email":"阿里郎","WebSite":"www.fghg.com","ID":84,"No":null,"Remark":"阿里啦咯啦不理解"},{"Login":null,"Password":null,"ConfirmPwd":null,"VerifyCode":null,"Qualification":null,"Qualifications":null,"Name":"阿里郎","FullName":"阿里啦咯啦咯啦","Address":"啦咯啦咯啦咯啦","Code":"12354","Principal":"大门口","Mobile":"13480695685","Phone":"0755-25452545","Email":"阿里郎","WebSite":"www.fghg.com","ID":83,"No":null,"Remark":"阿里啦咯啦不理解"},{"Login":null,"Password":null,"ConfirmPwd":null,"VerifyCode":null,"Qualification":null,"Qualifications":"2,3,6","Name":"2016年5月13日 00:25:21","FullName":"2016年5月13日 00:25:33","Address":"2016年5月13日 00:25:22","Code":"2016年5月13日 00:25:23","Principal":"2016年5月13日 00:25:26","Mobile":"2016年5月13日 00:25:27","Phone":"2016年5月13日 00:25:28","Email":"2016年5月13日 00:25:30","WebSite":"2016年5月13日 00:25:32","ID":82,"No":null,"Remark":null},{"Login":null,"Password":null,"ConfirmPwd":null,"VerifyCode":null,"Qualification":null,"Qualifications":"2,3,5","Name":"2016.05.13","FullName":"asdfadfdf","Address":"等发达","Code":"2333","Principal":"张希哦姐","Mobile":"13652525242","Phone":"0555-9685455","Email":"suqinghe@ed.com","WebSite":"www.baidu.com","ID":81,"No":"dasf","Remark":"asdf"},{"Login":null,"Password":null,"ConfirmPwd":null,"VerifyCode":null,"Qualification":null,"Qualifications":null,"Name":"阿里郎","FullName":"阿里啦咯啦咯啦","Address":"啦咯啦咯啦咯啦","Code":"12354","Principal":"大门口","Mobile":"13480695685","Phone":"0755-25452545","Email":"阿里郎","WebSite":"www.fghg.com","ID":80,"No":null,"Remark":"阿里啦咯啦不理解"},{"Login":null,"Password":null,"ConfirmPwd":null,"VerifyCode":null,"Qualification":null,"Qualifications":null,"Name":"阿里郎","FullName":"阿里啦咯啦咯啦","Address":"啦咯啦咯啦咯啦","Code":"12354","Principal":"大门口","Mobile":"13480695685","Phone":"0755-25452545","Email":"阿里郎","WebSite":"www.fghg.com","ID":79,"No":null,"Remark":"阿里啦咯啦不理解"},{"Login":null,"Password":null,"ConfirmPwd":null,"VerifyCode":null,"Qualification":null,"Qualifications":null,"Name":"深圳市建筑公司第39分公司","FullName":"公司全称：深圳市建筑公司第39分公司","Address":"深圳市科技中73路","Code":"1563142788","Principal":"怎小姐","Mobile":"13863139990","Phone":"0755-88102404","Email":"m0q4x@szsei.com","WebSite":"http://www.szsei21.com","ID":78,"No":null,"Remark":null}];


  return {
    all: function() {

      $http.get(HOST + "api/company/getsimpledata", {
            cache: true
        })
        .success(
            function(response) {
                companys = response;
            }
        );
      return companys;
    },
    remove: function(product) {
      companys.splice(companys.indexOf(product), 1);
    },
    get: function(productId) {
      for (var i = 0; i < companys.length; i++) {
        if (companys[i].id === parseInt(productId)) {
          return companys[i];
        }
      }
      return null;
    }
  };
});
 