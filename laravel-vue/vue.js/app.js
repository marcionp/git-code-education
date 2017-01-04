/**
 * Created by marcio on 04/01/2017.
 */
var app = new Vue({
    el: "#app",
    data: {
        test: "teste",
        title: "Contas a pagar",
        menus: [
            {id: 0, name: "Listar contas"},
            {id: 1, name: "Criar conta"}
        ],
        activedView: 1,
        formType: 'insert',
        bill: {
            date_due: '',
            name: '',
            value: 0,
            done: 0
        },
        names: [
            'Conta de Luz',
            'Internet',
            'Cartão',
            'Combustivel'
        ],
        bills: [
            {date_due: '01/01/2017', name: 'Conta de Luz', value: 98.00, done: 1},
            {date_due: '01/01/2017', name: 'Internet', value: 98.00, done: 0},
            {date_due: '01/01/2017', name: 'Cartão', value: 98.00, done: 1},
            {date_due: '01/01/2017', name: 'Combustivel', value: 98.00, done: 0},
        ]
    },
    computed: {
        countBill: function () {
            return this.bills.length;
            },
        countPendingBill: function () {
            var count = -1;
            for (var i in this.bills) {
                count = 0;
                if (!this.bills[i].done) {
                    count++;
                }
            }
            return count;
        }
    },

    methods: {
        showView: function (menuId) {
            this.activedView = menuId;
            if (menuId == 1){
                this.formType = 'insert';
            }
            else
            {
                this.formType = 'update';
            }
        },
        submit: function(){
            if (this.formType == 'insert') {
                this.bills.push(this.bill);
            }
            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: 0
            }
            this.activedView = 0;
        },
        loadBill: function (bill) {
            this.bill = bill;
            this.activedView = 1;
            this.formType = 'update';
        },
        writeOffBill: function (bill) {
            if (confirm("Confirma pagamento?")) {
                bill.done = 1;
            }
        },
        killBill: function (bill) {
            if (confirm("Confirma exclusão de conta " + bill.name + " no valor de " + bill.value + "?")) {
                var pos = this.bills.indexOf(bill);

                this.bills.splice(pos,1);
            }
        }
    }
});

Vue.filter('doneLabel', function (a) {
   if (a == "0") {
       return "Em Aberto";
   }
   else {
       return "Paga";
   }
});

Vue.filter('reportStatus', function (a) {
    if (a < 0) {
        return "Nenhuma conta cadastrada";
    }
    else{
        if (a > 0){
            return "Existem " + a + " contas pendentes";
        }
        else {
            return "Nenhuma conta a pagar";
        }
    }

});



