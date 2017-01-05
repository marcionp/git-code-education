/**
 * Created by marcio on 04/01/2017.
 */

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

var appComponent = Vue.extend({
    template: `
    <style type="text/css">
        .pago{
            color: green;
        }
        .em-aberto{
            color: red;
        }

        .verde{
            color: green;
        }

        .vermelho{
            color: red;
        }

        .cinza{
            color: gray;
        }

        .minha-classe{
            background-color: burlywood;
        }
    </style>
    <h1>{{ title }}</h1>

    <div>
        <h2>Sumário de Contas</h2>

        <h3 v-bind:class="{ 'cinza' : countPendingBill < 0, 'verde' : countPendingBill == 0, 'vermelho' : countPendingBill > 0 }" >
            {{ countPendingBill | reportStatus }}
        </h3>
    </div>

    <nav>
        <ul>
            <li v-for="obj in menus">
                <a href="#" @click.prevent="showView(obj.id)">{{ obj.name }}</a>
            </li>

        </ul>
    </nav>
    <div v-if="activedView == 0">

        <table border="1px" cellpadding="10px">
            <thead>
            <tr>
                <th>Vencimento</th>
                <th>Nome</th>
                <th>Valor</th>
                <th>Paga?</th>
                <th colspan="3">Ações</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="obj in bills">
                <td> {{ obj.date_due }}</td>
                <td> {{ obj.name }} </td>
                <td> {{ obj.value | currency 'R$ ' 2 }}</td>
                <!-- <td v-bind:class="{'pago' : obj.done, 'emAberto' : !obj.done }"> -->
                <td class="minha-classe" v-bind:class="{'pago' : obj.done, 'em-aberto' : !obj.done }">
                    {{ obj.done | doneLabel}}
                </td>
                <td>
                    <a href="#" @click.prevent="loadBill(obj)">Editar</a>
                </td>
                <td>
                    <a href="#" @click.prevent="killBill(obj)">Excluir</a>
                </td>
                <td v-if="!obj.done">
                    <a href="#" @click.prevent="writeOffBill(obj)">Informar Pagamento</a>
                </td>
                <td v-else="!obj.done">
                    -
                </td>


            </tr>
            </tbody>
        </table>
    </div>

    <div v-else>
        <form action="" name="form" @submit.prevent="submit">
            <label>Vencimento:</label>
            <input type="text" v-model="bill.date_due"/>
            <br><br>
            <label>Nome:</label>
            <select v-model="bill.name">
                <!--<option v-for="obj in names" value="{{ obj }}">{{ obj }}</option> -->
                <!--<option v-for="obj in names" v-bind:value="obj">{{ obj }}</option> -->
                <option v-for="obj in names" :value="obj">{{ obj }}</option>
            </select>
            <br><br>
            <label>Valor:</label>
            <input type="text" v-model="bill.value" />
            <br><br>
            <input type="checkbox" v-model="bill.done">Pago</input>
            <br><br>
            <button type="submit">Enviar</button>
        </form>
    </div>
    `,
    data: function() {
        return {
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
        };
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
                //var pos = this.bills.indexOf(bill);

                this.bills.$remove(bill);
            }
        }
    }
});

//Registro do componente
Vue.component('app-component', appComponent);

var app = new Vue({
    el: "#app",
});




