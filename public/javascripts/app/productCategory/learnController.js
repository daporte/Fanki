angular.module("productCategoryModule")
    .controller("learnController", learnController);

learnController.$inject = ["$scope", "$sce", "$timeout", "loginService", "productCategoryService", "productService", "requiredFieldValidationService_Login", "$localStorage", "$window"];

function learnController($scope, $sce, $timeout, loginService, productCategoryService, productService, requiredFieldValidationService_Login, $localStorage, $window) {

    $scope.Card={};
    setDefault();

    countDueCards();

    /*
    $scope.CardId = -1;
    $scope.FrontSide = "NO MORE";
    $scope.BackSide = "";
    $scope.DeckId = -1;
    $scope.show = false;
    $scope.EF = 2.5;
    $scope.RepInterval = 0;
    $scope.Reps = 0;
    $scope.TotalReps = 0;

*/
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
                setDefault();
                bindView(newCards[0]);
            })
    }

    $scope.doRep = function (q) {

        console.log("CARD");
        console.log($scope.Card);
        console.log("CULPRIT");
        console.log($scope.Card.CardId);
        var EF =computeEF($scope.Card.EF, q);
        var TotalReps = $scope.Card.TotalReps + 1;
        var Reps = $scope.Card.Reps;
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

        var RepInterval = computeRepInterval(Reps, EF, $scope.Card.RepInterval, q);

        console.log("RepInterval");
        console.log(RepInterval);

        if($scope.Card.CardId){
            productCategoryService.logRep(loginService.storage.UserId, $scope.Card.DeckId, $scope.Card.CardId, EF, RepInterval, Reps, TotalReps)
                .success(function(status){
                    console.log(status);
                    setDefault();
                    $scope.show = false;
                    $scope.getCard();

                })
        } else {
            $scope.show = false;
            $scope.getCard();
        }



    }

    $scope.getCard = function () {


        console.log("GETTING CARD");
        productCategoryService.getNextCard(productCategoryService.getIdFromEndPoint(), loginService.storage.UserId)
            .success(function (nextCard) {
                var hourInMili = 3600000;
                console.log(nextCard);
                if(!nextCard){
                    productCategoryService.getSoonCard(productCategoryService.getIdFromEndPoint(), loginService.storage.UserId, hourInMili)
                        .success(function(data){
                            if(data["status"] == "fail"){
                                window.location.href = "/myDecks";
                            } else {
                                bindView(data);
                            }
                    });
                    
                    

                } else{
                    bindView(nextCard);
                }



            });


    }

    function countDueCards(){
        productCategoryService.countDueCards(productCategoryService.getIdFromEndPoint(), loginService.storage.UserId)
            .success(function (data) {
                console.log("COUNTED");

                console.log(data);
            });
    }



    function computeEF(EF, q) {
        var newEaseFactor = EF + (0.1-(5-q) * (0.08+(5-q)*0.02));
        if(newEaseFactor<1.3){
            newEaseFactor = 1.3;
        }
        return newEaseFactor;
    }

    function computeRepInterval(rep, EF, lastinterval, q) {
        var repInterval;
        var dayInSec = 86400;
        //var dayInMs = 10000;

        var tenMinInSec = 600;
        if(q === 0){
            return tenMinInMs;
        }

        if (rep === 1) {
            repInterval = dayInSec;
        }
        else if (rep === 2) {
            repInterval = 4*dayInSec;
        }
        else {
            repInterval = lastinterval*EF;
        }
        return repInterval;
    }


    function setDefault() {
        $scope.Card.CardId = -1;
        $scope.Card.FrontSide = "NO MORE";
        $scope.Card.BackSide = "";
        $scope.Card.DeckId = -1;
        $scope.Card.EF = 2.5;
        $scope.Card.show = false;
        $scope.Card.RepInterval = 0;
        $scope.Card.Reps = 0;
        $scope.Card.TotalReps = 0;

        $scope.Card.Image = "";
        $scope.Card.Literature = "";
        $scope.Card.Wikipedia = "";
        $scope.Card.Wikiskripta = "";
        $scope.Card.Youtube = "";
        $scope.Card.ExtraLink = "";
        $scope.Card.Tag = "";
        $scope.Card.Detail = false;
        /*
        $scope.CardId = -1;
        $scope.FrontSide = "NO MORE";
        $scope.BackSide = "";
        $scope.DeckId = -1;
        $scope.show = false;
        $scope.EF = 2.5;
        $scope.RepInterval = 0;
        $scope.Reps = 0;
        $scope.TotalReps = 0;
        */
    }

    function bindView(card) {
        console.log("binding view");
        console.log(card)
        $scope.Card.FrontSide = $sce.trustAsHtml(card.FrontSide);
        $scope.Card.BackSide = $sce.trustAsHtml(card.BackSide);
        $scope.Card.DeckId = card.Decks_FK;
        $scope.Card.CardId = card.Id;
        if(card.EF){
            $scope.Card.EF = card.EF;
        }
        if(card.RepInterval){
            $scope.Card.RepInterval = card.RepInterval;
        }
        if(card.Reps){
            $scope.Card.Reps = card.Reps;
        }
        if(card.TotalReps){
            $scope.Card.TotalReps = card.TotalReps;
        }

        $scope.Card.Image = card.Image;
        $scope.Card.Literature = card.Literature;
        $scope.Card.Wikipedia = card.Wikipedia;
        $scope.Card.Wikiskripta = card.Wikiskripta;
        $scope.Card.Youtube = card.Youtube;
        $scope.Card.ExtraLink = card.ExtraLink;
        $scope.Card.Tag = card.Tag;
        $scope.Card.Detail = card.Detail;

        /*
        $scope.CardId = card.Id;
        $scope.FrontSide = card.FrontSide;
        $scope.BackSide = card.BackSide;
        $scope.DeckId = card.Decks_FK;
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
*/


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