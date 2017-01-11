/**
 * Created by marcio on 06/01/2017.
 */
window.billPayMenuComponent = Vue.extend({
    template: `
    <nav>
        <ul>
            <li v-for="obj in menus">
                <!--<a href="#" @click.prevent="showView(obj.id)">{{ obj.name }}</a> -->
                <!-- <a v-link="{path: obj.url}">{{ obj.name }}</a> -->
                 <a v-link="{name: obj.routeName}">{{ obj.name }}</a> 
            </li>

        </ul>
    </nav>
    `,
    data: function(){
        return {
            menus: [
                /*
                {id: 0, name: "Listar contas", url: '/billsPay'},
                {id: 1, name: "Criar conta", url: 'bill/create'}
                */
                {id: 0, name: "Listar contas", routeName: 'bill.list'},
                {id: 1, name: "Criar conta", routeName: 'bill.create'}
            ],
        };
    }
});
