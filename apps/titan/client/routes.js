Titan.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  //
  // For any unmatched url, send to /
  $urlRouterProvider.otherwise("/");

  //
  // Use root urls over hashes when available
  $locationProvider.html5Mode(true);

  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "home.html"
    })
    .state('contact', {
      url: "/contact",
      templateUrl: "contact.html"
    })
    .state('route1', {
      url: "/route1",
      templateUrl: "route1.html"
    })
    .state('route1.list', {
      url: "/list",
      templateUrl: "route1.list.html",
      controller: function ($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    });
});

