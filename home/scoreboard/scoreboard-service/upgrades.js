define([], function() {
    var Upgrades = [
        {
            name: 'America',
            baseCost: 15,
            cost: 15,
            count: 0,
            enabled: false,
            visible: true,
            change: {
                perSlap: .1,
            },
        },
        {
            name: 'Europe',
            baseCost: 100,
            cost: 100,
            count: 0,
            enabled: false,
            visible: false,
            change: {
                perSec: 1,
            },
        },
        {
            name: 'China',
            baseCost: 500,
            cost: 500,
            count: 0,
            enabled: false,
            visible: false,
            change: {
                perSec: 4,
            },
        },
        {
            name: 'Mexico',
            baseCost: 3000,
            cost: 3000,
            count: 0,
            enabled: false,
            visible: false,
            change: {
                perSec: 10,
            },
        },
        {
            name: 'LGBT Community',
            baseCost: 10000,
            cost: 10000,
            count: 0,
            enabled: false,
            visible: false,
            change: {
                perSec: 40,
            },
        },
        {
            name: 'Syrian Refugees',
            baseCost: 40000,
            cost: 40000,
            count: 0,
            enabled: false,
            visible: false,
            change: {
                perSec: 100,
            },
        },
        {
            name: 'Climate Change',
            baseCost: 200000,
            cost: 200000,
            count: 0,
            enabled: false,
            visible: false,
            change: {
                perSec: 400,
            },
        },
        {
            name: 'Ted Cruz',
            baseCost: 1666666,
            cost: 1666666,
            count: 0,
            enabled: false,
            visible: false,
            change: {
                perSec: 6666,
            },
        },
    ];
    return Upgrades;
});
