// HSK-Ergänzung (HSK 3.0 Stufen 1–3 und HSK 2.0 Stufen 1–4), nach Niveau sortiert.
// Format: Wort | Pinyin | Deutsch | Wortart | Niveau | Beispiel | Beispiel-Pinyin | Beispiel-Deutsch | L
const part5: Record<string, string> = {
  basics: `
别的|biéde|andere(s)|pron|A1|你还要别的吗？|Nǐ hái yào biéde ma?|Möchtest du noch etwas anderes?
不客气|bú kèqi|gern geschehen|phr|A1|谢谢！不客气。|Xièxie! Bú kèqi.|Danke! – Gern geschehen.
干什么|gàn shénme|was machen; wozu|phr|A1|你在干什么？|Nǐ zài gàn shénme?|Was machst du gerade?
没什么|méi shénme|nichts; macht nichts|phr|A1|没什么，别客气。|Méi shénme, bié kèqi.|Schon gut, keine Ursache.
们|men|(Pluralsuffix für Personen)|part|A1|朋友们，你们好！|Péngyoumen, nǐmen hǎo!|Hallo, Freunde!
哪里|nǎli|wo|pron|A1|你住在哪里？|Nǐ zhù zài nǎli?|Wo wohnst du?
哪些|nǎxiē|welche (Plural)|pron|A1|你去过哪些国家？|Nǐ qùguo nǎxiē guójiā?|In welchen Ländern warst du schon?
那些|nàxiē|jene; die da|pron|A1|那些书是谁的？|Nàxiē shū shì shéi de?|Wem gehören die Bücher da?
您|nín|Sie (höflich)|pron|A1|您好，请问您找谁？|Nín hǎo, qǐngwèn nín zhǎo shéi?|Guten Tag, zu wem möchten Sie?
请进|qǐng jìn|herein bitte|phr|A1|请进，门没关。|Qǐng jìn, mén méi guān.|Herein, die Tür ist offen.
请问|qǐngwèn|Entschuldigung, darf ich fragen|phr|A1|请问，洗手间在哪儿？|Qǐngwèn, xǐshǒujiān zài nǎr?|Entschuldigung, wo ist die Toilette?
请坐|qǐng zuò|bitte setzen Sie sich|phr|A1|请坐，喝杯茶吧。|Qǐng zuò, hē bēi chá ba.|Setzen Sie sich doch und trinken Sie einen Tee.
是不是|shì bu shì|ist es so oder nicht; etwa|phr|A1|你是不是累了？|Nǐ shì bu shì lèi le?|Bist du etwa müde?
她们|tāmen|sie (Plural, weiblich)|pron|A1|她们都是我的同学。|Tāmen dōu shì wǒ de tóngxué.|Sie sind alle meine Mitschülerinnen.
有的|yǒude|manche; einige|pron|A1|有的人不喜欢吃肉。|Yǒude rén bù xǐhuan chī ròu.|Manche Leute essen nicht gern Fleisch.
有些|yǒuxiē|einige; etwas|pron|A1|有些字我不认识。|Yǒuxiē zì wǒ bú rènshi.|Einige Schriftzeichen kenne ich nicht.
这些|zhèxiē|diese (Plural)|pron|A1|这些苹果很甜。|Zhèxiē píngguǒ hěn tián.|Diese Äpfel sind sehr süß.
不行|bùxíng|geht nicht; nicht in Ordnung|adj|A2|明天不行,我有事。|Míngtiān bùxíng, wǒ yǒu shì.|Morgen geht es nicht, ich habe etwas vor.
欢迎|huānyíng|willkommen heißen|v|A2|欢迎你来我家。|Huānyíng nǐ lái wǒ jiā.|Willkommen bei mir zu Hause.
快点儿|kuàidiǎnr|schneller; beeil dich|phr|A2|快点儿,我们要迟到了!|Kuàidiǎnr, wǒmen yào chídào le!|Beeil dich, wir kommen zu spät!
那样|nàyàng|so; solch|pron|A2|你别那样说。|Nǐ bié nàyàng shuō.|Sag das nicht so.
其他|qítā|andere; übrige|pron|A2|其他人在哪儿？|Qítā rén zài nǎr?|Wo sind die anderen?
什么样|shénmeyàng|was für ein; wie|pron|A2|他是什么样的人？|Tā shì shénmeyàng de rén?|Was für ein Mensch ist er?
它|tā|es (Sache, Tier)|pron|A2|它是我的小狗。|Tā shì wǒ de xiǎo gǒu.|Das ist mein kleiner Hund.
它们|tāmen|sie (Sachen, Tiere)|pron|A2|它们都是我的猫。|Tāmen dōu shì wǒ de māo.|Das sind alles meine Katzen.
晚安|wǎn'ān|Gute Nacht|phr|A2|晚安，明天见！|Wǎn'ān, míngtiān jiàn!|Gute Nacht, bis morgen!
姓|xìng|mit Nachnamen heißen; Nachname|v|A2|你好，我姓王。|Nǐ hǎo, wǒ xìng Wáng.|Hallo, mein Nachname ist Wang.
姓名|xìngmíng|voller Name|n|A2|请写下你的姓名。|Qǐng xiěxià nǐ de xìngmíng.|Bitte schreib deinen vollen Namen auf.
有人|yǒurén|jemand; manche Leute|pron|A2|有人在家吗？|Yǒurén zài jiā ma?|Ist jemand zu Hause?
咱|zán|wir (du und ich)|pron|A2|咱现在走吧。|Zán xiànzài zǒu ba.|Lass uns jetzt gehen.
咱们|zánmen|wir (du und ich)|pron|A2|咱们一起去吧。|Zánmen yìqǐ qù ba.|Lass uns zusammen hingehen.
怎么办|zěnmebàn|was tun?; was nun?|phr|A2|现在怎么办？|Xiànzài zěnmebàn?|Was machen wir jetzt?
怎样|zěnyàng|wie|pron|A2|你最近怎样？|Nǐ zuìjìn zěnyàng?|Wie geht es dir in letzter Zeit?
干吗|gànmá|warum; wozu (ugs.)|phr|B1|你干吗不告诉我？|Nǐ gànmá bú gàosu wǒ?|Warum sagst du es mir nicht?
各|gè|jeder; alle|pron|B1|各国都有自己的文化。|Gè guó dōu yǒu zìjǐ de wénhuà.|Jedes Land hat seine eigene Kultur.
各位|gèwèi|alle (Anwesenden)|pron|B1|各位好，欢迎光临！|Gèwèi hǎo, huānyíng guānglín!|Hallo zusammen, herzlich willkommen!
各种|gèzhǒng|alle möglichen; verschiedene|pron|B1|超市里有各种水果。|Chāoshì li yǒu gèzhǒng shuǐguǒ.|Im Supermarkt gibt es alle möglichen Früchte.
各自|gèzì|jeder für sich|pron|B1|下课后我们各自回家。|Xiàkè hòu wǒmen gèzì huí jiā.|Nach dem Unterricht geht jeder für sich nach Hause.
每|měi|jeder; jede; jedes|pron|B1|我每天都喝咖啡。|Wǒ měi tiān dōu hē kāfēi.|Ich trinke jeden Tag Kaffee.
某|mǒu|irgendein; ein gewisser|pron|B1|某些人不同意。|Mǒuxiē rén bù tóngyì.|Manche Leute sind nicht einverstanden.
能不能|néng bu néng|können oder nicht; könntest du|phr|B1|你能不能帮我一下？|Nǐ néng bu néng bāng wǒ yíxià?|Könntest du mir mal kurz helfen?
任何|rènhé|jeder; irgendein|pron|B1|我没有任何问题。|Wǒ méiyǒu rènhé wèntí.|Ich habe überhaupt keine Fragen.
如何|rúhé|wie|pron|B1|你最近过得如何？|Nǐ zuìjìn guò de rúhé?|Wie geht es dir in letzter Zeit?
握手|wòshǒu|die Hand geben|v|B1|他们见面时握手。|Tāmen jiànmiàn shí wòshǒu.|Sie geben sich bei der Begrüßung die Hand.
一切|yíqiè|alles|pron|B1|一切都很好。|Yíqiè dōu hěn hǎo.|Alles ist gut.
祝|zhù|wünschen|v|B1|祝你生日快乐！|Zhù nǐ shēngrì kuàilè!|Alles Gute zum Geburtstag!
自身|zìshēn|selbst; eigen|pron|B1|我们要提高自身的能力。|Wǒmen yào tígāo zìshēn de nénglì.|Wir müssen unsere eigenen Fähigkeiten verbessern.
打招呼|dǎ zhāohu|grüßen|v|B1|他笑着跟我打招呼。|Tā xiàozhe gēn wǒ dǎ zhāohu.|Er grüßte mich lächelnd.
祝贺|zhùhè|gratulieren|v|B1|祝贺你考上大学！|Zhùhè nǐ kǎoshàng dàxué!|Glückwunsch zur bestandenen Uni-Aufnahmeprüfung!
道歉|dàoqiàn|sich entschuldigen|v|B1|你应该向他道歉。|Nǐ yīnggāi xiàng tā dàoqiàn.|Du solltest dich bei ihm entschuldigen.
`,

  people: `
工人|gōngrén|Arbeiter/in|n|A1|我爸爸是工人。|Wǒ bàba shì gōngrén.|Mein Vater ist Arbeiter.
老人|lǎorén|alter Mensch; Senior/in|n|A1|那位老人是我爷爷。|Nà wèi lǎorén shì wǒ yéye.|Der alte Herr dort ist mein Opa.
奶奶|nǎinai|Oma (väterlicherseits)|n|A1|我奶奶今年七十岁。|Wǒ nǎinai jīnnián qīshí suì.|Meine Oma ist dieses Jahr siebzig.
男|nán|männlich|adj|A1|那个男的是谁？|Nàge nán de shì shéi?|Wer ist der Mann da?
男孩儿|nánháir|Junge|n|A1|那个男孩儿是我弟弟。|Nàge nánháir shì wǒ dìdi.|Der Junge dort ist mein kleiner Bruder.
男人|nánrén|Mann|n|A1|那个男人很高。|Nàge nánrén hěn gāo.|Der Mann dort ist sehr groß.
男生|nánshēng|Schüler; Student (männlich)|n|A1|我们班有十个男生。|Wǒmen bān yǒu shí gè nánshēng.|In unserer Klasse sind zehn Jungen.
女孩儿|nǚháir|Mädchen|n|A1|这个女孩儿很可爱。|Zhège nǚháir hěn kě'ài.|Dieses Mädchen ist sehr süß.
女人|nǚrén|Frau|n|A1|那个女人是我们老师。|Nàge nǚrén shì wǒmen lǎoshī.|Die Frau dort ist unsere Lehrerin.
女生|nǚshēng|Schülerin; Studentin|n|A1|我们班女生很多。|Wǒmen bān nǚshēng hěn duō.|In unserer Klasse sind viele Mädchen.
小孩儿|xiǎoháir|Kind|n|A1|这个小孩儿真可爱。|Zhège xiǎoháir zhēn kě'ài.|Dieses Kind ist wirklich süß.
小姐|xiǎojiě|Fräulein; junge Dame|n|A1|王小姐，您好！|Wáng xiǎojiě, nín hǎo!|Guten Tag, Frau Wang!
小朋友|xiǎopéngyou|Kind; Kinder (Anrede)|n|A1|小朋友，你几岁了？|Xiǎopéngyou, nǐ jǐ suì le?|Na, Kleiner, wie alt bist du?
爷爷|yéye|Opa (väterlicherseits)|n|A1|我爷爷喜欢喝茶。|Wǒ yéye xǐhuan hē chá.|Mein Opa trinkt gern Tee.
爱人|àiren|Ehepartner/in|n|A2|这是我爱人。|Zhè shì wǒ àiren.|Das ist mein Mann / meine Frau.
出生|chūshēng|geboren werden|v|A2|我出生在北京。|Wǒ chūshēng zài Běijīng.|Ich bin in Peking geboren.
大人|dàren|Erwachsene/r|n|A2|这是大人的事。|Zhè shì dàren de shì.|Das ist Sache der Erwachsenen.
好人|hǎorén|guter Mensch|n|A2|他是个好人。|Tā shì gè hǎorén.|Er ist ein guter Mensch.
画家|huàjiā|Maler/in|n|A2|她是一位画家。|Tā shì yí wèi huàjiā.|Sie ist Malerin.
坏人|huàirén|böser Mensch; Bösewicht|n|A2|他不是坏人。|Tā bú shì huàirén.|Er ist kein schlechter Mensch.
家庭|jiātíng|Familie; Haushalt|n|A2|他有一个幸福的家庭。|Tā yǒu yí gè xìngfú de jiātíng.|Er hat eine glückliche Familie.
家长|jiāzhǎng|Eltern; Erziehungsberechtigte|n|A2|明天学校开家长会。|Míngtiān xuéxiào kāi jiāzhǎnghuì.|Morgen ist Elternabend in der Schule.
交朋友|jiāopéngyou|Freundschaft schließen|phr|A2|他很喜欢交朋友。|Tā hěn xǐhuan jiāo péngyou.|Er schließt sehr gern Freundschaften.
教师|jiàoshī|Lehrer/in; Lehrkraft|n|A2|我妈妈是一名教师。|Wǒ māma shì yì míng jiàoshī.|Meine Mutter ist Lehrerin.
客人|kèrén|Gast|n|A2|今天家里有客人。|Jīntiān jiā lǐ yǒu kèrén.|Heute haben wir Gäste zu Hause.
老年|lǎonián|hohes Alter; Lebensabend|n|A2|老年生活也可以很快乐。|Lǎonián shēnghuó yě kěyǐ hěn kuàilè.|Auch das Leben im Alter kann sehr glücklich sein.
老朋友|lǎopéngyou|alter Freund; alte Freundin|n|A2|我们是老朋友了。|Wǒmen shì lǎopéngyou le.|Wir sind alte Freunde.
青年|qīngnián|junger Mensch; Jugend|n|A2|他是一个好青年。|Tā shì yí gè hǎo qīngnián.|Er ist ein guter junger Mann.
青少年|qīngshàonián|Jugendliche; Teenager|n|A2|青少年都喜欢上网。|Qīngshàonián dōu xǐhuan shàngwǎng.|Jugendliche sind alle gern im Internet.
全家|quánjiā|die ganze Familie|n|A2|我们全家都很好。|Wǒmen quánjiā dōu hěn hǎo.|Unserer ganzen Familie geht es gut.
人们|rénmen|die Leute; Menschen|n|A2|人们都喜欢他。|Rénmen dōu xǐhuan tā.|Die Leute mögen ihn alle.
商人|shāngrén|Geschäftsmann; Kaufmann|n|A2|他爸爸是商人。|Tā bàba shì shāngrén.|Sein Vater ist Geschäftsmann.
少年|shàonián|Junge; Jugendlicher|n|A2|他是个十五岁的少年。|Tā shì gè shíwǔ suì de shàonián.|Er ist ein fünfzehnjähriger Junge.
生|shēng|gebären; geboren werden|v|A2|她生了一个女儿。|Tā shēng le yí gè nǚ'ér.|Sie hat eine Tochter bekommen.
市长|shìzhǎng|Bürgermeister/in|n|A2|他是我们的市长。|Tā shì wǒmen de shìzhǎng.|Er ist unser Bürgermeister.
司机|sījī|Fahrer/in|n|A2|我爸爸是司机。|Wǒ bàba shì sījī.|Mein Vater ist Fahrer.
太太|tàitai|Ehefrau; Frau (Anrede)|n|A2|这是我太太。|Zhè shì wǒ tàitai.|Das ist meine Frau.
校长|xiàozhǎng|Schulleiter/in; Rektor/in|n|A2|校长今天不在学校。|Xiàozhǎng jīntiān bú zài xuéxiào.|Der Schulleiter ist heute nicht in der Schule.
长大|zhǎngdà|aufwachsen; groß werden|v|A2|孩子长大了。|Háizi zhǎngdà le.|Das Kind ist groß geworden.
照顾|zhàogù|sich kümmern um|v|A2|我要照顾妈妈。|Wǒ yào zhàogù māma.|Ich muss mich um meine Mutter kümmern.
中年|zhōngnián|mittleres Alter|n|A2|他已经是中年人了。|Tā yǐjīng shì zhōngnián rén le.|Er ist schon im mittleren Alter.
主人|zhǔrén|Gastgeber/in; Besitzer/in|n|A2|这只狗的主人是谁？|Zhè zhī gǒu de zhǔrén shì shéi?|Wem gehört dieser Hund?
作家|zuòjiā|Schriftsteller/in|n|A2|她是有名的作家。|Tā shì yǒumíng de zuòjiā.|Sie ist eine bekannte Schriftstellerin.
丈夫|zhàngfu|Ehemann|n|A2|我丈夫是医生。|Wǒ zhàngfu shì yīshēng.|Mein Mann ist Arzt.
妻子|qīzi|Ehefrau|n|A2|他妻子是老师。|Tā qīzi shì lǎoshī.|Seine Frau ist Lehrerin.
叔叔|shūshu|Onkel (jüngerer Bruder des Vaters)|n|A2|我叔叔住在上海。|Wǒ shūshu zhù zài Shànghǎi.|Mein Onkel wohnt in Shanghai.
阿姨|āyí|Tante|n|A2|阿姨，您好！|Āyí, nín hǎo!|Guten Tag, Tante!
保安|bǎo'ān|Wachmann; Sicherheitspersonal|n|B1|门口有两个保安。|Ménkǒu yǒu liǎng gè bǎo'ān.|Am Eingang stehen zwei Wachleute.
吵架|chǎojià|sich streiten|v|B1|他们又吵架了。|Tāmen yòu chǎojià le.|Sie haben sich schon wieder gestritten.
成员|chéngyuán|Mitglied|n|B1|我们队有五个成员。|Wǒmen duì yǒu wǔ gè chéngyuán.|Unser Team hat fünf Mitglieder.
成长|chéngzhǎng|heranwachsen; sich entwickeln|v|B1|孩子成长得很快。|Háizi chéngzhǎng de hěn kuài.|Kinder wachsen sehr schnell heran.
对待|duìdài|behandeln; umgehen mit|v|B1|他对待朋友很好。|Tā duìdài péngyou hěn hǎo.|Er behandelt seine Freunde sehr gut.
对方|duìfāng|Gegenüber; die andere Seite|n|B1|你要多听对方的想法。|Nǐ yào duō tīng duìfāng de xiǎngfǎ.|Du solltest mehr auf die Meinung des anderen hören.
对象|duìxiàng|Partner/in; Zielperson|n|B1|他还没有对象。|Tā hái méiyǒu duìxiàng.|Er hat noch keine Partnerin.
父亲|fùqīn|Vater|n|B1|我父亲是医生。|Wǒ fùqīn shì yīshēng.|Mein Vater ist Arzt.
工程师|gōngchéngshī|Ingenieur/in|n|B1|我哥哥是工程师。|Wǒ gēge shì gōngchéngshī.|Mein älterer Bruder ist Ingenieur.
公务员|gōngwùyuán|Beamter; Beamtin|n|B1|她想当公务员。|Tā xiǎng dāng gōngwùyuán.|Sie möchte Beamtin werden.
姑娘|gūniang|Mädchen; junge Frau|n|B1|那个姑娘很漂亮。|Nàge gūniang hěn piàoliang.|Das Mädchen dort ist sehr hübsch.
华人|huárén|Chinese/in (ethnisch, v. a. im Ausland)|n|B1|这里住着很多华人。|Zhèlǐ zhùzhe hěn duō huárén.|Hier leben viele Chinesen.
记者|jìzhě|Journalist/in|n|B1|她是一名记者。|Tā shì yì míng jìzhě.|Sie ist Journalistin.
家属|jiāshǔ|Familienangehörige|n|B1|病人家属在外面等。|Bìngrén jiāshǔ zài wàimiàn děng.|Die Angehörigen des Patienten warten draußen.
交警|jiāojǐng|Verkehrspolizist/in|n|B1|路口有一个交警。|Lùkǒu yǒu yí ge jiāojǐng.|An der Kreuzung steht ein Verkehrspolizist.
交往|jiāowǎng|Umgang haben; verkehren|v|B1|我喜欢和他交往。|Wǒ xǐhuan hé tā jiāowǎng.|Ich habe gern mit ihm zu tun.
结婚|jiéhūn|heiraten|v|B1|他们下个月结婚。|Tāmen xià ge yuè jiéhūn.|Sie heiraten nächsten Monat.
警察|jǐngchá|Polizist/in; Polizei|n|B1|有问题可以找警察。|Yǒu wèntí kěyǐ zhǎo jǐngchá.|Bei Problemen kann man sich an die Polizei wenden.
老百姓|lǎobǎixìng|einfache Leute; Volk|n|B1|老百姓的生活更好了。|Lǎobǎixìng de shēnghuó gèng hǎo le.|Das Leben der einfachen Leute ist besser geworden.
老太太|lǎotàitai|alte Dame|n|B1|那位老太太八十岁了。|Nà wèi lǎotàitai bāshí suì le.|Die alte Dame dort ist achtzig Jahre alt.
老头儿|lǎotóur|alter Mann (ugs.)|n|B1|那个老头儿每天散步。|Nàge lǎotóur měi tiān sànbù.|Der alte Mann dort geht jeden Tag spazieren.
离婚|líhūn|sich scheiden lassen|v|B1|他们去年离婚了。|Tāmen qùnián líhūn le.|Sie haben sich letztes Jahr scheiden lassen.
母亲|mǔqīn|Mutter|n|B1|我母亲是老师。|Wǒ mǔqīn shì lǎoshī.|Meine Mutter ist Lehrerin.
男子|nánzǐ|Mann; Herren-|n|B1|那名男子是谁？|Nà míng nánzǐ shì shéi?|Wer ist dieser Mann?
年纪|niánjì|Alter|n|B1|你爷爷多大年纪了？|Nǐ yéye duō dà niánjì le?|Wie alt ist dein Großvater?
农民|nóngmín|Bauer; Landwirt|n|B1|我爷爷是农民。|Wǒ yéye shì nóngmín.|Mein Großvater ist Bauer.
女子|nǚzǐ|Frau; Damen-|n|B1|她参加女子比赛。|Tā cānjiā nǚzǐ bǐsài.|Sie nimmt am Damenwettkampf teil.
亲|qīn|leiblich; eng verwandt|adj|B1|他是我的亲哥哥。|Tā shì wǒ de qīn gēge.|Er ist mein leiblicher älterer Bruder.
亲人|qīnrén|Angehörige; nahe Verwandte|n|B1|我的亲人都在国外。|Wǒ de qīnrén dōu zài guówài.|Meine Angehörigen sind alle im Ausland.
人群|rénqún|Menschenmenge|n|B1|他在人群里找不到妈妈。|Tā zài rénqún lǐ zhǎo bu dào māma.|Er findet seine Mutter in der Menschenmenge nicht.
熟人|shúrén|Bekannte/r|n|B1|我在这儿没有熟人。|Wǒ zài zhèr méiyǒu shúrén.|Ich kenne hier niemanden.
性别|xìngbié|Geschlecht|n|B1|请在这儿写性别。|Qǐng zài zhèr xiě xìngbié.|Bitte hier das Geschlecht eintragen.
演员|yǎnyuán|Schauspieler/in|n|B1|她是有名的演员。|Tā shì yǒumíng de yǎnyuán.|Sie ist eine berühmte Schauspielerin.
员|yuán|Mitglied; Angestellter (Suffix)|n|B1|他是一名服务员。|Tā shì yì míng fúwùyuán.|Er ist Kellner.
者|zhě|Person, die … (Suffix)|n|B1|他是一名记者。|Tā shì yì míng jìzhě.|Er ist Journalist.
志愿者|zhìyuànzhě|Freiwillige/r|n|B1|我想当志愿者。|Wǒ xiǎng dāng zhìyuànzhě.|Ich möchte Freiwilliger werden.
专家|zhuānjiā|Experte; Expertin|n|B1|他是电脑专家。|Tā shì diànnǎo zhuānjiā.|Er ist Computerexperte.
子女|zǐnǚ|Kinder (Söhne und Töchter)|n|B1|他们有两个子女。|Tāmen yǒu liǎng ge zǐnǚ.|Sie haben zwei Kinder.
作者|zuòzhě|Autor/in|n|B1|这本书的作者是谁？|Zhè běn shū de zuòzhě shì shéi?|Wer ist der Autor dieses Buches?
做客|zuòkè|zu Gast sein|v|B1|欢迎来我家做客。|Huānyíng lái wǒ jiā zuòkè.|Komm mich gern zu Hause besuchen.
亲戚|qīnqi|Verwandte/r|n|B1|春节我们去看亲戚。|Chūnjié wǒmen qù kàn qīnqi.|Zum Frühlingsfest besuchen wir Verwandte.
儿童|értóng|Kinder|n|B1|这是儿童看的书。|Zhè shì értóng kàn de shū.|Das ist ein Buch für Kinder.
友谊|yǒuyì|Freundschaft|n|B1|我们的友谊很深。|Wǒmen de yǒuyì hěn shēn.|Unsere Freundschaft ist sehr tief.
售货员|shòuhuòyuán|Verkäufer/in|n|B1|那个售货员很热情。|Nàge shòuhuòyuán hěn rèqíng.|Die Verkäuferin dort ist sehr freundlich.
孙子|sūnzi|Enkel (Sohn des Sohnes)|n|B1|爷爷很爱他的孙子。|Yéye hěn ài tā de sūnzi.|Der Opa liebt seinen Enkel sehr.
小伙子|xiǎohuǒzi|junger Mann|n|B1|这个小伙子很帅。|Zhège xiǎohuǒzi hěn shuài.|Dieser junge Mann sieht gut aus.
师傅|shīfu|Meister; Anrede für Fahrer/Handwerker|n|B1|师傅，我要去火车站。|Shīfu, wǒ yào qù huǒchēzhàn.|Fahrer, ich möchte zum Bahnhof.
年龄|niánlíng|Alter|n|B1|她的年龄比我大。|Tā de niánlíng bǐ wǒ dà.|Sie ist älter als ich.
律师|lǜshī|Anwalt/Anwältin|n|B1|他爸爸是律师。|Tā bàba shì lǜshī.|Sein Vater ist Anwalt.
护士|hùshi|Krankenpfleger/in|n|B1|我姐姐是护士。|Wǒ jiějie shì hùshi.|Meine große Schwester ist Krankenschwester.
教授|jiàoshòu|Professor/in|n|B1|王教授今天不在。|Wáng jiàoshòu jīntiān bú zài.|Professor Wang ist heute nicht da.
邀请|yāoqǐng|einladen|v|B1|谢谢你邀请我。|Xièxie nǐ yāoqǐng wǒ.|Danke, dass du mich eingeladen hast.
`,

  numbers: `
第|dì|(Präfix für Ordnungszahlen)|num|A1|这是我第一次来。|Zhè shì wǒ dì yī cì lái.|Ich bin zum ersten Mal hier.
间|jiān|Zählwort für Zimmer|mw|A1|这间房间很大。|Zhè jiān fángjiān hěn dà.|Dieses Zimmer ist sehr groß.
口|kǒu|Mund; Zählwort für Familienmitglieder|mw|A1|你家有几口人？|Nǐ jiā yǒu jǐ kǒu rén?|Wie viele Personen seid ihr in der Familie?
岁|suì|Jahre alt|mw|A1|我儿子今年五岁。|Wǒ érzi jīnnián wǔ suì.|Mein Sohn ist dieses Jahr fünf.
一半|yíbàn|Hälfte|num|A1|我只吃了一半。|Wǒ zhǐ chī le yíbàn.|Ich habe nur die Hälfte gegessen.
遍|biàn|Mal (Durchgang)|mw|A2|请再说一遍。|Qǐng zài shuō yí biàn.|Bitte sag es noch einmal.
不少|bùshǎo|nicht wenige; ziemlich viele|adj|A2|今天来了不少人。|Jīntiān lái le bùshǎo rén.|Heute sind ziemlich viele Leute gekommen.
部分|bùfen|Teil|n|A2|这只是一部分。|Zhè zhǐ shì yí bùfen.|Das ist nur ein Teil.
层|céng|Stockwerk; Schicht (Zählwort)|mw|A2|我家住在五层。|Wǒ jiā zhù zài wǔ céng.|Wir wohnen im fünften Stock.
场|chǎng|Zählwort für Veranstaltungen, Spiele|mw|A2|我们看了一场电影。|Wǒmen kàn le yì chǎng diànyǐng.|Wir haben uns einen Film angesehen.
大部分|dàbùfen|der größte Teil; die meisten|n|A2|大部分人都同意。|Dàbùfen rén dōu tóngyì.|Die meisten Leute sind einverstanden.
大多数|dàduōshù|die große Mehrheit|n|A2|大多数学生都来了。|Dàduōshù xuésheng dōu lái le.|Die allermeisten Schüler sind gekommen.
大量|dàliàng|in großer Menge; sehr viel|adj|A2|他读了大量的书。|Tā dú le dàliàng de shū.|Er hat eine große Menge Bücher gelesen.
道|dào|Zählwort für Aufgaben, Gerichte|mw|A2|这道题我不会做。|Zhè dào tí wǒ bú huì zuò.|Diese Aufgabe kann ich nicht lösen.
等于|děngyú|gleich sein; ergeben|v|A2|二加三等于五。|Èr jiā sān děngyú wǔ.|Zwei plus drei ist gleich fünf.
段|duàn|Abschnitt; Stück (Zählwort)|mw|A2|请读一下这段话。|Qǐng dú yíxià zhè duàn huà.|Bitte lies diesen Abschnitt einmal vor.
多数|duōshù|Mehrheit|n|A2|多数人都不知道。|Duōshù rén dōu bù zhīdào.|Die meisten Leute wissen es nicht.
封|fēng|Zählwort für Briefe|mw|A2|我收到了一封信。|Wǒ shōudào le yì fēng xìn.|Ich habe einen Brief bekommen.
公斤|gōngjīn|Kilogramm|mw|A2|我买了两公斤苹果。|Wǒ mǎi le liǎng gōngjīn píngguǒ.|Ich habe zwei Kilo Äpfel gekauft.
公里|gōnglǐ|Kilometer|mw|A2|我每天跑五公里。|Wǒ měi tiān pǎo wǔ gōnglǐ.|Ich laufe jeden Tag fünf Kilometer.
好多|hǎoduō|sehr viele|num|A2|我有好多问题。|Wǒ yǒu hǎoduō wèntí.|Ich habe sehr viele Fragen.
节|jié|Zählwort für Unterrichtsstunden|mw|A2|我今天有四节课。|Wǒ jīntiān yǒu sì jié kè.|Ich habe heute vier Unterrichtsstunden.
斤|jīn|Jin (500 Gramm; Pfund)|mw|A2|苹果多少钱一斤?|Píngguǒ duōshao qián yì jīn?|Was kostet ein Pfund Äpfel?
句|jù|Satz (Zählwort)|mw|A2|我想说一句话。|Wǒ xiǎng shuō yí jù huà.|Ich möchte einen Satz sagen.
克|kè|Gramm|mw|A2|请给我两百克茶。|Qǐng gěi wǒ liǎngbǎi kè chá.|Geben Sie mir bitte zweihundert Gramm Tee.
辆|liàng|Zählwort für Fahrzeuge|mw|A2|我买了一辆新车。|Wǒ mǎi le yí liàng xīn chē.|Ich habe ein neues Auto gekauft.
米|mǐ|Meter; Reis|mw|A2|他身高一米八。|Tā shēngāo yì mǐ bā.|Er ist 1,80 Meter groß.
名|míng|Zählwort für Personen; Name|mw|A2|我们班有二十名学生。|Wǒmen bān yǒu èrshí míng xuésheng.|Unsere Klasse hat zwanzig Schüler.
排|pái|Reihe|mw|A2|我坐在第一排。|Wǒ zuò zài dì yī pái.|Ich sitze in der ersten Reihe.
篇|piān|Zählwort für Texte|mw|A2|我写了一篇文章。|Wǒ xiě le yì piān wénzhāng.|Ich habe einen Artikel geschrieben.
片|piàn|Scheibe; Stück (Zählwort)|mw|A2|我吃了两片面包。|Wǒ chī le liǎng piàn miànbāo.|Ich habe zwei Scheiben Brot gegessen.
瓶|píng|Flasche (Zählwort)|mw|A2|我要一瓶水。|Wǒ yào yì píng shuǐ.|Ich möchte eine Flasche Wasser.
千克|qiānkè|Kilogramm|mw|A2|这个西瓜重五千克。|Zhège xīguā zhòng wǔ qiānkè.|Diese Wassermelone wiegt fünf Kilo.
全部|quánbù|alles; gesamt|n|A2|我全部吃完了。|Wǒ quánbù chīwán le.|Ich habe alles aufgegessen.
人数|rénshù|Personenzahl|n|A2|今天来的人数不多。|Jīntiān lái de rénshù bù duō.|Heute sind nicht viele Leute gekommen.
少数|shǎoshù|Minderheit; wenige|n|A2|只有少数人知道。|Zhǐyǒu shǎoshù rén zhīdào.|Nur wenige Leute wissen es.
数|shǔ|zählen|v|A2|你数一数有多少人。|Nǐ shǔ yi shǔ yǒu duōshao rén.|Zähl mal, wie viele Leute da sind.
数字|shùzì|Zahl; Ziffer|n|A2|请写下这个数字。|Qǐng xiěxià zhège shùzì.|Bitte schreib diese Zahl auf.
算|suàn|rechnen; zählen als|v|A2|你算一下多少钱。|Nǐ suàn yíxià duōshao qián.|Rechne mal aus, wie viel es kostet.
所有|suǒyǒu|alle; sämtliche|adj|A2|所有人都来了。|Suǒyǒu rén dōu lái le.|Alle sind gekommen.
套|tào|Satz; Set (Zählwort)|mw|A2|我买了一套房子。|Wǒ mǎi le yí tào fángzi.|Ich habe eine Wohnung gekauft.
位|wèi|Zählwort für Personen (höflich)|mw|A2|请问，您几位？|Qǐngwèn, nín jǐ wèi?|Wie viele Personen sind Sie, bitte?
许多|xǔduō|viele|num|A2|他有许多朋友。|Tā yǒu xǔduō péngyou.|Er hat viele Freunde.
一部分|yíbùfen|ein Teil|num|A2|我只看了一部分。|Wǒ zhǐ kàn le yíbùfen.|Ich habe nur einen Teil gelesen.
一共|yígòng|insgesamt|adv|A2|一共多少钱？|Yígòng duōshao qián?|Wie viel kostet das insgesamt?
以上|yǐshàng|über; mehr als; ab|n|A2|十八岁以上可以去。|Shíbā suì yǐshàng kěyǐ qù.|Ab 18 Jahren darf man hin.
以下|yǐxià|unter; weniger als; folgend|n|A2|六岁以下不用买票。|Liù suì yǐxià búyòng mǎi piào.|Unter sechs Jahren braucht man kein Ticket.
一点点|yìdiǎndiǎn|ein kleines bisschen|num|A2|我只会说一点点中文。|Wǒ zhǐ huì shuō yìdiǎndiǎn Zhōngwén.|Ich spreche nur ein kleines bisschen Chinesisch.
亿|yì|hundert Millionen|num|A2|中国有十四亿人。|Zhōngguó yǒu shísì yì rén.|China hat 1,4 Milliarden Einwohner.
座|zuò|Zählwort für Berge, Gebäude|mw|A2|那儿有一座山。|Nàr yǒu yí zuò shān.|Dort ist ein Berg.
些|xiē|einige; ein paar|mw|A2|我买了些水果。|Wǒ mǎi le xiē shuǐguǒ.|Ich habe etwas Obst gekauft.
大约|dàyuē|ungefähr; etwa|adv|B1|大约要一个小时。|Dàyuē yào yí gè xiǎoshí.|Es dauert ungefähr eine Stunde.
顿|dùn|Zählwort für Mahlzeiten|mw|B1|我一天吃三顿饭。|Wǒ yì tiān chī sān dùn fàn.|Ich esse drei Mahlzeiten am Tag.
共有|gòngyǒu|insgesamt haben|v|B1|我们班共有三十人。|Wǒmen bān gòngyǒu sānshí rén.|Unsere Klasse hat insgesamt dreißig Leute.
计算|jìsuàn|berechnen; rechnen|v|B1|请计算一下费用。|Qǐng jìsuàn yíxià fèiyong.|Bitte berechne mal die Kosten.
架|jià|Zählwort für Flugzeuge/Maschinen|mw|B1|天上有一架飞机。|Tiānshàng yǒu yí jià fēijī.|Am Himmel ist ein Flugzeug.
将近|jiāngjìn|fast; knapp|adv|B1|我等了将近一个小时。|Wǒ děng le jiāngjìn yí ge xiǎoshí.|Ich habe fast eine Stunde gewartet.
类|lèi|Art; Sorte|mw|B1|我喜欢看这类电影。|Wǒ xǐhuan kàn zhè lèi diànyǐng.|Ich schaue gern diese Art von Filmen.
束|shù|Strauß; Bündel (Zählwort)|mw|B1|他送了我一束花。|Tā sòng le wǒ yí shù huā.|Er hat mir einen Blumenstrauß geschenkt.
数量|shùliàng|Anzahl; Menge|n|B1|学生的数量增加了。|Xuésheng de shùliàng zēngjiā le.|Die Zahl der Schüler ist gestiegen.
所|suǒ|Zählwort für Gebäude/Institutionen|mw|B1|这是一所很好的大学。|Zhè shì yì suǒ hěn hǎo de dàxué.|Das ist eine sehr gute Universität.
台|tái|Zählwort für Geräte|mw|B1|我买了一台新电脑。|Wǒ mǎi le yì tái xīn diànnǎo.|Ich habe einen neuen Computer gekauft.
有的是|yǒudeshì|mehr als genug haben|phr|B1|别着急，我们有的是时间。|Bié zháojí, wǒmen yǒudeshì shíjiān.|Keine Eile, wir haben mehr als genug Zeit.
整整|zhěngzhěng|ganze; volle|adv|B1|我等了整整两个小时。|Wǒ děng le zhěngzhěng liǎng ge xiǎoshí.|Ich habe ganze zwei Stunden gewartet.
支|zhī|Zählwort für Stifte, Lieder|mw|B1|我买了两支笔。|Wǒ mǎi le liǎng zhī bǐ.|Ich habe zwei Stifte gekauft.
种|zhǒng|Art; Sorte (Zählwort)|mw|B1|这种水果很好吃。|Zhè zhǒng shuǐguǒ hěn hǎochī.|Diese Obstsorte schmeckt sehr gut.
左右|zuǒyòu|ungefähr; etwa|adv|B1|他三十岁左右。|Tā sānshí suì zuǒyòu.|Er ist ungefähr dreißig Jahre alt.
俩|liǎ|zwei; beide (ugs.)|num|B1|我们俩是同学。|Wǒmen liǎ shì tóngxué.|Wir beide sind Klassenkameraden.
倍|bèi|-fach; Mal|mw|B1|这里的房价贵了一倍。|Zhèlǐ de fángjià guì le yí bèi.|Die Wohnungspreise hier haben sich verdoppelt.
号码|hàomǎ|Nummer|n|B1|你的电话号码是多少？|Nǐ de diànhuà hàomǎ shì duōshao?|Wie lautet deine Telefonnummer?
棵|kē|Zählwort für Bäume/Pflanzen|mw|B1|门口有一棵大树。|Ménkǒu yǒu yì kē dà shù.|Vor der Tür steht ein großer Baum.
百分之|bǎifēnzhī|Prozent (vor der Zahl)|num|B1|百分之八十的人同意。|Bǎifēnzhī bāshí de rén tóngyì.|Achtzig Prozent der Leute stimmen zu.
趟|tàng|Zählwort für Fahrten/Gänge|mw|B1|我要去一趟银行。|Wǒ yào qù yí tàng yínháng.|Ich muss mal kurz zur Bank.
`,

  time: `
白天|báitiān|tagsüber; Tag|n|A1|我白天上班。|Wǒ báitiān shàngbān.|Ich arbeite tagsüber.
半年|bànnián|halbes Jahr|n|A1|我学了半年中文。|Wǒ xué le bànnián Zhōngwén.|Ich habe ein halbes Jahr Chinesisch gelernt.
半天|bàntiān|halber Tag; lange Zeit|n|A1|我等了你半天。|Wǒ děng le nǐ bàntiān.|Ich habe ewig auf dich gewartet.
常|cháng|oft|adv|A1|他常来这儿。|Tā cháng lái zhèr.|Er kommt oft hierher.
常常|chángcháng|oft; häufig|adv|A1|我常常去公园。|Wǒ chángcháng qù gōngyuán.|Ich gehe oft in den Park.
分|fēn|Minute; Punkt|mw|A1|现在三点十分。|Xiànzài sān diǎn shí fēn.|Es ist jetzt zehn nach drei.
后天|hòutiān|übermorgen|n|A1|我后天去上海。|Wǒ hòutiān qù Shànghǎi.|Ich fahre übermorgen nach Shanghai.
前天|qiántiān|vorgestern|n|A1|我前天见过他。|Wǒ qiántiān jiànguo tā.|Ich habe ihn vorgestern getroffen.
日|rì|Tag (im Datum)|n|A1|今天是五月一日。|Jīntiān shì wǔ yuè yī rì.|Heute ist der 1. Mai.
日期|rìqī|Datum|n|A1|请写上今天的日期。|Qǐng xiěshang jīntiān de rìqī.|Bitte schreib das heutige Datum dazu.
上次|shàngcì|letztes Mal|n|A1|上次我们见过面。|Shàngcì wǒmen jiànguo miàn.|Wir haben uns letztes Mal schon getroffen.
下次|xiàcì|nächstes Mal|n|A1|下次再来玩吧！|Xiàcì zài lái wán ba!|Komm nächstes Mal wieder vorbei!
新年|xīnnián|Neujahr|n|A1|新年快乐！|Xīnnián kuàilè!|Frohes neues Jahr!
星期日|xīngqīrì|Sonntag|n|A1|星期日我不上班。|Xīngqīrì wǒ bú shàngbān.|Sonntags arbeite ich nicht.
星期天|xīngqītiān|Sonntag|n|A1|星期天你有空吗？|Xīngqītiān nǐ yǒu kòng ma?|Hast du am Sonntag Zeit?
最后|zuìhòu|zuletzt; schließlich|adv|A1|最后我们都回家了。|Zuìhòu wǒmen dōu huí jiā le.|Am Ende sind wir alle nach Hause gegangen.
半夜|bànyè|Mitternacht; mitten in der Nacht|n|A2|他半夜才回家。|Tā bànyè cái huí jiā.|Er kam erst mitten in der Nacht nach Hause.
不久|bùjiǔ|bald; vor Kurzem|adv|A2|他不久就要回国了。|Tā bùjiǔ jiù yào huíguó le.|Er kehrt bald in sein Heimatland zurück.
不一会儿|bùyíhuìr|kurz darauf; im Nu|adv|A2|不一会儿他就回来了。|Bù yíhuìr tā jiù huílai le.|Kurz darauf war er schon wieder zurück.
从小|cóngxiǎo|von klein auf|adv|A2|我从小就喜欢画画儿。|Wǒ cóngxiǎo jiù xǐhuan huà huàr.|Ich male schon von klein auf gern.
当时|dāngshí|damals; zu der Zeit|n|A2|当时我不在家。|Dāngshí wǒ bú zài jiā.|Damals war ich nicht zu Hause.
多久|duōjiǔ|wie lange|pron|A2|你学了多久中文?|Nǐ xué le duōjiǔ Zhōngwén?|Wie lange lernst du schon Chinesisch?
刚|gāng|gerade (eben)|adv|A2|我刚到家。|Wǒ gāng dào jiā.|Ich bin gerade nach Hause gekommen.
刚刚|gānggāng|gerade eben|adv|A2|他刚刚出去。|Tā gānggāng chūqu.|Er ist gerade eben hinausgegangen.
好久|hǎojiǔ|lange (Zeit)|adv|A2|好久不见!|Hǎojiǔ bú jiàn!|Lange nicht gesehen!
假期|jiàqī|Ferien; Urlaub|n|A2|假期你打算去哪儿?|Jiàqī nǐ dǎsuàn qù nǎr?|Wohin willst du in den Ferien fahren?
今后|jīnhòu|von nun an; künftig|n|A2|今后我会更努力。|Jīnhòu wǒ huì gèng nǔlì.|Von nun an werde ich mich mehr anstrengen.
就要|jiùyào|gleich; bald|adv|A2|火车就要开了。|Huǒchē jiùyào kāi le.|Der Zug fährt gleich ab.
刻|kè|Viertelstunde|mw|A2|现在三点一刻。|Xiànzài sān diǎn yí kè.|Es ist jetzt Viertel nach drei.
快要|kuàiyào|bald; gleich|adv|A2|快要下雨了。|Kuàiyào xià yǔ le.|Es regnet gleich.
老是|lǎoshì|immer; ständig|adv|A2|他老是迟到。|Tā lǎoshì chídào.|Er kommt ständig zu spät.
那会儿|nàhuìr|damals; zu der Zeit|n|A2|那会儿我还很小。|Nàhuìr wǒ hái hěn xiǎo.|Damals war ich noch sehr klein.
那时候|nàshíhou|damals; zu jener Zeit|n|A2|那时候我在北京。|Nàshíhou wǒ zài Běijīng.|Damals war ich in Peking.
平常|píngcháng|normalerweise; gewöhnlich|adv|A2|我平常七点起床。|Wǒ píngcháng qī diǎn qǐchuáng.|Ich stehe normalerweise um sieben Uhr auf.
前年|qiánnián|vorletztes Jahr|n|A2|我前年去过中国。|Wǒ qiánnián qùguo Zhōngguó.|Ich war vorletztes Jahr in China.
全年|quánnián|das ganze Jahr|n|A2|这里全年都很热。|Zhèlǐ quánnián dōu hěn rè.|Hier ist es das ganze Jahr über heiß.
日子|rìzi|Tag; Tage; Leben|n|A2|今天是个好日子。|Jīntiān shì gè hǎo rìzi.|Heute ist ein guter Tag.
上周|shàngzhōu|letzte Woche|n|A2|我上周很忙。|Wǒ shàngzhōu hěn máng.|Ich hatte letzte Woche viel zu tun.
同时|tóngshí|gleichzeitig; zur selben Zeit|adv|A2|我们同时到了。|Wǒmen tóngshí dào le.|Wir sind gleichzeitig angekommen.
下周|xiàzhōu|nächste Woche|n|A2|我们下周见。|Wǒmen xiàzhōu jiàn.|Wir sehen uns nächste Woche.
小时候|xiǎoshíhou|in der Kindheit; als Kind|n|A2|我小时候住在这儿。|Wǒ xiǎoshíhou zhù zài zhèr.|Als Kind habe ich hier gewohnt.
夜|yè|Nacht|n|A2|我一夜没睡。|Wǒ yí yè méi shuì.|Ich habe die ganze Nacht nicht geschlafen.
夜里|yèli|nachts; in der Nacht|n|A2|夜里外面很冷。|Yèli wàimiàn hěn lěng.|Nachts ist es draußen sehr kalt.
一生|yìshēng|das ganze Leben|n|A2|他一生都住在这里。|Tā yìshēng dōu zhù zài zhèlǐ.|Er hat sein ganzes Leben hier gewohnt.
永远|yǒngyuǎn|für immer; immer|adv|A2|我永远爱你。|Wǒ yǒngyuǎn ài nǐ.|Ich liebe dich für immer.
月份|yuèfèn|Monat|n|A2|我们八月份去旅游。|Wǒmen bā yuèfèn qù lǚyóu.|Wir verreisen im August.
早晨|zǎochen|früher Morgen|n|A2|早晨的空气很好。|Zǎochen de kōngqì hěn hǎo.|Am frühen Morgen ist die Luft sehr gut.
早就|zǎojiù|schon längst|adv|A2|我早就知道了。|Wǒ zǎojiù zhīdào le.|Das weiß ich schon längst.
这时候|zhèshíhou|in diesem Moment|phr|A2|这时候他来了。|Zhèshíhou tā lái le.|In diesem Moment kam er.
周|zhōu|Woche|n|A2|我每周跑步三次。|Wǒ měi zhōu pǎobù sān cì.|Ich gehe dreimal pro Woche laufen.
周年|zhōunián|Jahrestag|n|A2|今天是我们结婚十周年。|Jīntiān shì wǒmen jiéhūn shí zhōunián.|Heute ist unser zehnter Hochzeitstag.
曾经|céngjīng|früher einmal|adv|B1|我曾经在北京住过。|Wǒ céngjīng zài Běijīng zhùguo.|Ich habe früher einmal in Peking gewohnt.
长期|chángqī|langfristig; auf lange Zeit|adj|B1|他长期住在国外。|Tā chángqī zhù zài guówài.|Er lebt seit Langem im Ausland.
持续|chíxù|andauern; anhalten|v|B1|大雨持续了三天。|Dàyǔ chíxùle sān tiān.|Der starke Regen hielt drei Tage an.
初|chū|Anfang (eines Zeitraums)|n|B1|我下个月初回国。|Wǒ xià gè yuè chū huíguó.|Ich fahre Anfang nächsten Monats in meine Heimat zurück.
从前|cóngqián|früher; einst|n|B1|从前这里是一个小村子。|Cóngqián zhèlǐ shì yí gè xiǎo cūnzi.|Früher war hier ein kleines Dorf.
当初|dāngchū|damals; anfangs|n|B1|当初我不应该来。|Dāngchū wǒ bù yīnggāi lái.|Ich hätte damals nicht kommen sollen.
定期|dìngqī|regelmäßig|adj|B1|我定期去检查身体。|Wǒ dìngqī qù jiǎnchá shēntǐ.|Ich gehe regelmäßig zur Untersuchung.
短期|duǎnqī|kurzfristig|adj|B1|这是一个短期的工作。|Zhè shì yí gè duǎnqī de gōngzuò.|Das ist ein befristeter Job für kurze Zeit.
工夫|gōngfu|Zeit; Mühe|n|B1|我今天没工夫。|Wǒ jīntiān méi gōngfu.|Ich habe heute keine Zeit.
古代|gǔdài|Altertum; alte Zeit|n|B1|我喜欢中国古代历史。|Wǒ xǐhuan Zhōngguó gǔdài lìshǐ.|Ich mag die Geschichte des alten China.
国庆|guóqìng|Nationalfeiertag|n|B1|国庆放七天假。|Guóqìng fàng qī tiān jià.|Zum Nationalfeiertag gibt es sieben Tage frei.
后年|hòunián|übernächstes Jahr|n|B1|我后年大学毕业。|Wǒ hòunián dàxué bìyè.|Ich schließe übernächstes Jahr die Uni ab.
及时|jíshí|rechtzeitig|adj|B1|你来得很及时。|Nǐ lái de hěn jíshí.|Du kommst genau rechtzeitig.
将来|jiānglái|Zukunft; künftig|n|B1|你将来想做什么？|Nǐ jiānglái xiǎng zuò shénme?|Was möchtest du später einmal machen?
近期|jìnqī|in nächster Zeit; demnächst|n|B1|我近期打算去旅行。|Wǒ jìnqī dǎsuàn qù lǚxíng.|Ich habe vor, demnächst zu verreisen.
久|jiǔ|lange (Zeit)|adj|B1|你等了多久？|Nǐ děng le duō jiǔ?|Wie lange hast du gewartet?
空儿|kòngr|freie Zeit|n|B1|你明天有空儿吗？|Nǐ míngtiān yǒu kòngr ma?|Hast du morgen Zeit?
立刻|lìkè|sofort|adv|B1|我立刻就来。|Wǒ lìkè jiù lái.|Ich komme sofort.
连续|liánxù|ununterbrochen; hintereinander|v|B1|雨连续下了三天。|Yǔ liánxù xià le sān tiān.|Es hat drei Tage hintereinander geregnet.
目前|mùqián|derzeit; momentan|n|B1|目前没有问题。|Mùqián méiyǒu wèntí.|Momentan gibt es keine Probleme.
年初|niánchū|Jahresanfang|n|B1|我年初去了北京。|Wǒ niánchū qù le Běijīng.|Anfang des Jahres war ich in Peking.
年代|niándài|Jahrzehnt; Ära|n|B1|这是八十年代的歌。|Zhè shì bāshí niándài de gē.|Das ist ein Lied aus den Achtzigern.
年底|niándǐ|Jahresende|n|B1|我们年底很忙。|Wǒmen niándǐ hěn máng.|Am Jahresende haben wir viel zu tun.
期|qī|Ausgabe; Phase (Zählwort)|mw|B1|这本杂志我每期都看。|Zhè běn zázhì wǒ měi qī dōu kàn.|Ich lese jede Ausgabe dieser Zeitschrift.
前后|qiánhòu|um ... herum; vorn und hinten|n|B1|春节前后人很多。|Chūnjié qiánhòu rén hěn duō.|Rund um das Frühlingsfest sind viele Leute unterwegs.
时|shí|Zeit; als; wenn|n|B1|我上学时住在北京。|Wǒ shàngxué shí zhù zài Běijīng.|Als ich zur Schule ging, wohnte ich in Peking.
时代|shídài|Zeitalter; Epoche|n|B1|现在是网络时代。|Xiànzài shì wǎngluò shídài.|Jetzt ist das Internetzeitalter.
时刻|shíkè|Moment; Augenblick|n|B1|这是一个重要的时刻。|Zhè shì yí gè zhòngyào de shíkè.|Das ist ein wichtiger Moment.
世纪|shìjì|Jahrhundert|n|B1|现在是二十一世纪。|Xiànzài shì èrshíyī shìjì.|Wir leben im 21. Jahrhundert.
通常|tōngcháng|normalerweise|adv|B1|我通常七点起床。|Wǒ tōngcháng qī diǎn qǐchuáng.|Ich stehe normalerweise um sieben auf.
往往|wǎngwǎng|oft; meist|adv|B1|他周末往往在家。|Tā zhōumò wǎngwǎng zài jiā.|Am Wochenende ist er meist zu Hause.
以来|yǐlái|seit|n|B1|今年以来，他一直很忙。|Jīnnián yǐlái, tā yìzhí hěn máng.|Seit Jahresbeginn ist er ständig beschäftigt.
早已|zǎoyǐ|längst; schon lange|adv|B1|他早已回家了。|Tā zǎoyǐ huí jiā le.|Er ist längst nach Hause gegangen.
整天|zhěngtiān|den ganzen Tag|adv|B1|他整天玩手机。|Tā zhěngtiān wán shǒujī.|Er ist den ganzen Tag am Handy.
直到|zhídào|bis|prep|B1|我直到十二点才睡。|Wǒ zhídào shí'èr diǎn cái shuì.|Ich bin erst um zwölf schlafen gegangen.
至今|zhìjīn|bis heute|adv|B1|他至今没有回来。|Tā zhìjīn méiyǒu huílai.|Er ist bis heute nicht zurückgekommen.
钟|zhōng|Uhr; Glocke|n|B1|墙上有一个钟。|Qiáng shang yǒu yí ge zhōng.|An der Wand hängt eine Uhr.
自从|zìcóng|seit; seitdem|prep|B1|自从去年，我就没见过他。|Zìcóng qùnián, wǒ jiù méi jiànguo tā.|Seit letztem Jahr habe ich ihn nicht mehr gesehen.
总|zǒng|immer; stets|adv|B1|他总迟到。|Tā zǒng chídào.|Er kommt immer zu spät.
偶尔|ǒu'ěr|gelegentlich|adv|B1|我偶尔去看电影。|Wǒ ǒu'ěr qù kàn diànyǐng.|Ich gehe gelegentlich ins Kino.
底|dǐ|Boden; Ende (Zeitraum)|n|B1|我月底回国。|Wǒ yuèdǐ huí guó.|Ich fahre Ende des Monats in mein Heimatland zurück.
按时|ànshí|pünktlich; rechtzeitig|adv|B1|请按时吃药。|Qǐng ànshí chī yào.|Nimm die Medikamente bitte pünktlich.
暂时|zànshí|vorübergehend; vorerst|adv|B1|我暂时住在朋友家。|Wǒ zànshí zhù zài péngyou jiā.|Ich wohne vorübergehend bei einem Freund.
来不及|láibují|es nicht mehr schaffen; zu spät sein|v|B1|快走，来不及了！|Kuài zǒu, láibují le!|Schnell los, wir schaffen es sonst nicht mehr!
来得及|láidejí|es noch rechtzeitig schaffen|v|B1|别着急，还来得及。|Bié zháojí, hái láidejí.|Keine Eile, wir schaffen es noch.
礼拜天|lǐbàitiān|Sonntag|n|B1|礼拜天我不上班。|Lǐbàitiān wǒ bú shàngbān.|Sonntags arbeite ich nicht.
秒|miǎo|Sekunde|mw|B1|一分钟有六十秒。|Yì fēnzhōng yǒu liùshí miǎo.|Eine Minute hat sechzig Sekunden.
`,

  food: `
包子|bāozi|gefülltes Dampfbrötchen|n|A1|我早上吃了两个包子。|Wǒ zǎoshang chī le liǎng gè bāozi.|Ich habe heute Morgen zwei Baozi gegessen.
吃饭|chīfàn|essen|v|A1|我们一起吃饭吧。|Wǒmen yìqǐ chīfàn ba.|Lass uns zusammen essen.
奶|nǎi|Milch|n|A1|我喝咖啡不加奶。|Wǒ hē kāfēi bù jiā nǎi.|Ich trinke Kaffee ohne Milch.
蛋|dàn|Ei|n|A2|我早上吃了两个蛋。|Wǒ zǎoshang chī le liǎng gè dàn.|Ich habe heute Morgen zwei Eier gegessen.
倒|dào|(ein)gießen; einschenken|v|A2|请给我倒一杯水。|Qǐng gěi wǒ dào yì bēi shuǐ.|Bitte schenk mir ein Glas Wasser ein.
饭馆|fànguǎn|Restaurant|n|A2|这家饭馆的菜很好吃。|Zhè jiā fànguǎn de cài hěn hǎochī.|Das Essen in diesem Restaurant ist sehr lecker.
方便面|fāngbiànmiàn|Instantnudeln|n|A2|我晚上吃了方便面。|Wǒ wǎnshang chī le fāngbiànmiàn.|Ich habe abends Instantnudeln gegessen.
酒|jiǔ|Alkohol; alkoholisches Getränk|n|A2|我不喝酒。|Wǒ bù hē jiǔ.|Ich trinke keinen Alkohol.
快餐|kuàicān|Fast Food; Schnellimbiss|n|A2|我不常吃快餐。|Wǒ bù cháng chī kuàicān.|Ich esse nicht oft Fast Food.
面|miàn|Nudeln; Seite; Fläche|n|A2|我中午想吃面。|Wǒ zhōngwǔ xiǎng chī miàn.|Ich möchte mittags Nudeln essen.
食物|shíwù|Lebensmittel; Nahrung|n|A2|冰箱里没有食物了。|Bīngxiāng li méiyǒu shíwù le.|Im Kühlschrank ist nichts mehr zu essen.
熟|shú|gar; reif; vertraut|adj|A2|肉还没熟。|Ròu hái méi shú.|Das Fleisch ist noch nicht gar.
晚餐|wǎncān|Abendessen|n|A2|今天的晚餐很好吃。|Jīntiān de wǎncān hěn hǎochī.|Das Abendessen heute ist sehr lecker.
碗|wǎn|Schüssel; Schale|n|A2|我吃了两碗米饭。|Wǒ chī le liǎng wǎn mǐfàn.|Ich habe zwei Schalen Reis gegessen.
午餐|wǔcān|Mittagessen|n|A2|我们一起吃午餐吧。|Wǒmen yìqǐ chī wǔcān ba.|Lass uns zusammen zu Mittag essen.
西餐|xīcān|westliches Essen|n|A2|我今天想吃西餐。|Wǒ jīntiān xiǎng chī xīcān.|Ich möchte heute westlich essen.
油|yóu|Öl|n|A2|这个菜油太多了。|Zhège cài yóu tài duō le.|In diesem Gericht ist zu viel Öl.
早餐|zǎocān|Frühstück|n|A2|你早餐吃什么？|Nǐ zǎocān chī shénme?|Was isst du zum Frühstück?
中餐|zhōngcān|chinesisches Essen|n|A2|我喜欢吃中餐。|Wǒ xǐhuan chī zhōngcān.|Ich esse gern chinesisch.
羊肉|yángròu|Lammfleisch|n|A2|我不吃羊肉。|Wǒ bù chī yángròu.|Ich esse kein Lammfleisch.
西瓜|xīguā|Wassermelone|n|A2|夏天我爱吃西瓜。|Xiàtiān wǒ ài chī xīguā.|Im Sommer esse ich gern Wassermelone.
盘子|pánzi|Teller|n|A2|桌子上有三个盘子。|Zhuōzi shang yǒu sān gè pánzi.|Auf dem Tisch stehen drei Teller.
蛋糕|dàngāo|Kuchen; Torte|n|A2|我给你买了蛋糕。|Wǒ gěi nǐ mǎi le dàngāo.|Ich habe dir Kuchen gekauft.
饮料|yǐnliào|Getränk|n|A2|你想喝什么饮料？|Nǐ xiǎng hē shénme yǐnliào?|Was für ein Getränk möchtest du?
白菜|báicài|Chinakohl|n|B1|我买了一棵白菜。|Wǒ mǎile yì kē báicài.|Ich habe einen Chinakohl gekauft.
红茶|hóngchá|schwarzer Tee|n|B1|我喜欢喝红茶。|Wǒ xǐhuan hē hóngchá.|Ich trinke gern schwarzen Tee.
红酒|hóngjiǔ|Rotwein|n|B1|我们喝点儿红酒吧。|Wǒmen hē diǎnr hóngjiǔ ba.|Lass uns ein bisschen Rotwein trinken.
可乐|kělè|Cola|n|B1|我要一杯可乐。|Wǒ yào yì bēi kělè.|Ich möchte eine Cola.
凉水|liángshuǐ|kaltes Wasser|n|B1|我想喝一杯凉水。|Wǒ xiǎng hē yì bēi liángshuǐ.|Ich möchte ein Glas kaltes Wasser trinken.
绿茶|lǜchá|grüner Tee|n|B1|我喜欢喝绿茶。|Wǒ xǐhuan hē lǜchá.|Ich trinke gern grünen Tee.
美食|měishí|leckeres Essen; Köstlichkeiten|n|B1|这里有很多美食。|Zhèlǐ yǒu hěn duō měishí.|Hier gibt es viel leckeres Essen.
皮|pí|Schale; Haut; Leder|n|B1|这个苹果的皮很薄。|Zhège píngguǒ de pí hěn báo.|Die Schale dieses Apfels ist sehr dünn.
食品|shípǐn|Lebensmittel|n|B1|这家店卖健康食品。|Zhè jiā diàn mài jiànkāng shípǐn.|Dieser Laden verkauft gesunde Lebensmittel.
糖|táng|Zucker; Bonbon|n|B1|咖啡里要加糖吗？|Kāfēi lǐ yào jiā táng ma?|Möchtest du Zucker in den Kaffee?
香蕉|xiāngjiāo|Banane|n|B1|我每天吃一根香蕉。|Wǒ měi tiān chī yì gēn xiāngjiāo.|Ich esse jeden Tag eine Banane.
营养|yíngyǎng|Nährstoffe; Nährwert|n|B1|鸡蛋很有营养。|Jīdàn hěn yǒu yíngyǎng.|Eier sind sehr nahrhaft.
勺子|sháozi|Löffel|n|B1|请给我一个勺子。|Qǐng gěi wǒ yí gè sháozi.|Geben Sie mir bitte einen Löffel.
小吃|xiǎochī|Snack; Imbiss|n|B1|这里的小吃很有名。|Zhèlǐ de xiǎochī hěn yǒumíng.|Die Snacks hier sind sehr bekannt.
巧克力|qiǎokèlì|Schokolade|n|B1|我最爱吃巧克力。|Wǒ zuì ài chī qiǎokèlì.|Schokolade esse ich am liebsten.
烤鸭|kǎoyā|Pekingente; gebratene Ente|n|B1|北京烤鸭很好吃。|Běijīng kǎoyā hěn hǎochī.|Pekingente schmeckt sehr gut.
盐|yán|Salz|n|B1|请少放一点儿盐。|Qǐng shǎo fàng yìdiǎnr yán.|Bitte etwas weniger Salz.
矿泉水|kuàngquánshuǐ|Mineralwasser|n|B1|我要一瓶矿泉水。|Wǒ yào yì píng kuàngquánshuǐ.|Ich möchte eine Flasche Mineralwasser.
葡萄|pútao|Weintraube|n|B1|这些葡萄很甜。|Zhèxiē pútao hěn tián.|Diese Trauben sind sehr süß.
西红柿|xīhóngshì|Tomate|n|B1|我喜欢吃西红柿炒鸡蛋。|Wǒ xǐhuan chī xīhóngshì chǎo jīdàn.|Ich esse gern Rührei mit Tomaten.
饼干|bǐnggān|Keks|n|B1|孩子们爱吃饼干。|Háizimen ài chī bǐnggān.|Die Kinder essen gern Kekse.
`,

  shopping: `
毛|máo|Mao (0,1 Yuan)|mw|A1|这个五毛钱。|Zhège wǔ máo qián.|Das kostet fünf Mao.
钱包|qiánbāo|Geldbeutel; Portemonnaie|n|A1|我的钱包不见了。|Wǒ de qiánbāo bú jiàn le.|Mein Geldbeutel ist weg.
书店|shūdiàn|Buchhandlung|n|A1|我去书店买书。|Wǒ qù shūdiàn mǎi shū.|Ich gehe in die Buchhandlung, um Bücher zu kaufen.
元|yuán|Yuan (Währung)|mw|A1|这本书三十元。|Zhè běn shū sānshí yuán.|Dieses Buch kostet dreißig Yuan.
大小|dàxiǎo|Größe|n|A2|这件衣服大小正好。|Zhè jiàn yīfu dàxiǎo zhènghǎo.|Die Größe dieses Kleidungsstücks passt genau.
店|diàn|Laden; Geschäft|n|A2|这家店的东西很便宜。|Zhè jiā diàn de dōngxi hěn piányi.|Die Sachen in diesem Laden sind sehr günstig.
顾客|gùkè|Kunde; Kundin|n|A2|店里顾客很多。|Diàn lǐ gùkè hěn duō.|Im Laden sind viele Kunden.
角|jiǎo|Jiao (1/10 Yuan)|mw|A2|一共三块五角。|Yígòng sān kuài wǔ jiǎo.|Insgesamt drei Yuan und fünf Jiao.
卡|kǎ|Karte|n|A2|可以刷卡吗?|Kěyǐ shuā kǎ ma?|Kann ich mit Karte zahlen?
信用卡|xìnyòngkǎ|Kreditkarte|n|A2|可以用信用卡吗？|Kěyǐ yòng xìnyòngkǎ ma?|Kann ich mit Kreditkarte zahlen?
银行卡|yínhángkǎ|Bankkarte|n|A2|我的银行卡不见了。|Wǒ de yínhángkǎ bú jiàn le.|Meine Bankkarte ist weg.
保险|bǎoxiǎn|Versicherung|n|B1|你买保险了吗？|Nǐ mǎi bǎoxiǎn le ma?|Hast du eine Versicherung abgeschlossen?
存|cún|aufbewahren; (Geld) einzahlen|v|B1|我把钱存在银行里。|Wǒ bǎ qián cún zài yínháng lǐ.|Ich lege mein Geld auf die Bank.
费|fèi|Gebühr; Kosten|n|B1|这个月的电费很高。|Zhège yuè de diànfèi hěn gāo.|Die Stromkosten sind diesen Monat sehr hoch.
费用|fèiyòng|Kosten|n|B1|旅行的费用不高。|Lǚxíng de fèiyong bù gāo.|Die Reisekosten sind nicht hoch.
付|fù|bezahlen|v|B1|我用手机付钱。|Wǒ yòng shǒujī fù qián.|Ich bezahle mit dem Handy.
会员|huìyuán|Mitglied|n|B1|我是这家店的会员。|Wǒ shì zhè jiā diàn de huìyuán.|Ich bin Mitglied in diesem Laden.
价钱|jiàqian|Preis|n|B1|这件衣服价钱不贵。|Zhè jiàn yīfu jiàqian bú guì.|Dieses Kleidungsstück ist nicht teuer.
交费|jiāofèi|Gebühren bezahlen|v|B1|请先去那边交费。|Qǐng xiān qù nàbiān jiāofèi.|Bitte bezahlen Sie zuerst dort drüben.
交易|jiāoyì|Geschäft; Handel|n|B1|这笔交易很成功。|Zhè bǐ jiāoyì hěn chénggōng.|Dieses Geschäft war sehr erfolgreich.
金|jīn|Gold; golden|n|B1|这个戒指是金的。|Zhège jièzhi shì jīn de.|Dieser Ring ist aus Gold.
开业|kāiyè|(Geschäft) eröffnen|v|B1|这家商店明天开业。|Zhè jiā shāngdiàn míngtiān kāiyè.|Dieses Geschäft eröffnet morgen.
美元|měiyuán|US-Dollar|n|B1|这个要十美元。|Zhège yào shí měiyuán.|Das kostet zehn Dollar.
牌子|páizi|Marke; Schild|n|B1|你的手机是什么牌子的？|Nǐ de shǒujī shì shénme páizi de?|Von welcher Marke ist dein Handy?
人民币|rénmínbì|Renminbi (chinesische Währung)|n|B1|我想换一些人民币。|Wǒ xiǎng huàn yìxiē rénmínbì.|Ich möchte etwas Geld in Renminbi wechseln.
商品|shāngpǐn|Ware; Artikel|n|B1|这家店的商品很便宜。|Zhè jiā diàn de shāngpǐn hěn piányi.|Die Waren in diesem Laden sind sehr günstig.
收费|shōufèi|Gebühren erheben; kostenpflichtig sein|v|B1|这里停车收费吗？|Zhèlǐ tíngchē shōufèi ma?|Kostet das Parken hier etwas?
银|yín|Silber|n|B1|这双筷子是银的。|Zhè shuāng kuàizi shì yín de.|Diese Stäbchen sind aus Silber.
邮票|yóupiào|Briefmarke|n|B1|我想买两张邮票。|Wǒ xiǎng mǎi liǎng zhāng yóupiào.|Ich möchte zwei Briefmarken kaufen.
支付|zhīfù|bezahlen|v|B1|可以用手机支付吗？|Kěyǐ yòng shǒujī zhīfù ma?|Kann man mit dem Handy bezahlen?
值|zhí|wert sein|v|B1|这本书值五十块。|Zhè běn shū zhí wǔshí kuài.|Dieses Buch ist fünfzig Yuan wert.
资金|zījīn|Kapital; Geldmittel|n|B1|公司的资金不够。|Gōngsī de zījīn bú gòu.|Die Firma hat nicht genug Kapital.
塑料袋|sùliàodài|Plastiktüte|n|B1|我不需要塑料袋。|Wǒ bù xūyào sùliàodài.|Ich brauche keine Plastiktüte.
购物|gòuwù|einkaufen|v|B1|我喜欢在网上购物。|Wǒ xǐhuan zài wǎngshàng gòuwù.|Ich kaufe gern online ein.
逛|guàng|bummeln|v|B1|周末我们去逛街吧。|Zhōumò wǒmen qù guàngjiē ba.|Lass uns am Wochenende bummeln gehen.
零钱|língqián|Kleingeld|n|B1|我没有零钱。|Wǒ méiyǒu língqián.|Ich habe kein Kleingeld.
`,
};

export default part5;
