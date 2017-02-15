var app = new Vue({
    el: "#app",
    data: {
        title: "Contas a pagar",
        menus: [
            {id: 0, name: "Listar contas"},
            {id: 1, name: "Cria conta"}

        ],
        activedView: 0,
        bills: [
            {date_due: '01/01/2016', name: 'Luz', value: 100.50, done: 1},
            {date_due: '01/01/2016', name: 'Luz', value: 200.50, done: 0},
            {date_due: '01/01/2016', name: 'Luz', value: 100.50, done: 0},
            {date_due: '01/01/2016', name: 'Luz', value: 40.50,done: 1 }
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
            return !count ? "Nenhuma conta a pagar" : "Existem " + count + " contas a pagar";
        }
    },
    methods: {
        ShowView: function ($event, id) {
            this.activedView = id;
        },
    }
})