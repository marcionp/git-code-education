/**
 * Created by marcio on 06/01/2017.
 */
window.billPayComponent = Vue.extend({
    components: {
        'bill-pay-menu-component': billPayMenuComponent
    },
    template: `
    <style type="text/css">
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
            {{ countPendingBill | reportStatus 'pagar'}}
        </h3>
    </div>

    <bill-pay-menu-component></bill-pay-menu-component>
    <router-view></router-view>
    <!--
    <div v-show="activedView == 0">
        
        <bill-list-component v-ref:bill-list-component></bill-list-component>
        
    </div>
    
    <div v-show="activedView == 1">
        <bill-create-component :bill.sync="bill"></bill-create-component>
    </div>
    -->
    `,
    data: function() {
        return {
            title: "Contas a pagar",
        };
    },
    computed: {
        countBill: function () {
            var bills = this.$root.$children[0].billsPay;
            return bills.length;
        },
        countPendingBill: function () {
            var count = -1;
            var bills = this.$root.$children[0].billsPay;
            if (bills.length > 0) {
                count = 0;
            }
            for (var i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }
            return count;
        }
    },

    methods: {
    }
});