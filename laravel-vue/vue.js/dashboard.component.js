window.dashBoardComponent = Vue.extend({
    template: `
    <div>
        <h1>{{ title }}</h1>
        <hr>
        <h2>{{ subtitle }}</h2>
        <span><strong>{{ balance | currency 'R$ ' }}</strong></span>
    </div>
    <router-view></router-view>
    `,
    data: function(){
        return {
            title: "Dashboard",
            subtitle: "Balanço Atual (Contas a Receber - Contas a Pagar)"
        }
    },
    computed: {
        balance: function () {
            var billsReceive = this.$root.$children[0].billsReceive;
            var billsPay = this.$root.$children[0].billsPay;

            var receiveSum = 0;
            var paySum = 0;

            for (var r in billsReceive) {
                receiveSum += billsReceive[r].value;
            }
            for (var p in billsPay) {
                paySum += billsPay[p].value;
            }

            return receiveSum - paySum;
        }
    }
    
});
