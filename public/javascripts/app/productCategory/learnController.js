angular.module("productCategoryModule")
    .controller("learnController", learnController);

learnController.$inject = ["$scope", "$timeout", "loginService", "productCategoryService", "productService", "requiredFieldValidationService_Login", "$localStorage", "$window"];

function learnController($scope, $timeout, loginService, productCategoryService, productService, requiredFieldValidationService_Login, $localStorage, $window) {

    $scope.CardId = -1;
    $scope.FrontSide = "NO MORE";
    $scope.BackSide = "";
    $scope.show = false;
    $scope.EF = 0;
    $scope.RepInterval = 0;
    $scope.Reps = 0;
    $scope.TotalReps = 0;

    $scope.showAnswer = function () {

        $timeout(function () {
            $scope.show = true;
        })
        console.log($scope.showAnswer)
       
    }

    $scope.reloadRoute = function() {
        $window.location.reload()
    }


    $scope.addNewCard = function(){
        productCategoryService.addNewCard(productCategoryService.getIdFromEndPoint(), loginService.storage.UserId)
            .success(function(newCards){
                console.log(newCards);
                unbindView();
                bindView(newCards[0]);
            })
    }

    $scope.doRep = function (q) {
        console.log("CULPRIT");
        console.log($scope.CardId);
        var EF =computeEF($scope.EF, q);
        var TotalReps = $scope.TotalReps + 1;
        var Reps = $scope.Reps;
        if (q == 0) {
            Reps=1;
        }
        else {
            Reps++;
        }
        console.log("EF");
        console.log(EF);
        console.log("TotalReps");
        console.log(TotalReps);
        console.log("reps");
        console.log(Reps);

        var RepInterval = computeRepInterval(Reps, EF, $scope.RepInterval);

        console.log("RepInterval");
        console.log(RepInterval);

        productCategoryService.logRep(loginService.storage.UserId, productCategoryService.getIdFromEndPoint(), $scope.CardId, EF, RepInterval, Reps, TotalReps)
            .success(function(status){
                console.log(status);
                unbindView();
                $scope.getCard();
            })
    }

    $scope.getCard = function () {


        console.log("GETTING CARD");
        productCategoryService.getNextCard(productCategoryService.getIdFromEndPoint(), loginService.storage.UserId)
            .success(function (nextCards) {
                console.log(nextCards[0]);
                bindView(nextCards[0])
            });


    }

    function computeEF(EF, q) {
        var newEaseFactor = EF + (0.1-(5-q) * (0.08+(5-q)*0.02));
        if(newEaseFactor<1.3){
            newEaseFactor = 1.3;
        }
        return newEaseFactor;
    }

    function computeRepInterval(rep, EF, lastinterval) {
        var repInterval;
        //var dayInMs = 86400000;
        var dayInMs = 10000;
        if (rep === 1) {
            repInterval = dayInMs;
        }
        else if (rep === 2) {
            repInterval = 4*dayInMs;
        }
        else {
            repInterval = lastinterval*EF;
        }
        return repInterval;
    }


    function unbindView() {
        $scope.CardId = -1;
        $scope.FrontSide = "NO MORE";
        $scope.BackSide = "";
        $scope.show = false;
        $scope.EF = 0;
        $scope.RepInterval = 0;
        $scope.Reps = 0;
        $scope.TotalReps = 0;
    }

    function bindView(card) {
        console.log("binding view");
        console.log(card)
        $scope.CardId = card.Id;
        $scope.FrontSide = card.FrontSide;
        $scope.BackSide = card.BackSide;
        $scope.show = false;
        if(card.EF){
            $scope.EF = card.EF;
        }
        if(card.RepInterval){
            $scope.RepInterval = card.RepInterval;
        }
        if(card.Reps){
            $scope.Reps = card.Reps;
        }
        if(card.TotalReps){
            $scope.TotalReps = card.TotalReps;
        }



        /*
        $scope.FrontSide = card.product[0].FrontSide;
        $scope.BackSide = card.product[0].BackSide;
        $scope.show = false;
        console.log($scope.FrontSide)
        */





        console.log($scope.FrontSide)

    }


    $scope.getCard();



}