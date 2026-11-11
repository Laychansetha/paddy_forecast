window.FORECAST_DATA = {
  "meta": {
    "title": "IRCC Long-Term Paddy Purchase & Farmer Forecast Model (2027\u20132033)",
    "organization": "Ibis Rice Conservation Company (IRCC)",
    "generated_at": "2026-11-11T14:06:00+07:00",
    "currency_base": "USD",
    "fx_rate_khr_usd": 4100,
    "default_scenario": "baseline",
    "sources": [
      "expected_to_sell_vs_actual_sell_2022-2026.xlsx",
      "estimate_production_vs_actual_production.xlsx",
      "general_data.xlsx"
    ],
    "organic_eligible_varieties": [
      "Phka Rumduol",
      "White Rice",
      "Red Jasmine",
      "Seed"
    ],
    "organic_excluded_varieties": [
      "Sticky Rice"
    ],
    "transition_all_varieties": [
      "Phka Rumduol",
      "White Rice",
      "Red Jasmine",
      "Sticky Rice",
      "Seed"
    ],
    "incentive_eligible_varieties": [
      "Phka Rumduol",
      "White Rice",
      "Red Jasmine",
      "Seed"
    ],
    "conversion_timeline": "4 Harvest Cycles (Yr 0 WF -> Yr 1 Ibis I -> Yr 2 Ibis II -> Yr 3+ Certified Organic Eligible)",
    "incentive_formula": "Eligible 4-Variety Farm Production (96.65% of 4,420 kg; Sticky Rice excluded) x 40% x Rate (WF & Yr1: 200, Yr2: 250 KHR/kg)",
    "active_baseline_2026": 2564,
    "historical_summary": {
      "weighted_5yr_realization_pct": 70.28,
      "simple_5yr_realization_pct": 71.82,
      "weighted_5yr_kg_per_seller": 2004.28,
      "weighted_5yr_selling_rate_pct": 83.1,
      "mean_5yr_nc_rate_pct": 15.13,
      "nc_rate_2026_pct": 11.59,
      "kg_per_seller_2026": 2038.24,
      "selling_rate_2026_pct": 94.08,
      "cagr_2022_2026": {
        "selling_farmers_cagr_pct": 21.82,
        "total_purchases_cagr_pct": 29.1,
        "avg_kg_per_seller_cagr_pct": 5.98,
        "median_yoy_farmers_pct": 14.88,
        "median_yoy_volume_pct": 31.32,
        "median_yoy_avg_kg_pct": 9.39,
        "ols_slope_kg_per_year": 147.65,
        "growth_method_note": "Existing organic farmer delivery uses damped empirical CAGR (+5.98% tapering x0.80/yr, bounded by 60% harvest ceiling = 2,652 kg/seller) to smooth the 2025 (+24.46%) spike & 2026 (-15.30%) pullback; newly graduated farmers enter at 2,038.24 kg/seller separately to avoid double-counting."
      }
    },
    "variety_shares_pct": {
      "part1_organic_2022_2026_eligible4": {
        "phka_rumduol": 65.14,
        "white_rice": 24.92,
        "red_jasmine": 7.94,
        "seed": 1.99
      },
      "part2_transition_2022_2026_all5": {
        "phka_rumduol": 39.69,
        "white_rice": 55.94,
        "red_jasmine": 0.99,
        "sticky_rice": 3.35,
        "seed": 0.03
      },
      "part2_eligible4_share_5yr_pct": 96.65,
      "part2_eligible4_share_2026_pct": 97.54,
      "part2_stage_shares_by_year": {
        "wf": [
          {
            "phka_rumduol": 21.67,
            "white_rice": 74.14,
            "red_jasmine": 1.64,
            "sticky_rice": 2.46,
            "seed": 0.09
          },
          {
            "phka_rumduol": 43.2,
            "white_rice": 52.02,
            "red_jasmine": 1.4,
            "sticky_rice": 3.35,
            "seed": 0.03
          },
          {
            "phka_rumduol": 46.1,
            "white_rice": 48.77,
            "red_jasmine": 1.75,
            "sticky_rice": 3.35,
            "seed": 0.03
          },
          {
            "phka_rumduol": 48.8,
            "white_rice": 45.72,
            "red_jasmine": 2.1,
            "sticky_rice": 3.35,
            "seed": 0.03
          },
          {
            "phka_rumduol": 51.3,
            "white_rice": 42.87,
            "red_jasmine": 2.45,
            "sticky_rice": 3.35,
            "seed": 0.03
          },
          {
            "phka_rumduol": 53.6,
            "white_rice": 40.22,
            "red_jasmine": 2.8,
            "sticky_rice": 3.35,
            "seed": 0.03
          },
          {
            "phka_rumduol": 55.7,
            "white_rice": 37.82,
            "red_jasmine": 3.1,
            "sticky_rice": 3.35,
            "seed": 0.03
          },
          {
            "phka_rumduol": 57.6,
            "white_rice": 35.62,
            "red_jasmine": 3.4,
            "sticky_rice": 3.35,
            "seed": 0.03
          }
        ],
        "ibis_i": [
          {
            "phka_rumduol": 21.67,
            "white_rice": 74.14,
            "red_jasmine": 1.64,
            "sticky_rice": 2.46,
            "seed": 0.09
          },
          {
            "phka_rumduol": 47.4,
            "white_rice": 47.32,
            "red_jasmine": 1.9,
            "sticky_rice": 3.35,
            "seed": 0.03
          },
          {
            "phka_rumduol": 50.2,
            "white_rice": 44.12,
            "red_jasmine": 2.3,
            "sticky_rice": 3.35,
            "seed": 0.03
          },
          {
            "phka_rumduol": 52.8,
            "white_rice": 41.12,
            "red_jasmine": 2.7,
            "sticky_rice": 3.35,
            "seed": 0.03
          },
          {
            "phka_rumduol": 55.2,
            "white_rice": 38.32,
            "red_jasmine": 3.1,
            "sticky_rice": 3.35,
            "seed": 0.03
          },
          {
            "phka_rumduol": 57.4,
            "white_rice": 35.72,
            "red_jasmine": 3.5,
            "sticky_rice": 3.35,
            "seed": 0.03
          },
          {
            "phka_rumduol": 59.5,
            "white_rice": 33.27,
            "red_jasmine": 3.85,
            "sticky_rice": 3.35,
            "seed": 0.03
          },
          {
            "phka_rumduol": 61.4,
            "white_rice": 31.02,
            "red_jasmine": 4.2,
            "sticky_rice": 3.35,
            "seed": 0.03
          }
        ],
        "ibis_ii": [
          {
            "phka_rumduol": 21.67,
            "white_rice": 74.14,
            "red_jasmine": 1.64,
            "sticky_rice": 2.46,
            "seed": 0.09
          },
          {
            "phka_rumduol": 51.6,
            "white_rice": 42.62,
            "red_jasmine": 2.4,
            "sticky_rice": 3.35,
            "seed": 0.03
          },
          {
            "phka_rumduol": 54.3,
            "white_rice": 39.47,
            "red_jasmine": 2.85,
            "sticky_rice": 3.35,
            "seed": 0.03
          },
          {
            "phka_rumduol": 56.8,
            "white_rice": 36.52,
            "red_jasmine": 3.3,
            "sticky_rice": 3.35,
            "seed": 0.03
          },
          {
            "phka_rumduol": 59.1,
            "white_rice": 33.77,
            "red_jasmine": 3.75,
            "sticky_rice": 3.35,
            "seed": 0.03
          },
          {
            "phka_rumduol": 61.2,
            "white_rice": 31.22,
            "red_jasmine": 4.2,
            "sticky_rice": 3.35,
            "seed": 0.03
          },
          {
            "phka_rumduol": 63.2,
            "white_rice": 28.77,
            "red_jasmine": 4.65,
            "sticky_rice": 3.35,
            "seed": 0.03
          },
          {
            "phka_rumduol": 65.1,
            "white_rice": 26.42,
            "red_jasmine": 5.1,
            "sticky_rice": 3.35,
            "seed": 0.03
          }
        ],
        "shift_note": "From 2027-2033, transition farmers progressively shift +3-5%/step from lower-priced White Rice into high-value Phka Rumduol (reaching 65.1% at Ibis II by 2033) & Red Jasmine, while keeping Sticky Rice (3.35%) and Seed (0.03%) constant."
      }
    }
  },
  "historical": {
    "years": [
      2022,
      2023,
      2024,
      2025,
      2026
    ],
    "organic_sales": {
      "2022": {
        "exp_farmers": 1027,
        "act_farmers": 772,
        "non_selling_farmers": 255,
        "selling_rate_pct": 75.17,
        "expected_kg": {
          "phka_rumduol": 1304116,
          "white_rice": 229993,
          "red_jasmine": 15180,
          "seed": 51305,
          "sticky_rice_excluded": 29909,
          "eligible4_total": 1600594
        },
        "actual_kg": {
          "phka_rumduol": 1087027,
          "white_rice": 108510,
          "red_jasmine": 10142,
          "seed": 41674,
          "eligible4_total": 1247353
        },
        "realization_eligible4_pct": 77.93,
        "kg_per_seller": 1615.74,
        "yoy_farmers_pct": null,
        "yoy_volume_pct": null,
        "yoy_kg_per_seller_pct": null
      },
      "2023": {
        "exp_farmers": 1533,
        "act_farmers": 1232,
        "non_selling_farmers": 301,
        "selling_rate_pct": 80.37,
        "expected_kg": {
          "phka_rumduol": 2228158,
          "white_rice": 411854,
          "red_jasmine": 157775,
          "seed": 55400,
          "sticky_rice_excluded": 20410,
          "eligible4_total": 2853187
        },
        "actual_kg": {
          "phka_rumduol": 1770950,
          "white_rice": 251221,
          "red_jasmine": 109961,
          "seed": 54689,
          "eligible4_total": 2186821
        },
        "realization_eligible4_pct": 76.64,
        "kg_per_seller": 1775.02,
        "yoy_farmers_pct": 59.59,
        "yoy_volume_pct": 75.32,
        "yoy_kg_per_seller_pct": 9.86
      },
      "2024": {
        "exp_farmers": 1809,
        "act_farmers": 1494,
        "non_selling_farmers": 315,
        "selling_rate_pct": 82.59,
        "expected_kg": {
          "phka_rumduol": 2907651,
          "white_rice": 1046105,
          "red_jasmine": 310790,
          "seed": 65730,
          "sticky_rice_excluded": 2575,
          "eligible4_total": 4330276
        },
        "actual_kg": {
          "phka_rumduol": 2061423,
          "white_rice": 535245,
          "red_jasmine": 236313,
          "seed": 55722,
          "eligible4_total": 2888703
        },
        "realization_eligible4_pct": 66.71,
        "kg_per_seller": 1933.54,
        "yoy_farmers_pct": 21.27,
        "yoy_volume_pct": 32.1,
        "yoy_kg_per_seller_pct": 8.93
      },
      "2025": {
        "exp_farmers": 1965,
        "act_farmers": 1567,
        "non_selling_farmers": 398,
        "selling_rate_pct": 79.75,
        "expected_kg": {
          "phka_rumduol": 3184158,
          "white_rice": 1766258,
          "red_jasmine": 512355,
          "seed": 96790,
          "sticky_rice_excluded": 4320,
          "eligible4_total": 5559561
        },
        "actual_kg": {
          "phka_rumduol": 2302367,
          "white_rice": 1090386,
          "red_jasmine": 310285,
          "seed": 68021,
          "eligible4_total": 3771059
        },
        "realization_eligible4_pct": 67.83,
        "kg_per_seller": 2406.55,
        "yoy_farmers_pct": 4.89,
        "yoy_volume_pct": 30.55,
        "yoy_kg_per_seller_pct": 24.46
      },
      "2026": {
        "exp_farmers": 1807,
        "act_farmers": 1700,
        "non_selling_farmers": 107,
        "selling_rate_pct": 94.08,
        "expected_kg": {
          "phka_rumduol": 2275305,
          "white_rice": 2072561,
          "red_jasmine": 553526,
          "seed": 48654,
          "sticky_rice_excluded": 12300,
          "eligible4_total": 4950046
        },
        "actual_kg": {
          "phka_rumduol": 1611000,
          "white_rice": 1394000,
          "red_jasmine": 410000,
          "seed": 50000,
          "eligible4_total": 3465000
        },
        "realization_eligible4_pct": 70.0,
        "kg_per_seller": 2038.24,
        "yoy_farmers_pct": 8.49,
        "yoy_volume_pct": -8.12,
        "yoy_kg_per_seller_pct": -15.3
      }
    },
    "transition_production": {
      "2022": {
        "stages": {
          "Ibis II": {
            "farmers": 97,
            "phka_rumduol": 248376,
            "white_rice": 122709,
            "red_jasmine": 3240,
            "sticky_rice": 6989,
            "seed": 0,
            "total": 381314
          },
          "Ibis I": {
            "farmers": 179,
            "phka_rumduol": 360802,
            "white_rice": 200450,
            "red_jasmine": 2900,
            "sticky_rice": 34008,
            "seed": 0,
            "total": 598160
          },
          "WF": {
            "farmers": 266,
            "phka_rumduol": 355530,
            "white_rice": 280711,
            "red_jasmine": 6500,
            "sticky_rice": 41672,
            "seed": 0,
            "total": 684413
          }
        },
        "col_i": 1663887,
        "col_j": 1560382,
        "expected_kg": {
          "phka_rumduol": 964708,
          "white_rice": 603870,
          "red_jasmine": 12640,
          "sticky_rice": 82669,
          "seed": 0,
          "eligible4_total": 1581218,
          "total": 1663887
        },
        "expected_shares_pct": {
          "phka_rumduol": 57.98,
          "white_rice": 36.29,
          "red_jasmine": 0.76,
          "sticky_rice": 4.97,
          "seed": 0.0
        },
        "eligible4_share_pct": 95.03,
        "actual_total_kg": 1560382,
        "estimated_actual_allocation_kg": {
          "phka_rumduol": 904697,
          "white_rice": 566305,
          "red_jasmine": 11854,
          "sticky_rice": 77526,
          "seed": 0,
          "eligible4_total": 1482856,
          "total": 1560382
        },
        "realization_pct": 93.78,
        "farmers_total": 542,
        "avg_actual_kg_per_farmer": 2878.9
      },
      "2023": {
        "stages": {
          "Ibis II": {
            "farmers": 142,
            "phka_rumduol": 253370,
            "white_rice": 185562,
            "red_jasmine": 1700,
            "sticky_rice": 8567,
            "seed": 0,
            "total": 449199
          },
          "Ibis I": {
            "farmers": 222,
            "phka_rumduol": 495435,
            "white_rice": 256248,
            "red_jasmine": 2088,
            "sticky_rice": 39020,
            "seed": 0,
            "total": 792791
          },
          "WF": {
            "farmers": 30,
            "phka_rumduol": 52460,
            "white_rice": 35505,
            "red_jasmine": 0,
            "sticky_rice": 2440,
            "seed": 0,
            "total": 90405
          }
        },
        "col_i": 1332395,
        "col_j": 1258666,
        "expected_kg": {
          "phka_rumduol": 801265,
          "white_rice": 477315,
          "red_jasmine": 3788,
          "sticky_rice": 50027,
          "seed": 0,
          "eligible4_total": 1282368,
          "total": 1332395
        },
        "expected_shares_pct": {
          "phka_rumduol": 60.14,
          "white_rice": 35.82,
          "red_jasmine": 0.28,
          "sticky_rice": 3.75,
          "seed": 0.0
        },
        "eligible4_share_pct": 96.25,
        "actual_total_kg": 1258666,
        "estimated_actual_allocation_kg": {
          "phka_rumduol": 756927,
          "white_rice": 450902,
          "red_jasmine": 3578,
          "sticky_rice": 47259,
          "seed": 0,
          "eligible4_total": 1211407,
          "total": 1258666
        },
        "realization_pct": 94.47,
        "farmers_total": 394,
        "avg_actual_kg_per_farmer": 3194.6
      },
      "2024": {
        "stages": {
          "Ibis II": {
            "farmers": 158,
            "phka_rumduol": 322354,
            "white_rice": 201250,
            "red_jasmine": 4700,
            "sticky_rice": 27320,
            "seed": 0,
            "total": 555624
          },
          "Ibis I": {
            "farmers": 22,
            "phka_rumduol": 36310,
            "white_rice": 22150,
            "red_jasmine": 0,
            "sticky_rice": 666,
            "seed": 0,
            "total": 59126
          },
          "WF": {
            "farmers": 199,
            "phka_rumduol": 329113,
            "white_rice": 391883,
            "red_jasmine": 5300,
            "sticky_rice": 17699,
            "seed": 0,
            "total": 743995
          }
        },
        "col_i": 1358745,
        "col_j": 1128681,
        "expected_kg": {
          "phka_rumduol": 687777,
          "white_rice": 615283,
          "red_jasmine": 10000,
          "sticky_rice": 45685,
          "seed": 0,
          "eligible4_total": 1313060,
          "total": 1358745
        },
        "expected_shares_pct": {
          "phka_rumduol": 50.62,
          "white_rice": 45.28,
          "red_jasmine": 0.74,
          "sticky_rice": 3.36,
          "seed": 0.0
        },
        "eligible4_share_pct": 96.64,
        "actual_total_kg": 1128681,
        "estimated_actual_allocation_kg": {
          "phka_rumduol": 571321,
          "white_rice": 511103,
          "red_jasmine": 8307,
          "sticky_rice": 37950,
          "seed": 0,
          "eligible4_total": 1090731,
          "total": 1128681
        },
        "realization_pct": 83.07,
        "farmers_total": 379,
        "avg_actual_kg_per_farmer": 2978.1
      },
      "2025": {
        "stages": {
          "Ibis II": {
            "farmers": 0,
            "phka_rumduol": 0,
            "white_rice": 3850,
            "red_jasmine": 0,
            "sticky_rice": 0,
            "seed": 0,
            "total": 3850
          },
          "Ibis I": {
            "farmers": 468,
            "phka_rumduol": 161648,
            "white_rice": 259704,
            "red_jasmine": 2070,
            "sticky_rice": 2274,
            "seed": 0,
            "total": 425696
          },
          "WF": {
            "farmers": 17,
            "phka_rumduol": 460729,
            "white_rice": 991577,
            "red_jasmine": 13332,
            "sticky_rice": 58915,
            "seed": 0,
            "total": 1524553
          }
        },
        "col_i": 1954099,
        "col_j": 1557135,
        "expected_kg": {
          "phka_rumduol": 622377,
          "white_rice": 1255131,
          "red_jasmine": 15402,
          "sticky_rice": 61189,
          "seed": 0,
          "eligible4_total": 1892910,
          "total": 1954099
        },
        "expected_shares_pct": {
          "phka_rumduol": 31.85,
          "white_rice": 64.23,
          "red_jasmine": 0.79,
          "sticky_rice": 3.13,
          "seed": 0.0
        },
        "eligible4_share_pct": 96.87,
        "actual_total_kg": 1557135,
        "estimated_actual_allocation_kg": {
          "phka_rumduol": 495945,
          "white_rice": 1000158,
          "red_jasmine": 12273,
          "sticky_rice": 48759,
          "seed": 0,
          "eligible4_total": 1508376,
          "total": 1557135
        },
        "realization_pct": 79.69,
        "farmers_total": 485,
        "avg_actual_kg_per_farmer": 3210.6
      },
      "2026": {
        "stages": {
          "Ibis II": {
            "farmers": 413,
            "phka_rumduol": 3000,
            "white_rice": 28030,
            "red_jasmine": 0,
            "sticky_rice": 200,
            "seed": 3000,
            "total": 34230
          },
          "Ibis I": {
            "farmers": 12,
            "phka_rumduol": 406830,
            "white_rice": 1158729,
            "red_jasmine": 40036,
            "sticky_rice": 43095,
            "seed": 0,
            "total": 1648690
          },
          "WF": {
            "farmers": 332,
            "phka_rumduol": 277910,
            "white_rice": 1165585,
            "red_jasmine": 11900,
            "sticky_rice": 34740,
            "seed": 0,
            "total": 1490135
          }
        },
        "col_i": 3173055,
        "col_j": 2614359,
        "expected_kg": {
          "phka_rumduol": 687740,
          "white_rice": 2352344,
          "red_jasmine": 51936,
          "sticky_rice": 78035,
          "seed": 3000,
          "eligible4_total": 3095020,
          "total": 3173055
        },
        "expected_shares_pct": {
          "phka_rumduol": 21.67,
          "white_rice": 74.13,
          "red_jasmine": 1.64,
          "sticky_rice": 2.46,
          "seed": 0.09
        },
        "eligible4_share_pct": 97.54,
        "actual_total_kg": 2614359,
        "estimated_actual_allocation_kg": {
          "phka_rumduol": 566646,
          "white_rice": 1938155,
          "red_jasmine": 42791,
          "sticky_rice": 64295,
          "seed": 2472,
          "eligible4_total": 2550064,
          "total": 2614359
        },
        "realization_pct": 82.39,
        "farmers_total": 757,
        "avg_actual_kg_per_farmer": 3453.6
      }
    },
    "compliance": {
      "2022": {
        "organic_eligible": 1027,
        "organic_selling": 772,
        "organic_non_selling": 255,
        "wf": 266,
        "ibis_i": 179,
        "ibis_ii": 97,
        "total_transition": 542,
        "total_active": 1569,
        "nc_farmers": 372,
        "total_registered": 1941,
        "nc_rate_pct": 19.17
      },
      "2023": {
        "organic_eligible": 1533,
        "organic_selling": 1232,
        "organic_non_selling": 301,
        "wf": 30,
        "ibis_i": 222,
        "ibis_ii": 142,
        "total_transition": 394,
        "total_active": 1927,
        "nc_farmers": 341,
        "total_registered": 2268,
        "nc_rate_pct": 15.04
      },
      "2024": {
        "organic_eligible": 1809,
        "organic_selling": 1494,
        "organic_non_selling": 315,
        "wf": 199,
        "ibis_i": 22,
        "ibis_ii": 158,
        "total_transition": 379,
        "total_active": 2188,
        "nc_farmers": 385,
        "total_registered": 2573,
        "nc_rate_pct": 14.96
      },
      "2025": {
        "organic_eligible": 1965,
        "organic_selling": 1567,
        "organic_non_selling": 398,
        "wf": 17,
        "ibis_i": 468,
        "ibis_ii": 0,
        "total_transition": 485,
        "total_active": 2450,
        "nc_farmers": 428,
        "total_registered": 2878,
        "nc_rate_pct": 14.87
      },
      "2026": {
        "organic_eligible": 1807,
        "organic_selling": 1700,
        "organic_non_selling": 107,
        "wf": 332,
        "ibis_i": 12,
        "ibis_ii": 413,
        "total_transition": 757,
        "total_active": 2564,
        "nc_farmers": 336,
        "total_registered": 2900,
        "nc_rate_pct": 11.59
      }
    }
  },
  "scenarios": {
    "baseline": {
      "label": "Baseline Forecast",
      "description": "Damped empirical 2022\u20132026 delivery growth (+5.98% tapering x0.80/yr, capped at 60% harvest = 2,652 kg/seller) on Existing 2026 cohort + 2,038 kg entry rate on Newly Certified graduates; 11.59% NC, 500/yr intake, 94.08% participation.",
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
      "is_actual": [
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      "parameters": {
        "nc_rate_pct": 11.59,
        "retention_rate_pct": 88.41,
        "annual_new_intake": 500,
        "organic_selling_rate_pct": 94.08,
        "existing_base_kg_per_seller": 2038.24,
        "existing_init_growth_pct": 5.98,
        "existing_decay_factor": 0.8,
        "existing_ceiling_kg": 2652.0,
        "graduated_entry_kg_per_seller": 2038.24,
        "avg_ha_per_farmer": 2.6,
        "avg_yield_mt_per_ha": 1.7,
        "farm_prod_kg_per_farmer": 4420,
        "transition_elig4_share_5yr_pct": 96.65,
        "incentive_coverage_pct": 40.0,
        "rate_wf_y1_khr": 200,
        "rate_y2_khr": 250
      },
      "part1_supply_components": {
        "existing_avg_kg_per_seller": [
          2038.24,
          2160.11,
          2263.43,
          2350.05,
          2421.99,
          2481.31,
          2529.93,
          2569.58
        ],
        "existing_yoy_growth_pct": [
          null,
          5.98,
          4.78,
          3.83,
          3.06,
          2.45,
          1.96,
          1.57
        ],
        "graduated_avg_kg_per_seller": [
          0.0,
          2038.24,
          2038.24,
          2038.24,
          2038.24,
          2038.24,
          2038.24,
          2038.24
        ],
        "blended_avg_kg_per_seller": [
          2038.24,
          2137.41,
          2220.51,
          2257.89,
          2264.53,
          2258.57,
          2246.18,
          2230.43
        ],
        "existing_volume_kg": [
          3465000,
          3246641,
          3008104,
          2761309,
          2516452,
          2277844,
          2054301,
          1844960
        ],
        "existing_volume_mt": [
          3465.0,
          3246.6,
          3008.1,
          2761.3,
          2516.5,
          2277.8,
          2054.3,
          1845.0
        ],
        "graduated_volume_kg": [
          0,
          701153,
          637968,
          1004850,
          1473644,
          1891482,
          2258365,
          2582444
        ],
        "graduated_volume_mt": [
          0.0,
          701.2,
          638.0,
          1004.9,
          1473.6,
          1891.5,
          2258.4,
          2582.4
        ]
      },
      "part1_organic_purchases_kg": {
        "phka_rumduol": [
          1611000,
          2571732,
          2375179,
          2453408,
          2599289,
          2716045,
          2809422,
          2884166
        ],
        "white_rice": [
          1394000,
          983929,
          908729,
          938659,
          994472,
          1039142,
          1074867,
          1103464
        ],
        "red_jasmine": [
          410000,
          313490,
          289531,
          299067,
          316849,
          331082,
          342464,
          351576
        ],
        "seed": [
          50000,
          78643,
          72633,
          75025,
          79486,
          83057,
          85913,
          88198
        ],
        "total": [
          3465000,
          3947794,
          3646072,
          3766159,
          3990096,
          4169326,
          4312666,
          4427404
        ]
      },
      "part1_organic_purchases_mt": {
        "phka_rumduol": [
          1611.0,
          2571.7,
          2375.2,
          2453.4,
          2599.3,
          2716.0,
          2809.4,
          2884.2
        ],
        "white_rice": [
          1394.0,
          983.9,
          908.7,
          938.7,
          994.5,
          1039.1,
          1074.9,
          1103.5
        ],
        "red_jasmine": [
          410.0,
          313.5,
          289.5,
          299.1,
          316.8,
          331.1,
          342.5,
          351.6
        ],
        "seed": [
          50.0,
          78.6,
          72.6,
          75.0,
          79.5,
          83.1,
          85.9,
          88.2
        ],
        "total": [
          3465.0,
          3947.8,
          3646.1,
          3766.2,
          3990.1,
          4169.3,
          4312.7,
          4427.4
        ]
      },
      "part2_transition_volumes_kg": {
        "yr0_wf_volume": [
          1146588,
          1953640,
          1953640,
          1953640,
          1953640,
          1953640,
          1953640,
          1953640
        ],
        "yr1_volume": [
          41443,
          1299480,
          1728220,
          1728220,
          1728220,
          1728220,
          1728220,
          1728220
        ],
        "yr2_volume": [
          1426328,
          48620,
          1149200,
          1529320,
          1529320,
          1529320,
          1529320,
          1529320
        ],
        "combined_volume": [
          2614359,
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
          1146.6,
          1953.6,
          1953.6,
          1953.6,
          1953.6,
          1953.6,
          1953.6,
          1953.6
        ],
        "yr1_volume": [
          41.4,
          1299.5,
          1728.2,
          1728.2,
          1728.2,
          1728.2,
          1728.2,
          1728.2
        ],
        "yr2_volume": [
          1426.3,
          48.6,
          1149.2,
          1529.3,
          1529.3,
          1529.3,
          1529.3,
          1529.3
        ],
        "combined_volume": [
          2614.4,
          3301.7,
          4831.1,
          5211.2,
          5211.2,
          5211.2,
          5211.2,
          5211.2
        ]
      },
      "part2_by_variety_kg": {
        "phka_rumduol": [
          566646,
          1485014,
          2392210,
          2734530,
          2860023,
          2975093,
          3082999,
          3182011
        ],
        "white_rice": [
          1938155,
          1651919,
          2168870,
          2162356,
          2016231,
          1880528,
          1753831,
          1636027
        ],
        "red_jasmine": [
          42791,
          53208,
          106690,
          138156,
          158788,
          179421,
          198213,
          217004
        ],
        "sticky_rice": [
          64295,
          110608,
          161841,
          174575,
          174575,
          174575,
          174575,
          174575
        ],
        "seed": [
          2472,
          991,
          1449,
          1563,
          1563,
          1563,
          1563,
          1563
        ]
      },
      "farmers": {
        "existing_organic_eligible": [
          1807,
          1598,
          1413,
          1249,
          1104,
          976,
          863,
          763
        ],
        "graduated_organic_eligible_pool": [
          0,
          365,
          332,
          524,
          769,
          986,
          1178,
          1347
        ],
        "certified_organic_eligible": [
          1807,
          1963,
          1745,
          1773,
          1873,
          1962,
          2041,
          2110
        ],
        "existing_organic_selling": [
          1700,
          1503,
          1329,
          1175,
          1039,
          918,
          812,
          718
        ],
        "graduated_organic_selling": [
          0,
          344,
          313,
          493,
          723,
          928,
          1108,
          1267
        ],
        "selling_paddy": [
          1700,
          1847,
          1642,
          1668,
          1762,
          1846,
          1920,
          1985
        ],
        "non_selling_organic": [
          107,
          116,
          103,
          105,
          111,
          116,
          121,
          125
        ],
        "newly_graduated_eligible": [
          null,
          365,
          10,
          230,
          306,
          306,
          306,
          306
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
        "total_transition": [
          757,
          747,
          1093,
          1179,
          1179,
          1179,
          1179,
          1179
        ],
        "total_active": [
          2564,
          2710,
          2838,
          2952,
          3052,
          3141,
          3220,
          3289
        ],
        "projected_nc_exits": [
          336,
          354,
          372,
          386,
          400,
          411,
          421,
          431
        ]
      },
      "incentive_commitments": {
        "all5_base_volume_kg": [
          3345940,
          3301740,
          4831060,
          5211180,
          5211180,
          5211180,
          5211180,
          5211180
        ],
        "sticky_rice_excluded_kg": [
          82287,
          110592,
          161816,
          174548,
          174548,
          174548,
          174548,
          174548
        ],
        "eligible4_base_volume_kg": [
          3263653,
          3191148,
          4669244,
          5036632,
          5036632,
          5036632,
          5036632,
          5036632
        ],
        "eligible_40pct_volume_kg": [
          1305461,
          1276459,
          1867698,
          2014653,
          2014653,
          2014653,
          2014653,
          2014653
        ],
        "yr0_incentive_khr": [
          114508098,
          151056237,
          151056237,
          151056237,
          151056237,
          151056237,
          151056237,
          151056237
        ],
        "yr1_incentive_khr": [
          4138847,
          100476321,
          133626671,
          133626671,
          133626671,
          133626671,
          133626671,
          133626671
        ],
        "yr2_incentive_khr": [
          178056643,
          4699148,
          111070763,
          147809553,
          147809553,
          147809553,
          147809553,
          147809553
        ],
        "total_incentive_khr": [
          296703588,
          256231706,
          395753671,
          432492461,
          432492461,
          432492461,
          432492461,
          432492461
        ],
        "yr0_incentive_usd": [
          27928.8,
          36842.98,
          36842.98,
          36842.98,
          36842.98,
          36842.98,
          36842.98,
          36842.98
        ],
        "yr1_incentive_usd": [
          1009.47,
          24506.42,
          32591.87,
          32591.87,
          32591.87,
          32591.87,
          32591.87,
          32591.87
        ],
        "yr2_incentive_usd": [
          43428.45,
          1146.13,
          27090.43,
          36051.11,
          36051.11,
          36051.11,
          36051.11,
          36051.11
        ],
        "total_incentive_usd": [
          72366.73,
          62495.54,
          96525.29,
          105485.97,
          105485.97,
          105485.97,
          105485.97,
          105485.97
        ]
      }
    },
    "conservative": {
      "label": "Conservative Scenario",
      "description": "Cautious +1.5%/yr existing farmer delivery growth (capped 2,250 kg), 2,004 kg/seller graduate entry, 15.13% 5-yr avg NC, 400/yr intake, 83.10% 5-yr weighted participation.",
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
      "is_actual": [
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      "parameters": {
        "nc_rate_pct": 15.13,
        "retention_rate_pct": 84.87,
        "annual_new_intake": 400,
        "organic_selling_rate_pct": 83.1,
        "existing_base_kg_per_seller": 2038.24,
        "existing_init_growth_pct": 1.5,
        "existing_decay_factor": 0.9,
        "existing_ceiling_kg": 2250.0,
        "graduated_entry_kg_per_seller": 2004.28,
        "avg_ha_per_farmer": 2.6,
        "avg_yield_mt_per_ha": 1.7,
        "farm_prod_kg_per_farmer": 4420,
        "transition_elig4_share_5yr_pct": 96.65,
        "incentive_coverage_pct": 40.0,
        "rate_wf_y1_khr": 200,
        "rate_y2_khr": 250
      },
      "part1_supply_components": {
        "existing_avg_kg_per_seller": [
          2038.24,
          2068.81,
          2096.74,
          2122.21,
          2145.42,
          2166.53,
          2185.72,
          2203.15
        ],
        "existing_yoy_growth_pct": [
          null,
          1.5,
          1.35,
          1.22,
          1.09,
          0.98,
          0.89,
          0.8
        ],
        "graduated_avg_kg_per_seller": [
          0.0,
          2004.28,
          2004.28,
          2004.28,
          2004.28,
          2004.28,
          2004.28,
          2004.28
        ],
        "blended_avg_kg_per_seller": [
          2038.24,
          2056.82,
          2079.21,
          2087.43,
          2090.38,
          2089.67,
          2086.65,
          2081.84
        ],
        "existing_volume_kg": [
          3465000,
          2637731,
          2268670,
          1948192,
          1671282,
          1432079,
          1228377,
          1050901
        ],
        "existing_volume_mt": [
          3465.0,
          2637.7,
          2268.7,
          1948.2,
          1671.3,
          1432.1,
          1228.4,
          1050.9
        ],
        "graduated_volume_kg": [
          0,
          583245,
          507082,
          769642,
          998130,
          1192545,
          1354891,
          1495191
        ],
        "graduated_volume_mt": [
          0.0,
          583.2,
          507.1,
          769.6,
          998.1,
          1192.5,
          1354.9,
          1495.2
        ]
      },
      "part1_organic_purchases_kg": {
        "phka_rumduol": [
          1611000,
          2098257,
          1808222,
          1770492,
          1738949,
          1709772,
          1682831,
          1658614
        ],
        "white_rice": [
          1394000,
          802780,
          691815,
          677379,
          665311,
          654148,
          643841,
          634575
        ],
        "red_jasmine": [
          410000,
          255774,
          220420,
          215820,
          211975,
          208419,
          205135,
          202183
        ],
        "seed": [
          50000,
          64165,
          55295,
          54143,
          53177,
          52285,
          51461,
          50720
        ],
        "total": [
          3465000,
          3220976,
          2775752,
          2717834,
          2669412,
          2624624,
          2583268,
          2546092
        ]
      },
      "part1_organic_purchases_mt": {
        "phka_rumduol": [
          1611.0,
          2098.3,
          1808.2,
          1770.5,
          1738.9,
          1709.8,
          1682.8,
          1658.6
        ],
        "white_rice": [
          1394.0,
          802.8,
          691.8,
          677.4,
          665.3,
          654.1,
          643.8,
          634.6
        ],
        "red_jasmine": [
          410.0,
          255.8,
          220.4,
          215.8,
          212.0,
          208.4,
          205.1,
          202.2
        ],
        "seed": [
          50.0,
          64.2,
          55.3,
          54.1,
          53.2,
          52.3,
          51.5,
          50.7
        ],
        "total": [
          3465.0,
          3221.0,
          2775.8,
          2717.8,
          2669.4,
          2624.6,
          2583.3,
          2546.1
        ]
      },
      "part2_transition_volumes_kg": {
        "yr0_wf_volume": [
          1146588,
          1498380,
          1498380,
          1498380,
          1498380,
          1498380,
          1498380,
          1498380
        ],
        "yr1_volume": [
          41443,
          1246440,
          1272960,
          1272960,
          1272960,
          1272960,
          1272960,
          1272960
        ],
        "yr2_volume": [
          1426328,
          44200,
          1056380,
          1078480,
          1078480,
          1078480,
          1078480,
          1078480
        ],
        "combined_volume": [
          2614359,
          2789020,
          3827720,
          3849820,
          3849820,
          3849820,
          3849820,
          3849820
        ]
      },
      "part2_transition_volumes_mt": {
        "yr0_wf_volume": [
          1146.6,
          1498.4,
          1498.4,
          1498.4,
          1498.4,
          1498.4,
          1498.4,
          1498.4
        ],
        "yr1_volume": [
          41.4,
          1246.4,
          1273.0,
          1273.0,
          1273.0,
          1273.0,
          1273.0,
          1273.0
        ],
        "yr2_volume": [
          1426.3,
          44.2,
          1056.4,
          1078.5,
          1078.5,
          1078.5,
          1078.5,
          1078.5
        ],
        "combined_volume": [
          2614.4,
          2789.0,
          3827.7,
          3849.8,
          3849.8,
          3849.8,
          3849.8,
          3849.8
        ]
      },
      "part2_by_variety_kg": {
        "phka_rumduol": [
          566646,
          1260920,
          1903393,
          2015909,
          2108725,
          2193840,
          2273608,
          2346755
        ],
        "white_rice": [
          1938155,
          1388111,
          1709343,
          1602361,
          1494356,
          1394051,
          1300480,
          1213530
        ],
        "red_jasmine": [
          42791,
          45720,
          85607,
          101426,
          116615,
          131804,
          145608,
          159412
        ],
        "sticky_rice": [
          64295,
          93432,
          128229,
          128969,
          128969,
          128969,
          128969,
          128969
        ],
        "seed": [
          2472,
          837,
          1148,
          1155,
          1155,
          1155,
          1155,
          1155
        ]
      },
      "farmers": {
        "existing_organic_eligible": [
          1807,
          1534,
          1302,
          1105,
          938,
          796,
          676,
          574
        ],
        "graduated_organic_eligible_pool": [
          0,
          350,
          305,
          462,
          599,
          716,
          814,
          898
        ],
        "certified_organic_eligible": [
          1807,
          1884,
          1607,
          1567,
          1537,
          1512,
          1490,
          1472
        ],
        "existing_organic_selling": [
          1700,
          1275,
          1082,
          918,
          779,
          661,
          562,
          477
        ],
        "graduated_organic_selling": [
          0,
          291,
          253,
          384,
          498,
          595,
          676,
          746
        ],
        "selling_paddy": [
          1700,
          1566,
          1335,
          1302,
          1277,
          1256,
          1238,
          1223
        ],
        "non_selling_organic": [
          107,
          318,
          272,
          265,
          260,
          256,
          252,
          249
        ],
        "newly_graduated_eligible": [
          null,
          351,
          8,
          203,
          207,
          207,
          207,
          207
        ],
        "transition_yr0": [
          332,
          339,
          339,
          339,
          339,
          339,
          339,
          339
        ],
        "transition_yr1": [
          12,
          282,
          288,
          288,
          288,
          288,
          288,
          288
        ],
        "transition_yr2": [
          413,
          10,
          239,
          244,
          244,
          244,
          244,
          244
        ],
        "total_transition": [
          757,
          631,
          866,
          871,
          871,
          871,
          871,
          871
        ],
        "total_active": [
          2564,
          2515,
          2473,
          2438,
          2408,
          2383,
          2361,
          2343
        ],
        "projected_nc_exits": [
          336,
          449,
          442,
          435,
          430,
          425,
          422,
          418
        ]
      },
      "incentive_commitments": {
        "all5_base_volume_kg": [
          3345940,
          2789020,
          3827720,
          3849820,
          3849820,
          3849820,
          3849820,
          3849820
        ],
        "sticky_rice_excluded_kg": [
          82287,
          93418,
          128209,
          128949,
          128949,
          128949,
          128949,
          128949
        ],
        "eligible4_base_volume_kg": [
          3263653,
          2695602,
          3699511,
          3720871,
          3720871,
          3720871,
          3720871,
          3720871
        ],
        "eligible_40pct_volume_kg": [
          1305461,
          1078241,
          1479804,
          1488348,
          1488348,
          1488348,
          1488348,
          1488348
        ],
        "yr0_incentive_khr": [
          114508098,
          115855349,
          115855349,
          115855349,
          115855349,
          115855349,
          115855349,
          115855349
        ],
        "yr1_incentive_khr": [
          4138847,
          96375246,
          98425783,
          98425783,
          98425783,
          98425783,
          98425783,
          98425783
        ],
        "yr2_incentive_khr": [
          178056643,
          4271952,
          102099662,
          104235639,
          104235639,
          104235639,
          104235639,
          104235639
        ],
        "total_incentive_khr": [
          296703588,
          216502547,
          316380794,
          318516771,
          318516771,
          318516771,
          318516771,
          318516771
        ],
        "yr0_incentive_usd": [
          27928.8,
          28257.4,
          28257.4,
          28257.4,
          28257.4,
          28257.4,
          28257.4,
          28257.4
        ],
        "yr1_incentive_usd": [
          1009.47,
          23506.16,
          24006.29,
          24006.29,
          24006.29,
          24006.29,
          24006.29,
          24006.29
        ],
        "yr2_incentive_usd": [
          43428.45,
          1041.94,
          24902.36,
          25423.33,
          25423.33,
          25423.33,
          25423.33,
          25423.33
        ],
        "total_incentive_usd": [
          72366.73,
          52805.5,
          77166.05,
          77687.02,
          77687.02,
          77687.02,
          77687.02,
          77687.02
        ]
      }
    },
    "optimistic": {
      "label": "Optimistic Scenario",
      "description": "Stronger market access: damped +5.98% delivery growth up to 65% harvest ceiling (2,873 kg/seller), 2,150 kg/seller graduate entry, 9.00% NC, 650/yr intake, 96.00% participation.",
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
      "is_actual": [
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      "parameters": {
        "nc_rate_pct": 9.0,
        "retention_rate_pct": 91.0,
        "annual_new_intake": 650,
        "organic_selling_rate_pct": 96.0,
        "existing_base_kg_per_seller": 2038.24,
        "existing_init_growth_pct": 6.88,
        "existing_decay_factor": 0.85,
        "existing_ceiling_kg": 2873.0,
        "graduated_entry_kg_per_seller": 2150.0,
        "avg_ha_per_farmer": 2.6,
        "avg_yield_mt_per_ha": 1.7,
        "farm_prod_kg_per_farmer": 4420,
        "transition_elig4_share_5yr_pct": 96.65,
        "incentive_coverage_pct": 40.0,
        "rate_wf_y1_khr": 200,
        "rate_y2_khr": 250
      },
      "part1_supply_components": {
        "existing_avg_kg_per_seller": [
          2038.24,
          2178.39,
          2305.71,
          2420.26,
          2522.46,
          2613.0,
          2692.72,
          2762.56
        ],
        "existing_yoy_growth_pct": [
          null,
          6.88,
          5.84,
          4.97,
          4.22,
          3.59,
          3.05,
          2.59
        ],
        "graduated_avg_kg_per_seller": [
          0.0,
          2150.0,
          2150.0,
          2150.0,
          2150.0,
          2150.0,
          2150.0,
          2150.0
        ],
        "blended_avg_kg_per_seller": [
          2038.24,
          2173.1,
          2276.04,
          2340.42,
          2359.29,
          2362.82,
          2358.01,
          2348.58
        ],
        "existing_volume_kg": [
          3465000,
          3437496,
          3310998,
          3163276,
          2999206,
          2827268,
          2652334,
          2478013
        ],
        "existing_volume_mt": [
          3465.0,
          3437.5,
          3311.0,
          3163.3,
          2999.2,
          2827.3,
          2652.3,
          2478.0
        ],
        "graduated_volume_kg": [
          0,
          776150,
          726700,
          1178200,
          1993050,
          2734800,
          3407750,
          4020500
        ],
        "graduated_volume_mt": [
          0.0,
          776.1,
          726.7,
          1178.2,
          1993.0,
          2734.8,
          3407.8,
          4020.5
        ]
      },
      "part1_organic_purchases_kg": {
        "phka_rumduol": [
          1611000,
          2744917,
          2630298,
          2828190,
          3252131,
          3623326,
          3947752,
          4233360
        ],
        "white_rice": [
          1394000,
          1050188,
          1006336,
          1082048,
          1244245,
          1386262,
          1510385,
          1619657
        ],
        "red_jasmine": [
          410000,
          334601,
          320629,
          344752,
          396430,
          441678,
          481225,
          516040
        ],
        "seed": [
          50000,
          83940,
          80435,
          86486,
          99450,
          110802,
          120722,
          129456
        ],
        "total": [
          3465000,
          4213646,
          4037698,
          4341476,
          4992256,
          5562068,
          6060084,
          6498513
        ]
      },
      "part1_organic_purchases_mt": {
        "phka_rumduol": [
          1611.0,
          2744.9,
          2630.3,
          2828.2,
          3252.1,
          3623.3,
          3947.8,
          4233.4
        ],
        "white_rice": [
          1394.0,
          1050.2,
          1006.3,
          1082.0,
          1244.2,
          1386.3,
          1510.4,
          1619.7
        ],
        "red_jasmine": [
          410.0,
          334.6,
          320.6,
          344.8,
          396.4,
          441.7,
          481.2,
          516.0
        ],
        "seed": [
          50.0,
          83.9,
          80.4,
          86.5,
          99.5,
          110.8,
          120.7,
          129.5
        ],
        "total": [
          3465.0,
          4213.6,
          4037.7,
          4341.5,
          4992.3,
          5562.1,
          6060.1,
          6498.5
        ]
      },
      "part2_transition_volumes_kg": {
        "yr0_wf_volume": [
          1146588,
          2616640,
          2616640,
          2616640,
          2616640,
          2616640,
          2616640,
          2616640
        ],
        "yr1_volume": [
          41443,
          1334840,
          2382380,
          2382380,
          2382380,
          2382380,
          2382380,
          2382380
        ],
        "yr2_volume": [
          1426328,
          48620,
          1215500,
          2165800,
          2165800,
          2165800,
          2165800,
          2165800
        ],
        "combined_volume": [
          2614359,
          4000100,
          6214520,
          7164820,
          7164820,
          7164820,
          7164820,
          7164820
        ]
      },
      "part2_transition_volumes_mt": {
        "yr0_wf_volume": [
          1146.6,
          2616.6,
          2616.6,
          2616.6,
          2616.6,
          2616.6,
          2616.6,
          2616.6
        ],
        "yr1_volume": [
          41.4,
          1334.8,
          2382.4,
          2382.4,
          2382.4,
          2382.4,
          2382.4,
          2382.4
        ],
        "yr2_volume": [
          1426.3,
          48.6,
          1215.5,
          2165.8,
          2165.8,
          2165.8,
          2165.8,
          2165.8
        ],
        "combined_volume": [
          2614.4,
          4000.1,
          6214.5,
          7164.8,
          7164.8,
          7164.8,
          7164.8,
          7164.8
        ]
      },
      "part2_by_variety_kg": {
        "phka_rumduol": [
          566646,
          1788191,
          3062242,
          3764991,
          3937398,
          4095475,
          4243770,
          4379902
        ],
        "white_rice": [
          1938155,
          2013544,
          2806999,
          2966913,
          2766072,
          2579562,
          2405332,
          2243266
        ],
        "red_jasmine": [
          42791,
          63162,
          135228,
          190745,
          219179,
          247613,
          273547,
          299482
        ],
        "sticky_rice": [
          64295,
          134003,
          208186,
          240021,
          240021,
          240021,
          240021,
          240021
        ],
        "seed": [
          2472,
          1200,
          1864,
          2149,
          2149,
          2149,
          2149,
          2149
        ]
      },
      "farmers": {
        "existing_organic_eligible": [
          1807,
          1644,
          1496,
          1361,
          1239,
          1127,
          1026,
          934
        ],
        "graduated_organic_eligible_pool": [
          0,
          376,
          352,
          571,
          965,
          1325,
          1651,
          1948
        ],
        "certified_organic_eligible": [
          1807,
          2020,
          1848,
          1932,
          2204,
          2452,
          2677,
          2882
        ],
        "existing_organic_selling": [
          1700,
          1578,
          1436,
          1307,
          1189,
          1082,
          985,
          897
        ],
        "graduated_organic_selling": [
          0,
          361,
          338,
          548,
          927,
          1272,
          1585,
          1870
        ],
        "selling_paddy": [
          1700,
          1939,
          1774,
          1855,
          2116,
          2354,
          2570,
          2767
        ],
        "non_selling_organic": [
          107,
          81,
          74,
          77,
          88,
          98,
          107,
          115
        ],
        "newly_graduated_eligible": [
          null,
          376,
          10,
          250,
          446,
          446,
          446,
          446
        ],
        "transition_yr0": [
          332,
          592,
          592,
          592,
          592,
          592,
          592,
          592
        ],
        "transition_yr1": [
          12,
          302,
          539,
          539,
          539,
          539,
          539,
          539
        ],
        "transition_yr2": [
          413,
          11,
          275,
          490,
          490,
          490,
          490,
          490
        ],
        "total_transition": [
          757,
          905,
          1406,
          1621,
          1621,
          1621,
          1621,
          1621
        ],
        "total_active": [
          2564,
          2925,
          3254,
          3553,
          3825,
          4073,
          4298,
          4503
        ],
        "projected_nc_exits": [
          336,
          289,
          321,
          351,
          378,
          402,
          425,
          445
        ]
      },
      "incentive_commitments": {
        "all5_base_volume_kg": [
          3345940,
          4000100,
          6214520,
          7164820,
          7164820,
          7164820,
          7164820,
          7164820
        ],
        "sticky_rice_excluded_kg": [
          82287,
          133983,
          208155,
          239985,
          239985,
          239985,
          239985,
          239985
        ],
        "eligible4_base_volume_kg": [
          3263653,
          3866117,
          6006365,
          6924835,
          6924835,
          6924835,
          6924835,
          6924835
        ],
        "eligible_40pct_volume_kg": [
          1305461,
          1546447,
          2402546,
          2769934,
          2769934,
          2769934,
          2769934,
          2769934
        ],
        "yr0_incentive_khr": [
          114508098,
          202319666,
          202319666,
          202319666,
          202319666,
          202319666,
          202319666,
          202319666
        ],
        "yr1_incentive_khr": [
          4138847,
          103210370,
          184206588,
          184206588,
          184206588,
          184206588,
          184206588,
          184206588
        ],
        "yr2_incentive_khr": [
          178056643,
          4699148,
          117478691,
          209325668,
          209325668,
          209325668,
          209325668,
          209325668
        ],
        "total_incentive_khr": [
          296703588,
          310229184,
          504004945,
          595851922,
          595851922,
          595851922,
          595851922,
          595851922
        ],
        "yr0_incentive_usd": [
          27928.8,
          49346.26,
          49346.26,
          49346.26,
          49346.26,
          49346.26,
          49346.26,
          49346.26
        ],
        "yr1_incentive_usd": [
          1009.47,
          25173.26,
          44928.44,
          44928.44,
          44928.44,
          44928.44,
          44928.44,
          44928.44
        ],
        "yr2_incentive_usd": [
          43428.45,
          1146.13,
          28653.34,
          51055.04,
          51055.04,
          51055.04,
          51055.04,
          51055.04
        ],
        "total_incentive_usd": [
          72366.73,
          75665.65,
          122928.04,
          145329.74,
          145329.74,
          145329.74,
          145329.74,
          145329.74
        ]
      }
    }
  }
};
