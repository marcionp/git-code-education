window.billComponent = Vue.extend({
    template: `
    <nav>
        <ul>
            <li v-for="obj in menus">
                 <a v-link="{name: obj.routeName}">{{ obj.name }}</a> 
            </li>

        </ul>
    </nav>
    <router-view></router-view>
    `,
    data: function(){
        return {
            menus: [
                {name: "Contas a Pagar", routeName: 'bill.pays'},
                {name: "Contas a Receber", routeName: 'bill.receives'}
            ],
        };
    }
});
