import type { Episode, EpisodeLine, Level, Podcast } from "../../types";

/**
 * In-app mini podcast episodes. They are read aloud by the device's speech
 * synthesis, so they work offline and new episodes are just text.
 * Line format: Sprecher | Satz | Pinyin | Deutsch
 */
function ep(
  id: string,
  glyph: string,
  title: string,
  titleDe: string,
  level: Level,
  description: string,
  raw: string,
): Episode {
  const lines: EpisodeLine[] = raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [speaker, target, reading, de] = l.split("|").map((s) => s.trim());
      return { speaker, target, reading, de };
    });
  return { id, glyph, title, titleDe, level, description, lines };
}

export const episodes: Episode[] = [
  ep(
    "zh-ep-1",
    "咖",
    "在咖啡店",
    "Im Café",
    "A1",
    "Zwei Freunde bestellen Kaffee. Ganz einfache Sätze zum Einstieg.",
    `
小林|你好！你想喝什么？|Nǐ hǎo! Nǐ xiǎng hē shénme?|Hallo! Was möchtest du trinken?
我|我想喝一杯咖啡。你呢？|Wǒ xiǎng hē yì bēi kāfēi. Nǐ ne?|Ich möchte einen Kaffee. Und du?
小林|我喝茶。这里的茶很好喝。|Wǒ hē chá. Zhèlǐ de chá hěn hǎohē.|Ich trinke Tee. Der Tee hier ist sehr lecker.
我|咖啡多少钱？|Kāfēi duōshao qián?|Wie viel kostet der Kaffee?
小林|二十块。有点儿贵。|Èrshí kuài. Yǒudiǎnr guì.|Zwanzig Yuan. Etwas teuer.
我|没关系，今天我请客。|Méi guānxi, jīntiān wǒ qǐngkè.|Macht nichts, heute lade ich ein.
小林|真的吗？谢谢你！|Zhēn de ma? Xièxie nǐ!|Wirklich? Danke dir!
我|别客气！|Bié kèqi!|Keine Ursache!
`,
  ),
  ep(
    "zh-ep-2",
    "球",
    "周末打羽毛球",
    "Badminton am Wochenende",
    "A2",
    "Verabredung zum Sport: Zeit, Ort und eine kleine Planänderung.",
    `
小林|这个周末你有空吗？|Zhège zhōumò nǐ yǒu kòng ma?|Hast du dieses Wochenende Zeit?
我|周六有空。怎么了？|Zhōuliù yǒu kòng. Zěnme le?|Samstag habe ich Zeit. Was gibt's?
小林|我们一起去打羽毛球吧！|Wǒmen yìqǐ qù dǎ yǔmáoqiú ba!|Lass uns zusammen Badminton spielen!
我|好主意！几点见面？|Hǎo zhǔyi! Jǐ diǎn jiànmiàn?|Gute Idee! Um wie viel Uhr treffen wir uns?
小林|下午三点，可以吗？|Xiàwǔ sān diǎn, kěyǐ ma?|Nachmittags um drei, geht das?
我|三点有点儿早。四点怎么样？|Sān diǎn yǒudiǎnr zǎo. Sì diǎn zěnmeyàng?|Drei ist etwas früh. Wie wäre vier?
小林|行，那就四点。在哪儿见？|Xíng, nà jiù sì diǎn. Zài nǎr jiàn?|Okay, dann um vier. Wo treffen wir uns?
我|在地铁站门口吧，离球馆很近。|Zài dìtiězhàn ménkǒu ba, lí qiúguǎn hěn jìn.|Am Eingang der U-Bahn-Station, das ist nah an der Halle.
小林|好的，说定了！别迟到！|Hǎo de, shuōdìng le! Bié chídào!|Okay, abgemacht! Komm nicht zu spät!
我|放心，我一定准时到。|Fàngxīn, wǒ yídìng zhǔnshí dào.|Keine Sorge, ich bin bestimmt pünktlich.
`,
  ),
  ep(
    "zh-ep-3",
    "饿",
    "点外卖",
    "Essen bestellen",
    "A2",
    "Hunger am Abend: gemeinsam Essen liefern lassen und über Geschmack reden.",
    `
小林|我饿死了！你吃饭了吗？|Wǒ è sǐ le! Nǐ chīfàn le ma?|Ich verhungere! Hast du schon gegessen?
我|还没呢。我们点外卖吧。|Hái méi ne. Wǒmen diǎn wàimài ba.|Noch nicht. Lass uns Essen bestellen.
小林|好啊！你想吃什么？|Hǎo a! Nǐ xiǎng chī shénme?|Gern! Was möchtest du essen?
我|我想吃清淡一点儿的。昨天的菜太油腻了。|Wǒ xiǎng chī qīngdàn yìdiǎnr de. Zuótiān de cài tài yóunì le.|Ich möchte etwas Leichteres. Das Essen gestern war zu fettig.
小林|那面条怎么样？这家店评价很好。|Nà miàntiáo zěnmeyàng? Zhè jiā diàn píngjià hěn hǎo.|Wie wäre es dann mit Nudeln? Dieser Laden hat sehr gute Bewertungen.
我|听起来不错。要等多久？|Tīng qǐlai búcuò. Yào děng duō jiǔ?|Klingt gut. Wie lange müssen wir warten?
小林|大概三十分钟就送到。|Dàgài sānshí fēnzhōng jiù sòngdào.|In etwa dreißig Minuten wird geliefert.
我|好，下单吧！我来付款。|Hǎo, xiàdān ba! Wǒ lái fùkuǎn.|Gut, bestell! Ich bezahle.
小林|太好了！好吃的话，我给一个好评。|Tài hǎo le! Hǎochī dehuà, wǒ gěi yí ge hǎopíng.|Super! Wenn es schmeckt, gebe ich eine gute Bewertung.
`,
  ),
  ep(
    "zh-ep-4",
    "旅",
    "旅游计划",
    "Reisepläne",
    "B1",
    "Kurz vor der Abreise: Tickets, Hotel, Gepäck und Vorfreude.",
    `
小林|听说你下个月要去旅游？|Tīngshuō nǐ xià ge yuè yào qù lǚyóu?|Ich habe gehört, du verreist nächsten Monat?
我|对，我先去希腊，然后去中国。|Duì, wǒ xiān qù Xīlà, ránhòu qù Zhōngguó.|Ja, ich fahre erst nach Griechenland und dann nach China.
小林|哇，真羡慕你！机票订好了吗？|Wā, zhēn xiànmù nǐ! Jīpiào dìnghǎo le ma?|Wow, ich beneide dich! Sind die Flüge gebucht?
我|机票和酒店都订好了，但是行李还没收拾呢。|Jīpiào hé jiǔdiàn dōu dìnghǎo le, dànshì xíngli hái méi shōushi ne.|Flüge und Hotel sind gebucht, aber gepackt habe ich noch nicht.
小林|别忘了带护照！|Bié wàngle dài hùzhào!|Vergiss den Reisepass nicht!
我|放心，我做了一份攻略，什么都写好了。|Fàngxīn, wǒ zuòle yí fèn gōnglüè, shénme dōu xiěhǎo le.|Keine Sorge, ich habe einen Reiseplan gemacht, da steht alles drin.
小林|你打算去哪些景点？|Nǐ dǎsuàn qù nǎxiē jǐngdiǎn?|Welche Sehenswürdigkeiten willst du besuchen?
我|还没确定。你能推荐几个地方吗？|Hái méi quèdìng. Nǐ néng tuījiàn jǐ ge dìfang ma?|Steht noch nicht fest. Kannst du ein paar Orte empfehlen?
小林|当然！我把我的攻略转发给你。|Dāngrán! Wǒ bǎ wǒ de gōnglüè zhuǎnfā gěi nǐ.|Klar! Ich leite dir meinen Reiseplan weiter.
我|太好了！我很期待这次旅游。|Tài hǎo le! Wǒ hěn qīdài zhè cì lǚyóu.|Super! Ich freue mich sehr auf diese Reise.
`,
  ),
  ep(
    "zh-ep-5",
    "药",
    "你好点儿了吗？",
    "Geht's dir besser?",
    "B1",
    "Ein Freund ist krank – Mitgefühl zeigen, Rat geben, gute Besserung wünschen.",
    `
我|你今天怎么没来上班？|Nǐ jīntiān zěnme méi lái shàngbān?|Warum bist du heute nicht zur Arbeit gekommen?
小林|我感冒了，还发烧，一直咳嗽。|Wǒ gǎnmào le, hái fāshāo, yìzhí késou.|Ich bin erkältet, habe Fieber und huste ständig.
我|严重吗？你看医生了吗？|Yánzhòng ma? Nǐ kàn yīshēng le ma?|Ist es schlimm? Warst du beim Arzt?
小林|还没去。我觉得不太严重。|Hái méi qù. Wǒ juéde bú tài yánzhòng.|Noch nicht. Ich glaube, es ist nicht so schlimm.
我|你吃药了吗？要不要我给你买药？|Nǐ chī yào le ma? Yào bu yào wǒ gěi nǐ mǎi yào?|Hast du Medizin genommen? Soll ich dir welche kaufen?
小林|不用了，谢谢。家里有药。|Búyòng le, xièxie. Jiā lǐ yǒu yào.|Nicht nötig, danke. Ich habe Medizin zu Hause.
我|那你多喝水，多休息，别熬夜。|Nà nǐ duō hē shuǐ, duō xiūxi, bié áoyè.|Dann trink viel, ruh dich aus und bleib nicht lange auf.
小林|好的。我明天应该会好点儿。|Hǎo de. Wǒ míngtiān yīnggāi huì hǎo diǎnr.|Okay. Morgen sollte es mir besser gehen.
我|如果明天还发烧，一定要去看医生。|Rúguǒ míngtiān hái fāshāo, yídìng yào qù kàn yīshēng.|Wenn du morgen noch Fieber hast, geh unbedingt zum Arzt.
小林|知道了。谢谢你的关心！|Zhīdào le. Xièxie nǐ de guānxīn!|Verstanden. Danke, dass du dich kümmerst!
我|保重身体，祝你早日康复！|Bǎozhòng shēntǐ, zhù nǐ zǎorì kāngfù!|Pass auf dich auf, gute Besserung!
`,
  ),
  ep(
    "zh-ep-6",
    "递",
    "快递出问题了",
    "Ärger mit dem Paket",
    "B1",
    "Eine Reklamation beim Kundenservice: Problem schildern und Lösung finden.",
    `
客服|您好，请问有什么可以帮您？|Nín hǎo, qǐngwèn yǒu shénme kěyǐ bāng nín?|Guten Tag, wie kann ich Ihnen helfen?
我|你好，我上周下单的球拍今天到了，但是坏了。|Nǐ hǎo, wǒ shàng zhōu xiàdān de qiúpāi jīntiān dào le, dànshì huài le.|Hallo, der Schläger, den ich letzte Woche bestellt habe, kam heute an, aber er ist kaputt.
客服|非常抱歉！您能发一张照片给我吗？|Fēicháng bàoqiàn! Nín néng fā yì zhāng zhàopiàn gěi wǒ ma?|Das tut mir sehr leid! Können Sie mir ein Foto schicken?
我|好的，我已经发了。这个能修吗？|Hǎo de, wǒ yǐjīng fā le. Zhège néng xiū ma?|Okay, schon gesendet. Kann man das reparieren?
客服|这种情况修不好。我们可以给您换一个新的，或者退款。|Zhè zhǒng qíngkuàng xiū bu hǎo. Wǒmen kěyǐ gěi nín huàn yí ge xīn de, huòzhě tuìkuǎn.|In diesem Fall lässt es sich nicht reparieren. Wir können ihn umtauschen oder das Geld erstatten.
我|我想换一个新的。要等多久？|Wǒ xiǎng huàn yí ge xīn de. Yào děng duō jiǔ?|Ich möchte einen neuen. Wie lange dauert das?
客服|大概三天到货，而且包邮。|Dàgài sān tiān dàohuò, érqiě bāoyóu.|Etwa drei Tage, und der Versand ist kostenlos.
我|好，那就这样吧。希望这次没问题。|Hǎo, nà jiù zhèyàng ba. Xīwàng zhè cì méi wèntí.|Gut, dann machen wir das so. Hoffentlich klappt es diesmal.
客服|请放心！耽误您的时间了，再次抱歉。|Qǐng fàngxīn! Dānwu nín de shíjiān le, zàicì bàoqiàn.|Seien Sie unbesorgt! Entschuldigen Sie nochmals, dass wir Ihre Zeit beansprucht haben.
我|没关系，问题解决了就好。|Méi guānxi, wèntí jiějué le jiù hǎo.|Kein Problem, Hauptsache, es ist gelöst.
`,
  ),
];

