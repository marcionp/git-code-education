/**
 * Created by marcio on 06/01/2017.
 */
window.billPayCreateComponent = Vue.extend({
    template: `
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
    `,
    props: ['bill'],
    data: function(){
        return {
            formType: 'insert',
            names: [
                'Conta de Luz',
                'Internet',
                'Cartão',
                'Combustivel'
            ]
        };
    },
    created: function () {
        if (this.$route.name == 'bill.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.index);
            return;
        }
        this.formType = 'insert';
    },
    methods: {
        submit: function(){
            //var billListComponent = this.$parent.$refs.billListComponent;
            if (this.formType == 'insert') {
                this.$root.$children[0].billsPay.push(this.bill);
            }
            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: 0
            };

            this.$router.go({ name: 'bill.list' });
        },
        getBill: function (index) {
            var bills =  this.$root.$children[0].billsPay;
            this.bill = bills[index];
        }
    }
});