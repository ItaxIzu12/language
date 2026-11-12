// Format: Wort | Pinyin | Deutsch | Wortart | Niveau | Beispiel | Beispiel-Pinyin | Beispiel-Deutsch | L
const part3: Record<string, string> = {
  home: `
家|jiā|Zuhause; Familie|n|A1|我在家。|Wǒ zài jiā.|Ich bin zu Hause.|L
起床|qǐchuáng|aufstehen|v|A1|我每天七点起床。|Wǒ měi tiān qī diǎn qǐchuáng.|Ich stehe jeden Tag um sieben auf.|L
睡觉|shuìjiào|schlafen|v|A1|我要去睡觉了。|Wǒ yào qù shuìjiào le.|Ich gehe jetzt schlafen.|L
回家|huíjiā|nach Hause gehen|v|A1|我下班就回家。|Wǒ xiàbān jiù huíjiā.|Nach der Arbeit gehe ich direkt nach Hause.|L
借|jiè|leihen, ausleihen|v|A2|我可以跟你借充电器吗？|Wǒ kěyǐ gēn nǐ jiè chōngdiànqì ma?|Kann ich mir dein Ladegerät leihen?|L
还|huán|zurückgeben|v|A2|我明天把书还给你。|Wǒ míngtiān bǎ shū huán gěi nǐ.|Ich gebe dir das Buch morgen zurück.|L
带|dài|mitnehmen, dabeihaben|v|A2|记得带伞。|Jìde dài sǎn.|Denk daran, einen Schirm mitzunehmen.|L
房子|fángzi|Haus, Wohnung|n|A2|他们买了新房子。|Tāmen mǎile xīn fángzi.|Sie haben eine neue Wohnung gekauft.
房间|fángjiān|Zimmer|n|A1|我的房间很小。|Wǒ de fángjiān hěn xiǎo.|Mein Zimmer ist sehr klein.
厨房|chúfáng|Küche|n|A2
床|chuáng|Bett|n|A1
门|mén|Tür|n|A1|请关门。|Qǐng guān mén.|Bitte mach die Tür zu.
桌子|zhuōzi|Tisch|n|A1
椅子|yǐzi|Stuhl|n|A1
钥匙|yàoshi|Schlüssel|n|A2|我找不到钥匙了。|Wǒ zhǎo bu dào yàoshi le.|Ich finde den Schlüssel nicht mehr.
灯|dēng|Lampe, Licht|n|A2
空调|kōngtiáo|Klimaanlage|n|A2|太热了，开空调吧。|Tài rè le, kāi kōngtiáo ba.|Es ist zu heiß, mach die Klimaanlage an.
冰箱|bīngxiāng|Kühlschrank|n|A2
开|kāi|öffnen; einschalten|v|A1|请开一下门。|Qǐng kāi yíxià mén.|Bitte mach mal die Tür auf.
关|guān|schließen; ausschalten|v|A1|别忘了关灯。|Bié wàngle guān dēng.|Vergiss nicht, das Licht auszumachen.
洗|xǐ|waschen|v|A1|我去洗衣服。|Wǒ qù xǐ yīfu.|Ich gehe Wäsche waschen.
洗澡|xǐzǎo|duschen, baden|v|A2|我先去洗澡。|Wǒ xiān qù xǐzǎo.|Ich gehe erst mal duschen.
打扫|dǎsǎo|putzen|v|A2|周末我打扫房间。|Zhōumò wǒ dǎsǎo fángjiān.|Am Wochenende putze ich mein Zimmer.
收拾|shōushi|aufräumen; packen|v|A2|我在收拾行李。|Wǒ zài shōushi xíngli.|Ich packe gerade meine Koffer.
穿|chuān|anziehen, tragen (Kleidung)|v|A1|今天多穿点儿。|Jīntiān duō chuān diǎnr.|Zieh dich heute wärmer an.
戴|dài|tragen (Accessoires: Brille, Hut, Uhr)|v|A2|他戴着眼镜。|Tā dàizhe yǎnjìng.|Er trägt eine Brille.
租|zū|mieten|v|B1|我在租房子。|Wǒ zài zū fángzi.|Ich bin dabei, eine Wohnung zu mieten.
搬家|bānjiā|umziehen|v|B1|我下个月搬家。|Wǒ xià ge yuè bānjiā.|Ich ziehe nächsten Monat um.
垃圾|lājī|Müll|n|B1
生活|shēnghuó|Leben; leben|n|A2|我喜欢这里的生活。|Wǒ xǐhuan zhèlǐ de shēnghuó.|Ich mag das Leben hier.
习惯|xíguàn|Gewohnheit; sich gewöhnen|n|B1|我已经习惯了。|Wǒ yǐjīng xíguàn le.|Ich habe mich schon daran gewöhnt.
`,

  work: `
工作|gōngzuò|Arbeit; arbeiten|n|A1|你做什么工作？|Nǐ zuò shénme gōngzuò?|Was arbeitest du?|L
忙|máng|beschäftigt|adj|A1|我最近很忙。|Wǒ zuìjìn hěn máng.|Ich bin in letzter Zeit sehr beschäftigt.|L
上班|shàngbān|zur Arbeit gehen, arbeiten|v|A1|我九点上班。|Wǒ jiǔ diǎn shàngbān.|Ich fange um neun an zu arbeiten.|L
下班|xiàbān|Feierabend machen|v|A1|你几点下班？|Nǐ jǐ diǎn xiàbān?|Wann hast du Feierabend?|L
问题|wèntí|Frage; Problem|n|A1|我有一个问题。|Wǒ yǒu yí ge wèntí.|Ich habe eine Frage.|L
事儿|shìr|Sache, Angelegenheit|n|A1|你找我有什么事儿？|Nǐ zhǎo wǒ yǒu shénme shìr?|Was gibt's, weshalb suchst du mich?|L
帮|bāng|helfen|v|A1|你能帮我吗？|Nǐ néng bāng wǒ ma?|Kannst du mir helfen?|L
帮忙|bāngmáng|helfen, aushelfen|v|A1|谢谢你的帮忙。|Xièxie nǐ de bāngmáng.|Danke für deine Hilfe.|L
帮个忙|bāng ge máng|einen Gefallen tun|phr|A2|能帮个忙吗？|Néng bāng ge máng ma?|Kannst du mir einen Gefallen tun?|L
约|yuē|sich verabreden|v|A2|我们约个时间吧。|Wǒmen yuē ge shíjiān ba.|Lass uns einen Termin ausmachen.|L
见面|jiànmiàn|sich treffen|v|A1|我们在哪儿见面？|Wǒmen zài nǎr jiànmiàn?|Wo treffen wir uns?|L
有空|yǒu kòng|Zeit haben|v|A1|你明天有空吗？|Nǐ míngtiān yǒu kòng ma?|Hast du morgen Zeit?|L
方便|fāngbiàn|praktisch; passend|adj|A2|你什么时候方便？|Nǐ shénme shíhou fāngbiàn?|Wann passt es dir?|L
说定了|shuōdìng le|abgemacht!|phr|A2|那就周六，说定了！|Nà jiù zhōuliù, shuōdìng le!|Dann Samstag – abgemacht!|L
计划|jìhuà|Plan; planen|n|A2|你周末有什么计划？|Nǐ zhōumò yǒu shénme jìhuà?|Was hast du am Wochenende vor?|L
安排|ānpái|arrangieren, einplanen|v|B1|我来安排时间。|Wǒ lái ānpái shíjiān.|Ich kümmere mich um die Zeitplanung.|L
改|gǎi|ändern|v|A2|我们把时间改到三点吧。|Wǒmen bǎ shíjiān gǎidào sān diǎn ba.|Verlegen wir die Zeit auf drei Uhr.|L
换|huàn|wechseln, tauschen|v|A2|我想换一个大一点儿的。|Wǒ xiǎng huàn yí ge dà yìdiǎnr de.|Ich möchte es gegen ein größeres tauschen.|L
推迟|tuīchí|verschieben (nach hinten)|v|B1|会议推迟到明天了。|Huìyì tuīchí dào míngtiān le.|Das Meeting wurde auf morgen verschoben.|L
取消|qǔxiāo|absagen, stornieren|v|B1|比赛取消了。|Bǐsài qǔxiāo le.|Das Spiel wurde abgesagt.|L
确定|quèdìng|festlegen; sicher sein|v|B1|时间确定了吗？|Shíjiān quèdìng le ma?|Steht die Zeit fest?|L
商量|shāngliang|besprechen, sich beraten|v|B1|我们商量一下吧。|Wǒmen shāngliang yíxià ba.|Lass uns das kurz besprechen.|L
合适|héshì|passend, geeignet (Adj.)|adj|A2|这个时间不太合适。|Zhège shíjiān bú tài héshì.|Diese Zeit passt nicht so gut.|L
重要|zhòngyào|wichtig|adj|A2|这件事很重要。|Zhè jiàn shì hěn zhòngyào.|Diese Sache ist sehr wichtig.|L
主要|zhǔyào|hauptsächlich|adj|B1|主要问题是时间不够。|Zhǔyào wèntí shì shíjiān bú gòu.|Das Hauptproblem ist, dass die Zeit nicht reicht.|L
通知|tōngzhī|benachrichtigen; Mitteilung|v|B1|有消息我通知你。|Yǒu xiāoxi wǒ tōngzhī nǐ.|Wenn es Neuigkeiten gibt, sage ich dir Bescheid.|L
提醒|tíxǐng|erinnern|v|B1|明天提醒我一下。|Míngtiān tíxǐng wǒ yíxià.|Erinnere mich morgen bitte daran.|L
请假|qǐngjià|sich freinehmen|v|A2|我明天想请一天假。|Wǒ míngtiān xiǎng qǐng yì tiān jià.|Ich möchte mir morgen einen Tag freinehmen.|L
搞定|gǎodìng|erledigen, hinkriegen (ugs.)|v|B1|别担心，我来搞定。|Bié dānxīn, wǒ lái gǎodìng.|Keine Sorge, ich kriege das hin.|L
办法|bànfǎ|Lösung, Weg, Methode|n|A2|我有一个办法。|Wǒ yǒu yí ge bànfǎ.|Ich habe eine Idee, wie es geht.|L
靠谱|kàopǔ|zuverlässig (ugs.)|adj|B1|他这个人很靠谱。|Tā zhège rén hěn kàopǔ.|Er ist ein sehr zuverlässiger Typ.|L
顺利|shùnlì|reibungslos|adj|B1|祝你一切顺利！|Zhù nǐ yíqiè shùnlì!|Ich wünsche dir, dass alles glattläuft!|L
解决|jiějué|lösen|v|B1|这个问题解决不了。|Zhège wèntí jiějué bu liǎo.|Dieses Problem lässt sich nicht lösen.|L
联系|liánxì|kontaktieren|v|A2|我明天联系你。|Wǒ míngtiān liánxì nǐ.|Ich melde mich morgen bei dir.|L
耽误|dānwu|aufhalten, Zeit kosten|v|B1|不好意思，耽误你的时间了。|Bù hǎoyìsi, dānwu nǐ de shíjiān le.|Sorry, dass ich deine Zeit gekostet habe.|L
答应|dāying|zusagen, versprechen|v|B1|他答应帮我了。|Tā dāying bāng wǒ le.|Er hat zugesagt, mir zu helfen.|L
拒绝|jùjué|ablehnen|v|B1|我不好意思拒绝他。|Wǒ bù hǎoyìsi jùjué tā.|Es ist mir unangenehm, ihm abzusagen.|L
急|jí|eilig, dringend|adj|A2|别急，慢慢来。|Bié jí, mànmàn lái.|Keine Eile, immer mit der Ruhe.|L
尽量|jǐnliàng|möglichst, so gut es geht|adv|B1|我尽量早点儿到。|Wǒ jǐnliàng zǎo diǎnr dào.|Ich versuche, möglichst früh da zu sein.|L
结果|jiéguǒ|Ergebnis; am Ende|n|B1|结果他没来。|Jiéguǒ tā méi lái.|Am Ende ist er nicht gekommen.|L
公司|gōngsī|Firma|n|A1|我在一家德国公司工作。|Wǒ zài yì jiā Déguó gōngsī gōngzuò.|Ich arbeite bei einer deutschen Firma.
老板|lǎobǎn|Chef; Ladenbesitzer|n|A2
办公室|bàngōngshì|Büro|n|A2
开会|kāihuì|ein Meeting haben|v|A2|我下午要开会。|Wǒ xiàwǔ yào kāihuì.|Ich habe nachmittags ein Meeting.
加班|jiābān|Überstunden machen|v|A2|今天又要加班。|Jīntiān yòu yào jiābān.|Heute muss ich schon wieder Überstunden machen.
面试|miànshì|Vorstellungsgespräch|n|B1|我明天有一个面试。|Wǒ míngtiān yǒu yí ge miànshì.|Ich habe morgen ein Vorstellungsgespräch.
项目|xiàngmù|Projekt|n|B1|这个项目快做完了。|Zhège xiàngmù kuài zuòwán le.|Dieses Projekt ist fast fertig.
电脑|diànnǎo|Computer|n|A1
邮件|yóujiàn|E-Mail|n|A2|我给你发邮件。|Wǒ gěi nǐ fā yóujiàn.|Ich schicke dir eine E-Mail.
经验|jīngyàn|Erfahrung|n|B1|他很有经验。|Tā hěn yǒu jīngyàn.|Er hat viel Erfahrung.
学习|xuéxí|lernen, studieren|v|A1|我在学习中文。|Wǒ zài xuéxí Zhōngwén.|Ich lerne gerade Chinesisch.
学校|xuéxiào|Schule|n|A1
考试|kǎoshì|Prüfung|n|A2|下周有考试。|Xià zhōu yǒu kǎoshì.|Nächste Woche ist eine Prüfung.
作业|zuòyè|Hausaufgabe|n|A2
练习|liànxí|üben; Übung|v|A2|我每天练习说中文。|Wǒ měi tiān liànxí shuō Zhōngwén.|Ich übe jeden Tag, Chinesisch zu sprechen.
中文|Zhōngwén|Chinesisch (Sprache)|n|A1|你的中文很好！|Nǐ de Zhōngwén hěn hǎo!|Dein Chinesisch ist sehr gut!
汉语|Hànyǔ|Chinesisch (Mandarin)|n|A1
字|zì|Schriftzeichen|n|A1|这个字怎么读？|Zhège zì zěnme dú?|Wie liest man dieses Zeichen?
词|cí|Wort|n|A2
句子|jùzi|Satz|n|A2
意思|yìsi|Bedeutung|n|A1|这是什么意思？|Zhè shì shénme yìsi?|Was bedeutet das?
懂|dǒng|verstehen|v|A1|我听不懂。|Wǒ tīng bu dǒng.|Ich verstehe es nicht (beim Hören).
明白|míngbai|verstehen, klar sein|v|A2|我明白你的意思。|Wǒ míngbai nǐ de yìsi.|Ich verstehe, was du meinst.
努力|nǔlì|fleißig; sich anstrengen|adj|A2|他工作很努力。|Tā gōngzuò hěn nǔlì.|Er arbeitet sehr fleißig.
准备|zhǔnbèi|vorbereiten|v|A2|我准备好了。|Wǒ zhǔnbèi hǎo le.|Ich bin bereit.
开始|kāishǐ|anfangen|v|A1|我们开始吧。|Wǒmen kāishǐ ba.|Fangen wir an.
结束|jiéshù|enden, beenden|v|A2|会议结束了。|Huìyì jiéshù le.|Das Meeting ist zu Ende.
完成|wánchéng|fertigstellen|v|B1|我很快就完成了。|Wǒ hěn kuài jiù wánchéng le.|Ich war schnell fertig.
成功|chénggōng|Erfolg; erfolgreich|n|B1|祝你成功！|Zhù nǐ chénggōng!|Viel Erfolg!
机会|jīhuì|Gelegenheit, Chance|n|B1|这是一个好机会。|Zhè shì yí ge hǎo jīhuì.|Das ist eine gute Gelegenheit.
目标|mùbiāo|Ziel|n|B1|我的目标是说流利的中文。|Wǒ de mùbiāo shì shuō liúlì de Zhōngwén.|Mein Ziel ist es, fließend Chinesisch zu sprechen.
压力|yālì|Druck, Stress|n|B1|最近工作压力很大。|Zuìjìn gōngzuò yālì hěn dà.|In letzter Zeit ist der Arbeitsstress groß.
`,

  hobbies: `
爱好|àihào|Hobby|n|A2|你有什么爱好？|Nǐ yǒu shénme àihào?|Was für Hobbys hast du?|L
运动|yùndòng|Sport; Sport treiben|n|A2|我喜欢运动。|Wǒ xǐhuan yùndòng.|Ich mag Sport.|L
锻炼|duànliàn|trainieren|v|A2|我每天锻炼半个小时。|Wǒ měi tiān duànliàn bàn ge xiǎoshí.|Ich trainiere jeden Tag eine halbe Stunde.|L
打球|dǎqiú|Ball spielen|v|A2|周末一起打球吧。|Zhōumò yìqǐ dǎqiú ba.|Lass uns am Wochenende zusammen spielen.|L
羽毛球|yǔmáoqiú|Badminton|n|A2|我很喜欢打羽毛球。|Wǒ hěn xǐhuan dǎ yǔmáoqiú.|Ich spiele sehr gern Badminton.|L
球拍|qiúpāi|Schläger|n|B1|我的球拍坏了。|Wǒ de qiúpāi huài le.|Mein Schläger ist kaputt.
跑步|pǎobù|joggen|v|A2|我早上去跑步。|Wǒ zǎoshang qù pǎobù.|Ich gehe morgens joggen.|L
游泳|yóuyǒng|schwimmen|v|A2|你会游泳吗？|Nǐ huì yóuyǒng ma?|Kannst du schwimmen?|L
爬山|páshān|wandern, bergsteigen|v|A2|周末我们去爬山。|Zhōumò wǒmen qù páshān.|Am Wochenende gehen wir wandern.|L
健身|jiànshēn|Fitness machen|v|A2|我下班去健身。|Wǒ xiàbān qù jiànshēn.|Nach der Arbeit gehe ich ins Fitnessstudio.
散步|sànbù|spazieren gehen|v|A2
看电影|kàn diànyǐng|einen Film schauen|v|A1|我们去看电影吧。|Wǒmen qù kàn diànyǐng ba.|Lass uns ins Kino gehen.|L
电影|diànyǐng|Film|n|A1|这部电影很好看。|Zhè bù diànyǐng hěn hǎokàn.|Dieser Film ist sehr gut.
打游戏|dǎ yóuxì|zocken, Videospiele spielen|v|A2|他在打游戏呢。|Tā zài dǎ yóuxì ne.|Er zockt gerade.|L
游戏|yóuxì|Spiel|n|A2
拍照|pāizhào|fotografieren|v|A2|我们一起拍照吧。|Wǒmen yìqǐ pāizhào ba.|Lass uns zusammen ein Foto machen.|L
音乐|yīnyuè|Musik|n|A1|我喜欢听音乐。|Wǒ xǐhuan tīng yīnyuè.|Ich höre gern Musik.
唱歌|chànggē|singen|v|A2|她唱歌很好听。|Tā chànggē hěn hǎotīng.|Sie singt sehr schön.
跳舞|tiàowǔ|tanzen|v|A2
看书|kànshū|lesen (Bücher)|v|A1|我喜欢在咖啡店看书。|Wǒ xǐhuan zài kāfēidiàn kànshū.|Ich lese gern im Café.
画画|huàhuà|malen, zeichnen|v|A2
篮球|lánqiú|Basketball|n|A2
足球|zúqiú|Fußball|n|A2|德国人很喜欢足球。|Déguó rén hěn xǐhuan zúqiú.|Die Deutschen lieben Fußball.
兴趣|xìngqù|Interesse|n|B1|我对中国文化很感兴趣。|Wǒ duì Zhōngguó wénhuà hěn gǎn xìngqù.|Ich interessiere mich sehr für chinesische Kultur.
有意思|yǒu yìsi|interessant|adj|A2|这本书很有意思。|Zhè běn shū hěn yǒu yìsi.|Dieses Buch ist sehr interessant.|L
无聊|wúliáo|langweilig; gelangweilt|adj|A2|今天好无聊啊。|Jīntiān hǎo wúliáo a.|Heute ist es so langweilig.|L
好玩儿|hǎowánr|spaßig, macht Spaß|adj|A2|这个游戏很好玩儿。|Zhège yóuxì hěn hǎowánr.|Dieses Spiel macht viel Spaß.|L
比赛|bǐsài|Wettkampf, Spiel|n|A2|你看昨天的比赛了吗？|Nǐ kàn zuótiān de bǐsài le ma?|Hast du das Spiel gestern gesehen?|L
赢|yíng|gewinnen|v|B1|我们赢了！|Wǒmen yíng le!|Wir haben gewonnen!
输|shū|verlieren|v|B1
厉害|lìhai|krass gut, beeindruckend|adj|A2|你太厉害了！|Nǐ tài lìhai le!|Du bist echt krass!|L
参加|cānjiā|teilnehmen|v|A2|你参加比赛吗？|Nǐ cānjiā bǐsài ma?|Nimmst du am Wettkampf teil?|L
玩儿|wánr|spielen, Spaß haben|v|A1|有空来我家玩儿。|Yǒu kòng lái wǒ jiā wánr.|Komm mal vorbei, wenn du Zeit hast.|L
一起|yìqǐ|zusammen|adv|A1|我们一起去吧。|Wǒmen yìqǐ qù ba.|Lass uns zusammen gehen.|L
聚会|jùhuì|Treffen, Party|n|A2|周六有一个聚会。|Zhōuliù yǒu yí ge jùhuì.|Am Samstag ist eine Party.|L
逛街|guàngjiē|bummeln, shoppen gehen|v|A2|我们下午去逛街吧。|Wǒmen xiàwǔ qù guàngjiē ba.|Lass uns nachmittags bummeln gehen.|L
热闹|rènao|lebhaft, belebt|adj|A2|这里晚上很热闹。|Zhèlǐ wǎnshang hěn rènao.|Hier ist abends viel los.|L
气氛|qìfēn|Stimmung, Atmosphäre|n|B1|聚会的气氛很好。|Jùhuì de qìfēn hěn hǎo.|Die Stimmung auf der Party ist super.|L
`,

  media: `
手机|shǒujī|Handy|n|A1|我的手机没电了。|Wǒ de shǒujī méi diàn le.|Mein Handy-Akku ist leer.|L
电话|diànhuà|Telefon; Anruf|n|A1|我给你打电话。|Wǒ gěi nǐ dǎ diànhuà.|Ich rufe dich an.|L
打|dǎ|schlagen; spielen; (Anruf) tätigen|v|A1|我晚上给你打电话。|Wǒ wǎnshang gěi nǐ dǎ diànhuà.|Ich rufe dich abends an.|L
微信|Wēixìn|WeChat|n|A1|我们加个微信吧。|Wǒmen jiā ge Wēixìn ba.|Lass uns WeChat-Kontakte austauschen.|L
发|fā|senden, schicken|v|A2|我给你发照片。|Wǒ gěi nǐ fā zhàopiàn.|Ich schicke dir die Fotos.|L
收到|shōudào|erhalten|v|A2|我收到你的消息了。|Wǒ shōudào nǐ de xiāoxi le.|Ich habe deine Nachricht erhalten.|L
回复|huífù|antworten (schriftlich)|v|A2|他还没回复我。|Tā hái méi huífù wǒ.|Er hat mir noch nicht geantwortet.|L
聊天|liáotiān|chatten, plaudern|v|A2|我们在聊天呢。|Wǒmen zài liáotiān ne.|Wir plaudern gerade.|L
消息|xiāoxi|Nachricht, Neuigkeit|n|A2|有什么好消息吗？|Yǒu shénme hǎo xiāoxi ma?|Gibt es gute Neuigkeiten?|L
告诉|gàosu|sagen, mitteilen|v|A1|到了告诉我。|Dàole gàosu wǒ.|Sag mir Bescheid, wenn du da bist.|L
群|qún|Gruppe (Chat)|n|A2|我把你拉进群里。|Wǒ bǎ nǐ lājìn qún lǐ.|Ich füge dich zur Gruppe hinzu.|L
朋友圈|péngyouquān|WeChat-Moments|n|A2|你看我的朋友圈了吗？|Nǐ kàn wǒ de péngyouquān le ma?|Hast du meine Moments gesehen?|L
点赞|diǎnzàn|liken|v|A2|我给你点了个赞。|Wǒ gěi nǐ diǎnle ge zàn.|Ich habe dir ein Like gegeben.|L
评论|pínglùn|Kommentar; kommentieren|n|B1|评论区很有意思。|Pínglùnqū hěn yǒu yìsi.|Der Kommentarbereich ist sehr unterhaltsam.|L
转发|zhuǎnfā|weiterleiten|v|B1|我转发给你。|Wǒ zhuǎnfā gěi nǐ.|Ich leite es dir weiter.|L
分享|fēnxiǎng|teilen|v|B1|我想跟你分享一个好消息。|Wǒ xiǎng gēn nǐ fēnxiǎng yí ge hǎo xiāoxi.|Ich möchte eine gute Nachricht mit dir teilen.|L
表情包|biǎoqíngbāo|Sticker, Meme|n|B1|这个表情包太搞笑了。|Zhège biǎoqíngbāo tài gǎoxiào le.|Dieser Sticker ist zu witzig.|L
自拍|zìpāi|Selfie; ein Selfie machen|n|A2|我们自拍一张吧。|Wǒmen zìpāi yì zhāng ba.|Lass uns ein Selfie machen.|L
搞笑|gǎoxiào|witzig, lustig|adj|A2|这个视频太搞笑了。|Zhège shìpín tài gǎoxiào le.|Dieses Video ist zu witzig.|L
刷|shuā|scrollen; wischen|v|B1|他在刷手机呢。|Tā zài shuā shǒujī ne.|Er scrollt gerade am Handy.|L
电视剧|diànshìjù|Fernsehserie|n|A2|你在看什么电视剧？|Nǐ zài kàn shénme diànshìjù?|Welche Serie schaust du gerade?|L
追剧|zhuījù|eine Serie verfolgen, bingen|v|B1|我最近在追剧。|Wǒ zuìjìn zài zhuījù.|Ich binge gerade eine Serie.|L
综艺|zōngyì|Unterhaltungsshow|n|B1|这个综艺很好看。|Zhège zōngyì hěn hǎokàn.|Diese Show ist sehr sehenswert.|L
剧情|jùqíng|Handlung|n|B1|剧情越来越精彩。|Jùqíng yuè lái yuè jīngcǎi.|Die Handlung wird immer spannender.|L
主角|zhǔjué|Hauptfigur|n|B1|主角是谁？|Zhǔjué shì shéi?|Wer ist die Hauptfigur?|L
结局|jiéjú|Ende, Ausgang|n|B1|别告诉我结局！|Bié gàosu wǒ jiéjú!|Verrat mir nicht das Ende!|L
精彩|jīngcǎi|großartig, spannend (Show, Spiel)|adj|B1|昨天的比赛太精彩了。|Zuótiān de bǐsài tài jīngcǎi le.|Das Spiel gestern war großartig.|L
火|huǒ|angesagt, populär|adj|B1|这首歌最近很火。|Zhè shǒu gē zuìjìn hěn huǒ.|Dieses Lied ist gerade total angesagt.|L
剧透|jùtòu|spoilern|v|B1|别剧透，我还没看呢！|Bié jùtòu, wǒ hái méi kàn ne!|Nicht spoilern, ich hab's noch nicht gesehen!|L
熬夜|áoyè|lange aufbleiben, die Nacht durchmachen|v|B1|我昨天熬夜看剧了。|Wǒ zuótiān áoyè kàn jù le.|Ich bin gestern lange aufgeblieben und habe Serie geschaut.|L
流行|liúxíng|im Trend, beliebt|adj|B1|这种颜色今年很流行。|Zhè zhǒng yánsè jīnnián hěn liúxíng.|Diese Farbe ist dieses Jahr im Trend.|L
受欢迎|shòu huānyíng|beliebt|adj|B1|这家店很受欢迎。|Zhè jiā diàn hěn shòu huānyíng.|Dieser Laden ist sehr beliebt.|L
推荐|tuījiàn|empfehlen|v|B1|你能推荐一部电影吗？|Nǐ néng tuījiàn yí bù diànyǐng ma?|Kannst du einen Film empfehlen?|L
上网|shàngwǎng|im Internet surfen|v|A2
视频|shìpín|Video|n|A2|我们视频聊天吧。|Wǒmen shìpín liáotiān ba.|Lass uns videochatten.
照片|zhàopiàn|Foto|n|A1|这张照片真好看。|Zhè zhāng zhàopiàn zhēn hǎokàn.|Dieses Foto ist wirklich schön.
新闻|xīnwén|Nachrichten|n|B1|你看今天的新闻了吗？|Nǐ kàn jīntiān de xīnwén le ma?|Hast du die Nachrichten von heute gesehen?
电视|diànshì|Fernseher|n|A1
节目|jiémù|Sendung, Programm|n|B1
下载|xiàzài|herunterladen|v|B1|你下载这个软件了吗？|Nǐ xiàzài zhège ruǎnjiàn le ma?|Hast du diese App heruntergeladen?
密码|mìmǎ|Passwort|n|B1|Wi-Fi密码是多少？|Wi-Fi mìmǎ shì duōshao?|Wie lautet das WLAN-Passwort?
充电|chōngdiàn|aufladen|v|A2|我的手机要充电。|Wǒ de shǒujī yào chōngdiàn.|Mein Handy muss geladen werden.
充电器|chōngdiànqì|Ladegerät|n|B1
语音|yǔyīn|Sprachnachricht|n|B1|我给你发语音。|Wǒ gěi nǐ fā yǔyīn.|Ich schicke dir eine Sprachnachricht.
直播|zhíbō|Livestream|n|B1
关注|guānzhù|folgen; Aufmerksamkeit schenken|v|B1|我关注了他的账号。|Wǒ guānzhùle tā de zhànghào.|Ich folge seinem Account.
粉丝|fěnsī|Fan, Follower|n|B1
网红|wǎnghóng|Influencer; viral|n|B1|这是一家网红餐厅。|Zhè shì yì jiā wǎnghóng cāntīng.|Das ist ein Instagram-berühmtes Restaurant.
`,

  feelings: `
喜欢|xǐhuan|mögen|v|A1|我喜欢吃中国菜。|Wǒ xǐhuan chī Zhōngguó cài.|Ich esse gern chinesisch.|L
爱|ài|lieben|v|A1|我爱你。|Wǒ ài nǐ.|Ich liebe dich.
讨厌|tǎoyàn|nicht ausstehen können|v|B1|我讨厌下雨天。|Wǒ tǎoyàn xiàyǔ tiān.|Ich hasse Regentage.
觉得|juéde|finden, meinen|v|A1|我觉得这个不错。|Wǒ juéde zhège búcuò.|Ich finde das nicht schlecht.|L
感觉|gǎnjué|fühlen; Gefühl|v|A2|我感觉有点儿累。|Wǒ gǎnjué yǒudiǎnr lèi.|Ich fühle mich etwas müde.|L
希望|xīwàng|hoffen|v|A2|希望明天不下雨。|Xīwàng míngtiān bú xiàyǔ.|Hoffentlich regnet es morgen nicht.|L
担心|dānxīn|sich Sorgen machen|v|A2|别担心，没事儿。|Bié dānxīn, méi shìr.|Keine Sorge, alles gut.|L
放心|fàngxīn|beruhigt sein|v|A2|放心吧，我会准时到。|Fàngxīn ba, wǒ huì zhǔnshí dào.|Keine Sorge, ich komme pünktlich.|L
生气|shēngqì|wütend sein|v|A2|你别生气。|Nǐ bié shēngqì.|Sei nicht sauer.|L
舒服|shūfu|angenehm, wohl|adj|A2|我今天不太舒服。|Wǒ jīntiān bú tài shūfu.|Mir geht's heute nicht so gut.|L
开心|kāixīn|fröhlich, glücklich|adj|A1|今天玩儿得很开心。|Jīntiān wánr de hěn kāixīn.|Heute hatte ich viel Spaß.|L
高兴|gāoxìng|froh, erfreut|adj|A1|很高兴认识你。|Hěn gāoxìng rènshi nǐ.|Freut mich, dich kennenzulernen.|L
快乐|kuàilè|glücklich, fröhlich|adj|A1|新年快乐！|Xīnnián kuàilè!|Frohes neues Jahr!
幸福|xìngfú|glücklich (tiefes Glück)|adj|B1
累|lèi|müde, erschöpft|adj|A1|我今天太累了。|Wǒ jīntiān tài lèi le.|Ich bin heute total erschöpft.|L
难过|nánguò|traurig|adj|A2|别难过了。|Bié nánguò le.|Sei nicht mehr traurig.|L
害怕|hàipà|Angst haben|v|A2|我害怕一个人走夜路。|Wǒ hàipà yí ge rén zǒu yèlù.|Ich habe Angst, nachts allein zu gehen.|L
惊讶|jīngyà|überrascht|adj|B1|听到这个消息我很惊讶。|Tīngdào zhège xiāoxi wǒ hěn jīngyà.|Ich war sehr überrascht, das zu hören.|L
后悔|hòuhuǐ|bereuen|v|B1|我后悔没早点儿来。|Wǒ hòuhuǐ méi zǎo diǎnr lái.|Ich bereue, nicht früher gekommen zu sein.|L
期待|qīdài|sich freuen auf|v|B1|我很期待这次旅游。|Wǒ hěn qīdài zhè cì lǚyóu.|Ich freue mich sehr auf diese Reise.|L
可惜|kěxī|schade|adj|A2|太可惜了！|Tài kěxī le!|Wie schade!|L
紧张|jǐnzhāng|nervös|adj|B1|明天面试，我有点儿紧张。|Míngtiān miànshì, wǒ yǒudiǎnr jǐnzhāng.|Morgen ist das Vorstellungsgespräch, ich bin etwas nervös.
兴奋|xīngfèn|aufgeregt (positiv)|adj|B1
失望|shīwàng|enttäuscht|adj|B1|我对结果有点儿失望。|Wǒ duì jiéguǒ yǒudiǎnr shīwàng.|Ich bin vom Ergebnis etwas enttäuscht.
感动|gǎndòng|gerührt|adj|B1|我被感动了。|Wǒ bèi gǎndòng le.|Ich war gerührt.
着急|zháojí|unruhig, in Eile sein|adj|B1|别着急，还有时间。|Bié zháojí, hái yǒu shíjiān.|Keine Hektik, es ist noch Zeit.
烦|fán|genervt; nerven|adj|B1|烦死了！|Fán sǐ le!|Das nervt total!
尴尬|gāngà|peinlich, unangenehm|adj|B2|那时候真的很尴尬。|Nà shíhou zhēn de hěn gāngà.|Das war damals echt peinlich.
羡慕|xiànmù|beneiden|v|B1|我真羡慕你！|Wǒ zhēn xiànmù nǐ!|Ich beneide dich echt!
孤单|gūdān|einsam|adj|B1
受不了|shòu bu liǎo|nicht aushalten|phr|B1|太热了，我受不了了。|Tài rè le, wǒ shòu bu liǎo le.|Es ist zu heiß, ich halte es nicht mehr aus.
心情|xīnqíng|Stimmung, Laune|n|B1|我今天心情很好。|Wǒ jīntiān xīnqíng hěn hǎo.|Ich habe heute gute Laune.
哭|kū|weinen|v|A2
笑|xiào|lachen|v|A2|他笑得很开心。|Tā xiào de hěn kāixīn.|Er lacht ganz fröhlich.
感谢|gǎnxiè|danken (förmlicher)|v|B1|非常感谢你的帮助。|Fēicháng gǎnxiè nǐ de bāngzhù.|Vielen Dank für deine Hilfe.
相信|xiāngxìn|glauben, vertrauen|v|B1|我相信你。|Wǒ xiāngxìn nǐ.|Ich glaube dir.
主意|zhǔyi|Idee|n|A2|好主意！|Hǎo zhǔyi!|Gute Idee!|L
建议|jiànyì|Vorschlag; vorschlagen|n|B1|你有什么建议？|Nǐ yǒu shénme jiànyì?|Was schlägst du vor?|L
意见|yìjiàn|Meinung; Einwand|n|B1|我没意见。|Wǒ méi yìjiàn.|Ich habe nichts dagegen.
同意|tóngyì|zustimmen|v|A2|我同意你的看法。|Wǒ tóngyì nǐ de kànfǎ.|Ich stimme deiner Ansicht zu.|L
决定|juédìng|entscheiden; Entscheidung|v|A2|我决定明天去。|Wǒ juédìng míngtiān qù.|Ich habe beschlossen, morgen zu gehen.|L
打算|dǎsuàn|vorhaben|v|A2|你周末打算做什么？|Nǐ zhōumò dǎsuàn zuò shénme?|Was hast du am Wochenende vor?|L
愿意|yuànyì|bereit sein, gern wollen|v|B1|我愿意帮你。|Wǒ yuànyì bāng nǐ.|Ich helfe dir gern.|L
无所谓|wúsuǒwèi|egal, ist mir gleich|phr|B1|吃什么都无所谓。|Chī shénme dōu wúsuǒwèi.|Was wir essen, ist mir egal.|L
随便|suíbiàn|wie du willst; beliebig|adj|A2|随便，你决定吧。|Suíbiàn, nǐ juédìng ba.|Egal, entscheide du.|L
说实话|shuō shíhuà|ehrlich gesagt|phr|B1|说实话，我不太喜欢。|Shuō shíhuà, wǒ bú tài xǐhuan.|Ehrlich gesagt mag ich es nicht so.|L
`,
};

export default part3;
