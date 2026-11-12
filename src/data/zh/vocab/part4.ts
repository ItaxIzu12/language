// Format: Wort | Pinyin | Deutsch | Wortart | Niveau | Beispiel | Beispiel-Pinyin | Beispiel-Deutsch | L
const part4: Record<string, string> = {
  health: `
感冒|gǎnmào|Erkältung; sich erkälten|v|A2|我感冒了。|Wǒ gǎnmào le.|Ich bin erkältet.|L
发烧|fāshāo|Fieber haben|v|A2|他发烧了，在家休息。|Tā fāshāo le, zài jiā xiūxi.|Er hat Fieber und ruht sich zu Hause aus.|L
咳嗽|késou|husten|v|A2|我咳嗽得很厉害。|Wǒ késou de hěn lìhai.|Ich huste sehr stark.|L
休息|xiūxi|sich ausruhen|v|A1|你多休息。|Nǐ duō xiūxi.|Ruh dich viel aus.|L
药|yào|Medizin|n|A2|你吃药了吗？|Nǐ chī yào le ma?|Hast du Medizin genommen?|L
看医生|kàn yīshēng|zum Arzt gehen|v|A2|你要不要去看医生？|Nǐ yào bu yào qù kàn yīshēng?|Willst du nicht zum Arzt gehen?|L
严重|yánzhòng|ernst, schlimm|adj|B1|严重吗？|Yánzhòng ma?|Ist es schlimm?|L
好点儿|hǎo diǎnr|etwas besser|phr|A2|你好点儿了吗？|Nǐ hǎo diǎnr le ma?|Geht es dir etwas besser?|L
保重|bǎozhòng|pass auf dich auf|v|B1|保重身体！|Bǎozhòng shēntǐ!|Pass auf deine Gesundheit auf!|L
早日康复|zǎorì kāngfù|gute Besserung|phr|B1|祝你早日康复！|Zhù nǐ zǎorì kāngfù!|Ich wünsche dir gute Besserung!|L
身体|shēntǐ|Körper; Gesundheit|n|A1|你身体怎么样？|Nǐ shēntǐ zěnmeyàng?|Wie geht es dir gesundheitlich?
健康|jiànkāng|gesund; Gesundheit|adj|A2|身体健康最重要。|Shēntǐ jiànkāng zuì zhòngyào.|Gesundheit ist das Wichtigste.
医院|yīyuàn|Krankenhaus|n|A1|我陪你去医院。|Wǒ péi nǐ qù yīyuàn.|Ich begleite dich ins Krankenhaus.
医生|yīshēng|Arzt, Ärztin|n|A1
生病|shēngbìng|krank werden|v|A2|他生病了，今天不来。|Tā shēngbìng le, jīntiān bù lái.|Er ist krank und kommt heute nicht.
疼|téng|wehtun|adj|A2|我头疼。|Wǒ tóu téng.|Ich habe Kopfschmerzen.
难受|nánshòu|sich elend fühlen|adj|B1|我嗓子很难受。|Wǒ sǎngzi hěn nánshòu.|Mein Hals fühlt sich übel an.
头|tóu|Kopf|n|A1
眼睛|yǎnjing|Auge|n|A1
手|shǒu|Hand|n|A1
脚|jiǎo|Fuß|n|A2
肚子|dùzi|Bauch|n|A2|我肚子疼。|Wǒ dùzi téng.|Ich habe Bauchschmerzen.
牙|yá|Zahn|n|A2
嗓子|sǎngzi|Hals, Rachen|n|B1
检查|jiǎnchá|untersuchen; Untersuchung|v|B1|医生说要检查一下。|Yīshēng shuō yào jiǎnchá yíxià.|Der Arzt sagt, man müsse das untersuchen.
药店|yàodiàn|Apotheke|n|A2|附近有药店吗？|Fùjìn yǒu yàodiàn ma?|Gibt es in der Nähe eine Apotheke?
受伤|shòushāng|sich verletzen|v|B1|他打球的时候受伤了。|Tā dǎqiú de shíhou shòushāng le.|Er hat sich beim Spielen verletzt.
减肥|jiǎnféi|abnehmen|v|B1|我在减肥。|Wǒ zài jiǎnféi.|Ich bin am Abnehmen.
睡不着|shuì bu zháo|nicht einschlafen können|phr|B1|我昨天晚上睡不着。|Wǒ zuótiān wǎnshang shuì bu zháo.|Ich konnte letzte Nacht nicht einschlafen.
口罩|kǒuzhào|Maske (Mundschutz)|n|B1
`,

  weather: `
天气|tiānqì|Wetter|n|A1|今天天气怎么样？|Jīntiān tiānqì zěnmeyàng?|Wie ist das Wetter heute?|L
下雨|xiàyǔ|regnen|v|A1|要下雨了。|Yào xiàyǔ le.|Es fängt gleich an zu regnen.|L
晴天|qíngtiān|sonniger Tag|n|A2|明天是晴天。|Míngtiān shì qíngtiān.|Morgen wird es sonnig.|L
阴天|yīntiān|bewölkter Tag|n|A2|今天是阴天。|Jīntiān shì yīntiān.|Heute ist es bewölkt.|L
刮风|guāfēng|windig sein|v|A2|外面在刮风。|Wàimiàn zài guāfēng.|Draußen ist es windig.|L
冷|lěng|kalt|adj|A1|今天比昨天冷。|Jīntiān bǐ zuótiān lěng.|Heute ist es kälter als gestern.|L
热|rè|heiß|adj|A1|今天热死了！|Jīntiān rè sǐ le!|Heute ist es mörderisch heiß!|L
暖和|nuǎnhuo|angenehm warm|adj|A2|今天很暖和。|Jīntiān hěn nuǎnhuo.|Heute ist es schön warm.|L
凉快|liángkuai|angenehm kühl|adj|A2|晚上凉快一点儿。|Wǎnshang liángkuai yìdiǎnr.|Abends ist es etwas kühler.
伞|sǎn|Regenschirm|n|A2|我忘了带伞。|Wǒ wàngle dài sǎn.|Ich habe den Schirm vergessen.|L
下雪|xiàxuě|schneien|v|A2|北京冬天会下雪。|Běijīng dōngtiān huì xiàxuě.|In Peking schneit es im Winter.
太阳|tàiyáng|Sonne|n|A2|今天太阳很大。|Jīntiān tàiyáng hěn dà.|Heute scheint die Sonne kräftig.
风|fēng|Wind|n|A2
云|yún|Wolke|n|A2
温度|wēndù|Temperatur|n|B1
度|dù|Grad|mw|A2|今天三十度。|Jīntiān sānshí dù.|Heute sind es dreißig Grad.
天气预报|tiānqì yùbào|Wettervorhersage|n|B1|天气预报说明天有雨。|Tiānqì yùbào shuō míngtiān yǒu yǔ.|Laut Wetterbericht regnet es morgen.
季节|jìjié|Jahreszeit|n|B1|你最喜欢哪个季节？|Nǐ zuì xǐhuan nǎge jìjié?|Welche Jahreszeit magst du am liebsten?
春天|chūntiān|Frühling|n|A2
夏天|xiàtiān|Sommer|n|A2|这里的夏天特别热。|Zhèlǐ de xiàtiān tèbié rè.|Der Sommer hier ist besonders heiß.
秋天|qiūtiān|Herbst|n|A2
冬天|dōngtiān|Winter|n|A2
潮湿|cháoshī|feucht, schwül|adj|B2
空气|kōngqì|Luft|n|B1|今天空气很好。|Jīntiān kōngqì hěn hǎo.|Heute ist die Luft sehr gut.
山|shān|Berg|n|A1
海|hǎi|Meer|n|A2|我想去看海。|Wǒ xiǎng qù kàn hǎi.|Ich möchte ans Meer.
河|hé|Fluss|n|A2
花|huā|Blume|n|A1
树|shù|Baum|n|A2
月亮|yuèliang|Mond|n|A2|今晚的月亮真圆。|Jīnwǎn de yuèliang zhēn yuán.|Der Mond ist heute Abend richtig rund.
`,

  verbs: `
想|xiǎng|möchten; denken; vermissen|v|A1|我想去中国。|Wǒ xiǎng qù Zhōngguó.|Ich möchte nach China.|L
要|yào|wollen; müssen; werden|v|A1|我要一杯咖啡。|Wǒ yào yì bēi kāfēi.|Ich möchte einen Kaffee.|L
会|huì|können (gelernt); werden|v|A1|我会说一点儿中文。|Wǒ huì shuō yìdiǎnr Zhōngwén.|Ich kann ein bisschen Chinesisch.|L
能|néng|können (möglich sein)|v|A1|你明天能来吗？|Nǐ míngtiān néng lái ma?|Kannst du morgen kommen?|L
可以|kěyǐ|dürfen, können|v|A1|我可以坐这儿吗？|Wǒ kěyǐ zuò zhèr ma?|Darf ich mich hierhin setzen?|L
应该|yīnggāi|sollte|v|A2|你应该多休息。|Nǐ yīnggāi duō xiūxi.|Du solltest dich mehr ausruhen.|L
需要|xūyào|brauchen|v|A2|你需要帮忙吗？|Nǐ xūyào bāngmáng ma?|Brauchst du Hilfe?|L
别|bié|nicht (Verbot): tu nicht|adv|A1|别忘了！|Bié wàng le!|Vergiss es nicht!|L
只能|zhǐ néng|nur können, bleibt nur|v|B1|没办法，只能改天了。|Méi bànfǎ, zhǐ néng gǎitiān le.|Nichts zu machen, dann eben ein andermal.|L
在|zài|sich befinden; gerade (Verlauf)|v|A1|我在看书呢。|Wǒ zài kànshū ne.|Ich lese gerade.|L
知道|zhīdào|wissen|v|A1|我不知道。|Wǒ bù zhīdào.|Ich weiß es nicht.|L
看|kàn|sehen, schauen, lesen|v|A1|我看看。|Wǒ kànkan.|Lass mich mal schauen.|L
听|tīng|hören|v|A1|听起来不错。|Tīng qǐlai búcuò.|Klingt gut.
说|shuō|sprechen, sagen|v|A1|请说慢一点儿。|Qǐng shuō màn yìdiǎnr.|Bitte sprich etwas langsamer.|L
读|dú|lesen (laut), vorlesen|v|A1
写|xiě|schreiben|v|A1|我不会写这个字。|Wǒ bú huì xiě zhège zì.|Ich kann dieses Zeichen nicht schreiben.
问|wèn|fragen|v|A1|我想问一下。|Wǒ xiǎng wèn yíxià.|Ich möchte mal kurz fragen.
回答|huídá|antworten|v|A2
叫|jiào|heißen; rufen|v|A1|我叫Phong。|Wǒ jiào Phong.|Ich heiße Phong.
做|zuò|machen, tun|v|A1|你在做什么？|Nǐ zài zuò shénme?|Was machst du gerade?|L
找|zhǎo|suchen|v|A1|我在找我的手机。|Wǒ zài zhǎo wǒ de shǒujī.|Ich suche mein Handy.|L
等|děng|warten|v|A1|等我五分钟。|Děng wǒ wǔ fēnzhōng.|Warte fünf Minuten auf mich.|L
用|yòng|benutzen|v|A1|我可以用一下吗？|Wǒ kěyǐ yòng yíxià ma?|Darf ich das mal benutzen?|L
给|gěi|geben; für, an|v|A1|请给我一杯水。|Qǐng gěi wǒ yì bēi shuǐ.|Gib mir bitte ein Glas Wasser.|L
拿|ná|nehmen, holen|v|A2|我去拿外卖。|Wǒ qù ná wàimài.|Ich hole das Essen ab.
放|fàng|legen, stellen|v|A2|放在桌子上吧。|Fàng zài zhuōzi shang ba.|Leg es auf den Tisch.
记得|jìde|sich erinnern, daran denken|v|A2|你还记得我吗？|Nǐ hái jìde wǒ ma?|Erinnerst du dich noch an mich?|L
忘|wàng|vergessen|v|A2|我忘了带钥匙。|Wǒ wàngle dài yàoshi.|Ich habe den Schlüssel vergessen.|L
发生|fāshēng|passieren, geschehen|v|B1|发生什么事了？|Fāshēng shénme shì le?|Was ist passiert?|L
遇到|yùdào|begegnen, stoßen auf|v|B1|我在路上遇到了老同学。|Wǒ zài lùshang yùdàole lǎo tóngxué.|Ich bin unterwegs einem alten Mitschüler begegnet.|L
值得|zhíde|sich lohnen, wert sein|v|B1|这部电影值得一看。|Zhè bù diànyǐng zhíde yí kàn.|Dieser Film ist sehenswert.|L
适合|shìhé|passen zu (Verb)|v|B1|这个颜色很适合你。|Zhège yánsè hěn shìhé nǐ.|Diese Farbe steht dir sehr gut.|L
学|xué|lernen|v|A1|我想学做中国菜。|Wǒ xiǎng xué zuò Zhōngguó cài.|Ich möchte lernen, chinesisch zu kochen.
教|jiāo|beibringen, unterrichten|v|A2|你能教我吗？|Nǐ néng jiāo wǒ ma?|Kannst du es mir beibringen?
让|ràng|lassen, veranlassen|v|A2|让我想一想。|Ràng wǒ xiǎng yi xiǎng.|Lass mich kurz überlegen.
站|zhàn|stehen|v|A2
跑|pǎo|rennen|v|A2
进|jìn|hineingehen|v|A1|请进！|Qǐng jìn!|Herein bitte!
出|chū|hinausgehen|v|A2
离开|líkāi|verlassen, weggehen|v|B1|他已经离开公司了。|Tā yǐjīng líkāi gōngsī le.|Er hat die Firma schon verlassen.
停|tíng|anhalten, stoppen|v|A2|雨停了。|Yǔ tíng le.|Der Regen hat aufgehört.
继续|jìxù|weitermachen|v|B1|我们继续吧。|Wǒmen jìxù ba.|Machen wir weiter.
变|biàn|sich verändern, werden|v|B1|天气变冷了。|Tiānqì biàn lěng le.|Das Wetter ist kalt geworden.
选|xuǎn|auswählen|v|B1|你帮我选一个吧。|Nǐ bāng wǒ xuǎn yí ge ba.|Hilf mir, eins auszusuchen.
发现|fāxiàn|entdecken, bemerken|v|B1|我发现了一家很好的餐厅。|Wǒ fāxiànle yì jiā hěn hǎo de cāntīng.|Ich habe ein sehr gutes Restaurant entdeckt.
了解|liǎojiě|sich auskennen, verstehen|v|B1|我不太了解这个情况。|Wǒ bú tài liǎojiě zhège qíngkuàng.|Ich kenne mich mit dieser Situation nicht so aus.
注意|zhùyì|aufpassen, beachten|v|B1|注意安全！|Zhùyì ānquán!|Pass auf dich auf!
坚持|jiānchí|durchhalten, dranbleiben|v|B1|学中文要坚持。|Xué Zhōngwén yào jiānchí.|Beim Chinesischlernen muss man dranbleiben.
放弃|fàngqì|aufgeben|v|B1|别放弃！|Bié fàngqì!|Gib nicht auf!
接受|jiēshòu|akzeptieren, annehmen|v|B1|我不能接受这个结果。|Wǒ bù néng jiēshòu zhège jiéguǒ.|Ich kann dieses Ergebnis nicht akzeptieren.
考虑|kǎolǜ|überlegen, in Betracht ziehen|v|B1|我考虑一下。|Wǒ kǎolǜ yíxià.|Ich überlege es mir.
解释|jiěshì|erklären|v|B1|你能解释一下吗？|Nǐ néng jiěshì yíxià ma?|Kannst du das kurz erklären?
讨论|tǎolùn|diskutieren|v|B1|我们明天再讨论。|Wǒmen míngtiān zài tǎolùn.|Wir besprechen das morgen weiter.
影响|yǐngxiǎng|beeinflussen; Einfluss|v|B1|这会影响你的健康。|Zhè huì yǐngxiǎng nǐ de jiànkāng.|Das wird deine Gesundheit beeinträchtigen.
提高|tígāo|verbessern, steigern|v|B1|我想提高我的中文水平。|Wǒ xiǎng tígāo wǒ de Zhōngwén shuǐpíng.|Ich möchte mein Chinesisch-Niveau verbessern.
表示|biǎoshì|ausdrücken, bedeuten|v|B2
`,

  adjectives: `
好看|hǎokàn|hübsch; sehenswert|adj|A1|这件衣服很好看。|Zhè jiàn yīfu hěn hǎokàn.|Dieses Kleidungsstück ist hübsch.|L
漂亮|piàoliang|schön, hübsch|adj|A1|你今天真漂亮。|Nǐ jīntiān zhēn piàoliang.|Du siehst heute wirklich hübsch aus.
帅|shuài|gutaussehend (Mann)|adj|A2
可爱|kě'ài|süß, niedlich|adj|A2|这只猫太可爱了！|Zhè zhī māo tài kě'ài le!|Diese Katze ist so süß!
快|kuài|schnell|adj|A1|你说得太快了。|Nǐ shuō de tài kuài le.|Du sprichst zu schnell.|L
慢|màn|langsam|adj|A1|请说慢一点儿。|Qǐng shuō màn yìdiǎnr.|Bitte sprich etwas langsamer.|L
慢慢|mànmàn|ganz in Ruhe, allmählich|adv|A2|慢慢吃，别急。|Mànmàn chī, bié jí.|Iss in Ruhe, keine Eile.|L
大|dà|groß|adj|A1|这个房间很大。|Zhège fángjiān hěn dà.|Dieses Zimmer ist groß.|L
小|xiǎo|klein|adj|A1|这个太小了。|Zhège tài xiǎo le.|Das ist zu klein.|L
多|duō|viel|adj|A1|今天人很多。|Jīntiān rén hěn duō.|Heute sind viele Leute da.
少|shǎo|wenig|adj|A1|少喝点儿酒。|Shǎo hē diǎnr jiǔ.|Trink weniger Alkohol.
新|xīn|neu|adj|A1|这是我的新手机。|Zhè shì wǒ de xīn shǒujī.|Das ist mein neues Handy.
旧|jiù|alt (Dinge)|adj|A2
长|cháng|lang|adj|A2
短|duǎn|kurz|adj|A2
高|gāo|hoch; groß (Person)|adj|A1|他比我高。|Tā bǐ wǒ gāo.|Er ist größer als ich.
矮|ǎi|klein (Körpergröße)|adj|A2
胖|pàng|dick|adj|A2
瘦|shòu|dünn, schlank|adj|A2
红|hóng|rot|adj|A1|我喜欢红色。|Wǒ xǐhuan hóngsè.|Ich mag Rot.|L
黑|hēi|schwarz|adj|A1|天黑了。|Tiān hēi le.|Es ist dunkel geworden.|L
白|bái|weiß|adj|A1|我想要白色的。|Wǒ xiǎng yào báisè de.|Ich möchte das in Weiß.|L
蓝|lán|blau|adj|A1
绿|lǜ|grün|adj|A1
黄|huáng|gelb|adj|A1
不错|búcuò|nicht schlecht, gut|adj|A1|听起来不错。|Tīng qǐlai búcuò.|Klingt gut.|L
棒|bàng|toll, super|adj|A2|你太棒了！|Nǐ tài bàng le!|Du bist super!
一样|yíyàng|gleich|adj|A2|我的手机跟你的一样。|Wǒ de shǒujī gēn nǐ de yíyàng.|Mein Handy ist genauso wie deins.|L
一般|yìbān|normalerweise; mittelmäßig|adj|A2|我一般七点起床。|Wǒ yìbān qī diǎn qǐchuáng.|Ich stehe normalerweise um sieben auf.|L
一般般|yìbānbān|so lala|adj|A2|味道一般般。|Wèidao yìbānbān.|Der Geschmack ist so lala.|L
差|chà|schlecht, mangelhaft|adj|A2|这家店的服务太差了。|Zhè jiā diàn de fúwù tài chà le.|Der Service in diesem Laden ist miserabel.|L
特别|tèbié|besonders|adv|A2|今天特别冷。|Jīntiān tèbié lěng.|Heute ist es besonders kalt.|L
明显|míngxiǎn|deutlich, offensichtlich|adj|B1|区别很明显。|Qūbié hěn míngxiǎn.|Der Unterschied ist deutlich.|L
简单|jiǎndān|einfach|adj|A2|这个问题很简单。|Zhège wèntí hěn jiǎndān.|Diese Frage ist sehr einfach.
难|nán|schwierig|adj|A2|中文难不难？|Zhōngwén nán bu nán?|Ist Chinesisch schwer?
容易|róngyì|leicht, einfach|adj|A2|学中文不容易。|Xué Zhōngwén bù róngyì.|Chinesisch lernen ist nicht leicht.
干净|gānjìng|sauber|adj|A2|房间很干净。|Fángjiān hěn gānjìng.|Das Zimmer ist sehr sauber.
脏|zāng|schmutzig|adj|A2
安静|ānjìng|ruhig, still|adj|A2|这里很安静。|Zhèlǐ hěn ānjìng.|Hier ist es sehr ruhig.
吵|chǎo|laut; streiten|adj|B1|外面太吵了。|Wàimiàn tài chǎo le.|Draußen ist es zu laut.
聪明|cōngming|klug|adj|A2
奇怪|qíguài|seltsam|adj|B1|真奇怪！|Zhēn qíguài!|Wirklich seltsam!
安全|ānquán|sicher; Sicherheit|adj|B1|这里很安全。|Zhèlǐ hěn ānquán.|Hier ist es sehr sicher.
危险|wēixiǎn|gefährlich|adj|B1
有名|yǒumíng|berühmt|adj|A2|这家餐厅很有名。|Zhè jiā cāntīng hěn yǒumíng.|Dieses Restaurant ist sehr bekannt.
正常|zhèngcháng|normal|adj|B1|这很正常。|Zhè hěn zhèngcháng.|Das ist ganz normal.
复杂|fùzá|kompliziert|adj|B1|这个问题有点儿复杂。|Zhège wèntí yǒudiǎnr fùzá.|Dieses Problem ist etwas kompliziert.
丰富|fēngfù|reichhaltig, vielfältig|adj|B2|他的经验很丰富。|Tā de jīngyàn hěn fēngfù.|Er hat reichlich Erfahrung.
流利|liúlì|fließend|adj|B1|她的中文说得很流利。|Tā de Zhōngwén shuō de hěn liúlì.|Sie spricht fließend Chinesisch.
`,

  connectors: `
很|hěn|sehr|adv|A1|我很好。|Wǒ hěn hǎo.|Mir geht's gut.|L
也|yě|auch|adv|A1|我也想去。|Wǒ yě xiǎng qù.|Ich möchte auch hin.|L
都|dōu|alle, beide|adv|A1|我们都喜欢吃辣。|Wǒmen dōu xǐhuan chī là.|Wir alle essen gern scharf.|L
还|hái|noch; außerdem|adv|A1|我还没吃饭。|Wǒ hái méi chīfàn.|Ich habe noch nicht gegessen.|L
太…了|tài … le|zu …; total …|phr|A1|太好了！|Tài hǎo le!|Super!|L
挺|tǐng|ziemlich, recht|adv|A2|这个挺好的。|Zhège tǐng hǎo de.|Das ist ziemlich gut.|L
非常|fēicháng|äußerst, sehr|adv|A2|我非常喜欢这个。|Wǒ fēicháng xǐhuan zhège.|Das mag ich wirklich sehr.|L
超|chāo|mega, super (ugs.)|adv|A2|这个超好吃！|Zhège chāo hǎochī!|Das ist megalecker!|L
简直|jiǎnzhí|geradezu, einfach|adv|B1|简直太棒了！|Jiǎnzhí tài bàng le!|Einfach großartig!|L
更|gèng|noch (mehr)|adv|A2|这个更便宜。|Zhège gèng piányi.|Das hier ist noch günstiger.|L
最|zuì|am meisten (Superlativ)|adv|A2|我最喜欢夏天。|Wǒ zuì xǐhuan xiàtiān.|Ich mag den Sommer am liebsten.|L
尤其|yóuqí|besonders, vor allem|adv|B1|我喜欢运动，尤其是羽毛球。|Wǒ xǐhuan yùndòng, yóuqí shì yǔmáoqiú.|Ich mag Sport, vor allem Badminton.|L
越来越|yuè lái yuè|immer (mehr)|adv|A2|天气越来越冷了。|Tiānqì yuè lái yuè lěng le.|Es wird immer kälter.|L
比|bǐ|als (Vergleich)|prep|A2|今天比昨天热。|Jīntiān bǐ zuótiān rè.|Heute ist es heißer als gestern.|L
比较|bǐjiào|relativ, ziemlich|adv|A2|今天比较忙。|Jīntiān bǐjiào máng.|Heute ist relativ viel los.
还是|háishi|oder (in Fragen); doch lieber|conj|A1|你喝茶还是咖啡？|Nǐ hē chá háishi kāfēi?|Trinkst du Tee oder Kaffee?|L
或者|huòzhě|oder (in Aussagen)|conj|A2|周六或者周日都行。|Zhōuliù huòzhě zhōurì dōu xíng.|Samstag oder Sonntag, beides geht.
和|hé|und (verbindet Nomen)|conj|A1|我和朋友一起去。|Wǒ hé péngyou yìqǐ qù.|Ich gehe mit einem Freund zusammen.
跟|gēn|mit; wie|prep|A1|我跟你一起去。|Wǒ gēn nǐ yìqǐ qù.|Ich gehe mit dir zusammen.
因为|yīnwèi|weil|conj|A1|因为下雨，我不去了。|Yīnwèi xiàyǔ, wǒ bú qù le.|Weil es regnet, gehe ich nicht mehr hin.|L
所以|suǒyǐ|deshalb|conj|A1|我感冒了，所以在家休息。|Wǒ gǎnmào le, suǒyǐ zài jiā xiūxi.|Ich bin erkältet, deshalb ruhe ich mich zu Hause aus.|L
但是|dànshì|aber|conj|A1|我想去，但是没时间。|Wǒ xiǎng qù, dànshì méi shíjiān.|Ich möchte hin, aber ich habe keine Zeit.|L
不过|búguò|allerdings, aber|conj|A2|很好吃，不过有点儿贵。|Hěn hǎochī, búguò yǒudiǎnr guì.|Sehr lecker, allerdings etwas teuer.
虽然|suīrán|obwohl|conj|A2|虽然很累，但是很开心。|Suīrán hěn lèi, dànshì hěn kāixīn.|Obwohl ich müde bin, bin ich glücklich.
而且|érqiě|und außerdem|conj|B1|这家店便宜，而且质量好。|Zhè jiā diàn piányi, érqiě zhìliàng hǎo.|Der Laden ist günstig und außerdem ist die Qualität gut.
如果|rúguǒ|wenn, falls|conj|A2|如果下雨，我们就改天去。|Rúguǒ xiàyǔ, wǒmen jiù gǎitiān qù.|Wenn es regnet, gehen wir ein andermal.
就|jiù|dann; schon; gleich|adv|A2|我很快就到。|Wǒ hěn kuài jiù dào.|Ich bin ganz schnell da.
才|cái|erst (später als erwartet)|adv|B1|他十点才来。|Tā shí diǎn cái lái.|Er kam erst um zehn.
只|zhǐ|nur|adv|A2|我只有十块钱。|Wǒ zhǐ yǒu shí kuài qián.|Ich habe nur zehn Yuan.
既然|jìrán|da nun mal, wenn schon|conj|B1|既然你不舒服，就别去了。|Jìrán nǐ bù shūfu, jiù bié qù le.|Da es dir nicht gut geht, geh einfach nicht hin.|L
到底|dàodǐ|eigentlich, letzten Endes|adv|B1|你到底去不去？|Nǐ dàodǐ qù bu qù?|Gehst du jetzt eigentlich hin oder nicht?|L
干脆|gāncuì|einfach, kurzerhand|adv|B1|太远了，干脆打车吧。|Tài yuǎn le, gāncuì dǎchē ba.|Zu weit – nehmen wir einfach ein Taxi.|L
千万|qiānwàn|auf jeden/keinen Fall (Mahnung)|adv|B1|千万别迟到！|Qiānwàn bié chídào!|Komm bloß nicht zu spät!|L
要不|yàobù|wie wär's, wenn …; sonst|conj|A2|要不我们改天去？|Yàobù wǒmen gǎitiān qù?|Wie wär's, wenn wir ein andermal gehen?|L
顺便|shùnbiàn|bei der Gelegenheit, nebenbei|adv|B1|你去超市的话，顺便帮我买瓶水。|Nǐ qù chāoshì dehuà, shùnbiàn bāng wǒ mǎi píng shuǐ.|Wenn du zum Supermarkt gehst, bring mir bitte Wasser mit.|L
其实|qíshí|eigentlich, in Wirklichkeit|adv|A2|其实我不太想去。|Qíshí wǒ bú tài xiǎng qù.|Eigentlich habe ich keine große Lust hinzugehen.|L
原来|yuánlái|ach so! (wie sich herausstellt); ursprünglich|adv|B1|原来是你啊！|Yuánlái shì nǐ a!|Ach, du bist das!|L
差点儿|chàdiǎnr|beinahe|adv|B1|我差点儿迟到了。|Wǒ chàdiǎnr chídào le.|Ich wäre fast zu spät gekommen.|L
好像|hǎoxiàng|anscheinend, es scheint|adv|A2|他好像不在家。|Tā hǎoxiàng bú zài jiā.|Er scheint nicht zu Hause zu sein.|L
可能|kěnéng|vielleicht, möglich|adv|A2|他可能迟到。|Tā kěnéng chídào.|Er kommt vielleicht zu spät.|L
也许|yěxǔ|vielleicht|adv|B1|也许明天会下雨。|Yěxǔ míngtiān huì xiàyǔ.|Vielleicht regnet es morgen.|L
一定|yídìng|bestimmt, unbedingt|adv|A2|我一定来！|Wǒ yídìng lái!|Ich komme auf jeden Fall!|L
当然|dāngrán|natürlich|adv|A1|当然可以！|Dāngrán kěyǐ!|Natürlich geht das!|L
真的|zhēn de|wirklich, echt|adv|A1|真的吗？|Zhēn de ma?|Wirklich?|L
最好|zuìhǎo|am besten (Rat)|adv|A2|你最好早点儿去。|Nǐ zuìhǎo zǎo diǎnr qù.|Du gehst am besten früh hin.|L
反正|fǎnzhèng|sowieso, jedenfalls|adv|B1|反正我有空，我陪你去。|Fǎnzhèng wǒ yǒu kòng, wǒ péi nǐ qù.|Ich habe sowieso Zeit, ich begleite dich.|L
呢|ne|Partikel: und …? / gerade|part|A1|我很好，你呢？|Wǒ hěn hǎo, nǐ ne?|Mir geht's gut, und dir?|L
吧|ba|Partikel: Vorschlag, Vermutung|part|A1|我们走吧。|Wǒmen zǒu ba.|Lass uns gehen.|L
吗|ma|Fragepartikel (Ja/Nein)|part|A1|你是德国人吗？|Nǐ shì Déguó rén ma?|Bist du Deutscher?
的|de|Partikel: Besitz, Attribut|part|A1|这是我的书。|Zhè shì wǒ de shū.|Das ist mein Buch.
了|le|Partikel: Abschluss, Veränderung|part|A1|我吃了。|Wǒ chī le.|Ich habe gegessen.
过|guo|Partikel: Erfahrung (schon mal)|part|A2|你去过中国吗？|Nǐ qùguo Zhōngguó ma?|Warst du schon mal in China?
着|zhe|Partikel: andauernder Zustand|part|B1|门开着。|Mén kāizhe.|Die Tür steht offen.
得|de|Partikel: Grad/Art und Weise|part|A2|你说得很好。|Nǐ shuō de hěn hǎo.|Du sprichst sehr gut.
把|bǎ|Partikel: Objekt vorziehen (把-Satz)|prep|B1|请把门关上。|Qǐng bǎ mén guānshang.|Bitte mach die Tür zu.
被|bèi|Passivmarker|prep|B1|我的快递被退了。|Wǒ de kuàidì bèi tuì le.|Mein Paket wurde zurückgeschickt.
为了|wèile|um zu, für|prep|B1|为了学中文，我每天听播客。|Wèile xué Zhōngwén, wǒ měi tiān tīng bōkè.|Um Chinesisch zu lernen, höre ich täglich Podcasts.
除了|chúle|außer|prep|B1|除了中文，我还会说英语。|Chúle Zhōngwén, wǒ hái huì shuō Yīngyǔ.|Außer Chinesisch spreche ich auch Englisch.
一边|yìbiān|während (gleichzeitig)|adv|B1|我一边吃饭一边看剧。|Wǒ yìbiān chīfàn yìbiān kàn jù.|Ich esse und schaue dabei Serie.
不但|búdàn|nicht nur|conj|B1|他不但会说中文，而且说得很好。|Tā búdàn huì shuō Zhōngwén, érqiě shuō de hěn hǎo.|Er kann nicht nur Chinesisch, er spricht es auch sehr gut.
比如|bǐrú|zum Beispiel|conj|B1|我喜欢运动，比如跑步和游泳。|Wǒ xǐhuan yùndòng, bǐrú pǎobù hé yóuyǒng.|Ich mag Sport, zum Beispiel Joggen und Schwimmen.
首先|shǒuxiān|zuerst, erstens|conj|B1
另外|lìngwài|außerdem, darüber hinaus|conj|B1
总之|zǒngzhī|kurz gesagt|conj|B2
因此|yīncǐ|daher|conj|B2
然而|rán'ér|jedoch|conj|B2
否则|fǒuzé|sonst, andernfalls|conj|B2|快点儿，否则要迟到了。|Kuài diǎnr, fǒuzé yào chídào le.|Beeil dich, sonst kommen wir zu spät.
即使|jíshǐ|selbst wenn|conj|B2|即使下雨，我也要去。|Jíshǐ xiàyǔ, wǒ yě yào qù.|Selbst wenn es regnet, gehe ich hin.
无论|wúlùn|egal ob/wie|conj|B2|无论多忙，我都会学习。|Wúlùn duō máng, wǒ dōu huì xuéxí.|Egal wie beschäftigt ich bin, ich lerne trotzdem.
关于|guānyú|über, bezüglich|prep|B1|我想问一个关于签证的问题。|Wǒ xiǎng wèn yí ge guānyú qiānzhèng de wèntí.|Ich habe eine Frage zum Visum.
通过|tōngguò|durch, mittels|prep|B2|我通过看剧学中文。|Wǒ tōngguò kàn jù xué Zhōngwén.|Ich lerne Chinesisch durch Serienschauen.
随着|suízhe|mit (einhergehend)|prep|B2
`,

  society: `
社会|shèhuì|Gesellschaft|n|B1
文化|wénhuà|Kultur|n|B1|我对中国文化很感兴趣。|Wǒ duì Zhōngguó wénhuà hěn gǎn xìngqù.|Ich interessiere mich sehr für die chinesische Kultur.
历史|lìshǐ|Geschichte|n|B1|中国有很长的历史。|Zhōngguó yǒu hěn cháng de lìshǐ.|China hat eine sehr lange Geschichte.
传统|chuántǒng|Tradition; traditionell|n|B1|这是中国的传统节日。|Zhè shì Zhōngguó de chuántǒng jiérì.|Das ist ein traditionelles chinesisches Fest.
现代|xiàndài|modern; Moderne|adj|B1
节日|jiérì|Feiertag, Fest|n|B1
春节|Chūnjié|Frühlingsfest (chin. Neujahr)|n|A2|春节你回家吗？|Chūnjié nǐ huíjiā ma?|Fährst du zum Frühlingsfest nach Hause?
世界|shìjiè|Welt|n|B1|我想去看看世界。|Wǒ xiǎng qù kànkan shìjiè.|Ich möchte die Welt sehen.
国际|guójì|international|adj|B1
经济|jīngjì|Wirtschaft|n|B1|经济发展得很快。|Jīngjì fāzhǎn de hěn kuài.|Die Wirtschaft entwickelt sich sehr schnell.
发展|fāzhǎn|sich entwickeln; Entwicklung|v|B1
市场|shìchǎng|Markt|n|B1
消费|xiāofèi|konsumieren; Konsum|v|B2
投资|tóuzī|investieren; Investition|v|B2
竞争|jìngzhēng|Wettbewerb, Konkurrenz|n|B2|这个行业竞争很激烈。|Zhège hángyè jìngzhēng hěn jīliè.|In dieser Branche ist der Wettbewerb sehr hart.
教育|jiàoyù|Bildung, Erziehung|n|B1
科技|kējì|Technologie|n|B1|科技改变了我们的生活。|Kējì gǎibiànle wǒmen de shēnghuó.|Technologie hat unser Leben verändert.
网络|wǎngluò|Netz, Internet|n|B1
信息|xìnxī|Information|n|B1
人工智能|réngōng zhìnéng|künstliche Intelligenz|n|B2|人工智能发展得越来越快。|Réngōng zhìnéng fāzhǎn de yuè lái yuè kuài.|KI entwickelt sich immer schneller.
环境|huánjìng|Umwelt; Umgebung|n|B1|这里的环境很好。|Zhèlǐ de huánjìng hěn hǎo.|Die Umgebung hier ist sehr schön.
保护|bǎohù|schützen|v|B1|我们应该保护环境。|Wǒmen yīnggāi bǎohù huánjìng.|Wir sollten die Umwelt schützen.
污染|wūrǎn|Verschmutzung|n|B2
节约|jiéyuē|sparen (Ressourcen)|v|B2
政府|zhèngfǔ|Regierung|n|B2
法律|fǎlǜ|Gesetz, Recht|n|B2
人口|rénkǒu|Bevölkerung|n|B2
原因|yuányīn|Grund, Ursache|n|B1|你知道原因吗？|Nǐ zhīdào yuányīn ma?|Kennst du den Grund?
情况|qíngkuàng|Situation, Lage|n|B1|现在情况怎么样？|Xiànzài qíngkuàng zěnmeyàng?|Wie ist die Lage jetzt?
条件|tiáojiàn|Bedingung, Voraussetzung|n|B1
方法|fāngfǎ|Methode|n|B1|这个学习方法很有用。|Zhège xuéxí fāngfǎ hěn yǒuyòng.|Diese Lernmethode ist sehr nützlich.
变化|biànhuà|Veränderung|n|B1|这几年变化很大。|Zhè jǐ nián biànhuà hěn dà.|In den letzten Jahren hat sich viel verändert.
观点|guāndiǎn|Standpunkt, Ansicht|n|B2|我同意你的观点。|Wǒ tóngyì nǐ de guāndiǎn.|Ich stimme deinem Standpunkt zu.
态度|tàidu|Einstellung, Haltung|n|B1|他的态度很好。|Tā de tàidu hěn hǎo.|Seine Einstellung ist sehr gut.
责任|zérèn|Verantwortung|n|B2
交流|jiāoliú|sich austauschen; Austausch|v|B1|我想多跟中国人交流。|Wǒ xiǎng duō gēn Zhōngguó rén jiāoliú.|Ich möchte mich mehr mit Chinesen austauschen.
沟通|gōutōng|kommunizieren|v|B2|沟通很重要。|Gōutōng hěn zhòngyào.|Kommunikation ist sehr wichtig.
合作|hézuò|zusammenarbeiten; Kooperation|v|B1
挑战|tiǎozhàn|Herausforderung|n|B2|这是一个很大的挑战。|Zhè shì yí ge hěn dà de tiǎozhàn.|Das ist eine große Herausforderung.
优势|yōushì|Vorteil, Stärke (im Wettbewerb)|n|B2
趋势|qūshì|Trend, Tendenz|n|B2
平衡|pínghéng|Gleichgewicht, Balance|n|B2|工作和生活要平衡。|Gōngzuò hé shēnghuó yào pínghéng.|Arbeit und Leben müssen im Gleichgewicht sein.
`,
};

export default part4;
