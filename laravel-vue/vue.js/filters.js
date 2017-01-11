/**
 * Created by marcio on 06/01/2017.
 */
Vue.filter('doneLabel', function (a) {
    if (a == "0") {
        return "Em Aberto";
    }
    else {
        return "Paga";
    }
});

Vue.filter('reportStatus', function (a, billTypeName) {
    if (a < 0) {
        return "Nenhuma conta cadastrada";
    }
    else{
        if (a > 0){
            return "Existem " + a + " contas pendentes";
        }
        else {
            return "Nenhuma conta a " + billTypeName;
        }
    }

});
