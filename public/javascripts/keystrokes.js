$(function() {
        $(document).keydown(function(e) {
            switch (e.which) {
                case 32:
                    $("#show").trigger("click")
                    break;
                case 97:
                    $("#show").trigger("click")
                    break;
                case 49:
                    $("#znovu").trigger("click")
                    break;
                case 97:
                    $("#znovu").trigger("click")
                    break;
                case 50:
                    $("#tezke").trigger("click")
                    break;
                case 98:
                    $("#tezke").trigger("click")
                    break;
                case 51:
                    $("#spravne").trigger("click")
                    break;
                case 99:
                    $("#spravne").trigger("click")
                    break;
                case 52:
                    $("#jednoduche").trigger("click")
                    break;
                case 100:
                    $("#jednoduche").trigger("click")
                    break;
            }
        });
});