import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'

const berichte = [
  {
    id: 'istrien-2020',
    title: 'Istrien 2020 — Sonne, Meer & Trüffel',
    destination: 'Kroatien · Istrien',
    date: 'August 2020',
    teaser: 'Acht Tage durch die unberührten Buchten Istriens — von Pula bis Rovinj. Ein Törn voller kulinarischer Entdeckungen und versteckter Ankerplätze.',
    headerImg: '/images/Berichte/Istrien2020/Foto1.jpg',
    gallery: Array.from({ length: 13 }, (_, i) => `/images/Berichte/Istrien2020/Foto${i + 1}.jpg`),
    content: `Istrien im August — das bedeutet türkisblaues Wasser, Olivenöl, Trüffel und unvergessliche Sonnenuntergänge über dem Adriatischen Meer. Unser Törn startete im Hafen von Pula, einer Stadt, die mit ihrem beeindruckenden römischen Amphitheater Weltgeschichte atmet.

Die erste Nacht verbrachten wir in der ruhigen Bucht von Medulin, wo wir die Yacht eingerichtet und den Sonnenuntergang mit einem Glas lokalem Malvazija genossen haben.

Tag zwei führte uns nach Rovinj — zweifellos eine der schönsten Städte Kroatiens. Die pastellfarbenen Häuser, die engen Gassen und der Kirchturm von Sv. Eufemija sind ein Anblick, den man nie vergisst. Wir schlenderten durch die Altstadt und fanden eine versteckte Taverna, in der wir frischen Fisch mit Trüffelöl probierten.

Den Höhepunkt bildete der Besuch des Nationalparks Brijuni — eine Inselgruppe mit reicher Geschichte, die einst Tito's Sommerresidenz war.`,
  },
  {
    id: 'bvi-2019',
    title: 'Karibik-BVI — Inselhüpfen im Paradies',
    destination: 'Karibik · Britische Jungferninseln',
    date: 'Januar 2019',
    teaser: 'Zwei Wochen in den BVIs — von Tortola bis Anegada. Konstante Passatwinde, kristallklares Wasser und die legendäre Soggy Dollar Bar.',
    headerImg: '/images/Berichte/BVI Play.jpg',
    gallery: [
      '/images/packages/Karibik-BVI/gallery/Sandy Cay.jpg',
      '/images/packages/Karibik-BVI/gallery/the baths.jpg',
      '/images/packages/Karibik-BVI/gallery/Sandy Spit.jpg',
      '/images/packages/Karibik-BVI/gallery/marina_cay.jpg',
      '/images/packages/Karibik-BVI/gallery/Norman island.jpg',
      '/images/packages/Karibik-BVI/gallery/Indians.jpg',
      '/images/packages/Karibik-BVI/gallery/kat.jpg',
      '/images/packages/Karibik-BVI/gallery/relaxing-auf-sandy-cay-bei-yacht-urlaub (2).jpg',
      '/images/packages/Karibik-BVI/gallery/DSC_0353_695.webp',
      '/images/packages/Karibik-BVI/gallery/DSC_0436_774.webp',
      '/images/packages/Karibik-BVI/gallery/DSC_0889_150.webp',
      '/images/packages/Karibik-BVI/gallery/DSC_0918_1247.webp',
      '/images/packages/Karibik-BVI/gallery/Willie Ts.webp',
      '/images/packages/Karibik-BVI/gallery/Willy_T_T-Shirt.jpg',
    ],
    content: `Die Britischen Jungferninseln im Januar — perfektes Segeln mit 15-20 Knoten Passatwind, Sonnenschein und Temperaturen um 28°C. Was will man mehr?

Unser Törn startete auf Tortola, wo wir unsere Lagoon 43 übernahmen. Das erste Ziel war The Baths auf Virgin Gorda — bizarre Granitfelsen, zwischen denen man in Grotten und Pools schnorcheln kann. Ein absolutes Highlight.

Jost Van Dyke und die legendäre Soggy Dollar Bar: Man ankert vor der Insel und schwimmt ans Ufer — deshalb zahlt man mit durchnässten Dollarscheinen. Der Painkiller-Cocktail ist Pflicht.

Anegada, die flachste Insel der BVIs, war unser Fernziel. Das Riff davor hat schon Hunderte Schiffe verspeist — wir navigierten vorsichtig durch die Kanäle und wurden mit dem besten Hummer der Karibik belohnt.`,
  },
  {
    id: 'dalmatien-split-dubrovnik',
    title: 'Dalmatien — Von Split bis Dubrovnik',
    destination: 'Kroatien · Dalmatien',
    date: 'Juli 2022',
    teaser: 'Eine Woche entlang der süddalmatinischen Küste — von Splits römischem Diokletianpalast bis zur Perle der Adria, Dubrovnik. Mit Stopps auf Hvar, Vis und der Badestrand-Insel Mljet.',
    headerImg: '/images/packages/dalmatien/gallery/Split 1.jpg',
    gallery: [
      '/images/packages/dalmatien/gallery/Split 1.jpg',
      '/images/packages/dalmatien/gallery/Split.jpg',
      '/images/packages/dalmatien/gallery/dalmatien_gallery1.jpg',
      '/images/packages/dalmatien/gallery/dalmatien_gallery2.jpg',
      '/images/packages/dalmatien/gallery/dalmatien_gallery3.jpg',
      '/images/packages/dalmatien/gallery/dalmatien_gallery4.jpg',
      '/images/packages/dalmatien/gallery/dalmatien_gallery5.jpg',
      '/images/packages/dalmatien/gallery/dalmatien_gallery6.jpg',
      '/images/packages/dalmatien/gallery/milna.jpg',
      '/images/packages/dalmatien/gallery/Makarska Kai.jpg',
      '/images/packages/dalmatien/gallery/Segeln in Dalmatien.png',
    ],
    content: `Unser Dalmatien-Törn begann im strahlenden Morgenlicht von Split — einer Stadt, die ihresgleichen sucht. Der Diokletianpalast, vor über 1.700 Jahren als kaiserliche Residenz erbaut, bildet noch heute das pulsierende Herz der Altstadt. Zwischen seinen antiken Mauern reihen sich Cafés, Restaurants und Boutiquen aneinander, während die Einwohner ihr alltägliches Leben inmitten von Weltgeschichte führen. Nach einem langen Spaziergang durch die Gassen und einem Espresso auf der Riva stachen wir in See — die Segel gesetzt, der Wind sanft aus Nordwest.

Erste Station war Hvar, die Sonneninsel der Adria. Die Altstadt mit ihrer venezianischen Piazza, dem Arsenale und dem mittelalterlichen Kastell St. Stephan ist ein Juwel der dalmatinischen Küste. Wir ankerten in der ruhigen Bucht von Pakleni-Inseln und erkundeten die kristallklaren Unterwasserwelten beim Schnorcheln. Abends flanierte die ganze Crew durch Hvars belebte Altstadt und genoss frisch gegrillte Dorade mit lokalem Plavac Mali — dem kraftvollen Rotwein der Region.

Von Hvar aus segelten wir nach Vis, der entlegensten bewohnten Insel Dalmatiens, die bis 1989 als Militärsperrgebiet kaum Touristen kannte. Hier besuchten wir die berühmte Blaue Grotte auf der Nachbarinsel Biševo — ein Naturwunder, das man mit eigenen Augen gesehen haben muss. Das neonblaue Licht, das durch eine Unterwasseröffnung einfällt und den ganzen Innenraum der Grotte in ein magisches Leuchten taucht, ist unvergesslich. Weiter ging es nach Korčula, der Geburtsstadt von Marco Polo, mit ihrer wunderschön erhaltenen venezianischen Altstadt auf einer schmalen Halbinsel.

Den krönenden Abschluss bildete Dubrovnik — die Perle der Adria. Wir liefen in den Hafen von Gruž ein und spazierten auf den mittelalterlichen Stadtmauern rund um die Altstadt, mit einem atemberaubenden Blick auf die Dächer, die Adria und die vorgelagerten Inseln. Die engen Gassen, Marmortreppen und barocken Kirchen machen Dubrovnik zu einem der schönsten Orte Europas. Ein Törn, der süchtig macht — nach Dalmatien, nach Segeln, nach dieser Küste.`,
  },
  {
    id: 'griechenland-kykladen',
    title: 'Griechenland — Kykladen-Träume',
    destination: 'Griechenland · Kykladen',
    date: 'September 2021',
    teaser: 'Zwei Wochen durch die Kykladen — weißgetünchte Dörfer, tiefblaues Meer und der unvergessliche Sonnenuntergang von Santorin. Ein Törn, der alle Klischees über Griechenland wahr macht.',
    headerImg: '/images/packages/Griechenland/gallery/Greece_Sunset_header.webp',
    gallery: [
      '/images/packages/Griechenland/gallery/Greece_Sunset_header.webp',
      '/images/packages/Griechenland/gallery/santorini-1776236_1920.jpg',
      '/images/packages/Griechenland/gallery/Mykonos.jpg',
      '/images/packages/Griechenland/gallery/Naxos Beach.jpg',
      '/images/packages/Griechenland/gallery/BlaueBucht.jpg',
      '/images/packages/Griechenland/gallery/Navajo Bucht - Griechenland.jpg',
      '/images/packages/Griechenland/gallery/Poseidon.jpg',
      '/images/packages/Griechenland/gallery/Poros.jpg',
      '/images/packages/Griechenland/gallery/hydra.jpg',
      '/images/packages/Griechenland/gallery/Sonnenuntergang.jpg',
      '/images/packages/Griechenland/gallery/20181008_184812.jpg',
      '/images/packages/Griechenland/gallery/20181017_122302.jpg',
    ],
    content: `Zwei Wochen, eine Bavaria 46 und die Kykladen — das ist ein Rezept für Glück. Unser Törn startete im Hafen von Piräus, wo wir unsere Yacht übernahmen und sofort in Richtung Süden Kurs setzten. Erste Station war Aegina mit seinem pittoresken Fischerdorf und dem Aphaia-Tempel aus dem 5. Jahrhundert vor Christus. Weiter ging es nach Hydra, eine der charmantesten Inseln Griechenlands — keine Autos, keine Motorräder, nur Esel und Wasserfahrzeuge. Die pastellfarbenen Häuser klettern den Felshang hinauf, während Segelboote aus aller Welt im Hafen schaukeln.

Mit frischem Nordwind — dem berühmten Meltemi, der im Sommer über die Ägäis fegt — segelten wir in zwei Etappen nach Mykonos. Der Meltemi ist ein zweischneidiges Schwert: Er sorgt für herrliche Segelwinde mit 20 bis 25 Knoten, aber auch für kurze, steile Wellen, die einem nassen Ritt gleichen. Auf Mykonos bummelten wir durch die labyrinthischen Gassen von Chora, vorbei an weiß getünchten Kapellen und leuchtend blauen Türen — das Klischee der Kykladen ist ein Klischee, weil es wahr ist.

Von Mykonos segelten wir nach Naxos, der größten und grünsten Kykladeninsel. Hier gibt es alles: endlose Sandstrände, ein venetianisches Kastell in der Altstadt, herrliche Bergdörfer im Inneren und die besten Produkte der Kykladen — Naxos-Käse, Kartoffeln und Kitron-Likör. Auf Paros ankerten wir in der malerischen Naussa-Bucht und erkundeten das bezaubernde Dörfchen mit seinen Restaurants direkt am Wasser, wo Fischerboote gegen die bunten Häuserwände schaukeln.

Das Finale bildete Santorin — und was für ein Finale. Die Yacht in der Caldera verankert, dem riesigen Vulkankrater, der von der Insel umgeben wird. Der Sonnenuntergang von Oia: ein Spektakel, für das Menschen aus aller Welt anreisen. Von der Yacht aus erlebten wir ihn ganz für uns allein, mit einem Glas griechischem Wein in der Hand und den rötlichen Klippen ringsum. Zwei Wochen Kykladen — eine Reise, die man nie vergisst.`,
  },
  {
    id: 'karibik-grenadinen',
    title: 'A Taste of Paradise — Grenadinen',
    destination: 'Karibik · Grenadinen',
    date: 'März 2023',
    teaser: 'Von Grenada bis St. Vincent durch die Grenadinen — Tobago Cays, Sandy Island, Mustique. Passatwinde, türkisblaues Wasser und Sonnenuntergänge wie aus dem Bilderbuch.',
    headerImg: '/images/packages/Karibik-Grenadinen/gallery/Header.jpg',
    gallery: [
      '/images/packages/Karibik-Grenadinen/gallery/Header.jpg',
      '/images/packages/Karibik-Grenadinen/gallery/sonnenuntergang-grenadinen.jpg',
      '/images/packages/Karibik-Grenadinen/gallery/SandyIsland.jpg',
      '/images/packages/Karibik-Grenadinen/gallery/strand-auf-grenada.jpg',
      '/images/packages/Karibik-Grenadinen/gallery/Tobago.jpg',
      '/images/packages/Karibik-Grenadinen/gallery/Wallilabou1.jpg',
      '/images/packages/Karibik-Grenadinen/gallery/Wallilabou2.jpg',
      '/images/packages/Karibik-Grenadinen/gallery/Lobster_tobago.jpg',
      '/images/packages/Karibik-Grenadinen/gallery/bay-601526_1920.jpg',
      '/images/packages/Karibik-Grenadinen/gallery/sundowner.jpg',
      '/images/packages/Karibik-Grenadinen/gallery/Grenadinen_Panorama.png',
      '/images/packages/Karibik-Grenadinen/gallery/Hammock-22_RMT8726.jpg',
    ],
    content: `Grenada — die Gewürzinsel der Karibik — duftet buchstäblich nach Muskatnuss und Zimt. Unser Törn durch die Grenadinen startete in St. George's, der farbenprächtigen Hauptstadt mit ihrem hufeisenförmigen Hafen und den bunten Gewürzmärkten. Nach einer ausgiebigen Erkundung der Insel — Grand Anse Beach mit seinem über drei Kilometer langen weißen Sand, die üppigen Regenwälder und der Grand Etang Kratersee — übernahmen wir unsere Catana 47 und setzten Kurs nach Norden, den Passatwind im Rücken.

Das absolute Highlight des Törns waren die Tobago Cays — ein geschütztes Meeresschutzgebiet, das aus fünf kleinen, unbewohnten Inseln und einem atemberaubenden Korallenriff besteht. Hier schwammen wir mit echten Karettschildkröten, die sich von den Booten überhaupt nicht stören ließen. Das Wasser hatte eine Transparenz und ein Türkisblau, das man kaum zu fotografieren wagt, weil man weiß, dass kein Bild die Realität einfangen kann. Am Abend ankerten ein Dutzend Boote aus aller Welt friedlich nebeneinander, während die Sonne hinter den Inseln versank und jemand am Nachbarboot Gitarre spielte.

Sandy Island vor Carriacou ist genau das, was man sich unter einer karibischen Insel vorstellt: ein schmaler Streifen weißen Sandes mit ein paar Palmen darauf, umgeben von kristallklarem Wasser. Wir ankerten so nah heran, wie es der Tiefgang erlaubte, und schwammen einfach an den Strand. Keine anderen Menschen. Keine Geräusche außer Wellen und Wind. Bequia, eine der Lieblingsinseln der Segler in der Karibik, bot dann wieder Zivilisation der angenehmen Art: ein gemütlicher Hafen, exzellente Restaurants und der beste Rum Punch diesseits von Trinidad.

Den krönenden Abschluss bildete St. Vincent mit seinem wilden, bergigen Inneren und dem berühmten Wallilabou Bay — bekannt als Drehort der ersten Pirates-of-the-Caribbean-Filme. Zwei Wochen auf den Grenadinen sind wie ein Traum: Das Licht ist anders, das Wasser ist anders, die Zeit vergeht anders. Wer einmal durch diese Inselkette gesegelt ist, versteht, warum so viele Segler die Grenadinen als das Paradies auf Erden bezeichnen.`,
  },
  {
    id: 'dodekanes',
    title: 'Dodekanes — Faszinierende Reise durch die östliche Ägäis',
    destination: 'Griechenland · Dodekanes',
    date: 'Oktober 2022',
    teaser: 'Rhodos, Kos, Patmos, Kalymnos — die zwölf großen Inseln der östlichen Ägäis verbinden mittelalterliche Geschichte mit glasklarem Wasser. Ein Törn zwischen ritterlichen Burgen und einsamen Buchten.',
    headerImg: '/images/Destinationsbilder/bucht-in-den-dodekanes-bei-yacht-urlaub.jpg',
    gallery: [
      '/images/Destinationsbilder/bucht-in-den-dodekanes-bei-yacht-urlaub.jpg',
      '/images/Destinationsbilder/akropolis-von-rhodos-bei-yacht-urlaub.jpg',
      '/images/packages/Griechenland/gallery/akropolis-von-rhodos-bei-yacht-urlaub.jpg',
      '/images/packages/Griechenland/gallery/BlaueBucht.jpg',
      '/images/packages/Griechenland/gallery/Sonnenuntergang.jpg',
      '/images/packages/Griechenland/gallery/20181008_184812.jpg',
    ],
    content: `Unser Törn startete in Rhodos, der größten Insel der Dodekanes und einer der besterhaltenen mittelalterlichen Städte Europas. Der Yachthafen liegt direkt neben der imposanten Stadtmauer — schon beim Einlaufen war klar, dass diese Reise historisch werden würde. Die Altstadt von Rhodos ist UNESCO-Welterbe: Kopfsteinpflaster, der Palast des Großmeisters, die Ritterstraße mit ihren gotischen Palästen. Wir verbrachten den ersten Abend in einem der Restaurants innerhalb der Stadtmauern und tranken lokalen Assyrtiko-Wein, während die Schwalben über das mittelalterliche Pflaster schossen.

Von Rhodos segelten wir nach Kos — die Insel des Hippokrates, des Vaters der modernen Medizin. Das Asklepieion, das antike Heilungszentrum auf einem Hügel oberhalb der Stadt, bietet einen atemberaubenden Blick über die Insel und die türkische Küste, die hier nur wenige Kilometer entfernt liegt. Die Mischung aus griechischer und türkischer Atmosphäre ist spürbar — die Küchen beider Kulturen prägen die lokale Gastronomie.

Patmos war der spirituelle Höhepunkt des Törns. Die Insel, auf der der Evangelist Johannes die Apokalypse geschrieben haben soll, strahlt eine mystische Ruhe aus, die man kaum beschreiben kann. Das Kloster des Heiligen Johannes thront über der Chora und ist ebenfalls UNESCO-Welterbe. Wir besuchten die Apokalypsen-Grotte, in der die Offenbarung verfasst worden sein soll — ein Erlebnis, das selbst überzeugten Nicht-Religiösen nicht gleichgültig lässt.

Den Abschluss bildete Kalymnos, bekannt als die Insel der Schwammtaucher. Die bunten Häuser von Pothia, dem Hafen, und die dramatischen Kalksteinfelsen — das gleiche Gestein, das Kletterern aus aller Welt hierher lockt — sind ein eindrucksvoller Abschluss. Ein Dodekanes-Törn ist für alle, die neben dem Segeln auch Geschichte, Kultur und eine einzigartige Mischung aus Antike und Mittelalter suchen.`,
  },
  {
    id: 'mallorca-menorca-cabrera',
    title: 'Mallorca – Menorca – Cabrera: Entdeckungstour durch die nördlichen Balearen',
    destination: 'Spanien · Balearen',
    date: 'September 2021',
    teaser: 'Palmas gotische Kathedrale, Menorcas unberührte Calas und das Naturschutzgebiet Cabrera — eine Woche durch die nördlichen Balearen zwischen Kultur, Natur und kristallklarem Wasser.',
    headerImg: '/images/Destinationsbilder/Header/Header_TB_Mallorca.jpg',
    gallery: [
      '/images/Destinationsbilder/Header/Header_TB_Mallorca.jpg',
      '/images/Destinationsbilder/blick-auf-palma-de-mallorca.jpg',
      '/images/Destinationsbilder/alcúdia-bucht.jpg',
      '/images/Destinationsbilder/espalmador-bei-yacht-urlaub.jpg',
      '/images/Destinationsbilder/cabrera-bei-yacht-urlaub (2).jpg',
    ],
    content: `Palma de Mallorca im frühen September: Die Hochsaison ist vorbei, die Marinas atmen auf und die Stadt gehört wieder einem selbst. Wir übernahmen unsere Sun Odyssey 440 im Hafen von Palma und ließen uns zuerst von der Kathedrale La Seu in den Bann ziehen — von der Yacht aus ist sie aus fast jedem Winkel des Hafens zu sehen, ein gotisches Meisterwerk aus dem 13. Jahrhundert, das im Abendlicht golden glüht.

Die erste Nacht ankerten wir in einer der Buchten östlich von Palma und segelten am nächsten Morgen mit frischem Tramontana-Wind nach Norden, in Richtung Alcúdia. Die Bucht von Alcúdia ist einer der wenigen Sandstrände Mallorcas, der von der Yacht aus unmittelbar erreichbar ist — wir ankerten in knapp 3 Metern Wassertiefe und schwammen direkt ans Ufer. Ein Kind, das uns beobachtete, fragte ernsthaft, ob wir Piraten seien.

Menorca empfing uns mit Stille. Nach dem lebhaften Mallorca ist Menorca ein anderes Universum — UNESCO-Biosphärenreservat, wenig Tourismus, endlose Calas mit weißem Sand und türkisblauem Wasser, die man nur per Boot erreicht. Cala Macarella und Cala Macarelleta sind vielleicht die schönsten Buchten der Balearen: steile Felswände, kristallklares Wasser und eine Bar, die Pomada serviert — Gin Xoriguer aus Menorca mit Limonade, die Spezialität der Insel.

Cabrera war der unvergessliche Abschluss. Das Naturschutzgebiet südlich von Mallorca darf nur mit Sondergenehmigung besucht werden — die Mühe lohnt sich. Eine historische Festung auf dem Hügel, Wasser von einer Klarheit, die jeden Fotografen zur Verzweiflung bringt, und abends kein einziges anderes Boot mehr in der Bucht. Die Stille war so vollständig, dass das Gluckern des Wassers am Rumpf laut klang.`,
  },
  {
    id: 'sardinien-korsika',
    title: 'Sardinien bis Korsika — Entdeckungstour zu den Inseln der Kontraste',
    destination: 'Italien & Frankreich · Tyrrhenisches Meer',
    date: 'Juni 2023',
    teaser: 'Zwei Inseln, zwei Kulturen, ein Meer. Von Sardiniens karibisch anmutendem Costa Smeralda bis zu Korsikas wilden Bergküsten — eine Reise durch die faszinierendsten Kontraste des Mittelmeers.',
    headerImg: '/images/Destinationsbilder/Header/dennis-van-den-worm-1218300-unsplash.jpg',
    gallery: [
      '/images/Destinationsbilder/Header/dennis-van-den-worm-1218300-unsplash.jpg',
      '/images/Destinationsbilder/enge-gasse-mit-blick-aufs-meer-bei-yacht-urlaub.jpg',
      '/images/packages/Griechenland/gallery/BlaueBucht.jpg',
    ],
    content: `Die Überfahrt von Porto Cervo auf Sardiniens Costa Smeralda nach Bonifacio auf Korsika ist eine der spektakulärsten Segelpassagen des Mittelmeers. Die Bouches de Bonifacio — die Meerenge zwischen den beiden Inseln — sind berüchtigt: Strömungen, Felsen und manchmal starker Wind machen die Durchfahrt anspruchsvoll. Aber der Ausblick auf die weißen Kalksteinklippen beider Inseln, zwischen denen das türkisfarbene Wasser rauscht, ist schlicht unvergesslich.

Sardinien überraschte uns mit seinem karibischen Flair, das man im Mittelmeer nicht erwartet. Die Buchten rund um La Maddalena und Caprera — ein Archipel-Nationalpark — haben ein Wasser, das kaum zu beschreiben ist: mehrere Blautöne übereinander, Sichtweiten von 20 Metern und Sandböden, die von unten leuchten. Die Costa Smeralda ist bekannt für ihre Luxusmarinas (Porto Cervo, Porto Rafael), aber die schönsten Ankerplätze im Archipel sind wild, einsam und kostenlos.

Korsika ist Sardiniens entgegengesetzter Charakter: rauher, grüner, wilder. Das Maquis — das typische korsische Unterholz aus Rosmarin, Myrte und Lavendel — duftet schon auf dem Meer, bevor man die Insel sieht. Napoleon soll auf Korsika geboren worden sein und seinen Geburtsort immer am Duft erkannt haben. Bonifacio, die Stadt auf den Klippen, hängt buchstäblich über dem Meer — die Häuser ragen bis an den Rand der Felskante, 60 Meter über dem Wasser.

Porto Vecchio, Propriano und der Golf von Valinco im Südwesten Korsikas boten die schönsten Ankerbuchten. Das Bergpanorama der zentralen Korsika-Berge, bis in den Juni hinein mit Schneeflecken bedeckt, bildet einen surrealen Kontrast zum mediterranen Blau des Meeres. Zwei Inseln, zwei Kulturen, ein Erlebnis, das bleibt.`,
  },
  {
    id: 'sizilien',
    title: 'Zauberhaftes Sizilien — Kultur, Kulinarik und Vulkane',
    destination: 'Italien · Sizilien & Äolische Inseln',
    date: 'Mai 2022',
    teaser: 'Palermo, Cefalù, die Äolischen Inseln mit dem aktiven Vulkan Stromboli — Sizilien ist ein Törn durch Jahrtausende Geschichte und mediterrane Sinnlichkeit, umgeben von glasklarem Wasser.',
    headerImg: '/images/packages/Mamma-Mia/Mamma Mia Rock.webp',
    gallery: [
      '/images/packages/Mamma-Mia/Mamma Mia Rock.webp',
      '/images/Destinationsbilder/enge-gasse-mit-blick-aufs-meer-bei-yacht-urlaub.jpg',
      '/images/Destinationsbilder/landkarte_europa_Italien_gross.jpg',
    ],
    content: `Sizilien ist eine Welt für sich — und kaum eine Segelregion des Mittelmeers bietet eine vergleichbar dichte Mischung aus Geschichte, Kulinarik und Naturspektakel. Unser Törn startete in Palermo, der pulsierenden Hauptstadt, die wie ein barockes Theaterstück aussieht: Prachtbauten aus arab-normannischer Zeit, verwitterte Fassaden, laute Märkte (der Ballarò ist einer der lebendigsten Basare Europas) und das beste Streetfood des Mittelmeers — Arancini, Panelle und Granita alla mandorla.

Von Palermo segelten wir ostwärts nach Cefalù, einem der schönsten Orte Siziliens. Der normannische Dom aus dem 12. Jahrhundert thront über den bunten Fischerbooten im kleinen Hafen, im Hintergrund ragen die Felsen der Rocca auf. Wir ankerten in der Bucht östlich des Ortes und schnorchelten in kristallklarem Wasser — kaum vorstellbar, dass wir uns mitten im Mittelmeer befanden.

Die Äolischen Inseln nördlich Siziliens sind das Herzstück dieses Törns: Stromboli, der aktive Vulkan, der Tag und Nacht Feuerfontänen in den Himmel schleudert; Panarea mit ihren weißgetünchten Häusern und dem Flair einer kleinen Capri; Lipari, die größte und lebendigste der sieben Inseln; und Vulcano mit seinen Schwefeldampfausstößen und dem dazugehörigen Fango-Bad im heißen Schlamm, das Kinder und Erwachsene gleichsam begeistert.

Den unvergesslichsten Moment brachte die Nachtpassage vor Stromboli. Wir ankerten in sicherer Entfernung und beobachteten im Dunkeln, wie der Vulkan alle 20–30 Minuten Glutbrocken ausspie und in orangefarbenen Fontänen wieder niederfielen. Die Glut spiegelte sich auf dem stillen Wasser, kein Wind, kein Laut außer dem fernen Grollen und dem Plätschern der kleinen Wellen. Sizilien ist kein normaler Segeltörn — es ist eine Reise durch Mythos und Geschichte, die unter die Haut geht.`,
  },
  {
    id: 'kornaten-archipel',
    title: 'Kornaten — Der stille Archipel',
    destination: 'Kroatien · Kornaten',
    date: 'August 2023',
    teaser: 'Hundert Inseln, tausend Buchten — und kaum ein Tourist. Die Kornaten sind Kroatiens best gehütetes Geheimnis, ein Nationalpark aus purem Stein und türkisblauem Wasser.',
    headerImg: '/images/packages/Kornaten/gallery/Telascica.webp',
    gallery: [
      '/images/packages/Kornaten/gallery/Telascica.webp',
      '/images/packages/Kornaten/gallery/Dugi Otok.webp',
      '/images/packages/Kornaten/gallery/Dugi Otok Wrack.webp',
      '/images/packages/Kornaten/gallery/Mono Kornaten.webp',
      '/images/packages/Kornaten/gallery/20180909_131842.jpg',
      '/images/packages/Kornaten/gallery/20180910_183458.jpg',
      '/images/packages/Kornaten/gallery/Stand-Up 2.jpg',
      '/images/packages/Kornaten/gallery/unnamed.jpg',
      '/images/packages/Kornaten/gallery/image (93).jpg',
      '/images/packages/Kornaten/gallery/image (99).jpg',
    ],
    content: `Der kroatische Schriftsteller George Bernard Shaw soll einmal gesagt haben, dass Gott an seinem letzten Schöpfungstag die Kornaten aus seinen Tränen, seinem Atem und seinem Herz erschaffen habe. Ob das Zitat echt ist oder nicht — wer einmal durch den Kornaten-Archipel gesegelt ist, versteht es sofort. 89 Inseln, Inselchen und Riffe erstrecken sich über 35 Kilometer Länge, alle aus dem gleichen weißen Kalkstein, kahl und bizarr geformt wie eine Mondlandschaft — und dazwischen Wasser in jedem nur erdenklichen Blauton.

Wir starteten von Šibenik und fuhren zunächst nach Telašćica auf Dugi Otok — einem weitläufigen Naturpark mit einem tief eingeschnittenen Fjord und einem riesigen Salzsee, der sich kaum fünfzehn Meter vom Meer entfernt befindet, aber durch einen Felskamm getrennt ist. Die Klippen von Telašćica fallen über 160 Meter senkrecht ins Meer — ein spektakulärer Anblick von der Yacht aus. In der Abenddämmerung war die Bucht komplett leer, nur wir und das Stille. Der Sternenhimmel ohne jede Lichtverschmutzung war so klar und überwältigend, dass niemand schlafen wollte.

Im eigentlichen Kornaten-Nationalpark ankerten wir in einer Reihe von verlassenen Buchten, die ihren romantischen Namen alle verdienen: Lavsa, Piškera, Kravljačica. Das Wasser hat eine Sichtweite von 30 bis 40 Metern — man sieht jeden Stein am Grund, während man über ihn hinweggleitet. Die Inseln sind unbewohnt, mit Ausnahme einiger Fischhütten, die heute als einfache Restaurants dienen. Diese Konobas auf den Inseln sind ein kleines Wunder: Kein Strom außer Solarenergie, Wasser kommt aus Zisternen, aber der Fisch ist frischer als irgendwo sonst.

Das Wrack eines gesunkenen Frachters vor Dugi Otok war ein unvergesslicher Tauch- und Schnorchelspot: Die Silhouette des Schiffes in 20 Metern Tiefe, umhüllt von Korallen und Fischschwärmen, war ein Bild für die Ewigkeit. Die Kornaten sind kein Ziel für alle — wer lebhafte Häfen, Restaurants und Nachtleben sucht, ist hier falsch. Wer aber die absolute Stille, die Ursprünglichkeit und das Gefühl sucht, der letzte Mensch auf Erden zu sein — der wird die Kornaten auf ewig lieben.`,
  },
]

