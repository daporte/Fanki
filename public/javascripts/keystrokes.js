$(function() {
    $(document).keydown(function(e) {
        switch (e.which) {
            case 32:
                $("#show").trigger("click")
                break;
            case 97:
                $("#show").trigger("click")
                break;
        }
    });
});