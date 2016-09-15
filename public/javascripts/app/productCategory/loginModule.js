var loginModuleConstants = angular.module("loginModule.Constants", [])
    .constant('Constants',{user : '#{user}'});

var loginModule = angular.module("loginModule", ["ngStorage", "loginModule.Constants"]);
