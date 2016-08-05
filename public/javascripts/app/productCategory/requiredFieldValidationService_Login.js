angular.module("loginModule")
    .factory("requiredFieldValidationService_Login", requiredFieldValidationService_Login);



function requiredFieldValidationService_Login() {

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