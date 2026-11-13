import type { Level, ReadingText } from "../../types";

/**
 * Reading texts with comprehension questions.
 * Sentence line:  Satz | Pinyin | Deutsch
 * Question line:  Frage | richtige Antwort | falsche Antwort | falsche Antwort
 */
function text(
  id: string,
  icon: string,
  title: string,
  titleDe: string,
  level: Level,
  rawSentences: string,
  rawQuestions: string,
): ReadingText {
  const lines = (raw: string) =>
    raw
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => l.split("|").map((s) => s.trim()));
  return {
    id,
    icon,
    title,
    titleDe,
    level,
    sentences: lines(rawSentences).map(([target, reading, de]) => ({ target, reading, de })),
    questions: lines(rawQuestions).map(([question, answer, ...wrong]) => ({ question, answer, wrong })),
  };
}

export const texts: ReadingText[] = [
  text(
    "zh-read-1",
    "☀️",
    "我的一天",
    "Mein Tag",
    "A1",
    `
我叫小明，我是学生。|Wǒ jiào Xiǎomíng, wǒ shì xuésheng.|Ich heiße Xiaoming, ich bin Student.
我每天七点起床。|Wǒ měi tiān qī diǎn qǐchuáng.|Ich stehe jeden Tag um sieben auf.
早上我喝咖啡，吃面包。|Zǎoshang wǒ hē kāfēi, chī miànbāo.|Morgens trinke ich Kaffee und esse Brot.
八点我坐地铁去学校。|Bā diǎn wǒ zuò dìtiě qù xuéxiào.|Um acht fahre ich mit der U-Bahn zur Schule.
中午我和朋友一起吃饭。|Zhōngwǔ wǒ hé péngyou yìqǐ chīfàn.|Mittags esse ich mit Freunden zusammen.
下午我在家学习中文。|Xiàwǔ wǒ zài jiā xuéxí Zhōngwén.|Nachmittags lerne ich zu Hause Chinesisch.
晚上我看电视，十一点睡觉。|Wǎnshang wǒ kàn diànshì, shíyī diǎn shuìjiào.|Abends sehe ich fern, um elf gehe ich schlafen.
我很喜欢我的生活。|Wǒ hěn xǐhuan wǒ de shēnghuó.|Ich mag mein Leben sehr.
`,
    `
Wann steht Xiaoming auf?|Um sieben Uhr|Um acht Uhr|Um elf Uhr
Wie kommt er zur Schule?|Mit der U-Bahn|Mit dem Bus|Zu Fuß
Was macht er am Nachmittag?|Er lernt Chinesisch|Er sieht fern|Er trifft Freunde
`,
  ),
  text(
    "zh-read-2",
    "👨‍👩‍👧",
    "我的家",
    "Meine Familie",
    "A1",
    `
我家有四个人。|Wǒ jiā yǒu sì ge rén.|Meine Familie hat vier Personen.
爸爸、妈妈、姐姐和我。|Bàba, māma, jiějie hé wǒ.|Papa, Mama, meine ältere Schwester und ich.
爸爸是医生，他工作很忙。|Bàba shì yīshēng, tā gōngzuò hěn máng.|Papa ist Arzt, er hat viel zu tun.
妈妈是老师，她做饭很好吃。|Māma shì lǎoshī, tā zuòfàn hěn hǎochī.|Mama ist Lehrerin, sie kocht sehr lecker.
姐姐在北京工作。|Jiějie zài Běijīng gōngzuò.|Meine Schwester arbeitet in Peking.
她周末常常回家。|Tā zhōumò chángcháng huíjiā.|Am Wochenende kommt sie oft nach Hause.
我们一起吃饭，一起聊天。|Wǒmen yìqǐ chīfàn, yìqǐ liáotiān.|Wir essen zusammen und plaudern zusammen.
我爱我的家。|Wǒ ài wǒ de jiā.|Ich liebe meine Familie.
`,
    `
Wie viele Personen hat die Familie?|Vier|Drei|Fünf
Was ist der Vater von Beruf?|Arzt|Lehrer|Student
Wo arbeitet die Schwester?|In Peking|In Shanghai|Zu Hause
`,
  ),
  text(
    "zh-read-3",
    "🍜",
    "在饭店",
    "Im Restaurant",
    "A1",
    `
今天是我的生日。|Jīntiān shì wǒ de shēngrì.|Heute ist mein Geburtstag.
我和朋友去饭店吃饭。|Wǒ hé péngyou qù fàndiàn chīfàn.|Ich gehe mit Freunden ins Restaurant.
这家饭店不大，但是菜很好吃。|Zhè jiā fàndiàn bú dà, dànshì cài hěn hǎochī.|Das Restaurant ist nicht groß, aber das Essen ist lecker.
我们点了三个菜和一个汤。|Wǒmen diǎnle sān ge cài hé yí ge tāng.|Wir haben drei Gerichte und eine Suppe bestellt.
我喜欢吃辣的，朋友不能吃辣。|Wǒ xǐhuan chī là de, péngyou bù néng chī là.|Ich esse gern scharf, mein Freund kann nicht scharf essen.
我们喝茶，不喝啤酒。|Wǒmen hē chá, bù hē píjiǔ.|Wir trinken Tee, kein Bier.
一共一百二十块，不贵。|Yígòng yìbǎi èrshí kuài, bú guì.|Insgesamt 120 Yuan, nicht teuer.
朋友说：“今天我请客！”|Péngyou shuō: “Jīntiān wǒ qǐngkè!”|Mein Freund sagt: „Heute lade ich ein!“
`,
    `
Warum gehen sie ins Restaurant?|Es ist Geburtstag|Sie haben Hunger nach der Arbeit|Das Restaurant ist neu
Was trinken sie?|Tee|Bier|Kaffee
Wer bezahlt?|Der Freund|Der Erzähler|Jeder für sich
`,
  ),
  text(
    "zh-read-4",
    "🌧️",
    "周末计划",
    "Wochenendpläne",
    "A2",
    `
这个周末我本来打算跟朋友去爬山。|Zhège zhōumò wǒ běnlái dǎsuàn gēn péngyou qù páshān.|Dieses Wochenende wollte ich eigentlich mit Freunden wandern gehen.
可是天气预报说周六要下雨。|Kěshì tiānqì yùbào shuō zhōuliù yào xiàyǔ.|Aber der Wetterbericht sagt, dass es am Samstag regnet.
我给朋友发微信，问他怎么办。|Wǒ gěi péngyou fā Wēixìn, wèn tā zěnme bàn.|Ich schreibe meinem Freund auf WeChat und frage, was wir machen.
他说：“要不我们改天去吧。”|Tā shuō: “Yàobù wǒmen gǎitiān qù ba.”|Er sagt: „Wie wär's, wenn wir ein andermal gehen?“
我觉得这是个好主意。|Wǒ juéde zhè shì ge hǎo zhǔyi.|Ich finde, das ist eine gute Idee.
所以周六我们在家看电影，点外卖。|Suǒyǐ zhōuliù wǒmen zài jiā kàn diànyǐng, diǎn wàimài.|Deshalb schauen wir am Samstag zu Hause Filme und bestellen Essen.
周日天气好的话，我们去公园打羽毛球。|Zhōurì tiānqì hǎo dehuà, wǒmen qù gōngyuán dǎ yǔmáoqiú.|Wenn am Sonntag das Wetter gut ist, spielen wir im Park Badminton.
虽然不能爬山，但是我还是很开心。|Suīrán bù néng páshān, dànshì wǒ háishi hěn kāixīn.|Obwohl wir nicht wandern können, bin ich trotzdem glücklich.
`,
    `
Was war der ursprüngliche Plan?|Wandern gehen|Ins Kino gehen|Badminton spielen
Warum ändern sie den Plan?|Es soll regnen|Der Freund ist krank|Sie haben keine Zeit
Was machen sie am Samstag?|Filme schauen und Essen bestellen|Im Park Badminton spielen|Einkaufen gehen
`,
  ),
  text(
    "zh-read-5",
    "📦",
    "网上购物",
    "Online-Shopping",
    "A2",
    `
我很喜欢在网上买东西，又方便又便宜。|Wǒ hěn xǐhuan zài wǎngshàng mǎi dōngxi, yòu fāngbiàn yòu piányi.|Ich kaufe sehr gern online ein, es ist praktisch und günstig.
上个星期我买了一双运动鞋。|Shàng ge xīngqī wǒ mǎile yì shuāng yùndòngxié.|Letzte Woche habe ich ein Paar Sportschuhe gekauft.
三天以后快递就到了。|Sān tiān yǐhòu kuàidì jiù dào le.|Nach drei Tagen war das Paket schon da.
可是我试了一下，鞋有点儿小。|Kěshì wǒ shìle yíxià, xié yǒudiǎnr xiǎo.|Aber als ich sie anprobierte, waren die Schuhe etwas klein.
我联系了客服，问能不能换。|Wǒ liánxìle kèfú, wèn néng bu néng huàn.|Ich habe den Kundenservice kontaktiert und gefragt, ob ich umtauschen kann.
客服很客气，说没问题。|Kèfú hěn kèqi, shuō méi wèntí.|Der Kundenservice war sehr freundlich und sagte, kein Problem.
现在我在等大一号的鞋。|Xiànzài wǒ zài děng dà yí hào de xié.|Jetzt warte ich auf die Schuhe eine Nummer größer.
我对这家店很满意，打算给一个好评。|Wǒ duì zhè jiā diàn hěn mǎnyì, dǎsuàn gěi yí ge hǎopíng.|Ich bin mit dem Laden sehr zufrieden und will eine gute Bewertung geben.
`,
    `
Was hat die Person gekauft?|Sportschuhe|Ein Handy|Eine Hose
Was war das Problem?|Die Schuhe waren zu klein|Das Paket kam nicht an|Die Schuhe waren kaputt
Wie reagiert der Kundenservice?|Freundlich, Umtausch ist möglich|Er antwortet nicht|Er lehnt den Umtausch ab
`,
  ),
  text(
    "zh-read-6",
    "🏸",
    "我的爱好",
    "Mein Hobby",
    "A2",
    `
我的爱好是打羽毛球。|Wǒ de àihào shì dǎ yǔmáoqiú.|Mein Hobby ist Badminton.
我从十岁开始学，已经打了很多年了。|Wǒ cóng shí suì kāishǐ xué, yǐjīng dǎle hěn duō nián le.|Ich habe mit zehn angefangen und spiele schon viele Jahre.
我每个星期打两次，一次两个小时。|Wǒ měi ge xīngqī dǎ liǎng cì, yí cì liǎng ge xiǎoshí.|Ich spiele zweimal pro Woche, jeweils zwei Stunden.
打球的时候，我可以认识很多新朋友。|Dǎqiú de shíhou, wǒ kěyǐ rènshi hěn duō xīn péngyou.|Beim Spielen kann ich viele neue Freunde kennenlernen.
运动以后，我觉得身体很舒服。|Yùndòng yǐhòu, wǒ juéde shēntǐ hěn shūfu.|Nach dem Sport fühlt sich mein Körper richtig gut an.
上个月我参加了一个比赛。|Shàng ge yuè wǒ cānjiāle yí ge bǐsài.|Letzten Monat habe ich an einem Turnier teilgenommen.
我没有赢，但是玩儿得很开心。|Wǒ méiyǒu yíng, dànshì wánr de hěn kāixīn.|Ich habe nicht gewonnen, aber es hat viel Spaß gemacht.
你也喜欢运动吗？我们一起打球吧！|Nǐ yě xǐhuan yùndòng ma? Wǒmen yìqǐ dǎqiú ba!|Magst du auch Sport? Lass uns zusammen spielen!
`,
    `
Wie oft spielt die Person Badminton?|Zweimal pro Woche|Jeden Tag|Einmal im Monat
Was gefällt ihr am Spielen?|Neue Freunde kennenlernen|Geld verdienen|Früh aufstehen
Wie lief das Turnier?|Nicht gewonnen, aber Spaß gehabt|Gewonnen|Nicht teilgenommen
`,
  ),
  text(
    "zh-read-7",
    "✈️",
    "第一次去中国",
    "Zum ersten Mal in China",
    "B1",
    `
去年冬天，我第一次去中国旅游。|Qùnián dōngtiān, wǒ dì-yī cì qù Zhōngguó lǚyóu.|Letzten Winter bin ich zum ersten Mal nach China gereist.
出发以前，我提前订好了机票和酒店，还做了一份攻略。|Chūfā yǐqián, wǒ tíqián dìnghǎole jīpiào hé jiǔdiàn, hái zuòle yí fèn gōnglüè.|Vor der Abreise hatte ich Flug und Hotel gebucht und einen Reiseplan erstellt.
到了深圳以后，我发现这个城市比我想的更现代。|Dàole Shēnzhèn yǐhòu, wǒ fāxiàn zhège chéngshì bǐ wǒ xiǎng de gèng xiàndài.|In Shenzhen angekommen, merkte ich, dass die Stadt moderner ist, als ich dachte.
在这里，几乎没有人用现金，大家都用手机付款。|Zài zhèlǐ, jīhū méiyǒu rén yòng xiànjīn, dàjiā dōu yòng shǒujī fùkuǎn.|Hier benutzt fast niemand Bargeld, alle bezahlen mit dem Handy.
刚开始我听不懂别人说的话，有点儿紧张。|Gāng kāishǐ wǒ tīng bu dǒng biérén shuō de huà, yǒudiǎnr jǐnzhāng.|Anfangs verstand ich nicht, was die Leute sagten, und war etwas nervös.
但是我试着用中文点菜、问路，大家都很有耐心。|Dànshì wǒ shìzhe yòng Zhōngwén diǎncài, wèn lù, dàjiā dōu hěn yǒu nàixīn.|Aber ich versuchte, auf Chinesisch zu bestellen und nach dem Weg zu fragen – alle waren sehr geduldig.
有一位老板听说我在学中文，还送了我一杯茶。|Yǒu yí wèi lǎobǎn tīngshuō wǒ zài xué Zhōngwén, hái sòngle wǒ yì bēi chá.|Ein Ladenbesitzer hörte, dass ich Chinesisch lerne, und schenkte mir sogar einen Tee.
这次旅行让我更有信心了。|Zhè cì lǚxíng ràng wǒ gèng yǒu xìnxīn le.|Diese Reise hat mir mehr Selbstvertrauen gegeben.
回国以后，我决定继续努力学习，明年再去一次。|Huíguó yǐhòu, wǒ juédìng jìxù nǔlì xuéxí, míngnián zài qù yí cì.|Zurück zu Hause beschloss ich, fleißig weiterzulernen und nächstes Jahr wieder hinzufahren.
`,
    `
Was überraschte die Person in Shenzhen?|Die Stadt ist sehr modern, alle zahlen mit dem Handy|Es war sehr kalt|Niemand sprach mit ihr
Wie fühlte sie sich am Anfang?|Etwas nervös, weil sie wenig verstand|Gelangweilt|Völlig entspannt
Was beschließt sie nach der Reise?|Weiterzulernen und wieder hinzufahren|Nie wieder zu reisen|Nach China umzuziehen
`,
  ),
  text(
    "zh-read-8",
    "📚",
    "怎么学好中文",
    "Wie man gut Chinesisch lernt",
    "B1",
    `
很多人觉得中文很难，尤其是声调和汉字。|Hěn duō rén juéde Zhōngwén hěn nán, yóuqí shì shēngdiào hé Hànzì.|Viele finden Chinesisch schwer, besonders die Töne und die Schriftzeichen.
其实，只要方法对，每天坚持，就一定能进步。|Qíshí, zhǐyào fāngfǎ duì, měi tiān jiānchí, jiù yídìng néng jìnbù.|Eigentlich macht man sicher Fortschritte, wenn die Methode stimmt und man täglich dranbleibt.
第一，不要一次学太多生词。|Dì-yī, búyào yí cì xué tài duō shēngcí.|Erstens: Lerne nicht zu viele neue Wörter auf einmal.
每天学十个，然后经常复习，效果更好。|Měi tiān xué shí ge, ránhòu jīngcháng fùxí, xiàoguǒ gèng hǎo.|Zehn pro Tag lernen und oft wiederholen wirkt besser.
第二，多听多说。|Dì-èr, duō tīng duō shuō.|Zweitens: viel hören und viel sprechen.
你可以一边坐地铁一边听播客，也可以跟着电视剧练习。|Nǐ kěyǐ yìbiān zuò dìtiě yìbiān tīng bōkè, yě kěyǐ gēnzhe diànshìjù liànxí.|Du kannst in der U-Bahn Podcasts hören oder mit Serien üben.
第三，别怕说错。|Dì-sān, bié pà shuō cuò.|Drittens: Hab keine Angst vor Fehlern.
说错了没关系，重要的是别人能听懂你的意思。|Shuō cuò le méi guānxi, zhòngyào de shì biérén néng tīngdǒng nǐ de yìsi.|Fehler machen nichts – wichtig ist, dass andere verstehen, was du meinst.
最后，给自己定一个小目标，比如每天学习二十分钟。|Zuìhòu, gěi zìjǐ dìng yí ge xiǎo mùbiāo, bǐrú měi tiān xuéxí èrshí fēnzhōng.|Zum Schluss: Setz dir ein kleines Ziel, zum Beispiel täglich zwanzig Minuten lernen.
慢慢来，你的中文会越来越好。|Mànmàn lái, nǐ de Zhōngwén huì yuè lái yuè hǎo.|Immer mit der Ruhe – dein Chinesisch wird immer besser.
`,
    `
Was finden viele am Chinesischen schwer?|Töne und Schriftzeichen|Die Grammatik|Das Alphabet
Welcher Rat wird zu neuen Wörtern gegeben?|Wenige pro Tag lernen und oft wiederholen|Möglichst viele auf einmal lernen|Wörter nur aufschreiben
Was sagt der Text über Fehler?|Sie sind nicht schlimm, Hauptsache man wird verstanden|Man sollte erst sprechen, wenn man fehlerfrei ist|Fehler muss man sofort korrigieren lassen
`,
  ),
  text(
    "zh-read-9",
    "📱",
    "手机和我们的生活",
    "Das Handy und unser Leben",
    "B1",
    `
现在，手机已经成了我们生活中最重要的东西之一。|Xiànzài, shǒujī yǐjīng chéngle wǒmen shēnghuó zhōng zuì zhòngyào de dōngxi zhī yī.|Heute ist das Handy eines der wichtigsten Dinge in unserem Leben geworden.
我们用手机聊天、购物、点外卖、看新闻。|Wǒmen yòng shǒujī liáotiān, gòuwù, diǎn wàimài, kàn xīnwén.|Wir chatten, kaufen ein, bestellen Essen und lesen Nachrichten mit dem Handy.
出门的时候，可以不带钱包，但是不能不带手机。|Chūmén de shíhou, kěyǐ bú dài qiánbāo, dànshì bù néng bú dài shǒujī.|Beim Rausgehen kann man das Portemonnaie vergessen, aber nicht das Handy.
手机让生活方便了很多，不过也带来了一些问题。|Shǒujī ràng shēnghuó fāngbiànle hěn duō, búguò yě dàiláile yìxiē wèntí.|Das Handy macht das Leben viel bequemer, bringt aber auch einige Probleme.
比如，很多人睡觉以前一直刷手机，结果睡得越来越晚。|Bǐrú, hěn duō rén shuìjiào yǐqián yìzhí shuā shǒujī, jiéguǒ shuì de yuè lái yuè wǎn.|Viele scrollen zum Beispiel vor dem Schlafen ständig am Handy und gehen dadurch immer später ins Bett.
朋友一起吃饭的时候，大家都在看手机，很少聊天。|Péngyou yìqǐ chīfàn de shíhou, dàjiā dōu zài kàn shǒujī, hěn shǎo liáotiān.|Wenn Freunde zusammen essen, schauen alle aufs Handy und reden kaum.
我觉得手机本身没有问题，重要的是我们怎么用它。|Wǒ juéde shǒujī běnshēn méiyǒu wèntí, zhòngyào de shì wǒmen zěnme yòng tā.|Ich finde, das Handy selbst ist nicht das Problem – wichtig ist, wie wir es nutzen.
所以我给自己定了一个规定：吃饭和睡觉以前不看手机。|Suǒyǐ wǒ gěi zìjǐ dìngle yí ge guīdìng: chīfàn hé shuìjiào yǐqián bú kàn shǒujī.|Deshalb habe ich mir eine Regel gesetzt: beim Essen und vor dem Schlafen kein Handy.
`,
    `
Wofür nutzen Menschen laut Text das Handy?|Chatten, einkaufen, Essen bestellen, Nachrichten|Nur zum Telefonieren|Nur zum Spielen
Welches Problem wird genannt?|Man geht immer später schlafen|Handys sind zu teuer|Man verliert das Handy oft
Welche Regel setzt sich die Person?|Kein Handy beim Essen und vor dem Schlafen|Das Handy nur am Wochenende nutzen|Kein Handy bei der Arbeit
`,
  ),
  text(
    "zh-read-10",
    "⚖️",
    "工作和生活的平衡",
    "Balance zwischen Arbeit und Leben",
    "B2",
    `
随着社会的发展，人们的工作压力越来越大。|Suízhe shèhuì de fāzhǎn, rénmen de gōngzuò yālì yuè lái yuè dà.|Mit der Entwicklung der Gesellschaft wird der Arbeitsdruck immer größer.
不少年轻人每天加班，几乎没有自己的时间。|Bù shǎo niánqīngrén měi tiān jiābān, jīhū méiyǒu zìjǐ de shíjiān.|Nicht wenige junge Leute machen täglich Überstunden und haben kaum Zeit für sich.
有人认为，年轻的时候应该努力工作，否则以后会后悔。|Yǒu rén rènwéi, niánqīng de shíhou yīnggāi nǔlì gōngzuò, fǒuzé yǐhòu huì hòuhuǐ.|Manche meinen, man solle in jungen Jahren hart arbeiten, sonst bereue man es später.
然而，也有人认为健康和家人比工作更重要。|Rán'ér, yě yǒu rén rènwéi jiànkāng hé jiārén bǐ gōngzuò gèng zhòngyào.|Andere hingegen finden Gesundheit und Familie wichtiger als die Arbeit.
在我看来，这两种观点都有道理。|Zài wǒ kànlái, zhè liǎng zhǒng guāndiǎn dōu yǒu dàolǐ.|Aus meiner Sicht haben beide Standpunkte etwas für sich.
工作可以让我们实现目标，但是如果身体出了问题，一切都没有意义。|Gōngzuò kěyǐ ràng wǒmen shíxiàn mùbiāo, dànshì rúguǒ shēntǐ chūle wèntí, yíqiè dōu méiyǒu yìyì.|Arbeit lässt uns Ziele erreichen, aber wenn die Gesundheit leidet, ist alles bedeutungslos.
因此，无论多忙，我们都应该留出时间休息、运动、陪家人。|Yīncǐ, wúlùn duō máng, wǒmen dōu yīnggāi liúchū shíjiān xiūxi, yùndòng, péi jiārén.|Deshalb sollten wir uns, egal wie beschäftigt wir sind, Zeit für Erholung, Sport und Familie nehmen.
总之，平衡不是少工作，而是更聪明地安排时间。|Zǒngzhī, pínghéng bú shì shǎo gōngzuò, ér shì gèng cōngming de ānpái shíjiān.|Kurz gesagt: Balance heißt nicht weniger arbeiten, sondern die Zeit klüger einteilen.
`,
    `
Welche zwei Standpunkte stellt der Text gegenüber?|Hart arbeiten in jungen Jahren – oder Gesundheit und Familie zuerst|Stadtleben – oder Landleben|Studium – oder Ausbildung
Was meint die Autorin oder der Autor dazu?|Beide Seiten haben recht|Nur Arbeit zählt|Arbeit ist unwichtig
Was bedeutet Balance laut dem Schlusssatz?|Die Zeit klüger einteilen|Weniger arbeiten|Den Job wechseln
`,
  ),
];
