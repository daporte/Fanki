angular.module("productModule")
    .factory("requiredFieldValidationService_Product", requiredFieldValidationService_Product);



function requiredFieldValidationService_Product() {

    function getRequiredValidationMessage(requiredInfos){
        console.log("checking reqs")
        var errorMessages = [];
        console.log(requiredInfos)
        if(requiredInfos.length > 0){
            console.log("still checking reqs")
            angular.forEach(requiredInfos, function(requiredInfo){
                console.log(requiredInfo.name);
                if(
                    requiredInfo.name !== undefined

                    &&

                    (
                    requiredInfo.name === null
                    || requiredInfo.name == ""
                    || requiredInfo.name.length == 0)
                ) {

                    errorMessages.push(requiredInfo.errorMessage)
                }

            });
        }
        console.log(errorMessages);
        return errorMessages;
    }

    return {

        getRequiredFieldValidationErrorMessage : getRequiredValidationMessage
    }
}