/* ── Language for paramtatv.org: Sanskrit by default, English and Hindi on request
   The markup contains the SANSKRIT; this file only ever replaces text that is
   already correct, so a visitor with no JavaScript gets the Sanskrit page.

   This is its OWN dictionary. Paramtatv is the organisation and Sassembly is one
   of the things it built, so the two sites are separate: neither shares the
   other's keys, and a change to one cannot silently move the other.

   The Sanskrit here is careful but is not a native speaker's, and the dedication
   most of all wants review by someone who reads Sanskrit properly.
   ──────────────────────────────────────────────────────────────────────────── */
(function () {

  var DICT = {
    sa: {
      'ptnav.discord': 'अध्ययनसङ्घः',
      'pt.ded.name': 'श्रीसद्गुरुदेवः निखिलेश्वरानन्दः',
      'ptnav.sassembly': 'संस्कृतयन्त्रम्',
      'lang.label': 'भाषा',
      'pt.title': 'परमतत्त्वम् — सद्गुरुचरणेषु समर्पणम्',
      'pt.ded.eyebrow': 'प्रणामाः',
      'pt.ded.h1': 'सद्गुरुचरणेषु',
      'pt.ded.inv': 'यस्य कृपया अन्धकारः अपगच्छति, यस्य वचनेन सूत्रं प्रकाशते — तस्मै श्रीसद्गुरुदेवाय निखिलेश्वरानन्दाय नमः।',
      'pt.ded.b1': 'अत्र यत् किमपि लिखितम्, तत् अस्माभिः अन्विष्टं न, अपि तु दर्शितम्। प्रथमः अन्तिमश्च प्रणामः श्रीसद्गुरुदेवाय निखिलेश्वरानन्दाय, यस्य कृपया माहेश्वरसूत्राणि उद्घाटितानि — तैः सह च सः विन्यासः यं वयं वर्षाणि पश्यन्तः अपि न अपश्याम।',
      'pt.ded.b2': 'अस्मिन् पृष्ठे किमपि अस्माकं स्वकीयम् आविष्कारं न कथयति। क्रमः तु सदैव तत्रैव आसीत्, चतुर्दशसु सूत्रेषु। यत् प्राप्तं, तत् तं पठितुं दृष्टिः।',
      'pt.su.h': 'चतुर्दश सूत्राणि, तेषु च किं निहितम्',
      'pt.su.note': 'पाणिनेः अष्टाध्याय्याः आरम्भः',
      'pt.su.b1': 'अष्टाध्यायी चतुर्दशैः लघुसूत्रैः आरभते, यानि संस्कृतस्य सर्वान् वर्णान् गणयन्ति — न वर्णानुक्रमेण, अपि तु तथा क्रमेण यथा व्याकरणस्य प्रत्येकः महत्त्वपूर्णः वर्णसमूहः एकस्मिन् अखण्डे विस्तारे पतति।',
      'pt.su.b2': 'प्रत्येकं सूत्रम् अनुबन्धेन समाप्यते — यः वर्णः स्वयं भाषायाः ध्वनिः न, केवलं सीमा। आदिवर्णं च अन्त्यम् अनुबन्धं नामय, समूहः नामितः: अक् इति सर्वे सरलस्वराः, हल् इति सर्वे व्यञ्जनाः, अल् इति भाषायाः सर्वे वर्णाः।',
      'pt.su.cap': 'माहेश्वरसूत्राणि, सह प्रत्येकस्य अनुबन्धेन',
      'pt.su.th1': 'क्रमः', 'pt.su.th2': 'सूत्रम्', 'pt.su.th3': 'अनुबन्धः',
      'pt.pr.cap': 'प्रत्याहाराः — द्वाभ्यां सीमाभ्यां नामितः समूहः',
      'pt.pr.th1': 'प्रत्याहारः', 'pt.pr.th2': 'विस्तारः', 'pt.pr.th3': 'अर्थः',
      'pt.pr.r1': 'सरलस्वराः', 'pt.pr.r2': 'सर्वे स्वराः', 'pt.pr.r3': 'अन्तःस्थाः',
      'pt.pr.r4': 'सर्वे व्यञ्जनाः', 'pt.pr.r5': 'भाषायाः सर्वे वर्णाः',
      'pt.su.b3': 'एतत् अन्तरालसङ्केतनम् — बुद्ध्या रचिते वर्णक्रमे समूहः स्वसीमाभ्यामेव नामितः। एतदेव कारणं यत् अष्टाध्यायी चत्वारि सहस्राणि सूत्राणि, न चत्वारिंशत् सहस्राणि। गणकयन्त्रस्य आवश्यकतायाः द्विसहस्रवर्षपूर्वं लिखितम्।',
      'pt.sy.h': 'विन्यासेन यत् रचयितुं शिक्षितम्',
      'pt.sy.c1.h': 'सर्वं नामितम्',
      'pt.sy.c1.b': 'अनामितं सङ्केतनं नास्ति। शब्दकोशः तथैव पिहितः यथा सूत्राणि पिहितानि — यत् न नामितं, तत् अलेख्यम्।',
      'pt.sy.c2.h': 'समूहः स्वसीमे',
      'pt.sy.c2.b': 'संस्कृतयन्त्रे अङ्कमाला आरम्भः सीमा च — यथा प्रत्याहारः आदिवर्णः अनुबन्धश्च। एकम् एव आकारः, द्वयोः स्थानयोः।',
      'pt.sy.c3.h': 'कारकं शब्दे',
      'pt.sy.c3.b': 'विभक्तिः पदस्य भूमिकां वहति, अतः स्थानं भारवाहकं न। यत् व्याकरणे सत्यं, तत् निर्देशसमुच्चये अपि सत्यम्।',
      'pt.sy.b1': 'वयं प्रथमं स्वदेशीयं रचनासाधनम् अरचयाम — सङ्कलकः यः स्वभाषया लिखितः, स्वमेव सङ्कलयति, स्वकीयं बिम्बं च अष्टकपर्यन्तं पुनः रचयति। न तु स्वाश्रयत्वं प्रभावशालि इति, अपि तु यत् साधनं स्वमूलात् पुनः रचयितुं न शक्यते, तत् साधनम् अद्यापि न ज्ञातम्।',
      'pt.ev.h': 'ततः, सर्वेभ्यः',
      'pt.ev.b1': 'रचनासाधने सिद्धे, कोऽपि जालस्य, अन्तर्जालस्य, तेषां च उपकरणानां यत्र अन्यत् सर्वं तिष्ठति — तेषां मूलाधाराय दक्षं तन्त्रांशं रचयितुं शक्नोति। अधुना कृत्रिमप्रज्ञया सङ्केतकर्तृभिश्च सह, तस्मिन्नेव व्याकरणे कार्यं कुर्वद्भिः।',
      'pt.ev.c1.h': 'जालस्य मूलाधारः',
      'pt.ev.c1.b': 'सेवकाः, संग्राहकाः, नयनसाधनानि, सञ्चिकातन्त्राणि — यानि सर्वाणि अन्यानि वहन्ति, तानि अपि तेनैव व्याकरणेन लेख्यानि।',
      'pt.ev.c2.h': 'कृत्रिमप्रज्ञा, सङ्केतकर्तारश्च',
      'pt.ev.c2.b': 'यत् व्याकरणं यन्त्राय स्पष्टं, तत् सङ्केतकर्तृ-प्रज्ञायाम् अपि स्पष्टम्। नामितं प्रत्याख्यानं अनुमानात् वरम्।',
      'pt.ev.c3.h': 'उपकरणानि, सर्वाणि',
      'pt.ev.c3.b': 'लघुसाधनात् सम्पूर्णप्रयोगं यावत् — एका भाषा, एकं व्याकरणम्, एकः परीक्ष्यः आरम्भः।',
      'pt.inv.h': 'संस्कृतेन गणकयन्त्रैश्च विश्वस्य गूढरहस्यानि उद्घाटय।',
      'pt.inv.b': 'सूत्रं क्रमं दत्तवत्। क्रमः साधनं दत्तवान्। साधनं तव अस्ति।',
      'pt.inv.cta': 'संस्कृतयन्त्रं पश्य',
      'pt.foot': 'परमतत्त्वम् — सद्गुरोः कृपया, सर्वेभ्यः समर्पितम्।'
    },
    en: {
      'ptnav.discord': 'Discord',
      'pt.ded.name': 'Sadgurudev Shri Nikhileshwarananda',
      'ptnav.sassembly': 'Sassembly',
      'lang.label': 'Language',
      'pt.title': 'Paramtatv — at the feet of Sadgurudev',
      'pt.ded.eyebrow': 'In reverence',
      'pt.ded.h1': 'At the feet of Sadgurudev',
      'pt.ded.inv': 'By whose grace the darkness departs, by whose word the sutra shines — salutations to Sadgurudev Shri Nikhileshwarananda.',
      'pt.ded.b1': 'Whatever is set down here began as something shown, not something found. Our first and continuing respect is offered to Sadgurudev Nikhileshwarananda, by whose grace the Maheshwara Sutras opened — and with them a pattern we had been looking at for years without seeing.',
      'pt.ded.b2': 'Nothing on this page claims a discovery of our own. The order was always there, in the fourteen sutras. What was given was the eye to read it.',
      'pt.su.h': 'The fourteen sutras, and what they encode',
      'pt.su.note': 'the opening of Pāṇini\u2019s Aṣṭādhyāyī',
      'pt.su.b1': 'The Aṣṭādhyāyī opens with fourteen short sutras that list every phoneme of Sanskrit — not alphabetically, but in an order chosen so that every grammatically significant class of sounds falls into one unbroken stretch.',
      'pt.su.b2': 'Each sutra closes with an anubandha — a marker that is not itself a sound of the language, only a boundary. Name a starting phoneme and a closing marker and you have named a set: अक् is every simple vowel, हल् every consonant, अल् every phoneme in the language.',
      'pt.su.cap': 'The Maheshwara Sutras, with the marker each one closes on',
      'pt.su.th1': 'No.', 'pt.su.th2': 'Sutra', 'pt.su.th3': 'Marker',
      'pt.pr.cap': 'Pratyāhāras — a set named by two bounds',
      'pt.pr.th1': 'Pratyāhāra', 'pt.pr.th2': 'Expands to', 'pt.pr.th3': 'Means',
      'pt.pr.r1': 'the simple vowels', 'pt.pr.r2': 'all vowels', 'pt.pr.r3': 'the semivowels',
      'pt.pr.r4': 'all consonants', 'pt.pr.r5': 'every phoneme in the language',
      'pt.su.b3': 'That is an interval encoding over a deliberately ordered alphabet — a set addressed by its two bounds. It is a large part of why the Aṣṭādhyāyī is four thousand rules and not forty thousand. It was written down more than two millennia before there was a machine that needed it.',
      'pt.sy.h': 'What the pattern taught us to build',
      'pt.sy.c1.h': 'Everything is named',
      'pt.sy.c1.b': 'There is no unnamed encoding. The lexicon is closed the way the sutras are closed — what is not named cannot be written.',
      'pt.sy.c2.h': 'A set is its bounds',
      'pt.sy.c2.b': 'A run in Sassembly is a start and a bound — exactly as a pratyāhāra is a first phoneme and a marker. One idea, in two places two thousand years apart.',
      'pt.sy.c3.h': 'The role is in the word',
      'pt.sy.c3.b': 'Case endings carry the role an operand plays, so position is not load-bearing. What is true of the grammar is true of the instruction set.',
      'pt.sy.b1': 'We built the native builder first — a compiler written in its own language, which compiles itself and reproduces its own binary to the octet. Not because self-hosting is impressive, but because a system you cannot rebuild from its own source is a system you do not yet understand.',
      'pt.ev.h': 'And then, for everyone',
      'pt.ev.b1': 'With the builder in place, anyone can make efficient software for the backbone of the web, the internet, and the utilities everything else rests on — now alongside AI and coding agents working in the same grammar.',
      'pt.ev.c1.h': 'The backbone of the web',
      'pt.ev.c1.b': 'Servers, stores, routing, filesystems — the things that carry everything else deserve to be written in the same grammar as everything else.',
      'pt.ev.c2.h': 'AI and coding agents',
      'pt.ev.c2.b': 'A grammar unambiguous enough for a machine is unambiguous enough for a model. A named refusal beats a plausible guess, for both.',
      'pt.ev.c3.h': 'Utilities, all of them',
      'pt.ev.c3.b': 'From a one-file tool to a whole application — one language, one grammar, one bootstrap you can verify.',
      'pt.inv.h': 'Unlock the deep mysteries of the universe with Sanskrit and computers.',
      'pt.inv.b': 'The sutra gave the order. The order gave the builder. The builder is yours.',
      'pt.inv.cta': 'See Sassembly',
      'pt.foot': 'Paramtatv — by the grace of Sadgurudev, offered to all.'
    },
    hi: {
      'ptnav.discord': 'डिस्कॉर्ड',
      'pt.ded.name': 'सद्गुरुदेव श्री निखिलेश्वरानन्द',
      'ptnav.sassembly': 'Sassembly',
      'lang.label': 'भाषा',
      'pt.title': 'परमतत्त्व — सद्गुरुदेव के श्रीचरणों में',
      'pt.ded.eyebrow': 'प्रणाम',
      'pt.ded.h1': 'सद्गुरुदेव के श्रीचरणों में',
      'pt.ded.inv': 'जिनकी कृपा से अंधकार हटता है, जिनके वचन से सूत्र प्रकाशित होता है — उन सद्गुरुदेव श्री निखिलेश्वरानन्द को नमन।',
      'pt.ded.b1': 'यहाँ जो कुछ लिखा है, वह हमने खोजा नहीं — वह दिखाया गया। हमारा पहला और निरंतर प्रणाम सद्गुरुदेव निखिलेश्वरानन्द को, जिनकी कृपा से माहेश्वर सूत्र खुले — और उनके साथ वह पैटर्न जिसे हम वर्षों देखते रहे पर देख न पाए।',
      'pt.ded.b2': 'इस पृष्ठ पर कुछ भी हमारी अपनी खोज का दावा नहीं है। क्रम सदा वहीं था, चौदह सूत्रों में। जो मिला, वह उसे पढ़ने की दृष्टि थी।',
      'pt.su.h': 'चौदह सूत्र, और उनमें जो निहित है',
      'pt.su.note': 'पाणिनि की अष्टाध्यायी का आरंभ',
      'pt.su.b1': 'अष्टाध्यायी चौदह छोटे सूत्रों से आरंभ होती है, जो संस्कृत के प्रत्येक वर्ण को गिनाते हैं — वर्णक्रम से नहीं, बल्कि ऐसे क्रम में कि व्याकरण की हर महत्वपूर्ण वर्ण-श्रेणी एक अखंड विस्तार में आ जाए।',
      'pt.su.b2': 'हर सूत्र एक अनुबंध पर समाप्त होता है — वह वर्ण जो स्वयं भाषा की ध्वनि नहीं, केवल सीमा है। आदि वर्ण और अंत का अनुबंध बता दें, और समूह नामित हो गया: अक् अर्थात् सभी सरल स्वर, हल् अर्थात् सभी व्यंजन, अल् अर्थात् भाषा के सभी वर्ण।',
      'pt.su.cap': 'माहेश्वर सूत्र, हर एक के अनुबंध के साथ',
      'pt.su.th1': 'क्रम', 'pt.su.th2': 'सूत्र', 'pt.su.th3': 'अनुबंध',
      'pt.pr.cap': 'प्रत्याहार — दो सीमाओं से नामित समूह',
      'pt.pr.th1': 'प्रत्याहार', 'pt.pr.th2': 'विस्तार', 'pt.pr.th3': 'अर्थ',
      'pt.pr.r1': 'सरल स्वर', 'pt.pr.r2': 'सभी स्वर', 'pt.pr.r3': 'अंतःस्थ',
      'pt.pr.r4': 'सभी व्यंजन', 'pt.pr.r5': 'भाषा के सभी वर्ण',
      'pt.su.b3': 'यह एक अंतराल-संकेतन है — जान-बूझकर रचे गए वर्णक्रम पर, जहाँ समूह अपनी दो सीमाओं से ही नामित होता है। यही बड़ा कारण है कि अष्टाध्यायी चार हज़ार सूत्रों की है, चालीस हज़ार की नहीं। यह उस मशीन के होने से दो सहस्राब्दी पहले लिखा गया जिसे इसकी आवश्यकता थी।',
      'pt.sy.h': 'इस पैटर्न ने हमें क्या बनाना सिखाया',
      'pt.sy.c1.h': 'सब कुछ नामित है',
      'pt.sy.c1.b': 'कोई बिना नाम वाली एन्कोडिंग नहीं। शब्दकोश उसी तरह बंद है जैसे सूत्र बंद हैं — जो नामित नहीं, वह लिखा ही नहीं जा सकता।',
      'pt.sy.c2.h': 'समूह अपनी सीमाएँ है',
      'pt.sy.c2.b': 'Sassembly में एक रन आरंभ और सीमा है — ठीक जैसे प्रत्याहार एक आदि वर्ण और एक अनुबंध है। एक ही विचार, दो हज़ार वर्ष अलग दो जगहों पर।',
      'pt.sy.c3.h': 'भूमिका शब्द में है',
      'pt.sy.c3.b': 'विभक्ति ऑपरैंड की भूमिका ढोती है, इसलिए स्थान भार नहीं उठाता। जो व्याकरण में सत्य है, वही निर्देश-समुच्चय में भी।',
      'pt.sy.b1': 'हमने पहले स्वदेशी बिल्डर बनाया — एक कंपाइलर जो अपनी ही भाषा में लिखा है, स्वयं को कंपाइल करता है, और अपनी बाइनरी को ऑक्टेट तक दोबारा बनाता है। इसलिए नहीं कि स्व-आश्रय प्रभावशाली है, बल्कि इसलिए कि जिस तंत्र को आप उसके स्रोत से दोबारा नहीं बना सकते, उसे आपने अभी समझा नहीं है।',
      'pt.ev.h': 'और फिर, सबके लिए',
      'pt.ev.b1': 'बिल्डर तैयार होने पर कोई भी वेब, इंटरनेट और उन उपकरणों के मूलाधार के लिए कुशल सॉफ़्टवेयर बना सकता है जिन पर बाक़ी सब टिका है — अब AI और कोडिंग एजेंट के साथ, उसी व्याकरण में काम करते हुए।',
      'pt.ev.c1.h': 'वेब का मूलाधार',
      'pt.ev.c1.b': 'सर्वर, स्टोर, रूटिंग, फ़ाइल-सिस्टम — जो सब कुछ ढोते हैं, वे भी उसी व्याकरण में लिखे जाने योग्य हैं।',
      'pt.ev.c2.h': 'AI और कोडिंग एजेंट',
      'pt.ev.c2.b': 'जो व्याकरण मशीन के लिए स्पष्ट है, वह मॉडल के लिए भी स्पष्ट है। नामित मनाही, संभावित अनुमान से बेहतर — दोनों के लिए।',
      'pt.ev.c3.h': 'उपकरण, सभी',
      'pt.ev.c3.b': 'एक-फ़ाइल औज़ार से पूरे एप्लिकेशन तक — एक भाषा, एक व्याकरण, एक बूटस्ट्रैप जिसे आप जाँच सकें।',
      'pt.inv.h': 'संस्कृत और कंप्यूटर से ब्रह्मांड के गहरे रहस्य खोलें।',
      'pt.inv.b': 'सूत्र ने क्रम दिया। क्रम ने बिल्डर दिया। बिल्डर आपका है।',
      'pt.inv.cta': 'Sassembly देखें',
      'pt.foot': 'परमतत्त्व — सद्गुरुदेव की कृपा से, सबको समर्पित।'
    }
  };

  var KEY = 'paramtatv-lang';
  var DEFAULT = 'sa';

  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function remember(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function apply(lang) {
    var d = DICT[lang] || DICT[DEFAULT];
    document.documentElement.setAttribute('lang', lang);
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var k = nodes[i].getAttribute('data-i18n');
      if (d[k] != null) { nodes[i].textContent = d[k]; }
    }
    var t = document.querySelector('[data-i18n-title]');
    if (t) { var tk = t.getAttribute('data-i18n-title'); if (d[tk] != null) { document.title = d[tk]; } }
    var sels = document.querySelectorAll('.langpick');
    for (var s = 0; s < sels.length; s++) { sels[s].value = lang; }
  }

  window.ParamtatvLang = { apply: apply, dict: DICT, fallback: DEFAULT };

  document.addEventListener('DOMContentLoaded', function () {
    var want = stored();
    if (!DICT[want]) { want = DEFAULT; }
    apply(want);
    var sels = document.querySelectorAll('.langpick');
    for (var i = 0; i < sels.length; i++) {
      sels[i].addEventListener('change', function (e) {
        if (!DICT[e.target.value]) { return; }
        apply(e.target.value); remember(e.target.value);
      });
    }
  });
})();
