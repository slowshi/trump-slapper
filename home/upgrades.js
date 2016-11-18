define([], function() {
  var Upgrades = [
    {
      id: 1,
      name: 'Americans',
      baseCost: 15,
      change: {
        perSlap: 0.1
      }
    },
    {
      id: 2,
      name: 'Democrats',
      baseCost: 100,
      change: {
        perSec: 1
      }
    },
    {
      id: 3,
      name: 'Mexico',
      baseCost: 500,
      change: {
        perSec: 4
      }
    },
    {
      id: 4,
      name: 'Syrian Refugees',
      baseCost: 3000,
      change: {
        perSec: 10
      }
    },
    {
      id: 5,
      name: 'China',
      baseCost: 10000,
      change: {
        perSec: 40
      }
    },
    {
      id: 6,
      name: 'Scientists',
      baseCost: 40000,
      change: {
        perSec: 100
      }
    },
    {
      id: 7,
      name: 'Women',
      baseCost: 200000,
      change: {
        perSec: 400
      }
    },
    {
      id: 8,
      name: '??',
      baseCost: 1666666,
      change: {
        perSec: 6666
      }
    }
  ];
  return Upgrades;
});
