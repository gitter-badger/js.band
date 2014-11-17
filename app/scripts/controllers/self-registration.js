'use strict';

/**
 * @ngdoc function
 * @name jsbandApp.controller:SelfRegistrationCtrl
 * @description
 * # SelfRegistrationCtrl
 * Controller of the jsbandApp
 */

var questionType = {
  text:"text",
  number:"number",
  entity:"entity"
};
var PAGES = {
  Answer:"Answer",
  Finish:"Finish",
  FollowUP:"FollowUP"
};
angular.module('jsbandApp')
  .controller('SelfRegistrationCtrl', function ($scope,  $http) {
    $scope.PAGES = PAGES;
    $scope.currentPage = PAGES.Answer;
//    TODO How to proceed with not Existing translation
    $scope.language='de';
    //TODO What abount icons?
    $scope.availableLanguages={
      en:"English",
      de:"Deutsch",
      ru:"Русский",
      jp:"日本の"
    };
    $scope.systemLanguage='en';

    // get all notes and show them
    $http.get('/api/questionnaires')
      .success(function(data) {
        $scope.questionnaire = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

    $scope.finish = function (){
      // some validation here
      console.log($scope.questionnaire);
    };
    $scope.translate = function (mlstring){
      return mlstring[$scope.language] || mlstring[$scope.systemLanguage] || "no translation";
    };
    $scope.saveAndNext = function () {
      // some validation here
      console.log($scope.chapters);
      $scope.currentPage = PAGES.Finish;
    };
    $scope.gotoAnswer = function () {
      // some validation here
      $scope.currentPage = PAGES.Answer;
    };
    $scope.finishSelfRegistration = function () {
      // save answer on server & process result
      $scope.currentPage = PAGES.FollowUP;
    };
    $scope.closeSelfRegistration = function () {
      // send redirect to server login
      // for emulation do it via
      window.location = '/';
    };
  });
