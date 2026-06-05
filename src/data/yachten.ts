// Yacht-Kategorien 1:1 von yacht-urlaub.net übernommen
export type YachtVariant = { title: string; img: string; caption: string; ausstattung: string[] }
export type YachtCategory = {
  id: string; h1: string; name: string; sub: string; intro: string
  front: { src: string; caption: string } | null
  variants: YachtVariant[]; eindruecke: string[]; logos: string[]
}
export type YachtCard = { id: string; title: string; img: string; specs: string[] }

export const yachtCards: YachtCard[] = [
  {
    "img": "/images/yachten-original/uebersicht/segelyacht.jpg",
    "title": "Segelyacht - Monohull",
    "id": "monohull",
    "specs": [
      "Preis: unteres Preissegment",
      "Verfügbarkeit: hoch",
      "Eigenschaften: Allrounder sportlich, effizient",
      "Bestens geeignet für: segeln, gemütliche Törns, Flottille",
      "Anzahl Personen: 2 - 10",
      "Spritverbrauch: sparsam"
    ]
  },
  {
    "img": "/images/yachten-original/uebersicht/katamaran.jpg",
    "title": "Segel-Katamaran",
    "id": "katamaran",
    "specs": [
      "Preis: mittleres Preissegment",
      "Verfügbarkeit: gut",
      "Eigenschaften: viel Platz und Komfort",
      "Bestens geeignet für: Familien, gemütliche Törns, große Gruppen, Flotille, flache Gewässer",
      "Anzahl Personen: 5 - 10",
      "Spritverbrauch: Durschschnitt"
    ]
  },
  {
    "img": "/images/yachten-original/uebersicht/motoryacht.jpg",
    "title": "Motor-Yacht",
    "id": "motoryacht",
    "specs": [
      "Preis: oberes Preissegment",
      "Verfügbarkeit: ok",
      "Eigenschaften: sehr schnell, luxuriös, laut",
      "Bestens geeignet für: luxusbewusste",
      "Anzahl Personen: 2 - 8",
      "Spritverbrauch: extrem hoch"
    ]
  },
  {
    "img": "/images/yachten-original/uebersicht/motoryacht-katamaran.jpg",
    "title": "Motorkatamaran",
    "id": "motorkat",
    "specs": [
      "Preis: mittleres bis oberes Preissegment",
      "Verfügbarkeit: gering",
      "Eigenschaften: schnell, viel Platz und Komfort",
      "Bestens geeignet für: Familien, gemütliche Relaxingtörns",
      "Anzahl Personen: 4-8",
      "Spritverbrauch: hoch"
    ]
  }
]

