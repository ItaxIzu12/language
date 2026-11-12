// Format: Wort | Pinyin | Deutsch | Wortart | Niveau | Beispiel | Beispiel-Pinyin | Beispiel-Deutsch | L
const part2: Record<string, string> = {
  food: `
吃|chī|essen|v|A1|你吃饭了吗？|Nǐ chīfàn le ma?|Hast du schon gegessen?|L
喝|hē|trinken|v|A1|我想喝水。|Wǒ xiǎng hē shuǐ.|Ich möchte Wasser trinken.|L
水|shuǐ|Wasser|n|A1|多喝水。|Duō hē shuǐ.|Trink viel Wasser.|L
饭|fàn|Essen, Mahlzeit; Reis|n|A1|我们去吃饭吧。|Wǒmen qù chīfàn ba.|Lass uns essen gehen.|L
菜|cài|Gericht; Gemüse|n|A1|这个菜很好吃。|Zhège cài hěn hǎochī.|Dieses Gericht ist lecker.|L
好吃|hǎochī|lecker (Essen)|adj|A1|太好吃了！|Tài hǎochī le!|Superlecker!|L
好喝|hǎohē|lecker (Getränk)|adj|A1|这杯咖啡很好喝。|Zhè bēi kāfēi hěn hǎohē.|Dieser Kaffee schmeckt gut.|L
咖啡|kāfēi|Kaffee|n|A1|我每天喝咖啡。|Wǒ měi tiān hē kāfēi.|Ich trinke jeden Tag Kaffee.|L
饿|è|hungrig|adj|A1|我饿了。|Wǒ è le.|Ich habe Hunger.|L
渴|kě|durstig|adj|A1|你渴不渴？|Nǐ kě bu kě?|Hast du Durst?|L
饱|bǎo|satt|adj|A1|我吃饱了。|Wǒ chībǎo le.|Ich bin satt.|L
饿死了|è sǐ le|am Verhungern (Chat-Übertreibung)|phr|A2|我饿死了，点外卖吧！|Wǒ è sǐ le, diǎn wàimài ba!|Ich verhungere, lass uns Essen bestellen!|L
服务员|fúwùyuán|Kellner/in, Bedienung|n|A1|服务员，买单！|Fúwùyuán, mǎidān!|Bedienung, die Rechnung bitte!|L
点菜|diǎncài|Essen bestellen (im Restaurant)|v|A1|我们点菜吧。|Wǒmen diǎncài ba.|Lass uns bestellen.|L
菜单|càidān|Speisekarte|n|A1|请给我菜单。|Qǐng gěi wǒ càidān.|Die Speisekarte bitte.|L
米饭|mǐfàn|gekochter Reis|n|A1|我要一碗米饭。|Wǒ yào yì wǎn mǐfàn.|Ich möchte eine Schale Reis.|L
面条|miàntiáo|Nudeln|n|A1|我喜欢吃面条。|Wǒ xǐhuan chī miàntiáo.|Ich esse gern Nudeln.|L
尝|cháng|probieren, kosten|v|A2|你尝尝这个。|Nǐ chángchang zhège.|Probier das mal.|L
味道|wèidao|Geschmack|n|A2|味道怎么样？|Wèidao zěnmeyàng?|Wie schmeckt es?|L
口味|kǒuwèi|Geschmacksvorliebe|n|B1|这个菜不合我的口味。|Zhège cài bù hé wǒ de kǒuwèi.|Das Gericht trifft nicht meinen Geschmack.|L
甜|tián|süß|adj|A1|这个太甜了。|Zhège tài tián le.|Das ist zu süß.|L
辣|là|scharf|adj|A1|我不能吃辣。|Wǒ bù néng chī là.|Ich kann nicht scharf essen.|L
咸|xián|salzig|adj|A2|汤有点儿咸。|Tāng yǒudiǎnr xián.|Die Suppe ist etwas salzig.|L
酸|suān|sauer|adj|A2
苦|kǔ|bitter|adj|A2
香|xiāng|duftend, lecker riechend|adj|A2|好香啊！|Hǎo xiāng a!|Wie das duftet!|L
油腻|yóunì|fettig|adj|B1|这个菜有点儿油腻。|Zhège cài yǒudiǎnr yóunì.|Das Gericht ist etwas fettig.|L
清淡|qīngdàn|leicht, mild (Essen)|adj|B1|我想吃清淡一点儿的。|Wǒ xiǎng chī qīngdàn yìdiǎnr de.|Ich möchte etwas Leichteres essen.|L
新鲜|xīnxiān|frisch|adj|A2|这些水果很新鲜。|Zhèxiē shuǐguǒ hěn xīnxiān.|Dieses Obst ist sehr frisch.
结账|jiézhàng|die Rechnung begleichen|v|A2|我们结账吧。|Wǒmen jiézhàng ba.|Lass uns zahlen.|L
买单|mǎidān|zahlen (im Restaurant)|v|A1|今天我来买单。|Jīntiān wǒ lái mǎidān.|Heute zahle ich.|L
请客|qǐngkè|einladen (die Rechnung übernehmen)|v|A2|今天我请客。|Jīntiān wǒ qǐngkè.|Heute lade ich ein.|L
外卖|wàimài|Essenslieferung|n|A2|我们点外卖吧。|Wǒmen diǎn wàimài ba.|Lass uns Essen liefern lassen.|L
送|sòng|liefern, bringen; schenken|v|A2|外卖送到了。|Wàimài sòngdào le.|Das Essen ist geliefert worden.|L
好评|hǎopíng|gute Bewertung|n|B1|我给了一个好评。|Wǒ gěile yí ge hǎopíng.|Ich habe eine gute Bewertung gegeben.|L
差评|chàpíng|schlechte Bewertung|n|B1|太慢了，我要给差评。|Tài màn le, wǒ yào gěi chàpíng.|Zu langsam, ich gebe eine schlechte Bewertung.|L
茶|chá|Tee|n|A1|你喝茶还是咖啡？|Nǐ hē chá háishi kāfēi?|Trinkst du Tee oder Kaffee?
奶茶|nǎichá|Milchtee, Bubble Tea|n|A2
啤酒|píjiǔ|Bier|n|A1|来两瓶啤酒。|Lái liǎng píng píjiǔ.|Zwei Flaschen Bier bitte.
牛奶|niúnǎi|Milch|n|A1
果汁|guǒzhī|Saft|n|A1
鸡蛋|jīdàn|Ei|n|A1
面包|miànbāo|Brot|n|A1
水果|shuǐguǒ|Obst|n|A1|多吃水果对身体好。|Duō chī shuǐguǒ duì shēntǐ hǎo.|Viel Obst ist gut für den Körper.
苹果|píngguǒ|Apfel|n|A1
蔬菜|shūcài|Gemüse|n|A2
肉|ròu|Fleisch|n|A1|我不吃肉。|Wǒ bù chī ròu.|Ich esse kein Fleisch.
牛肉|niúròu|Rindfleisch|n|A1
鸡肉|jīròu|Hähnchenfleisch|n|A1
鱼|yú|Fisch|n|A1
汤|tāng|Suppe|n|A1
饺子|jiǎozi|Jiaozi, Teigtaschen|n|A1|我们一起包饺子。|Wǒmen yìqǐ bāo jiǎozi.|Wir machen zusammen Jiaozi.
火锅|huǒguō|Hot Pot, Feuertopf|n|A2|周末去吃火锅吧。|Zhōumò qù chī huǒguō ba.|Lass uns am Wochenende Hot Pot essen.
餐厅|cāntīng|Restaurant|n|A2|这家餐厅很受欢迎。|Zhè jiā cāntīng hěn shòu huānyíng.|Dieses Restaurant ist sehr beliebt.
饭店|fàndiàn|Restaurant; Hotel|n|A1
早饭|zǎofàn|Frühstück|n|A1
午饭|wǔfàn|Mittagessen|n|A1
晚饭|wǎnfàn|Abendessen|n|A1|晚饭吃什么？|Wǎnfàn chī shénme?|Was gibt's zum Abendessen?
筷子|kuàizi|Essstäbchen|n|A2|你会用筷子吗？|Nǐ huì yòng kuàizi ma?|Kannst du mit Stäbchen essen?
做饭|zuòfàn|kochen|v|A1|我不太会做饭。|Wǒ bú tài huì zuòfàn.|Ich kann nicht so gut kochen.
打包|dǎbāo|einpacken (zum Mitnehmen)|v|A2|吃不完，打包吧。|Chī bu wán, dǎbāo ba.|Wir schaffen es nicht, lass es einpacken.
干杯|gānbēi|Prost!|phr|A2|为我们的友谊干杯！|Wèi wǒmen de yǒuyì gānbēi!|Auf unsere Freundschaft, Prost!
`,

  shopping: `
买|mǎi|kaufen|v|A1|我想买一件衣服。|Wǒ xiǎng mǎi yí jiàn yīfu.|Ich möchte ein Kleidungsstück kaufen.|L
卖|mài|verkaufen|v|A1|这里卖水果吗？|Zhèlǐ mài shuǐguǒ ma?|Wird hier Obst verkauft?
钱|qián|Geld|n|A1|我没带钱。|Wǒ méi dài qián.|Ich habe kein Geld dabei.|L
贵|guì|teuer|adj|A1|太贵了！|Tài guì le!|Zu teuer!|L
便宜|piányi|billig, günstig|adj|A1|这个比那个便宜。|Zhège bǐ nàge piányi.|Das hier ist günstiger als das dort.|L
价格|jiàgé|Preis|n|A2|价格还可以。|Jiàgé hái kěyǐ.|Der Preis geht in Ordnung.
超市|chāoshì|Supermarkt|n|A1|我去超市买东西。|Wǒ qù chāoshì mǎi dōngxi.|Ich gehe im Supermarkt einkaufen.|L
商店|shāngdiàn|Geschäft, Laden|n|A1|那家商店几点关门？|Nà jiā shāngdiàn jǐ diǎn guānmén?|Wann schließt der Laden dort?|L
商场|shāngchǎng|Einkaufszentrum|n|A2
东西|dōngxi|Ding, Sachen|n|A1|你买了什么东西？|Nǐ mǎile shénme dōngxi?|Was hast du gekauft?|L
衣服|yīfu|Kleidung|n|A1|这件衣服多少钱？|Zhè jiàn yīfu duōshao qián?|Wie viel kostet dieses Kleidungsstück?|L
裤子|kùzi|Hose|n|A1
鞋|xié|Schuhe|n|A1|这双鞋有点儿小。|Zhè shuāng xié yǒudiǎnr xiǎo.|Diese Schuhe sind etwas klein.|L
包|bāo|Tasche|n|A1
礼物|lǐwù|Geschenk|n|A2|我给你买了一个礼物。|Wǒ gěi nǐ mǎile yí ge lǐwù.|Ich habe dir ein Geschenk gekauft.
颜色|yánsè|Farbe|n|A1|你喜欢什么颜色？|Nǐ xǐhuan shénme yánsè?|Welche Farbe magst du?|L
试|shì|anprobieren, versuchen|v|A1|我可以试一下吗？|Wǒ kěyǐ shì yíxià ma?|Kann ich das mal anprobieren?|L
打折|dǎzhé|Rabatt geben|v|A2|现在打八折。|Xiànzài dǎ bā zhé.|Jetzt gibt es 20 % Rabatt.|L
讲价|jiǎngjià|handeln, feilschen|v|B1
刷卡|shuākǎ|mit Karte zahlen|v|A2|可以刷卡吗？|Kěyǐ shuākǎ ma?|Kann ich mit Karte zahlen?|L
现金|xiànjīn|Bargeld|n|A2|我没有现金。|Wǒ méiyǒu xiànjīn.|Ich habe kein Bargeld.|L
扫码|sǎomǎ|QR-Code scannen|v|A2|扫码付款就行。|Sǎomǎ fùkuǎn jiù xíng.|Einfach per QR-Code bezahlen.
付款|fùkuǎn|bezahlen|v|A2|我已经付款了。|Wǒ yǐjīng fùkuǎn le.|Ich habe schon bezahlt.|L
免费|miǎnfèi|kostenlos|adj|A2|这个是免费的。|Zhège shì miǎnfèi de.|Das ist kostenlos.
网上|wǎngshàng|im Internet, online|n|A2|我在网上买的。|Wǒ zài wǎngshàng mǎi de.|Ich habe es online gekauft.|L
下单|xiàdān|eine Bestellung aufgeben|v|A2|我昨天下单了。|Wǒ zuótiān xiàdān le.|Ich habe gestern bestellt.|L
快递|kuàidì|Paketdienst; Paket|n|A2|我的快递还没到。|Wǒ de kuàidì hái méi dào.|Mein Paket ist noch nicht da.|L
包邮|bāoyóu|versandkostenfrei|v|B1|满一百块就包邮。|Mǎn yìbǎi kuài jiù bāoyóu.|Ab 100 Yuan versandkostenfrei.|L
优惠|yōuhuì|Vergünstigung, Angebot|n|B1|现在有优惠吗？|Xiànzài yǒu yōuhuì ma?|Gibt es gerade ein Angebot?|L
券|quàn|Gutschein, Coupon|n|B1|我有一张优惠券。|Wǒ yǒu yì zhāng yōuhuìquàn.|Ich habe einen Rabattgutschein.|L
到货|dàohuò|Ware trifft ein|v|B1|什么时候到货？|Shénme shíhou dàohuò?|Wann kommt die Ware an?|L
退|tuì|zurückgeben, zurückschicken|v|A2|不满意可以退吗？|Bù mǎnyì kěyǐ tuì ma?|Kann ich es zurückgeben, wenn es mir nicht gefällt?|L
退款|tuìkuǎn|Geld zurückerstatten|v|B1|我想申请退款。|Wǒ xiǎng shēnqǐng tuìkuǎn.|Ich möchte eine Rückerstattung beantragen.|L
满意|mǎnyì|zufrieden|adj|A2|我对这个很满意。|Wǒ duì zhège hěn mǎnyì.|Ich bin damit sehr zufrieden.|L
评价|píngjià|Bewertung; bewerten|n|B1|这家店的评价很好。|Zhè jiā diàn de píngjià hěn hǎo.|Dieser Laden hat sehr gute Bewertungen.|L
客服|kèfú|Kundenservice|n|B1|你联系客服了吗？|Nǐ liánxì kèfú le ma?|Hast du den Kundenservice kontaktiert?|L
投诉|tóusù|sich beschweren, reklamieren|v|B1|我要投诉！|Wǒ yào tóusù!|Ich will mich beschweren!|L
坏|huài|kaputt; schlecht|adj|A2|我的手机坏了。|Wǒ de shǒujī huài le.|Mein Handy ist kaputt.|L
修|xiū|reparieren|v|A2|这个能修好吗？|Zhège néng xiūhǎo ma?|Kann man das reparieren?|L
质量|zhìliàng|Qualität|n|B1|质量很好。|Zhìliàng hěn hǎo.|Die Qualität ist sehr gut.|L
性价比|xìngjiàbǐ|Preis-Leistungs-Verhältnis|n|B1|这个手机性价比很高。|Zhège shǒujī xìngjiàbǐ hěn gāo.|Dieses Handy hat ein tolles Preis-Leistungs-Verhältnis.|L
划算|huásuàn|lohnend, preiswert|adj|B1|买两个更划算。|Mǎi liǎng ge gèng huásuàn.|Zwei zu kaufen lohnt sich mehr.|L
优点|yōudiǎn|Vorteil, Stärke|n|B1|它的优点是便宜。|Tā de yōudiǎn shì piányi.|Sein Vorteil ist, dass es günstig ist.|L
缺点|quēdiǎn|Nachteil, Schwäche|n|B1|缺点是有点儿慢。|Quēdiǎn shì yǒudiǎnr màn.|Der Nachteil ist, dass es etwas langsam ist.|L
区别|qūbié|Unterschied|n|B1|这两个有什么区别？|Zhè liǎng ge yǒu shénme qūbié?|Was ist der Unterschied zwischen den beiden?|L
`,

  travel: `
去|qù|gehen, fahren (hin)|v|A1|我明天去北京。|Wǒ míngtiān qù Běijīng.|Ich fahre morgen nach Peking.|L
来|lái|kommen|v|A1|你什么时候来？|Nǐ shénme shíhou lái?|Wann kommst du?|L
走|zǒu|gehen, losgehen|v|A1|我们走吧。|Wǒmen zǒu ba.|Lass uns gehen.|L
坐|zuò|sitzen; fahren mit|v|A1|我坐地铁去。|Wǒ zuò dìtiě qù.|Ich fahre mit der U-Bahn hin.|L
到|dào|ankommen; bis|v|A1|我到了。|Wǒ dào le.|Ich bin da.|L
回|huí|zurückkehren|v|A1|我下周回德国。|Wǒ xià zhōu huí Déguó.|Ich kehre nächste Woche nach Deutschland zurück.
地铁|dìtiě|U-Bahn|n|A1|坐地铁很方便。|Zuò dìtiě hěn fāngbiàn.|U-Bahn fahren ist sehr praktisch.|L
公交车|gōngjiāochē|Bus|n|A1|我每天坐公交车上班。|Wǒ měi tiān zuò gōngjiāochē shàngbān.|Ich fahre jeden Tag mit dem Bus zur Arbeit.|L
打车|dǎchē|ein Taxi nehmen|v|A2|太晚了，打车吧。|Tài wǎn le, dǎchē ba.|Es ist zu spät, nehmen wir ein Taxi.|L
出租车|chūzūchē|Taxi|n|A1
车站|chēzhàn|Haltestelle, Bahnhof|n|A1|车站在哪儿？|Chēzhàn zài nǎr?|Wo ist die Haltestelle?|L
飞机|fēijī|Flugzeug|n|A1|我坐飞机去上海。|Wǒ zuò fēijī qù Shànghǎi.|Ich fliege nach Shanghai.
机场|jīchǎng|Flughafen|n|A2|我去机场接你。|Wǒ qù jīchǎng jiē nǐ.|Ich hole dich am Flughafen ab.
火车|huǒchē|Zug|n|A1
高铁|gāotiě|Hochgeschwindigkeitszug|n|A2|坐高铁只要四个小时。|Zuò gāotiě zhǐ yào sì ge xiǎoshí.|Mit dem Schnellzug dauert es nur vier Stunden.
自行车|zìxíngchē|Fahrrad|n|A2|我骑自行车去。|Wǒ qí zìxíngchē qù.|Ich fahre mit dem Fahrrad hin.
开车|kāichē|Auto fahren|v|A1|你会开车吗？|Nǐ huì kāichē ma?|Kannst du Auto fahren?
堵车|dǔchē|Stau|v|A2|路上堵车，我会晚一点儿。|Lùshang dǔchē, wǒ huì wǎn yìdiǎnr.|Es ist Stau, ich komme etwas später.
票|piào|Ticket, Karte|n|A1|我买了两张票。|Wǒ mǎile liǎng zhāng piào.|Ich habe zwei Tickets gekauft.
导航|dǎoháng|Navigation|n|A2|我用手机导航。|Wǒ yòng shǒujī dǎoháng.|Ich navigiere mit dem Handy.|L
快到了|kuài dào le|gleich da|phr|A2|等我一下，我快到了。|Děng wǒ yíxià, wǒ kuài dào le.|Warte kurz, ich bin gleich da.|L
旅游|lǚyóu|reisen, Urlaub machen|v|A2|我想去中国旅游。|Wǒ xiǎng qù Zhōngguó lǚyóu.|Ich möchte nach China reisen.|L
出发|chūfā|aufbrechen, abreisen|v|A2|我们明天早上七点出发。|Wǒmen míngtiān zǎoshang qī diǎn chūfā.|Wir brechen morgen früh um sieben auf.|L
订|dìng|buchen, reservieren|v|A2|我订好了酒店。|Wǒ dìnghǎole jiǔdiàn.|Ich habe das Hotel fertig gebucht.|L
机票|jīpiào|Flugticket|n|A2|机票订好了吗？|Jīpiào dìnghǎo le ma?|Sind die Flugtickets gebucht?|L
酒店|jiǔdiàn|Hotel|n|A2|这家酒店离地铁很近。|Zhè jiā jiǔdiàn lí dìtiě hěn jìn.|Dieses Hotel liegt nah an der U-Bahn.|L
护照|hùzhào|Reisepass|n|A2|别忘了带护照。|Bié wàngle dài hùzhào.|Vergiss nicht, den Pass mitzunehmen.|L
签证|qiānzhèng|Visum|n|B1|我的签证办好了。|Wǒ de qiānzhèng bànhǎo le.|Mein Visum ist fertig.
行李|xíngli|Gepäck|n|A2|我还没收拾行李呢。|Wǒ hái méi shōushi xíngli ne.|Ich habe das Gepäck noch nicht gepackt.|L
景点|jǐngdiǎn|Sehenswürdigkeit|n|B1|这个景点人太多了。|Zhège jǐngdiǎn rén tài duō le.|An dieser Sehenswürdigkeit sind zu viele Leute.|L
攻略|gōnglüè|Reise-Guide, Tipps|n|B1|我做了一份旅游攻略。|Wǒ zuòle yí fèn lǚyóu gōnglüè.|Ich habe einen Reiseplan mit Tipps erstellt.|L
打卡|dǎkǎ|einen Hotspot besuchen (und posten)|v|B1|我想去那家咖啡店打卡。|Wǒ xiǎng qù nà jiā kāfēidiàn dǎkǎ.|Ich will dieses Café unbedingt mal besuchen.|L
风景|fēngjǐng|Landschaft, Aussicht|n|B1|这里的风景真美。|Zhèlǐ de fēngjǐng zhēn měi.|Die Landschaft hier ist wirklich schön.
地图|dìtú|Karte, Stadtplan|n|A2
国家|guójiā|Land, Staat|n|A2|你去过哪些国家？|Nǐ qùguo nǎxiē guójiā?|In welchen Ländern warst du schon?
中国|Zhōngguó|China|n|A1
德国|Déguó|Deutschland|n|A1|我是从德国来的。|Wǒ shì cóng Déguó lái de.|Ich komme aus Deutschland.
城市|chéngshì|Stadt|n|A2|上海是一个很大的城市。|Shànghǎi shì yí ge hěn dà de chéngshì.|Shanghai ist eine sehr große Stadt.
外国|wàiguó|Ausland|n|A2
住|zhù|wohnen, übernachten|v|A1|你住在哪儿？|Nǐ zhù zài nǎr?|Wo wohnst du?
`,

  directions: `
怎么走|zěnme zǒu|wie kommt man hin?|phr|A1|去地铁站怎么走？|Qù dìtiězhàn zěnme zǒu?|Wie komme ich zur U-Bahn-Station?|L
路|lù|Straße, Weg|n|A1|这条路很长。|Zhè tiáo lù hěn cháng.|Diese Straße ist sehr lang.|L
地方|dìfang|Ort, Platz|n|A1|这个地方很漂亮。|Zhège dìfang hěn piàoliang.|Dieser Ort ist sehr schön.|L
附近|fùjìn|in der Nähe (Nomen)|n|A2|附近有超市吗？|Fùjìn yǒu chāoshì ma?|Gibt es in der Nähe einen Supermarkt?|L
前面|qiánmiàn|vorne, davor|n|A1|超市在前面。|Chāoshì zài qiánmiàn.|Der Supermarkt ist da vorne.|L
后面|hòumiàn|hinten, dahinter|n|A1|车站在商店后面。|Chēzhàn zài shāngdiàn hòumiàn.|Die Haltestelle ist hinter dem Laden.|L
左边|zuǒbian|links|n|A1|银行在左边。|Yínháng zài zuǒbian.|Die Bank ist links.|L
右边|yòubian|rechts|n|A1|洗手间在右边。|Xǐshǒujiān zài yòubian.|Die Toilette ist rechts.|L
旁边|pángbiān|neben, daneben|n|A1|他坐在我旁边。|Tā zuò zài wǒ pángbiān.|Er sitzt neben mir.|L
拐|guǎi|abbiegen|v|A2|到路口往右拐。|Dào lùkǒu wǎng yòu guǎi.|An der Kreuzung rechts abbiegen.|L
远|yuǎn|weit|adj|A1|离这儿远吗？|Lí zhèr yuǎn ma?|Ist es weit von hier?|L
近|jìn|nah (Adjektiv)|adj|A1|我家离公司很近。|Wǒ jiā lí gōngsī hěn jìn.|Mein Zuhause ist nah an der Firma.|L
迷路|mílù|sich verlaufen|v|A2|我迷路了。|Wǒ mílù le.|Ich habe mich verlaufen.|L
顺路|shùnlù|auf dem Weg liegen|adj|B1|我顺路送你回家。|Wǒ shùnlù sòng nǐ huíjiā.|Es liegt auf meinem Weg, ich bringe dich heim.|L
这儿|zhèr|hier|pron|A1|我在这儿等你。|Wǒ zài zhèr děng nǐ.|Ich warte hier auf dich.
那儿|nàr|dort|pron|A1
里面|lǐmiàn|drinnen, innen|n|A1
外面|wàimiàn|draußen|n|A1|外面在下雨。|Wàimiàn zài xiàyǔ.|Draußen regnet es.
上面|shàngmiàn|oben, auf|n|A1
下面|xiàmiàn|unten, unter|n|A1
中间|zhōngjiān|Mitte, zwischen|n|A2
对面|duìmiàn|gegenüber|n|A2|酒店在车站对面。|Jiǔdiàn zài chēzhàn duìmiàn.|Das Hotel ist gegenüber vom Bahnhof.
离|lí|entfernt von|prep|A2|酒店离机场不远。|Jiǔdiàn lí jīchǎng bù yuǎn.|Das Hotel ist nicht weit vom Flughafen.
往|wǎng|in Richtung|prep|A2|往前走。|Wǎng qián zǒu.|Geh geradeaus.
从|cóng|von, aus|prep|A1|从这儿到那儿要多久？|Cóng zhèr dào nàr yào duō jiǔ?|Wie lange dauert es von hier bis dort?
过|guò|überqueren; vorbeigehen|v|A2|过了红绿灯就到了。|Guòle hónglǜdēng jiù dào le.|Nach der Ampel bist du da.
路口|lùkǒu|Kreuzung|n|A2
红绿灯|hónglǜdēng|Ampel|n|A2
银行|yínháng|Bank|n|A2
公园|gōngyuán|Park|n|A1|我们去公园散步吧。|Wǒmen qù gōngyuán sànbù ba.|Lass uns im Park spazieren gehen.
洗手间|xǐshǒujiān|Toilette, WC|n|A1|请问，洗手间在哪儿？|Qǐngwèn, xǐshǒujiān zài nǎr?|Entschuldigung, wo ist die Toilette?
楼|lóu|Gebäude; Stockwerk|n|A2|我住在五楼。|Wǒ zhù zài wǔ lóu.|Ich wohne im fünften Stock.
门口|ménkǒu|Eingang|n|A2|我在门口等你。|Wǒ zài ménkǒu děng nǐ.|Ich warte am Eingang auf dich.
`,
};

export default part2;
