/**
 * Created by marcio on 06/01/2017.
 */
window.billReceiveComponent = Vue.extend({
    components: {
        'bill-receive-menu-component': billReceiveMenuComponent
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
            {{ countPendingBill | reportStatus 'receber' }}
        </h3>
    </div>

    <bill-receive-menu-component></bill-receive-menu-component>
    <router-view></router-view>
    `,
    data: function() {
        return {
            title: "Contas a receber",
        };
    },
    computed: {
        countBill: function () {
            var bills = this.$root.$children[0].billsReceive;
            return bills.length;
        },
        countPendingBill: function () {
            var count = -1;
            var bills = this.$root.$children[0].billsReceive;
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