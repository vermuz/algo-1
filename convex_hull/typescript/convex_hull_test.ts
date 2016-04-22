import {Point2D, giftWrap2D, graham2D} from './convex_hull';

declare function require(name: string): any;
const assert = require('assert');

interface Test {
    points: Point2D[];
    convexHull: Point2D[];
}

const tests: Test[] = [
    {
        points: [
            {x: 2, y: 3},
        ],
        convexHull: [
            {x: 2, y: 3},
        ],
    },
    {
        points: [
            {x: 2, y: 3},
            {x: 4, y: 5},
        ],
        convexHull: [
            {x: 2, y: 3},
            {x: 4, y: 5},
        ],
    },
    {
        points: [
            {x: 2, y: 3},
            {x: 4, y: 5},
            {x: 0, y: 0},
        ],
        convexHull: [
            {x: 2, y: 3},
            {x: 4, y: 5},
            {x: 0, y: 0},
        ],
    },
    {
        points: [
            {x: 2, y: 3},
            {x: 4, y: 5},
            {x: 0, y: 0},
            {x: 1, y: 3},
        ],
        convexHull: [
            {x: 4, y: 5},
            {x: 0, y: 0},
            {x: 1, y: 3},
        ],
    },
    {
        points: [
            {x: 2, y: 3},
            {x: 4, y: 5},
            {x: 0, y: 0},
            {x: 2, y: 1},
        ],
        convexHull: [
            {x: 2, y: 3},
            {x: 4, y: 5},
            {x: 0, y: 0},
            {x: 2, y: 1},
        ],
    },
    {
        points: [
            {x: 0, y: 3},
            {x: 1, y: 2},
            {x: 1, y: 5},
            {x: 2, y: 4},
            {x: 2, y: 2},
            {x: 3, y: 2},
            {x: 1, y: 0},
            {x: 1, y: 3},
            {x: 1, y: 1},
            {x: 1, y: 4},
            {x: 2, y: 3},
        ],
        convexHull: [
            {x: 0, y: 3},
            {x: 1, y: 5},
            {x: 2, y: 4},
            {x: 3, y: 2},
            {x: 1, y: 0},
        ],
    },
    {
        // Test data from http://stackoverflow.com/a/482287
        points: [
            {x: 0.3215348546593775, y: 0.03629583077160248},
            {x: 0.02402358131857918, y: -0.2356728797179394},
            {x: 0.04590851212470659, y: -0.4156409924995536},
            {x: 0.3218384001607433, y: 0.1379850698988746},
            {x: 0.11506479756447, y: -0.1059521474930943},
            {x: 0.2622539999543261, y: -0.29702873322836},
            {x: -0.161920957418085, y: -0.4055339716426413},
            {x: 0.1905378631228002, y: 0.3698601009043493},
            {x: 0.2387090918968516, y: -0.01629827079949742},
            {x: 0.07495888748668034, y: -0.1659825110491202},
            {x: 0.3319341836794598, y: -0.1821814101954749},
            {x: 0.07703635755650362, y: -0.2499430638271785},
            {x: 0.2069242999022122, y: -0.2232970760420869},
            {x: 0.04604079532068295, y: -0.1923573186549892},
            {x: 0.05054295812784038, y: 0.4754929463150845},
            {x: -0.3900589168910486, y: 0.2797829520700341},
            {x: 0.3120693385713448, y: -0.0506329867529059},
            {x: 0.01138812723698857, y: 0.4002504701728471},
            {x: 0.009645149586391732, y: 0.1060251100976254},
            {x: -0.03597933197019559, y: 0.2953639456959105},
            {x: 0.1818290866742182, y: 0.001454397571696298},
            {x: 0.444056063372694, y: 0.2502497166863175},
            {x: -0.05301752458607545, y: -0.06553921621808712},
            {x: 0.4823896228171788, y: -0.4776170002088109},
            {x: -0.3089226845734964, y: -0.06356112199235814},
            {x: -0.271780741188471, y: 0.1810810595574612},
            {x: 0.4293626522918815, y: 0.2980897964891882},
            {x: -0.004796652127799228, y: 0.382663812844701},
            {x: 0.430695573269106, y: -0.2995073500084759},
            {x: 0.1799668387323309, y: -0.2973467472915973},
            {x: 0.4932166845474547, y: 0.4928094162538735},
            {x: -0.3521487911717489, y: 0.4352656197131292},
            {x: -0.4907368011686362, y: 0.1865826865533206},
            {x: -0.1047924716070224, y: -0.247073392148198},
            {x: 0.4374961861758457, y: -0.001606279519951237},
            {x: 0.003256207800708899, y: -0.2729194320486108},
            {x: 0.04310378203457577, y: 0.4452604050238248},
            {x: 0.4916198379282093, y: -0.345391701297268},
            {x: 0.001675087028811806, y: 0.1531837672490476},
            {x: -0.4404289572876217, y: -0.2894855991839297},
        ],
        convexHull: [
            {x: -0.161920957418085, y: -0.4055339716426413},
            {x: 0.05054295812784038, y: 0.4754929463150845},
            {x: 0.4823896228171788, y: -0.4776170002088109},
            {x: 0.4932166845474547, y: 0.4928094162538735},
            {x: -0.3521487911717489, y: 0.4352656197131292},
            {x: -0.4907368011686362, y: 0.1865826865533206},
            {x: 0.4916198379282093, y: -0.345391701297268},
            {x: -0.4404289572876217, y: -0.2894855991839297},
        ]
    }
];

const compare = (a: Point2D, b: Point2D) => a.x !== b.x ? a.x - b.x : a.y - b.y;

function runTest(test: Test, fn: (points: Point2D[]) => Point2D[]) {
    const actual = fn(test.convexHull).sort(compare);
    const expected = test.convexHull.sort(compare);
    assert.deepEqual(actual, expected);
}

[giftWrap2D, graham2D].forEach(fn => tests.forEach(test => runTest(test, fn)));

console.log('All tests OK.');