/**
 * External podcast recommendations. Links can change over time –
 * check and update them here.
 */
export const podcasts: Podcast[] = [
  {
    title: "Coffee Break Chinese",
    author: "Coffee Break Languages",
    description: "Kurze, strukturierte Lektionen auf Englisch – ideal für den Einstieg.",
    level: "A1–A2",
    url: "https://coffeebreaklanguages.com/coffeebreakchinese/",
  },
  {
    title: "ChinesePod",
    author: "ChinesePod",
    description: "Riesiges Archiv an Dialog-Lektionen von Anfänger bis Fortgeschritten.",
    level: "A1–B2",
    url: "https://www.chinesepod.com/",
  },
  {
    title: "Tea Time Chinese 茶歇中文",
    author: "Nathan Rao",
    description: "Langsam und deutlich gesprochenes Mandarin über Alltag und Kultur.",
    level: "A2–B1",
    url: "https://teatimechinese.com/",
  },
  {
    title: "Dashu Mandarin 大叔中文",
    author: "Dashu Mandarin",
    description: "Drei Lehrer plaudern natürlich über Alltag und Gesellschaft in China.",
    level: "B1–B2",
    url: "https://www.dashumandarin.com/",
  },
  {
    title: "Mandarin Corner",
    author: "Mandarin Corner",
    description: "Authentische Gespräche und Straßeninterviews mit Untertiteln.",
    level: "A2–B2",
    url: "https://mandarincorner.org/",
  },
];
