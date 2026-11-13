// HSK-Ergänzung (HSK 3.0 Stufen 1–3 und HSK 2.0 Stufen 1–4), nach Niveau sortiert.
// Format: Wort | Pinyin | Deutsch | Wortart | Niveau | Beispiel | Beispiel-Pinyin | Beispiel-Deutsch | L
const part6: Record<string, string> = {
  travel: `
北京|Běijīng|Peking|n|A1|我想去北京。|Wǒ xiǎng qù Běijīng.|Ich möchte nach Peking fahren.
车|chē|Auto; Fahrzeug|n|A1|我的车在外面。|Wǒ de chē zài wàimiàn.|Mein Auto steht draußen.
车票|chēpiào|Fahrkarte|n|A1|我买了两张车票。|Wǒ mǎi le liǎng zhāng chēpiào.|Ich habe zwei Fahrkarten gekauft.
车上|chēshang|im Fahrzeug; im Bus|n|A1|车上有很多人。|Chēshang yǒu hěn duō rén.|Im Bus sind viele Leute.
飞|fēi|fliegen|v|A1|小鸟飞走了。|Xiǎoniǎo fēi zǒu le.|Das Vögelchen ist weggeflogen.
国|guó|Land; Staat|n|A1|你是哪国人？|Nǐ shì nǎ guó rén?|Aus welchem Land kommst du?
国外|guówài|Ausland|n|A1|他在国外工作。|Tā zài guówài gōngzuò.|Er arbeitet im Ausland.
来到|láidào|ankommen in; kommen nach|v|A1|欢迎来到北京！|Huānyíng láidào Běijīng!|Willkommen in Peking!
路上|lùshang|unterwegs; auf der Straße|n|A1|路上小心！|Lùshang xiǎoxīn!|Pass unterwegs auf dich auf!
门票|ménpiào|Eintrittskarte|n|A1|门票多少钱一张？|Ménpiào duōshao qián yì zhāng?|Wie viel kostet eine Eintrittskarte?
汽车|qìchē|Auto|n|A1|路上有很多汽车。|Lùshang yǒu hěn duō qìchē.|Auf der Straße sind viele Autos.
上车|shàngchē|einsteigen|v|A1|快上车吧！|Kuài shàngchē ba!|Steig schnell ein!
下车|xiàchē|aussteigen|v|A1|我在下一站下车。|Wǒ zài xià yí zhàn xiàchē.|Ich steige an der nächsten Haltestelle aus.
走路|zǒulù|zu Fuß gehen|v|A1|我每天走路上班。|Wǒ měi tiān zǒulù shàngbān.|Ich gehe jeden Tag zu Fuß zur Arbeit.
参观|cānguān|besichtigen|v|A2|我们去参观学校。|Wǒmen qù cānguān xuéxiào.|Wir besichtigen die Schule.
车辆|chēliàng|Fahrzeuge|n|A2|路上车辆很多。|Lùshang chēliàng hěn duō.|Auf der Straße sind viele Fahrzeuge.
出国|chūguó|ins Ausland gehen|v|A2|他明年要出国。|Tā míngnián yào chūguó.|Er geht nächstes Jahr ins Ausland.
船|chuán|Schiff; Boot|n|A2|我们坐船去吧。|Wǒmen zuò chuán qù ba.|Lass uns mit dem Schiff fahren.
公共汽车|gōnggòngqìchē|(Linien-)Bus|n|A2|我坐公共汽车上班。|Wǒ zuò gōnggòngqìchē shàngbān.|Ich fahre mit dem Bus zur Arbeit.
公路|gōnglù|Landstraße; Fernstraße|n|A2|这条公路很长。|Zhè tiáo gōnglù hěn cháng.|Diese Landstraße ist sehr lang.
海边|hǎibiān|Küste; Strand|n|A2|我们去海边玩儿吧。|Wǒmen qù hǎibiān wánr ba.|Lass uns ans Meer fahren.
回国|huíguó|ins Heimatland zurückkehren|v|A2|他下个月回国。|Tā xià gè yuè huíguó.|Er kehrt nächsten Monat in sein Heimatland zurück.
交通|jiāotōng|Verkehr|n|A2|这里的交通很方便。|Zhèlǐ de jiāotōng hěn fāngbiàn.|Die Verkehrsanbindung hier ist sehr gut.
旅客|lǚkè|Reisende/r; Fahrgast|n|A2|火车站里旅客很多。|Huǒchēzhàn lǐ lǚkè hěn duō.|Im Bahnhof sind viele Reisende.
旅行|lǚxíng|reisen; Reise|v|A2|我喜欢一个人旅行。|Wǒ xǐhuan yí gè rén lǚxíng.|Ich reise gern allein.
骑|qí|fahren (Rad); reiten|v|A2|他每天骑自行车。|Tā měi tiān qí zìxíngchē.|Er fährt jeden Tag Fahrrad.
骑车|qíchē|Fahrrad fahren|v|A2|我骑车去上班。|Wǒ qíchē qù shàngbān.|Ich fahre mit dem Rad zur Arbeit.
起飞|qǐfēi|abheben; starten (Flugzeug)|v|A2|飞机十点起飞。|Fēijī shí diǎn qǐfēi.|Das Flugzeug startet um zehn Uhr.
停车|tíngchē|parken; anhalten|v|A2|这里不能停车。|Zhèlǐ bù néng tíngchē.|Hier darf man nicht parken.
外地|wàidì|auswärts; andere Gegend|n|A2|他去外地工作了。|Tā qù wàidì gōngzuò le.|Er ist zum Arbeiten in eine andere Stadt gegangen.
行人|xíngrén|Fußgänger|n|A2|路上行人很多。|Lù shang xíngrén hěn duō.|Auf der Straße sind viele Fußgänger.
一路平安|yílù píng'ān|Gute Reise!; Komm gut an!|phr|A2|祝你一路平安！|Zhù nǐ yílù píng'ān!|Ich wünsche dir eine gute Reise!
一路顺风|yílù shùnfēng|Gute Reise!|phr|A2|祝你们一路顺风！|Zhù nǐmen yílù shùnfēng!|Ich wünsche euch eine gute Reise!
游客|yóukè|Tourist/in|n|A2|这里游客很多。|Zhèlǐ yóukè hěn duō.|Hier gibt es viele Touristen.
座位|zuòwèi|Sitzplatz|n|A2|这个座位有人吗？|Zhège zuòwèi yǒurén ma?|Ist dieser Platz besetzt?
宾馆|bīnguǎn|Hotel|n|A2|我们住在这家宾馆。|Wǒmen zhù zài zhè jiā bīnguǎn.|Wir wohnen in diesem Hotel.
火车站|huǒchēzhàn|Bahnhof|n|A2|火车站离这儿很近。|Huǒchēzhàn lí zhèr hěn jìn.|Der Bahnhof ist ganz in der Nähe.
行李箱|xínglixiāng|Koffer|n|A2|我的行李箱太重了。|Wǒ de xínglixiāng tài zhòng le.|Mein Koffer ist zu schwer.
黄河|Huánghé|Gelber Fluss|n|A2|黄河是一条很长的河。|Huánghé shì yì tiáo hěn cháng de hé.|Der Gelbe Fluss ist ein sehr langer Fluss.
长城|Chángchéng|die Große Mauer|n|B1|我想去爬长城。|Wǒ xiǎng qù pá Chángchéng.|Ich möchte auf die Große Mauer steigen.
大使馆|dàshǐguǎn|Botschaft|n|B1|我要去大使馆办签证。|Wǒ yào qù dàshǐguǎn bàn qiānzhèng.|Ich muss zur Botschaft, um ein Visum zu beantragen.
当地|dāngdì|vor Ort; örtlich|n|B1|我想尝尝当地的菜。|Wǒ xiǎng chángchang dāngdì de cài.|Ich möchte die Küche vor Ort probieren.
到达|dàodá|ankommen; erreichen|v|B1|飞机几点到达北京？|Fēijī jǐ diǎn dàodá Běijīng?|Um wie viel Uhr kommt das Flugzeug in Peking an?
飞行|fēixíng|fliegen; Flug|v|B1|飞行时间是两个小时。|Fēixíng shíjiān shì liǎng ge xiǎoshí.|Die Flugzeit beträgt zwei Stunden.
高速公路|gāosù gōnglù|Autobahn|n|B1|我们走高速公路吧。|Wǒmen zǒu gāosù gōnglù ba.|Lass uns die Autobahn nehmen.
各地|gèdì|überall; alle Orte|n|B1|我去过中国各地。|Wǒ qùguo Zhōngguó gèdì.|Ich war schon überall in China.
故乡|gùxiāng|Heimat|n|B1|我很想念故乡。|Wǒ hěn xiǎngniàn gùxiāng.|Ich vermisse meine Heimat sehr.
国内|guónèi|Inland; im Inland|n|B1|我今年在国内旅游。|Wǒ jīnnián zài guónèi lǚyóu.|Ich reise dieses Jahr im Inland.
海关|hǎiguān|Zoll|n|B1|过海关要看护照。|Guò hǎiguān yào kàn hùzhào.|Beim Zoll wird der Pass kontrolliert.
家乡|jiāxiāng|Heimat; Heimatort|n|B1|我的家乡在南方。|Wǒ de jiāxiāng zài nánfāng.|Meine Heimat liegt im Süden.
路线|lùxiàn|Route; Strecke|n|B1|我们走哪条路线？|Wǒmen zǒu nǎ tiáo lùxiàn?|Welche Route nehmen wir?
旅馆|lǚguǎn|Gasthaus; kleines Hotel|n|B1|这家旅馆很便宜。|Zhè jiā lǚguǎn hěn piányi.|Dieses Gasthaus ist sehr günstig.
旅行社|lǚxíngshè|Reisebüro|n|B1|我在旅行社工作。|Wǒ zài lǚxíngshè gōngzuò.|Ich arbeite in einem Reisebüro.
票价|piàojià|Ticketpreis; Fahrpreis|n|B1|火车票价是多少？|Huǒchē piàojià shì duōshao?|Wie viel kostet die Zugfahrkarte?
前往|qiánwǎng|sich begeben nach; reisen nach|v|B1|他明天前往北京。|Tā míngtiān qiánwǎng Běijīng.|Er reist morgen nach Peking.
事故|shìgù|Unfall|n|B1|路上发生了一起事故。|Lùshang fāshēng le yì qǐ shìgù.|Auf der Straße ist ein Unfall passiert.
手续|shǒuxù|Formalitäten|n|B1|我要办入住手续。|Wǒ yào bàn rùzhù shǒuxù.|Ich möchte einchecken.
首都|shǒudū|Hauptstadt|n|B1|北京是中国的首都。|Běijīng shì Zhōngguó de shǒudū.|Peking ist die Hauptstadt Chinas.
速度|sùdù|Geschwindigkeit|n|B1|你开车的速度太快了。|Nǐ kāichē de sùdù tài kuài le.|Du fährst zu schnell.
铁路|tiělù|Eisenbahn; Bahnstrecke|n|B1|这条铁路很长。|Zhè tiáo tiělù hěn cháng.|Diese Bahnstrecke ist sehr lang.
运输|yùnshū|transportieren; Transport|v|B1|这些水果用飞机运输。|Zhèxiē shuǐguǒ yòng fēijī yùnshū.|Dieses Obst wird per Flugzeug transportiert.
证件|zhèngjiàn|Ausweis; Papiere|n|B1|请拿出您的证件。|Qǐng náchū nín de zhèngjiàn.|Bitte zeigen Sie Ihren Ausweis.
乘坐|chéngzuò|fahren mit; nehmen (Verkehrsmittel)|v|B1|我们乘坐地铁去机场。|Wǒmen chéngzuò dìtiě qù jīchǎng.|Wir fahren mit der U-Bahn zum Flughafen.
亚洲|Yàzhōu|Asien|n|B1|中国在亚洲。|Zhōngguó zài Yàzhōu.|China liegt in Asien.
导游|dǎoyóu|Reiseleiter/in|n|B1|我们的导游会说德语。|Wǒmen de dǎoyóu huì shuō Déyǔ.|Unsere Reiseleiterin spricht Deutsch.
登机牌|dēngjīpái|Bordkarte|n|B1|请给我看一下登机牌。|Qǐng gěi wǒ kàn yíxià dēngjīpái.|Zeigen Sie mir bitte Ihre Bordkarte.
航班|hángbān|Flug|n|B1|我的航班晚点了。|Wǒ de hángbān wǎndiǎn le.|Mein Flug hat Verspätung.
长江|Chángjiāng|Jangtse|n|B1|长江是中国最长的河。|Chángjiāng shì Zhōngguó zuì cháng de hé.|Der Jangtse ist der längste Fluss Chinas.
降落|jiàngluò|landen|v|B1|飞机马上要降落了。|Fēijī mǎshàng yào jiàngluò le.|Das Flugzeug landet gleich.
`,

  directions: `
北|běi|Norden|n|A1|往北走就到了。|Wǎng běi zǒu jiù dào le.|Geh nach Norden, dann bist du gleich da.
北边|běibian|Nordseite; nördlich|n|A1|学校在北边。|Xuéxiào zài běibian.|Die Schule liegt im Norden.
地点|dìdiǎn|Ort; Treffpunkt|n|A1|见面的地点在哪儿？|Jiànmiàn de dìdiǎn zài nǎr?|Wo ist der Treffpunkt?
地上|dìshang|auf dem Boden|n|A1|地上有一本书。|Dìshang yǒu yì běn shū.|Auf dem Boden liegt ein Buch.
电影院|diànyǐngyuàn|Kino|n|A1|电影院在商店旁边。|Diànyǐngyuàn zài shāngdiàn pángbiān.|Das Kino ist neben dem Geschäft.
东|dōng|Osten|n|A1|往东走五分钟。|Wǎng dōng zǒu wǔ fēnzhōng.|Geh fünf Minuten nach Osten.
东边|dōngbian|Ostseite; östlich|n|A1|车站在东边。|Chēzhàn zài dōngbian.|Die Haltestelle liegt im Osten.
后|hòu|hinten; nach; später|n|A1|三天后我回来。|Sān tiān hòu wǒ huílai.|In drei Tagen komme ich zurück.
后边|hòubian|hinten; Rückseite|n|A1|我家后边有公园。|Wǒ jiā hòubian yǒu gōngyuán.|Hinter meinem Haus ist ein Park.
里|lǐ|in; innen|n|A1|包里有什么？|Bāo li yǒu shénme?|Was ist in der Tasche?
里边|lǐbian|innen; drinnen|n|A1|里边很暖和。|Lǐbian hěn nuǎnhuo.|Drinnen ist es schön warm.
楼上|lóushàng|oben (im Haus)|n|A1|我住在楼上。|Wǒ zhù zài lóushàng.|Ich wohne oben.
楼下|lóuxià|unten (im Haus)|n|A1|我在楼下等你。|Wǒ zài lóuxià děng nǐ.|Ich warte unten auf dich.
马路|mǎlù|Straße|n|A1|过马路要小心。|Guò mǎlù yào xiǎoxīn.|Beim Überqueren der Straße muss man aufpassen.
那边|nàbiān|dort drüben|pron|A1|洗手间在那边。|Xǐshǒujiān zài nàbiān.|Die Toilette ist dort drüben.
那里|nàli|dort|pron|A1|那里的东西很便宜。|Nàli de dōngxi hěn piányi.|Dort sind die Sachen sehr günstig.
南|nán|Süden|n|A1|一直往南走。|Yìzhí wǎng nán zǒu.|Geh immer geradeaus nach Süden.
南边|nánbian|Südseite; südlich|n|A1|公园在学校南边。|Gōngyuán zài xuéxiào nánbian.|Der Park liegt südlich der Schule.
前|qián|vorn; vor|n|A1|请往前走。|Qǐng wǎng qián zǒu.|Bitte gehen Sie nach vorn.
前边|qiánbian|vorn; Vorderseite|n|A1|前边有一家银行。|Qiánbian yǒu yì jiā yínháng.|Da vorn ist eine Bank.
上|shàng|auf; oben; letzte(r)|n|A1|手机在桌子上。|Shǒujī zài zhuōzi shang.|Das Handy liegt auf dem Tisch.
上边|shàngbian|oben; Oberseite|n|A1|上边那本书是我的。|Shàngbian nà běn shū shì wǒ de.|Das Buch da oben ist meins.
外|wài|außen; draußen|n|A1|门外有人。|Mén wài yǒu rén.|Vor der Tür ist jemand.
外边|wàibian|draußen|n|A1|外边下雨了。|Wàibian xià yǔ le.|Draußen regnet es.
西|xī|Westen|n|A1|往西走就是车站。|Wǎng xī zǒu jiù shì chēzhàn.|Wenn du nach Westen gehst, kommst du zur Haltestelle.
西边|xībian|Westseite; westlich|n|A1|我家在学校西边。|Wǒ jiā zài xuéxiào xībian.|Ich wohne westlich der Schule.
下|xià|unter; unten; nächste(r)|n|A1|下个星期我去北京。|Xià ge xīngqī wǒ qù Běijīng.|Nächste Woche fahre ich nach Peking.
下边|xiàbian|unten; Unterseite|n|A1|请看下边的图。|Qǐng kàn xiàbian de tú.|Schau dir bitte das Bild unten an.
右|yòu|rechts|n|A1|到路口往右拐。|Dào lùkǒu wǎng yòu guǎi.|An der Kreuzung rechts abbiegen.
这边|zhèbiān|hier; diese Seite|pron|A1|请到这边来。|Qǐng dào zhèbiān lái.|Kommen Sie bitte hier herüber.
这里|zhèli|hier|pron|A1|这里可以拍照吗？|Zhèli kěyǐ pāizhào ma?|Darf man hier fotografieren?
中|zhōng|Mitte; in; unter|n|A1|他是三个人中最高的。|Tā shì sān gè rén zhōng zuì gāo de.|Er ist der Größte von den dreien.
左|zuǒ|links|n|A1|到路口往左拐。|Dào lùkǒu wǎng zuǒ guǎi.|An der Kreuzung links abbiegen.
北方|běifāng|Norden; Nordchina|n|A2|北方的冬天很冷。|Běifāng de dōngtiān hěn lěng.|Im Norden ist der Winter sehr kalt.
边|biān|Seite; Rand|n|A2|路的两边都是树。|Lù de liǎng biān dōu shì shù.|Auf beiden Seiten der Straße stehen Bäume.
出口|chūkǒu|Ausgang|n|A2|出口在哪儿?|Chūkǒu zài nǎr?|Wo ist der Ausgang?
大门|dàmén|Haupteingang; Tor|n|A2|我在学校大门等你。|Wǒ zài xuéxiào dàmén děng nǐ.|Ich warte am Schultor auf dich.
到处|dàochù|überall|adv|A2|街上到处都是人。|Jiē shang dàochù dōu shì rén.|Auf der Straße sind überall Menschen.
道路|dàolù|Straße; Weg|n|A2|这条道路很宽。|Zhè tiáo dàolù hěn kuān.|Diese Straße ist sehr breit.
地铁站|dìtiězhàn|U-Bahn-Station|n|A2|地铁站离这儿不远。|Dìtiězhàn lí zhèr bù yuǎn.|Die U-Bahn-Station ist nicht weit von hier.
东北|dōngběi|Nordosten|n|A2|他是东北人。|Tā shì Dōngběi rén.|Er kommt aus Nordostchina.
东方|dōngfāng|Osten; Orient|n|A2|太阳从东方升起。|Tàiyáng cóng dōngfāng shēngqǐ.|Die Sonne geht im Osten auf.
东南|dōngnán|Südosten|n|A2|学校在城市的东南。|Xuéxiào zài chéngshì de dōngnán.|Die Schule liegt im Südosten der Stadt.
方向|fāngxiàng|Richtung|n|A2|我们走错方向了。|Wǒmen zǒucuò fāngxiàng le.|Wir sind in die falsche Richtung gegangen.
广场|guǎngchǎng|Platz (in der Stadt)|n|A2|广场上有很多人。|Guǎngchǎng shang yǒu hěn duō rén.|Auf dem Platz sind viele Menschen.
街|jiē|Straße|n|A2|这条街很热闹。|Zhè tiáo jiē hěn rènao.|In dieser Straße ist viel los.
里头|lǐtou|drinnen; innen|n|A2|包里头有什么?|Bāo lǐtou yǒu shénme?|Was ist in der Tasche drin?
路边|lùbiān|Straßenrand|n|A2|车停在路边。|Chē tíng zài lùbiān.|Das Auto steht am Straßenrand.
面前|miànqián|vor (jemandem); vor sich|n|A2|他站在我面前。|Tā zhàn zài wǒ miànqián.|Er steht vor mir.
南方|nánfāng|Süden; Südchina|n|A2|他是南方人。|Tā shì nánfāng rén.|Er kommt aus dem Süden.
入口|rùkǒu|Eingang|n|A2|请问，入口在哪儿？|Qǐngwèn, rùkǒu zài nǎr?|Entschuldigung, wo ist der Eingang?
身边|shēnbiān|an der Seite; bei sich|n|A2|朋友都在我身边。|Péngyou dōu zài wǒ shēnbiān.|Meine Freunde sind alle an meiner Seite.
市|shì|Stadt|n|A2|北京市很大。|Běijīng Shì hěn dà.|Die Stadt Peking ist sehr groß.
停车场|tíngchēchǎng|Parkplatz|n|A2|停车场在后面。|Tíngchēchǎng zài hòumiàn.|Der Parkplatz ist hinten.
问路|wènlù|nach dem Weg fragen|v|A2|我找人问路。|Wǒ zhǎo rén wènlù.|Ich frage jemanden nach dem Weg.
西北|xīběi|Nordwesten|n|A2|他家在中国西北。|Tā jiā zài Zhōngguó xīběi.|Seine Familie lebt im Nordwesten Chinas.
西方|xīfāng|Westen; der Westen|n|A2|他喜欢西方音乐。|Tā xǐhuan xīfāng yīnyuè.|Er mag westliche Musik.
西南|xīnán|Südwesten|n|A2|学校在城市的西南。|Xuéxiào zài chéngshì de xīnán.|Die Schule liegt im Südwesten der Stadt.
院|yuàn|Hof; Institut|n|A2|院里有一棵树。|Yuàn lǐ yǒu yì kē shù.|Im Hof steht ein Baum.
中心|zhōngxīn|Zentrum|n|A2|我住在市中心。|Wǒ zhù zài shì zhōngxīn.|Ich wohne im Stadtzentrum.
电梯|diàntī|Aufzug|n|A2|我们坐电梯上去吧。|Wǒmen zuò diàntī shàngqù ba.|Lass uns mit dem Aufzug hochfahren.
街道|jiēdào|Straße|n|A2|这条街道很干净。|Zhè tiáo jiēdào hěn gānjìng.|Diese Straße ist sehr sauber.
北部|běibù|Norden; nördlicher Teil|n|B1|他住在中国北部。|Tā zhù zài Zhōngguó běibù.|Er wohnt im Norden Chinas.
背后|bèihòu|hinter; hinter dem Rücken|n|B1|他站在我背后。|Tā zhàn zài wǒ bèihòu.|Er steht hinter mir.
场所|chǎngsuǒ|Ort; Stätte|n|B1|公共场所不能吸烟。|Gōnggòng chǎngsuǒ bù néng xīyān.|An öffentlichen Orten darf man nicht rauchen.
朝|cháo|in Richtung; nach|prep|B1|请朝前走。|Qǐng cháo qián zǒu.|Bitte gehen Sie geradeaus.
城|chéng|Stadt|n|B1|我明天进城买东西。|Wǒ míngtiān jìn chéng mǎi dōngxi.|Ich fahre morgen zum Einkaufen in die Stadt.
村|cūn|Dorf|n|B1|我们村有一条小河。|Wǒmen cūn yǒu yì tiáo xiǎo hé.|In unserem Dorf gibt es einen kleinen Fluss.
当中|dāngzhōng|unter; mitten in|n|B1|我们当中他最高。|Wǒmen dāngzhōng tā zuì gāo.|Unter uns ist er der Größte.
底下|dǐxia|unter; unten|n|B1|猫在桌子底下。|Māo zài zhuōzi dǐxia.|Die Katze ist unter dem Tisch.
东部|dōngbù|Osten; östlicher Teil|n|B1|上海在中国东部。|Shànghǎi zài Zhōngguó dōngbù.|Shanghai liegt im Osten Chinas.
环|huán|Ring|n|B1|我家在三环附近。|Wǒ jiā zài Sānhuán fùjìn.|Ich wohne in der Nähe des dritten Rings.
剧场|jùchǎng|Theater (Gebäude)|n|B1|剧场就在前面。|Jùchǎng jiù zài qiánmiàn.|Das Theater ist gleich da vorne.
南部|nánbù|Süden; südlicher Teil|n|B1|他住在中国南部。|Tā zhù zài Zhōngguó nánbù.|Er wohnt im Süden Chinas.
内|nèi|innen; innerhalb|n|B1|请在三天内回复。|Qǐng zài sān tiān nèi huífù.|Bitte antworten Sie innerhalb von drei Tagen.
桥|qiáo|Brücke|n|B1|过了桥就到了。|Guò le qiáo jiù dào le.|Hinter der Brücke sind wir schon da.
区|qū|Bezirk; Gebiet|n|B1|你住在哪个区？|Nǐ zhù zài nǎge qū?|In welchem Bezirk wohnst du?
室|shì|Raum; Zimmer|n|B1|王医生在三室。|Wáng yīshēng zài sān shì.|Doktor Wang ist in Raum 3.
西部|xībù|Westen; Westteil|n|B1|他住在中国西部。|Tā zhù zài Zhōngguó xībù.|Er wohnt in Westchina.
眼前|yǎnqián|vor Augen; im Moment|n|B1|大海就在眼前。|Dàhǎi jiù zài yǎnqián.|Das Meer liegt direkt vor uns.
中部|zhōngbù|Mitte; mittlerer Teil|n|B1|这个城市在中国中部。|Zhège chéngshì zài Zhōngguó zhōngbù.|Diese Stadt liegt in Zentralchina.
周围|zhōuwéi|Umgebung; ringsum|n|B1|学校周围有很多饭馆。|Xuéxiào zhōuwéi yǒu hěn duō fànguǎn.|Rund um die Schule gibt es viele Restaurants.
转|zhuǎn|abbiegen; sich wenden|v|B1|到路口往右转。|Dào lùkǒu wǎng yòu zhuǎn.|An der Kreuzung rechts abbiegen.
加油站|jiāyóuzhàn|Tankstelle|n|B1|前面有一个加油站。|Qiánmiàn yǒu yí gè jiāyóuzhàn.|Da vorne ist eine Tankstelle.
厕所|cèsuǒ|Toilette|n|B1|请问，厕所在哪儿？|Qǐngwèn, cèsuǒ zài nǎr?|Entschuldigung, wo ist die Toilette?
地址|dìzhǐ|Adresse|n|B1|请告诉我你的地址。|Qǐng gàosu wǒ nǐ de dìzhǐ.|Sag mir bitte deine Adresse.
距离|jùlí|Entfernung; Abstand|n|B1|两个城市的距离不远。|Liǎng gè chéngshì de jùlí bù yuǎn.|Die Entfernung zwischen den beiden Städten ist nicht groß.
邮局|yóujú|Postamt|n|B1|邮局在银行旁边。|Yóujú zài yínháng pángbiān.|Die Post ist neben der Bank.
郊区|jiāoqū|Vorort; Stadtrand|n|B1|他们住在郊区。|Tāmen zhù zài jiāoqū.|Sie wohnen am Stadtrand.
`,

  home: `
杯子|bēizi|Becher; Glas; Tasse|n|A1|这个杯子是我的。|Zhège bēizi shì wǒ de.|Dieser Becher gehört mir.
地|dì|Boden; Erde|n|A1|地很干净。|Dì hěn gānjìng.|Der Boden ist sehr sauber.
电|diàn|Strom; Elektrizität|n|A1|家里没电了。|Jiāli méi diàn le.|Zu Hause ist der Strom ausgefallen.
家里|jiāli|zu Hause; in der Familie|n|A1|我家里有四口人。|Wǒ jiāli yǒu sì kǒu rén.|Bei mir zu Hause sind wir zu viert.
在家|zàijiā|zu Hause sein|v|A1|我今天在家休息。|Wǒ jīntiān zàijiā xiūxi.|Ich ruhe mich heute zu Hause aus.
出租|chūzū|vermieten|v|A2|这个房子出租吗?|Zhège fángzi chūzū ma?|Wird diese Wohnung vermietet?
大衣|dàyī|Mantel|n|A2|外面冷,穿上大衣吧。|Wàimiàn lěng, chuānshang dàyī ba.|Draußen ist es kalt, zieh den Mantel an.
花园|huāyuán|Garten|n|A2|我家后面有个花园。|Wǒ jiā hòumiàn yǒu gè huāyuán.|Hinter unserem Haus ist ein Garten.
瓶子|píngzi|Flasche|n|A2|瓶子里没有水了。|Píngzi li méiyǒu shuǐ le.|In der Flasche ist kein Wasser mehr.
墙|qiáng|Wand; Mauer|n|A2|墙上有一张画。|Qiáng shang yǒu yì zhāng huà.|An der Wand hängt ein Bild.
球鞋|qiúxié|Turnschuhe; Sportschuhe|n|A2|我买了一双球鞋。|Wǒ mǎi le yì shuāng qiúxié.|Ich habe ein Paar Turnschuhe gekauft.
手表|shǒubiǎo|Armbanduhr|n|A2|我的手表坏了。|Wǒ de shǒubiǎo huài le.|Meine Armbanduhr ist kaputt.
洗衣机|xǐyījī|Waschmaschine|n|A2|我家的洗衣机坏了。|Wǒ jiā de xǐyījī huài le.|Unsere Waschmaschine ist kaputt.
院子|yuànzi|Hof|n|A2|院子里有很多花。|Yuànzi lǐ yǒu hěn duō huā.|Im Hof gibt es viele Blumen.
住房|zhùfáng|Wohnung; Wohnraum|n|A2|这里的住房很贵。|Zhèlǐ de zhùfáng hěn guì.|Wohnraum ist hier sehr teuer.
帽子|màozi|Mütze; Hut|n|A2|你的帽子真好看。|Nǐ de màozi zhēn hǎokàn.|Deine Mütze ist wirklich schön.
皮鞋|píxié|Lederschuhe|n|A2|这双皮鞋多少钱？|Zhè shuāng píxié duōshao qián?|Wie viel kosten diese Lederschuhe?
搬|bān|tragen; umziehen|v|B1|请帮我搬一下桌子。|Qǐng bāng wǒ bān yíxià zhuōzi.|Hilf mir bitte kurz, den Tisch zu tragen.
板|bǎn|Brett; Platte|n|B1|这块木板很重。|Zhè kuài mùbǎn hěn zhòng.|Dieses Holzbrett ist sehr schwer.
被子|bèizi|Bettdecke|n|B1|这条被子很暖和。|Zhè tiáo bèizi hěn nuǎnhuo.|Diese Bettdecke ist sehr warm.
布|bù|Stoff; Tuch|n|B1|这块布很漂亮。|Zhè kuài bù hěn piàoliang.|Dieser Stoff ist sehr schön.
衬衫|chènshān|Hemd|n|B1|这件衬衫多少钱？|Zhè jiàn chènshān duōshao qián?|Wie viel kostet dieses Hemd?
衬衣|chènyī|Hemd|n|B1|他穿着一件白衬衣。|Tā chuānzhe yí jiàn bái chènyī.|Er trägt ein weißes Hemd.
刀|dāo|Messer|n|B1|这把刀很快。|Zhè bǎ dāo hěn kuài.|Dieses Messer ist sehr scharf.
短裤|duǎnkù|kurze Hose; Shorts|n|B1|夏天我常穿短裤。|Xiàtiān wǒ cháng chuān duǎnkù.|Im Sommer trage ich oft kurze Hosen.
房东|fángdōng|Vermieter/in|n|B1|我的房东人很好。|Wǒ de fángdōng rén hěn hǎo.|Mein Vermieter ist sehr nett.
房屋|fángwū|Haus; Gebäude|n|B1|这里的房屋很旧。|Zhèlǐ de fángwū hěn jiù.|Die Häuser hier sind sehr alt.
房租|fángzū|Miete|n|B1|这里的房租很贵。|Zhèlǐ de fángzū hěn guì.|Die Miete hier ist sehr hoch.
服装|fúzhuāng|Kleidung|n|B1|这家店卖服装。|Zhè jiā diàn mài fúzhuāng.|Dieser Laden verkauft Kleidung.
挂|guà|aufhängen|v|B1|把衣服挂在这儿。|Bǎ yīfu guà zài zhèr.|Häng die Kleidung hier auf.
家具|jiājù|Möbel|n|B1|我想买新家具。|Wǒ xiǎng mǎi xīn jiājù.|Ich möchte neue Möbel kaufen.
理发|lǐfà|Haare schneiden (lassen)|v|B1|我下午去理发。|Wǒ xiàwǔ qù lǐfà.|Ich gehe heute Nachmittag zum Friseur.
面积|miànjī|Fläche|n|B1|这个房间面积不大。|Zhège fángjiān miànjī bú dà.|Die Fläche dieses Zimmers ist nicht groß.
木头|mùtou|Holz|n|B1|这张桌子是木头做的。|Zhè zhāng zhuōzi shì mùtou zuò de.|Dieser Tisch ist aus Holz.
皮包|píbāo|Ledertasche|n|B1|我的皮包不见了。|Wǒ de píbāo bú jiàn le.|Meine Ledertasche ist verschwunden.
裙子|qúnzi|Rock; Kleid|n|B1|这条裙子真好看。|Zhè tiáo qúnzi zhēn hǎokàn.|Dieser Rock ist wirklich hübsch.
沙发|shāfā|Sofa|n|B1|猫在沙发上睡觉。|Māo zài shāfā shàng shuìjiào.|Die Katze schläft auf dem Sofa.
上衣|shàngyī|Oberteil; Jacke|n|B1|这件上衣多少钱？|Zhè jiàn shàngyī duōshao qián?|Wie viel kostet dieses Oberteil?
书架|shūjià|Bücherregal|n|B1|书架上有很多书。|Shūjià shàng yǒu hěn duō shū.|Im Bücherregal stehen viele Bücher.
卫生间|wèishēngjiān|Toilette; Bad|n|B1|请问，卫生间在哪儿？|Qǐngwèn, wèishēngjiān zài nǎr?|Entschuldigung, wo ist die Toilette?
屋子|wūzi|Zimmer; Haus|n|B1|屋子里很暖和。|Wūzi li hěn nuǎnhuo.|Im Zimmer ist es schön warm.
线|xiàn|Faden; Linie|n|B1|请在这儿画一条线。|Qǐng zài zhèr huà yì tiáo xiàn.|Bitte zieh hier eine Linie.
衣架|yījià|Kleiderbügel|n|B1|把衣服挂在衣架上。|Bǎ yīfu guà zài yījià shang.|Häng die Kleidung auf den Kleiderbügel.
整理|zhěnglǐ|aufräumen; ordnen|v|B1|我在整理房间。|Wǒ zài zhěnglǐ fángjiān.|Ich räume gerade das Zimmer auf.
修理|xiūlǐ|reparieren|v|B1|他会修理自行车。|Tā huì xiūlǐ zìxíngchē.|Er kann Fahrräder reparieren.
垃圾桶|lājītǒng|Mülleimer|n|B1|垃圾桶在门后面。|Lājītǒng zài mén hòumiàn.|Der Mülleimer steht hinter der Tür.
客厅|kètīng|Wohnzimmer|n|B1|他们在客厅看电视。|Tāmen zài kètīng kàn diànshì.|Sie sehen im Wohnzimmer fern.
打扮|dǎban|sich zurechtmachen|v|B1|她今天打扮得很漂亮。|Tā jīntiān dǎban de hěn piàoliang.|Sie hat sich heute sehr hübsch gemacht.
擦|cā|wischen; abwischen|v|B1|我把桌子擦干净了。|Wǒ bǎ zhuōzi cā gānjìng le.|Ich habe den Tisch sauber gewischt.
毛巾|máojīn|Handtuch|n|B1|这条毛巾是新的。|Zhè tiáo máojīn shì xīn de.|Dieses Handtuch ist neu.
牙膏|yágāo|Zahnpasta|n|B1|牙膏用完了。|Yágāo yòng wán le.|Die Zahnpasta ist alle.
盒子|hézi|Schachtel; Kästchen|n|B1|盒子里有什么？|Hézi li yǒu shénme?|Was ist in der Schachtel?
眼镜|yǎnjìng|Brille|n|B1|我找不到我的眼镜了。|Wǒ zhǎo bu dào wǒ de yǎnjìng le.|Ich kann meine Brille nicht mehr finden.
窗户|chuānghu|Fenster|n|B1|请把窗户打开。|Qǐng bǎ chuānghu dǎkāi.|Mach bitte das Fenster auf.
脱|tuō|ausziehen|v|B1|进门请脱鞋。|Jìn mén qǐng tuō xié.|Bitte beim Hereinkommen die Schuhe ausziehen.
袜子|wàzi|Socke; Strumpf|n|B1|我要买两双袜子。|Wǒ yào mǎi liǎng shuāng wàzi.|Ich möchte zwei Paar Socken kaufen.
镜子|jìngzi|Spiegel|n|B1|她在照镜子。|Tā zài zhào jìngzi.|Sie schaut in den Spiegel.
`,

  work: `
办|bàn|erledigen; machen|v|A2|这件事怎么办？|Zhè jiàn shì zěnme bàn?|Was machen wir in dieser Sache?
表|biǎo|Formular; Tabelle; Armbanduhr|n|A2|请填一下这张表。|Qǐng tián yíxià zhè zhāng biǎo.|Bitte füllen Sie dieses Formular aus.
打工|dǎgōng|jobben|v|A2|他周末在饭馆打工。|Tā zhōumò zài fànguǎn dǎgōng.|Er jobbt am Wochenende in einem Restaurant.
打印|dǎyìn|ausdrucken|v|A2|请帮我打印一下。|Qǐng bāng wǒ dǎyìn yíxià.|Bitte druck das kurz für mich aus.
单位|dānwèi|Arbeitsstelle; Einheit|n|A2|你在哪个单位工作?|Nǐ zài nǎge dānwèi gōngzuò?|Bei welcher Stelle arbeitest du?
当|dāng|arbeiten als; werden|v|A2|他想当老师。|Tā xiǎng dāng lǎoshī.|Er möchte Lehrer werden.
服务|fúwù|Service; bedienen|n|A2|这家饭馆的服务很好。|Zhè jiā fànguǎn de fúwù hěn hǎo.|Der Service in diesem Restaurant ist sehr gut.
干活儿|gànhuór|arbeiten (körperlich)|v|A2|他每天都去干活儿。|Tā měi tiān dōu qù gànhuór.|Er geht jeden Tag arbeiten.
经理|jīnglǐ|Manager/in; Geschäftsführer/in|n|A2|经理正在开会。|Jīnglǐ zhèngzài kāihuì.|Der Manager ist gerade in einer Besprechung.
名单|míngdān|Namensliste|n|A2|名单上没有我的名字。|Míngdān shang méiyǒu wǒ de míngzi.|Mein Name steht nicht auf der Liste.
实习|shíxí|Praktikum machen|v|A2|我在一家公司实习。|Wǒ zài yì jiā gōngsī shíxí.|Ich mache ein Praktikum in einer Firma.
事情|shìqing|Angelegenheit; Sache|n|A2|我有很多事情要做。|Wǒ yǒu hěn duō shìqing yào zuò.|Ich habe viel zu erledigen.
收入|shōurù|Einkommen|n|A2|他的收入很高。|Tā de shōurù hěn gāo.|Sein Einkommen ist sehr hoch.
提出|tíchū|vorbringen; äußern|v|A2|他提出了一个问题。|Tā tíchū le yí gè wèntí.|Er hat eine Frage aufgeworfen.
休假|xiūjià|Urlaub haben; Urlaub nehmen|v|A2|我下周休假。|Wǒ xiàzhōu xiūjià.|Ich habe nächste Woche Urlaub.
要求|yāoqiú|Anforderung; verlangen|n|A2|老师的要求很高。|Lǎoshī de yāoqiú hěn gāo.|Die Anforderungen des Lehrers sind hoch.
院长|yuànzhǎng|Direktor/in (Klinik, Institut)|n|A2|院长今天不在。|Yuànzhǎng jīntiān bú zài.|Der Direktor ist heute nicht da.
组|zǔ|Gruppe|n|A2|我们在同一个组。|Wǒmen zài tóng yí gè zǔ.|Wir sind in derselben Gruppe.
组长|zǔzhǎng|Gruppenleiter/in|n|A2|他是我们的组长。|Tā shì wǒmen de zǔzhǎng.|Er ist unser Gruppenleiter.
办理|bànlǐ|erledigen; abwickeln|v|B1|我要办理入住手续。|Wǒ yào bànlǐ rùzhù shǒuxù.|Ich möchte einchecken.
报到|bàodào|sich anmelden (bei Ankunft)|v|B1|新生明天到学校报到。|Xīnshēng míngtiān dào xuéxiào bàodào.|Die neuen Schüler melden sich morgen in der Schule an.
报告|bàogào|Bericht; Vortrag|n|B1|我在写一份报告。|Wǒ zài xiě yí fèn bàogào.|Ich schreibe gerade einen Bericht.
表格|biǎogé|Formular; Tabelle|n|B1|请填一下这张表格。|Qǐng tián yíxià zhè zhāng biǎogé.|Bitte füllen Sie dieses Formular aus.
表现|biǎoxiàn|sich zeigen; Leistung; Verhalten|v|B1|他今天表现得很好。|Tā jīntiān biǎoxiàn de hěn hǎo.|Er hat sich heute sehr gut geschlagen.
部门|bùmén|Abteilung|n|B1|你在哪个部门工作？|Nǐ zài nǎge bùmén gōngzuò?|In welcher Abteilung arbeitest du?
采用|cǎiyòng|anwenden; einsetzen|v|B1|公司采用了新方法。|Gōngsī cǎiyòngle xīn fāngfǎ.|Die Firma hat eine neue Methode eingeführt.
厂|chǎng|Fabrik|n|B1|他在厂里工作。|Tā zài chǎng lǐ gōngzuò.|Er arbeitet in der Fabrik.
成果|chéngguǒ|Ergebnis; Errungenschaft|n|B1|这是我们的工作成果。|Zhè shì wǒmen de gōngzuò chéngguǒ.|Das ist das Ergebnis unserer Arbeit.
成立|chénglì|gründen|v|B1|公司是去年成立的。|Gōngsī shì qùnián chénglì de.|Die Firma wurde letztes Jahr gegründet.
处理|chǔlǐ|erledigen; regeln; behandeln|v|B1|这件事我来处理。|Zhè jiàn shì wǒ lái chǔlǐ.|Um diese Sache kümmere ich mich.
创业|chuàngyè|ein Unternehmen gründen|v|B1|他想自己创业。|Tā xiǎng zìjǐ chuàngyè.|Er möchte sich selbstständig machen.
从事|cóngshì|tätig sein in; ausüben|v|B1|他从事教育工作。|Tā cóngshì jiàoyù gōngzuò.|Er ist im Bildungsbereich tätig.
代表|dàibiǎo|Vertreter/in; vertreten|n|B1|他是我们公司的代表。|Tā shì wǒmen gōngsī de dàibiǎo.|Er ist der Vertreter unserer Firma.
带领|dàilǐng|führen; anführen|v|B1|老师带领我们参观学校。|Lǎoshī dàilǐng wǒmen cānguān xuéxiào.|Der Lehrer führte uns durch die Schule.
发言|fāyán|das Wort ergreifen; Redebeitrag|v|B1|会上他第一个发言。|Huì shang tā dì yī gè fāyán.|In der Sitzung sprach er als Erster.
分配|fēnpèi|verteilen; zuteilen|v|B1|老师给我们分配了任务。|Lǎoshī gěi wǒmen fēnpèi le rènwu.|Der Lehrer hat uns Aufgaben zugeteilt.
负责|fùzé|verantwortlich sein|v|B1|这件事由我负责。|Zhè jiàn shì yóu wǒ fùzé.|Für diese Sache bin ich verantwortlich.
复印|fùyìn|kopieren|v|B1|请帮我复印一下。|Qǐng bāng wǒ fùyìn yíxià.|Bitte kopiere das kurz für mich.
改进|gǎijìn|verbessern|v|B1|我们要改进工作方法。|Wǒmen yào gǎijìn gōngzuò fāngfǎ.|Wir müssen unsere Arbeitsweise verbessern.
工厂|gōngchǎng|Fabrik|n|B1|他在工厂上班。|Tā zài gōngchǎng shàngbān.|Er arbeitet in einer Fabrik.
工具|gōngjù|Werkzeug|n|B1|修车需要工具。|Xiū chē xūyào gōngjù.|Zum Autoreparieren braucht man Werkzeug.
工资|gōngzī|Gehalt; Lohn|n|B1|他的工资不高。|Tā de gōngzī bù gāo.|Sein Gehalt ist nicht hoch.
管理|guǎnlǐ|verwalten; leiten|v|B1|他管理一家公司。|Tā guǎnlǐ yì jiā gōngsī.|Er leitet eine Firma.
会议|huìyì|Besprechung; Konferenz|n|B1|会议九点开始。|Huìyì jiǔ diǎn kāishǐ.|Die Besprechung beginnt um neun Uhr.
记录|jìlù|aufzeichnen; Protokoll|v|B1|请把时间记录下来。|Qǐng bǎ shíjiān jìlù xiàlái.|Bitte notiere die Zeit.
加工|jiāgōng|verarbeiten|v|B1|这家工厂加工食品。|Zhè jiā gōngchǎng jiāgōng shípǐn.|Diese Fabrik verarbeitet Lebensmittel.
接待|jiēdài|empfangen (Gäste)|v|B1|她负责接待客人。|Tā fùzé jiēdài kèrén.|Sie ist für den Empfang der Gäste zuständig.
进展|jìnzhǎn|Fortschritt; Vorankommen|n|B1|工作进展很顺利。|Gōngzuò jìnzhǎn hěn shùnlì.|Die Arbeit kommt gut voran.
经营|jīngyíng|betreiben; führen (Geschäft)|v|B1|他经营一家饭店。|Tā jīngyíng yì jiā fàndiàn.|Er betreibt ein Restaurant.
就业|jiùyè|Arbeit finden; Beschäftigung|v|B1|现在就业不太容易。|Xiànzài jiùyè bú tài róngyì.|Es ist derzeit nicht so leicht, Arbeit zu finden.
领导|lǐngdǎo|Chef/in; Leitung; leiten|n|B1|领导今天不在公司。|Lǐngdǎo jīntiān bú zài gōngsī.|Der Chef ist heute nicht in der Firma.
能力|nénglì|Fähigkeit|n|B1|他的工作能力很强。|Tā de gōngzuò nénglì hěn qiáng.|Er ist in seiner Arbeit sehr fähig.
派|pài|schicken; entsenden|v|B1|公司派我去上海。|Gōngsī pài wǒ qù Shànghǎi.|Die Firma schickt mich nach Shanghai.
配合|pèihé|zusammenarbeiten; mitwirken|v|B1|谢谢你的配合。|Xièxie nǐ de pèihé.|Danke für deine Mitarbeit.
批准|pīzhǔn|genehmigen|v|B1|老板批准了我的假期。|Lǎobǎn pīzhǔn le wǒ de jiàqī.|Der Chef hat meinen Urlaub genehmigt.
确保|quèbǎo|sicherstellen|v|B1|请确保门已经关好。|Qǐng quèbǎo mén yǐjīng guān hǎo.|Bitte stell sicher, dass die Tür zu ist.
人才|réncái|Talent; Fachkraft|n|B1|公司需要更多人才。|Gōngsī xūyào gèng duō réncái.|Die Firma braucht mehr Fachkräfte.
人员|rényuán|Personal; Mitarbeiter|n|B1|工作人员很热情。|Gōngzuò rényuán hěn rèqíng.|Das Personal ist sehr freundlich.
认可|rènkě|anerkennen; billigen|v|B1|老板认可了我的计划。|Lǎobǎn rènkě le wǒ de jìhuà.|Der Chef hat meinen Plan gebilligt.
任|rèn|(ein Amt) bekleiden; ernennen|v|B1|他在这家公司任经理。|Tā zài zhè jiā gōngsī rèn jīnglǐ.|Er ist in dieser Firma als Manager tätig.
任务|rènwu|Aufgabe|n|B1|今天的任务完成了。|Jīntiān de rènwu wánchéng le.|Die heutige Aufgabe ist erledigt.
设计|shèjì|entwerfen; Design|v|B1|这是他设计的房子。|Zhè shì tā shèjì de fángzi.|Das ist das Haus, das er entworfen hat.
设立|shèlì|einrichten; gründen|v|B1|公司在上海设立了办公室。|Gōngsī zài Shànghǎi shèlì le bàngōngshì.|Die Firma hat in Shanghai ein Büro eingerichtet.
生产|shēngchǎn|herstellen; produzieren|v|B1|这家工厂生产汽车。|Zhè jiā gōngchǎng shēngchǎn qìchē.|Diese Fabrik stellt Autos her.
生意|shēngyi|Geschäft; Handel|n|B1|他的生意很好。|Tā de shēngyi hěn hǎo.|Sein Geschäft läuft sehr gut.
事业|shìyè|Karriere; Lebenswerk|n|B1|他的事业很成功。|Tā de shìyè hěn chénggōng.|Seine Karriere ist sehr erfolgreich.
所长|suǒzhǎng|Institutsleiter/in|n|B1|王所长今天不在办公室。|Wáng suǒzhǎng jīntiān bú zài bàngōngshì.|Institutsleiter Wang ist heute nicht im Büro.
谈判|tánpàn|verhandeln; Verhandlung|v|B1|两家公司正在谈判。|Liǎng jiā gōngsī zhèngzài tánpàn.|Die beiden Firmen verhandeln gerade.
调整|tiáozhěng|anpassen; umstellen|v|B1|我们需要调整计划。|Wǒmen xūyào tiáozhěng jìhuà.|Wir müssen den Plan anpassen.
推广|tuīguǎng|verbreiten; bekannt machen|v|B1|公司正在推广新产品。|Gōngsī zhèngzài tuīguǎng xīn chǎnpǐn.|Die Firma bewirbt gerade ein neues Produkt.
推进|tuījìn|vorantreiben; voranbringen|v|B1|我们要推进这个工作。|Wǒmen yào tuījìn zhège gōngzuò.|Wir müssen diese Arbeit voranbringen.
退休|tuìxiū|in Rente gehen|v|B1|我爸爸去年退休了。|Wǒ bàba qùnián tuìxiū le.|Mein Vater ist letztes Jahr in Rente gegangen.
文件|wénjiàn|Dokument; Datei|n|B1|请把文件发给我。|Qǐng bǎ wénjiàn fā gěi wǒ.|Bitte schick mir die Datei.
信封|xìnfēng|Briefumschlag|n|B1|请给我一个信封。|Qǐng gěi wǒ yí ge xìnfēng.|Bitte gib mir einen Briefumschlag.
修改|xiūgǎi|überarbeiten; ändern|v|B1|我想修改一下计划。|Wǒ xiǎng xiūgǎi yíxià jìhuà.|Ich möchte den Plan etwas ändern.
预计|yùjì|voraussichtlich; schätzen|v|B1|飞机预计三点到。|Fēijī yùjì sān diǎn dào.|Das Flugzeug kommt voraussichtlich um drei an.
员工|yuángōng|Mitarbeiter; Angestellte|n|B1|公司有五十名员工。|Gōngsī yǒu wǔshí míng yuángōng.|Die Firma hat fünfzig Mitarbeiter.
正式|zhèngshì|offiziell; formell|adj|B1|会议明天正式开始。|Huìyì míngtiān zhèngshì kāishǐ.|Die Konferenz beginnt morgen offiziell.
证|zhèng|Ausweis; Bescheinigung|n|B1|请给我看一下学生证。|Qǐng gěi wǒ kàn yíxià xuéshengzhèng.|Bitte zeigen Sie mir Ihren Studentenausweis.
职工|zhígōng|Belegschaft; Beschäftigte|n|B1|工厂有三百名职工。|Gōngchǎng yǒu sānbǎi míng zhígōng.|Die Fabrik hat dreihundert Beschäftigte.
职业|zhíyè|Beruf|n|B1|你的职业是什么？|Nǐ de zhíyè shì shénme?|Was bist du von Beruf?
制定|zhìdìng|festlegen; ausarbeiten|v|B1|我们要制定一个计划。|Wǒmen yào zhìdìng yí ge jìhuà.|Wir müssen einen Plan ausarbeiten.
制造|zhìzào|herstellen; produzieren|v|B1|这辆车是中国制造的。|Zhè liàng chē shì Zhōngguó zhìzào de.|Dieses Auto wurde in China hergestellt.
制作|zhìzuò|anfertigen; produzieren|v|B1|她在制作一个蛋糕。|Tā zài zhìzuò yí ge dàngāo.|Sie macht gerade einen Kuchen.
主持|zhǔchí|moderieren; leiten|v|B1|今天的会由他主持。|Jīntiān de huì yóu tā zhǔchí.|Die heutige Sitzung leitet er.
主任|zhǔrèn|Leiter/in; Direktor/in|n|B1|王主任在办公室。|Wáng zhǔrèn zài bàngōngshì.|Direktor Wang ist im Büro.
资格|zīgé|Qualifikation; Berechtigung|n|B1|他有当老师的资格。|Tā yǒu dāng lǎoshī de zīgé.|Er hat die Qualifikation zum Lehrer.
总结|zǒngjié|zusammenfassen; Fazit|v|B1|我们来总结一下。|Wǒmen lái zǒngjié yíxià.|Fassen wir kurz zusammen.
传真|chuánzhēn|Fax|n|B1|现在很少有人发传真。|Xiànzài hěn shǎo yǒu rén fā chuánzhēn.|Heute schickt kaum noch jemand Faxe.
出差|chūchāi|auf Dienstreise gehen|v|B1|他下周去北京出差。|Tā xià zhōu qù Běijīng chūchāi.|Er fährt nächste Woche auf Dienstreise nach Peking.
奖金|jiǎngjīn|Prämie; Bonus|n|B1|今年的奖金很多。|Jīnnián de jiǎngjīn hěn duō.|Die Prämie ist dieses Jahr hoch.
应聘|yìngpìn|sich bewerben|v|B1|我想应聘这个工作。|Wǒ xiǎng yìngpìn zhège gōngzuò.|Ich möchte mich auf diese Stelle bewerben.
招聘|zhāopìn|(Personal) einstellen; anwerben|v|B1|我们公司在招聘。|Wǒmen gōngsī zài zhāopìn.|Unsere Firma stellt gerade ein.
材料|cáiliào|Material; Unterlagen|n|B1|请把材料发给我。|Qǐng bǎ cáiliào fā gěi wǒ.|Schick mir bitte die Unterlagen.
申请|shēnqǐng|beantragen; sich bewerben|v|B1|我想申请签证。|Wǒ xiǎng shēnqǐng qiānzhèng.|Ich möchte ein Visum beantragen.
赚|zhuàn|verdienen (Geld)|v|B1|他想多赚一点儿钱。|Tā xiǎng duō zhuàn yìdiǎnr qián.|Er möchte etwas mehr Geld verdienen.
`,

  education: `
班|bān|Klasse; Schicht|n|A1|我们班有二十个学生。|Wǒmen bān yǒu èrshí gè xuésheng.|Unsere Klasse hat zwanzig Schüler.
本子|běnzi|Heft|n|A1|这是我的本子。|Zhè shì wǒ de běnzi.|Das ist mein Heft.
大学|dàxué|Universität|n|A1|我哥哥在上大学。|Wǒ gēge zài shàng dàxué.|Mein älterer Bruder studiert an der Uni.
大学生|dàxuéshēng|Student/in|n|A1|我妹妹是大学生。|Wǒ mèimei shì dàxuéshēng.|Meine jüngere Schwester ist Studentin.
读书|dúshū|lesen; lernen (zur Schule gehen)|v|A1|我喜欢读书。|Wǒ xǐhuan dúshū.|Ich lese gern.
放假|fàngjià|Ferien haben; frei haben|v|A1|我们明天放假。|Wǒmen míngtiān fàngjià.|Wir haben morgen frei.
放学|fàngxué|Schulschluss haben|v|A1|你几点放学？|Nǐ jǐ diǎn fàngxué?|Wann hast du Schulschluss?
汉字|Hànzì|chinesisches Schriftzeichen|n|A1|我会写一百个汉字。|Wǒ huì xiě yìbǎi gè Hànzì.|Ich kann hundert Schriftzeichen schreiben.
话|huà|Worte; Gesagtes|n|A1|我听不懂他的话。|Wǒ tīng bu dǒng tā de huà.|Ich verstehe nicht, was er sagt.
记|jì|sich merken; notieren|v|A1|请记一下我的电话。|Qǐng jì yíxià wǒ de diànhuà.|Bitte notier dir meine Nummer.
记住|jìzhù|sich einprägen; behalten|v|A1|我记住你的名字了。|Wǒ jìzhù nǐ de míngzi le.|Ich habe mir deinen Namen gemerkt.
教学楼|jiàoxuélóu|Unterrichtsgebäude|n|A1|教学楼在图书馆旁边。|Jiàoxuélóu zài túshūguǎn pángbiān.|Das Unterrichtsgebäude ist neben der Bibliothek.
考|kǎo|eine Prüfung machen|v|A1|你考得怎么样？|Nǐ kǎo de zěnmeyàng?|Wie lief deine Prüfung?
课|kè|Unterricht; Lektion|n|A1|我今天有三节课。|Wǒ jīntiān yǒu sān jié kè.|Ich habe heute drei Unterrichtsstunden.
课本|kèběn|Lehrbuch|n|A1|请打开课本。|Qǐng dǎkāi kèběn.|Schlagt bitte das Lehrbuch auf.
课文|kèwén|Lektionstext|n|A1|请读一下课文。|Qǐng dú yíxià kèwén.|Lies bitte den Lektionstext vor.
上课|shàngkè|Unterricht haben|v|A1|我们八点上课。|Wǒmen bā diǎn shàngkè.|Unser Unterricht beginnt um acht.
上学|shàngxué|zur Schule gehen|v|A1|孩子们七点去上学。|Háizimen qī diǎn qù shàngxué.|Die Kinder gehen um sieben zur Schule.
书|shū|Buch|n|A1|这本书很有意思。|Zhè běn shū hěn yǒu yìsi.|Dieses Buch ist sehr interessant.
书包|shūbāo|Schultasche|n|A1|我的书包很重。|Wǒ de shūbāo hěn zhòng.|Meine Schultasche ist sehr schwer.
听写|tīngxiě|Diktat; nach Diktat schreiben|n|A1|我们今天有听写。|Wǒmen jīntiān yǒu tīngxiě.|Wir schreiben heute ein Diktat.
图书馆|túshūguǎn|Bibliothek|n|A1|我常去图书馆看书。|Wǒ cháng qù túshūguǎn kàn shū.|Ich gehe oft zum Lesen in die Bibliothek.
外语|wàiyǔ|Fremdsprache|n|A1|你会说几种外语？|Nǐ huì shuō jǐ zhǒng wàiyǔ?|Wie viele Fremdsprachen sprichst du?
下课|xiàkè|Unterrichtsschluss haben|v|A1|我们四点下课。|Wǒmen sì diǎn xiàkè.|Unser Unterricht ist um vier zu Ende.
小学|xiǎoxué|Grundschule|n|A1|我女儿在上小学。|Wǒ nǚ'ér zài shàng xiǎoxué.|Meine Tochter geht in die Grundschule.
小学生|xiǎoxuéshēng|Grundschüler/in|n|A1|我弟弟是小学生。|Wǒ dìdi shì xiǎoxuéshēng.|Mein kleiner Bruder ist Grundschüler.
学院|xuéyuàn|Hochschule; Fakultät|n|A1|她在音乐学院学习。|Tā zài yīnyuè xuéyuàn xuéxí.|Sie studiert an der Musikhochschule.
页|yè|Seite (im Buch)|mw|A1|请看第十页。|Qǐng kàn dì shí yè.|Schlagt bitte Seite zehn auf.
知识|zhīshi|Wissen; Kenntnisse|n|A1|读书可以学到很多知识。|Dúshū kěyǐ xuédào hěn duō zhīshi.|Durch Lesen kann man viel Wissen erwerben.
中学|zhōngxué|Mittelschule; weiterführende Schule|n|A1|我姐姐是中学老师。|Wǒ jiějie shì zhōngxué lǎoshī.|Meine ältere Schwester ist Lehrerin an einer Mittelschule.
中学生|zhōngxuéshēng|Mittelschüler/in|n|A1|他儿子是中学生。|Tā érzi shì zhōngxuéshēng.|Sein Sohn ist Mittelschüler.
班长|bānzhǎng|Klassensprecher/in|n|A2|他是我们班的班长。|Tā shì wǒmen bān de bānzhǎng.|Er ist unser Klassensprecher.
报名|bàomíng|sich anmelden|v|A2|我想报名学中文。|Wǒ xiǎng bàomíng xué Zhōngwén.|Ich möchte mich für einen Chinesischkurs anmelden.
背|bèi|auswendig lernen; Rücken|v|A2|我在背生词。|Wǒ zài bèi shēngcí.|Ich lerne gerade Vokabeln auswendig.
笔|bǐ|Stift|n|A2|我可以用你的笔吗？|Wǒ kěyǐ yòng nǐ de bǐ ma?|Darf ich deinen Stift benutzen?
笔记|bǐjì|Notizen|n|A2|上课要记笔记。|Shàngkè yào jì bǐjì.|Im Unterricht sollte man Notizen machen.
笔记本|bǐjìběn|Notizbuch; Laptop|n|A2|我买了一个新笔记本。|Wǒ mǎi le yí gè xīn bǐjìběn.|Ich habe ein neues Notizbuch gekauft.
成绩|chéngjì|Note; Leistung|n|A2|他的成绩很好。|Tā de chéngjì hěn hǎo.|Seine Noten sind sehr gut.
词典|cídiǎn|Wörterbuch|n|A2|我买了一本词典。|Wǒ mǎi le yì běn cídiǎn.|Ich habe ein Wörterbuch gekauft.
词语|cíyǔ|Wort; Ausdruck|n|A2|这个词语是什么意思?|Zhège cíyǔ shì shénme yìsi?|Was bedeutet dieser Ausdruck?
读音|dúyīn|Aussprache; Lesung|n|A2|这个字的读音是什么?|Zhège zì de dúyīn shì shénme?|Wie wird dieses Schriftzeichen ausgesprochen?
对话|duìhuà|Dialog; Gespräch|n|A2|请听下面的对话。|Qǐng tīng xiàmiàn de duìhuà.|Bitte hören Sie den folgenden Dialog.
分数|fēnshù|Punktzahl; Note|n|A2|这次考试的分数不高。|Zhè cì kǎoshì de fēnshù bù gāo.|Die Punktzahl bei dieser Prüfung ist nicht hoch.
复习|fùxí|wiederholen (Lernstoff)|v|A2|我晚上要复习汉语。|Wǒ wǎnshang yào fùxí Hànyǔ.|Ich muss heute Abend Chinesisch wiederholen.
高中|gāozhōng|Oberstufe (der Mittelschule)|n|A2|我弟弟在上高中。|Wǒ dìdi zài shàng gāozhōng.|Mein jüngerer Bruder geht in die Oberstufe.
黑板|hēibǎn|Tafel|n|A2|请大家看黑板。|Qǐng dàjiā kàn hēibǎn.|Bitte schaut alle an die Tafel.
级|jí|Stufe; Niveau|mw|A2|我想考汉语四级。|Wǒ xiǎng kǎo Hànyǔ sì jí.|Ich möchte die Chinesischprüfung Stufe 4 ablegen.
教室|jiàoshì|Klassenzimmer|n|A2|教室里没有人。|Jiàoshì lǐ méiyǒu rén.|Im Klassenzimmer ist niemand.
教学|jiàoxué|Unterricht; Lehre|n|A2|他有很多教学经验。|Tā yǒu hěn duō jiàoxué jīngyàn.|Er hat viel Unterrichtserfahrung.
举手|jǔshǒu|die Hand heben; sich melden|v|A2|有问题请举手。|Yǒu wèntí qǐng jǔshǒu.|Wer eine Frage hat, meldet sich bitte.
开学|kāixué|Schulbeginn; das Semester beginnt|v|A2|我们九月一号开学。|Wǒmen jiǔ yuè yī hào kāixué.|Bei uns beginnt die Schule am 1. September.
考生|kǎoshēng|Prüfling; Prüfungskandidat/in|n|A2|今年考生很多。|Jīnnián kǎoshēng hěn duō.|Dieses Jahr gibt es viele Prüflinge.
科|kē|Fach; Abteilung|n|A2|你最喜欢哪一科?|Nǐ zuì xǐhuan nǎ yì kē?|Welches Fach magst du am liebsten?
课堂|kètáng|Unterricht; Klassenzimmer|n|A2|他在课堂上很认真。|Tā zài kètáng shang hěn rènzhēn.|Er ist im Unterricht sehr gewissenhaft.
例子|lìzi|Beispiel|n|A2|请举一个例子。|Qǐng jǔ yí gè lìzi.|Bitte nennen Sie ein Beispiel.
练|liàn|üben; trainieren|v|A2|我每天练半个小时。|Wǒ měi tiān liàn bàn gè xiǎoshí.|Ich übe jeden Tag eine halbe Stunde.
留学生|liúxuéshēng|Auslandsstudent/in|n|A2|他是德国留学生。|Tā shì Déguó liúxuéshēng.|Er ist ein Auslandsstudent aus Deutschland.
难题|nántí|schwieriges Problem|n|A2|这是一个难题。|Zhè shì yí gè nántí.|Das ist ein schwieriges Problem.
年级|niánjí|Klasse; Jahrgangsstufe|n|A2|你上几年级？|Nǐ shàng jǐ niánjí?|In welche Klasse gehst du?
普通话|pǔtōnghuà|Hochchinesisch; Mandarin|n|A2|你的普通话很好。|Nǐ de pǔtōnghuà hěn hǎo.|Dein Hochchinesisch ist sehr gut.
生词|shēngcí|neue Vokabel|n|A2|这课有很多生词。|Zhè kè yǒu hěn duō shēngcí.|Diese Lektion hat viele neue Vokabeln.
水平|shuǐpíng|Niveau|n|A2|你的中文水平很高。|Nǐ de Zhōngwén shuǐpíng hěn gāo.|Dein Chinesisch ist auf einem hohen Niveau.
说明|shuōmíng|erklären; Erklärung|v|A2|请你说明一下。|Qǐng nǐ shuōmíng yíxià.|Bitte erklär das mal kurz.
题|tí|Aufgabe; Frage (Prüfung)|n|A2|这道题很难。|Zhè dào tí hěn nán.|Diese Aufgabe ist sehr schwer.
听讲|tīngjiǎng|(im Unterricht) zuhören|v|A2|上课要认真听讲。|Shàngkè yào rènzhēn tīngjiǎng.|Im Unterricht muss man aufmerksam zuhören.
小组|xiǎozǔ|Gruppe; Team|n|A2|我们小组有五个人。|Wǒmen xiǎozǔ yǒu wǔ gè rén.|Unsere Gruppe hat fünf Leute.
校园|xiàoyuán|Campus; Schulgelände|n|A2|我们的校园很漂亮。|Wǒmen de xiàoyuán hěn piàoliang.|Unser Campus ist sehr schön.
学期|xuéqī|Semester|n|A2|这个学期我很忙。|Zhège xuéqī wǒ hěn máng.|Dieses Semester habe ich viel zu tun.
音节|yīnjié|Silbe|n|A2|这个词有两个音节。|Zhège cí yǒu liǎng gè yīnjié.|Dieses Wort hat zwei Silben.
英文|Yīngwén|Englisch (Sprache)|n|A2|你会说英文吗？|Nǐ huì shuō Yīngwén ma?|Sprichst du Englisch?
英语|Yīngyǔ|Englisch|n|A2|我的英语不太好。|Wǒ de Yīngyǔ bú tài hǎo.|Mein Englisch ist nicht so gut.
语言|yǔyán|Sprache|n|A2|你会说几种语言？|Nǐ huì shuō jǐ zhǒng yǔyán?|Wie viele Sprachen sprichst du?
纸|zhǐ|Papier|n|A2|请给我一张纸。|Qǐng gěi wǒ yì zhāng zhǐ.|Gib mir bitte ein Blatt Papier.
中级|zhōngjí|Mittelstufe; mittleres Niveau|adj|A2|我在上中级汉语课。|Wǒ zài shàng zhōngjí Hànyǔ kè.|Ich besuche einen Chinesischkurs der Mittelstufe.
中小学|zhōngxiǎoxué|Grund- und Mittelschulen|n|A2|中小学九月开学。|Zhōngxiǎoxué jiǔ yuè kāixué.|An den Grund- und Mittelschulen beginnt im September der Unterricht.
重点|zhòngdiǎn|Schwerpunkt|n|A2|这是今天的重点。|Zhè shì jīntiān de zhòngdiǎn.|Das ist der Schwerpunkt von heute.
字典|zìdiǎn|Wörterbuch|n|A2|我想买一本字典。|Wǒ xiǎng mǎi yì běn zìdiǎn.|Ich möchte ein Wörterbuch kaufen.
作文|zuòwén|Aufsatz|n|A2|我的作文写完了。|Wǒ de zuòwén xiěwán le.|Mein Aufsatz ist fertig.
铅笔|qiānbǐ|Bleistift|n|A2|我可以用你的铅笔吗？|Wǒ kěyǐ yòng nǐ de qiānbǐ ma?|Darf ich deinen Bleistift benutzen?
数学|shùxué|Mathematik|n|A2|我的数学不太好。|Wǒ de shùxué bú tài hǎo.|Ich bin nicht besonders gut in Mathe.
班级|bānjí|Schulklasse|n|B1|我们班级有三十个学生。|Wǒmen bānjí yǒu sānshí gè xuésheng.|Unsere Klasse hat dreißig Schüler.
表达|biǎodá|ausdrücken|v|B1|我不知道怎么表达。|Wǒ bù zhīdào zěnme biǎodá.|Ich weiß nicht, wie ich es ausdrücken soll.
初级|chūjí|Grundstufe; Anfänger-|adj|B1|我在上初级班。|Wǒ zài shàng chūjí bān.|Ich besuche den Anfängerkurs.
初中|chūzhōng|Mittelschule (Unterstufe)|n|B1|我弟弟在上初中。|Wǒ dìdi zài shàng chūzhōng.|Mein kleiner Bruder geht auf die Mittelschule.
错误|cuòwù|Fehler; falsch|n|B1|我发现了一个错误。|Wǒ fāxiànle yí gè cuòwù.|Ich habe einen Fehler entdeckt.
单元|dānyuán|Einheit; Lektion; Hauseingang|n|B1|今天学习第三单元。|Jīntiān xuéxí dì sān dānyuán.|Heute lernen wir Lektion drei.
分组|fēnzǔ|in Gruppen einteilen|v|B1|我们分组讨论吧。|Wǒmen fēnzǔ tǎolùn ba.|Lasst uns in Gruppen diskutieren.
概念|gàiniàn|Begriff; Konzept|n|B1|这个概念很难懂。|Zhège gàiniàn hěn nán dǒng.|Dieser Begriff ist schwer zu verstehen.
功课|gōngkè|Hausaufgaben; Schularbeiten|n|B1|我在做功课。|Wǒ zài zuò gōngkè.|Ich mache gerade Hausaufgaben.
合格|hégé|den Anforderungen entsprechen; bestanden|adj|B1|这次考试我合格了。|Zhè cì kǎoshì wǒ hégé le.|Diese Prüfung habe ich bestanden.
基础|jīchǔ|Grundlage; Basis|n|B1|他的汉语基础很好。|Tā de Hànyǔ jīchǔ hěn hǎo.|Seine Chinesisch-Grundlagen sind sehr gut.
教材|jiàocái|Lehrmaterial; Lehrbuch|n|B1|这本教材很好用。|Zhè běn jiàocái hěn hǎoyòng.|Dieses Lehrbuch ist sehr praktisch.
进步|jìnbù|Fortschritte machen; Fortschritt|v|B1|你的汉语进步很大。|Nǐ de Hànyǔ jìnbù hěn dà.|Dein Chinesisch hat große Fortschritte gemacht.
课程|kèchéng|Kurs; Lehrplan|n|B1|这个学期课程很多。|Zhège xuéqī kèchéng hěn duō.|Dieses Semester gibt es viele Kurse.
理论|lǐlùn|Theorie|n|B1|这个理论很有意思。|Zhège lǐlùn hěn yǒu yìsi.|Diese Theorie ist sehr interessant.
留学|liúxué|im Ausland studieren|v|B1|她想去中国留学。|Tā xiǎng qù Zhōngguó liúxué.|Sie möchte in China studieren.
难度|nándù|Schwierigkeitsgrad|n|B1|这次考试难度很大。|Zhè cì kǎoshì nándù hěn dà.|Diese Prüfung ist sehr schwierig.
内容|nèiróng|Inhalt|n|B1|这本书的内容很有意思。|Zhè běn shū de nèiróng hěn yǒu yìsi.|Der Inhalt dieses Buches ist sehr interessant.
念|niàn|vorlesen; (Schule) besuchen|v|B1|请念一下这个句子。|Qǐng niàn yíxià zhège jùzi.|Lies bitte diesen Satz vor.
请教|qǐngjiào|um Rat fragen|v|B1|我想请教您一个问题。|Wǒ xiǎng qǐngjiào nín yí gè wèntí.|Ich möchte Sie etwas fragen.
实验|shíyàn|Experiment|n|B1|我们今天做实验。|Wǒmen jīntiān zuò shíyàn.|Wir machen heute ein Experiment.
实验室|shíyànshì|Labor|n|B1|他每天都在实验室。|Tā měi tiān dōu zài shíyànshì.|Er ist jeden Tag im Labor.
试题|shìtí|Prüfungsaufgabe|n|B1|这次的试题很难。|Zhè cì de shìtí hěn nán.|Die Prüfungsaufgaben waren diesmal schwer.
试验|shìyàn|Versuch; Test; erproben|n|B1|这次试验成功了！|Zhè cì shìyàn chénggōng le!|Dieser Versuch ist gelungen!
提问|tíwèn|Fragen stellen|v|B1|现在大家可以提问。|Xiànzài dàjiā kěyǐ tíwèn.|Jetzt können alle Fragen stellen.
题目|tímù|Aufgabe; Titel; Thema|n|B1|这个题目我不会做。|Zhège tímù wǒ bú huì zuò.|Diese Aufgabe kann ich nicht lösen.
听力|tīnglì|Hörverstehen; Gehör|n|B1|我的听力不太好。|Wǒ de tīnglì bú tài hǎo.|Mein Hörverstehen ist nicht so gut.
图|tú|Bild; Abbildung|n|B1|请看这张图。|Qǐng kàn zhè zhāng tú.|Bitte schau dir dieses Bild an.
外文|wàiwén|Fremdsprache|n|B1|他会看外文书。|Tā huì kàn wàiwén shū.|Er kann fremdsprachige Bücher lesen.
文学|wénxué|Literatur|n|B1|我喜欢中国文学。|Wǒ xǐhuan Zhōngguó wénxué.|Ich mag chinesische Literatur.
文章|wénzhāng|Artikel; Aufsatz|n|B1|这篇文章写得很好。|Zhè piān wénzhāng xiě de hěn hǎo.|Dieser Artikel ist sehr gut geschrieben.
文字|wénzì|Schrift; Text|n|B1|图片上有文字。|Túpiàn shang yǒu wénzì.|Auf dem Bild steht Text.
系|xì|Fachbereich; Institut|n|B1|我是中文系的学生。|Wǒ shì Zhōngwén xì de xuésheng.|Ich studiere am Institut für Chinesisch.
写作|xiězuò|schreiben; Schreiben (Texte)|v|B1|他的写作水平很高。|Tā de xiězuò shuǐpíng hěn gāo.|Er schreibt auf sehr hohem Niveau.
学费|xuéfèi|Studiengebühren; Schulgeld|n|B1|这个学校的学费很贵。|Zhège xuéxiào de xuéfèi hěn guì.|Das Schulgeld an dieser Schule ist sehr hoch.
预习|yùxí|(Stoff) vorbereiten|v|B1|上课以前要预习。|Shàngkè yǐqián yào yùxí.|Vor dem Unterricht sollte man den Stoff vorbereiten.
指导|zhǐdǎo|anleiten; Anleitung|v|B1|老师指导我们写作文。|Lǎoshī zhǐdǎo wǒmen xiě zuòwén.|Der Lehrer leitet uns beim Aufsatzschreiben an.
专业|zhuānyè|Studienfach; professionell|n|B1|你学什么专业？|Nǐ xué shénme zhuānyè?|Was studierst du?
博士|bóshì|Doktor (Titel); Doktorand/in|n|B1|她在读博士。|Tā zài dú bóshì.|Sie promoviert gerade.
填空|tiánkòng|Lücken ausfüllen|v|B1|请用这些词填空。|Qǐng yòng zhèxiē cí tiánkòng.|Füllen Sie bitte die Lücken mit diesen Wörtern.
寒假|hánjià|Winterferien|n|B1|寒假你打算做什么？|Hánjià nǐ dǎsuàn zuò shénme?|Was hast du in den Winterferien vor?
放暑假|fàng shǔjià|Sommerferien haben|v|B1|我们七月放暑假。|Wǒmen qīyuè fàng shǔjià.|Wir haben im Juli Sommerferien.
日记|rìjì|Tagebuch|n|B1|我每天写日记。|Wǒ měi tiān xiě rìjì.|Ich schreibe jeden Tag Tagebuch.
橡皮|xiàngpí|Radiergummi|n|B1|我可以用你的橡皮吗？|Wǒ kěyǐ yòng nǐ de xiàngpí ma?|Darf ich deinen Radiergummi benutzen?
毕业|bìyè|Abschluss machen|v|B1|我明年大学毕业。|Wǒ míngnián dàxué bìyè.|Ich mache nächstes Jahr meinen Uniabschluss.
硕士|shuòshì|Master (Abschluss)|n|B1|我在德国读硕士。|Wǒ zài Déguó dú shuòshì.|Ich mache in Deutschland meinen Master.
答案|dá'àn|Antwort; Lösung|n|B1|你知道答案吗？|Nǐ zhīdào dá'àn ma?|Weißt du die Antwort?
翻译|fānyì|übersetzen; Übersetzer/in|v|B1|请帮我翻译这句话。|Qǐng bāng wǒ fānyì zhè jù huà.|Hilf mir bitte, diesen Satz zu übersetzen.
表扬|biǎoyáng|loben|v|B1|老师表扬了我。|Lǎoshī biǎoyáng le wǒ.|Der Lehrer hat mich gelobt.
语法|yǔfǎ|Grammatik|n|B1|汉语语法不太难。|Hànyǔ yǔfǎ bú tài nán.|Die chinesische Grammatik ist nicht allzu schwer.
阅读|yuèdú|lesen; Lektüre|v|B1|我每天阅读半个小时。|Wǒ měi tiān yuèdú bàn gè xiǎoshí.|Ich lese jeden Tag eine halbe Stunde.
`,
};

export default part6;
