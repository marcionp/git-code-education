var app = new Vue({
    el: "#app",
    data: {
        test: "",
        title: "Contas a pagar",
        menus: [
            {id: 0, name: "Listar contas"},
            {id: 1, name: "Cria conta"}

        ],
        activedView: 1,
        bill: {
            date_due: '',
            name: '',
            value: 0
        },
        names: [
            'Luz',
            'Telefone',
            'Cartão de crédito',
            'Gasolina'
        ],
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
        submit: function () {
            this.bills.push(this.bill);
            this.activedView = 0;
        }
    }
});

app.$watch("test", function (novoValor,velhoValor) {
    console.log("velhoValor: " + velhoValor + "- novoValor: " + novoValor);
})
