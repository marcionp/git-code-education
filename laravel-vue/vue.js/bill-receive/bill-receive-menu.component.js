/**
 * Created by marcio on 06/01/2017.
 */
window.billReceiveMenuComponent = Vue.extend({
    template: `
    <nav>
        <ul>
            <li v-for="obj in menus">
                 <a v-link="{name: obj.routeName}">{{ obj.name }}</a> 
            </li>

        </ul>
    </nav>
    `,
    data: function(){
        return {
            menus: [
                {id: 0, name: "Listar contas a receber", routeName: 'bill.list'},
                {id: 1, name: "Criar conta a receber", routeName: 'bill.create'}
            ],
        };
    }
});
