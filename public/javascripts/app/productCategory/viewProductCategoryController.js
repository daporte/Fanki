angular.module("productCategoryModule").controller("viewProductCategoryController",viewProductCategoryController);

viewProductCategoryController.$inject = ["$scope", "$timeout", "productCategoryService", "loginService"];

function viewProductCategoryController($scope, $timeout, productCategoryService, loginService){

    $scope.Hierarchy = {};

    getHierarchy();

    $scope.showTest = false;

    $scope.$storage = loginService.storage;

    $scope.currentTopic = "";

    var categoryMap = {};
    var deckMap = {};

    function addNode(categories, categoryMap, decks, deckMap, currentCat, superArray, Layer){

        var catObj = {"CategoryId" : currentCat["Id"], "CategoryName" : currentCat["CategoryName"], "SubCategories" : [], "Layer" : Layer, "SuperCategory" : currentCat["SuperCategory"]};
        console.log(deckMap[currentCat["Id"]]);
        if(deckMap[currentCat["Id"]]){
            catObj["Decks"]= deckMap[currentCat["Id"]]["Decks"];
        }


        superArray.push(catObj);

        if(currentCat["SubCategories"]){
            var SubCategoryIds = currentCat["SubCategories"].split("|");

            for(var i=0;i<SubCategoryIds.length;i++){


                Layer++;
                addNode(categories, categoryMap, decks, deckMap, categoryMap[SubCategoryIds[i]], catObj["SubCategories"], Layer);




            }
        }


    }



    function getHierarchy(){
        productCategoryService.getHierarchy()
            .success(function (data){
                console.log("zzzzzzzzzzzzzzzzzzzzz");

                if(data){
                    console.log(data);

                    var categories = data.categories;
                    var decks = data.decks;

                    var hierarchy = {};
                    hierarchy["SubCategories"] = []

                    categoryMap = {};
                    deckMap = {};

                    for(var i=0;i<Object.keys(categories).length;i++){
                        categoryMap[categories[i]["Id"]] = categories[i];
                    }

                    for(var i=0;i<Object.keys(decks).length;i++){
                        deckMap[decks[i]["CategoryId"]] = decks[i];
                    }

                    console.log(categoryMap);
                    console.log(deckMap);

                    for(var i=0;i<Object.keys(categories).length;i++){
                        var currentCat = categories[i];
                        console.log(currentCat);
                        if(!currentCat["SuperCategory"]){
                            var Layer = 0;
                            addNode(categories, categoryMap, decks, deckMap, currentCat, hierarchy["SubCategories"], Layer);
                        }

                    }
                    console.log(hierarchy);
                    $scope.Hierarchy = hierarchy;
                    console.log("CCCCCCCCCCCCCCCc");
                }

            })
    }
    /*
    function getAllProductCategories(){
        console.log("do you even");
        productCategoryService.getAllProductCategories()
            .success(function (data){
                console.log("zzzzzzzzzzzzzzzzzzzzz");
                console.log(loginService.storage)
                console.log(data);
                console.log(data.productCategories);
                if(data
                    && data.productCategories
                    && data.productCategories.length > 0){

                    $scope.productCategories = data.productCategories;
                    console.log("CCCCCCCCCCCCCCCc");
                }

            })
    }

    */

    $scope.currentProductCategoryId = 0;

    $scope.setCurrentTopic = function(categoryName){
        $scope.currentTopic = categoryName;
        
    }
    
    $scope.getSuperCategory = function (category) {
        var cat = category;
        while(cat["SuperCategory"]) {

            cat = categoryMap[cat["SuperCategory"]];
        }
        return cat["CategoryName"];
    }

    $scope.setCurrentProductCategoryId = function (productCategoryId){
        console.log(productCategoryId);
        $scope.currentProductCategoryId = productCategoryId;
    };

    $scope.addDetails = function(deck, on){
        console.log(on);
        productCategoryService.addDetails(deck, loginService.storage.UserId, on)
            .success(function (data){

            loginService.storage.decks[deck.Id][1]= on ? 1:0;
                
        });


    };


    $scope.addDeck = function (deck, category, on) {
        console.log(deck);
        console.log(on);
        productCategoryService.addDeckToUser(deck, loginService.storage.UserId, on)
            .success(function (data) {
                console.log(deck.Id)
                console.log(on)
                console.log(deck);
                console.log("CATEGORY ID");
                console.log(category.CategoryId);

                if(on){
                    if(!loginService.storage.decks[deck.Id]){
                        loginService.storage.decks[deck.Id] = [2];
                        loginService.storage.decks[deck.Id][1] = 0;
                    }
                    loginService.storage.decks[deck.Id][0]= 1;

                    if(loginService.storage.Categories[category.CategoryId]){
                        loginService.storage.Categories[category.CategoryId] ++;
                    }
                    else{
                        loginService.storage.Categories[category.CategoryId] = 1;
                    }
                } else {
                    loginService.storage.decks[deck.Id][0]= 0;
                    loginService.storage.decks[deck.Id][1]= 0;

                    loginService.storage.Categories[category.CategoryId] --;


                }
            })
    }


    $scope.deleteProductCategory = function(){
        console.log("HHHHHHHAIII");
        if($scope.currentProductCategoryId>0){
            productCategoryService.deleteProductCategoryById($scope.currentProductCategoryId)
                .success(function(data){


                    console.log("Succcess");
                    console.log(data.resultId);
                    //window.location.href = "/viewProductCategory/deck_"+data.resultId;
                    console.log(loginService.storage.decks[data.resultId])
                    delete loginService.storage.decks[data.resultId];
                    window.location.href = "/viewProductCategory";


                });
         
            //
        }
    };





    $scope.productDetailsView = {
        DeckName : "",

        Description : "",
        AddedBy : ""

    };

    $scope.showProductDetailsInformation = function(productCategory){
        console.log("ckeil");
        console.log(productCategory);

        $scope.productDetailsView.DeckName = productCategory.DeckName;
        $scope.productDetailsView.Description= productCategory.Description;
        $scope.productDetailsView.AddedBy= productCategory.AddedBy;
        console.log($scope.productDetailsView);
        //console.log($scope.productDetailsView.productCategoryName);
        /*
        $scope.productDetailsView.productName = product.Name
        $scope.productDetailsView.productDescription = product.Description
        $scope.productDetailsView.productSellingPrice = product.ProductPrice
        $scope.productDetailsView.productPrice = product.productCost
        $scope.productDetailsView.productReleaseDate = product.CreatedDt
        */


    }


};