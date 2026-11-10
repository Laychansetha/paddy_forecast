window.FORECAST_DATA = {
  "meta": {
    "title": "IRCC Long-Term Paddy Purchase & Farmer Forecast Model (2027\u20132033)",
    "organization": "Ibis Rice Conservation Company (IRCC)",
    "generated_at": "2026-11-10T10:35:00+07:00",
    "currency_base": "USD",
    "fx_rate_khr_usd": 4100,
    "default_scenario": "baseline",
    "conversion_timeline": "4 Harvest Cycles (Yr 0 WF -> Yr 1 Ibis I -> Yr 2 Ibis II -> Certified Organic)",
    "incentive_formula": "Total Production (4,420 kg) x 40% x Rate (Yr0: 200, Yr1: 200, Yr2: 250 KHR/kg)",
    "active_baseline_2026": 2564,
    "nc_policy": "Zero double-counting: 2026 baseline (2,564) already excludes 336 NC. From 2027+, proportional 11.59% NC rate (336/2,900) applies across all statuses (WF, Yr1, Yr2, Organic)."
  },
  "historical": {
    "years": [
      2022,
      2023,
      2024,
      2025,
      2026
    ],
    "farmers": {
      "organic_registered": [
        1027,
        1533,
        1809,
        1965,
        1807
      ],
      "organic_selling": [
        772,
        1232,
        1494,
        1567,
        1700
      ],
      "selling_rate_pct": [
        75.2,
        80.4,
        82.6,
        79.7,
        94.1
      ],
      "ibis_ii": [
        97,
        142,
        158,
        0,
        413
      ],
      "ibis_i": [
        179,
        222,
        22,
        468,
        12
      ],
      "wf": [
        266,
        30,
        199,
        17,
        332
      ],
      "nc": [
        372,
        341,
        385,
        428,
        336
      ],
      "total_active": [
        1569,
        1927,
        2188,
        2450,
        2564
      ],
      "total_registered": [
        1941,
        2268,
        2573,
        2878,
        2900
      ]
    },
    "volumes_estimated_kg": {
      "phka_rumduol": [
        1304116,
        2228158,
        2907651,
        3184158,
        2275305
      ],
      "white_rice": [
        229993,
        411854,
        1046105,
        1766258,
        2072561
      ],
      "red_jasmine": [
        15180,
        157775,
        310790,
        512355,
        553526
      ],
      "sticky_rice": [
        29909,
        20410,
        2575,
        4320,
        12300
      ],
      "seed": [
        51305,
        55400,
        65730,
        96790,
        48654
      ],
      "total": [
        1630503,
        2873597,
        4332851,
        5563881,
        4962346
      ]
    },
    "volumes_actual_kg": {
      "phka_rumduol": [
        1087027,
        1770950,
        2061423,
        2302367,
        1611000
      ],
      "white_rice": [
        108510,
        251221,
        535245,
        1090386,
        1394000
      ],
      "red_jasmine": [
        10142,
        109961,
        236313,
        310285,
        410000
      ],
      "seed": [
        41674,
        54689,
        55722,
        68021,
        50000
      ],
      "total": [
        1247353,
        2186821,
        2888703,
        3771059,
        3465000
      ]
    },
    "variety_shares_actual_pct": {
      "phka_rumduol": [
        87.15,
        80.98,
        71.36,
        61.05,
        46.49
      ],
      "white_rice": [
        8.7,
        11.49,
        18.53,
        28.91,
        40.23
      ],
      "red_jasmine": [
        0.81,
        5.03,
        8.18,
        8.23,
        11.83
      ],
      "seed": [
        3.34,
        2.5,
        1.93,
        1.8,
        1.44
      ]
    },
    "realization_rates_pct": {
      "phka_rumduol": [
        83.35,
        79.48,
        70.9,
        72.31,
        70.8
      ],
      "white_rice": [
        47.18,
        61.0,
        51.17,
        61.73,
        67.26
      ],
      "red_jasmine": [
        66.81,
        69.69,
        76.04,
        60.56,
        74.07
      ],
      "seed": [
        81.23,
        98.72,
        84.77,
        70.28,
        102.77
      ],
      "total": [
        76.5,
        76.1,
        66.67,
        67.78,
        69.83
      ]
    },
    "yield_metrics": {
      "avg_kg_per_selling_farmer": [
        1615.7,
        1775.0,
        1933.5,
        2406.5,
        2038.2
      ],
      "avg_kg_per_reg_farmer": [
        1214.6,
        1426.5,
        1596.9,
        1919.1,
        1917.5
      ]
    }
  },
  "scenarios": {
    "baseline": {
      "name": "Baseline (2026 Empirical NC 11.59%, 500 Intake)",
      "parameters": {
        "new_intake_yr0": 500,
        "nc_rate": 0.1159,
        "retention_rate": 0.8841,
        "conversion_cycles": 4,
        "eligible_prod_per_farmer_kg": 4420,
        "eligible_incentive_pct": 0.4
      },
      "years": [
        2026,
        2027,
        2028,
        2029,
        2030,
        2031,
        2032,
        2033
      ],
      "farmers": {
        "selling_paddy": [
          1700,
          1868,
          1661,
          1698,
          1807,
          1904,
          1989,
          2064
        ],
        "transition_yr0": [
          332,
          442,
          442,
          442,
          442,
          442,
          442,
          442
        ],
        "transition_yr1": [
          12,
          294,
          391,
          391,
          391,
          391,
          391,
          391
        ],
        "transition_yr2": [
          413,
          11,
          260,
          346,
          346,
          346,
          346,
          346
        ],
        "total_farmers": [
          2457,
          2615,
          2754,
          2877,
          2986,
          3083,
          3168,
          3243
        ],
        "total_active_farmers_incl_nonsell": [
          2564,
          2710,
          2838,
          2952,
          3052,
          3141,
          3220,
          3289
        ]
      },
      "part1_organic_purchases_kg": {
        "phka_rumduol": [
          1641845,
          1804098,
          1604179,
          1639913,
          1745185,
          1838866,
          1920959,
          1993393
        ],
        "white_rice": [
          1534443,
          1686082,
          1499241,
          1532638,
          1631023,
          1718576,
          1795298,
          1862994
        ],
        "red_jasmine": [
          415145,
          456171,
          405621,
          414657,
          441275,
          464962,
          485720,
          504035
        ],
        "seed": [
          41891,
          46031,
          40930,
          41842,
          44528,
          46918,
          49012,
          50861
        ],
        "total": [
          3633324,
          3992382,
          3549971,
          3629050,
          3862011,
          4069322,
          4250989,
          4411283
        ]
      },
      "part1_organic_purchases_mt": {
        "phka_rumduol": [
          1641.8,
          1804.1,
          1604.2,
          1639.9,
          1745.2,
          1838.9,
          1921.0,
          1993.4
        ],
        "white_rice": [
          1534.4,
          1686.1,
          1499.2,
          1532.6,
          1631.0,
          1718.6,
          1795.3,
          1863.0
        ],
        "red_jasmine": [
          415.1,
          456.2,
          405.6,
          414.7,
          441.3,
          465.0,
          485.7,
          504.0
        ],
        "seed": [
          41.9,
          46.0,
          40.9,
          41.8,
          44.5,
          46.9,
          49.0,
          50.9
        ],
        "total": [
          3633.3,
          3992.4,
          3550.0,
          3629.1,
          3862.0,
          4069.3,
          4251.0,
          4411.3
        ]
      },
      "part2_transition_volumes_kg": {
        "yr0_wf_volume": [
          319841,
          1953640,
          1953640,
          1953640,
          1953640,
          1953640,
          1953640,
          1953640
        ],
        "yr1_volume": [
          479075,
          1299480,
          1728220,
          1728220,
          1728220,
          1728220,
          1728220,
          1728220
        ],
        "yr2_volume": [
          11480,
          48620,
          1149200,
          1529320,
          1529320,
          1529320,
          1529320,
          1529320
        ],
        "combined_volume": [
          810396,
          3301740,
          4831060,
          5211180,
          5211180,
          5211180,
          5211180,
          5211180
        ]
      },
      "part2_transition_volumes_mt": {
        "yr0_wf_volume": [
          319.8,
          1953.6,
          1953.6,
          1953.6,
          1953.6,
          1953.6,
          1953.6,
          1953.6
        ],
        "yr1_volume": [
          479.1,
          1299.5,
          1728.2,
          1728.2,
          1728.2,
          1728.2,
          1728.2,
          1728.2
        ],
        "yr2_volume": [
          11.5,
          48.6,
          1149.2,
          1529.3,
          1529.3,
          1529.3,
          1529.3,
          1529.3
        ],
        "combined_volume": [
          810.4,
          3301.7,
          4831.1,
          5211.2,
          5211.2,
          5211.2,
          5211.2,
          5211.2
        ]
      },
      "incentive_commitments": {
        "yr0_incentive_khr": [
          117395200,
          156291200,
          156291200,
          156291200,
          156291200,
          156291200,
          156291200,
          156291200
        ],
        "yr1_incentive_khr": [
          4243200,
          103958400,
          138257600,
          138257600,
          138257600,
          138257600,
          138257600,
          138257600
        ],
        "yr2_incentive_khr": [
          182546000,
          4862000,
          114920000,
          152932000,
          152932000,
          152932000,
          152932000,
          152932000
        ],
        "total_incentive_khr": [
          304184400,
          265111600,
          409468800,
          447480800,
          447480800,
          447480800,
          447480800,
          447480800
        ],
        "yr0_incentive_usd": [
          28632.98,
          38119.8,
          38119.8,
          38119.8,
          38119.8,
          38119.8,
          38119.8,
          38119.8
        ],
        "yr1_incentive_usd": [
          1034.93,
          25355.71,
          33721.37,
          33721.37,
          33721.37,
          33721.37,
          33721.37,
          33721.37
        ],
        "yr2_incentive_usd": [
          44523.41,
          1185.85,
          28029.27,
          37300.49,
          37300.49,
          37300.49,
          37300.49,
          37300.49
        ],
        "total_incentive_usd": [
          74191.32,
          64661.37,
          99870.44,
          109141.66,
          109141.66,
          109141.66,
          109141.66,
          109141.66
        ]
      }
    },
    "conservative": {
      "name": "Conservative (5-Yr Weighted Avg NC 14.82%, 400 Intake)",
      "parameters": {
        "new_intake_yr0": 400,
        "nc_rate": 0.1482,
        "retention_rate": 0.8518,
        "conversion_cycles": 4,
        "eligible_prod_per_farmer_kg": 4420,
        "eligible_incentive_pct": 0.4
      },
      "years": [
        2026,
        2027,
        2028,
        2029,
        2030,
        2031,
        2032,
        2033
      ],
      "farmers": {
        "selling_paddy": [
          1700,
          1800,
          1542,
          1519,
          1504,
          1491,
          1480,
          1471
        ],
        "transition_yr0": [
          332,
          341,
          341,
          341,
          341,
          341,
          341,
          341
        ],
        "transition_yr1": [
          12,
          283,
          290,
          290,
          290,
          290,
          290,
          290
        ],
        "transition_yr2": [
          413,
          10,
          241,
          247,
          247,
          247,
          247,
          247
        ],
        "total_farmers": [
          2457,
          2434,
          2414,
          2397,
          2382,
          2369,
          2358,
          2349
        ],
        "total_active_farmers_incl_nonsell": [
          2564,
          2525,
          2491,
          2462,
          2438,
          2417,
          2399,
          2384
        ]
      },
      "part1_organic_purchases_kg": {
        "phka_rumduol": [
          1641845,
          1738424,
          1489250,
          1467037,
          1452550,
          1439995,
          1429371,
          1420679
        ],
        "white_rice": [
          1534443,
          1624704,
          1391830,
          1371070,
          1357531,
          1345797,
          1335868,
          1327745
        ],
        "red_jasmine": [
          415145,
          439565,
          376561,
          370944,
          367281,
          364107,
          361420,
          359223
        ],
        "seed": [
          41891,
          44355,
          37998,
          37431,
          37061,
          36741,
          36470,
          36248
        ],
        "total": [
          3633324,
          3847048,
          3295639,
          3246482,
          3214423,
          3186640,
          3163129,
          3143895
        ]
      },
      "part1_organic_purchases_mt": {
        "phka_rumduol": [
          1641.8,
          1738.4,
          1489.2,
          1467.0,
          1452.5,
          1440.0,
          1429.4,
          1420.7
        ],
        "white_rice": [
          1534.4,
          1624.7,
          1391.8,
          1371.1,
          1357.5,
          1345.8,
          1335.9,
          1327.7
        ],
        "red_jasmine": [
          415.1,
          439.6,
          376.6,
          370.9,
          367.3,
          364.1,
          361.4,
          359.2
        ],
        "seed": [
          41.9,
          44.4,
          38.0,
          37.4,
          37.1,
          36.7,
          36.5,
          36.2
        ],
        "total": [
          3633.3,
          3847.0,
          3295.6,
          3246.5,
          3214.4,
          3186.6,
          3163.1,
          3143.9
        ]
      },
      "part2_transition_volumes_kg": {
        "yr0_wf_volume": [
          319841,
          1507220,
          1507220,
          1507220,
          1507220,
          1507220,
          1507220,
          1507220
        ],
        "yr1_volume": [
          479075,
          1250860,
          1281800,
          1281800,
          1281800,
          1281800,
          1281800,
          1281800
        ],
        "yr2_volume": [
          11480,
          44200,
          1065220,
          1091740,
          1091740,
          1091740,
          1091740,
          1091740
        ],
        "combined_volume": [
          810396,
          2802280,
          3854240,
          3880760,
          3880760,
          3880760,
          3880760,
          3880760
        ]
      },
      "part2_transition_volumes_mt": {
        "yr0_wf_volume": [
          319.8,
          1507.2,
          1507.2,
          1507.2,
          1507.2,
          1507.2,
          1507.2,
          1507.2
        ],
        "yr1_volume": [
          479.1,
          1250.9,
          1281.8,
          1281.8,
          1281.8,
          1281.8,
          1281.8,
          1281.8
        ],
        "yr2_volume": [
          11.5,
          44.2,
          1065.2,
          1091.7,
          1091.7,
          1091.7,
          1091.7,
          1091.7
        ],
        "combined_volume": [
          810.4,
          2802.3,
          3854.2,
          3880.8,
          3880.8,
          3880.8,
          3880.8,
          3880.8
        ]
      },
      "incentive_commitments": {
        "yr0_incentive_khr": [
          117395200,
          120577600,
          120577600,
          120577600,
          120577600,
          120577600,
          120577600,
          120577600
        ],
        "yr1_incentive_khr": [
          4243200,
          100068800,
          102544000,
          102544000,
          102544000,
          102544000,
          102544000,
          102544000
        ],
        "yr2_incentive_khr": [
          182546000,
          4420000,
          106522000,
          109174000,
          109174000,
          109174000,
          109174000,
          109174000
        ],
        "total_incentive_khr": [
          304184400,
          225066400,
          329643600,
          332295600,
          332295600,
          332295600,
          332295600,
          332295600
        ],
        "yr0_incentive_usd": [
          28632.98,
          29409.17,
          29409.17,
          29409.17,
          29409.17,
          29409.17,
          29409.17,
          29409.17
        ],
        "yr1_incentive_usd": [
          1034.93,
          24407.02,
          25010.73,
          25010.73,
          25010.73,
          25010.73,
          25010.73,
          25010.73
        ],
        "yr2_incentive_usd": [
          44523.41,
          1078.05,
          25980.98,
          26627.8,
          26627.8,
          26627.8,
          26627.8,
          26627.8
        ],
        "total_incentive_usd": [
          74191.32,
          54894.24,
          80400.88,
          81047.71,
          81047.71,
          81047.71,
          81047.71,
          81047.71
        ]
      }
    },
    "optimistic": {
      "name": "Optimistic (Enhanced Compliance NC 8.50%, 650 Intake)",
      "parameters": {
        "new_intake_yr0": 650,
        "nc_rate": 0.085,
        "retention_rate": 0.915,
        "conversion_cycles": 4,
        "eligible_prod_per_farmer_kg": 4420,
        "eligible_incentive_pct": 0.4
      },
      "years": [
        2026,
        2027,
        2028,
        2029,
        2030,
        2031,
        2032,
        2033
      ],
      "farmers": {
        "selling_paddy": [
          1700,
          1933,
          1779,
          1882,
          2178,
          2449,
          2697,
          2923
        ],
        "transition_yr0": [
          332,
          595,
          595,
          595,
          595,
          595,
          595,
          595
        ],
        "transition_yr1": [
          12,
          304,
          544,
          544,
          544,
          544,
          544,
          544
        ],
        "transition_yr2": [
          413,
          11,
          278,
          498,
          498,
          498,
          498,
          498
        ],
        "total_farmers": [
          2457,
          2843,
          3196,
          3519,
          3815,
          4086,
          4334,
          4560
        ],
        "total_active_farmers_incl_nonsell": [
          2564,
          2941,
          3285,
          3601,
          3890,
          4154,
          4396,
          4617
        ]
      },
      "part1_organic_purchases_kg": {
        "phka_rumduol": [
          1641845,
          1866874,
          1718143,
          1817619,
          2103493,
          2365223,
          2604739,
          2823008
        ],
        "white_rice": [
          1534443,
          1744752,
          1605749,
          1698719,
          1965892,
          2210501,
          2434349,
          2638339
        ],
        "red_jasmine": [
          415145,
          472044,
          434437,
          459590,
          531874,
          598053,
          658615,
          713805
        ],
        "seed": [
          41891,
          47633,
          43838,
          46376,
          53670,
          60348,
          66459,
          72028
        ],
        "total": [
          3633324,
          4131303,
          3802167,
          4022304,
          4654929,
          5234125,
          5764162,
          6247180
        ]
      },
      "part1_organic_purchases_mt": {
        "phka_rumduol": [
          1641.8,
          1866.9,
          1718.1,
          1817.6,
          2103.5,
          2365.2,
          2604.7,
          2823.0
        ],
        "white_rice": [
          1534.4,
          1744.8,
          1605.7,
          1698.7,
          1965.9,
          2210.5,
          2434.3,
          2638.3
        ],
        "red_jasmine": [
          415.1,
          472.0,
          434.4,
          459.6,
          531.9,
          598.1,
          658.6,
          713.8
        ],
        "seed": [
          41.9,
          47.6,
          43.8,
          46.4,
          53.7,
          60.3,
          66.5,
          72.0
        ],
        "total": [
          3633.3,
          4131.3,
          3802.2,
          4022.3,
          4654.9,
          5234.1,
          5764.2,
          6247.2
        ]
      },
      "part2_transition_volumes_kg": {
        "yr0_wf_volume": [
          319841,
          2629900,
          2629900,
          2629900,
          2629900,
          2629900,
          2629900,
          2629900
        ],
        "yr1_volume": [
          479075,
          1343680,
          2404480,
          2404480,
          2404480,
          2404480,
          2404480,
          2404480
        ],
        "yr2_volume": [
          11480,
          48620,
          1228760,
          2201160,
          2201160,
          2201160,
          2201160,
          2201160
        ],
        "combined_volume": [
          810396,
          4022200,
          6263140,
          7235540,
          7235540,
          7235540,
          7235540,
          7235540
        ]
      },
      "part2_transition_volumes_mt": {
        "yr0_wf_volume": [
          319.8,
          2629.9,
          2629.9,
          2629.9,
          2629.9,
          2629.9,
          2629.9,
          2629.9
        ],
        "yr1_volume": [
          479.1,
          1343.7,
          2404.5,
          2404.5,
          2404.5,
          2404.5,
          2404.5,
          2404.5
        ],
        "yr2_volume": [
          11.5,
          48.6,
          1228.8,
          2201.2,
          2201.2,
          2201.2,
          2201.2,
          2201.2
        ],
        "combined_volume": [
          810.4,
          4022.2,
          6263.1,
          7235.5,
          7235.5,
          7235.5,
          7235.5,
          7235.5
        ]
      },
      "incentive_commitments": {
        "yr0_incentive_khr": [
          117395200,
          210392000,
          210392000,
          210392000,
          210392000,
          210392000,
          210392000,
          210392000
        ],
        "yr1_incentive_khr": [
          4243200,
          107494400,
          192358400,
          192358400,
          192358400,
          192358400,
          192358400,
          192358400
        ],
        "yr2_incentive_khr": [
          182546000,
          4862000,
          122876000,
          220116000,
          220116000,
          220116000,
          220116000,
          220116000
        ],
        "total_incentive_khr": [
          304184400,
          322748400,
          525626400,
          622866400,
          622866400,
          622866400,
          622866400,
          622866400
        ],
        "yr0_incentive_usd": [
          28632.98,
          51315.12,
          51315.12,
          51315.12,
          51315.12,
          51315.12,
          51315.12,
          51315.12
        ],
        "yr1_incentive_usd": [
          1034.93,
          26218.15,
          46916.68,
          46916.68,
          46916.68,
          46916.68,
          46916.68,
          46916.68
        ],
        "yr2_incentive_usd": [
          44523.41,
          1185.85,
          29969.76,
          53686.83,
          53686.83,
          53686.83,
          53686.83,
          53686.83
        ],
        "total_incentive_usd": [
          74191.32,
          78719.12,
          128201.56,
          151918.63,
          151918.63,
          151918.63,
          151918.63,
          151918.63
        ]
      }
    }
  },
  "strategy": {
    "market_demand_analysis": {
      "status": "Production expanding to meet growing global organic demand (+43.2% growth to 5,202 MT by 2033).",
      "key_risk": "White Rice demand has expanded dramatically (now 40.2% of purchases). If IRCC does not maintain white rice contracts, non-fragrant producers may sell to non-organic local brokers.",
      "premium_potential": "Red Jasmine provides the highest margin per kg with low pest vulnerability in sandy acidic northern soils."
    },
    "landscape_recruitment_targets": [
      {
        "province": "Preah Vihear (Core)",
        "wildlife_sanctuary": "Kulen Promtep & Chheb Wildlife Sanctuaries",
        "current_farmers": 1420,
        "target_annual_recruitment": 260,
        "priority_varieties": "Phka Rumduol & Red Jasmine",
        "conservation_focus": "Critical Giant Ibis nesting trees; strict prevention of boundary encroachment and cashew plantation expansion."
      },
      {
        "province": "Stung Treng",
        "wildlife_sanctuary": "Siem Pang Wildlife Sanctuary",
        "current_farmers": 580,
        "target_annual_recruitment": 140,
        "priority_varieties": "White Rice & Phka Rumduol",
        "conservation_focus": "White-shouldered Ibis and Vulture feeding grounds; waterhole protection and seasonal grazing control."
      },
      {
        "province": "Mondulkiri / Ratanakiri",
        "wildlife_sanctuary": "Keo Seima & Lumphat Wildlife Sanctuaries",
        "current_farmers": 320,
        "target_annual_recruitment": 70,
        "priority_varieties": "Traditional indigenous varieties & Red Jasmine",
        "conservation_focus": "Indigenous community collective land titles (ICT) and prevention of illegal forest clearing for cash crops."
      },
      {
        "province": "Kratie / Prey Lang",
        "wildlife_sanctuary": "Prey Lang Extended Landscape",
        "current_farmers": 244,
        "target_annual_recruitment": 30,
        "priority_varieties": "White Rice & Phka Rumduol",
        "conservation_focus": "Buffer zone stabilization and compliance with organic certification chemical prohibitions."
      }
    ],
    "planting_recruitment_calendar": [
      {
        "period": "January \u2013 March",
        "phase": "Post-Harvest Compliance Audit & Farmer Review",
        "actions": "Audit chemical tests and GPS land parcels. Identify Non-Compliance (NC) cases. Finalize incentive payments (200 & 250 KHR/kg)."
      },
      {
        "period": "April \u2013 May",
        "phase": "New Farmer Recruitment & Village Agreements",
        "actions": "Engage Village Marketing Networks (VMNs). Sign conservation agreements with ~500 new Year 0 (WF) farmers. Distribute certified organic seed."
      },
      {
        "period": "June \u2013 July",
        "phase": "Nursery Preparation & Land Plowing",
        "actions": "Monitor organic seedbeds. Inspect boundary markers against protected sanctuary forest lines. Provide organic bio-fertilizer training."
      },
      {
        "period": "August \u2013 September",
        "phase": "Transplanting & Early Crop Audits",
        "actions": "Verify no chemical herbicide or pesticide applications. Monitor waterhole buffers and Giant Ibis nest protection zones."
      },
      {
        "period": "October \u2013 November",
        "phase": "Pre-Harvest Yield Estimation & Purchasing Logistics",
        "actions": "Conduct farmer-by-farmer harvest estimation surveys. Calibrate warehouse capacity and dry mill logistics. Set buying price schedule."
      },
      {
        "period": "December \u2013 January",
        "phase": "Paddy Purchasing & Organic Collection",
        "actions": "Procure certified organic paddy at premium prices. Pay farm-gate purchase receipts. Archive traceability records."
      }
    ]
  }
};
