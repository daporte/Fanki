var theUser = window.user;

var loginModuleConstants = angular.module('loginModule.Constants', [])
    .constant('Constants',{user : theUser});

var loginModule = angular.module("loginModule", ["ngStorage", "loginModule.Constants"]);
