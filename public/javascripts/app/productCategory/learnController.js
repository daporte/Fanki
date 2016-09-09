angular.module("productCategoryModule")
    .controller("learnController", learnController);

learnController.$inject = ["$scope", "$timeout", "loginService", "productCategoryService", "productService", "requiredFieldValidationService_Login", "$localStorage", "$window"];

function learnController($scope, $timeout, loginService, productCategoryService, productService, requiredFieldValidationService_Login, $localStorage, $window) {

    $scope.CardId = -1;
    $scope.FrontSide = "arwe";
    $scope.BackSide = "zzz";
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


    $scope.doRep = function (q) {
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
            })
    }

    $scope.getCard = function () {


        console.log("GETTING CARD");
        productCategoryService.getCardsFromDeck(productCategoryService.getIdFromEndPoint(), loginService.storage.UserId)
            .success(function(data){

                console.log(data);
                /*
                var cards = []

                for(var property in data[0]){

                    if(property.startsWith("card")){
                        console.log(data[0][property]);
                        var cardId = property.split("_")[1];
                        console.log(cardId)
                        cards.push({
                            cardId : cardId,
                            data : data[0][property]
                            })


                    }
                }
                */
                console.log("zdar")
                //var idx = Math.floor(Math.random() * Object.keys(data).length)
                //console.log(idx);
                var chosenCard = data[0];
                var now = new Date().getTime();

                productCategoryService.getNextCard(productCategoryService.getIdFromEndPoint(), loginService.storage.UserId)
                    .success(function (nextCards) {
                        console.log(nextCards);
                        bindView(nextCards[0])
                    });
            //bindView(chosenCard);

                /*
                productService.getProductById(chosenCard.cardId)
                    .success(function (data2) {
                        console.log(data2)

                        bindView(data2)



                    })
                */

        })
    }

    function computeEF(EF, q) {
        var newEaseFactor = EF + (0.1-(5-q) * (0.08+(5-q)*0.02));
        return newEaseFactor;
    }

    function computeRepInterval(rep, EF, lastinterval) {
        var repInterval;
        var dayInMs = 86400000;
        if (rep === 1) {
            repInterval = dayInMs;
        }
        else if (rep === 2) {
            repInterval = 4*dayInMs;
        }
        else {
            repInterval = lastinterval*EF*dayInMs;
        }
        return repInterval;
    }


    function bindView(card) {
        console.log("binding view");
        console.log(card)
        $scope.CardId = card.Id;
        $scope.FrontSide = card.FrontSide;
        $scope.BackSide = card.BackSide;
        $scope.show = false;
        $scope.EF = card.EF;
        $scope.RepInterval = card.RepInterval;
        $scope.Reps = card.Reps;
        $scope.TotalReps = card.TotalReps;

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