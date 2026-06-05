// English cruise pages verbatim from yacht-holiday.net

export type CruiseSection = {
  heading?: string
  paragraphs: string[]
  img?: string
  imgAlt?: string
  reverse?: boolean
}

export type CruisePage = {
  id: string
  breadcrumb: string
  h1: string
  heroImg: string
  seoTitle: string
  seoDesc: string
  packageTeasers: string[]
  sections: CruiseSection[]
  luxury?: boolean
}

export const cruisesEn: Record<string, CruisePage> = {
  'for-beginners': {
    id: 'for-beginners',
    breadcrumb: 'for beginners',
    h1: 'Cruise for beginners',
    heroImg: '/images/Zielgruppen/beach-blue-sky-cheerful.jpg',
    seoTitle: 'Cruise for beginners – sailing holidays without prior knowledge | Yacht-Holiday',
    seoDesc: 'Join our beginner cruises with experienced skippers: no prior knowledge needed. Beautiful bays, turquoise sea, swimming and snorkelling – we take care of the rest.',
    packageTeasers: ['dalmatien', 'kornaten'],
    sections: [
      {
        heading: 'Welcome Beginners!',
        paragraphs: [
          'You want to feel the sea breeze brushing softly over your skin and smell the sea air for the first time on a yacht amidst the waves?',
          'Then join us on one of our sailing trips all over the world! Stern or bow, starboard or port? Whether or not these terms make sense for you, our experienced skippers will give you a warm welcome and introduce you to the tongue of the sailors. You will experience and learn everything there is to know about sailing - and if you fancy it: You can be the captain of the yacht!',
          'So jump on deck and embark on a journey by Yacht-Urlaub, because with us you will have the unique combination of holidays, freedom on a yacht, joy and new experiences. Learn what sailing is all about and acquire the needed skills from our seasoned, experienced skippers. We are happy to welcome you on board and provide you with the little oomph, because on a sailing trip with Yacht-Urlaub you will get to see the most beautiful beaches with waters as clear as the blue sky, lovely harbor towns and extraordinary places to remember. We cast anchor whenever or wherever you want to be. Enjoy an unforgettable holiday experience!',
        ],
        img: '/images/packages/Einsteiger/gallery/IMG_7874.jpg',
        imgAlt: 'Sailing holiday for beginners',
      },
      {
        heading: 'Set the sails with YACHT-HOLIDAY into a new experience!',
        paragraphs: [
          'Surely the focus is still on your personal holiday experience. Whether you want to go swimming or snorkeling, bathe in the sun on deck or on a beach, see the most beautiful sights and landmarks or rather experience the culinary delights of a region - your own desires are our schedule. Further you can gain experience in sailing with one of our experienced skippers on your beginners sailing trip. You decide when and where - prior knowledge is no requirement for this. We just want you to find out how it feels to be the captain of a yacht and stand at the helm or to set the sails like a sturdy sailor.',
        ],
        img: '/images/packages/dalmatien/gallery/WP_20150818_001.jpg',
        imgAlt: 'Sailing with skipper',
        reverse: true,
      },
    ],
  },

  'for-friends': {
    id: 'for-friends',
    breadcrumb: 'for friends',
    h1: 'Cruise for friends',
    heroImg: '/images/Zielgruppen/Freunde Snap.png',
    seoTitle: 'Cruise for friends – sail and celebrate together | Yacht-Holiday',
    seoDesc: 'Sailing trips for groups of friends: birthdays, bachelor parties or just a week with friends. Get on deck of one of our dreamlike yachts!',
    packageTeasers: ['dalmatien', 'karibik-bvi', 'griechenland'],
    sections: [
      {
        heading: 'Sail and celebrate together with your friends!',
        paragraphs: [
          "Birthdays, upcoming wedding and the demand for a bachelor's party, graduation or just no reason rather than life to celebrate with your friends - get on deck on one of our dreamlike yachts and party like you never have before! Countless bars, clubs or taverns are waiting for you with open doors and don't you worry - your hangover the day after will cure a lot better on an endless, empty beach surrounded by aquamarine sea. At the end you will be asking yourself if all of this was reality or just a sweet dream!",
          'Unique and unforgettable adventures with your best friends made possible by YACHT-HOLIDAY. Raise your glasses and plunge into the adventures that lie ahead! On our proven routes you will miss nothing of all this.',
        ],
        img: '/images/Zielgruppen/freunde2.jpg',
        imgAlt: 'Friends on the yacht',
      },
      {
        paragraphs: [
          'Book a sailing trip for you and your friends with Yacht-Urlaub, because with us you can choose on which of our gorgeous yachts you want to celebrate the party of your lives. Your own holidays are our focus, so that you can just relax and lay back, while our seasoned skippers sail with you through the seven seas. For no headaches at all, we will cater you with the information needed to find the destinations following your every desire. Do you want to experience culinary delights and interesting cultures? Or do you just want to party like there is no tomorrow? With Yacht-Holiday everything is possible - we will ensure a picture-perfect celebration and make doubly sure, that you will miss nothing.',
        ],
        img: '/images/Zielgruppen/Freunde im Wasser.jpg',
        imgAlt: 'Friends in the water',
        reverse: true,
      },
    ],
  },

  'for-families': {
    id: 'for-families',
    breadcrumb: 'for families',
    h1: 'Cruise for families',
    heroImg: '/images/Zielgruppen/familie.jpeg',
    seoTitle: 'Cruise for families – holidays for the whole family | Yacht-Holiday',
    seoDesc: 'Family sailing trips: little pirates get to stand at the helm and feel like real captains. Safety, fun and shared experiences at sea.',
    packageTeasers: ['griechenland', 'kornaten'],
    sections: [
      {
        heading: 'Holidays for the whole family',
        paragraphs: [
          'Enjoy the greatest Adventures and most fun on one of our sailing trips for families - even for the cute little ones among yourselves!',
          "See the most beautiful beaches in the world, discover impressive Towns and dive into the most thrilling underwater worlds - all together with your loved ones. Little pirates get to stand at the helm and feel like real captains. The focus of our family sailing trips is each and everyone's wellbeing and the security of your whole family. Enjoy one of these trips on our yachts - but leave all your cares behind and take a break from everyday life.",
          "Book your family sailing trip with Yacht-Urlaub, because we know what matters. Our seasoned skippers will lead you to the places you always wanted to see and experience - all the while taking care of your wellbeing. No matter if you're short or tall, young or old, just lay back and relax while we take care of your every desire and will do our best to adapt even at sea. Let us know, what's important for your own trip and we would love to consult you on which destination caters best to your needs. Benefit from our knowhow about child-friendly side-trips, pristine beaches and impressive towns to discover all the while you can lay back and enjoy your carefree sailing trip. Take a break from your everyday life and plunge into an unforgettable adventure on a yacht amidst the seven seas.",
          'This is a journey to remember for years to come - and most definitely stories to tell.',
        ],
        img: '/images/Zielgruppen/familie_bug kl.png',
        imgAlt: 'Family at the bow',
      },
      {
        heading: 'Be a part of the YACHT-HOLIDAY family!',
        paragraphs: [
          "Coves and bays of your choice and little discovery trips are on our schedule. In the evening the choice is yours: Either finding an insider restaurant in a gorgeous little harbor town or be the cook of your own meal on deck and watch as the sunset paints the landscape in colors you haven't experienced before!",
        ],
        img: '/images/Zielgruppen/Familie 1.jpg',
        imgAlt: 'Family on a sailing boat',
        reverse: true,
      },
    ],
  },

  luxury: {
    id: 'luxury',
    breadcrumb: 'Luxury',
    h1: 'Luxury yacht trip',
    heroImg: '/images/luxury/header.png',
    seoTitle: 'Luxury yacht trip – luxury yacht trips for connoisseurs | Yacht-Holiday',
    seoDesc: "Experience the pristine beauty of the Adriatic coast with our exclusive motor yacht charter. Luxury motor yacht «NIKITA» – Riva 100 Corsaro.",
    packageTeasers: [],
    luxury: true,
    sections: [
      {
        heading: 'Luxury yacht trips for Connoisseurs',
        paragraphs: [
          'Welcome to your Luxury Yachting Partner!',
          'Experience the pristine beauty of the Adriatic coast with our exclusive motor yacht charter. Immerse yourself in turquoise waters, discover picturesque coves, and explore culinary delicacies while enjoying the breathtaking nature of Croatia.',
          'With over 1.200 islands off the coast of Croatia, this area is among the most beautiful and attractive in all of Europe. Experience azure seas inviting for fishing and snorkeling, picturesque reefs, as well as a variety of dreamy coves and anchorages.',
          'First-class motor yacht rental',
          'Experience the incomparable beauty of the Adriatic coast with our motor yacht charter, leaving nothing to be desired. With us, you can charter a luxury motor yacht and fully enjoy the impressive coastal landscape of Croatia.',
          'Our yacht rental offers you exclusive luxury and comfort to enable a tailor-made charter experience.',
          'Sit back and relax, enjoying the breathtaking nature, cultural highlights, vibrant nightlife, and countless culinary delights of Croatia.',
          'Unique holiday atmosphere',
          "Enjoy luxury and comfort on one of our first-class motor yachts. Our experienced crew will take care of your well-being and your personal captain will guide you to Croatia's hidden treasures while you relax on board in an exclusive atmosphere.",
          'Book your next vacation today, full of relaxation, adventure, and culinary delights surrounded by luxurious ambiance and a vacation experience tailored to your desires.',
        ],
      },
    ],
  },
}
