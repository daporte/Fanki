angular.module("productCategoryModule")
    .controller("learnController", learnController);

learnController.$inject = ["$scope", "$timeout", "loginService", "productCategoryService", "productService", "requiredFieldValidationService_Login", "$localStorage", "$window"];

function learnController($scope, $timeout, loginService, productCategoryService, productService, requiredFieldValidationService_Login, $localStorage, $window) {

    $scope.FrontSide = "arwe";
    $scope.BackSide = "";
    $scope.show = false;

    $scope.showAnswer = function () {

        $timeout(function () {
            $scope.show = true;
        })
        console.log($scope.showAnswer)
       
    }

    $scope.reloadRoute = function() {
        $window.location.reload()
    }



    $scope.getCard=  function () {


        console.log("GETTING CARD")
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
                var idx = Math.floor(Math.random() * Object.keys(data).length)
                console.log(idx);
                var chosenCard = data[idx];
                console.log(chosenCard);
                bindView(chosenCard);
                /*
                productService.getProductById(chosenCard.cardId)
                    .success(function (data2) {
                        console.log(data2)

                        bindView(data2)



                    })
                */

        })
    }



    function bindView(card) {
        console.log("binding view");
        console.log(card)

        $scope.FrontSide = card.FrontSide;
        $scope.BackSide = card.BackSide;
        $scope.show = false;

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