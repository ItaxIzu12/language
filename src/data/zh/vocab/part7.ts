// HSK-Ergänzung (HSK 3.0 Stufen 1–3 und HSK 2.0 Stufen 1–4), nach Niveau sortiert.
// Format: Wort | Pinyin | Deutsch | Wortart | Niveau | Beispiel | Beispiel-Pinyin | Beispiel-Deutsch | L
const part7: Record<string, string> = {
  hobbies: `
唱|chàng|singen|v|A1|她唱得很好。|Tā chàng de hěn hǎo.|Sie singt sehr gut.
动作|dòngzuò|Bewegung; Handlung|n|A1|他的动作很快。|Tā de dòngzuò hěn kuài.|Seine Bewegungen sind sehr schnell.
歌|gē|Lied|n|A1|我喜欢这首歌。|Wǒ xǐhuan zhè shǒu gē.|Ich mag dieses Lied.
球|qiú|Ball|n|A1|我们下午去打球吧。|Wǒmen xiàwǔ qù dǎ qiú ba.|Lass uns heute Nachmittag Ball spielen gehen.
队|duì|Mannschaft; Team|n|A2|你喜欢哪个队?|Nǐ xǐhuan nǎge duì?|Welche Mannschaft magst du?
队长|duìzhǎng|Mannschaftskapitän; Teamleiter|n|A2|他是我们的队长。|Tā shì wǒmen de duìzhǎng.|Er ist unser Mannschaftskapitän.
故事|gùshi|Geschichte; Erzählung|n|A2|妈妈给我讲故事。|Māma gěi wǒ jiǎng gùshi.|Mama erzählt mir eine Geschichte.
画|huà|malen; zeichnen|v|A2|他画得很好。|Tā huà de hěn hǎo.|Er malt sehr gut.
画儿|huàr|Bild; Gemälde|n|A2|墙上有一张画儿。|Qiáng shang yǒu yì zhāng huàr.|An der Wand hängt ein Bild.
活动|huódòng|Aktivität; Veranstaltung|n|A2|周末学校有活动。|Zhōumò xuéxiào yǒu huódòng.|Am Wochenende gibt es eine Veranstaltung in der Schule.
爬|pá|klettern; krabbeln|v|A2|我们明天去爬山。|Wǒmen míngtiān qù pá shān.|Wir gehen morgen wandern.
排球|páiqiú|Volleyball|n|A2|我们下午打排球。|Wǒmen xiàwǔ dǎ páiqiú.|Wir spielen nachmittags Volleyball.
球场|qiúchǎng|Sportplatz; Spielfeld|n|A2|球场上有很多人。|Qiúchǎng shang yǒu hěn duō rén.|Auf dem Sportplatz sind viele Leute.
球队|qiúduì|Mannschaft; Team|n|A2|你喜欢哪个球队？|Nǐ xǐhuan nǎge qiúduì?|Welche Mannschaft magst du?
体育|tǐyù|Sport|n|A2|我喜欢上体育课。|Wǒ xǐhuan shàng tǐyù kè.|Ich mag den Sportunterricht.
体育场|tǐyùchǎng|Stadion|n|A2|体育场离这儿不远。|Tǐyùchǎng lí zhèr bù yuǎn.|Das Stadion ist nicht weit von hier.
体育馆|tǐyùguǎn|Sporthalle|n|A2|我们在体育馆打球。|Wǒmen zài tǐyùguǎn dǎ qiú.|Wir spielen in der Sporthalle Ball.
晚会|wǎnhuì|Abendveranstaltung; Abendfeier|n|A2|今晚学校有晚会。|Jīnwǎn xuéxiào yǒu wǎnhuì.|Heute Abend gibt es eine Feier in der Schule.
网球|wǎngqiú|Tennis|n|A2|你会打网球吗？|Nǐ huì dǎ wǎngqiú ma?|Kannst du Tennis spielen?
小说|xiǎoshuō|Roman|n|A2|我在看一本小说。|Wǒ zài kàn yì běn xiǎoshuō.|Ich lese gerade einen Roman.
笑话|xiàohua|Witz|n|A2|他讲了一个笑话。|Tā jiǎng le yí gè xiàohua.|Er hat einen Witz erzählt.
笑话儿|xiàohuar|Witz|n|A2|这个笑话儿真有意思。|Zhège xiàohuar zhēn yǒu yìsi.|Dieser Witz ist wirklich lustig.
音乐会|yīnyuèhuì|Konzert|n|A2|我们今晚去听音乐会。|Wǒmen jīnwǎn qù tīng yīnyuèhuì.|Wir gehen heute Abend ins Konzert.
照相|zhàoxiàng|fotografieren|v|A2|我们在这儿照相吧。|Wǒmen zài zhèr zhàoxiàng ba.|Lass uns hier ein Foto machen.
打篮球|dǎ lánqiú|Basketball spielen|phr|A2|我们下午去打篮球。|Wǒmen xiàwǔ qù dǎ lánqiú.|Wir gehen nachmittags Basketball spielen.
踢足球|tī zúqiú|Fußball spielen|phr|A2|他每个周末踢足球。|Tā měi ge zhōumò tī zúqiú.|Er spielt jedes Wochenende Fußball.
表演|biǎoyǎn|aufführen; Aufführung|v|B1|孩子们在表演节目。|Háizimen zài biǎoyǎn jiémù.|Die Kinder führen ein Programm auf.
创作|chuàngzuò|(künstlerisch) schaffen; Werk|v|B1|他创作了很多歌曲。|Tā chuàngzuòle hěn duō gēqǔ.|Er hat viele Lieder geschrieben.
得分|défēn|Punkte erzielen; Punktzahl|v|B1|他在比赛中得分最高。|Tā zài bǐsài zhōng défēn zuì gāo.|Er hat im Spiel die meisten Punkte erzielt.
队员|duìyuán|Teammitglied|n|B1|我们队有十个队员。|Wǒmen duì yǒu shí gè duìyuán.|Unser Team hat zehn Mitglieder.
对手|duìshǒu|Gegner/in|n|B1|我们的对手很强。|Wǒmen de duìshǒu hěn qiáng.|Unser Gegner ist sehr stark.
歌迷|gēmí|Fan (eines Sängers)|n|B1|她有很多歌迷。|Tā yǒu hěn duō gēmí.|Sie hat viele Fans.
歌声|gēshēng|Gesang; Singstimme|n|B1|她的歌声很好听。|Tā de gēshēng hěn hǎotīng.|Ihr Gesang klingt sehr schön.
歌手|gēshǒu|Sänger/in|n|B1|他是有名的歌手。|Tā shì yǒumíng de gēshǒu.|Er ist ein bekannter Sänger.
功夫|gōngfu|Kung-Fu|n|B1|他会中国功夫。|Tā huì Zhōngguó gōngfu.|Er kann chinesisches Kung-Fu.
划船|huáchuán|rudern; Boot fahren|v|B1|我们去公园划船吧。|Wǒmen qù gōngyuán huáchuán ba.|Lass uns im Park Boot fahren.
话剧|huàjù|Theaterstück; Schauspiel|n|B1|我们晚上去看话剧。|Wǒmen wǎnshang qù kàn huàjù.|Wir gehen heute Abend ins Theater.
纪录|jìlù|Rekord|n|B1|他打破了世界纪录。|Tā dǎpò le shìjiè jìlù.|Er hat den Weltrekord gebrochen.
教练|jiàoliàn|Trainer/in|n|B1|我的游泳教练很严格。|Wǒ de yóuyǒng jiàoliàn hěn yángé.|Mein Schwimmtrainer ist sehr streng.
金牌|jīnpái|Goldmedaille|n|B1|他得了一块金牌。|Tā dé le yí kuài jīnpái.|Er hat eine Goldmedaille gewonnen.
京剧|jīngjù|Peking-Oper|n|B1|你看过京剧吗？|Nǐ kànguo jīngjù ma?|Hast du schon mal eine Peking-Oper gesehen?
决赛|juésài|Finale; Endspiel|n|B1|今晚有足球决赛。|Jīnwǎn yǒu zúqiú juésài.|Heute Abend ist das Fußballfinale.
领先|lǐngxiān|führen; vorn liegen|v|B1|我们队领先两分。|Wǒmen duì lǐngxiān liǎng fēn.|Unsere Mannschaft führt mit zwei Punkten.
美术|měishù|bildende Kunst; Kunst (Schulfach)|n|B1|我女儿喜欢美术。|Wǒ nǚ'ér xǐhuan měishù.|Meine Tochter mag Kunst.
迷|mí|vernarrt sein in; Fan|v|B1|他迷上了打游戏。|Tā mí shàng le dǎ yóuxì.|Er ist ganz verrückt nach Videospielen.
排名|páimíng|Platzierung; Rangliste|n|B1|他的排名是第一。|Tā de páimíng shì dì-yī.|Er steht auf Platz eins.
庆祝|qìngzhù|feiern|v|B1|我们一起庆祝生日吧！|Wǒmen yìqǐ qìngzhù shēngrì ba!|Lass uns zusammen Geburtstag feiern!
球迷|qiúmí|Fußballfan; Ballsportfan|n|B1|我爸爸是个球迷。|Wǒ bàba shì gè qiúmí.|Mein Vater ist Fußballfan.
全场|quánchǎng|der ganze Saal; das ganze Publikum|n|B1|全场观众都站起来了。|Quánchǎng guānzhòng dōu zhàn qǐlai le.|Das ganze Publikum ist aufgestanden.
胜|shèng|siegen; gewinnen|v|B1|我们队胜了！|Wǒmen duì shèng le!|Unsere Mannschaft hat gewonnen!
世界杯|Shìjièbēi|Weltmeisterschaft (Fußball)|n|B1|你看世界杯了吗？|Nǐ kàn Shìjièbēi le ma?|Hast du die WM geschaut?
跳|tiào|springen|v|B1|他跳得很高。|Tā tiào de hěn gāo.|Er springt sehr hoch.
跳高|tiàogāo|Hochsprung|n|B1|我弟弟喜欢跳高。|Wǒ dìdi xǐhuan tiàogāo.|Mein kleiner Bruder mag Hochsprung.
跳远|tiàoyuǎn|Weitsprung|n|B1|她跳远跳得很好。|Tā tiàoyuǎn tiào de hěn hǎo.|Sie ist sehr gut im Weitsprung.
图画|túhuà|Bild; Zeichnung|n|B1|孩子喜欢看图画。|Háizi xǐhuan kàn túhuà.|Kinder schauen gern Bilder an.
玩具|wánjù|Spielzeug|n|B1|孩子有很多玩具。|Háizi yǒu hěn duō wánjù.|Das Kind hat viel Spielzeug.
武术|wǔshù|Kampfkunst; Wushu|n|B1|我想学中国武术。|Wǒ xiǎng xué Zhōngguó wǔshù.|Ich möchte chinesische Kampfkunst lernen.
舞台|wǔtái|Bühne|n|B1|她站在舞台上唱歌。|Tā zhàn zài wǔtái shang chànggē.|Sie steht auf der Bühne und singt.
选手|xuǎnshǒu|Wettkämpfer; Teilnehmer|n|B1|这位选手跑得很快。|Zhè wèi xuǎnshǒu pǎo de hěn kuài.|Dieser Wettkämpfer läuft sehr schnell.
训练|xùnliàn|trainieren; Training|v|B1|他每天训练两个小时。|Tā měi tiān xùnliàn liǎng ge xiǎoshí.|Er trainiert jeden Tag zwei Stunden.
演|yǎn|spielen; aufführen|v|B1|她在电影里演妈妈。|Tā zài diànyǐng li yǎn māma.|Sie spielt im Film die Mutter.
演唱|yǎnchàng|singen (auf der Bühne)|v|B1|她演唱了一首中文歌。|Tā yǎnchàng le yì shǒu Zhōngwén gē.|Sie hat ein chinesisches Lied gesungen.
演唱会|yǎnchànghuì|Konzert|n|B1|我们去听演唱会吧。|Wǒmen qù tīng yǎnchànghuì ba.|Lass uns aufs Konzert gehen.
演出|yǎnchū|Aufführung; auftreten|n|B1|今晚的演出七点开始。|Jīnwǎn de yǎnchū qī diǎn kāishǐ.|Die Vorstellung heute Abend beginnt um sieben.
艺术|yìshù|Kunst|n|B1|她很喜欢艺术。|Tā hěn xǐhuan yìshù.|Sie mag Kunst sehr.
银牌|yínpái|Silbermedaille|n|B1|他得了一块银牌。|Tā dé le yí kuài yínpái.|Er hat eine Silbermedaille gewonnen.
游|yóu|schwimmen; reisen|v|B1|我能游一千米。|Wǒ néng yóu yìqiān mǐ.|Ich kann tausend Meter schwimmen.
乐队|yuèduì|Band; Orchester|n|B1|我最喜欢这个乐队。|Wǒ zuì xǐhuan zhège yuèduì.|Diese Band mag ich am liebsten.
组合|zǔhé|Kombination; Gruppe (Musik)|n|B1|我喜欢这个音乐组合。|Wǒ xǐhuan zhège yīnyuè zǔhé.|Ich mag diese Musikgruppe.
作品|zuòpǐn|Werk|n|B1|这是他的新作品。|Zhè shì tā de xīn zuòpǐn.|Das ist sein neues Werk.
乒乓球|pīngpāngqiú|Tischtennis|n|B1|我们去打乒乓球吧。|Wǒmen qù dǎ pīngpāngqiú ba.|Lass uns Tischtennis spielen gehen.
弹钢琴|tán gāngqín|Klavier spielen|v|B1|我妹妹会弹钢琴。|Wǒ mèimei huì tán gāngqín.|Meine kleine Schwester kann Klavier spielen.
`,

  media: `
打电话|dǎ diànhuà|telefonieren; anrufen|v|A1|我给妈妈打电话。|Wǒ gěi māma dǎ diànhuà.|Ich rufe meine Mutter an.
电视机|diànshìjī|Fernseher|n|A1|这个电视机很大。|Zhège diànshìjī hěn dà.|Dieser Fernseher ist sehr groß.
网友|wǎngyǒu|Internetbekanntschaft; Online-Freund/in|n|A1|他是我的网友。|Tā shì wǒ de wǎngyǒu.|Er ist ein Online-Freund von mir.
报纸|bàozhǐ|Zeitung|n|A2|爷爷每天看报纸。|Yéye měi tiān kàn bàozhǐ.|Opa liest jeden Tag Zeitung.
短信|duǎnxìn|SMS; Kurznachricht|n|A2|我给你发短信。|Wǒ gěi nǐ fā duǎnxìn.|Ich schicke dir eine SMS.
关机|guānjī|(Gerät) ausschalten|v|A2|他的手机关机了。|Tā de shǒujī guānjī le.|Sein Handy ist ausgeschaltet.
广告|guǎnggào|Werbung; Anzeige|n|A2|电视上的广告太多了。|Diànshì shang de guǎnggào tài duō le.|Im Fernsehen läuft zu viel Werbung.
计算机|jìsuànjī|Computer|n|A2|他在大学学计算机。|Tā zài dàxué xué jìsuànjī.|Er studiert Informatik an der Uni.
开机|kāijī|(Gerät) einschalten|v|A2|手机开机了吗?|Shǒujī kāijī le ma?|Ist das Handy eingeschaltet?
明星|míngxīng|Star; Berühmtheit|n|A2|她是一个电影明星。|Tā shì yí gè diànyǐng míngxīng.|Sie ist ein Filmstar.
日报|rìbào|Tageszeitung|n|A2|他每天看日报。|Tā měi tiān kàn rìbào.|Er liest jeden Tag die Tageszeitung.
声音|shēngyīn|Stimme; Geräusch|n|A2|你的声音很好听。|Nǐ de shēngyīn hěn hǎotīng.|Deine Stimme klingt sehr schön.
图片|túpiàn|Bild; Abbildung|n|A2|这张图片很好看。|Zhè zhāng túpiàn hěn hǎokàn.|Dieses Bild ist sehr schön.
晚报|wǎnbào|Abendzeitung|n|A2|爷爷喜欢看晚报。|Yéye xǐhuan kàn wǎnbào.|Opa liest gern die Abendzeitung.
网|wǎng|Netz; Internet|n|A2|这里的网很慢。|Zhèlǐ de wǎng hěn màn.|Das Internet hier ist sehr langsam.
网站|wǎngzhàn|Webseite|n|A2|这个网站很有用。|Zhège wǎngzhàn hěn yǒuyòng.|Diese Webseite ist sehr nützlich.
相机|xiàngjī|Kamera|n|A2|我买了新相机。|Wǒ mǎi le xīn xiàngjī.|Ich habe eine neue Kamera gekauft.
信|xìn|Brief; glauben|n|A2|我给他写了一封信。|Wǒ gěi tā xiě le yì fēng xìn.|Ich habe ihm einen Brief geschrieben.
信号|xìnhào|Signal; Empfang|n|A2|这里手机没有信号。|Zhèlǐ shǒujī méiyǒu xìnhào.|Hier hat das Handy keinen Empfang.
影片|yǐngpiàn|Film|n|A2|这部影片很好看。|Zhè bù yǐngpiàn hěn hǎokàn.|Dieser Film ist sehr gut.
照相机|zhàoxiàngjī|Fotoapparat; Kamera|n|A2|这个照相机很贵。|Zhège zhàoxiàngjī hěn guì.|Diese Kamera ist sehr teuer.
安装|ānzhuāng|installieren; einbauen|v|B1|我安装了一个新软件。|Wǒ ānzhuāngle yí gè xīn ruǎnjiàn.|Ich habe eine neue Software installiert.
保存|bǎocún|speichern; aufbewahren|v|B1|别忘了保存文件。|Bié wàngle bǎocún wénjiàn.|Vergiss nicht, die Datei zu speichern.
报|bào|Zeitung; melden|n|B1|爷爷每天看报。|Yéye měi tiān kàn bào.|Opa liest jeden Tag Zeitung.
报道|bàodào|berichten; Bericht (Medien)|v|B1|电视上报道了这件事。|Diànshì shang bàodàole zhè jiàn shì.|Im Fernsehen wurde darüber berichtet.
标题|biāotí|Überschrift; Titel|n|B1|这篇文章的标题是什么？|Zhè piān wénzhāng de biāotí shì shénme?|Wie lautet die Überschrift dieses Artikels?
播出|bōchū|ausstrahlen; senden|v|B1|这个节目晚上八点播出。|Zhège jiémù wǎnshang bā diǎn bōchū.|Diese Sendung wird um acht Uhr abends ausgestrahlt.
播放|bōfàng|abspielen; senden|v|B1|手机正在播放音乐。|Shǒujī zhèngzài bōfàng yīnyuè.|Das Handy spielt gerade Musik ab.
传播|chuánbō|verbreiten|v|B1|消息传播得很快。|Xiāoxi chuánbō de hěn kuài.|Die Nachricht verbreitet sich sehr schnell.
导演|dǎoyǎn|Regisseur/in|n|B1|他是有名的导演。|Tā shì yǒumíng de dǎoyǎn.|Er ist ein bekannter Regisseur.
电视台|diànshìtái|Fernsehsender|n|B1|她在电视台工作。|Tā zài diànshìtái gōngzuò.|Sie arbeitet bei einem Fernsehsender.
电台|diàntái|Radiosender|n|B1|我喜欢听这个电台。|Wǒ xǐhuan tīng zhège diàntái.|Ich höre diesen Radiosender gern.
电子邮件|diànzǐ yóujiàn|E-Mail|n|B1|我给你发了电子邮件。|Wǒ gěi nǐ fāle diànzǐ yóujiàn.|Ich habe dir eine E-Mail geschickt.
读者|dúzhě|Leser/in|n|B1|这本书有很多读者。|Zhè běn shū yǒu hěn duō dúzhě.|Dieses Buch hat viele Leser.
发表|fābiǎo|veröffentlichen; äußern|v|B1|他发表了一篇文章。|Tā fābiǎole yì piān wénzhāng.|Er hat einen Artikel veröffentlicht.
发送|fāsòng|senden; verschicken|v|B1|短信已经发送了。|Duǎnxìn yǐjīng fāsòng le.|Die SMS wurde schon gesendet.
功能|gōngnéng|Funktion|n|B1|这个手机功能很多。|Zhège shǒujī gōngnéng hěn duō.|Dieses Handy hat viele Funktionen.
观看|guānkàn|anschauen; zuschauen|v|B1|很多人观看了比赛。|Hěn duō rén guānkàn le bǐsài.|Viele Leute haben das Spiel angeschaut.
观众|guānzhòng|Zuschauer; Publikum|n|B1|观众都很高兴。|Guānzhòng dōu hěn gāoxìng.|Die Zuschauer sind alle sehr froh.
广播|guǎngbō|Rundfunk; Durchsage|n|B1|我每天早上听广播。|Wǒ měi tiān zǎoshang tīng guǎngbō.|Ich höre jeden Morgen Radio.
互联网|hùliánwǎng|Internet|n|B1|互联网改变了生活。|Hùliánwǎng gǎibiàn le shēnghuó.|Das Internet hat das Leben verändert.
机器|jīqì|Maschine|n|B1|这台机器坏了。|Zhè tái jīqì huài le.|Diese Maschine ist kaputt.
技术|jìshù|Technik; Können|n|B1|他的开车技术很好。|Tā de kāichē jìshù hěn hǎo.|Er fährt sehr gut Auto.
开发|kāifā|entwickeln; erschließen|v|B1|他们开发了一个新软件。|Tāmen kāifā le yí ge xīn ruǎnjiàn.|Sie haben eine neue Software entwickelt.
连续剧|liánxùjù|Fernsehserie|n|B1|我妈妈爱看连续剧。|Wǒ māma ài kàn liánxùjù.|Meine Mutter schaut gern Fernsehserien.
录|lù|aufnehmen (Ton, Video)|v|B1|我把这首歌录下来了。|Wǒ bǎ zhè shǒu gē lù xiàlai le.|Ich habe dieses Lied aufgenommen.
录音|lùyīn|Tonaufnahme; (Ton) aufnehmen|n|B1|请听一下录音。|Qǐng tīng yíxià lùyīn.|Hör dir bitte die Aufnahme an.
媒体|méitǐ|Medien|n|B1|媒体都在报道这件事。|Méitǐ dōu zài bàodào zhè jiàn shì.|Die Medien berichten alle darüber.
拍|pāi|(Foto) aufnehmen; klatschen|v|B1|我给你拍张照片。|Wǒ gěi nǐ pāi zhāng zhàopiàn.|Ich mache ein Foto von dir.
设备|shèbèi|Ausrüstung; Geräte|n|B1|这些设备很新。|Zhèxiē shèbèi hěn xīn.|Diese Geräte sind ganz neu.
收看|shōukàn|(Sendung) ansehen|v|B1|欢迎收看今天的节目。|Huānyíng shōukàn jīntiān de jiémù.|Willkommen zur heutigen Sendung.
收听|shōutīng|(Radio) hören|v|B1|我每天收听新闻。|Wǒ měi tiān shōutīng xīnwén.|Ich höre jeden Tag Nachrichten.
收音机|shōuyīnjī|Radio(gerät)|n|B1|爷爷喜欢听收音机。|Yéye xǐhuan tīng shōuyīnjī.|Opa hört gern Radio.
输入|shūrù|eingeben|v|B1|请输入密码。|Qǐng shūrù mìmǎ.|Bitte Passwort eingeben.
听众|tīngzhòng|Zuhörer; Publikum|n|B1|听众朋友们，大家好！|Tīngzhòng péngyoumen, dàjiā hǎo!|Liebe Zuhörerinnen und Zuhörer, hallo zusammen!
通信|tōngxìn|Kommunikation; Briefwechsel|n|B1|现在通信很方便。|Xiànzài tōngxìn hěn fāngbiàn.|Heutzutage ist die Kommunikation sehr bequem.
显示|xiǎnshì|anzeigen; zeigen|v|B1|手机显示没有信号。|Shǒujī xiǎnshì méiyǒu xìnhào.|Das Handy zeigt kein Signal an.
现场|xiànchǎng|vor Ort; Schauplatz|n|B1|我在现场看比赛。|Wǒ zài xiànchǎng kàn bǐsài.|Ich sehe das Spiel live vor Ort.
宣布|xuānbù|bekannt geben; verkünden|v|B1|学校宣布明天放假。|Xuéxiào xuānbù míngtiān fàngjià.|Die Schule hat bekannt gegeben, dass morgen frei ist.
宣传|xuānchuán|werben; Werbung|v|B1|他们在宣传新电影。|Tāmen zài xuānchuán xīn diànyǐng.|Sie machen Werbung für den neuen Film.
影视|yǐngshì|Film und Fernsehen|n|B1|他在影视公司工作。|Tā zài yǐngshì gōngsī gōngzuò.|Er arbeitet bei einer Film- und Fernsehfirma.
应用|yìngyòng|Anwendung (App); anwenden|n|B1|这个应用很好用。|Zhège yìngyòng hěn hǎoyòng.|Diese App ist sehr praktisch.
邮箱|yóuxiāng|Briefkasten; E-Mail-Postfach|n|B1|请发到我的邮箱。|Qǐng fā dào wǒ de yóuxiāng.|Bitte schick es an meine E-Mail-Adresse.
杂志|zázhì|Zeitschrift|n|B1|我买了一本杂志。|Wǒ mǎi le yì běn zázhì.|Ich habe eine Zeitschrift gekauft.
专题|zhuāntí|Sonderthema; Spezialthema|n|B1|今天有一个环保专题。|Jīntiān yǒu yí ge huánbǎo zhuāntí.|Heute gibt es ein Sonderthema zum Umweltschutz.
自动|zìdòng|automatisch|adj|B1|这个门会自动打开。|Zhège mén huì zìdòng dǎkāi.|Diese Tür öffnet sich automatisch.
占线|zhànxiàn|besetzt sein (Telefon)|v|B1|他的电话一直占线。|Tā de diànhuà yìzhí zhànxiàn.|Sein Telefon ist ständig besetzt.
`,

  feelings: `
开玩笑|kāi wánxiào|Witze machen; scherzen|v|A1|我是开玩笑的。|Wǒ shì kāi wánxiào de.|Ich mache nur Spaß.
认真|rènzhēn|gewissenhaft; ernsthaft|adj|A1|她学习很认真。|Tā xuéxí hěn rènzhēn.|Sie lernt sehr gewissenhaft.
爱情|àiqíng|Liebe (romantisch)|n|A2|这是一个爱情故事。|Zhè shì yí gè àiqíng gùshi.|Das ist eine Liebesgeschichte.
不满|bùmǎn|unzufrieden|adj|A2|他对这个工作很不满。|Tā duì zhège gōngzuò hěn bùmǎn.|Er ist mit dieser Arbeit sehr unzufrieden.
感到|gǎndào|fühlen; empfinden|v|A2|我感到很高兴。|Wǒ gǎndào hěn gāoxìng.|Ich freue mich sehr.
故意|gùyì|absichtlich|adv|A2|对不起,我不是故意的。|Duìbuqǐ, wǒ bú shì gùyì de.|Entschuldigung, das war keine Absicht.
关心|guānxīn|sich kümmern um; Anteil nehmen|v|A2|父母很关心我。|Fùmǔ hěn guānxīn wǒ.|Meine Eltern kümmern sich sehr um mich.
看法|kànfǎ|Ansicht; Meinung|n|A2|你对这件事有什么看法?|Nǐ duì zhè jiàn shì yǒu shénme kànfǎ?|Wie siehst du diese Sache?
可怕|kěpà|furchtbar; beängstigend|adj|A2|这个电影太可怕了。|Zhège diànyǐng tài kěpà le.|Dieser Film ist wirklich zum Fürchten.
理想|lǐxiǎng|Ideal; Traum(ziel)|n|A2|我的理想是当医生。|Wǒ de lǐxiǎng shì dāng yīshēng.|Mein Traum ist es, Arzt zu werden.
怕|pà|Angst haben; fürchten|v|A2|我很怕狗。|Wǒ hěn pà gǒu.|Ich habe große Angst vor Hunden.
气|qì|Ärger; Luft|n|A2|你别生我的气。|Nǐ bié shēng wǒ de qì.|Sei mir nicht böse.
热情|rèqíng|herzlich; Begeisterung|adj|A2|这里的人很热情。|Zhèlǐ de rén hěn rèqíng.|Die Leute hier sind sehr herzlich.
认为|rènwéi|meinen; der Ansicht sein|v|A2|我认为你说得对。|Wǒ rènwéi nǐ shuō de duì.|Ich finde, du hast recht.
想法|xiǎngfǎ|Idee; Meinung|n|A2|这是个好想法。|Zhè shì gè hǎo xiǎngfǎ.|Das ist eine gute Idee.
心里|xīnli|im Herzen; innerlich|n|A2|我心里很高兴。|Wǒ xīnli hěn gāoxìng.|Ich freue mich innerlich sehr.
心中|xīnzhōng|im Herzen|n|A2|你永远在我心中。|Nǐ yǒngyuǎn zài wǒ xīnzhōng.|Du bist für immer in meinem Herzen.
信心|xìnxīn|Selbstvertrauen; Zuversicht|n|A2|我对你有信心。|Wǒ duì nǐ yǒu xìnxīn.|Ich habe Vertrauen in dich.
以为|yǐwéi|(fälschlich) glauben; denken|v|A2|我以为你不来了。|Wǒ yǐwéi nǐ bù lái le.|Ich dachte, du kommst nicht mehr.
友好|yǒuhǎo|freundlich|adj|A2|这里的人很友好。|Zhèlǐ de rén hěn yǒuhǎo.|Die Leute hier sind sehr freundlich.
重视|zhòngshì|Wert legen auf; wichtig nehmen|v|A2|父母很重视孩子的学习。|Fùmǔ hěn zhòngshì háizi de xuéxí.|Die Eltern legen großen Wert auf das Lernen ihres Kindes.
感兴趣|gǎn xìngqù|sich interessieren (für)|v|A2|我对音乐很感兴趣。|Wǒ duì yīnyuè hěn gǎn xìngqù.|Ich interessiere mich sehr für Musik.
爱心|àixīn|Mitgefühl; Nächstenliebe|n|B1|她是个很有爱心的人。|Tā shì gè hěn yǒu àixīn de rén.|Sie ist ein sehr liebevoller Mensch.
把握|bǎwò|Gewissheit; (Chance) ergreifen|n|B1|我有把握通过考试。|Wǒ yǒu bǎwò tōngguò kǎoshì.|Ich bin sicher, dass ich die Prüfung bestehe.
不安|bù'ān|unruhig; beunruhigt|adj|B1|我心里很不安。|Wǒ xīnli hěn bù'ān.|Ich bin innerlich sehr unruhig.
长处|chángchù|Stärke; Vorzug|n|B1|每个人都有长处。|Měi gè rén dōu yǒu chángchù.|Jeder Mensch hat seine Stärken.
充满|chōngmǎn|voll sein von; erfüllt sein|v|B1|我对未来充满希望。|Wǒ duì wèilái chōngmǎn xīwàng.|Ich bin voller Hoffnung für die Zukunft.
动力|dònglì|Antrieb; Motivation|n|B1|你是我学习的动力。|Nǐ shì wǒ xuéxí de dònglì.|Du bist meine Motivation zum Lernen.
动人|dòngrén|bewegend; rührend|adj|B1|这个故事很动人。|Zhège gùshi hěn dòngrén.|Diese Geschichte ist sehr bewegend.
短处|duǎnchù|Schwäche; Mangel|n|B1|我知道自己的短处。|Wǒ zhīdào zìjǐ de duǎnchù.|Ich kenne meine eigenen Schwächen.
反对|fǎnduì|dagegen sein; ablehnen|v|B1|我反对这个计划。|Wǒ fǎnduì zhège jìhuà.|Ich bin gegen diesen Plan.
反应|fǎnyìng|Reaktion; reagieren|n|B1|他的反应很快。|Tā de fǎnyìng hěn kuài.|Er reagiert sehr schnell.
敢|gǎn|sich trauen; wagen|v|B1|我不敢一个人去。|Wǒ bù gǎn yí ge rén qù.|Ich traue mich nicht, allein hinzugehen.
感情|gǎnqíng|Gefühl; Zuneigung|n|B1|他们的感情很好。|Tāmen de gǎnqíng hěn hǎo.|Sie stehen sich sehr nahe.
感受|gǎnshòu|Empfindung; empfinden|n|B1|说说你的感受吧。|Shuōshuo nǐ de gǎnshòu ba.|Erzähl mal, wie du es empfindest.
个性|gèxìng|Persönlichkeit; Charakter|n|B1|她很有个性。|Tā hěn yǒu gèxìng.|Sie hat viel Persönlichkeit.
好奇|hàoqí|neugierig|adj|B1|孩子对什么都好奇。|Háizi duì shénme dōu hàoqí.|Kinder sind auf alles neugierig.
欢乐|huānlè|fröhlich; Freude|adj|B1|节日的气氛很欢乐。|Jiérì de qìfēn hěn huānlè.|Die Feststimmung ist sehr fröhlich.
积极|jījí|aktiv; engagiert; positiv|adj|B1|他工作很积极。|Tā gōngzuò hěn jījí.|Er arbeitet sehr engagiert.
坚决|jiānjué|entschieden; entschlossen|adj|B1|我坚决反对这样做。|Wǒ jiānjué fǎnduì zhèyàng zuò.|Ich bin entschieden dagegen.
坚强|jiānqiáng|stark (innerlich); standhaft|adj|B1|她是个坚强的人。|Tā shì ge jiānqiáng de rén.|Sie ist ein starker Mensch.
决心|juéxīn|Entschlossenheit; fest entschlossen sein|n|B1|我下决心学好汉语。|Wǒ xià juéxīn xuéhǎo Hànyǔ.|Ich bin fest entschlossen, gut Chinesisch zu lernen.
可靠|kěkào|zuverlässig|adj|B1|他是个可靠的人。|Tā shì ge kěkào de rén.|Er ist ein zuverlässiger Mensch.
乐|lè|fröhlich; sich freuen|adj|B1|他乐得跳了起来。|Tā lè de tiào le qǐlái.|Er ist vor Freude aufgesprungen.
乐观|lèguān|optimistisch|adj|B1|她是个很乐观的人。|Tā shì ge hěn lèguān de rén.|Sie ist ein sehr optimistischer Mensch.
理解|lǐjiě|verstehen; Verständnis|v|B1|我理解你的心情。|Wǒ lǐjiě nǐ de xīnqíng.|Ich verstehe, wie du dich fühlst.
满足|mǎnzú|erfüllen; zufriedenstellen|v|B1|这不能满足我的要求。|Zhè bù néng mǎnzú wǒ de yāoqiú.|Das erfüllt meine Anforderungen nicht.
内心|nèixīn|Inneres; Herz|n|B1|他内心很难过。|Tā nèixīn hěn nánguò.|Innerlich ist er sehr traurig.
亲切|qīnqiè|herzlich; freundlich|adj|B1|这位老师很亲切。|Zhè wèi lǎoshī hěn qīnqiè.|Diese Lehrerin ist sehr herzlich.
情感|qínggǎn|Gefühl; Emotion|n|B1|他不太会表达情感。|Tā bú tài huì biǎodá qínggǎn.|Er kann seine Gefühle nicht gut ausdrücken.
热爱|rè'ài|leidenschaftlich lieben|v|B1|他热爱自己的工作。|Tā rè'ài zìjǐ de gōngzuò.|Er liebt seine Arbeit.
热烈|rèliè|herzlich; begeistert|adj|B1|热烈欢迎你们！|Rèliè huānyíng nǐmen!|Herzlich willkommen!
伤心|shāngxīn|traurig; betrübt|adj|B1|你别太伤心了。|Nǐ bié tài shāngxīn le.|Sei nicht so traurig.
体会|tǐhuì|nachempfinden; Erkenntnis|v|B1|我能体会你的心情。|Wǒ néng tǐhuì nǐ de xīnqíng.|Ich kann nachempfinden, wie du dich fühlst.
痛苦|tòngkǔ|qualvoll; Leid|adj|B1|他心里很痛苦。|Tā xīnli hěn tòngkǔ.|Er leidet innerlich sehr.
心|xīn|Herz|n|B1|她的心很好。|Tā de xīn hěn hǎo.|Sie hat ein gutes Herz.
信任|xìnrèn|vertrauen; Vertrauen|v|B1|我很信任他。|Wǒ hěn xìnrèn tā.|Ich vertraue ihm sehr.
幸运|xìngyùn|glücklich; Glück haben|adj|B1|你真幸运！|Nǐ zhēn xìngyùn!|Du hast wirklich Glück!
性格|xìnggé|Charakter; Wesen|n|B1|她的性格很好。|Tā de xìnggé hěn hǎo.|Sie hat einen guten Charakter.
意外|yìwài|unerwartet; Unfall|adj|B1|这个消息让我很意外。|Zhège xiāoxi ràng wǒ hěn yìwài.|Diese Nachricht hat mich sehr überrascht.
印象|yìnxiàng|Eindruck|n|B1|我对他的印象很好。|Wǒ duì tā de yìnxiàng hěn hǎo.|Ich habe einen guten Eindruck von ihm.
愿望|yuànwàng|Wunsch|n|B1|我的愿望是去中国。|Wǒ de yuànwàng shì qù Zhōngguó.|Mein Wunsch ist es, nach China zu reisen.
主动|zhǔdòng|von sich aus; aktiv|adj|B1|他主动帮助别人。|Tā zhǔdòng bāngzhù biérén.|Er hilft anderen von sich aus.
主张|zhǔzhāng|befürworten; Standpunkt|v|B1|我主张早点儿出发。|Wǒ zhǔzhāng zǎo diǎnr chūfā.|Ich bin dafür, früher loszufahren.
自觉|zìjué|pflichtbewusst; von sich aus|adj|B1|这个孩子学习很自觉。|Zhège háizi xuéxí hěn zìjué.|Dieses Kind lernt ganz von sich aus.
冷静|lěngjìng|ruhig; besonnen|adj|B1|你先冷静一下。|Nǐ xiān lěngjìng yíxià.|Beruhige dich erst mal.
勇敢|yǒnggǎn|mutig|adj|B1|这个孩子很勇敢。|Zhège háizi hěn yǒnggǎn.|Dieses Kind ist sehr mutig.
原谅|yuánliàng|verzeihen|v|B1|请原谅我。|Qǐng yuánliàng wǒ.|Bitte verzeih mir.
可怜|kělián|bemitleidenswert; arm|adj|B1|这只小狗真可怜。|Zhè zhī xiǎo gǒu zhēn kělián.|Dieser kleine Hund ist wirklich arm dran.
吃惊|chījīng|überrascht sein; staunen|v|B1|这个消息让我很吃惊。|Zhège xiāoxi ràng wǒ hěn chījīng.|Diese Nachricht hat mich sehr überrascht.
同情|tóngqíng|Mitleid haben; mitfühlen|v|B1|大家都很同情他。|Dàjiā dōu hěn tóngqíng tā.|Alle haben großes Mitleid mit ihm.
回忆|huíyì|sich erinnern; Erinnerung|v|B1|我常常回忆小时候。|Wǒ chángcháng huíyì xiǎoshíhou.|Ich denke oft an meine Kindheit zurück.
害羞|hàixiū|schüchtern|adj|B1|她有点儿害羞。|Tā yǒudiǎnr hàixiū.|Sie ist ein bisschen schüchtern.
尊重|zūnzhòng|respektieren|v|B1|我们要尊重别人。|Wǒmen yào zūnzhòng biéren.|Wir müssen andere respektieren.
幽默|yōumò|humorvoll|adj|B1|我爸爸很幽默。|Wǒ bàba hěn yōumò.|Mein Vater ist sehr humorvoll.
得意|déyì|selbstzufrieden; stolz|adj|B1|他考了第一名，很得意。|Tā kǎo le dì-yī míng, hěn déyì.|Er wurde Bester in der Prüfung und ist sehr stolz auf sich.
怀疑|huáiyí|zweifeln; verdächtigen|v|B1|我怀疑他没说真话。|Wǒ huáiyí tā méi shuō zhēnhuà.|Ich vermute, er hat nicht die Wahrheit gesagt.
愉快|yúkuài|fröhlich; angenehm|adj|B1|祝你周末愉快！|Zhù nǐ zhōumò yúkuài!|Ich wünsche dir ein schönes Wochenende!
懒|lǎn|faul|adj|B1|我弟弟太懒了。|Wǒ dìdi tài lǎn le.|Mein kleiner Bruder ist zu faul.
放松|fàngsōng|sich entspannen|v|B1|周末好好放松一下。|Zhōumò hǎohǎo fàngsōng yíxià.|Entspann dich am Wochenende mal richtig.
梦|mèng|Traum|n|B1|昨晚我做了一个梦。|Zuówǎn wǒ zuò le yí gè mèng.|Letzte Nacht hatte ich einen Traum.
活泼|huópo|lebhaft|adj|B1|她的女儿很活泼。|Tā de nǚ'ér hěn huópo.|Ihre Tochter ist sehr lebhaft.
浪漫|làngmàn|romantisch|adj|B1|他是一个很浪漫的人。|Tā shì yí gè hěn làngmàn de rén.|Er ist ein sehr romantischer Mensch.
激动|jīdòng|aufgeregt; bewegt|adj|B1|听到消息，她很激动。|Tīngdào xiāoxi, tā hěn jīdòng.|Als sie die Nachricht hörte, war sie sehr aufgeregt.
烦恼|fánnǎo|bekümmert; Sorgen|adj|B1|别为这件小事烦恼。|Bié wèi zhè jiàn xiǎo shì fánnǎo.|Mach dir wegen dieser Kleinigkeit keine Sorgen.
礼貌|lǐmào|Höflichkeit; höflich|n|B1|这个孩子很有礼貌。|Zhège háizi hěn yǒu lǐmào.|Dieses Kind ist sehr höflich.
粗心|cūxīn|unachtsam; schusselig|adj|B1|他做事太粗心了。|Tā zuòshì tài cūxīn le.|Er arbeitet viel zu unachtsam.
耐心|nàixīn|geduldig; Geduld|adj|B1|她对孩子很耐心。|Tā duì háizi hěn nàixīn.|Sie ist sehr geduldig mit Kindern.
脾气|píqi|Temperament; Laune|n|B1|他的脾气不太好。|Tā de píqi bú tài hǎo.|Er ist ziemlich launisch.
自信|zìxìn|selbstbewusst; Selbstvertrauen|adj|B1|她是个很自信的人。|Tā shì gè hěn zìxìn de rén.|Sie ist ein sehr selbstbewusster Mensch.
诚实|chéngshí|ehrlich|adj|B1|他是个诚实的孩子。|Tā shì gè chéngshí de háizi.|Er ist ein ehrliches Kind.
误会|wùhuì|missverstehen; Missverständnis|v|B1|对不起，我误会你了。|Duìbuqǐ, wǒ wùhuì nǐ le.|Entschuldige, ich habe dich missverstanden.
轻松|qīngsōng|entspannt; locker|adj|B1|这个工作很轻松。|Zhège gōngzuò hěn qīngsōng.|Diese Arbeit ist ganz entspannt.
辛苦|xīnkǔ|anstrengend; mühsam|adj|B1|辛苦了，快休息吧。|Xīnkǔ le, kuài xiūxi ba.|Danke für deine Mühe, ruh dich schnell aus.
马虎|mǎhu|schlampig; nachlässig|adj|B1|做作业不能马虎。|Zuò zuòyè bù néng mǎhu.|Bei den Hausaufgaben darf man nicht schlampen.
骄傲|jiāo'ào|stolz; eingebildet|adj|B1|爸爸妈妈为你骄傲。|Bàba māma wèi nǐ jiāo'ào.|Mama und Papa sind stolz auf dich.
鼓励|gǔlì|ermutigen|v|B1|老师常常鼓励我们。|Lǎoshī chángcháng gǔlì wǒmen.|Der Lehrer ermutigt uns oft.
`,

  health: `
病|bìng|Krankheit; krank sein|n|A1|他的病好了。|Tā de bìng hǎo le.|Er ist wieder gesund.
病人|bìngrén|Patient/in|n|A1|医生在看病人。|Yīshēng zài kàn bìngrén.|Der Arzt untersucht gerade einen Patienten.
看病|kànbìng|zum Arzt gehen|v|A1|我明天去医院看病。|Wǒ míngtiān qù yīyuàn kànbìng.|Ich gehe morgen im Krankenhaus zum Arzt.
身上|shēnshang|am Körper; bei sich|n|A1|我身上没带钱。|Wǒ shēnshang méi dài qián.|Ich habe kein Geld bei mir.
出院|chūyuàn|aus dem Krankenhaus entlassen werden|v|A2|奶奶明天出院。|Nǎinai míngtiān chūyuàn.|Oma wird morgen aus dem Krankenhaus entlassen.
个子|gèzi|Körpergröße; Statur|n|A2|他个子很高。|Tā gèzi hěn gāo.|Er ist sehr groß.
脸|liǎn|Gesicht|n|A2|她的脸红了。|Tā de liǎn hóng le.|Sie ist rot geworden.
全身|quánshēn|der ganze Körper|n|A2|我全身都疼。|Wǒ quánshēn dōu téng.|Mir tut der ganze Körper weh.
头发|tóufa|Haar; Haare|n|A2|她的头发很长。|Tā de tóufa hěn cháng.|Ihre Haare sind sehr lang.
腿|tuǐ|Bein|n|A2|我的腿很疼。|Wǒ de tuǐ hěn téng.|Mein Bein tut sehr weh.
午睡|wǔshuì|Mittagsschlaf (halten)|v|A2|我每天都午睡。|Wǒ měi tiān dōu wǔshuì.|Ich halte jeden Tag Mittagsschlaf.
西医|xīyī|westliche Medizin|n|A2|我想去看西医。|Wǒ xiǎng qù kàn xīyī.|Ich möchte zu einem Arzt für westliche Medizin.
眼|yǎn|Auge|n|A2|我左眼有点儿疼。|Wǒ zuǒ yǎn yǒudiǎnr téng.|Mein linkes Auge tut etwas weh.
药片|yàopiàn|Tablette|n|A2|这个药片一天吃两次。|Zhège yàopiàn yì tiān chī liǎng cì.|Diese Tablette nimmt man zweimal täglich.
药水|yàoshuǐ|flüssige Medizin; Arzneisaft|n|A2|这种药水很苦。|Zhè zhǒng yàoshuǐ hěn kǔ.|Dieser Arzneisaft ist sehr bitter.
中医|zhōngyī|traditionelle chinesische Medizin|n|A2|我想去看中医。|Wǒ xiǎng qù kàn zhōngyī.|Ich möchte zu einem Arzt für chinesische Medizin gehen.
住院|zhùyuàn|im Krankenhaus liegen|v|A2|他生病住院了。|Tā shēngbìng zhùyuàn le.|Er ist krank und liegt im Krankenhaus.
嘴|zuǐ|Mund|n|A2|请张开嘴。|Qǐng zhāngkāi zuǐ.|Bitte mach den Mund auf.
刷牙|shuāyá|Zähne putzen|v|A2|睡觉前要刷牙。|Shuìjiào qián yào shuāyá.|Vor dem Schlafen muss man Zähne putzen.
耳朵|ěrduo|Ohr|n|A2|我的耳朵有点儿疼。|Wǒ de ěrduo yǒudiǎnr téng.|Mein Ohr tut ein bisschen weh.
鼻子|bízi|Nase|n|A2|他的鼻子很高。|Tā de bízi hěn gāo.|Er hat eine markante Nase.
大夫|dàifu|Arzt/Ärztin|n|B1|大夫说我要多休息。|Dàifu shuō wǒ yào duō xiūxi.|Der Arzt sagt, ich soll mich mehr ausruhen.
精神|jīngshen|Energie; Elan; munter|n|B1|你今天看起来很有精神。|Nǐ jīntiān kànqǐlái hěn yǒu jīngshen.|Du wirkst heute sehr munter.
救|jiù|retten|v|B1|医生救了他的命。|Yīshēng jiù le tā de mìng.|Der Arzt hat ihm das Leben gerettet.
困|kùn|müde; schläfrig|adj|B1|我困了，想睡觉。|Wǒ kùn le, xiǎng shuìjiào.|Ich bin müde und möchte schlafen.
力|lì|Kraft|n|B1|大家都出了一份力。|Dàjiā dōu chū le yí fèn lì.|Alle haben ihren Teil beigetragen.
力量|lìliàng|Kraft; Stärke|n|B1|团结就是力量。|Tuánjié jiù shì lìliàng.|Einigkeit macht stark.
去世|qùshì|sterben; versterben|v|B1|他爷爷去年去世了。|Tā yéye qùnián qùshì le.|Sein Großvater ist letztes Jahr gestorben.
伤|shāng|Verletzung; verletzen|n|B1|他的腿受了伤。|Tā de tuǐ shòu le shāng.|Er hat sich am Bein verletzt.
生命|shēngmìng|Leben|n|B1|生命只有一次。|Shēngmìng zhǐ yǒu yí cì.|Man lebt nur einmal.
手指|shǒuzhǐ|Finger|n|B1|我的手指很疼。|Wǒ de shǒuzhǐ hěn téng.|Mein Finger tut sehr weh.
死|sǐ|sterben; tot|v|B1|我的鱼死了。|Wǒ de yú sǐ le.|Mein Fisch ist gestorben.
痛|tòng|wehtun; schmerzen|adj|B1|我的头很痛。|Wǒ de tóu hěn tòng.|Mein Kopf tut sehr weh.
危害|wēihài|schaden; Schaden|v|B1|吸烟危害健康。|Xīyān wēihài jiànkāng.|Rauchen schadet der Gesundheit.
卫生|wèishēng|Hygiene; hygienisch|n|B1|要注意个人卫生。|Yào zhùyì gèrén wèishēng.|Man muss auf die persönliche Hygiene achten.
血|xiě|Blut|n|B1|他的手流血了。|Tā de shǒu liúxiě le.|Seine Hand blutet.
烟|yān|Rauch; Zigarette|n|B1|这里不能抽烟。|Zhèlǐ bù néng chōuyān.|Hier darf man nicht rauchen.
预防|yùfáng|vorbeugen|v|B1|多洗手可以预防感冒。|Duō xǐshǒu kěyǐ yùfáng gǎnmào.|Häufiges Händewaschen beugt Erkältungen vor.
力气|lìqi|Kraft|n|B1|他的力气很大。|Tā de lìqi hěn dà.|Er hat viel Kraft.
打针|dǎzhēn|eine Spritze bekommen; spritzen|v|B1|孩子很怕打针。|Háizi hěn pà dǎzhēn.|Das Kind hat große Angst vor Spritzen.
抽烟|chōuyān|rauchen|v|B1|抽烟对身体不好。|Chōuyān duì shēntǐ bù hǎo.|Rauchen ist schlecht für die Gesundheit.
汗|hàn|Schweiß|n|B1|我出了很多汗。|Wǒ chū le hěn duō hàn.|Ich habe stark geschwitzt.
皮肤|pífū|Haut|n|B1|夏天要保护皮肤。|Xiàtiān yào bǎohù pífū.|Im Sommer muss man die Haut schützen.
胳膊|gēbo|Arm|n|B1|我的胳膊很疼。|Wǒ de gēbo hěn téng.|Mein Arm tut sehr weh.
醒|xǐng|aufwachen|v|B1|我今天六点就醒了。|Wǒ jīntiān liù diǎn jiù xǐng le.|Ich bin heute schon um sechs aufgewacht.
`,

  weather: `
雨|yǔ|Regen|n|A1|今天的雨很大。|Jīntiān de yǔ hěn dà.|Heute regnet es stark.
草|cǎo|Gras|n|A2|这里的草很绿。|Zhèlǐ de cǎo hěn lǜ.|Das Gras hier ist sehr grün.
草地|cǎodì|Wiese; Rasen|n|A2|孩子们在草地上玩。|Háizimen zài cǎodì shang wán.|Die Kinder spielen auf der Wiese.
吹|chuī|blasen; wehen|v|A2|今天风吹得很大。|Jīntiān fēng chuī de hěn dà.|Heute weht der Wind sehr stark.
大海|dàhǎi|Meer|n|A2|我第一次看见大海。|Wǒ dì yī cì kànjiàn dàhǎi.|Ich sehe zum ersten Mal das Meer.
大自然|dàzìrán|die Natur|n|A2|我喜欢大自然。|Wǒ xǐhuan dàzìrán.|Ich liebe die Natur.
地球|dìqiú|Erde (Planet)|n|A2|我们都住在地球上。|Wǒmen dōu zhù zài dìqiú shang.|Wir leben alle auf der Erde.
动物|dòngwù|Tier|n|A2|你喜欢什么动物?|Nǐ xǐhuan shénme dòngwù?|Welche Tiere magst du?
动物园|dòngwùyuán|Zoo|n|A2|周末我们去动物园。|Zhōumò wǒmen qù dòngwùyuán.|Am Wochenende gehen wir in den Zoo.
多云|duōyún|bewölkt|adj|A2|明天北京多云。|Míngtiān Běijīng duōyún.|Morgen ist es in Peking bewölkt.
狗|gǒu|Hund|n|A2|我家有一只狗。|Wǒ jiā yǒu yì zhī gǒu.|Wir haben einen Hund.
湖|hú|See|n|A2|湖边的风景很美。|Hú biān de fēngjǐng hěn měi.|Die Landschaft am See ist sehr schön.
鸡|jī|Huhn|n|A2|奶奶家有很多鸡。|Nǎinai jiā yǒu hěn duō jī.|Bei Oma gibt es viele Hühner.
凉|liáng|kühl|adj|A2|今天天气有点儿凉。|Jīntiān tiānqì yǒudiǎnr liáng.|Heute ist es etwas kühl.
零下|língxià|unter null|n|A2|今天零下五度。|Jīntiān língxià wǔ dù.|Heute sind es minus fünf Grad.
猫|māo|Katze|n|A2|我家有一只猫。|Wǒ jiā yǒu yì zhī māo.|Wir haben eine Katze zu Hause.
鸟|niǎo|Vogel|n|A2|树上有一只鸟。|Shù shang yǒu yì zhī niǎo.|Auf dem Baum sitzt ein Vogel.
气温|qìwēn|Lufttemperatur|n|A2|今天气温很高。|Jīntiān qìwēn hěn gāo.|Heute ist die Temperatur sehr hoch.
晴|qíng|sonnig; heiter|adj|A2|今天是晴天。|Jīntiān shì qíngtiān.|Heute ist ein sonniger Tag.
天上|tiānshàng|am Himmel|n|A2|天上有很多星星。|Tiānshàng yǒu hěn duō xīngxing.|Am Himmel sind viele Sterne.
星星|xīngxing|Stern|n|A2|今晚的星星很亮。|Jīnwǎn de xīngxing hěn liàng.|Die Sterne sind heute Abend sehr hell.
雪|xuě|Schnee|n|A2|外面下雪了。|Wàimiàn xià xuě le.|Draußen schneit es.
阴|yīn|bewölkt; trüb|adj|A2|今天是阴天。|Jīntiān shì yīntiān.|Heute ist es bewölkt.
冬|dōng|Winter|n|A2|北京的冬天很冷。|Běijīng de dōngtiān hěn lěng.|Der Winter in Peking ist sehr kalt.
夏|xià|Sommer|n|A2|夏天我喜欢游泳。|Xiàtiān wǒ xǐhuan yóuyǒng.|Im Sommer schwimme ich gern.
春|chūn|Frühling|n|A2|春天花都开了。|Chūntiān huā dōu kāi le.|Im Frühling blühen alle Blumen.
熊猫|xióngmāo|Panda|n|A2|我想去看熊猫。|Wǒ xiǎng qù kàn xióngmāo.|Ich möchte Pandas anschauen gehen.
秋|qiū|Herbst|n|A2|秋天不冷也不热。|Qiūtiān bù lěng yě bú rè.|Im Herbst ist es weder kalt noch heiß.
光|guāng|Licht|n|B1|房间里的光太暗了。|Fángjiān li de guāng tài àn le.|Das Licht im Zimmer ist zu schwach.
化|huà|schmelzen; -isierung (Suffix)|v|B1|雪已经化了。|Xuě yǐjīng huà le.|Der Schnee ist schon geschmolzen.
景色|jǐngsè|Landschaft; Aussicht|n|B1|这里的景色真美！|Zhèlǐ de jǐngsè zhēn měi!|Die Landschaft hier ist wirklich schön!
马|mǎ|Pferd|n|B1|他会骑马。|Tā huì qí mǎ.|Er kann reiten.
牛|niú|Rind; Kuh|n|B1|那边有三头牛。|Nàbiān yǒu sān tóu niú.|Dort drüben sind drei Kühe.
气候|qìhòu|Klima|n|B1|这里的气候很好。|Zhèlǐ de qìhòu hěn hǎo.|Das Klima hier ist sehr gut.
沙子|shāzi|Sand|n|B1|我的鞋里有沙子。|Wǒ de xié lǐ yǒu shāzi.|Ich habe Sand in den Schuhen.
生长|shēngzhǎng|wachsen|v|B1|这种花生长得很快。|Zhè zhǒng huā shēngzhǎng de hěn kuài.|Diese Blumenart wächst sehr schnell.
石头|shítou|Stein|n|B1|路上有一块大石头。|Lùshang yǒu yí kuài dà shítou.|Auf dem Weg liegt ein großer Stein.
天空|tiānkōng|Himmel|n|B1|今天的天空很蓝。|Jīntiān de tiānkōng hěn lán.|Der Himmel ist heute sehr blau.
土|tǔ|Erde; Boden|n|B1|鞋上都是土。|Xié shang dōu shì tǔ.|Die Schuhe sind voller Erde.
温暖|wēnnuǎn|warm|adj|B1|今天的阳光很温暖。|Jīntiān de yángguāng hěn wēnnuǎn.|Die Sonne ist heute schön warm.
羊|yáng|Schaf; Ziege|n|B1|山上有很多羊。|Shān shang yǒu hěn duō yáng.|Auf dem Berg gibt es viele Schafe.
阳光|yángguāng|Sonnenschein|n|B1|今天阳光很好。|Jīntiān yángguāng hěn hǎo.|Heute scheint schön die Sonne.
预报|yùbào|Vorhersage; vorhersagen|n|B1|天气预报说明天下雨。|Tiānqì yùbào shuō míngtiān xiàyǔ.|Laut Wetterbericht regnet es morgen.
种子|zhǒngzi|Samen; Saatgut|n|B1|我买了一些花的种子。|Wǒ mǎi le yìxiē huā de zhǒngzi.|Ich habe ein paar Blumensamen gekauft.
猪|zhū|Schwein|n|B1|他家养了三头猪。|Tā jiā yǎng le sān tóu zhū.|Seine Familie hält drei Schweine.
自然|zìrán|Natur; natürlich|n|B1|我喜欢大自然。|Wǒ xǐhuan dàzìrán.|Ich liebe die Natur.
叶子|yèzi|Blatt (Pflanze)|n|B1|秋天叶子变黄了。|Qiūtiān yèzi biàn huáng le.|Im Herbst sind die Blätter gelb geworden.
森林|sēnlín|Wald|n|B1|森林里有很多动物。|Sēnlín li yǒu hěn duō dòngwù.|Im Wald gibt es viele Tiere.
植物|zhíwù|Pflanze|n|B1|我家有很多植物。|Wǒ jiā yǒu hěn duō zhíwù.|Bei mir zu Hause gibt es viele Pflanzen.
海洋|hǎiyáng|Ozean; Meer|n|B1|海洋里有很多鱼。|Hǎiyáng li yǒu hěn duō yú.|Im Meer gibt es viele Fische.
老虎|lǎohǔ|Tiger|n|B1|动物园里有老虎。|Dòngwùyuán li yǒu lǎohǔ.|Im Zoo gibt es Tiger.
`,
};

export default part7;
