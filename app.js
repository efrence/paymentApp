
toastr.options = {
  "closeButton": false,
  "debug": false,
  "positionClass": "toast-top-full-width",
  "onclick": null,
  "showDuration": "fast",
  "hideDuration": "fast",
  "timeOut": "4000",
  "extendedTimeOut": "0",
  "showEasing": "linear",
  "hideEasing": "linear",
  "showMethod": "slideDown",
  "hideMethod": "slideUp"
};

angular.module('caseStudy',['localytics.directives','ui.bootstrap.datetimepicker','mm.iban']).
controller('mainController',function($scope,$timeout){
  $scope.tabs = [{
    title: 'Balances',
    url: 'balance.tpl.html'
  }, {
    title: 'Create Payee',
    url: 'payee.tpl.html'
  }, {
    title: 'Make Payment',
    url: 'payment.tpl.html'
  }];
  $scope.payee = {};
  $scope.payment = {};
  $scope.days = _.range(1,32);
  $scope.months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  $scope.years = _.range(2014,2020);
  $scope.date = null;
  $scope.date2 = {};
  $scope.date2.year = moment($scope.date).year();
  $scope.date2.month = $scope.months[moment($scope.date).month() ];
  $scope.date2.day = parseInt(moment($scope.date).format('D'),10);
  $scope.balance = 10000;
  $scope.currentTab = 'balance.tpl.html';
  $scope.getPayees = function(){
    $scope.payees = _.map(mydb.query('payees'), 
                                    function(p){
                                      return _.pick(p,['ID','name']); 
                                    });
 
  };
  $scope.getPayees();

  $scope.onClickTab = function(tab){
    if(tab.title == 'Make Payment' && $scope.payees.length === 0){
      toastr.warning('You need to create a payee before you can make a payment');
    }
    $scope.currentTab = tab.url;
  };

  $scope.isActiveTab = function(tabUrl){
    return tabUrl === $scope.currentTab;
  };

  
  $scope.setDate = function(newDate,oldDate){
    $scope.date2.year = moment(newDate).year();
    $scope.date2.month = $scope.months[moment(newDate).month()];
    $scope.date2.day = parseInt(moment(newDate).format('D'),10);
    $scope.date = newDate;
    //console.log('date has been set');
  };

  $scope.updateDate = function(){
    var dateString = $scope.date2.year+'-'+$scope.date2.month+'-'+$scope.date2.day;
    $scope.date = moment(dateString).toDate(); 
  };

  $scope.createPayee = function(){
    console.log('creating payee');
    var payee = {name: $scope.payee.name, bank: $scope.payee.bank, iban: $scope.payee.iban};
    mydb.insert('payees',payee);
    mydb.commit();
    $scope.getPayees(); 
    toastr.success('You have successfully created a payee');
    $scope.payee = {};
  };
  
  $scope.checkDate = function(scope){
    return scope.rc.paymentForm.needsAttention(scope.paymentForm.date_day) || scope.rc.paymentForm.needsAttention(scope.paymentForm.date_month) ||
                                                        scope.rc.paymentForm.needsAttention(scope.paymentForm.date_year)  
  };
  $scope.makePayment = function(){
    var payment = {payee: $scope.payment.payee.ID, amount: $scope.payment.amount, date: $scope.date};
    if($scope.balance < payment.amount){
      toastr.error('There is not enough funds in your account');
      toastr.warning('Try with a smaller amount');
      return false;
    } else {
      $scope.balance = $scope.balance - payment.amount;
    }
    mydb.insert('payments',payment);
    mydb.commit();
    toastr.success('You have successfully made a payment');
    $scope.payment = {};
    $scope.date = null;
    $scope.date2 = {};
  };

}).
directive('rcSubmit', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    require: ['rcSubmit', '?form'],
    controller: ['$scope', function ($scope) {
      this.attempted = false;

      this.setAttempted = function() {
        this.attempted = true;
      };
      var formController = null;

      this.setFormController = function(controller) {
        formController = controller;
      };

      this.needsAttention = function (fieldModelController) {
        if (!formController) return false;

        if (fieldModelController) {
          return fieldModelController.$invalid && 
          (fieldModelController.$dirty || this.attempted);
        } else {
          return formController && formController.$invalid && 
          (formController.$dirty || this.attempted);
        }
      };
    }],
    compile: function(cElement, cAttributes, transclude) {
      return {
        pre: function(scope, formElement, attributes, controllers) {

          var submitController = controllers[0];
          var formController = (controllers.length > 1) ? 
          controllers[1] : null;
          submitController.setFormController(formController);
          scope.rc = scope.rc || {};
          scope.rc[attributes.name] = submitController;
        },
        post: function(scope, formElement, attributes, controllers) {

          var submitController = controllers[0];
          var formController = (controllers.length > 1) ? 
          controllers[1] : null;

          var fn = $parse(attributes.rcSubmit);

          formElement.bind('submit', function (event) {
            if (!scope.$$phase){
              if (!formController.$valid) {
                submitController.setAttempted();
              } 
              scope.$apply();
            }

            if (!formController.$valid) {
              submitController.setAttempted();
              return false;
            }
              submitController.attempted = false;
              scope[attributes.name].$setPristine(); 
              scope.$apply(function() {
              fn(scope, {$event:event});
            });
          });
        }
      };
    }
  }    
}]);


