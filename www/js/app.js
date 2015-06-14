angular.module('starter', ['ionic', 'firebase'])

.factory('FBase', function ($firebaseArray) {
  var apiLink = 'https://termosa-groceries.firebaseio.com';
  return function FBase (name, id) {
    if (id) {
      return new Firebase([apiLink, name, id].join('/'));
    } else {
      return $firebaseArray(new Firebase([apiLink, name].join('/')));
    }
  };
})

.controller('ListController', function ($scope, $ionicListDelegate, FBase) {
  $scope.STATUS_PURCHASED = 'purchased';
  $scope.items = new FBase('items');

  $scope.addItem = function () {
    var name = prompt('What do you need to buy?');
    if (name) {
      $scope.items.$add({ name: name });
    }
  };

  $scope.purchaseItem = function (item) {
    var itemRef = new FBase('items', item.$id);

    itemRef.child('status').set($scope.STATUS_PURCHASED);
    $ionicListDelegate.closeOptionButtons();
  };

  $scope.isPurchased = function (item) {
    return item.status === $scope.STATUS_PURCHASED;
  };
})
