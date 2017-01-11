/**
 * Created by marcio on 06/01/2017.
 */
window.billReceiveListComponent = Vue.extend({
    template: `
        <style type="text/css">
        .recebido{
            color: green;
        }
        .em-aberto{
            color: red;
        }
        </style>
        <table border="1px" cellpadding="10px">
            <thead>
            <tr>
                <th>Vencimento</th>
                <th>Nome</th>
                <th>Valor</th>
                <th>Recebido?</th>
                <th colspan="3">Ações</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(index, obj) in bills">
                <td> {{ obj.date_due }}</td>
                <td> {{ obj.name }} </td>
                <td> {{ obj.value | currency 'R$ ' 2 }}</td>
                <!-- <td v-bind:class="{'pago' : obj.done, 'emAberto' : !obj.done }"> -->
                <td class="minha-classe" v-bind:class="{'recebido' : obj.done, 'em-aberto' : !obj.done }">
                    {{ obj.done | doneLabel}}
                </td>
                <td>
                    <!-- <a href="#" @click.prevent="loadBill(obj)">Editar</a> -->
                    <a v-link="{ name: 'bill.update', params: {index: index } }">Editar</a>
                </td>
                <td>
                    <a href="#" @click.prevent="killBill(obj)">Excluir</a>
                </td>
                <td v-if="!obj.done">
                    <a href="#" @click.prevent="writeOffBill(obj)">Informar Recebimento</a>
                </td>
                <td v-else="!obj.done">
                    -
                </td>
            </tr>
            </tbody>
        </table>
    `,
    data: function()
    {
        return {
            bills: this.$root.$children[0].billsReceive
        };
    },
    methods: {
        writeOffBill: function (bill) {
            if (confirm("Confirma recebimento?")) {
                bill.done = 1;
            }
        },
        killBill: function (bill) {
            if (confirm("Confirma exclusão de conta " + bill.name + " no valor de " + bill.value + "?")) {
                this.$root.$children[0].billsReceive.$remove(bill);
            }
        }
    }

});