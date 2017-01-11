var router = new VueRouter();

var mainComponent = Vue.extend({
    components: {
        'bill-component': billComponent
    },
    template: '<bill-component></bill-component>',
    data: function () {
        return {
            billsPay: [
                {date_due: '01/01/2017', name: 'Conta de Luz', value: 98.00, done: 1},
                {date_due: '10/01/2017', name: 'Internet', value: 100.00, done: 0},
                {date_due: '15/01/2017', name: 'Cartão', value: 2000.00, done: 1},
                {date_due: '01/03/2017', name: 'Combustivel', value: 420.00, done: 0},
            ],
            billsReceive: [
                {date_due: '20/01/2017', name: 'Serviços prestados', value: 5000.00, done: 1},
                {date_due: '15/03/2017', name: 'Locações', value: 1000.00, done: 0},
                {date_due: '21/02/2017', name: 'Restituição', value: 2000.00, done: 1},
            ]
        };
    }
});

router.map({
    '/': {
        name: 'dashboard',
        component: dashBoardComponent
    },
    '/bill-pays': {
        name: 'bill.pays',
        component: billPayComponent,
        subRoutes: {
            '/': {
                name: 'bill.list',
                component: billPayListComponent
            },
            '/create': {
                name: 'bill.create',
                component: billPayCreateComponent
            },
            '/:index/update': {
                name: 'bill.update',
                component: billPayCreateComponent
            },
            '*': {
                component: billPayListComponent
            }
        }
    },
    '/bill-receives': {
        name: 'bill.receives',
        component: billReceiveComponent,
        subRoutes: {
            '/': {
                name: 'bill.list',
                component: billReceiveListComponent
            },
            '/create': {
                name: 'bill.create',
                component: billReceiveCreateComponent
            },
            '/:index/update': {
                name: 'bill.update',
                component: billReceiveCreateComponent
            },
            '*': {
                component: billReceiveListComponent
            }
        }
    }
});

router.start({
    components: {
        'main-component': mainComponent
    }
}, '#app');

//Rotas invalidas sao reescritas
router.redirect({
    '*': '/dashoboard'
});