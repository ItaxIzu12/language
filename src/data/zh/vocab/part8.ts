// HSK-Ergänzung (HSK 3.0 Stufen 1–3 und HSK 2.0 Stufen 1–4), nach Niveau sortiert.
// Format: Wort | Pinyin | Deutsch | Wortart | Niveau | Beispiel | Beispiel-Pinyin | Beispiel-Deutsch | L
const part8: Record<string, string> = {
  verbs: `
出来|chūlai|herauskommen|v|A1|你快出来吧。|Nǐ kuài chūlai ba.|Komm schnell raus.
出去|chūqu|hinausgehen|v|A1|我想出去走走。|Wǒ xiǎng chūqu zǒuzou.|Ich möchte ein bisschen rausgehen.
打开|dǎkāi|öffnen; aufmachen|v|A1|请打开窗户。|Qǐng dǎkāi chuānghu.|Bitte mach das Fenster auf.
得到|dédào|bekommen; erhalten|v|A1|他得到了一个好机会。|Tā dédào le yí gè hǎo jīhuì.|Er hat eine gute Chance bekommen.
动|dòng|sich bewegen|v|A1|请你不要动。|Qǐng nǐ búyào dòng.|Bitte beweg dich nicht.
干|gàn|machen; tun|v|A1|这个工作我来干。|Zhège gōngzuò wǒ lái gàn.|Diese Arbeit übernehme ich.
关上|guānshang|zumachen; schließen|v|A1|请把门关上。|Qǐng bǎ mén guānshang.|Bitte mach die Tür zu.
回到|huídào|zurückkehren nach|v|A1|他回到家了。|Tā huídào jiā le.|Er ist wieder zu Hause.
回来|huílai|zurückkommen|v|A1|你什么时候回来？|Nǐ shénme shíhou huílai?|Wann kommst du zurück?
回去|huíqu|zurückgehen|v|A1|太晚了，我要回去了。|Tài wǎn le, wǒ yào huíqu le.|Es ist schon spät, ich muss zurück.
见|jiàn|sehen; treffen|v|A1|我们明天见！|Wǒmen míngtiān jiàn!|Wir sehen uns morgen!
进来|jìnlai|hereinkommen|v|A1|请进来坐吧。|Qǐng jìnlai zuò ba.|Komm doch rein und setz dich.
进去|jìnqu|hineingehen|v|A1|我们进去看看吧。|Wǒmen jìnqu kànkan ba.|Lass uns reingehen und mal schauen.
看到|kàndào|sehen; erblicken|v|A1|我看到他了。|Wǒ kàndào tā le.|Ich habe ihn gesehen.
看见|kànjiàn|sehen; erblicken|v|A1|你看见我的手机了吗？|Nǐ kànjiàn wǒ de shǒujī le ma?|Hast du mein Handy gesehen?
起|qǐ|aufstehen; sich erheben|v|A1|他每天起得很早。|Tā měi tiān qǐ de hěn zǎo.|Er steht jeden Tag sehr früh auf.
起来|qǐlai|aufstehen|v|A1|快起来，八点了！|Kuài qǐlai, bā diǎn le!|Steh schnell auf, es ist schon acht!
睡|shuì|schlafen|v|A1|你昨天睡得好吗？|Nǐ zuótiān shuì de hǎo ma?|Hast du gestern gut geschlafen?
说话|shuōhuà|sprechen; reden|v|A1|上课的时候别说话。|Shàngkè de shíhou bié shuōhuà.|Im Unterricht bitte nicht reden.
听到|tīngdào|hören|v|A1|我听到了你的声音。|Wǒ tīngdào le nǐ de shēngyīn.|Ich habe deine Stimme gehört.
听见|tīngjiàn|hören|v|A1|你听见了吗？|Nǐ tīngjiàn le ma?|Hast du es gehört?
忘记|wàngjì|vergessen|v|A1|我忘记带钥匙了。|Wǒ wàngjì dài yàoshi le.|Ich habe vergessen, den Schlüssel mitzunehmen.
找到|zhǎodào|finden|v|A1|我找到我的手机了。|Wǒ zhǎodào wǒ de shǒujī le.|Ich habe mein Handy gefunden.
坐下|zuòxia|sich hinsetzen|v|A1|请大家坐下。|Qǐng dàjiā zuòxia.|Bitte setzt euch alle.
帮助|bāngzhù|helfen; Hilfe|v|A2|谢谢你的帮助。|Xièxie nǐ de bāngzhù.|Danke für deine Hilfe.
变成|biànchéng|werden zu; sich verwandeln in|v|A2|水变成冰了。|Shuǐ biànchéng bīng le.|Das Wasser ist zu Eis geworden.
查|chá|nachschlagen; überprüfen|v|A2|我上网查一下。|Wǒ shàngwǎng chá yíxià.|Ich schaue mal kurz im Internet nach.
超过|chāoguò|übersteigen; überholen|v|A2|人数超过了一百。|Rénshù chāoguò le yìbǎi.|Die Zahl der Leute hat hundert überschritten.
称|chēng|nennen; wiegen|v|A2|大家都称他老王。|Dàjiā dōu chēng tā Lǎo Wáng.|Alle nennen ihn Lao Wang.
成|chéng|werden (zu)|v|A2|他们成了好朋友。|Tāmen chéng le hǎo péngyou.|Sie sind gute Freunde geworden.
成为|chéngwéi|werden (zu)|v|A2|她想成为医生。|Tā xiǎng chéngwéi yīshēng.|Sie möchte Ärztin werden.
重复|chóngfù|wiederholen|v|A2|请重复一遍。|Qǐng chóngfù yí biàn.|Bitte wiederholen Sie das einmal.
出门|chūmén|aus dem Haus gehen|v|A2|我早上八点出门。|Wǒ zǎoshang bā diǎn chūmén.|Ich gehe morgens um acht aus dem Haus.
出现|chūxiàn|erscheinen; auftauchen|v|A2|又出现了新问题。|Yòu chūxiàn le xīn wèntí.|Es ist wieder ein neues Problem aufgetaucht.
带来|dàilái|mitbringen; mit sich bringen|v|A2|我给你带来了礼物。|Wǒ gěi nǐ dàilái le lǐwù.|Ich habe dir ein Geschenk mitgebracht.
得出|déchū|zu (einem Ergebnis) kommen|v|A2|我们得出了一个结果。|Wǒmen déchū le yí gè jiéguǒ.|Wir sind zu einem Ergebnis gekommen.
点头|diǎntóu|nicken|v|A2|他笑着点了点头。|Tā xiào zhe diǎn le diǎn tóu.|Er nickte lächelnd.
掉|diào|herunterfallen; verlieren|v|A2|我的手机掉了。|Wǒ de shǒujī diào le.|Mein Handy ist heruntergefallen.
懂得|dǒngde|verstehen; wissen (wie)|v|A2|他懂得关心别人。|Tā dǒngde guānxīn biérén.|Er versteht es, sich um andere zu kümmern.
放下|fàngxià|hinlegen; ablegen|v|A2|请把书放下。|Qǐng bǎ shū fàngxià.|Bitte leg das Buch hin.
分开|fēnkāi|(sich) trennen|v|A2|我们不想分开。|Wǒmen bù xiǎng fēnkāi.|Wir wollen uns nicht trennen.
该|gāi|sollen; müssen|v|A2|我该回家了。|Wǒ gāi huí jiā le.|Ich sollte jetzt nach Hause gehen.
改变|gǎibiàn|(ver)ändern|v|A2|他改变了主意。|Tā gǎibiàn le zhǔyi.|Er hat seine Meinung geändert.
够|gòu|genug sein; ausreichen|v|A2|我带的钱不够。|Wǒ dài de qián bú gòu.|Das Geld, das ich dabeihabe, reicht nicht.
过来|guòlai|herüberkommen; herkommen|v|A2|你过来一下。|Nǐ guòlai yíxià.|Komm mal kurz her.
过去|guòqu|hinübergehen; hingehen|v|A2|我们过去看看吧。|Wǒmen guòqu kànkan ba.|Lass uns mal hinübergehen und schauen.
喊|hǎn|rufen; schreien|v|A2|外面有人喊你。|Wàimiàn yǒu rén hǎn nǐ.|Draußen ruft jemand nach dir.
加|jiā|hinzufügen; plus|v|A2|咖啡里要加糖吗?|Kāfēi lǐ yào jiā táng ma?|Möchtest du Zucker in den Kaffee?
见到|jiàndào|sehen; treffen|v|A2|很高兴见到你。|Hěn gāoxìng jiàndào nǐ.|Schön, dich zu sehen.
见过|jiànguo|schon einmal gesehen haben|v|A2|我以前见过他。|Wǒ yǐqián jiànguo tā.|Ich habe ihn früher schon einmal gesehen.
讲|jiǎng|sprechen; erzählen; erklären|v|A2|老师讲得很清楚。|Lǎoshī jiǎng de hěn qīngchu.|Der Lehrer erklärt sehr verständlich.
讲话|jiǎnghuà|sprechen; eine Rede halten|v|A2|上课的时候别讲话。|Shàngkè de shíhou bié jiǎnghuà.|Rede nicht während des Unterrichts.
交|jiāo|abgeben; bezahlen|v|A2|明天要交作业。|Míngtiān yào jiāo zuòyè.|Morgen müssen die Hausaufgaben abgegeben werden.
交给|jiāogěi|übergeben an|v|A2|请把这本书交给老师。|Qǐng bǎ zhè běn shū jiāogěi lǎoshī.|Bitte gib dieses Buch dem Lehrer.
叫作|jiàozuò|heißen; genannt werden|v|A2|这种花叫作什么?|Zhè zhǒng huā jiàozuò shénme?|Wie nennt man diese Blumenart?
接|jiē|abholen; entgegennehmen|v|A2|我去机场接你。|Wǒ qù jīchǎng jiē nǐ.|Ich hole dich vom Flughafen ab.
接到|jiēdào|erhalten; bekommen|v|A2|我接到了他的电话。|Wǒ jiēdào le tā de diànhuà.|Ich habe einen Anruf von ihm bekommen.
进入|jìnrù|eintreten; hineingehen|v|A2|请不要进入这个房间。|Qǐng bú yào jìnrù zhège fángjiān.|Bitte betreten Sie diesen Raum nicht.
进行|jìnxíng|durchführen; im Gange sein|v|A2|比赛正在进行。|Bǐsài zhèngzài jìnxíng.|Das Spiel läuft gerade.
经过|jīngguò|vorbeikommen an; passieren|v|A2|我每天经过这家店。|Wǒ měi tiān jīngguò zhè jiā diàn.|Ich komme jeden Tag an diesem Laden vorbei.
举|jǔ|heben; hochhalten|v|A2|请把手举起来。|Qǐng bǎ shǒu jǔ qǐlai.|Bitte heben Sie die Hand.
举行|jǔxíng|abhalten; veranstalten|v|A2|学校明天举行运动会。|Xuéxiào míngtiān jǔxíng yùndònghuì.|Die Schule veranstaltet morgen ein Sportfest.
靠|kào|sich anlehnen; sich verlassen auf|v|A2|别靠在门上。|Bié kào zài mén shang.|Lehn dich nicht an die Tür.
拉|lā|ziehen|v|A2|请帮我拉一下门。|Qǐng bāng wǒ lā yíxià mén.|Zieh bitte mal die Tür für mich auf.
来自|láizì|kommen aus; stammen aus|v|A2|我来自德国。|Wǒ láizì Déguó.|Ich komme aus Deutschland.
留|liú|bleiben; zurücklassen|v|A2|你留在这儿等我。|Nǐ liú zài zhèr děng wǒ.|Bleib hier und warte auf mich.
留下|liúxià|hinterlassen; dableiben|v|A2|请留下你的电话。|Qǐng liúxià nǐ de diànhuà.|Bitte hinterlassen Sie Ihre Telefonnummer.
流|liú|fließen|v|A2|河水流得很快。|Héshuǐ liú de hěn kuài.|Das Wasser im Fluss fließt sehr schnell.
拿出|náchū|herausnehmen; hervorholen|v|A2|他拿出了手机。|Tā náchū le shǒujī.|Er holte sein Handy heraus.
拿到|nádào|bekommen; erhalten|v|A2|我拿到票了。|Wǒ nádào piào le.|Ich habe die Tickets bekommen.
能够|nénggòu|können; imstande sein|v|A2|我能够自己做。|Wǒ nénggòu zìjǐ zuò.|Ich kann das selbst machen.
弄|nòng|machen; anstellen|v|A2|我把手机弄坏了。|Wǒ bǎ shǒujī nònghuài le.|Ich habe mein Handy kaputt gemacht.
排队|páiduì|Schlange stehen; anstehen|v|A2|买票要排队。|Mǎi piào yào páiduì.|Für Tickets muss man anstehen.
碰|pèng|berühren; anstoßen|v|A2|别碰我的东西。|Bié pèng wǒ de dōngxi.|Fass meine Sachen nicht an.
碰到|pèngdào|zufällig treffen; stoßen auf|v|A2|我在路上碰到了老师。|Wǒ zài lù shang pèngdào le lǎoshī.|Ich habe unterwegs den Lehrer getroffen.
碰见|pèngjiàn|zufällig treffen|v|A2|我昨天碰见他了。|Wǒ zuótiān pèngjiàn tā le.|Ich habe ihn gestern zufällig getroffen.
请求|qǐngqiú|bitten; Bitte|v|A2|他请求我帮忙。|Tā qǐngqiú wǒ bāngmáng.|Er bat mich um Hilfe.
求|qiú|bitten; anflehen|v|A2|求你帮帮我。|Qiú nǐ bāngbang wǒ.|Bitte hilf mir doch.
取|qǔ|abholen; holen; abheben|v|A2|我去银行取钱。|Wǒ qù yínháng qǔ qián.|Ich gehe zur Bank Geld abheben.
取得|qǔdé|erlangen; erzielen|v|A2|他取得了好成绩。|Tā qǔdé le hǎo chéngjì.|Er hat gute Noten erzielt.
实现|shíxiàn|verwirklichen; wahr werden|v|A2|他的愿望实现了。|Tā de yuànwàng shíxiàn le.|Sein Wunsch ist in Erfüllung gegangen.
使用|shǐyòng|benutzen; verwenden|v|A2|这里可以使用手机吗？|Zhèlǐ kěyǐ shǐyòng shǒujī ma?|Darf man hier das Handy benutzen?
收|shōu|annehmen; erhalten; einsammeln|v|A2|这家店不收现金。|Zhè jiā diàn bù shōu xiànjīn.|Dieser Laden nimmt kein Bargeld.
受到|shòudào|erhalten; erfahren|v|A2|他受到了老师的表扬。|Tā shòudào le lǎoshī de biǎoyáng.|Er wurde vom Lehrer gelobt.
送到|sòngdào|(hin)bringen; liefern bis|v|A2|请把我送到机场。|Qǐng bǎ wǒ sòngdào jīchǎng.|Bitte bringen Sie mich zum Flughafen.
送给|sònggěi|schenken; geben|v|A2|这本书送给你。|Zhè běn shū sònggěi nǐ.|Dieses Buch schenke ich dir.
提|tí|erwähnen; tragen (in der Hand)|v|A2|别提这件事了。|Bié tí zhè jiàn shì le.|Erwähn die Sache nicht mehr.
提到|tídào|erwähnen|v|A2|他刚才提到了你。|Tā gāngcái tídào le nǐ.|Er hat dich gerade erwähnt.
听说|tīngshuō|hören, dass; gehört haben|v|A2|我听说他病了。|Wǒ tīngshuō tā bìng le.|Ich habe gehört, dass er krank ist.
通|tōng|durchkommen; verbunden sein|v|A2|他的电话打不通。|Tā de diànhuà dǎ bu tōng.|Ich komme bei ihm telefonisch nicht durch.
推|tuī|schieben; drücken|v|A2|请推一下门。|Qǐng tuī yíxià mén.|Bitte drück mal die Tür auf.
完|wán|fertig sein; beenden|v|A2|我的作业做完了。|Wǒ de zuòyè zuòwán le.|Ich bin mit den Hausaufgaben fertig.
闻|wén|riechen (an etwas)|v|A2|你闻一下这朵花。|Nǐ wén yíxià zhè duǒ huā.|Riech mal an dieser Blume.
响|xiǎng|klingeln; ertönen|v|A2|你的手机响了。|Nǐ de shǒujī xiǎng le.|Dein Handy klingelt.
想到|xiǎngdào|an etwas denken; darauf kommen|v|A2|我没想到你会来。|Wǒ méi xiǎngdào nǐ huì lái.|Ich hätte nicht gedacht, dass du kommst.
想起|xiǎngqǐ|sich erinnern an|v|A2|我想起他的名字了。|Wǒ xiǎngqǐ tā de míngzi le.|Mir ist sein Name wieder eingefallen.
像|xiàng|ähneln; aussehen wie|v|A2|她很像她妈妈。|Tā hěn xiàng tā māma.|Sie sieht ihrer Mutter sehr ähnlich.
小心|xiǎoxīn|vorsichtig; aufpassen|adj|A2|路上小心！|Lù shang xiǎoxīn!|Pass unterwegs auf dich auf!
行动|xíngdòng|handeln; Aktion|v|A2|我们现在就行动吧。|Wǒmen xiànzài jiù xíngdòng ba.|Lass uns jetzt gleich handeln.
养|yǎng|halten (Tiere); aufziehen|v|A2|我养了一只猫。|Wǒ yǎng le yì zhī māo.|Ich halte eine Katze.
占|zhàn|belegen; einnehmen|v|A2|这个座位有人占了。|Zhège zuòwèi yǒurén zhàn le.|Dieser Platz ist schon belegt.
站住|zhànzhù|stehen bleiben|v|A2|站住，别跑！|Zhànzhù, bié pǎo!|Bleib stehen, lauf nicht weg!
找出|zhǎochū|herausfinden; heraussuchen|v|A2|请找出错的地方。|Qǐng zhǎochū cuò de dìfang.|Bitte finde die fehlerhaften Stellen.
装|zhuāng|einpacken; hineintun|v|A2|把书装进包里。|Bǎ shū zhuāngjìn bāo lǐ.|Pack die Bücher in die Tasche.
走过|zǒuguò|vorbeigehen; hinübergehen|v|A2|他从我身边走过。|Tā cóng wǒ shēnbiān zǒuguò.|Er ging an mir vorbei.
走进|zǒujìn|hineingehen|v|A2|老师走进了教室。|Lǎoshī zǒujìnle jiàoshì.|Der Lehrer ging ins Klassenzimmer.
走开|zǒukāi|weggehen|v|A2|请你走开！|Qǐng nǐ zǒukāi!|Geh bitte weg!
组成|zǔchéng|bilden; bestehen aus|v|A2|这个队由五个人组成。|Zhège duì yóu wǔ gè rén zǔchéng.|Dieses Team besteht aus fünf Personen.
做到|zuòdào|schaffen; erreichen|v|A2|我说到就能做到。|Wǒ shuōdào jiù néng zuòdào.|Was ich sage, das schaffe ich auch.
选择|xuǎnzé|wählen; Wahl|v|A2|你选择哪一个？|Nǐ xuǎnzé nǎ yí gè?|Welches wählst du?
按|àn|drücken|v|B1|请按一下门铃。|Qǐng àn yíxià ménlíng.|Bitte drück mal auf die Klingel.
保|bǎo|schützen; garantieren|v|B1|我保你没事。|Wǒ bǎo nǐ méishì.|Ich garantiere dir, dass nichts passiert.
保持|bǎochí|beibehalten; halten|v|B1|请保持安静。|Qǐng bǎochí ānjìng.|Bitte bleiben Sie ruhig.
保留|bǎoliú|behalten; aufbewahren|v|B1|我还保留着那张照片。|Wǒ hái bǎoliúzhe nà zhāng zhàopiàn.|Ich habe das Foto immer noch.
保证|bǎozhèng|garantieren; versprechen|v|B1|我保证明天一定来。|Wǒ bǎozhèng míngtiān yídìng lái.|Ich verspreche, dass ich morgen bestimmt komme.
变为|biànwéi|werden zu; sich verwandeln in|v|B1|水很快变为冰了。|Shuǐ hěn kuài biànwéi bīng le.|Das Wasser ist schnell zu Eis geworden.
表明|biǎomíng|zeigen; deutlich machen|v|B1|他表明了自己的想法。|Tā biǎomíngle zìjǐ de xiǎngfǎ.|Er hat seine Meinung deutlich gemacht.
补|bǔ|flicken; nachholen; ergänzen|v|B1|这条裤子要补一下。|Zhè tiáo kùzi yào bǔ yíxià.|Diese Hose muss geflickt werden.
补充|bǔchōng|ergänzen|v|B1|我想补充一点。|Wǒ xiǎng bǔchōng yì diǎn.|Ich möchte einen Punkt ergänzen.
步|bù|Schritt|n|B1|请往前走一步。|Qǐng wǎng qián zǒu yí bù.|Bitte geh einen Schritt nach vorn.
产生|chǎnshēng|entstehen; hervorrufen|v|B1|我对中文产生了兴趣。|Wǒ duì Zhōngwén chǎnshēngle xìngqù.|Ich habe Interesse an Chinesisch entwickelt.
称为|chēngwéi|bezeichnen als; genannt werden|v|B1|这种茶被称为绿茶。|Zhè zhǒng chá bèi chēngwéi lǜchá.|Diese Teesorte nennt man grünen Tee.
传|chuán|weitergeben; übermitteln|v|B1|把照片传给我吧。|Bǎ zhàopiàn chuán gěi wǒ ba.|Schick mir doch das Foto.
传来|chuánlái|herüberdringen; (Nachricht) eintreffen|v|B1|外面传来了音乐声。|Wàimiàn chuánláile yīnyuè shēng.|Von draußen drang Musik herein.
达到|dádào|erreichen|v|B1|他达到了自己的目标。|Tā dádàole zìjǐ de mùbiāo.|Er hat sein Ziel erreicht.
打破|dǎpò|zerbrechen; brechen|v|B1|他打破了一个杯子。|Tā dǎpòle yí gè bēizi.|Er hat ein Glas zerbrochen.
打听|dǎting|sich erkundigen|v|B1|我想打听一件事。|Wǒ xiǎng dǎting yí jiàn shì.|Ich möchte mich nach etwas erkundigen.
代|dài|vertreten; für jdn.; Generation|v|B1|请代我向他问好。|Qǐng dài wǒ xiàng tā wènhǎo.|Bitte grüß ihn von mir.
等待|děngdài|warten|v|B1|我们在等待结果。|Wǒmen zài děngdài jiéguǒ.|Wir warten auf das Ergebnis.
调|tiáo|einstellen; regulieren|v|B1|请把声音调小一点。|Qǐng bǎ shēngyīn tiáo xiǎo yìdiǎn.|Stell den Ton bitte etwas leiser.
断|duàn|reißen; brechen|v|B1|这根绳子断了。|Zhè gēn shéngzi duàn le.|Dieses Seil ist gerissen.
发出|fāchū|abschicken; von sich geben|v|B1|邮件已经发出了。|Yóujiàn yǐjīng fāchū le.|Die E-Mail ist schon rausgegangen.
发动|fādòng|starten; in Gang setzen|v|B1|车子发动不了了。|Chēzi fādòng bùliǎo le.|Das Auto springt nicht mehr an.
防|fáng|sich schützen vor; vorbeugen|v|B1|出门要防小偷。|Chūmén yào fáng xiǎotōu.|Unterwegs muss man sich vor Dieben in Acht nehmen.
防止|fángzhǐ|verhindern; vorbeugen|v|B1|多洗手可以防止生病。|Duō xǐshǒu kěyǐ fángzhǐ shēngbìng.|Häufiges Händewaschen kann Krankheiten vorbeugen.
放到|fàngdào|legen auf/in; hinstellen|v|B1|把书放到桌子上。|Bǎ shū fàngdào zhuōzi shang.|Leg das Buch auf den Tisch.
分别|fēnbié|sich trennen; jeweils|v|B1|我们在车站分别了。|Wǒmen zài chēzhàn fēnbié le.|Wir haben uns am Bahnhof getrennt.
否定|fǒudìng|verneinen; ablehnen|v|B1|他否定了我的想法。|Tā fǒudìng le wǒ de xiǎngfǎ.|Er hat meine Idee abgelehnt.
否认|fǒurèn|bestreiten; leugnen|v|B1|他否认说过这句话。|Tā fǒurèn shuōguo zhè jù huà.|Er bestreitet, diesen Satz gesagt zu haben.
赶|gǎn|sich beeilen; erwischen|v|B1|我要去赶火车。|Wǒ yào qù gǎn huǒchē.|Ich muss den Zug erwischen.
赶到|gǎndào|(eilig) eintreffen|v|B1|他十分钟就赶到了。|Tā shí fēnzhōng jiù gǎndào le.|Er war schon nach zehn Minuten da.
告别|gàobié|sich verabschieden|v|B1|我向朋友们告别。|Wǒ xiàng péngyoumen gàobié.|Ich verabschiede mich von meinen Freunden.
观察|guānchá|beobachten|v|B1|医生说要再观察几天。|Yīshēng shuō yào zài guānchá jǐ tiān.|Der Arzt sagt, man muss noch ein paar Tage beobachten.
管|guǎn|sich kümmern um; verwalten|v|B1|这件事你别管。|Zhè jiàn shì nǐ bié guǎn.|Misch dich in diese Sache nicht ein.
合|hé|schließen; zusammenlegen|v|B1|请把书合上。|Qǐng bǎ shū héshàng.|Bitte schlag das Buch zu.
活|huó|leben; lebendig|v|B1|这条鱼还活着。|Zhè tiáo yú hái huózhe.|Dieser Fisch lebt noch.
集中|jízhōng|konzentrieren; bündeln|v|B1|上课要集中注意力。|Shàngkè yào jízhōng zhùyìlì.|Im Unterricht muss man sich konzentrieren.
加快|jiākuài|beschleunigen|v|B1|我们要加快速度。|Wǒmen yào jiākuài sùdù.|Wir müssen das Tempo erhöhen.
加强|jiāqiáng|verstärken|v|B1|你要加强口语练习。|Nǐ yào jiāqiáng kǒuyǔ liànxí.|Du musst das Sprechen mehr üben.
建|jiàn|bauen|v|B1|这里要建一个公园。|Zhèlǐ yào jiàn yí ge gōngyuán.|Hier soll ein Park gebaut werden.
建成|jiànchéng|fertig bauen; fertigstellen|v|B1|新机场明年建成。|Xīn jīchǎng míngnián jiànchéng.|Der neue Flughafen wird nächstes Jahr fertig.
接近|jiējìn|sich nähern; nahe|v|B1|比赛接近结束了。|Bǐsài jiējìn jiéshù le.|Das Spiel ist fast zu Ende.
结合|jiéhé|verbinden; kombinieren|v|B1|学习要和练习结合。|Xuéxí yào hé liànxí jiéhé.|Lernen muss man mit Üben verbinden.
解开|jiěkāi|aufmachen; lösen|v|B1|请帮我解开鞋带。|Qǐng bāng wǒ jiěkāi xiédài.|Bitte hilf mir, die Schnürsenkel aufzumachen.
具有|jùyǒu|besitzen; aufweisen|v|B1|这本书具有很高的价值。|Zhè běn shū jùyǒu hěn gāo de jiàzhí.|Dieses Buch besitzt einen sehr hohen Wert.
看起来|kànqǐlái|aussehen; scheinen|v|B1|你看起来很累。|Nǐ kànqǐlái hěn lèi.|Du siehst sehr müde aus.
看上去|kànshàngqù|aussehen; wirken|v|B1|她看上去很年轻。|Tā kànshàngqù hěn niánqīng.|Sie wirkt sehr jung.
克服|kèfú|überwinden|v|B1|我们要克服困难。|Wǒmen yào kèfú kùnnan.|Wir müssen die Schwierigkeiten überwinden.
浪费|làngfèi|verschwenden|v|B1|不要浪费时间。|Bú yào làngfèi shíjiān.|Verschwende keine Zeit.
利用|lìyòng|nutzen; ausnutzen|v|B1|我利用周末学汉语。|Wǒ lìyòng zhōumò xué Hànyǔ.|Ich nutze das Wochenende zum Chinesischlernen.
领|lǐng|abholen; führen|v|B1|我去领一下包裹。|Wǒ qù lǐng yíxià bāoguǒ.|Ich hole mal kurz das Paket ab.
面对|miànduì|gegenüberstehen; sich stellen|v|B1|我们要面对问题。|Wǒmen yào miànduì wèntí.|Wir müssen uns den Problemen stellen.
判断|pànduàn|beurteilen; Urteil|v|B1|我很难判断谁对。|Wǒ hěn nán pànduàn shéi duì.|Ich kann schwer beurteilen, wer recht hat.
配|pèi|passen zu; kombinieren|v|B1|这双鞋配裙子很好看。|Zhè shuāng xié pèi qúnzi hěn hǎokàn.|Diese Schuhe sehen zum Rock sehr gut aus.
批评|pīpíng|kritisieren; Kritik|v|B1|老师批评了他。|Lǎoshī pīpíng le tā.|Der Lehrer hat ihn kritisiert.
破坏|pòhuài|zerstören; beschädigen|v|B1|不要破坏环境。|Búyào pòhuài huánjìng.|Zerstört die Umwelt nicht.
前进|qiánjìn|vorwärtsgehen; vorankommen|v|B1|我们继续前进吧。|Wǒmen jìxù qiánjìn ba.|Lasst uns weiter vorangehen.
强调|qiángdiào|betonen|v|B1|老师强调了这一点。|Lǎoshī qiángdiào le zhè yì diǎn.|Der Lehrer hat diesen Punkt betont.
缺|quē|fehlen; mangeln an|v|B1|我们还缺一个人。|Wǒmen hái quē yí gè rén.|Uns fehlt noch eine Person.
缺少|quēshǎo|fehlen; mangeln an|v|B1|他缺少工作经验。|Tā quēshǎo gōngzuò jīngyàn.|Ihm fehlt Berufserfahrung.
认出|rènchū|wiedererkennen|v|B1|我一下子就认出了他。|Wǒ yíxiàzi jiù rènchū le tā.|Ich habe ihn sofort wiedererkannt.
认得|rènde|kennen; erkennen|v|B1|你还认得我吗？|Nǐ hái rènde wǒ ma?|Erkennst du mich noch?
上来|shànglai|heraufkommen|v|B1|你快上来吧！|Nǐ kuài shànglai ba!|Komm schnell herauf!
上去|shàngqu|hinaufgehen|v|B1|我们走上去吧。|Wǒmen zǒu shàngqu ba.|Lass uns zu Fuß hinaufgehen.
上升|shàngshēng|steigen; ansteigen|v|B1|气温开始上升了。|Qìwēn kāishǐ shàngshēng le.|Die Temperatur beginnt zu steigen.
升|shēng|steigen; aufsteigen|v|B1|太阳升起来了。|Tàiyáng shēng qǐlai le.|Die Sonne ist aufgegangen.
失去|shīqù|verlieren|v|B1|我不想失去你。|Wǒ bù xiǎng shīqù nǐ.|Ich will dich nicht verlieren.
使|shǐ|veranlassen; machen (dass)|v|B1|这件事使我很高兴。|Zhè jiàn shì shǐ wǒ hěn gāoxìng.|Diese Sache macht mich sehr froh.
适应|shìyìng|sich anpassen; sich gewöhnen|v|B1|我已经适应这里的生活了。|Wǒ yǐjīng shìyìng zhèlǐ de shēnghuó le.|Ich habe mich schon an das Leben hier gewöhnt.
受|shòu|erhalten; erleiden|v|B1|他很受学生欢迎。|Tā hěn shòu xuésheng huānyíng.|Er ist bei den Schülern sehr beliebt.
属于|shǔyú|gehören zu|v|B1|这本书属于我。|Zhè běn shū shǔyú wǒ.|Dieses Buch gehört mir.
随|suí|folgen; (jdm.) überlassen|v|B1|去不去都随你。|Qù bu qù dōu suí nǐ.|Ob du gehst oder nicht, liegt ganz bei dir.
谈|tán|reden; besprechen|v|B1|我们谈一下这件事吧。|Wǒmen tán yíxià zhè jiàn shì ba.|Lass uns mal über diese Sache reden.
谈话|tánhuà|sich unterhalten; Gespräch|v|B1|他们正在谈话。|Tāmen zhèngzài tánhuà.|Sie unterhalten sich gerade.
体现|tǐxiàn|zeigen; widerspiegeln|v|B1|这体现了他的能力。|Zhè tǐxiàn le tā de nénglì.|Das zeigt seine Fähigkeiten.
体验|tǐyàn|erleben; ausprobieren|v|B1|我想体验一下中国文化。|Wǒ xiǎng tǐyàn yíxià Zhōngguó wénhuà.|Ich möchte die chinesische Kultur einmal erleben.
停止|tíngzhǐ|aufhören; einstellen|v|B1|比赛因为下雨停止了。|Bǐsài yīnwèi xiàyǔ tíngzhǐ le.|Das Spiel wurde wegen Regen abgebrochen.
推开|tuīkāi|aufstoßen; wegschieben|v|B1|他推开了门。|Tā tuīkāi le mén.|Er stieß die Tür auf.
退出|tuìchū|austreten; aussteigen|v|B1|他退出了比赛。|Tā tuìchū le bǐsài.|Er ist aus dem Wettkampf ausgestiegen.
完善|wánshàn|vervollkommnen; verbessern|v|B1|这个计划还要完善。|Zhège jìhuà hái yào wánshàn.|Dieser Plan muss noch verbessert werden.
围|wéi|umgeben; umringen|v|B1|大家围着他。|Dàjiā wéizhe tā.|Alle stehen um ihn herum.
下来|xiàlai|herunterkommen|v|B1|你快下来吧！|Nǐ kuài xiàlai ba!|Komm schnell runter!
下去|xiàqu|hinuntergehen; weitermachen|v|B1|请说下去。|Qǐng shuō xiàqu.|Bitte sprich weiter.
显得|xiǎnde|wirken; aussehen|v|B1|她今天显得很高兴。|Tā jīntiān xiǎnde hěn gāoxìng.|Sie wirkt heute sehr fröhlich.
相比|xiāngbǐ|vergleichen; im Vergleich|v|B1|跟去年相比，今年更热。|Gēn qùnián xiāngbǐ, jīnnián gèng rè.|Im Vergleich zum letzten Jahr ist es dieses Jahr heißer.
相关|xiāngguān|zusammenhängen; relevant|v|B1|这两件事是相关的。|Zhè liǎng jiàn shì shì xiāngguān de.|Diese beiden Dinge hängen zusammen.
消失|xiāoshī|verschwinden|v|B1|他一下子消失了。|Tā yíxiàzi xiāoshī le.|Er war plötzlich verschwunden.
形成|xíngchéng|sich bilden; entstehen|v|B1|他形成了好习惯。|Tā xíngchéng le hǎo xíguàn.|Er hat gute Gewohnheiten entwickelt.
压|yā|drücken; pressen|v|B1|别压我的书包。|Bié yā wǒ de shūbāo.|Drück nicht auf meine Schultasche.
迎接|yíngjiē|empfangen; begrüßen|v|B1|我们去机场迎接客人。|Wǒmen qù jīchǎng yíngjiē kèrén.|Wir fahren zum Flughafen, um die Gäste zu empfangen.
造|zào|bauen; herstellen|v|B1|这里要造一座桥。|Zhèlǐ yào zào yí zuò qiáo.|Hier soll eine Brücke gebaut werden.
造成|zàochéng|verursachen|v|B1|大雨造成了很多问题。|Dàyǔ zàochéng le hěn duō wèntí.|Der starke Regen hat viele Probleme verursacht.
增加|zēngjiā|zunehmen; erhöhen|v|B1|学生人数增加了。|Xuésheng rénshù zēngjiā le.|Die Zahl der Schüler ist gestiegen.
展开|zhǎnkāi|entfalten; ausbreiten|v|B1|他展开了地图。|Tā zhǎnkāi le dìtú.|Er faltete die Karte auseinander.
照|zhào|fotografieren; scheinen|v|B1|请帮我们照一张相。|Qǐng bāng wǒmen zhào yì zhāng xiàng.|Bitte machen Sie ein Foto von uns.
争|zhēng|streiten; wetteifern|v|B1|你们别争了。|Nǐmen bié zhēng le.|Hört auf zu streiten.
争取|zhēngqǔ|anstreben; sich bemühen um|v|B1|我争取明天做完。|Wǒ zhēngqǔ míngtiān zuòwán.|Ich versuche, morgen fertig zu werden.
支持|zhīchí|unterstützen|v|B1|我支持你的想法。|Wǒ zhīchí nǐ de xiǎngfǎ.|Ich unterstütze deine Idee.
指|zhǐ|zeigen (auf); meinen|v|B1|他指着那座山。|Tā zhǐzhe nà zuò shān.|Er zeigt auf den Berg dort.
指出|zhǐchū|hinweisen auf; aufzeigen|v|B1|老师指出了我的错误。|Lǎoshī zhǐchū le wǒ de cuòwù.|Der Lehrer hat mich auf meinen Fehler hingewiesen.
抓|zhuā|greifen; fangen|v|B1|猫在抓老鼠。|Māo zài zhuā lǎoshǔ.|Die Katze fängt Mäuse.
抓住|zhuāzhù|festhalten; ergreifen|v|B1|请抓住我的手。|Qǐng zhuāzhù wǒ de shǒu.|Bitte halt meine Hand fest.
转变|zhuǎnbiàn|sich wandeln; Wandel|v|B1|他的态度转变了。|Tā de tàidu zhuǎnbiàn le.|Seine Einstellung hat sich gewandelt.
追|zhuī|verfolgen; nachjagen|v|B1|快追，车要开了！|Kuài zhuī, chē yào kāi le!|Schnell hinterher, der Bus fährt gleich los!
丢|diū|verlieren|v|B1|我的手机丢了。|Wǒ de shǒujī diū le.|Ich habe mein Handy verloren.
估计|gūjì|schätzen; vermuten|v|B1|我估计他不会来了。|Wǒ gūjì tā bú huì lái le.|Ich schätze, er kommt nicht mehr.
允许|yǔnxǔ|erlauben|v|B1|这里不允许抽烟。|Zhèlǐ bù yǔnxǔ chōuyān.|Hier ist Rauchen nicht erlaubt.
养成|yǎngchéng|sich angewöhnen; entwickeln|v|B1|要养成早睡的习惯。|Yào yǎngchéng zǎo shuì de xíguàn.|Man sollte sich angewöhnen, früh schlafen zu gehen.
减少|jiǎnshǎo|verringern; abnehmen|v|B1|今年的游客减少了。|Jīnnián de yóukè jiǎnshǎo le.|Dieses Jahr sind es weniger Touristen geworden.
剩|shèng|übrig bleiben|v|B1|只剩一个苹果了。|Zhǐ shèng yí gè píngguǒ le.|Es ist nur noch ein Apfel übrig.
吸引|xīyǐn|anziehen; fesseln|v|B1|这个地方吸引了很多游客。|Zhège dìfang xīyǐn le hěn duō yóukè.|Dieser Ort hat viele Touristen angezogen.
失败|shībài|scheitern; Misserfolg|v|B1|不要害怕失败。|Bú yào hàipà shībài.|Hab keine Angst vor dem Scheitern.
寄|jì|schicken (per Post)|v|B1|我要寄一封信。|Wǒ yào jì yì fēng xìn.|Ich möchte einen Brief verschicken.
引起|yǐnqǐ|verursachen; hervorrufen|v|B1|这件事引起了大家的注意。|Zhè jiàn shì yǐnqǐ le dàjiā de zhùyì.|Diese Sache hat die Aufmerksamkeit aller erregt.
扔|rēng|werfen; wegwerfen|v|B1|别乱扔垃圾。|Bié luàn rēng lājī.|Wirf keinen Müll herum.
抬|tái|heben; hochheben|v|B1|请帮我抬一下桌子。|Qǐng bāng wǒ tái yíxià zhuōzi.|Hilf mir bitte kurz, den Tisch anzuheben.
抱|bào|umarmen; im Arm halten|v|B1|妈妈抱着孩子。|Māma bàozhe háizi.|Die Mutter hält das Kind im Arm.
排列|páiliè|anordnen; aufreihen|v|B1|请按大小排列。|Qǐng àn dàxiǎo páiliè.|Bitte nach Größe ordnen.
提供|tígōng|anbieten; bereitstellen|v|B1|酒店提供免费早餐。|Jiǔdiàn tígōng miǎnfèi zǎocān.|Das Hotel bietet kostenloses Frühstück an.
敲|qiāo|klopfen|v|B1|有人在敲门。|Yǒu rén zài qiāo mén.|Jemand klopft an die Tür.
熟悉|shúxi|vertraut sein mit; gut kennen|v|B1|我对这里不太熟悉。|Wǒ duì zhèlǐ bú tài shúxi.|Ich kenne mich hier nicht so gut aus.
猜|cāi|raten|v|B1|你猜我是谁？|Nǐ cāi wǒ shì shéi?|Rate mal, wer ich bin!
积累|jīlěi|ansammeln; sammeln (Erfahrung)|v|B1|他积累了很多经验。|Tā jīlěi le hěn duō jīngyàn.|Er hat viel Erfahrung gesammelt.
符合|fúhé|entsprechen; erfüllen|v|B1|他符合我们的要求。|Tā fúhé wǒmen de yāoqiú.|Er erfüllt unsere Anforderungen.
获得|huòdé|erlangen; erhalten|v|B1|她获得了第一名。|Tā huòdé le dì-yī míng.|Sie hat den ersten Platz errungen.
躺|tǎng|liegen; sich hinlegen|v|B1|他躺在床上看书。|Tā tǎng zài chuáng shang kàn shū.|Er liegt im Bett und liest.
降低|jiàngdī|senken; sinken|v|B1|这家店降低了价格。|Zhè jiā diàn jiàngdī le jiàgé.|Dieses Geschäft hat die Preise gesenkt.
骗|piàn|betrügen; täuschen|v|B1|你别骗我。|Nǐ bié piàn wǒ.|Lüg mich nicht an.
`,

  adjectives: `
不大|bú dà|nicht groß; nicht sehr|phr|A1|这个房间不大。|Zhège fángjiān bú dà.|Dieses Zimmer ist nicht groß.
不对|bú duì|falsch; nicht richtig|adj|A1|你说得不对。|Nǐ shuō de bú duì.|Was du sagst, stimmt nicht.
错|cuò|falsch; sich irren|adj|A1|对不起，我错了。|Duìbuqǐ, wǒ cuò le.|Entschuldigung, ich habe mich geirrt.
好听|hǎotīng|schön (klingend)|adj|A1|你的名字很好听。|Nǐ de míngzi hěn hǎotīng.|Dein Name klingt schön.
老|lǎo|alt|adj|A1|这只狗很老了。|Zhè zhī gǒu hěn lǎo le.|Dieser Hund ist schon sehr alt.
有用|yǒuyòng|nützlich|adj|A1|这本书很有用。|Zhè běn shū hěn yǒuyòng.|Dieses Buch ist sehr nützlich.
重|zhòng|schwer|adj|A1|这个箱子太重了。|Zhège xiāngzi tài zhòng le.|Dieser Koffer ist zu schwer.
白色|báisè|Weiß; weiß|n|A2|我喜欢白色的衣服。|Wǒ xǐhuan báisè de yīfu.|Ich mag weiße Kleidung.
不够|bú gòu|nicht genug|phr|A2|我的钱不够。|Wǒ de qián bú gòu.|Mein Geld reicht nicht.
不同|bùtóng|verschieden; unterschiedlich|adj|A2|我们的想法不同。|Wǒmen de xiǎngfǎ bùtóng.|Unsere Vorstellungen sind verschieden.
常见|chángjiàn|häufig (anzutreffen); verbreitet|adj|A2|这个问题很常见。|Zhège wèntí hěn chángjiàn.|Dieses Problem kommt häufig vor.
常用|chángyòng|häufig verwendet; gebräuchlich|adj|A2|这个词很常用。|Zhège cí hěn chángyòng.|Dieses Wort wird sehr häufig verwendet.
大声|dàshēng|laut (sprechen)|adv|A2|请大声一点儿。|Qǐng dàshēng yìdiǎnr.|Bitte etwas lauter.
低|dī|niedrig; tief|adj|A2|今天的气温很低。|Jīntiān de qìwēn hěn dī.|Die Temperatur ist heute sehr niedrig.
高级|gāojí|fortgeschritten; hochwertig|adj|A2|他在上高级汉语课。|Tā zài shàng gāojí Hànyǔ kè.|Er besucht den Chinesischkurs für Fortgeschrittene.
黑色|hēisè|Schwarz|n|A2|我喜欢黑色的衣服。|Wǒ xǐhuan hēisè de yīfu.|Ich mag schwarze Kleidung.
红色|hóngsè|Rot|n|A2|她穿着红色的裙子。|Tā chuān zhe hóngsè de qúnzi.|Sie trägt einen roten Rock.
黄色|huángsè|Gelb|n|A2|这朵花是黄色的。|Zhè duǒ huā shì huángsè de.|Diese Blume ist gelb.
假|jiǎ|falsch; unecht|adj|A2|这个包是假的。|Zhège bāo shì jiǎ de.|Diese Tasche ist eine Fälschung.
蓝色|lánsè|Blau|n|A2|天空是蓝色的。|Tiānkōng shì lánsè de.|Der Himmel ist blau.
亮|liàng|hell; leuchtend|adj|A2|这个房间很亮。|Zhège fángjiān hěn liàng.|Dieses Zimmer ist sehr hell.
绿色|lǜsè|grün; Grün|n|A2|我喜欢绿色。|Wǒ xǐhuan lǜsè.|Ich mag Grün.
满|mǎn|voll|adj|A2|杯子已经满了。|Bēizi yǐjīng mǎn le.|Das Glas ist schon voll.
难看|nánkàn|hässlich|adj|A2|这件衣服很难看。|Zhè jiàn yīfu hěn nánkàn.|Dieses Kleidungsstück ist hässlich.
难听|nántīng|unangenehm klingend|adj|A2|这首歌真难听。|Zhè shǒu gē zhēn nántīng.|Dieses Lied klingt wirklich schrecklich.
年轻|niánqīng|jung|adj|A2|她看起来很年轻。|Tā kàn qǐlái hěn niánqīng.|Sie sieht sehr jung aus.
平|píng|flach; eben|adj|A2|这条路很平。|Zhè tiáo lù hěn píng.|Diese Straße ist sehr eben.
平安|píng'ān|wohlbehalten; sicher|adj|A2|他平安到家了。|Tā píng'ān dào jiā le.|Er ist wohlbehalten zu Hause angekommen.
普通|pǔtōng|gewöhnlich; normal|adj|A2|我是一个普通人。|Wǒ shì yí gè pǔtōng rén.|Ich bin ein ganz normaler Mensch.
轻|qīng|leicht (Gewicht)|adj|A2|这个包很轻。|Zhège bāo hěn qīng.|Diese Tasche ist sehr leicht.
清楚|qīngchu|klar; deutlich|adj|A2|我听得很清楚。|Wǒ tīng de hěn qīngchu.|Ich höre es ganz deutlich.
挺好|tǐng hǎo|ziemlich gut; ganz gut|phr|A2|我觉得挺好的。|Wǒ juéde tǐng hǎo de.|Ich finde es ziemlich gut.
同样|tóngyàng|gleich; ebenso|adj|A2|我们有同样的想法。|Wǒmen yǒu tóngyàng de xiǎngfǎ.|Wir haben die gleiche Idee.
相同|xiāngtóng|gleich; identisch|adj|A2|我们的想法相同。|Wǒmen de xiǎngfǎ xiāngtóng.|Wir sind der gleichen Meinung.
小声|xiǎoshēng|leise|adv|A2|请小声说话。|Qǐng xiǎoshēng shuōhuà.|Bitte sprich leise.
样子|yàngzi|Aussehen; Art|n|A2|他的样子很可爱。|Tā de yàngzi hěn kě'ài.|Er sieht sehr süß aus.
真正|zhēnzhèng|echt; wirklich|adj|A2|他是我真正的朋友。|Tā shì wǒ zhēnzhèng de péngyou.|Er ist mein wahrer Freund.
正确|zhèngquè|richtig; korrekt|adj|A2|你的回答很正确。|Nǐ de huídá hěn zhèngquè.|Deine Antwort ist völlig richtig.
直接|zhíjiē|direkt|adj|A2|你直接告诉他吧。|Nǐ zhíjiē gàosu tā ba.|Sag es ihm einfach direkt.
准确|zhǔnquè|genau; präzise|adj|A2|你的发音很准确。|Nǐ de fāyīn hěn zhǔnquè.|Deine Aussprache ist sehr genau.
必然|bìrán|zwangsläufig; unvermeidlich|adj|B1|这是必然的结果。|Zhè shì bìrán de jiéguǒ.|Das ist das zwangsläufige Ergebnis.
必要|bìyào|notwendig; nötig|adj|B1|没有必要这么早去。|Méiyǒu bìyào zhème zǎo qù.|Es ist nicht nötig, so früh hinzugehen.
彩色|cǎisè|farbig; bunt|adj|B1|这是一张彩色照片。|Zhè shì yì zhāng cǎisè zhàopiàn.|Das ist ein Farbfoto.
超级|chāojí|super; extrem|adj|B1|我今天超级忙。|Wǒ jīntiān chāojí máng.|Ich bin heute superbeschäftigt.
成熟|chéngshú|reif|adj|B1|苹果已经成熟了。|Píngguǒ yǐjīng chéngshú le.|Die Äpfel sind schon reif.
初步|chūbù|vorläufig; erste/r|adj|B1|这只是初步的想法。|Zhè zhǐ shì chūbù de xiǎngfǎ.|Das ist nur eine erste Idee.
富|fù|reich|adj|B1|他家很富。|Tā jiā hěn fù.|Seine Familie ist sehr reich.
高速|gāosù|Hochgeschwindigkeits-; rasant|adj|B1|中国经济高速发展。|Zhōngguó jīngjì gāosù fāzhǎn.|Chinas Wirtschaft entwickelt sich rasant.
共同|gòngtóng|gemeinsam|adj|B1|我们有共同的爱好。|Wǒmen yǒu gòngtóng de àihào.|Wir haben gemeinsame Hobbys.
古|gǔ|alt; antik|adj|B1|这是一座古城。|Zhè shì yí zuò gǔchéng.|Das ist eine alte Stadt.
光明|guāngmíng|hell; hoffnungsvoll|adj|B1|我们的未来很光明。|Wǒmen de wèilái hěn guāngmíng.|Unsere Zukunft sieht sehr gut aus.
广大|guǎngdà|breit; weit; zahlreich|adj|B1|广大观众都喜欢他。|Guǎngdà guānzhòng dōu xǐhuan tā.|Das breite Publikum mag ihn.
合理|hélǐ|vernünftig; angemessen|adj|B1|这个价格很合理。|Zhège jiàgé hěn hélǐ.|Dieser Preis ist sehr angemessen.
基本|jīběn|grundlegend; Grund-|adj|B1|这是最基本的要求。|Zhè shì zuì jīběn de yāoqiú.|Das ist die grundlegendste Anforderung.
结实|jiēshi|stabil; robust|adj|B1|这张桌子很结实。|Zhè zhāng zhuōzi hěn jiēshi.|Dieser Tisch ist sehr stabil.
紧|jǐn|eng; fest; knapp|adj|B1|这双鞋有点儿紧。|Zhè shuāng xié yǒudiǎnr jǐn.|Diese Schuhe sind ein bisschen eng.
紧急|jǐnjí|dringend; Not-|adj|B1|我有紧急的事情。|Wǒ yǒu jǐnjí de shìqing.|Ich habe etwas Dringendes.
静|jìng|ruhig; still|adj|B1|这里晚上很静。|Zhèlǐ wǎnshang hěn jìng.|Hier ist es abends sehr still.
具体|jùtǐ|konkret; genau|adj|B1|具体时间还没定。|Jùtǐ shíjiān hái méi dìng.|Die genaue Zeit steht noch nicht fest.
空|kōng|leer|adj|B1|这个箱子是空的。|Zhège xiāngzi shì kōng de.|Dieser Koffer ist leer.
快速|kuàisù|schnell; rasch|adj|B1|这个城市在快速发展。|Zhège chéngshì zài kuàisù fāzhǎn.|Diese Stadt entwickelt sich rasch.
类似|lèisì|ähnlich|adj|B1|我也有类似的问题。|Wǒ yě yǒu lèisì de wèntí.|Ich habe auch ein ähnliches Problem.
乱|luàn|unordentlich; durcheinander|adj|B1|你的房间太乱了。|Nǐ de fángjiān tài luàn le.|Dein Zimmer ist zu unordentlich.
没用|méiyòng|nutzlos; bringt nichts|adj|B1|现在说这些没用。|Xiànzài shuō zhèxiē méiyòng.|Das jetzt zu sagen, bringt nichts.
美|měi|schön|adj|B1|这里的风景真美。|Zhèlǐ de fēngjǐng zhēn měi.|Die Landschaft hier ist wirklich schön.
美好|měihǎo|schön; wunderbar|adj|B1|祝你有美好的一天！|Zhù nǐ yǒu měihǎo de yì tiān!|Ich wünsche dir einen schönen Tag!
美丽|měilì|schön; hübsch|adj|B1|这是一个美丽的城市。|Zhè shì yí gè měilì de chéngshì.|Das ist eine schöne Stadt.
明确|míngquè|klar; eindeutig|adj|B1|他的态度很明确。|Tā de tàidu hěn míngquè.|Seine Haltung ist ganz eindeutig.
破|pò|kaputt; zerrissen|adj|B1|我的鞋破了。|Wǒ de xié pò le.|Meine Schuhe sind kaputt.
普遍|pǔbiàn|weit verbreitet; allgemein|adj|B1|这种情况很普遍。|Zhè zhǒng qíngkuàng hěn pǔbiàn.|Das kommt sehr häufig vor.
齐|qí|vollzählig; ordentlich|adj|B1|人都到齐了吗？|Rén dōu dào qí le ma?|Sind alle vollzählig da?
强|qiáng|stark|adj|B1|他的能力很强。|Tā de nénglì hěn qiáng.|Er ist sehr fähig.
强大|qiángdà|mächtig; stark|adj|B1|这个国家很强大。|Zhège guójiā hěn qiángdà.|Dieses Land ist sehr mächtig.
强烈|qiángliè|heftig; stark; nachdrücklich|adj|B1|我强烈建议你去看看。|Wǒ qiángliè jiànyì nǐ qù kànkan.|Ich empfehle dir dringend, es dir anzusehen.
巧|qiǎo|zufällig; geschickt|adj|B1|真巧，你也在这儿！|Zhēn qiǎo, nǐ yě zài zhèr!|Was für ein Zufall, du bist auch hier!
全面|quánmiàn|umfassend|adj|B1|他的看法很全面。|Tā de kànfǎ hěn quánmiàn.|Seine Sichtweise ist sehr umfassend.
日常|rìcháng|alltäglich|adj|B1|这是我的日常生活。|Zhè shì wǒ de rìcháng shēnghuó.|Das ist mein Alltag.
深|shēn|tief|adj|B1|这条河很深。|Zhè tiáo hé hěn shēn.|Dieser Fluss ist sehr tief.
深刻|shēnkè|tief; eindrucksvoll|adj|B1|他给我留下了深刻的印象。|Tā gěi wǒ liúxià le shēnkè de yìnxiàng.|Er hat einen tiefen Eindruck bei mir hinterlassen.
深入|shēnrù|gründlich; tief eindringen|adj|B1|我们需要深入了解情况。|Wǒmen xūyào shēnrù liǎojiě qíngkuàng.|Wir müssen die Lage gründlich verstehen.
生动|shēngdòng|lebendig; anschaulich|adj|B1|老师讲得很生动。|Lǎoshī jiǎng de hěn shēngdòng.|Der Lehrer erklärt sehr anschaulich.
适用|shìyòng|anwendbar; geeignet|adj|B1|这个方法对我不适用。|Zhège fāngfǎ duì wǒ bú shìyòng.|Diese Methode ist für mich nicht geeignet.
突出|tūchū|herausragend; hervorheben|adj|B1|他的成绩很突出。|Tā de chéngjì hěn tūchū.|Seine Leistungen sind herausragend.
完美|wánměi|perfekt|adj|B1|没有人是完美的。|Méiyǒu rén shì wánměi de.|Niemand ist perfekt.
完整|wánzhěng|vollständig; komplett|adj|B1|这个句子不完整。|Zhège jùzi bù wánzhěng.|Dieser Satz ist unvollständig.
伟大|wěidà|groß; großartig|adj|B1|她是一位伟大的母亲。|Tā shì yí wèi wěidà de mǔqīn.|Sie ist eine großartige Mutter.
先进|xiānjìn|fortschrittlich; modern|adj|B1|这里的技术很先进。|Zhèlǐ de jìshù hěn xiānjìn.|Die Technik hier ist sehr fortschrittlich.
显然|xiǎnrán|offensichtlich|adj|B1|他显然不知道这件事。|Tā xiǎnrán bù zhīdào zhè jiàn shì.|Er weiß offensichtlich nichts davon.
相似|xiāngsì|ähnlich|adj|B1|他们的想法很相似。|Tāmen de xiǎngfǎ hěn xiāngsì.|Ihre Ansichten sind sehr ähnlich.
形状|xíngzhuàng|Form; Gestalt|n|B1|这个杯子的形状很特别。|Zhège bēizi de xíngzhuàng hěn tèbié.|Diese Tasse hat eine sehr besondere Form.
有利|yǒulì|vorteilhaft; günstig|adj|B1|运动对身体有利。|Yùndòng duì shēntǐ yǒulì.|Sport ist gut für den Körper.
有效|yǒuxiào|wirksam; gültig|adj|B1|这张票三天内有效。|Zhè zhāng piào sān tiān nèi yǒuxiào.|Dieses Ticket ist drei Tage gültig.
真实|zhēnshí|wahr; echt|adj|B1|这是一个真实的故事。|Zhè shì yí ge zhēnshí de gùshi.|Das ist eine wahre Geschichte.
整|zhěng|ganz; genau (Uhrzeit)|adj|B1|现在是八点整。|Xiànzài shì bā diǎn zhěng.|Es ist jetzt genau acht Uhr.
整个|zhěnggè|ganz; gesamt|adj|B1|我整个上午都在学习。|Wǒ zhěnggè shàngwǔ dōu zài xuéxí.|Ich habe den ganzen Vormittag gelernt.
整齐|zhěngqí|ordentlich|adj|B1|他的房间很整齐。|Tā de fángjiān hěn zhěngqí.|Sein Zimmer ist sehr ordentlich.
直|zhí|gerade; direkt|adj|B1|这条路很直。|Zhè tiáo lù hěn zhí.|Diese Straße ist sehr gerade.
重大|zhòngdà|bedeutend; schwerwiegend|adj|B1|这是一个重大的决定。|Zhè shì yí ge zhòngdà de juédìng.|Das ist eine wichtige Entscheidung.
准|zhǔn|genau; präzise|adj|B1|我的手表很准。|Wǒ de shǒubiǎo hěn zhǔn.|Meine Uhr geht sehr genau.
自主|zìzhǔ|selbstständig; eigenständig|adj|B1|孩子要学会自主学习。|Háizi yào xuéhuì zìzhǔ xuéxí.|Kinder müssen lernen, selbstständig zu lernen.
足够|zúgòu|genug; ausreichend|adj|B1|我们有足够的时间。|Wǒmen yǒu zúgòu de shíjiān.|Wir haben genug Zeit.
严格|yángé|streng|adj|B1|我们的老师很严格。|Wǒmen de lǎoshī hěn yángé.|Unser Lehrer ist sehr streng.
仔细|zǐxì|sorgfältig; genau|adj|B1|请你仔细看一下。|Qǐng nǐ zǐxì kàn yíxià.|Bitte schau es dir genau an.
优秀|yōuxiù|hervorragend|adj|B1|她是一个优秀的学生。|Tā shì yí gè yōuxiù de xuésheng.|Sie ist eine hervorragende Schülerin.
厚|hòu|dick (Material)|adj|B1|这本书很厚。|Zhè běn shū hěn hòu.|Dieses Buch ist sehr dick.
有趣|yǒuqù|interessant; lustig|adj|B1|这个故事很有趣。|Zhège gùshi hěn yǒuqù.|Diese Geschichte ist sehr interessant.
相反|xiāngfǎn|entgegengesetzt; im Gegenteil|adj|B1|我的看法正好相反。|Wǒ de kànfǎ zhènghǎo xiāngfǎn.|Meine Ansicht ist genau entgegengesetzt.
穷|qióng|arm|adj|B1|他小时候家里很穷。|Tā xiǎoshíhou jiā li hěn qióng.|Als er klein war, war seine Familie sehr arm.
笨|bèn|dumm; ungeschickt|adj|B1|我不笨，只是有点儿慢。|Wǒ bú bèn, zhǐshì yǒudiǎnr màn.|Ich bin nicht dumm, nur ein bisschen langsam.
著名|zhùmíng|berühmt|adj|B1|他是著名的作家。|Tā shì zhùmíng de zuòjiā.|Er ist ein berühmter Schriftsteller.
详细|xiángxì|ausführlich; detailliert|adj|B1|请说得详细一点儿。|Qǐng shuō de xiángxì yìdiǎnr.|Erzähl es bitte etwas ausführlicher.
`,

  connectors: `
不用|búyòng|nicht nötig; nicht brauchen|adv|A1|你不用来了。|Nǐ búyòng lái le.|Du brauchst nicht mehr zu kommen.
还有|háiyǒu|außerdem; noch haben|conj|A1|我还有一个问题。|Wǒ háiyǒu yí gè wèntí.|Ich habe noch eine Frage.
没|méi|nicht (haben)|adv|A1|我今天没吃早饭。|Wǒ jīntiān méi chī zǎofàn.|Ich habe heute nicht gefrühstückt.
太|tài|zu; äußerst|adv|A1|今天太热了！|Jīntiān tài rè le!|Heute ist es zu heiß!
一块儿|yíkuàir|zusammen|adv|A1|我们一块儿去吧。|Wǒmen yíkuàir qù ba.|Lass uns zusammen hingehen.
真|zhēn|wirklich; echt|adv|A1|你的中文真好！|Nǐ de Zhōngwén zhēn hǎo!|Dein Chinesisch ist wirklich gut!
正|zhèng|gerade (im Begriff)|adv|A1|我正要给你打电话。|Wǒ zhèng yào gěi nǐ dǎ diànhuà.|Ich wollte dich gerade anrufen.
正在|zhèngzài|gerade (dabei sein)|adv|A1|他正在开会。|Tā zhèngzài kāihuì.|Er ist gerade in einer Besprechung.
子|zi|(Nominalsuffix)|part|A1|桌子上有个杯子。|Zhuōzi shang yǒu ge bēizi.|Auf dem Tisch steht ein Becher.
啊|a|(Partikel für Ausruf, Betonung)|part|A2|今天天气真好啊！|Jīntiān tiānqì zhēn hǎo a!|Was für ein schönes Wetter heute!
比如说|bǐrú shuō|zum Beispiel|phr|A2|我喜欢运动，比如说跑步。|Wǒ xǐhuan yùndòng, bǐrú shuō pǎobù.|Ich mag Sport, zum Beispiel Joggen.
必须|bìxū|müssen; unbedingt|adv|A2|你必须早点儿睡觉。|Nǐ bìxū zǎo diǎnr shuìjiào.|Du musst früher schlafen gehen.
不太|bú tài|nicht besonders; nicht so|adv|A2|我今天不太舒服。|Wǒ jīntiān bú tài shūfu.|Mir geht es heute nicht so gut.
不要|búyào|nicht (tun) sollen; nicht wollen|adv|A2|不要在这儿抽烟。|Búyào zài zhèr chōuyān.|Bitte hier nicht rauchen.
不如|bùrú|nicht so gut wie|v|A2|我的中文不如你好。|Wǒ de Zhōngwén bùrú nǐ hǎo.|Mein Chinesisch ist nicht so gut wie deins.
不一定|bùyídìng|nicht unbedingt|adv|A2|他明天不一定来。|Tā míngtiān bù yídìng lái.|Er kommt morgen nicht unbedingt.
重新|chóngxīn|erneut; von Neuem|adv|A2|我重新写了一遍。|Wǒ chóngxīn xiě le yí biàn.|Ich habe es noch einmal neu geschrieben.
大大|dàdà|stark; erheblich|adv|A2|生活水平大大提高了。|Shēnghuó shuǐpíng dàdà tígāo le.|Der Lebensstandard ist erheblich gestiegen.
但|dàn|aber; doch|conj|A2|他很忙,但每天都运动。|Tā hěn máng, dàn měi tiān dōu yùndòng.|Er ist sehr beschäftigt, aber er treibt jeden Tag Sport.
的话|dehuà|wenn; falls (am Satzteilende)|part|A2|有时间的话,我就去。|Yǒu shíjiān dehuà, wǒ jiù qù.|Wenn ich Zeit habe, gehe ich hin.
等到|děngdào|(warten) bis; sobald|conj|A2|等到明天再说吧。|Děngdào míngtiān zài shuō ba.|Warten wir damit bis morgen.
多么|duōme|wie (sehr); was für ein|adv|A2|今天天气多么好啊!|Jīntiān tiānqì duōme hǎo a!|Wie schön das Wetter heute ist!
忽然|hūrán|plötzlich|adv|A2|天忽然下雨了。|Tiān hūrán xià yǔ le.|Plötzlich hat es angefangen zu regnen.
或|huò|oder|conj|A2|今天或明天都可以。|Jīntiān huò míngtiān dōu kěyǐ.|Heute oder morgen, beides geht.
接下来|jiēxiàlái|als Nächstes; danach|adv|A2|接下来我们做什么?|Jiēxiàlái wǒmen zuò shénme?|Was machen wir als Nächstes?
接着|jiēzhe|weiter(machen); anschließend|adv|A2|你接着说吧。|Nǐ jiēzhe shuō ba.|Sprich ruhig weiter.
可是|kěshì|aber|conj|A2|我想去,可是没时间。|Wǒ xiǎng qù, kěshì méi shíjiān.|Ich würde gern hingehen, aber ich habe keine Zeit.
例如|lìrú|zum Beispiel|conj|A2|我喜欢运动,例如跑步。|Wǒ xǐhuan yùndòng, lìrú pǎobù.|Ich mag Sport, zum Beispiel Laufen.
那么|nàme|so; dann (also)|adv|A2|你怎么那么高兴？|Nǐ zěnme nàme gāoxìng?|Warum bist du so fröhlich?
其中|qízhōng|darunter; davon|n|A2|其中一个是我的。|Qízhōng yí gè shì wǒ de.|Einer davon gehört mir.
全|quán|alle; ganz; vollständig|adv|A2|他们全来了。|Tāmen quán lái le.|Sie sind alle gekommen.
十分|shífēn|sehr; äußerst|adv|A2|我十分高兴。|Wǒ shífēn gāoxìng.|Ich freue mich sehr.
实在|shízài|wirklich; ehrlich|adv|A2|我实在太累了。|Wǒ shízài tài lèi le.|Ich bin wirklich zu müde.
完全|wánquán|völlig; ganz|adv|A2|我完全同意。|Wǒ wánquán tóngyì.|Ich stimme völlig zu.
为|wèi|für|prep|A2|我真为你高兴。|Wǒ zhēn wèi nǐ gāoxìng.|Ich freue mich wirklich für dich.
向|xiàng|nach; in Richtung|prep|A2|请向前走。|Qǐng xiàng qián zǒu.|Bitte gehen Sie geradeaus.
以外|yǐwài|außer; außerhalb|n|A2|除了他以外，都来了。|Chúle tā yǐwài, dōu lái le.|Außer ihm sind alle gekommen.
越|yuè|je ... desto; immer (mehr)|adv|A2|雨越下越大。|Yǔ yuè xià yuè dà.|Es regnet immer stärker.
这么|zhème|so|pron|A2|今天怎么这么冷？|Jīntiān zěnme zhème lěng?|Warum ist es heute so kalt?
这样|zhèyàng|so; auf diese Weise|pron|A2|这样做不对。|Zhèyàng zuò bú duì.|So ist das nicht richtig.
正好|zhènghǎo|gerade recht; genau passend|adv|A2|你来得正好。|Nǐ lái de zhènghǎo.|Du kommst gerade recht.
正是|zhèngshì|genau (das) sein|v|A2|这正是我想要的。|Zhè zhèngshì wǒ xiǎng yào de.|Das ist genau das, was ich will.
只要|zhǐyào|solange; wenn nur|conj|A2|只要你来，我就高兴。|Zhǐyào nǐ lái, wǒ jiù gāoxìng.|Solange du kommst, freue ich mich.
因为……所以……|yīnwèi … suǒyǐ …|weil …, deshalb …|conj|A2|因为下雨，所以我没去。|Yīnwèi xiàyǔ, suǒyǐ wǒ méi qù.|Weil es geregnet hat, bin ich nicht hingegangen.
虽然……但是……|suīrán … dànshì …|zwar …, aber …|conj|A2|虽然很累，但是很高兴。|Suīrán hěn lèi, dànshì hěn gāoxìng.|Ich bin zwar müde, aber sehr glücklich.
不但……而且……|búdàn … érqiě …|nicht nur …, sondern auch …|conj|A2|她不但聪明，而且很努力。|Tā búdàn cōngming, érqiě hěn nǔlì.|Sie ist nicht nur klug, sondern auch sehr fleißig.
几乎|jīhū|fast; beinahe|adv|A2|我几乎每天都跑步。|Wǒ jīhū měi tiān dōu pǎobù.|Ich gehe fast jeden Tag joggen.
只有……才……|zhǐyǒu … cái …|nur wenn ..., dann ...|conj|A2|只有努力，才能成功。|Zhǐyǒu nǔlì, cái néng chénggōng.|Nur wenn man sich anstrengt, hat man Erfolg.
极|jí|äußerst; extrem|adv|A2|今天的天气好极了。|Jīntiān de tiānqì hǎo jí le.|Das Wetter heute ist ganz hervorragend.
根据|gēnjù|gemäß; laut|prep|A2|根据天气预报，明天下雨。|Gēnjù tiānqì yùbào, míngtiān xià yǔ.|Laut Wettervorhersage regnet es morgen.
按照|ànzhào|gemäß; nach|prep|B1|请按照老师说的做。|Qǐng ànzhào lǎoshī shuō de zuò.|Bitte mach es so, wie der Lehrer sagt.
本来|běnlái|eigentlich; ursprünglich|adv|B1|我本来不想去。|Wǒ běnlái bù xiǎng qù.|Eigentlich wollte ich nicht hingehen.
并|bìng|(verstärkt Verneinung) gar; und|adv|B1|这并不难。|Zhè bìng bù nán.|Das ist gar nicht schwer.
并且|bìngqiě|und außerdem|conj|B1|她很聪明，并且很努力。|Tā hěn cōngming, bìngqiě hěn nǔlì.|Sie ist klug und außerdem sehr fleißig.
不必|búbì|nicht müssen; nicht nötig|adv|B1|你不必担心。|Nǐ búbì dānxīn.|Du brauchst dir keine Sorgen zu machen.
不断|búduàn|ständig; ununterbrochen|adv|B1|他不断地进步。|Tā búduàn de jìnbù.|Er macht ständig Fortschritte.
不论|búlùn|egal ob; ganz gleich|conj|B1|不论多忙，他都来。|Búlùn duō máng, tā dōu lái.|Egal wie beschäftigt er ist, er kommt immer.
不得不|bùdébù|nicht umhinkönnen; müssen|adv|B1|我不得不早点走。|Wǒ bùdébù zǎo diǎn zǒu.|Ich muss leider früher gehen.
不光|bùguāng|nicht nur|conj|B1|不光是我，大家都知道。|Bùguāng shì wǒ, dàjiā dōu zhīdào.|Nicht nur ich, alle wissen es.
不仅|bùjǐn|nicht nur|conj|B1|他不仅会唱歌，还会跳舞。|Tā bùjǐn huì chànggē, hái huì tiàowǔ.|Er kann nicht nur singen, sondern auch tanzen.
反复|fǎnfù|wiederholt; immer wieder|adv|B1|这个字我反复写了很多次。|Zhège zì wǒ fǎnfù xiěle hěn duō cì.|Dieses Zeichen habe ich immer wieder geschrieben.
赶紧|gǎnjǐn|schnell; schleunigst|adv|B1|下雨了，赶紧回家吧。|Xià yǔ le, gǎnjǐn huí jiā ba.|Es regnet, lass uns schnell nach Hause gehen.
赶快|gǎnkuài|schnell; sofort|adv|B1|赶快起床，要迟到了！|Gǎnkuài qǐchuáng, yào chídào le!|Steh schnell auf, wir kommen zu spät!
根本|gēnběn|überhaupt (nicht); grundlegend|adv|B1|我根本不认识他。|Wǒ gēnběn bú rènshi tā.|Ich kenne ihn überhaupt nicht.
更加|gèngjiā|noch mehr|adv|B1|她比以前更加努力了。|Tā bǐ yǐqián gèngjiā nǔlì le.|Sie strengt sich noch mehr an als früher.
果然|guǒrán|tatsächlich; wie erwartet|adv|B1|他果然没来。|Tā guǒrán méi lái.|Er ist tatsächlich nicht gekommen.
好好|hǎohǎo|ordentlich; richtig|adv|B1|你要好好休息。|Nǐ yào hǎohǎo xiūxi.|Du musst dich richtig ausruhen.
互相|hùxiāng|gegenseitig; einander|adv|B1|我们应该互相帮助。|Wǒmen yīnggāi hùxiāng bāngzhù.|Wir sollten einander helfen.
基本上|jīběnshang|im Großen und Ganzen|adv|B1|作业基本上做完了。|Zuòyè jīběnshang zuòwán le.|Die Hausaufgaben sind im Großen und Ganzen fertig.
…极了|…jí le|äußerst; total (nachgestellt)|phr|B1|今天的菜好吃极了！|Jīntiān de cài hǎochī jí le!|Das Essen heute ist total lecker!
较|jiào|relativ; vergleichsweise|adv|B1|今天气温较低。|Jīntiān qìwēn jiào dī.|Heute ist die Temperatur relativ niedrig.
仅|jǐn|nur; lediglich|adv|B1|这里仅有一家商店。|Zhèlǐ jǐn yǒu yì jiā shāngdiàn.|Hier gibt es nur einen einzigen Laden.
仅仅|jǐnjǐn|nur; bloß|adv|B1|我仅仅学了三个月。|Wǒ jǐnjǐn xué le sān ge yuè.|Ich habe nur drei Monate gelernt.
进一步|jìnyíbù|weiter; noch eingehender|adv|B1|我想进一步了解中国。|Wǒ xiǎng jìnyíbù liǎojiě Zhōngguó.|Ich möchte China noch besser kennenlernen.
就是|jiùshì|genau; eben; nämlich|adv|B1|这就是我的家。|Zhè jiùshì wǒ de jiā.|Das hier ist mein Zuhause.
据说|jùshuō|angeblich; man sagt|v|B1|据说他要结婚了。|Jùshuō tā yào jiéhūn le.|Angeblich heiratet er bald.
绝对|juéduì|absolut; unbedingt|adv|B1|这绝对没问题。|Zhè juéduì méi wèntí.|Das ist absolut kein Problem.
恐怕|kǒngpà|leider wohl; ich fürchte|adv|B1|我恐怕去不了了。|Wǒ kǒngpà qù bu liǎo le.|Ich fürchte, ich kann nicht hingehen.
连|lián|sogar; (nicht) einmal|prep|B1|他连早饭都没吃。|Tā lián zǎofàn dōu méi chī.|Er hat nicht einmal gefrühstückt.
连忙|liánmáng|eilig; sofort|adv|B1|他连忙站了起来。|Tā liánmáng zhàn le qǐlái.|Er stand eilig auf.
另一方面|lìng yì fāngmiàn|andererseits|conj|B1|另一方面，价格也很贵。|Lìng yì fāngmiàn, jiàgé yě hěn guì.|Andererseits ist der Preis auch sehr hoch.
难道|nándào|etwa (rhetorische Frage)|adv|B1|难道你不知道吗？|Nándào nǐ bù zhīdào ma?|Weißt du das etwa nicht?
其次|qícì|zweitens; als Nächstes|conj|B1|首先要便宜，其次要好看。|Shǒuxiān yào piányi, qícì yào hǎokàn.|Erstens soll es günstig sein, zweitens gut aussehen.
亲自|qīnzì|persönlich; selbst|adv|B1|老板亲自来接我们。|Lǎobǎn qīnzì lái jiē wǒmen.|Der Chef holt uns persönlich ab.
确实|quèshí|wirklich; tatsächlich|adv|B1|这确实是个好主意。|Zhè quèshí shì gè hǎo zhǔyi.|Das ist wirklich eine gute Idee.
仍|réng|immer noch|adv|B1|他仍在等你。|Tā réng zài děng nǐ.|Er wartet immer noch auf dich.
仍然|réngrán|immer noch; nach wie vor|adv|B1|她仍然住在这里。|Tā réngrán zhù zài zhèlǐ.|Sie wohnt nach wie vor hier.
实际上|shíjìshang|tatsächlich; in Wirklichkeit|adv|B1|实际上他不是老师。|Shíjìshang tā bú shì lǎoshī.|In Wirklichkeit ist er kein Lehrer.
始终|shǐzhōng|die ganze Zeit; stets|adv|B1|他始终没有回答。|Tā shǐzhōng méiyǒu huídá.|Er hat die ganze Zeit nicht geantwortet.
事实上|shìshíshang|tatsächlich; in der Tat|adv|B1|事实上我也不知道。|Shìshíshang wǒ yě bù zhīdào.|Tatsächlich weiß ich es auch nicht.
相当|xiāngdāng|ziemlich; recht|adv|B1|这个问题相当难。|Zhège wèntí xiāngdāng nán.|Diese Frage ist ziemlich schwer.
相互|xiānghù|gegenseitig; einander|adv|B1|我们要相互帮助。|Wǒmen yào xiānghù bāngzhù.|Wir sollten einander helfen.
要是|yàoshi|wenn; falls|conj|B1|要是下雨，我就不去了。|Yàoshi xiàyǔ, wǒ jiù bú qù le.|Wenn es regnet, gehe ich nicht hin.
已|yǐ|bereits; schon|adv|B1|他已到北京。|Tā yǐ dào Běijīng.|Er ist bereits in Peking angekommen.
一方面|yìfāngmiàn|einerseits|conj|B1|一方面想去，一方面又怕累。|Yìfāngmiàn xiǎng qù, yìfāngmiàn yòu pà lèi.|Einerseits will ich hin, andererseits fürchte ich, dass es anstrengend wird.
应当|yīngdāng|sollen; müssen|v|B1|我们应当互相帮助。|Wǒmen yīngdāng hùxiāng bāngzhù.|Wir sollten uns gegenseitig helfen.
由|yóu|von; durch|prep|B1|这件事由我来做。|Zhè jiàn shì yóu wǒ lái zuò.|Das übernehme ich.
由于|yóuyú|wegen; aufgrund|prep|B1|由于下雨，比赛推迟了。|Yóuyú xiàyǔ, bǐsài tuīchí le.|Wegen des Regens wurde das Spiel verschoben.
只好|zhǐhǎo|notgedrungen; wohl müssen|adv|B1|没有车，我只好走路。|Méiyǒu chē, wǒ zhǐhǎo zǒulù.|Es fuhr nichts, also musste ich zu Fuß gehen.
只是|zhǐshì|nur; bloß|adv|B1|我只是想问一下。|Wǒ zhǐshì xiǎng wèn yíxià.|Ich wollte nur kurz fragen.
只有|zhǐyǒu|nur; nur wenn|conj|B1|只有努力才能成功。|Zhǐyǒu nǔlì cái néng chénggōng.|Nur wer sich anstrengt, hat Erfolg.
专门|zhuānmén|extra; speziell|adv|B1|我专门来看你。|Wǒ zhuānmén lái kàn nǐ.|Ich bin extra gekommen, um dich zu besuchen.
不管|bùguǎn|egal ob; ganz gleich|conj|B1|不管多忙，他都运动。|Bùguǎn duō máng, tā dōu yùndòng.|Egal wie beschäftigt er ist, er macht Sport.
与|yǔ|und; mit (schriftsprachlich)|conj|B1|工作与生活都很重要。|Gōngzuò yǔ shēnghuó dōu hěn zhòngyào.|Arbeit und Leben sind beide wichtig.
之|zhī|(Attributpartikel, schriftsprachlich)|part|B1|他是我最好的朋友之一。|Tā shì wǒ zuì hǎo de péngyou zhī yī.|Er ist einer meiner besten Freunde.
于是|yúshì|daraufhin; also|conj|B1|下雨了，于是我们回家了。|Xià yǔ le, yúshì wǒmen huí jiā le.|Es fing an zu regnen, also gingen wir nach Hause.
以|yǐ|mit; durch; um zu|prep|B1|他以最快的速度跑回家。|Tā yǐ zuì kuài de sùdù pǎo huí jiā.|Er rannte so schnell er konnte nach Hause.
却|què|aber; jedoch|adv|B1|他很忙，却每天来看我。|Tā hěn máng, què měi tiān lái kàn wǒ.|Er ist sehr beschäftigt, besucht mich aber trotzdem jeden Tag.
呀|ya|(Partikel: Ausruf, Betonung)|part|B1|你怎么不说话呀？|Nǐ zěnme bù shuōhuà ya?|Warum sagst du denn nichts?
对于|duìyú|was ... betrifft; für|prep|B1|对于这件事，我没意见。|Duìyú zhè jiàn shì, wǒ méi yìjiàn.|Was diese Sache betrifft, habe ich keine Einwände.
尽管|jǐnguǎn|obwohl|conj|B1|尽管下雨，他还是来了。|Jǐnguǎn xià yǔ, tā háishi lái le.|Obwohl es regnete, ist er trotzdem gekommen.
无|wú|ohne; nicht haben|v|B1|这是无糖可乐。|Zhè shì wú táng kělè.|Das ist zuckerfreie Cola.
是否|shìfǒu|ob|adv|B1|我不知道他是否来。|Wǒ bù zhīdào tā shìfǒu lái.|Ich weiß nicht, ob er kommt.
甚至|shènzhì|sogar|adv|B1|他甚至不知道我的名字。|Tā shènzhì bù zhīdào wǒ de míngzi.|Er kennt nicht einmal meinen Namen.
稍微|shāowēi|ein wenig; etwas|adv|B1|请稍微等一下。|Qǐng shāowēi děng yíxià.|Bitte warten Sie einen kleinen Moment.
究竟|jiūjìng|eigentlich; überhaupt (in Fragen)|adv|B1|你究竟想说什么？|Nǐ jiūjìng xiǎng shuō shénme?|Was willst du eigentlich sagen?
竟然|jìngrán|tatsächlich; unerwartet|adv|B1|他竟然忘了我的生日。|Tā jìngrán wàng le wǒ de shēngrì.|Er hat doch tatsächlich meinen Geburtstag vergessen.
而|ér|aber; und (verbindend)|conj|B1|这个菜好吃而不贵。|Zhège cài hǎochī ér bú guì.|Dieses Gericht ist lecker und trotzdem nicht teuer.
肯定|kěndìng|bestimmt; sicher|adv|B1|他肯定会来的。|Tā kěndìng huì lái de.|Er kommt ganz bestimmt.
`,

  society: `
道理|dàolǐ|Vernunft; Sinn; Logik|n|A2|你说得很有道理。|Nǐ shuō de hěn yǒu dàolǐ.|Was du sagst, ergibt wirklich Sinn.
方面|fāngmiàn|Aspekt; Hinsicht|n|A2|他在这方面很有经验。|Tā zài zhè fāngmiàn hěn yǒu jīngyàn.|Er hat in dieser Hinsicht viel Erfahrung.
公平|gōngpíng|fair; gerecht|adj|A2|这样做不公平。|Zhèyàng zuò bù gōngpíng.|So zu handeln ist nicht fair.
过年|guònián|(chinesisches) Neujahr feiern|v|A2|我们回家过年。|Wǒmen huí jiā guònián.|Wir fahren zum Neujahrsfest nach Hause.
好处|hǎochù|Vorteil; Nutzen|n|A2|运动对身体有好处。|Yùndòng duì shēntǐ yǒu hǎochù.|Sport tut dem Körper gut.
好事|hǎoshì|gute Sache; gute Tat|n|A2|这是一件好事。|Zhè shì yí jiàn hǎoshì.|Das ist eine gute Sache.
坏处|huàichù|Nachteil; Schaden|n|A2|这样做没有坏处。|Zhèyàng zuò méiyǒu huàichù.|Es schadet nicht, es so zu machen.
角度|jiǎodù|Blickwinkel; Winkel|n|A2|我们换个角度看问题。|Wǒmen huàn gè jiǎodù kàn wèntí.|Betrachten wir das Problem aus einem anderen Blickwinkel.
科学|kēxué|Wissenschaft|n|A2|我对科学很感兴趣。|Wǒ duì kēxué hěn gǎn xìngqù.|Ich interessiere mich sehr für Wissenschaft.
名称|míngchēng|Bezeichnung; Name (einer Sache)|n|A2|这家公司的名称是什么？|Zhè jiā gōngsī de míngchēng shì shénme?|Wie heißt diese Firma?
目的|mùdì|Ziel; Zweck|n|A2|你来这儿的目的是什么？|Nǐ lái zhèr de mùdì shì shénme?|Mit welchem Ziel bist du hergekommen?
平等|píngděng|gleichberechtigt; Gleichheit|adj|A2|人人都是平等的。|Rénrén dōu shì píngděng de.|Alle Menschen sind gleich.
全国|quánguó|das ganze Land|n|A2|全国都在放假。|Quánguó dōu zài fàngjià.|Das ganze Land hat gerade frei.
全体|quántǐ|alle; die Gesamtheit|n|A2|全体学生都来了。|Quántǐ xuésheng dōu lái le.|Alle Schüler sind gekommen.
省|shěng|Provinz; sparen|n|A2|中国有很多省。|Zhōngguó yǒu hěn duō shěng.|China hat viele Provinzen.
实际|shíjì|tatsächlich; Realität|adj|A2|实际情况不是这样。|Shíjì qíngkuàng bú shì zhèyàng.|Die tatsächliche Lage ist anders.
特点|tèdiǎn|Besonderheit; Merkmal|n|A2|这个城市有什么特点？|Zhège chéngshì yǒu shénme tèdiǎn?|Was ist das Besondere an dieser Stadt?
行为|xíngwéi|Verhalten|n|A2|这种行为不好。|Zhè zhǒng xíngwéi bù hǎo.|Dieses Verhalten ist nicht gut.
自由|zìyóu|frei; Freiheit|adj|A2|我喜欢自由的生活。|Wǒ xǐhuan zìyóu de shēnghuó.|Ich mag ein freies Leben.
作用|zuòyòng|Wirkung; Funktion|n|A2|这个药没有作用。|Zhège yào méiyǒu zuòyòng.|Dieses Medikament wirkt nicht.
做法|zuòfǎ|Vorgehensweise; Methode|n|A2|这种做法不对。|Zhè zhǒng zuòfǎ bú duì.|Diese Vorgehensweise ist nicht richtig.
本领|běnlǐng|Können; Fähigkeit|n|B1|他的本领很大。|Tā de běnlǐng hěn dà.|Er hat großes Können.
本事|běnshi|Können; Fähigkeit|n|B1|他很有本事。|Tā hěn yǒu běnshi.|Er hat richtig was drauf.
比例|bǐlì|Verhältnis; Anteil|n|B1|女生的比例很高。|Nǚshēng de bǐlì hěn gāo.|Der Anteil der Schülerinnen ist sehr hoch.
标准|biāozhǔn|Standard; Norm|n|B1|这里的标准很高。|Zhèlǐ de biāozhǔn hěn gāo.|Die Standards hier sind sehr hoch.
表面|biǎomiàn|Oberfläche|n|B1|桌子的表面很干净。|Zhuōzi de biǎomiàn hěn gānjìng.|Die Tischoberfläche ist sehr sauber.
部长|bùzhǎng|Minister/in; Abteilungsleiter/in|n|B1|部长正在开会。|Bùzhǎng zhèngzài kāihuì.|Der Minister ist gerade in einer Sitzung.
才能|cáinéng|Talent; Begabung|n|B1|他很有音乐才能。|Tā hěn yǒu yīnyuè cáinéng.|Er ist musikalisch sehr begabt.
采取|cǎiqǔ|ergreifen (Maßnahmen)|v|B1|我们要马上采取行动。|Wǒmen yào mǎshàng cǎiqǔ xíngdòng.|Wir müssen sofort handeln.
场合|chǎnghé|Anlass; Gelegenheit|n|B1|这种场合要穿西装。|Zhè zhǒng chǎnghé yào chuān xīzhuāng.|Zu so einem Anlass trägt man Anzug.
成就|chéngjiù|Erfolg; Leistung|n|B1|他取得了很大的成就。|Tā qǔdéle hěn dà de chéngjiù.|Er hat große Erfolge erzielt.
程度|chéngdù|Grad; Niveau|n|B1|他的汉语程度很高。|Tā de Hànyǔ chéngdù hěn gāo.|Sein Chinesischniveau ist sehr hoch.
传说|chuánshuō|Legende; Sage|n|B1|这是一个古老的传说。|Zhè shì yí gè gǔlǎo de chuánshuō.|Das ist eine uralte Legende.
创新|chuàngxīn|Innovation; Neues schaffen|v|B1|公司需要不断创新。|Gōngsī xūyào búduàn chuàngxīn.|Die Firma muss ständig Neues schaffen.
创造|chuàngzào|erschaffen; schaffen|v|B1|我们要创造更好的生活。|Wǒmen yào chuàngzào gèng hǎo de shēnghuó.|Wir wollen ein besseres Leben schaffen.
存在|cúnzài|existieren; bestehen|v|B1|这个问题一直存在。|Zhège wèntí yìzhí cúnzài.|Dieses Problem besteht schon lange.
代表团|dàibiǎotuán|Delegation|n|B1|代表团明天到北京。|Dàibiǎotuán míngtiān dào Běijīng.|Die Delegation kommt morgen in Peking an.
带动|dàidòng|antreiben; ankurbeln|v|B1|旅游带动了当地经济。|Lǚyóu dàidòngle dāngdì jīngjì.|Der Tourismus hat die lokale Wirtschaft angekurbelt.
地区|dìqū|Gebiet; Region|n|B1|这个地区经常下雨。|Zhège dìqū jīngcháng xià yǔ.|In dieser Region regnet es oft.
调查|diàochá|untersuchen; Umfrage|v|B1|警察正在调查这件事。|Jǐngchá zhèngzài diàochá zhè jiàn shì.|Die Polizei untersucht den Fall gerade.
发达|fādá|entwickelt; hoch entwickelt|adj|B1|这个城市的交通很发达。|Zhège chéngshì de jiāotōng hěn fādá.|Das Verkehrsnetz dieser Stadt ist sehr gut ausgebaut.
发明|fāmíng|erfinden; Erfindung|v|B1|谁发明了电话？|Shéi fāmíngle diànhuà?|Wer hat das Telefon erfunden?
范围|fànwéi|Bereich; Umfang|n|B1|考试的范围很大。|Kǎoshì de fànwéi hěn dà.|Der Prüfungsstoff ist sehr umfangreich.
方式|fāngshì|Art und Weise|n|B1|我喜欢这种生活方式。|Wǒ xǐhuan zhè zhǒng shēnghuó fāngshì.|Ich mag diesen Lebensstil.
访问|fǎngwèn|besuchen (offiziell)|v|B1|他下个月访问中国。|Tā xià ge yuè fǎngwèn Zhōngguó.|Er besucht nächsten Monat China.
风险|fēngxiǎn|Risiko|n|B1|这样做风险很大。|Zhèyàng zuò fēngxiǎn hěn dà.|So ist das Risiko sehr groß.
福|fú|Glück; Segen|n|B1|门上贴着一个福字。|Mén shang tiēzhe yí ge fú zì.|An der Tür klebt das Zeichen für Glück.
改造|gǎizào|umbauen; umgestalten|v|B1|这个老房子要改造。|Zhège lǎo fángzi yào gǎizào.|Dieses alte Haus soll umgebaut werden.
个人|gèrén|Einzelperson; persönlich|n|B1|这是我个人的看法。|Zhè shì wǒ gèrén de kànfǎ.|Das ist meine persönliche Meinung.
工业|gōngyè|Industrie|n|B1|这个城市工业很发达。|Zhège chéngshì gōngyè hěn fādá.|Die Industrie dieser Stadt ist hoch entwickelt.
公布|gōngbù|bekannt geben|v|B1|成绩明天公布。|Chéngjì míngtiān gōngbù.|Die Noten werden morgen bekannt gegeben.
公共|gōnggòng|öffentlich|adj|B1|这里是公共场所。|Zhèlǐ shì gōnggòng chǎngsuǒ.|Das hier ist ein öffentlicher Ort.
公开|gōngkāi|öffentlich; offenlegen|adj|B1|这件事不能公开。|Zhè jiàn shì bù néng gōngkāi.|Diese Sache darf nicht öffentlich werden.
公民|gōngmín|Bürger/in|n|B1|每个公民都要守法。|Měi ge gōngmín dōu yào shǒufǎ.|Jeder Bürger muss sich an die Gesetze halten.
观念|guānniàn|Vorstellung; Auffassung|n|B1|他的观念很传统。|Tā de guānniàn hěn chuántǒng.|Seine Vorstellungen sind sehr traditionell.
规定|guīdìng|Vorschrift; festlegen|n|B1|这是学校的规定。|Zhè shì xuéxiào de guīdìng.|Das ist eine Vorschrift der Schule.
规范|guīfàn|normgerecht; Norm|adj|B1|你的发音很规范。|Nǐ de fāyīn hěn guīfàn.|Deine Aussprache ist sehr korrekt.
过程|guòchéng|Prozess; Verlauf|n|B1|学习是一个过程。|Xuéxí shì yí ge guòchéng.|Lernen ist ein Prozess.
合法|héfǎ|legal; rechtmäßig|adj|B1|这样做是合法的。|Zhèyàng zuò shì héfǎ de.|Das ist legal.
和平|hépíng|Frieden|n|B1|我们都爱和平。|Wǒmen dōu ài hépíng.|Wir alle lieben den Frieden.
后果|hòuguǒ|Folgen; Konsequenzen|n|B1|这样做后果很严重。|Zhèyàng zuò hòuguǒ hěn yánzhòng.|Das hat schwere Folgen.
话题|huàtí|Gesprächsthema|n|B1|我们换个话题吧。|Wǒmen huàn ge huàtí ba.|Lass uns das Thema wechseln.
环保|huánbǎo|umweltfreundlich; Umweltschutz|adj|B1|骑车上班很环保。|Qí chē shàngbān hěn huánbǎo.|Mit dem Rad zur Arbeit zu fahren ist umweltfreundlich.
集体|jítǐ|Kollektiv; Gemeinschaft|n|B1|我们是一个集体。|Wǒmen shì yí ge jítǐ.|Wir sind eine Gemeinschaft.
纪念|jìniàn|Andenken; gedenken|n|B1|这张照片留作纪念。|Zhè zhāng zhàopiàn liú zuò jìniàn.|Dieses Foto behalte ich als Andenken.
价值|jiàzhí|Wert|n|B1|这本书很有价值。|Zhè běn shū hěn yǒu jiàzhí.|Dieses Buch ist sehr wertvoll.
建立|jiànlì|gründen; aufbauen|v|B1|我们建立了很好的关系。|Wǒmen jiànlì le hěn hǎo de guānxi.|Wir haben eine sehr gute Beziehung aufgebaut.
建设|jiànshè|aufbauen; Aufbau|v|B1|这个城市建设得很快。|Zhège chéngshì jiànshè de hěn kuài.|Diese Stadt wird sehr schnell ausgebaut.
经历|jīnglì|Erlebnis; erleben|n|B1|这是一次难忘的经历。|Zhè shì yí cì nánwàng de jīnglì.|Das ist ein unvergessliches Erlebnis.
举办|jǔbàn|veranstalten|v|B1|学校要举办运动会。|Xuéxiào yào jǔbàn yùndònghuì.|Die Schule veranstaltet ein Sportfest.
开放|kāifàng|geöffnet sein; öffnen; offen|v|B1|公园每天都开放。|Gōngyuán měi tiān dōu kāifàng.|Der Park ist jeden Tag geöffnet.
开展|kāizhǎn|durchführen; entfalten|v|B1|学校开展了很多活动。|Xuéxiào kāizhǎn le hěn duō huódòng.|Die Schule hat viele Aktivitäten durchgeführt.
考验|kǎoyàn|Bewährungsprobe; auf die Probe stellen|n|B1|这对我是一个考验。|Zhè duì wǒ shì yí ge kǎoyàn.|Das ist für mich eine Bewährungsprobe.
客观|kèguān|objektiv|adj|B1|你的看法很客观。|Nǐ de kànfǎ hěn kèguān.|Deine Sichtweise ist sehr objektiv.
困难|kùnnan|Schwierigkeit; schwierig|n|B1|有困难就告诉我。|Yǒu kùnnan jiù gàosu wǒ.|Sag mir Bescheid, wenn du Schwierigkeiten hast.
理由|lǐyóu|Grund; Begründung|n|B1|你有什么理由？|Nǐ yǒu shénme lǐyóu?|Was für einen Grund hast du?
联合|liánhé|sich zusammenschließen; gemeinsam|v|B1|两家公司联合起来了。|Liǎng jiā gōngsī liánhé qǐlái le.|Die beiden Firmen haben sich zusammengeschlossen.
联合国|Liánhéguó|Vereinte Nationen|n|B1|他在联合国工作。|Tā zài Liánhéguó gōngzuò.|Er arbeitet bei den Vereinten Nationen.
龙|lóng|Drache|n|B1|中国人很喜欢龙。|Zhōngguórén hěn xǐhuan lóng.|Chinesen mögen Drachen sehr.
落后|luòhòu|rückständig; zurückliegen|adj|B1|这个地方比较落后。|Zhège dìfang bǐjiào luòhòu.|Diese Gegend ist ziemlich rückständig.
毛病|máobìng|Defekt; Macke; Fehler|n|B1|我的电脑出毛病了。|Wǒ de diànnǎo chū máobìng le.|Mein Computer hat einen Defekt.
民间|mínjiān|im Volk; Volks-|n|B1|这是一个民间故事。|Zhè shì yí gè mínjiān gùshi.|Das ist ein Volksmärchen.
民族|mínzú|Volk; Ethnie; Nationalität|n|B1|中国有五十六个民族。|Zhōngguó yǒu wǔshíliù gè mínzú.|China hat 56 Volksgruppen.
命运|mìngyùn|Schicksal|n|B1|我不相信命运。|Wǒ bù xiāngxìn mìngyùn.|Ich glaube nicht an das Schicksal.
农村|nóngcūn|Land; ländliche Gegend|n|B1|我在农村长大。|Wǒ zài nóngcūn zhǎngdà.|Ich bin auf dem Land aufgewachsen.
农业|nóngyè|Landwirtschaft|n|B1|这里的农业很发达。|Zhèlǐ de nóngyè hěn fādá.|Die Landwirtschaft hier ist hoch entwickelt.
普及|pǔjí|verbreiten; weit verbreitet sein|v|B1|手机已经很普及了。|Shǒujī yǐjīng hěn pǔjí le.|Handys sind inzwischen sehr verbreitet.
全球|quánqiú|die ganze Welt; global|n|B1|这是一个全球问题。|Zhè shì yí gè quánqiú wèntí.|Das ist ein globales Problem.
人工|réngōng|künstlich; von Hand|adj|B1|这是一个人工湖。|Zhè shì yí gè réngōng hú.|Das ist ein künstlicher See.
人类|rénlèi|Menschheit|n|B1|狗是人类的好朋友。|Gǒu shì rénlèi de hǎo péngyou.|Der Hund ist ein guter Freund des Menschen.
人民|rénmín|Volk|n|B1|人民的生活越来越好。|Rénmín de shēnghuó yuè lái yuè hǎo.|Das Leben der Bevölkerung wird immer besser.
人生|rénshēng|Leben (eines Menschen)|n|B1|这是我人生的第一次。|Zhè shì wǒ rénshēng de dì-yī cì.|Das ist das erste Mal in meinem Leben.
商业|shāngyè|Handel; Geschäftswelt|n|B1|这里是商业中心。|Zhèlǐ shì shāngyè zhōngxīn.|Hier ist das Geschäftszentrum.
身份证|shēnfènzhèng|Personalausweis|n|B1|请给我看一下身份证。|Qǐng gěi wǒ kàn yíxià shēnfènzhèng.|Zeigen Sie mir bitte Ihren Ausweis.
生存|shēngcún|überleben; existieren|v|B1|动物需要水才能生存。|Dòngwù xūyào shuǐ cái néng shēngcún.|Tiere brauchen Wasser, um zu überleben.
声明|shēngmíng|Erklärung; erklären|n|B1|公司发表了一个声明。|Gōngsī fābiǎo le yí gè shēngmíng.|Die Firma hat eine Erklärung veröffentlicht.
胜利|shènglì|Sieg; siegen|n|B1|我们取得了胜利。|Wǒmen qǔdé le shènglì.|Wir haben den Sieg errungen.
石油|shíyóu|Erdöl|n|B1|石油的价格又涨了。|Shíyóu de jiàgé yòu zhǎng le.|Der Ölpreis ist wieder gestiegen.
实力|shílì|Stärke; Leistungsvermögen|n|B1|这个队很有实力。|Zhège duì hěn yǒu shílì.|Diese Mannschaft ist sehr stark.
实行|shíxíng|durchführen; einführen|v|B1|学校实行了新规定。|Xuéxiào shíxíng le xīn guīdìng.|Die Schule hat neue Regeln eingeführt.
事件|shìjiàn|Ereignis; Vorfall|n|B1|这个事件影响很大。|Zhège shìjiàn yǐngxiǎng hěn dà.|Dieser Vorfall hat große Auswirkungen.
事实|shìshí|Tatsache|n|B1|你说的不是事实。|Nǐ shuō de bú shì shìshí.|Was du sagst, entspricht nicht den Tatsachen.
属|shǔ|gehören zu; im Tierkreisjahr geboren sein|v|B1|我属龙，你呢？|Wǒ shǔ lóng, nǐ ne?|Ich bin im Jahr des Drachen geboren, und du?
双方|shuāngfāng|beide Seiten|n|B1|双方都同意了。|Shuāngfāng dōu tóngyì le.|Beide Seiten haben zugestimmt.
思想|sīxiǎng|Gedanke; Denken; Ideologie|n|B1|他的思想很开放。|Tā de sīxiǎng hěn kāifàng.|Er ist sehr aufgeschlossen.
特色|tèsè|Besonderheit; Spezialität|n|B1|这是我们店的特色菜。|Zhè shì wǒmen diàn de tèsè cài.|Das ist die Spezialität unseres Hauses.
铁|tiě|Eisen|n|B1|这个门是铁做的。|Zhège mén shì tiě zuò de.|Diese Tür ist aus Eisen.
头脑|tóunǎo|Verstand; Kopf|n|B1|他很有头脑。|Tā hěn yǒu tóunǎo.|Er hat Köpfchen.
团|tuán|Gruppe; Truppe|n|B1|我们团有二十个人。|Wǒmen tuán yǒu èrshí ge rén.|Unsere Gruppe hat zwanzig Leute.
团结|tuánjié|zusammenhalten; einig|v|B1|大家要团结。|Dàjiā yào tuánjié.|Alle müssen zusammenhalten.
团体|tuántǐ|Gruppe; Organisation|n|B1|这是一个学生团体。|Zhè shì yí ge xuésheng tuántǐ.|Das ist eine Studentengruppe.
推动|tuīdòng|vorantreiben; fördern|v|B1|科学推动社会发展。|Kēxué tuīdòng shèhuì fāzhǎn.|Die Wissenschaft treibt die gesellschaftliche Entwicklung voran.
外交|wàijiāo|Diplomatie; Außenpolitik|n|B1|他在外交部工作。|Tā zài wàijiāobù gōngzuò.|Er arbeitet im Außenministerium.
文明|wénmíng|Zivilisation; zivilisiert|n|B1|中国文明历史很长。|Zhōngguó wénmíng lìshǐ hěn cháng.|Die chinesische Zivilisation hat eine lange Geschichte.
武器|wǔqì|Waffe|n|B1|这里不能带武器。|Zhèlǐ bù néng dài wǔqì.|Hier darf man keine Waffen mitbringen.
现实|xiànshí|Realität; realistisch|n|B1|这就是现实。|Zhè jiù shì xiànshí.|Das ist eben die Realität.
现象|xiànxiàng|Phänomen; Erscheinung|n|B1|这种现象很常见。|Zhè zhǒng xiànxiàng hěn chángjiàn.|Dieses Phänomen ist sehr verbreitet.
效果|xiàoguǒ|Wirkung; Effekt|n|B1|这种药效果很好。|Zhè zhǒng yào xiàoguǒ hěn hǎo.|Dieses Medikament wirkt sehr gut.
形式|xíngshì|Form|n|B1|上课的形式有很多。|Shàngkè de xíngshì yǒu hěn duō.|Es gibt viele Unterrichtsformen.
形象|xíngxiàng|Image; Erscheinungsbild|n|B1|他很注意自己的形象。|Tā hěn zhùyì zìjǐ de xíngxiàng.|Er achtet sehr auf sein Image.
性|xìng|Geschlecht; Eigenschaft (Suffix)|n|B1|男性和女性都可以参加。|Nánxìng hé nǚxìng dōu kěyǐ cānjiā.|Männer und Frauen können beide teilnehmen.
需求|xūqiú|Bedarf; Nachfrage|n|B1|市场需求很大。|Shìchǎng xūqiú hěn dà.|Die Nachfrage am Markt ist groß.
意义|yìyì|Bedeutung; Sinn|n|B1|这件事很有意义。|Zhè jiàn shì hěn yǒu yìyì.|Diese Sache ist sehr sinnvoll.
增长|zēngzhǎng|wachsen; Wachstum|v|B1|经济增长得很快。|Jīngjì zēngzhǎng de hěn kuài.|Die Wirtschaft wächst sehr schnell.
整体|zhěngtǐ|Ganzes; Gesamtheit|n|B1|我们是一个整体。|Wǒmen shì yí ge zhěngtǐ.|Wir sind eine Einheit.
证据|zhèngjù|Beweis|n|B1|你有证据吗？|Nǐ yǒu zhèngjù ma?|Hast du Beweise?
证明|zhèngmíng|beweisen; Bescheinigung|v|B1|这能证明他是对的。|Zhè néng zhèngmíng tā shì duì de.|Das kann beweisen, dass er recht hat.
志愿|zhìyuàn|Wunsch; freiwillig|n|B1|当医生是他的志愿。|Dāng yīshēng shì tā de zhìyuàn.|Arzt zu werden ist sein Berufswunsch.
制度|zhìdù|System; Regelung|n|B1|公司有新的制度。|Gōngsī yǒu xīn de zhìdù.|Die Firma hat neue Regelungen.
中华民族|Zhōnghuá Mínzú|die chinesische Nation|n|B1|中华民族有五十六个民族。|Zhōnghuá Mínzú yǒu wǔshíliù ge mínzú.|Zur chinesischen Nation gehören 56 Volksgruppen.
状况|zhuàngkuàng|Zustand; Lage|n|B1|他的身体状况很好。|Tā de shēntǐ zhuàngkuàng hěn hǎo.|Sein Gesundheitszustand ist sehr gut.
状态|zhuàngtài|Zustand; Verfassung|n|B1|我今天状态不好。|Wǒ jīntiān zhuàngtài bù hǎo.|Ich bin heute nicht in Form.
关键|guānjiàn|Schlüssel; entscheidender Punkt|n|B1|这是问题的关键。|Zhè shì wèntí de guānjiàn.|Das ist der Kern des Problems.
国籍|guójí|Staatsangehörigkeit|n|B1|请问你的国籍是什么？|Qǐngwèn nǐ de guójí shì shénme?|Darf ich fragen, welche Staatsangehörigkeit Sie haben?
研究|yánjiū|forschen; untersuchen|v|B1|他研究中国历史。|Tā yánjiū Zhōngguó lìshǐ.|Er erforscht die chinesische Geschichte.
禁止|jìnzhǐ|verbieten|v|B1|这里禁止停车。|Zhèlǐ jìnzhǐ tíngchē.|Hier ist Parken verboten.
顺序|shùnxù|Reihenfolge|n|B1|这些词的顺序不对。|Zhèxiē cí de shùnxù bú duì.|Die Reihenfolge dieser Wörter stimmt nicht.
`,
};

export default part8;
