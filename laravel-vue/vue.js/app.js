/**
 * Created by marcio on 04/01/2017.
 */
var app = new Vue({
    el: "#app",
    data: {
        title: "Contas a pagar",
        bills: [
            {date_due: '01/01/2017', name: 'Conta de Luz', value: 98.00, done: 1},
            {date_due: '01/01/2017', name: 'Internet', value: 98.00, done: 0},
            {date_due: '01/01/2017', name: 'Cartão', value: 98.00, done: 1},
            {date_due: '01/01/2017', name: 'Combustivel', value: 98.00, done: 0},
        ]
    },
    computed: {
        status: function () {
            var count = 0;
            for (var i in this.bills) {
                if (!this.bills[i].done) {
                    count++;
                }
            }
            return !count ? "Nenhuma conta a pagar" : "Existem " + count + " contas em aberto";
        }
    }
})

var app2 = new Vue({
    el: '#app-2',
    data: {
        message: 'You loaded this page on ' + new Date()
    }
})