export const yachtCategories: YachtCategory[] = [
  {
    "id": "monohull",
    "h1": "Segelyacht (Monohull)",
    "name": "Segelyacht",
    "sub": "Monohull",
    "intro": "Start  /  Yachten  /    Segelyacht (Monohull)\nDie häufigste Art mit der größten Auswahl bei Yacht-Urlaub, welche auch gleichzeitig die günstigste Form darstellt, sind Monohull-Segler (Einrumpfer).",
    "front": {
      "src": "/images/yachten-original/monohull/monohull.jpg",
      "caption": "Monohull oder Einrumpfer (Ansicht von vorne)"
    },
    "variants": [
      {
        "title": "Für 4-6 Personen",
        "img": "/images/yachten-original/monohull/41Cr.jpg",
        "caption": "Interieur 3 Kabinen Monohull-Segelyacht",
        "ausstattung": [
          "6 Schlafkojen in 3 Kabinen",
          "Küche",
          "komfortabler Salon",
          "2 Bäder mit WC",
          "gemütliches Cockpit mit Cockpit-Tisch",
          "Badeplattform"
        ]
      },
      {
        "title": "Für 5-8 Personen",
        "img": "/images/yachten-original/monohull/1515592333.jpg",
        "caption": "Interieur 4 Kabinen Monohull-Segelyacht",
        "ausstattung": [
          "8 Schlafkojen in 4 Kabinen",
          "1 Küche",
          "1 komfortabler Salon",
          "2 Bäder mit WC",
          "1 separates WC",
          "gemütliches Cockpit mit Cockpit-Tisch",
          "Badeplattform"
        ]
      },
      {
        "title": "Für 6-10 Personen",
        "img": "/images/yachten-original/monohull/55Cr.jpg",
        "caption": "Interieur 5 Kabinen Monohull-Segelyacht",
        "ausstattung": [
          "10 Schlafkojen in 5 Kabinen",
          "Küche",
          "komfortabler Salon",
          "3 Bäder mit WC",
          "separate Dusche",
          "gemütliches Cockpit mit Cockpit-Tisch",
          "Badeplattform"
        ]
      }
    ],
    "eindruecke": [
      "/images/yachten-original/monohull/1515592333__1_.jpg",
      "/images/yachten-original/monohull/1515592333__2_.jpg",
      "/images/yachten-original/monohull/1515592333__3_.jpg",
      "/images/yachten-original/monohull/Saloontisch.jpg",
      "/images/yachten-original/monohull/51er_vor_Split.jpg",
      "/images/yachten-original/monohull/Kueche2.jpg",
      "/images/yachten-original/monohull/1515592333__4_.jpg",
      "/images/yachten-original/monohull/bavaria-sy-cruiserline-c46-slider1-c46-interior-01.jpg",
      "/images/yachten-original/monohull/bavaria-cruiser46-3kab-02.jpg"
    ],
    "logos": [
      "/images/yachten-original/monohull/hanse.jpg",
      "/images/yachten-original/monohull/elan.jpg",
      "/images/yachten-original/monohull/DUFOUR-YACHTS-NB.jpg",
      "/images/yachten-original/monohull/Bavaria-Yachtbau-Logo.jpg",
      "/images/yachten-original/monohull/Beneteau.jpg"
    ]
  },
  {
    "id": "katamaran",
    "h1": "Segel-Katamaran",
    "name": "Segel-Katamaran",
    "sub": "",
    "intro": "Start  /  Yachten  /    Segel-Katamaran\nKatamarane bieten sehr viel Platz und Komfort, sind gemütlich während der Fahrt und erfreuen sich unter unseren Gästen immer größerer Beliebtheit.",
    "front": {
      "src": "/images/yachten-original/katamaran/multihall.jpg",
      "caption": "Multihull oder Katamaran (Ansicht von vorne)"
    },
    "variants": [
      {
        "title": "Budgetklasse",
        "img": "/images/yachten-original/katamaran/Lagoon_380.jpg",
        "caption": "Interieur kleines Katamaran",
        "ausstattung": [
          "8 Schlafplätze in 4 Doppelbett-Kabinen",
          "Küche",
          "komfortabler Salon",
          "2 Bäder mit WC",
          "gemütlicher Esstisch im Außenbereich",
          "Trampolin zum Relaxen"
        ]
      },
      {
        "title": "Mittelklasse",
        "img": "/images/yachten-original/katamaran/Lagoon_400_S2_skizze.png",
        "caption": "Interieur Mittelklasse Katamaran",
        "ausstattung": [
          "8 Schlafplätze in 4 Doppelbett-Kabinen",
          "Küche",
          "komfortabler Salon",
          "4 Bäder mit WC",
          "gemütlicher Esstisch im Außenbereich",
          "Trampolin zum Relaxen"
        ]
      },
      {
        "title": "Oberklasse",
        "img": "/images/yachten-original/katamaran/Lagoon_450-4.jpg",
        "caption": "Interieur Oberklasse Katamaran",
        "ausstattung": [
          "8 Schlafplätze in 4 Doppelbett-Kabinen + Crewkabinen",
          "Küche",
          "komfortabler Salon",
          "4 Bäder mit WC und abgetrennten Duschkammern",
          "geräumiger Esstisch im Außenbereich",
          "Trampolin zum Relaxen",
          "Relaxbereich am Dach",
          "zusätzliche Sitz- und Relaxbereiche"
        ]
      },
      {
        "title": "Luxusklasse",
        "img": "/images/yachten-original/katamaran/Lagoon_620-6.jpg",
        "caption": "Interieur Luxusklasse Katamaran",
        "ausstattung": [
          "12 Schlafplätze in 5 Doppelbett-Kabinen + Stockkabine + Crewkabinen",
          "Küche",
          "komfortabler Salon",
          "6 Bäder mit WC und jeweils abgetrennten Duschkammern",
          "geräumiger Esstisch im Außenbereich",
          "Trampolin zum Relaxen",
          "Relaxbereiche am Dach",
          "viele zusätzliche Sitz- und Relaxbereiche"
        ]
      }
    ],
    "eindruecke": [
      "/images/yachten-original/katamaran/bali-4.0-lounge-3--1.jpg",
      "/images/yachten-original/katamaran/bali-4.5-30-.jpg",
      "/images/yachten-original/katamaran/bali-4.5-2-.jpg",
      "/images/yachten-original/katamaran/Lagoon_400_1.jpg",
      "/images/yachten-original/katamaran/Lagoon_400_S2_6.png",
      "/images/yachten-original/katamaran/Lagoon_400.jpg",
      "/images/yachten-original/katamaran/1.jpg",
      "/images/yachten-original/katamaran/2.jpg",
      "/images/yachten-original/katamaran/3.jpg",
      "/images/yachten-original/katamaran/4.jpg",
      "/images/yachten-original/katamaran/5.jpg",
      "/images/yachten-original/katamaran/6.jpg",
      "/images/yachten-original/katamaran/7.jpg",
      "/images/yachten-original/katamaran/8.jpg",
      "/images/yachten-original/katamaran/9.jpg",
      "/images/yachten-original/katamaran/10.jpg",
      "/images/yachten-original/katamaran/kabine.jpg"
    ],
    "logos": [
      "/images/yachten-original/katamaran/bali-catamarans-2018.jpg"
    ]
  },
  {
    "id": "motoryacht",
    "h1": "Motoryacht (Monohull)",
    "name": "Motoryacht",
    "sub": "Monohull",
    "intro": "Start  /  Yachten  /    Motoryacht (Monohull)\nDie luxuriöse Art einen Yacht-Urlaub zu verbringen: schnell von A nach B zu kommen, mit einer exklusiveren Ausstattung und kraftvollen Motoren (bis zu 1000 PS und mehr).",
    "front": {
      "src": "/images/yachten-original/motoryacht/monohull.jpg",
      "caption": "Monohull oder Einrumpfer (Ansicht von vorne)"
    },
    "variants": [],
    "eindruecke": [
      "/images/yachten-original/motoryacht/71_20170119055533_50_running_9_mid_res_da_tagliare_in_orizzontale.jpg",
      "/images/yachten-original/motoryacht/71_20170119055530_50_running_7_mid_res.jpg",
      "/images/yachten-original/motoryacht/71_20170119055138_50_dining_area_mid_res.jpg",
      "/images/yachten-original/motoryacht/71_20170119055149_50_internal_wheelhouse_2_mid_res.jpg",
      "/images/yachten-original/motoryacht/71_20170119055155_50_master_cabin_2_mid_res.jpg",
      "/images/yachten-original/motoryacht/71_20170119055202_50_salon_2_mid_res_-_copia.jpg",
      "/images/yachten-original/motoryacht/71_20170119055208_50_vip_cabin_2_mid_res.jpg",
      "/images/yachten-original/motoryacht/71_20170119055511_50_flybridge_1_mid_res.jpg",
      "/images/yachten-original/motoryacht/71_20170119055514_50_flybridge_with_benches_mid_res.jpg",
      "/images/yachten-original/motoryacht/71_20170119055526_50_running_1_mid_res.jpg"
    ],
    "logos": [
      "/images/yachten-original/motoryacht/elan.jpg",
      "/images/yachten-original/motoryacht/Bavaria-Yachtbau-Logo.jpg",
      "/images/yachten-original/motoryacht/azimut.jpg"
    ]
  },
  {
    "id": "motorkat",
    "h1": "Motor-Katamaran",
    "name": "Motoryacht",
    "sub": "Katamaran",
    "intro": "Start  /  Yachten  /    Motor-Katamaran\nDie elegante Variante bequem und doch mit der Stärke zweier Motoren durch die Küstenwelten der Meere zu cruisen. Motoryacht-Katamarane bieten sehr viel Platz, sind ergonomisch und erleben in der Welt des Yachting immer größere Beliebtheit.",
    "front": {
      "src": "/images/yachten-original/motorkat/multihall.jpg",
      "caption": "Multihull oder Katamaran (Ansicht von vorne)"
    },
    "variants": [
      {
        "title": "Für bis zu 8 Personen",
        "img": "/images/yachten-original/motorkat/layout_514pc_deck_plan_0.jpg",
        "caption": "",
        "ausstattung": [
          "8 Gästekabinen mit jeweils eigenen Bad und eigener Dusche",
          "Küche",
          "komfortabler Salon",
          "komfortabler Sitzbereich im Heck-Bereich",
          "eigene Sitzgruppe mit großen Relaxbereich am Bug",
          "zusätzliches konfortables Fly-Cockpit mit eigener Sitzgruppe als Relaxbereich",
          "viel Platz im Heckbereich für die Badenden",
          "eigens absenkbare Plattform für das Beiboot"
        ]
      },
      {
        "title": "für bis zu 12 Personen",
        "img": "/images/yachten-original/motorkat/layout_5800_6c_deck_plan.jpg",
        "caption": "",
        "ausstattung": [
          "5 Doppelbettkabinen und zusätzlich eine Kabine mit zwei getrennten Betten,",
          "Jede Kabine mit eigenen Badezimmer mit WC und eigener Dusche",
          "großräumige Küche",
          "komfortabler Salon",
          "komfortabler Sitzbereich im Heck-Bereich",
          "eigene Sitzgruppe mit großen Relaxbereich am Bug",
          "zusätzliches konfortables Fly-Cockpit mit eigener Sitzgruppe als Relaxbereich",
          "viel Platz im Heckbereich für die Badenden",
          "eigens absenkbare Plattform für das Beiboot"
        ]
      }
    ],
    "eindruecke": [
      "/images/yachten-original/motorkat/474-4.jpg",
      "/images/yachten-original/motorkat/474_PC_int.jpg",
      "/images/yachten-original/motorkat/514PC_Gallery_Ext.jpg",
      "/images/yachten-original/motorkat/mp_474_aft.jpg",
      "/images/yachten-original/motorkat/_Y6Y6489-boatbuouy.jpg",
      "/images/yachten-original/motorkat/_Y6Y6507.jpg"
    ],
    "logos": []
  }
]