type Bericht = typeof berichte[0]

function BerichtDetail({ b, onBack }: { b: Bericht; onBack: () => void }) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: '480px', overflow: 'hidden' }}>
        <img src={b.headerImg} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { (e.target as HTMLImageElement).src = '/images/Sail-Away.jpg' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,35,56,0.3) 0%, rgba(15,35,56,0.75) 100%)' }} />
        <div className="container" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '3rem' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', cursor: 'pointer', padding: 0, marginBottom: '1rem', textAlign: 'left', fontFamily: 'DM Sans, sans-serif' }}>
            ← Alle Törnberichte
          </button>
          <p style={{ color: 'var(--blue-light)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{b.destination} · {b.date}</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#fff' }}>{b.title}</h1>
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '4rem' }}>
          <div>
            <p style={{ fontSize: '1.1rem', color: 'var(--gray)', fontStyle: 'italic', lineHeight: 1.8, marginBottom: '2rem', borderLeft: '3px solid var(--blue)', paddingLeft: '1.25rem' }}>
              {b.teaser}
            </p>
            {b.content.split('\n\n').map((para, i) => (
              <p key={i} style={{ fontSize: '0.95rem', lineHeight: 1.9, color: 'var(--text)', marginBottom: '1.25rem' }}>{para}</p>
            ))}

            {/* Gallery */}
            {b.gallery.length > 0 && (
              <div style={{ marginTop: '2.5rem' }}>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--navy)', fontSize: '1.3rem', marginBottom: '1rem' }}>Fotos</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {b.gallery.map((img, i) => (
                    <div key={img} onClick={() => setLightbox(i)} style={{ aspectRatio: '4/3', overflow: 'hidden', cursor: 'pointer', borderRadius: '3px', background: '#eee' }}>
                      <img src={img} alt="" loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                        onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div style={{ background: 'var(--gray-light)', borderRadius: '4px', padding: '1.75rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--navy)', fontSize: '1rem', marginBottom: '1.25rem' }}>Törn-Details</h3>
              {[
                { label: '📍 Destination', val: b.destination },
                { label: '📅 Zeitraum', val: b.date },
              ].map(s => (
                <div key={s.label} style={{ marginBottom: '0.75rem' }}>
                  <p style={{ fontSize: '0.72rem', color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--navy)', fontWeight: 600 }}>{s.val}</p>
                </div>
              ))}
            </div>
            <a href="/#kontakt" className="btn btn-primary" style={{ display: 'block', textAlign: 'center', width: '100%' }}>
              Ähnlichen Törn anfragen →
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button onClick={e => { e.stopPropagation(); setLightbox(i => Math.max(0, i! - 1)) }}
              style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '2.5rem', cursor: 'pointer', padding: '8px 16px', borderRadius: '4px' }}>‹</button>
            <motion.img key={lightbox} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              src={b.gallery[lightbox]} alt="" onClick={e => e.stopPropagation()}
              style={{ maxWidth: '90vw', maxHeight: '88vh', objectFit: 'contain' }} />
            <button onClick={e => { e.stopPropagation(); setLightbox(i => Math.min(b.gallery.length - 1, i! + 1)) }}
              style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '2.5rem', cursor: 'pointer', padding: '8px 16px', borderRadius: '4px' }}>›</button>
            <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer' }}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function ToernberichtePage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const [selected, setSelected] = useState<Bericht | null>(null)

  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title="Törnberichte – Reiseerlebnisse aus aller Welt"
        description="Authentische Törnberichte von unseren Segelreisen: Kroatien-Istrien, Karibik-BVI und mehr. Echte Erfahrungen, Routen-Tipps und Fotos von unseren Skippern und Gästen."
        canonical="/toernberichte"
        image="/images/Berichte/Istrien2020/Foto1.jpg"
      />
      <AnimatePresence mode="wait">
        {selected ? (
          <BerichtDetail key={selected.id} b={selected} onBack={() => { setSelected(null); window.scrollTo(0, 0) }} />
        ) : (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Header */}
            <div style={{ background: 'var(--navy)', padding: '5rem 0 4rem' }}>
              <div className="container">
                <p style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>Erfahrungsberichte</p>
                <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#fff', marginBottom: '1rem' }}>Törnberichte</h1>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', maxWidth: '520px', lineHeight: 1.8 }}>
                  Authentische Reiseberichte direkt von unseren Törns — persönlich, ehrlich und voller Inspiration für Ihre nächste Segelreise.
                </p>
              </div>
            </div>

            {/* Grid */}
            <section className="section" style={{ background: 'var(--gray-light)' }}>
              <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
                  {berichte.map((b, i) => (
                    <motion.article
                      key={b.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      onClick={() => { setSelected(b); window.scrollTo(0, 0) }}
                      className="card-hover"
                      style={{ background: '#fff', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}
                    >
                      <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                        <img src={b.headerImg} alt={b.title} loading="lazy"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                          onError={e => { (e.target as HTMLImageElement).src = '/images/Sail-Away.jpg' }}
                        />
                      </div>
                      <div style={{ padding: '1.75rem' }}>
                        <p style={{ color: 'var(--blue)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>{b.destination} · {b.date}</p>
                        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--navy)', fontSize: '1.3rem', marginBottom: '0.75rem', lineHeight: 1.3 }}>{b.title}</h2>
                        <p style={{ color: 'var(--gray)', fontSize: '0.88rem', lineHeight: 1.75, marginBottom: '1.25rem' }}>{b.teaser}</p>
                        <span style={{ color: 'var(--blue)', fontSize: '0.82rem', fontWeight: 600 }}>Bericht lesen →</span>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
