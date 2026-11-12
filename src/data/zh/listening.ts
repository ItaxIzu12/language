import type { ListeningSentence } from "../../types";

/**
 * Everyday sentences for the listening mode.
 * Format per line: Satz | Pinyin | Deutsch | Niveau
 */
const raw = `
你好，最近怎么样？|Nǐ hǎo, zuìjìn zěnmeyàng?|Hallo, wie geht's dir in letzter Zeit?|A1
我今天很忙。|Wǒ jīntiān hěn máng.|Ich bin heute sehr beschäftigt.|A1
你吃饭了吗？|Nǐ chīfàn le ma?|Hast du schon gegessen?|A1
这个多少钱？|Zhège duōshao qián?|Wie viel kostet das?|A1
我想喝一杯咖啡。|Wǒ xiǎng hē yì bēi kāfēi.|Ich möchte einen Kaffee trinken.|A1
明天你有空吗？|Míngtiān nǐ yǒu kòng ma?|Hast du morgen Zeit?|A1
我们一起去吃饭吧。|Wǒmen yìqǐ qù chīfàn ba.|Lass uns zusammen essen gehen.|A1
洗手间在哪儿？|Xǐshǒujiān zài nǎr?|Wo ist die Toilette?|A1
我不知道。|Wǒ bù zhīdào.|Ich weiß es nicht.|A1
请说慢一点儿。|Qǐng shuō màn yìdiǎnr.|Bitte sprich etwas langsamer.|A1
我马上到。|Wǒ mǎshàng dào.|Ich bin gleich da.|A1
太贵了，便宜一点儿吧。|Tài guì le, piányi yìdiǎnr ba.|Zu teuer, mach es etwas billiger.|A1
我们几点见面？|Wǒmen jǐ diǎn jiànmiàn?|Um wie viel Uhr treffen wir uns?|A1
我在家呢。|Wǒ zài jiā ne.|Ich bin gerade zu Hause.|A1
今天天气很好。|Jīntiān tiānqì hěn hǎo.|Heute ist das Wetter schön.|A1
这个有点儿贵。|Zhège yǒudiǎnr guì.|Das ist etwas teuer.|A2
我的手机跟你的一样。|Wǒ de shǒujī gēn nǐ de yíyàng.|Mein Handy ist genauso wie deins.|A2
今天比昨天冷。|Jīntiān bǐ zuótiān lěng.|Heute ist es kälter als gestern.|A2
听起来不错。|Tīng qǐlai búcuò.|Klingt gut.|A2
我的快递还没到。|Wǒ de kuàidì hái méi dào.|Mein Paket ist noch nicht angekommen.|A2
要下雨了，记得带伞。|Yào xiàyǔ le, jìde dài sǎn.|Es regnet gleich, denk an den Schirm.|A2
我饿死了，点外卖吧。|Wǒ è sǐ le, diǎn wàimài ba.|Ich verhungere, lass uns Essen bestellen.|A2
你周末打算做什么？|Nǐ zhōumò dǎsuàn zuò shénme?|Was hast du am Wochenende vor?|A2
好久不见，你最近忙吗？|Hǎojiǔ bú jiàn, nǐ zuìjìn máng ma?|Lange nicht gesehen, hast du gerade viel zu tun?|A2
我感冒了，想在家休息。|Wǒ gǎnmào le, xiǎng zài jiā xiūxi.|Ich bin erkältet und möchte mich zu Hause ausruhen.|A2
不好意思，我迟到了。|Bù hǎoyìsi, wǒ chídào le.|Sorry, ich bin zu spät.|A2
我可以跟你借充电器吗？|Wǒ kěyǐ gēn nǐ jiè chōngdiànqì ma?|Kann ich mir dein Ladegerät leihen?|A2
一直走，然后往左拐。|Yìzhí zǒu, ránhòu wǎng zuǒ guǎi.|Immer geradeaus, dann links abbiegen.|A2
我给你发照片。|Wǒ gěi nǐ fā zhàopiàn.|Ich schicke dir die Fotos.|A2
要不我们改天去？|Yàobù wǒmen gǎitiān qù?|Wie wär's, wenn wir ein andermal gehen?|A2
我已经订好机票了。|Wǒ yǐjīng dìnghǎo jīpiào le.|Ich habe die Flugtickets schon gebucht.|A2
如果下雨，我们就改天去。|Rúguǒ xiàyǔ, wǒmen jiù gǎitiān qù.|Wenn es regnet, gehen wir ein andermal.|B1
别剧透，我还没看呢！|Bié jùtòu, wǒ hái méi kàn ne!|Nicht spoilern, ich hab's noch nicht gesehen!|B1
这个手机性价比很高。|Zhège shǒujī xìngjiàbǐ hěn gāo.|Dieses Handy hat ein tolles Preis-Leistungs-Verhältnis.|B1
我很期待这次旅游。|Wǒ hěn qīdài zhè cì lǚyóu.|Ich freue mich sehr auf diese Reise.|B1
这个问题解决不了。|Zhège wèntí jiějué bu liǎo.|Dieses Problem lässt sich nicht lösen.|B1
既然你不舒服，就别去了。|Jìrán nǐ bù shūfu, jiù bié qù le.|Da es dir nicht gut geht, geh einfach nicht hin.|B1
我们把时间改到三点吧。|Wǒmen bǎ shíjiān gǎidào sān diǎn ba.|Verlegen wir die Zeit auf drei Uhr.|B1
我差点儿迟到了。|Wǒ chàdiǎnr chídào le.|Ich wäre fast zu spät gekommen.|B1
说实话，我不太喜欢这部剧。|Shuō shíhuà, wǒ bú tài xǐhuan zhè bù jù.|Ehrlich gesagt mag ich diese Serie nicht so.|B1
祝你早日康复，多休息。|Zhù nǐ zǎorì kāngfù, duō xiūxi.|Gute Besserung, ruh dich viel aus.|B1
我一边吃饭一边看剧。|Wǒ yìbiān chīfàn yìbiān kàn jù.|Ich esse und schaue dabei Serie.|B1
虽然很累，但是很开心。|Suīrán hěn lèi, dànshì hěn kāixīn.|Obwohl ich müde bin, bin ich glücklich.|B1
这家店便宜，而且质量好。|Zhè jiā diàn piányi, érqiě zhìliàng hǎo.|Der Laden ist günstig und außerdem ist die Qualität gut.|B1
无论多忙，我都会学习。|Wúlùn duō máng, wǒ dōu huì xuéxí.|Egal wie beschäftigt ich bin, ich lerne trotzdem.|B2
即使下雨，我也要去。|Jíshǐ xiàyǔ, wǒ yě yào qù.|Selbst wenn es regnet, gehe ich hin.|B2
工作和生活要平衡。|Gōngzuò hé shēnghuó yào pínghéng.|Arbeit und Leben müssen im Gleichgewicht sein.|B2
人工智能发展得越来越快。|Réngōng zhìnéng fāzhǎn de yuè lái yuè kuài.|KI entwickelt sich immer schneller.|B2
`;

export const listening: ListeningSentence[] = raw
  .split("\n")
  .map((l) => l.trim())
  .filter(Boolean)
  .map((line, i) => {
    const [target, reading, de, level] = line.split("|").map((s) => s.trim());
    return { id: `zh-listen-${i + 1}`, target, reading, de, level: level as ListeningSentence["level"] };
  });
