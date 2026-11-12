// Vocabulary blocks, one line per word:
//   Wort | Lesung (Pinyin) | Deutsch | Wortart | Niveau | Beispiel | Beispiel-Pinyin | Beispiel-Deutsch | L
// Wortart: n v adj adv pron num mw conj prep part phr int
// The trailing "L" marks words from Phong's tutoring course (optional).
// Example fields are optional. Lines starting with # are ignored.

const part1: Record<string, string> = {
  basics: `
我|wǒ|ich|pron|A1|我是德国人。|Wǒ shì Déguó rén.|Ich bin Deutscher.|L
你|nǐ|du|pron|A1|你好吗？|Nǐ hǎo ma?|Wie geht es dir?|L
他|tā|er|pron|A1|他是我的朋友。|Tā shì wǒ de péngyou.|Er ist mein Freund.|L
她|tā|sie|pron|A1|她很忙。|Tā hěn máng.|Sie ist beschäftigt.|L
我们|wǒmen|wir|pron|A1|我们一起去吧。|Wǒmen yìqǐ qù ba.|Lass uns zusammen gehen.
你们|nǐmen|ihr|pron|A1|你们好！|Nǐmen hǎo!|Hallo zusammen!
他们|tāmen|sie (Plural)|pron|A1|他们在吃饭。|Tāmen zài chīfàn.|Sie essen gerade.
这|zhè|dies, das hier|pron|A1|这是什么？|Zhè shì shénme?|Was ist das?
那|nà|das dort, jenes|pron|A1|那是我的手机。|Nà shì wǒ de shǒujī.|Das dort ist mein Handy.
谁|shéi|wer|pron|A1|他是谁？|Tā shì shéi?|Wer ist er?
哪儿|nǎr|wo|pron|A1|你在哪儿？|Nǐ zài nǎr?|Wo bist du?
你好|nǐ hǎo|Hallo|phr|A1|你好，我叫Phong。|Nǐ hǎo, wǒ jiào Phong.|Hallo, ich heiße Phong.|L
谢谢|xièxie|danke|phr|A1|谢谢你的帮忙。|Xièxie nǐ de bāngmáng.|Danke für deine Hilfe.|L
再见|zàijiàn|auf Wiedersehen|phr|A1|明天见，再见！|Míngtiān jiàn, zàijiàn!|Bis morgen, tschüss!|L
对不起|duìbuqǐ|Entschuldigung, es tut mir leid|phr|A1|对不起，我来晚了。|Duìbuqǐ, wǒ lái wǎn le.|Entschuldigung, ich bin zu spät.
是|shì|sein|v|A1|我是学生。|Wǒ shì xuésheng.|Ich bin Student.|L
不|bù|nicht|adv|A1|我不喝咖啡。|Wǒ bù hē kāfēi.|Ich trinke keinen Kaffee.|L
有|yǒu|haben; es gibt|v|A1|我有一个问题。|Wǒ yǒu yí ge wèntí.|Ich habe eine Frage.|L
没有|méiyǒu|nicht haben; es gibt nicht|v|A1|我没有时间。|Wǒ méiyǒu shíjiān.|Ich habe keine Zeit.
好|hǎo|gut|adj|A1|今天天气很好。|Jīntiān tiānqì hěn hǎo.|Heute ist das Wetter gut.|L
对|duì|richtig, stimmt|adj|A1|对，就是这个。|Duì, jiù shì zhège.|Stimmt, genau das.|L
行|xíng|okay, das geht|adj|A1|明天行吗？|Míngtiān xíng ma?|Geht es morgen?|L
好的|hǎo de|okay, in Ordnung|phr|A1|好的，没问题。|Hǎo de, méi wèntí.|Okay, kein Problem.|L
好吧|hǎo ba|na gut|phr|A1|好吧，听你的。|Hǎo ba, tīng nǐ de.|Na gut, wie du meinst.|L
好嘞|hǎo lei|alles klar! (locker)|phr|A2|好嘞，马上来！|Hǎo lei, mǎshàng lái!|Alles klar, komme sofort!|L
嗯|èn|mhm, ja|int|A1|嗯，我知道了。|Èn, wǒ zhīdào le.|Mhm, verstanden.|L
哈哈|hāhā|haha|int|A1|哈哈，太搞笑了！|Hāhā, tài gǎoxiào le!|Haha, zu witzig!|L
喂|wéi|hallo (am Telefon)|int|A1|喂，你好！|Wéi, nǐ hǎo!|Hallo? (Telefon)|L
请|qǐng|bitte; einladen|v|A1|请坐。|Qǐng zuò.|Bitte setz dich.|L
不好意思|bù hǎoyìsi|Entschuldigung, sorry (leicht)|phr|A1|不好意思，我迟到了。|Bù hǎoyìsi, wǒ chídào le.|Sorry, ich bin zu spät.|L
抱歉|bàoqiàn|Verzeihung (höflicher)|phr|A2|非常抱歉，耽误你的时间了。|Fēicháng bàoqiàn, dānwu nǐ de shíjiān le.|Verzeihung, dass ich deine Zeit gekostet habe.|L
客气|kèqi|höflich, förmlich|adj|A2|别客气！|Bié kèqi!|Keine Ursache!|L
没关系|méi guānxi|macht nichts|phr|A1|没关系，慢慢来。|Méi guānxi, mànmàn lái.|Macht nichts, lass dir Zeit.|L
没事儿|méi shìr|schon gut, nichts passiert|phr|A1|没事儿，别担心。|Méi shìr, bié dānxīn.|Schon gut, keine Sorge.|L
没问题|méi wèntí|kein Problem|phr|A1|明天见面？没问题！|Míngtiān jiànmiàn? Méi wèntí!|Morgen treffen? Kein Problem!|L
拜托|bàituō|ich bitte dich; bitte!|v|A2|拜托你帮我一下。|Bàituō nǐ bāng wǒ yíxià.|Bitte hilf mir kurz.|L
麻烦|máfan|Umstände machen; lästig|v|A2|麻烦你等一下。|Máfan nǐ děng yíxià.|Könntest du bitte kurz warten?|L
稍等|shāo děng|einen Moment bitte|phr|A2|请稍等。|Qǐng shāo děng.|Einen Moment bitte.|L
打扰|dǎrǎo|stören|v|A2|不好意思，打扰一下。|Bù hǎoyìsi, dǎrǎo yíxià.|Entschuldigung, darf ich kurz stören?|L
加油|jiāyóu|Auf geht's! Du schaffst das!|phr|A1|明天考试，加油！|Míngtiān kǎoshì, jiāyóu!|Morgen Prüfung – du schaffst das!|L
好久不见|hǎojiǔ bú jiàn|lange nicht gesehen|phr|A2|好久不见，你最近怎么样？|Hǎojiǔ bú jiàn, nǐ zuìjìn zěnmeyàng?|Lange nicht gesehen, wie geht's dir so?|L
什么|shénme|was|pron|A1|你想吃什么？|Nǐ xiǎng chī shénme?|Was möchtest du essen?|L
怎么|zěnme|wie|pron|A1|这个怎么用？|Zhège zěnme yòng?|Wie benutzt man das?|L
为什么|wèishénme|warum|pron|A1|你为什么不来？|Nǐ wèishénme bù lái?|Warum kommst du nicht?|L
怎么了|zěnme le|was ist los?|phr|A1|你怎么了？|Nǐ zěnme le?|Was ist los mit dir?|L
怎么样|zěnmeyàng|wie (ist es)?|pron|A1|这个怎么样？|Zhège zěnmeyàng?|Wie ist das?
真的假的|zhēn de jiǎ de|echt jetzt?!|phr|A2|真的假的？我不信！|Zhēn de jiǎ de? Wǒ bú xìn!|Echt jetzt? Glaub ich nicht!|L
`,

  people: `
人|rén|Mensch, Person|n|A1|这里人很多。|Zhèlǐ rén hěn duō.|Hier sind viele Leute.|L
朋友|péngyou|Freund/in|n|A1|我跟朋友去吃饭。|Wǒ gēn péngyou qù chīfàn.|Ich gehe mit Freunden essen.|L
妈妈|māma|Mama|n|A1|我妈妈做饭很好吃。|Wǒ māma zuòfàn hěn hǎochī.|Meine Mama kocht sehr lecker.
爸爸|bàba|Papa|n|A1|爸爸在上班。|Bàba zài shàngbān.|Papa ist bei der Arbeit.
父母|fùmǔ|Eltern|n|A2|我父母住在德国。|Wǒ fùmǔ zhù zài Déguó.|Meine Eltern wohnen in Deutschland.
哥哥|gēge|älterer Bruder|n|A1
姐姐|jiějie|ältere Schwester|n|A1
弟弟|dìdi|jüngerer Bruder|n|A1
妹妹|mèimei|jüngere Schwester|n|A1
孩子|háizi|Kind|n|A1|他们有两个孩子。|Tāmen yǒu liǎng ge háizi.|Sie haben zwei Kinder.
儿子|érzi|Sohn|n|A2
女儿|nǚ'ér|Tochter|n|A2
家人|jiārén|Familie, Angehörige|n|A2|周末我陪家人。|Zhōumò wǒ péi jiārén.|Am Wochenende bin ich bei der Familie.
老公|lǎogōng|Ehemann (ugs.)|n|A2
老婆|lǎopo|Ehefrau (ugs.)|n|A2
男朋友|nánpéngyou|fester Freund|n|A1
女朋友|nǚpéngyou|feste Freundin|n|A1
同事|tóngshì|Kollege/Kollegin|n|A2|我同事人很好。|Wǒ tóngshì rén hěn hǎo.|Meine Kollegen sind sehr nett.
同学|tóngxué|Mitschüler, Kommilitone|n|A1
老师|lǎoshī|Lehrer/in|n|A1|老师说得很慢。|Lǎoshī shuō de hěn màn.|Der Lehrer spricht sehr langsam.
学生|xuésheng|Schüler, Student|n|A1
邻居|línjū|Nachbar|n|A2
先生|xiānsheng|Herr|n|A1
大家|dàjiā|alle|pron|A1|大家好！|Dàjiā hǎo!|Hallo zusammen!
自己|zìjǐ|selbst|pron|A2|我想自己看。|Wǒ xiǎng zìjǐ kàn.|Ich möchte es selbst sehen.
别人|biérén|andere Leute|pron|A2
名字|míngzi|Name|n|A1|你叫什么名字？|Nǐ jiào shénme míngzi?|Wie heißt du?
认识|rènshi|kennen, kennenlernen|v|A1|很高兴认识你。|Hěn gāoxìng rènshi nǐ.|Freut mich, dich kennenzulernen.
介绍|jièshào|vorstellen|v|A2|我来介绍一下。|Wǒ lái jièshào yíxià.|Ich stelle mal kurz vor.
关系|guānxi|Beziehung, Verhältnis|n|B1|我们的关系很好。|Wǒmen de guānxi hěn hǎo.|Wir haben ein gutes Verhältnis.
约会|yuēhuì|Date, Verabredung|n|A2|我今天晚上有约会。|Wǒ jīntiān wǎnshang yǒu yuēhuì.|Ich habe heute Abend ein Date.|L
陪|péi|begleiten, Gesellschaft leisten|v|A2|你能陪我去买东西吗？|Nǐ néng péi wǒ qù mǎi dōngxi ma?|Kannst du mich zum Einkaufen begleiten?|L
`,

  numbers: `
一|yī|eins|num|A1
二|èr|zwei|num|A1
两|liǎng|zwei (vor Zählwort)|num|A1|我要两杯咖啡。|Wǒ yào liǎng bēi kāfēi.|Ich möchte zwei Kaffee.
三|sān|drei|num|A1
四|sì|vier|num|A1
五|wǔ|fünf|num|A1
六|liù|sechs|num|A1
七|qī|sieben|num|A1
八|bā|acht|num|A1
九|jiǔ|neun|num|A1
十|shí|zehn|num|A1
百|bǎi|hundert|num|A1|这个一百块。|Zhège yìbǎi kuài.|Das kostet hundert Yuan.
千|qiān|tausend|num|A2
万|wàn|zehntausend|num|A2
零|líng|null|num|A1
半|bàn|halb|num|A1|现在三点半。|Xiànzài sān diǎn bàn.|Es ist halb vier.
第一|dì-yī|erste/r|num|A2|这是我第一次来中国。|Zhè shì wǒ dì-yī cì lái Zhōngguó.|Das ist mein erstes Mal in China.
多少|duōshao|wie viel|pron|A1|这个多少钱？|Zhège duōshao qián?|Wie viel kostet das?|L
几|jǐ|wie viele (kleine Zahl)|pron|A1|现在几点？|Xiànzài jǐ diǎn?|Wie spät ist es?|L
一点儿|yìdiǎnr|ein bisschen (nach Adj./Verb)|num|A1|便宜一点儿吧。|Piányi yìdiǎnr ba.|Mach's ein bisschen billiger.|L
有点儿|yǒudiǎnr|etwas, ein wenig (vor Adj., negativ)|adv|A1|这个有点儿贵。|Zhège yǒudiǎnr guì.|Das ist etwas teuer.|L
一下|yíxià|mal kurz|num|A1|等一下。|Děng yíxià.|Warte mal kurz.|L
一些|yìxiē|einige, ein paar|num|A2|我买了一些水果。|Wǒ mǎile yìxiē shuǐguǒ.|Ich habe etwas Obst gekauft.
差不多|chàbuduō|ungefähr, fast gleich|adv|A2|我们差不多到了。|Wǒmen chàbuduō dào le.|Wir sind fast da.|L
大概|dàgài|ungefähr, wahrscheinlich|adv|A2|大概十分钟。|Dàgài shí fēnzhōng.|Ungefähr zehn Minuten.|L
至少|zhìshǎo|mindestens|adv|B1|至少要等半个小时。|Zhìshǎo yào děng bàn ge xiǎoshí.|Man muss mindestens eine halbe Stunde warten.|L
个|gè|allgemeines Zählwort|mw|A1|一个人|yí ge rén|eine Person
件|jiàn|Zählwort für Kleidung, Angelegenheiten|mw|A1|这件衣服很好看。|Zhè jiàn yīfu hěn hǎokàn.|Dieses Kleidungsstück ist hübsch.|L
双|shuāng|Paar (Zählwort)|mw|A1|我买了一双鞋。|Wǒ mǎile yì shuāng xié.|Ich habe ein Paar Schuhe gekauft.|L
块|kuài|Yuan (ugs.); Stück|mw|A1|一共三十块。|Yígòng sānshí kuài.|Insgesamt dreißig Yuan.|L
份|fèn|Portion (Zählwort)|mw|A2|我点了一份外卖。|Wǒ diǎnle yí fèn wàimài.|Ich habe eine Portion Essen bestellt.|L
杯|bēi|Tasse, Glas (Zählwort)|mw|A1|一杯水|yì bēi shuǐ|ein Glas Wasser
本|běn|Zählwort für Bücher|mw|A1|一本书|yì běn shū|ein Buch
张|zhāng|Zählwort für flache Dinge (Ticket, Foto)|mw|A2|两张机票|liǎng zhāng jīpiào|zwei Flugtickets
把|bǎ|Zählwort für Dinge mit Griff|mw|A2|一把伞|yì bǎ sǎn|ein Regenschirm
条|tiáo|Zählwort für lange Dinge, Nachrichten|mw|A2|发一条朋友圈|fā yì tiáo péngyouquān|einen Moments-Post machen
部|bù|Zählwort für Filme, Serien|mw|B1|这部剧很火。|Zhè bù jù hěn huǒ.|Diese Serie ist total angesagt.
集|jí|Folge, Episode (Zählwort)|mw|B1|我看了两集。|Wǒ kànle liǎng jí.|Ich habe zwei Folgen geschaut.
次|cì|Mal (Zählwort)|mw|A1|我去过一次。|Wǒ qùguo yí cì.|Ich war einmal dort.
号|hào|Nummer; Größe; Tag (Datum)|n|A1|你穿多大号？|Nǐ chuān duō dà hào?|Welche Größe trägst du?|L
`,

  time: `
现在|xiànzài|jetzt|n|A1|我现在很忙。|Wǒ xiànzài hěn máng.|Ich bin gerade sehr beschäftigt.|L
时间|shíjiān|Zeit|n|A1|你有时间吗？|Nǐ yǒu shíjiān ma?|Hast du Zeit?|L
今天|jīntiān|heute|n|A1|今天我不上班。|Jīntiān wǒ bú shàngbān.|Heute arbeite ich nicht.|L
明天|míngtiān|morgen|n|A1|明天见！|Míngtiān jiàn!|Bis morgen!|L
昨天|zuótiān|gestern|n|A1|昨天我很累。|Zuótiān wǒ hěn lèi.|Gestern war ich sehr müde.|L
时候|shíhou|Zeitpunkt; wenn, als|n|A1|你什么时候来？|Nǐ shénme shíhou lái?|Wann kommst du?|L
一会儿|yíhuìr|ein Weilchen; gleich|n|A1|我一会儿给你打电话。|Wǒ yíhuìr gěi nǐ dǎ diànhuà.|Ich rufe dich gleich an.|L
周末|zhōumò|Wochenende|n|A1|周末你有空吗？|Zhōumò nǐ yǒu kòng ma?|Hast du am Wochenende Zeit?|L
点|diǎn|Uhr (Stunde)|mw|A1|我们七点见面。|Wǒmen qī diǎn jiànmiàn.|Wir treffen uns um sieben.|L
分钟|fēnzhōng|Minute|n|A1|走路十分钟。|Zǒulù shí fēnzhōng.|Zehn Minuten zu Fuß.|L
小时|xiǎoshí|Stunde|n|A1|我等了一个小时。|Wǒ děngle yí ge xiǎoshí.|Ich habe eine Stunde gewartet.
刚才|gāngcái|gerade eben|n|A2|刚才谁来了？|Gāngcái shéi lái le?|Wer war gerade da?|L
马上|mǎshàng|sofort, gleich|adv|A1|我马上到。|Wǒ mǎshàng dào.|Ich bin gleich da.|L
已经|yǐjīng|schon, bereits|adv|A1|我已经吃了。|Wǒ yǐjīng chī le.|Ich habe schon gegessen.|L
最近|zuìjìn|in letzter Zeit|n|A2|你最近怎么样？|Nǐ zuìjìn zěnmeyàng?|Wie geht's dir in letzter Zeit?|L
后来|hòulái|später, danach (Vergangenheit)|n|A2|后来呢？|Hòulái ne?|Und dann?|L
突然|tūrán|plötzlich|adv|A2|突然下雨了。|Tūrán xiàyǔ le.|Plötzlich hat es geregnet.|L
终于|zhōngyú|endlich|adv|A2|我终于到了！|Wǒ zhōngyú dào le!|Ich bin endlich da!|L
改天|gǎitiān|ein andermal|adv|A2|改天再约吧。|Gǎitiān zài yuē ba.|Lass uns ein andermal verabreden.|L
临时|línshí|kurzfristig, vorübergehend|adv|B1|我临时有事儿。|Wǒ línshí yǒu shìr.|Mir ist kurzfristig etwas dazwischengekommen.|L
提前|tíqián|im Voraus, vorher|adv|A2|请提前告诉我。|Qǐng tíqián gàosu wǒ.|Sag mir bitte vorher Bescheid.|L
准时|zhǔnshí|pünktlich|adj|A2|他总是很准时。|Tā zǒngshì hěn zhǔnshí.|Er ist immer pünktlich.|L
迟到|chídào|zu spät kommen|v|A2|对不起，我迟到了。|Duìbuqǐ, wǒ chídào le.|Entschuldigung, ich bin zu spät.|L
到时候|dào shíhou|wenn es so weit ist|phr|A2|到时候再说吧。|Dào shíhou zài shuō ba.|Das sehen wir, wenn es so weit ist.|L
随时|suíshí|jederzeit|adv|A2|你随时可以找我。|Nǐ suíshí kěyǐ zhǎo wǒ.|Du kannst dich jederzeit melden.|L
经常|jīngcháng|oft|adv|A2|我经常打羽毛球。|Wǒ jīngcháng dǎ yǔmáoqiú.|Ich spiele oft Badminton.|L
平时|píngshí|normalerweise, im Alltag|n|A2|你平时做什么？|Nǐ píngshí zuò shénme?|Was machst du normalerweise?|L
尽快|jǐnkuài|so schnell wie möglich|adv|B1|我会尽快回复你。|Wǒ huì jǐnkuài huífù nǐ.|Ich antworte dir so schnell wie möglich.|L
一直|yìzhí|immer(zu); geradeaus|adv|A2|一直走，然后往左拐。|Yìzhí zǒu, ránhòu wǎng zuǒ guǎi.|Immer geradeaus, dann links abbiegen.|L
先|xiān|zuerst|adv|A1|我先走了。|Wǒ xiān zǒu le.|Ich gehe schon mal.|L
然后|ránhòu|dann, danach|conj|A1|先吃饭，然后看电影。|Xiān chīfàn, ránhòu kàn diànyǐng.|Erst essen, dann einen Film schauen.|L
再|zài|wieder, noch einmal (Zukunft); dann|adv|A1|请再说一遍。|Qǐng zài shuō yí biàn.|Bitte sag es noch einmal.|L
又|yòu|wieder (schon geschehen)|adv|A2|他又迟到了。|Tā yòu chídào le.|Er ist schon wieder zu spät.
早上|zǎoshang|früher Morgen|n|A1|早上好！|Zǎoshang hǎo!|Guten Morgen!
上午|shàngwǔ|Vormittag|n|A1
中午|zhōngwǔ|Mittag|n|A1|中午一起吃饭吧。|Zhōngwǔ yìqǐ chīfàn ba.|Lass uns mittags zusammen essen.
下午|xiàwǔ|Nachmittag|n|A1
晚上|wǎnshang|Abend|n|A1|晚上你有空吗？|Wǎnshang nǐ yǒu kòng ma?|Hast du abends Zeit?
星期|xīngqī|Woche; Wochentag|n|A1|今天星期几？|Jīntiān xīngqī jǐ?|Welcher Wochentag ist heute?
月|yuè|Monat|n|A1|我十一月去中国。|Wǒ shíyī yuè qù Zhōngguó.|Ich fahre im November nach China.
年|nián|Jahr|n|A1
天|tiān|Tag|n|A1|我每天学中文。|Wǒ měi tiān xué Zhōngwén.|Ich lerne jeden Tag Chinesisch.
每天|měi tiān|jeden Tag|adv|A1
今年|jīnnián|dieses Jahr|n|A1
去年|qùnián|letztes Jahr|n|A1
明年|míngnián|nächstes Jahr|n|A1
以前|yǐqián|früher, vorher|n|A2|我以前住在这儿。|Wǒ yǐqián zhù zài zhèr.|Ich habe früher hier gewohnt.
以后|yǐhòu|später, nach|n|A2|下班以后我去找你。|Xiàbān yǐhòu wǒ qù zhǎo nǐ.|Nach der Arbeit komme ich zu dir.
生日|shēngrì|Geburtstag|n|A1|生日快乐！|Shēngrì kuàilè!|Alles Gute zum Geburtstag!
早|zǎo|früh|adj|A1|早点儿睡吧。|Zǎo diǎnr shuì ba.|Geh früh schlafen.
晚|wǎn|spät|adj|A1|太晚了，我要回家。|Tài wǎn le, wǒ yào huíjiā.|Es ist zu spät, ich muss nach Hause.
总是|zǒngshì|immer|adv|A2|他总是很忙。|Tā zǒngshì hěn máng.|Er ist immer beschäftigt.
有时候|yǒu shíhou|manchmal|adv|A2|我有时候自己做饭。|Wǒ yǒu shíhou zìjǐ zuòfàn.|Manchmal koche ich selbst.
从来|cónglái|noch nie (mit 不/没)|adv|B1|我从来没去过。|Wǒ cónglái méi qùguo.|Ich war noch nie dort.
`,
};

export default part1;
