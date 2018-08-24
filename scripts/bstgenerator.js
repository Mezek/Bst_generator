// File: bstgenerator.js
// Version: 0.92
// (c) 2018 Erik Bartoš

var bstGenVersion = "0.92";
var bstGenFileName = "bibgen";
var optDef = [];
var prevDef = [];
var ifDef = [];
/*for (var i=0; i<10; i++) {
	ifDef[i] = [""];
}*/
var parameters = [];
var k = 0;
	
// Definition of options (as in merlin.mbs and adapted for real citations)
optDef[k] = [
	["T","Style of citations",""],
	["0","","Numerical","as in standard LaTeX"],
	["a","ay","Author-year","with some non-standard interface"],
	["b","alph","Alpha style, Jon90 or JWB90","for single or multiple authors"],
	["o","alph,alf-1","Alpha style, Jon90","even for multiple authors"],
	["f","alph,alf-f","Alpha style, Jones90","(full name of first author)"],
	["c","cite","Cite key","(special for listing contents of bib file)"]
];
// TFR == text for replacement
prevDef[k] = [
	"<div class='displayTd'><span id='TFR'>&nbsp;</span></div><div class='displayTd'>Jeffrey Goldstone, Abdus Salam and Steven Weinberg. Broken Symmetries. <span class='text-italic'>Phys. Rev.</span>, 127:965--970, 1962.</div>",
	"<span class='text-bold'>[1]&nbsp;</span>",
	"<span class='text-bold'>[Goldstone-1962]&nbsp;</span>",
	"<span class='text-bold'>[GSW62]&nbsp;</span>",
	"<span class='text-bold'>[Gol62]&nbsp;</span>",
	"<span class='text-bold'>[Goldstone62]&nbsp;</span>",
	"<span class='text-bold'>[Goldstone:1962es]&nbsp;</span>"
];
ifDef[k] = [["def","numerical","T"],["def","myTemp","T"],["a","numerical","F"],["b","myTemp","F"]];
k++;
	
optDef[k] = [	
	["T","HTML output","numerical","T"],
	["0","","Normal LaTeX","output"],
	["h","html","Hypertext","output, in HTML code, in paragraphs"],
	["n","html,htlist","Hypertext list","with sequence numbers"],
	["k","html,htdes","Hypertext with keys","for viewing databases"]
];
prevDef[k] = [
	"<span id='TFR'>&nbsp;</span></td>",
	"&#91;1&#93;&nbsp;Steven Weinberg. A Model of Leptons. <span class='text-italic'>Phys. Rev. Lett.</span>, 19:1264&mdash;1266, 1967.",
	"&lt;p&gt;<br />Steven Weinberg. A Model of Leptons. <br />&lt;i&gt;Phys. Rev. Lett.&lt;/i&gt;, 19:1264&mdash;1266, 1967.<br />&lt;/p&gt;",
	"&lt;ol&gt;<br />&lt;li&gt;<br />Steven Weinberg. A Model of Leptons. <br />&lt;i&gt;Phys. Rev. Lett.&lt;/i&gt;, 19:1264&mdash;1266, 1967.<br />&lt;/li&gt;<br />&lt;/ol&gt;",
	"&lt;dl&gt;<br />&lt;dt&gt;&lt;strong&gt;&lt;tt&gt;Weinberg:1967tq&lt;/tt&gt;&lt;/strong&gt;&lt;/dt&gt;<br />&lt;dd&gt;<br />Steven Weinberg. A Model of Leptons. <br />&lt;i&gt;Phys. Rev. Lett.&lt;/i&gt;, 19:1264&mdash;1266, 1967.<br />&lt;/dd&gt;<br />&lt;/dl&gt;>"
];
k++;
	
optDef[k] = [
	["T","Author-year support system","numerical","F"],
	["0","nat","Natbib","for use with natbib v5.3 or later"],
	["o","","Older Natbib","without full authors citations"],
	["l","alk","Apalike","for use with <span class='text-type'>apalike.sty</span>"],
	["h","har","Harvard","system with <span class='text-type'>harvard.sty</span>"],
	["a","ast","Astronomy","system with <span class='text-type'>astron.sty</span>"],
	["c","cay","Chicago","system with <span class='text-type'>chicago.sty</span>"],
	["n","nmd","Named","system with <span class='text-type'>named.sty</span>"],
	["d","cn","Author-date","system with <span class='text-type'>authordate1-4.sty</span>"]
];
prevDef[k] = [
	"<div class='displayTd'><span id='TFR'>&nbsp;</span></div><div class='displayTd'>S. L. Glashow. Partial Symmetries of Weak Interactions. <span class='text-italic'>Nucl. Phys.</span>, 22:579--588, 1961.</div>",
	"<span class='text-bold'>[Glashow&#40;1961&#41;]&nbsp;</span>",
	"<span class='text-bold'>[Glashow&#40;1961&#41;]&nbsp;</span>",
	"<span class='text-bold'>[Glashow,&nbsp;1961]&nbsp;</span>",
	"<span class='text-bold'>[Glashow,&nbsp;S.&nbsp;L.&nbsp;(1961)]&nbsp;</span>",
	"<span class='text-bold'>[Glashow&#40;1961&#41;]&nbsp;</span>",
	"<span class='text-bold'>Glashow,&nbsp;S.&nbsp;L.&nbsp;(1961).&nbsp;</span>",
	"<span class='text-bold'>Glashow1961.&nbsp;</span>",
	"<span class='text-bold'>Glashow,&nbsp;S.&nbsp;L.,&nbsp;1961&nbsp;</span>"
];
k++;
	
optDef[k] = [
	["T","Harvard extensions included","previous","h"],
	["0","harnm","With Harvard extensions","for LaTeX2e version of <span class='text-type'>harvard.sty</span>"],
	["n","","Older Harvard","style, for LaTeX 2.09"]
]
prevDef[k] = [
	"<div class='displayTd'><span class='text-bold'>Gold</span></div><div class='displayTd'><span class='text-bold'>stone, J., Salam, A. &amp; Weinberg, S.  (1962)</span>, &lsquo;Broken Symmetries&rsquo;, <span class='text-italic'>Phys. Rev.</span>&nbsp;<span class='text-bold'>127</span>, 965--970.",
	"",
	""
]
k++;

optDef[k] = [
	["T","Language field",""],
	["0","","No language field",""],
	["l","lang","Add language field","to switch hyphenation patterns temporarily"]
]
prevDef[k] = [
	"<div id='TFR'>&nbsp;</div>",
	"<span class='text-normal'>Default is English, for <span class='text-italic'>and, chapter, editor,</span> etc.</span>",
	"<span class='text-normal'>Adds the language field for switching language for one reference only by means of the <span class='text-type'>&#92;setlanguge</span> command in <span class='text-type'>babel</span>.</span>"
]
k++;

optDef[k] = [
	["T","Annotations",""],
	["0","","No annotations","will be recognized"],
	["a","annote","Annotations","in annote field or in <span class='text-type'>.tex</span> file of citekey name"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"<span class='text-normal'>No annotations.</span>",
	"<span class='text-normal'>Annotations enabled, with <span class='text-type'>annote</span> field.</span>"
]
k++;
	
optDef[k] = [
	["T","Presentations",""],
	["0","","Do not add presentation type","for conference talks"],
	["p","pres","Add presentation, speaker not highlighted",""],
	["b","pres,pres-bf","Presentation, speaker bold face",""],
	["i","pres,pres-it","Presentation, speaker italic",""],
	["c","pres,pres-sc","Presentation, speaker in small caps",""]
]
prevDef[k] = [
	"<div>Presentation&nbsp;&mdash;&nbsp;<span id='TFR'>&nbsp;</span></div>",
	"not added",
	"speaker",
	"<span class='text-bold'>speaker</span>",
	"<span class='text-italic'>speaker</span>",
	"<span class='text-sc'>speaker</span>"
]
k++;

optDef[k] = [
	["T","Ordering of references","double","myTemp","T","numerical","T"],
	["0","","Alphabetical","by all authors"],
	["c","seq-no","Citation order","(unsorted, like <span class='text-type'>unsrt.bst</span>)"],
	["d","seq-yr","Year ordered","and then by authors"],
	["r","seq-yrr","Reverse year ordered","and then by authors"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"[<span class='text-bold'>Al</span>tarelli and Parisi(1977)]&hellip;<br /> [<span class='text-bold'>Ar</span>kani-Hamed et al.(1998)]&hellip; <br /> [<span class='text-bold'>Ca</span>ndelas et al.(1985)]&hellip;",
	"[<span class='text-bold'>W</span>einberg(1967)]&nbsp;&hellip;<br /> [<span class='text-bold'>M</span>aldacena(1998)]&nbsp;&hellip; <br /> [<span class='text-bold'>S</span>alam(1980)]&nbsp;&hellip;",
	"[Glashow(<span class='text-bold'>1961</span>)]&nbsp;&hellip;<br />[Goldstone(<span class='text-bold'>1961</span>)]&nbsp;&hellip;<br /> [Weinberg(<span class='text-bold'>1967</span>)]&nbsp;&hellip;",
	"[Weinberg(<span class='text-bold'>1967</span>)]&nbsp;&hellip;<br /> [Glashow(<span class='text-bold'>1961</span>)]&nbsp;&hellip;<br /> [Goldstone(<span class='text-bold'>1961</span>)]&nbsp;&hellip;"
]
k++;

optDef[k] = [
	["T","Ordering of references","numerical","F"],
	["0","","Alphabetical","by all authors"],
	["l","seq-lab","By label","(Jones before Jones and James before Jones et al)"],
	["k","seq-key","By label and cite key","instead of label and title, as above"],
	["d","seq-yr","Year ordered","and then by authors (for publication lists)"],
	["r","seq-yrr","Reverse year ordered","and then by authors (most recent first)"],
	["c","seq-no","Citation order","(unsorted, only meaningful for numericals)"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"[<span class='text-bold'>Go</span>ldstone (1961)]&nbsp;&hellip;<br/> [<span class='text-bold'>Go</span>ldstone et al.(1962)]&nbsp;&hellip;<br/> [<span class='text-bold'>We</span>inberg (1967)]&nbsp;&hellip;<br /> [<span class='text-bold'>Wi</span>tten (1998)]&nbsp;&hellip;",
	"[Goldstone (1961)]&nbsp;&hellip;<br/> [Goldstone et al.(1962)]&nbsp;&hellip;<br/> [Weinberg (1967)]&nbsp;&hellip;<br /> [Witten (1998)]&nbsp;&hellip;", // how to distinguish???
	"[Goldstone (1961)]&nbsp;&hellip;<br/> [Goldstone et al.(1962)]&nbsp;&hellip;<br/> [Weinberg (1967)]&nbsp;&hellip;<br /> [Witten (1998)]&nbsp;&hellip;", // how to distinguish???
	"[Glashow (<span class='text-bold'>1961</span>)]&nbsp;&hellip;<br/> [Weinberg (<span class='text-bold'>1967</span>)]&nbsp;&hellip;<br/> [Witten (<span class='text-bold'>1998</span>)]&nbsp;&hellip;<br/> [Maldacena (<span class='text-bold'>1998</span>)]&nbsp;&hellip;",
	"[Maldacena (<span class='text-bold'>1998</span>)]&nbsp;&hellip;<br/> [Witten (<span class='text-bold'>1998</span>)]&nbsp;&hellip;<br/> [Weinberg (<span class='text-bold'>1967</span>)]&nbsp;&hellip;<br/> [Glashow (<span class='text-bold'>1961</span>)]&nbsp;&hellip;",
	"[Weinberg (1967)]&nbsp;&hellip;<br/> [Maldacena (1998)]&nbsp;&hellip;<br/> [Witten (1998)]&nbsp;&hellip;<br/> [Glashow (1961)]&nbsp;&hellip;"
]
k++;

optDef[k] = [
	["T","Order on von part","nonPrevious","c"],
	["0","","Sort on von part","(de la Maire before Defoe)"],
	["x","vonx","Sort without von part","(de la Maire after Mahone)"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"[<span class='text-bold'>Vok</span>rouhlicky et al.(2011)]&nbsp;&hellip;<br /> [<span class='text-bold'>von</span> Smekal et al.(1997)]&nbsp;&hellip;<br /> [<span class='text-bold'>Wei</span>nberg(1967)]&nbsp;&hellip;",
	"[<span class='text-bold'>Sma</span>il et al.(1997)]&nbsp;&hellip;<br /> [von <span class='text-bold'>Sme</span>kal et al.(1997)]&nbsp;&hellip;<br /> [<span class='text-bold'>Spe</span>rgel et al.(2003)]&nbsp;&hellip;"
]
k++;

optDef[k] = [
	["T","Author names",""],
	["0","ed-au","Full, surname last","(John Frederick Smith)"],
	["f","nm-revf","Full, surname first","(Smith, John Frederick)"],
	["i","nm-init,ed-au","Initials + surname","(J. F. Smith)"],
	["r","nm-rev","Surname + initials","(Smith, J. F.)"],
	["s","nm-rv","Surname + dotless initials","(Smith J F)"],
	["w","nm-rvvc","Surname + comma + spaceless initials","(Smith, J.F.)"],
	["x","nm-rvx","Surname + pure initials","(Smith JF)"],
	["y","nm-rvcx","Surname + comma + pure initials","(Smith, JF)"],
	["z","nm-rvv","Surname + spaceless initials","(Smith J.F.)"],
	["a","nm-rev1","Only first name reversed, initials","(AGU style: Smith, J. F., H. K. Jones)"],
	["b","nm-revv1","First name reversed, with full names","(Smith, John Fred, Harry Kab Jones)"]
]
prevDef[k] = [
	"<div>[1]&nbsp;<span id='TFR'>&nbsp;</span></div> <div>The Large N limit of superconformal field theories and supergravity. <span class='text-italic'>Adv. Theor. Math. Phys.</span>, 127:965--970, 1962.</div>",
	"<span class='text-bold'>Juan Martin Maldacena</span>",
	"<span class='text-bold'>Maldacena, Juan Martin </span>",
	"<span class='text-bold'>J. M. Maldacena</span>",
	"<span class='text-bold'>Maldacena, J. M.</span>",
	"<span class='text-bold'>Maldacena J M</span>",
	"<span class='text-bold'>Maldacena, J.M.</span>",
	"<span class='text-bold'>Maldacena JM</span>",
	"<span class='text-bold'>Maldacena, JM</span>",
	"<span class='text-bold'>Maldacena J.M.</span>",
	"<span class='text-bold'>Maldacena, J. M., I. Swanson</span>",
	"<span class='text-bold'>Maldacena, Juan Martin, Ian Swanson</span>"
]
ifDef[k] = [["def","myTemp","F"],["f","myTemp","T"],["r","myTemp","T"],["s","myTemp","T"],
	["x","myTemp","T"],["y","myTemp","T"],["a","myTemp","T"],["b","myTemp","T"]];
k++;

optDef[k] = [
	["T","Editor names in collections","double","myTemp","T","hidValue","r"],
	["0","","Editor names NOT reversed","as edited by J. J. Smith"],
	["r","ed-rev","Editor names reversed","just like authors'"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]	
k++;

optDef[k] = [
	["T","Editor names in collections","double","myTemp","T","hidValue","s"],
	["0","","Editor names NOT reversed","as edited by J J Smith"],
	["r","ed-rev","Editor names reversed","just like authors'"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Editor names in collections","double","myTemp","T","hidValue","a"],
	["0","","Editor names NOT reversed","as edited by J. J. Smith"],
	["r","ed-rev","Editor names reversed","just like authors'"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Editor names in collections","double","myTemp","T","hidValue","x"],
	["0","","Editor names NOT reversed","as edited by JJ Smith"],
	["r","ed-rev","Editor names reversed","just like authors'"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Editor names in collections","double","myTemp","T","hidValue","f"],
	["0","","Editor names NOT reversed","as edited by John James Smith"],
	["r","ed-rev","Editor names reversed","just like authors'"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Editor names in collections","double","myTemp","T","hidValue","y"],
	["0","","Editor names NOT reversed","as edited by J.J. Smith"],
	["r","ed-rev","Editor names reversed","just like authors'"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Editor names in collections","double","myTemp","T","hidValue","b"],
	["0","","Editor names NOT reversed","as edited by John James Smith"],
	["r","ed-rev","Editor names reversed","just like authors'"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Position of junior","myTemp","T"],
	["0","jnrlst","Junior comes last","as Smith, John, Jr."],
	["r","","Junior between","as Smith, Jr., John"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Junior part in the citation","numerical","F"],
	["0","","No `junior' part in the citations","but in the ref listing"],
	["j","jnrlab","`Junior' in citations","as well as in ref listing"]
]
prevDef[k] = [
	"<div>[Spitzer <span id='TFR'>&nbsp;</span> (1942)] Lyman Spitzer Jr. The Dynamics of the Interstellar Medium. 3. Galactic Distribution. Astrophys.J., 95:329–344, 1942.</div>",
	"&nbsp;",
	"<span class='text-bold'>Jr.</span>"
]
k++;

optDef[k] = [
	["T","Punctuation between author names",""],
	["0","","Author names separated by commas",""],
	["s","aunm-semi","Names separated by semi-colon",""],
	["h","aunm-sl","Names separated by slash","/"]
]
prevDef[k] = [
	"<div class='displayTd'>[1]&nbsp;<span id='TFR'>&nbsp;</span></div> Broken Symmetries. <span class='text-italic'>Phys. Rev.</span>, 127:965--970, 1962.</div>",
	"Goldstone J.<span class='text-bold'>,</span> Salam A.<span class='text-bold'>,</span> and Weinberg S.",
	"Goldstone J.<span class='text-bold'>;</span> Salam A.<span class='text-bold'>;</span> and Weinberg S.",
	"Goldstone J.<span class='text-bold'>/</span> Salam A.<span class='text-bold'>/</span> and Weinberg S."
]
k++;

optDef[k] = [
	["T","Adjacent references with repeated names",""],
	["0","","Author/editor names always present",""],
	["d","nmdash","Repeated author/editor names replaced by dash",""],
	["2","nmdash,nmd-2","Repeated author/editor names replaced by 2 dashes",""],
	["3","nmdash,nmd-3","Repeated author/editor names replaced by 3 dashes",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3",
	"4"
]
k++;

optDef[k] = [
	["T","Number of authors in bibliography",""],
	["0","","All authors","included in listing"],
	["l","nmlm","Limited authors","(et al replaces missing names)"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
ifDef[k] = [["def","myTemp","F"],["l","myTemp","T"]]
k++;

optDef[k] = [
	["T","Maximum number of authors (1-99)","myTemp","T","getMax"],
	["0","m1","Your choice is above.",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1"
]
k++;

optDef[k] = [
	["T","Minimum number of authors","myTemp","T","getMin"],
	["0","x1","Your choice is above.",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1"
]
k++;

optDef[k] = [
	["T","Authors in citations",""],
	["*","","One author et al","for three or more authors"],
	["m","mcite","Some other truncation scheme",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
ifDef[k] = [["def","myTemp","F"],["m","myTemp","T"]];
k++;

optDef[k] = [
	["T","Max authors before et al","myTemp","T"],
	["*","mct-1","One et al",""],
	["2","mct-2","One, Two et al",""],
	["3","mct-3","One, Two, Three et al",""],
	["4","mct-4","One, Two, Three, Four et al",""],
	["5","mct-5","One, Two, Three, Four, Five et al",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3",
	"4",
	"5"
]
k++;

optDef[k] = [
	["T","Max authors without et al","myTemp","T"],
	["*","mct-x2","Two authors","without truncating"],
	["3","mct-x3","Three authors","without truncating"],
	["4","mct-x4","Four authors","without truncating"],
	["5","mct-x5","Five authors","without truncating"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3",
	"4"
]
k++;

optDef[k] = [
	["T","Typeface for authors in list of references",""],
	["*","","Normal font for author names",""],
	["s","nmft,nmft-sc","Small caps authors","(<span class='text-type'>&#92;sc</span>)"],
	["i","nmft,nmft-it","Italic authors","(<span class='text-type'>&#92;it</span> or <span class='text-type'>&#92;em</span>)"],
	["b","nmft,nmft-bf","Bold authors","(<span class='text-type'>&#92;bf</span>)"],
	["u","nmft,nmft-def","User defined author font","(<span class='text-type'>&#92;bibnamefont</span>)"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3",
	"4",
	"5"
]
ifDef[k] = [["def","myTemp","F"],["i","myTemp","T"],["s","myTemp","T"],["b","myTemp","T"],["u","myTemp","T"]];
k++;

optDef[k] = [
	["T","Font for first names","myTemp","T"],
	["*","","First names same font as surnames",""],
	["r","fnm-rm","First names in normal font",""],
	["u","fnm-def","First names in user defined font","(<span class='text-type'>&#92;bibnamefont</span>)"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3"
]
k++;

optDef[k] = [
	["T","Editor names in incollection etc.","myTemp","T"],
	["*","","Editors incollection normal font",""],
	["r","nmfted","Editors incollection like authors","font"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Font for &lsquo;and&rsquo; in list","myTemp","T"],
	["*","","&lsquo;And&rsquo; in author font","(JONES AND JAMES)"],
	["r","nmand-rm","&lsquo;And&rsquo; in normal font","(JONES and JAMES)"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Font of citation labels in text","numerical","F"],
	["*","","Cited authors plain","as result of <span class='text-type'>&#92;cite</span> command"],
	["i","lab, lab-it","Cited authors italic",""],
	["s","lab, lab-sc","Cited authors small caps",""],
	["b","lab, lab-bf","Cited authors bold",""],
	["u","lab, lab-def","User defined citation font","(<span class='text-type'>&#92;citenamefont</span>)"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3",
	"4",
	"5"
]
ifDef[k] = [["def","myTemp","F"],["i","myTemp","T"],["s","myTemp","T"],["b","myTemp","T"],["u","myTemp","T"]];
k++;

optDef[k] = [
	["T","Font for &lsquo;and&rsquo; in citations","myTemp","T"],
	["*","","Cited &lsquo;and&rsquo; in author font",""],
	["r","and-rm","Cited &lsquo;and&rsquo; in normal font",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Font of extra label (the extra letter on the year)","myTemp","T"],
	["*","","Extra label plain",""],
	["i","xlab-it","Extra label italic",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Label when authors missing","numerical","F"],
	["*","keyxyr","Year blank when KEY replaces missing author","(for natbib 7.0)"],
	["y","","Year included when KEY replaces missing author",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Missing date","numerical","F"],
	["*","","Missing date set to ????","in label and text"],
	["b","blkyear","Missing date left blank",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Date position",""],
	["*","","Date at end",""],
	["b","dt-beg","Date after authors",""],
	["j","dt-jnl","Date part of journal spec.","(as 1994;45:34-40) else at end"],
	["e","dt-end","Date at very end","after any notes"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3",
	"4"
]
ifDef[k] = [["def","myTemp","F"],["b","myTemp","T"],["j","myTemp","T"]];
k++;

optDef[k] = [
	["T","Date format","numerical","T"],
	["*","","Plain month and year","without any brackets"],
	["p","yr-par","Date in parentheses","as (May 1993)"],
	["b","yr-brk","Date in brackets","as [May 1993]"],
	["c","yr-col","Date preceded by colon","as &lsquo;: May 1993&rsquo;"],
	["d","yr-per","Date preceded by period","as &lsquo;. May 1993&rsquo;"],
	["m","yr-com","Date preceded by comma","as &lsquo;, May 1993&rsquo;"],
	["s","yr-blk","Date preceded by space","only, as &lsquo; May 1993&rsquo;"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7"
]
k++;

optDef[k] = [
	["T","Suppress month","numerical","T"],
	["*","","Date is month and year",""],
	["x","xmth","Date is year only",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Reversed date","double","numerical","T","hidValue",""],
	["*","","Date as month year",""],
	["r","dtrev","Date as year month",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Date format","numerical","F"],
	["*","","Year plain","without any brackets"],
	["p","yr-par","Year in parentheses","as (1993)"],
	["b","yr-brk","Year in brackets","as [1993]"],
	["c","yr-col","Year preceded by colon","as &lsquo;: 1993&rsquo;"],
	["d","yr-per","Year preceded by period","as &lsquo;. 1993&rsquo;"],
	["m","yr-com","Date preceded by comma","as &lsquo;, 1993&rsquo;"],
	["s","yr-blk","Year preceded by space","only, as &lsquo; 1993&rsquo;"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7"
]
k++;

optDef[k] = [
	["T","Include months","numerical","F"],
	["*","","Date is year only","without the month"],
	["m","aymth","Include month in date",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Reversed date","double","numerical","F","hidValue","m"],
	["*","","Date as month year",""],
	["r","dtrev","Date as year month",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Date punctuation","myTemp","T"],
	["*","","Date with standard block punctuation","(comma or period)"],
	["c","yrp-col","Colon after date","as 1994:"],
	["s","yrp-semi","Semi-colon after date","as 1994;"],
	["p","yrp-per","Period after date","even when blocks use commas"],
	["x","yrp-x","No punct. after date",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3",
	"4",
	"5"
]
k++;

optDef[k] = [
	["T","Blank after date","myTemp","T"],
	["*","","Space after date","and punctuation"],
	["x","yrpp-xsp","No space after date","as 1994:45"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Date font",""],
	["*","","Date in normal font",""],
	["b","dtbf","Date in bold face",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Truncate year","numerical","F"],
	["*","note-yr","Year text full","as 1990&mdash;1993 or &lsquo;in press&rsquo;"],
	["t","","Year truncated","to last 4 digits"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Title of article",""],
	["*","","Title plain","with no special font"],
	["i","tit-it","Title italic","(&#92;em)"],
	["q","tit-qq,qt-s","Title and punctuation in single quotes","(&lsquo;Title,&rsquo; ...)"],
	["d","tit-qq","Title and punctuation in double quotes","(&ldquo;Title,&rdquo; ...)"],
	["g","tit-qq,qt-g","Title and punctuation in guillemets","(&laquo;Title,&raquo; ...)"],
	["x","tit-qq,qt-s,qx","Title in single quotes","(&lsquo;Title&rsquo;, ...)"],
	["y","tit-qq,qx","Title in double quotes","(&ldquo;Title&rdquo;, ...)"],
	["z","tit-qq,qt-g,qx","Title in guillemets","(&laquo;Title&raquo;, ...)"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8"
]
ifDef[k] = [["def","myTemp","F"],["q","myTemp","T"],["d","myTemp","T"],["g","myTemp","T"],["x","myTemp","T"],["y","myTemp","T"],["z","myTemp","T"]];
k++;

optDef[k] = [
	["T","Collection/proceedings titles","myTemp","T"],
	["*","bt-qq","Quote collection and proceedings titles","too"],
	["x","","Collection and proceedings titles not in quotes",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Capitalization of article title",""],
	["*","","Sentence style","(capitalize first word and those in braces)"],
	["t","atit-u","Title style","(just as in bib entry)"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Article title present",""],
	["*","","Article title present","in journals and proceedings"],
	["x","jtit-x","No article title",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Journal names",""],
	["*","","Periods in journal names","are retained, as &lsquo;Phys. Rev.&rsquo;"],
	["x","jxper","Dotless journal names","as &lsquo;Phys Rev&rsquo;"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Journal name font",""],
	["*","","Journal name italics",""],
	["r","jttl-rm","Journal name normal","font"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Thesis title",""],
	["*","","Thesis titles like books",""],
	["a","thtit-a","Thesis title like article",""],
	["x","thtit-x","No thesis title",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3"
]
k++;

optDef[k] = [
	["T","Technical report title",""],
	["*","","Tech. report title like articles",""],
	["b","trtit-b","Tech. report title like books",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Technical report number",""],
	["*","","Tech. report and number plain","as &lsquo;Tech. Rep. 123&rsquo;"],
	["i","trnum-it","Tech. report and number italic","as <span class='text-type'>&lsquo;&#92;it</span> Tech. Rep. 123&rsquo;"],
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Journal volume",""],
	["*","","Volume plain","as vol(num)"],
	["i","vol-it","Volume italic","as &#123;<span class='text-type'>&#92;em</span> vol&#125;(num)"],
	["b","vol-bf","Volume bold","as &#123;<span class='text-type'>&#92;bf</span> vol&#125;(num)"],
	["d","vol-2bf","Volume and number bold","as &#123;<span class='text-type'>&#92;bf</span> vol(num)&#125;"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3"
]
k++;

optDef[k] = [
	["T","Journal vol and number",""],
	["*","","Journal vol(num)","as 34(2)"],
	["s","vnum-sp","Journal vol (num)","as 34 (2)"],
	["c","vnum-cm","Journal vol, num","as 34, 2"],
	["n","vnum-nr","Journal vol, no. num","as 34, no. 2"],
	["h","vnum-h","Journal vol, &#35; number","as 34, &#35;2"],
	["b","vnum-b","Journal vol number","as 34 2"],
	["x","vnum-x","Journal vol, without number","as 34"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7"
]
k++;

optDef[k] = [
	["T","Volume punctuation",""],
	["*","","Volume with colon","as vol(num):ppp"],
	["s","volp-sp","Volume with colon and space","as vol(num): ppp"],
	["h","volp-semi","Volume with semi-colon","as vol(num); ppp"],
	["c","volp-com","Volume with comma","as vol(num), ppp"],
	["b","volp-blk","Volume with blank","as vol(num) ppp"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3",
	"4",
	"5"
]
k++;

optDef[k] = [
	["T","Year in journal specification",""],
	["*","","Journal year like others","as given by date position"],
	["v","jdt-v","Journal vol(year)","as 34(1995)"],
	["s","jdt-vs","Journal vol (year)","as 34 (1995)"],
	["p","jdt-p","Year with pages","as 34(2), (1995) 1345&mdash;1387"],
	["c","jdt-pc","Year, comma, pages","as 34(2), (1995), 1345&mdash;1387"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3",
	"4",
	"5"
]
k++;

optDef[k] = [
	["T","Pages numbers",""],
	["*","","Start and stop page numbers","given"],
	["f","jpg-1","Only start page number",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Large page numbers",""],
	["*","","No separators for large page numbers",""],
	["c","pgsep-c","Comma inserted over 9999","as 11,234"],
	["s","pgsep-s","Thin space inserted over 9999","as 11 234"],
	["p","pgsep-p","Period inserted over 9999","as 11.234"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3",
	"4"
]
k++;

optDef[k] = [
	["T","Word &lsquo;page&rsquo; in articles",""],
	["*","","Article pages numbers only","as 234-256"],
	["p","jwdpg","Include &lsquo;page&rsquo; in articles","as pp. 234&mdash;256"]	
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Position of pages",""],
	["*","","Pages given mid text","as is normal"],
	["e","pp-last","Pages at end","but before any notes"]	
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Word &lsquo;volume&rsquo; in articles",""],
	["*","","Article volume as number only","as 21"],
	["p","jwdvol","Include &lsquo;volume&rsquo; in articles","as vol. 21"]	
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Number and series for collections",""],
	["*","num-xser","Allows number without series","and suppresses word 'number'"],
	["s","","Standard BibTeX","as: 'number 123 in Total Works'; error if number and no series"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Position of number and series",""],
	["*","","After chapter and pages","as in standard BibTeX"],
	["t","numser","Just before publisher","or organization"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Volume and series for books/collections",""],
	["*","","Vol. 23 of Series","as in standard BibTeX"],
	["s","ser-vol","Series, vol. 23",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Position of volume and series for incollections",""],
	["*","","Series and volume after the editors",""],
	["e","ser-ed","Series and volume after booktitle","and before editors"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Journal name punctuation",""],
	["*","","Comma after journal","name"],
	["x","jnm-x","Space after journal","name"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Book title",""],
	["*","","Book title italic","(<span class='text-type'>&#92;em</span>)"],
	["p","btit-rm,bt-rm","Book title plain","(no font command)"],
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Pages in books",""],
	["*","","Pages in book plain","as pp. 50-55"],
	["p","bkpg-par","Pages in book in parentheses","as (pp. 50-55)"],
	["x","bkpg-x","Pages in book bare","as 50-55"]	
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3"
]
k++;

optDef[k] = [
	["T","Total pages of a book",""],
	["*","","Total book pages not printed",""],
	["p","pg-bk","For book: 345 pages","or pp."],
	["a","pg-bk,pg-pre","Total book pages before publisher",""],
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3"
]
k++;

optDef[k] = [
	["T","Publisher address",""],
	["*","","Publisher, address","as Harcourt, New York"],
	["a","add-pub","Address: Publisher","as New York: Harcourt"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Publisher in parentheses",""],
	["*","","Publisher as normal block","without parentheses"],
	["p","pub-par","Publisher in parentheses",""],
	["d","pub-date","Publisher and date in parentheses","(Oxford, 1994)"],
	["c","pub-date,pub-xc","Publisher and date in parentheses, no comma","(Oxford 1994)"],
	["f","pub-date,pub-xpar","Publisher and date without parentheses","Oxford, 1994"],
	["k","pub-date,pub-xpar,pub-xc","Publisher and date, no parentheses, no comma","Oxford 1994"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6"
]
k++;

optDef[k] = [
	["T","Publisher position",""],
	["*","","Publisher after chapter, pages",""],
	["p","pre-pub","Publisher before chapter, pages",""],
	["e","pre-edn","Publisher after edition",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3"
]
k++;

optDef[k] = [
	["T","ISBN number",""],
	["*","isbn","Include ISBN","for books, booklets, etc."],
	["x","","No ISBN",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","ISSN number",""],
	["*","issn","Include ISSN","for periodicals"],
	["x","","No ISSN",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","DOI number",""],
	["*","doi","Include DOI","as 'doi: number'"],
	["a","agu-doi,doi","Insert DOI AGU style","as part of page number"],
	["x","","No DOI",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3"
]
k++;

optDef[k] = [
	["T","&lsquo;Editor&rsquo; after names (edited books without authors)",""],
	["*","","Word &lsquo;editor&rsquo; after name",""],
	["a","edpar","&lsquo;Name (editor),&rsquo;","in parentheses, after name, comma after"],
	["b","edpar,bkedcap","&lsquo;Name (Editor),&rsquo;","as above, editor upper case"],
	["c","edparc","&lsquo;Name, (editor)&rsquo;","in parentheses, after name, comma between"],
	["d","edparc,bkedcap","&lsquo;Name, (Editor)&rsquo;","as above, editor upper case"],
	["e","edparxc","&lsquo;Name (editor)&rsquo;","in parentheses, after name, no commas"],
	["f","edparxc,bkedcap","&lsquo;Name (Editor)&rsquo;","as above, editor upper case"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7"
]
k++;

optDef[k] = [
	["T","Editor in collections",""],
	["*","","Same as for edited book","(names before booktitle)"],
	["b","edby","In booktitle, edited by ...","(where ... is names)"],
	["p","edby-par","In booktitle (edited by ...)",""],
	["c","edby-parc","In booktitle, (edited by ...)",""],
	["e","edby,edbyx","In booktitle, editor ...",""],
	["f","edby,edbyw","In booktitle, (editor) ...",""],
	["k","edby-par,edbyx","In booktitle (editor ...)",""],
	["g","edby-parc,edbyx","In booktitle, (editor ...)",""],
	["j","edby,edbyy","In booktitle, ..., editor",""],
	["m","edby-par,edbyy","In booktitle (..., editor)",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10"
]
ifDef[k] = [["def","myTemp","F"],["p","myTemp","T"],["k","myTemp","T"],["c","myTemp","T"],["f","myTemp","T"]];
k++;

optDef[k] = [
	["T","Capitalize &lsquo;editor&rsquo; or &lsquo;edited by&rsquo;","myTemp","T"],
	["*","","&lsquo;(editor, ...)&rsquo; or &lsquo;(edited by ...)&rsquo;","in lower case"],
	["c","edcap","&lsquo;(Editor, ...)&rsquo; or &lsquo;(Edited by ...)&rsquo;","in upper case"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Punctuation between sections (blocks)",""],
	["*","","<span class='text-type'>&#92;newblock</span> after blocks","(periods or new lines with openbib option)"],
	["c","blk-com","Comma between blocks",""],
	["s","blk-com,com-semi","Semi-colon between blocks",""],
	["b","blk-com,com-blank","Blanks between blocks",""],
	["t","blk-tit","Period after titles of articles, books, etc","else commas"],
	["u","blk-tit,tit-col","Colon after titles of articles, books, etc","else commas"],
	["a","blk-tita","Period after titles of articles","else commas"],
	["d","blk-tita,tit-col","Colon after titles of articles","else commas"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8"
]
ifDef[k] = [["def","myTemp","F"],["c","myTemp","T"],["s","myTemp","T"],["b","myTemp","T"],["t","myTemp","T"],["a","myTemp","T"]];
k++;

optDef[k] = [
	["T","Punctuation before notes","myTemp","T"],
	["*","","Notes have regular punctuation","like all other blocks"],
	["p","blknt","Notes preceded by period",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Punctuation after authors",""],
	["*","","Author block normal","with regular block punctuation"],
	["c","au-col","Author block with colon",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Punctuation after &lsquo;in&rsquo;",""],
	["*","","Space after &lsquo;in&rsquo;","for incollection or inproceedings"],
	["c","in-col","Colon after &lsquo;in&rsquo;","(as &lsquo;In: ...&rsquo;)"],
	["i","in-it","Italic &lsquo;in&rsquo;","and space"],
	["d","in-col,in-it","Italic &lsquo;in&rsquo; and colon",""],
	["x","in-x","No word &lsquo;in&rsquo;","for edited works"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3",
	"4",
	"5"
]
k++;

optDef[k] = [
	["T","&lsquo;In&rsquo; with journal names","nonPrevious","x"],
	["*","","No &lsquo;in&rsquo; before journal name",""],
	["i","injnl","Add &lsquo;in&rsquo; before journal name","in style for incollection"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Final punctuation",""],
	["*","","Period at very end","of the listed reference"],
	["x","fin-bare","No period at end",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

// external language file \cfile
optDef[k] = [
	["T","Abbreviated word &lsquo;pages&rsquo;",""],
	["*","","&lsquo;Page(s)&rsquo;","(no abbreviation)"],
	["a","pp","&lsquo;Page&rsquo; abbreviated","as p. or pp."],
	["x","ppx","&lsquo;Page&rsquo; omitted",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3"
]
k++;

optDef[k] = [
	["T","Abbreviated word &lsquo;editors&rsquo;",""],
	["*","","&lsquo;Editor(s)&rsquo;","(no abbreviation)"],
	["a","ed","&lsquo;Editor&rsquo; abbreviated","as ed. or eds."]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Other abbreviations",""],
	["*","","No abbreviations","of volume, edition, chapter, etc."],
	["a","abr","Abbreviations","of such words"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
ifDef[k] = [["def","myTemp","F"],["a","myTemp","T"]];
k++;

optDef[k] = [
	["T","Abbreviation for &lsquo;edition&rsquo;","myTemp","T"],
	["*","","&lsquo;Edition&rsquo; abbreviated as &lsquo;edn&rsquo;",""],
	["a","ednx","&lsquo;Edition&rsquo; abbreviated as &lsquo;ed&rsquo;",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Months with dots","myTemp","T"],
	["*","","Months with dots","as Jan."],
	["x","mth-bare","Months without dots","as Feb Mar"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Edition numbers",""],
	["*","xedn","Editions as in database","saving much processing memory"],
	["w","","Write out editions","as first, second, third, etc."],
	["n","ord","Numerical editions","as 1st, 2nd, 3rd, etc."]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3"
]
k++;
// external language file \cfile


optDef[k] = [
	["T","Stored journal names",""],
	["*","","Full journal names","for prestored journals"],
	["a","jabr","Abbreviated journal names",""],
	["s","jabr,jaa","Abbreviated with astronomy shorthands","like ApJ and AJ"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3"
]
k++;

optDef[k] = [
	["T","Ampersand",""],
	["*","","Use word &lsquo;and&rsquo;","in author lists"],
	["a","amper","Use ampersand","in place of &lsquo;and&rsquo;"],
	["v","varand","Use <span class='text-type'>&#92;BIBand</span>","in place of &lsquo;and&rsquo;"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3"
]
k++;

optDef[k] = [
	["T","Comma before &lsquo;and&rsquo;",""],
	["*","","Comma before &lsquo;and&rsquo;","as &lsquo;Tom, Dick, and Harry&rsquo;"],
	["n","and-xcom","No comma before &lsquo;and&rsquo;","as &lsquo;Tom, Dick and Harry&rsquo;"],
	["c","and-com","Comma even with 2 authors","as &lsquo;Tom, and Harry&rsquo;"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3"
]
k++;

optDef[k] = [
	["T","Comma before &lsquo;and&rsquo; even for collection editors","previous","c"],
	["*","and-com-ed","Comma with 2 editors","in collections"],
	["x","","Two editors without comma","as &lsquo;Tom and Harry&rsquo;"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","No &lsquo;and&rsquo; in reference list",""],
	["*","","With &lsquo;and&rsquo;","before last author in reference list"],
	["x","xand","No &lsquo;and&rsquo;","as &lsquo;Tom, Dick, Harry&rsquo;"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Comma before &lsquo;et al&rsquo;",""],
	["*","","Comma before &lsquo;et al&rsquo;","in reference list"],
	["x","etal-xc","No comma before &lsquo;et al&rsquo;'",""]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Font of &lsquo;et al&rsquo;",""],
	["*","","Plain et al",""],
	["i","etal-it","Italic et al",""],
	["r","etal-rm","Roman et al","even when authors something else"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3"
]
k++;

optDef[k] = [
	["T","Additional RevTeX data fields",""],
	["*","","No additional fields","for REVTeX"],
	["r","revdata,eprint,url,url-blk","Include REVTeX data fields","collaboration, eid, eprint, archive, numpages, url"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
ifDef[k] = [["def","myTemp","T"],["r","myTemp","F"]];
k++;

optDef[k] = [
	["T","E-print data field","myTemp","T"],
	["*","","Do not include eprint field",""],
	["e","eprint","Include eprint and archive fields","for electronic publications"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","URL address","myTemp","T"],
	["*","","No URL","for electronic (Internet) documents"],
	["u","url,url-blk","Include URL","as regular item block"],
	["n","url,url-nt","URL as note",""],
	["l","url,url-nl","URL on new line","after rest of reference"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3",
	"4"
]
k++;

optDef[k] = [
	["T","Reference component tags",""],
	["*","","No reference component tags","in the <span class='text-type'>&#92;bibitem</span> entries"],
	["b","bibinfo","Reference component tags","like <span class='text-type'>&#92;bibinfo</span> in the content of <span class='text-type'>&#92;bibitem</span>"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

optDef[k] = [
	["T","Emphasis",""],
	["*","","Use emphasis","i. e., <span class='text-type'>&#92;em</span>, allows font switching"],
	["i","em-it","Use true italics","i. e., <span class='text-type'>&#92;it</span>, absolute italics"],
	["x","em-x","No italics","at all"],
	["u","em-ul","Underlining","in place of italics, best with <span class='text-type'>ulem</span> package"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2",
	"3",
	"4"
]
k++;

optDef[k] = [
	["T","Compatibility with plain TeX",""],
	["*","nfss","Use LaTeX commands","which may not work with Plain TeX"],
	["t","plntx","Use only Plain TeX","commands for fonts and testing"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"1",
	"2"
]
k++;

/*// Last option
optDef[k] = [
	["T","Last option",""],
	["*","","last option","nothing"]
]
prevDef[k] = [
	"<td><span id='TFR'>&nbsp;</span></td>",
	"*"
]
k++;*/

var lDef = optDef.length;
if (k != lDef) alert("Error: Uncomplete definition!");

/*******************************************************************/
function baseFunction() {
	var a = "nic ";
//	a += a + createBody(0,0,""," hhh");
//	alert(a);
	createBody(0,0,"");
	highLightR(1);	
}

// Interactively change the content of the page
// Note: createBody(pageId, pageIdOld, Parameters(a,b,c,...))

function createBody(i,a) {
	var w;
	var p = [];
	for (w in optDef[i]) {
		p[w] = [prevDef[i][w],optDef[i][w]];
	}

// Set header text
	var step = i+1;
	document.getElementById("topHeaderMark").innerHTML = "&nbsp;" + step + "&nbsp;of&nbsp;" + lDef;
	document.getElementById("topHeaderText").innerHTML = p[0][1][1];

// Set preview content
	var pc = document.getElementById("previewDiv");
//    pc.innerHTML = p[0][0].replace(/TFR/i,"<span class='textBold'><span id='change'>"+p[1][0]+"</span></span>");
	pc.innerHTML = p[0][0];
	var insEnv = document.createElement("span");
	insEnv.id = "change";
	insEnv.innerHTML = p[1][0];

	var rep = document.getElementById("TFR");
	if (rep != null) {
		rep.parentNode.replaceChild(insEnv,rep);
	}

// Set form with radiobuttons
	var oldDivPut = document.getElementById("divPut");
	var divPut = document.createElement("div");
	divPut.id = "divPut";

	var len = p.length;
	for (var x=0; x<len; x++) {
		switch (p[x][1][0]) {
			case "T":
				document.getElementById("hidValue").value = "";
			break;    
			default:
				var dput = document.createElement("div");
				var put = document.createElement("input");
				put.type = "radio";
				put.id = x;
				put.value = p[x][1][1];
				put.name = "chooseOpt";
	            //put.onclick = "tagTo(\"" + p[x][0] + "\",\"" + p[x][1][0] + "\",this.value)";
				if (x == 1) put.checked = true;
				dput.appendChild(put);

				var put2 = elementClassContent("span","textRadioBox",p[x][1][2]);
				dput.appendChild(put2);

				var put3 = elementClassContent("span","textComment","&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+p[x][1][3]);
				dput.appendChild(put3);
							
				dput.setAttribute("onclick", "tagTo(\"" + x + "\",\"" + p[x][0] + "\",\"" + p[x][1][0] + "\",\"" + p[x][1][1] + "\");" );
				dput.setAttribute("onmouseover", "tagOver(\"" + x + "\",\"" + p[x][0] + "\");" );
				dput.setAttribute("onmouseout", "tagOut(\"" + p[1][0] + "\");" );
				
				divPut.appendChild(dput);
		}
	}

	oldDivPut.parentNode.replaceChild(divPut,oldDivPut);	

	//var uTag = document.getElementById("noname");
	//uTag.setAttribute('onclick', 'alert('+ x + ')');
	
	var sub = document.getElementById("submitButton");
	sub.name = p[1][1][1];
	sub.setAttribute("onclick", "nextOption(" + i + ",this.name)");
	sub.focus();

	var back = document.getElementById("backButton");
	back.setAttribute("onclick", "previousOption()");
	//back.focus();

	var dh = document.getElementById("selectedText");
	dh.innerHTML = "Selected options";
	
	var dp = document.getElementById("Param"); 
	dp.innerHTML = getParameters(i);
	
	Nifty("div.outerRectangle","normal transparent");
	return i;
}

function nextOption(i,x) {
	
	parameters.push(i);
	parameters.push(x);

	if (i == (lDef-1)) finalResult();

	var ok = "";
	do	{
		var n;
		for (n in ifDef[i]) {
			if (ifDef[i][n] == "") break;
			if ((ifDef[i][n][0] == "def") || (ifDef[i][n][0] == document.getElementById("hidValue").value))
				document.getElementById(ifDef[i][n][1]).value = ifDef[i][n][2];
		}

		++i;
		if (optDef[i][0][2] != "") {
			switch (optDef[i][0][2]) {
			case "numerical":
				if (optDef[i][0][3] == document.getElementById("numerical").value ) {
					ok = "";
				} else {
					ok = "!";
				}
				break;
			case "myTemp":
				if (optDef[i][0][3] == document.getElementById("myTemp").value ) {
					if (optDef[i][0][4] == "getMax") getMax(i);
					if (optDef[i][0][4] == "getMin") getMin(i,x);
					ok = "";
				} else {
					ok = "!";
				}
				break;
			case "previous":
				if (optDef[i][0][3] == document.getElementById("hidValue").value ) {
					ok = "";
				} else {
					ok = "!";
				}
				break;
			case "nonPrevious":
				if (optDef[i][0][3] == document.getElementById("hidValue").value ) {
					ok = "!";
				} else {
					ok = "";
				}
				break;
			case "double":
				//alert(document.getElementById(optDef[i][0][3]).value +": "+optDef[i][0][4]+", "+document.getElementById(optDef[i][0][5]).value +": "+optDef[i][0][6]);
				if ((document.getElementById(optDef[i][0][3]).value == optDef[i][0][4]) &&
				    (document.getElementById(optDef[i][0][5]).value == optDef[i][0][6])) {
					ok = "";
				} else {
					ok = "!";
				}
				break;
			case "answer":
				alert("Test: "+i+". Answer "+optDef[i][0][2]);
				break;				
			default:
			}
		} else {
			ok = "";
		}
	} while (ok != "");
	
	createBody(i,"");
}

function previousOption() {
	parameters.pop();
	var l = parameters.length - 1;
	var j = 0;
	if (l>0) j = parameters[l];
	parameters.pop();
	//if (l = -1) j = 0;
	createBody(j,"");
}

// Display final result
function finalResult() {
	
	var divF = document.createElement("div");
	divF.id = "selection";
	
	var put =  document.createElement("div");
	put.id = "topContainer";
	var putIn = elementClassContent("span","topText","Selected options");
	putIn.id = "topHeaderText";
	put.appendChild(putIn);
	
	var put2 = document.createElement("div");
	put2.id = "previewContainer";
	put2.className = "outerRectangle";	
	var putIn2 =  document.createElement("div");
	putIn2.id = "previewDiv";
	putIn2.className = "innerRectangle";		
	putIn2.innerHTML = getParameters(lDef);
	put2.appendChild(putIn2);	
	put.appendChild(put2);
	divF.appendChild(put);

	var put3 = document.createElement("div");
	put3.id = "buttonContainer";
	put3.innerHTML = "<p>The most convenient way to save the above options is to save them as generated <span class='text-italic'>bibgen.dbj</span> file (Save File). This way requires HTML5.</p>" +
		"<p>Another possibility is to save the options as plain text (Save only Parameters) and to prepare <span class='text-italic'>bibgen.dbj</span> file by hand.</p>";
	var putIn3 = document.createElement("input");
	putIn3.type = "button";
	putIn3.id = "saveButton";
	putIn3.value = "Continue to Save";
	put3.appendChild(putIn3);
	divF.appendChild(put3);
	
	var divB = document.getElementById("selection");
	divB.parentNode.replaceChild(divF,divB);

	var save = document.getElementById("saveButton");
	save.name = "saveButton";
	save.setAttribute("onclick", "goToFormular()");

	Nifty("div.outerRectangle","normal transparent");
	highLightR(2);	
}

// Save file
function goToFormular() {
	var divB = document.getElementById("saveButton");

	var divF = document.createElement("div");
	divF.id = "divForma";
	
	var fileContent = "%% Driver file to produce " + bstGenFileName + ".bst\n" +
"%% Generated with Bst generator, version " + bstGenVersion + "\n" +
"%% Produced on " + Date() +"\n\n" +
"\\input docstrip\n" +
"\\preamble\n" +
"*** My style file ***\n" +
"\\endpreamble\n\n" +
"\\postamble\n" +
"End of customized bst file\n" +
"\\endpostamble\n\n" +
"\\keepsilent\n\n" +
"\\askforoverwritefalse\n" +
"\\def\\MBopts{\\from{merlin.mbs}{%\n%\n" +
					getParameters(lDef) +
					"\n%\n}}\n\\generate{\\file{" + bstGenFileName + ".bst}{\\MBopts}}\n\\endbatchfile";
					
	divF.innerHTML = "<form>"+
			"<p>" +
				"<label for='filename'>Filename</label><br />" +
				"<input type='text' name='filename' value='" + bstGenFileName + ".dbj' id='filename' />" +
			"</p>" +
			"<p>" +
				"<label for='data'>File Contents</label><br />" +
					"<textarea cols='60' rows='24' name='data' id='data'>" +
						fileContent +
					"</textarea>" +
			"</p>" +
			"<p>" +
				"<a class='gradient_button' alt='Download' id='saveButton' href='#'>Save File</a>" +
			"</p>" +
			"<p>" +
				"<a class='gradient_button' alt='Download' title='Save parameters' download='" +
				bstGenFileName + ".txt' href='data:text/plain," + getParameters(lDef) + "' onclick='highLightR(3)'>Save only Parameters</a>" +
			"</p>" +
		"</form>";
	
	// another format href='data:application/octet-stream'	
	divB.parentNode.replaceChild(divF,divB);	
	saveFile();
}

// Get parameters
function getParameters(i) {
	var longText = "";
	for (var l=1; l<parameters.length; l=l+2) {
		if (i < parameters[l-1]) break;
		var comma = (longText == "") ? "" : ",";
		var cOpt = (parameters[l] == "") ? "" : comma + parameters[l]; 
		longText = longText + cOpt;
	}
	return longText;	
}

function getParametersAll() {
	var longText = "";
	for (var l=1; l<parameters.length; l=l+2) {
		longText = longText + parameters[l-1] + ". : " + parameters[l] + "<br />";
	}
	return longText;	
}

// Show text function
function showTxt(t) {
	alert(t);
}

// Create one new element with defined class and content
function elementClassContent(tag, klas, content) {
    var x = document.createElement(tag);
    x.innerHTML = content;
    if (klas != "") x.className = klas;
    return x;
}

// Create one new element with content
function elementContent(tag, content) {
	var x = document.createElement(tag);
	x.innerHTML = content;
	return x;
}

function tagTo(i,x,y,z) {
	document.getElementById("change").innerHTML = x;
	document.getElementById("hidValue").value = y;    
	document.getElementById("submitButton").name = z;
	document.getElementById("submitButton").focus();
	document.getElementById(i).checked = true;
}

function tagOver(i,x) {
	if (document.getElementById("hidValue").value == "") {
		document.getElementById("change").innerHTML = x ;
		document.getElementById(i).checked = true;
	}
}

function tagOut(x) {
	if (document.getElementById("hidValue").value == "") {
		document.getElementById("change").innerHTML = x ;
		document.getElementById("1").checked = true;
	}
}

function onlyFocus() {
    document.getElementById("submitButton").focus();
}

function getMax(i) {
	do {
		var h = prompt("Set the maximum number of the authors per one entry (range 1-99):","5");
	} while ((h == null) || !(h >= 1 && h <= 99));
	optDef[i][1][1] = "m"+h;
	prevDef[i][1] = h;
	document.getElementById("submitButton").name = optDef[i][1][1];
}

function getMin(i,k) {
	var c = k.replace(/m/,"");
	c = c-1;
	do {
		var h = prompt("Set the minimum number of the authors in the range 1-"+c+" (before et al):","3");
	} while (!(h >= 1 && h <= c));
	optDef[i][1][1] = "x"+h;
	prevDef[i][1] = h;
	document.getElementById("submitButton").name = optDef[i][1][1];
}

function setIf(x,y) {
	document.getElementById(x).value = y;
}

function saveFile(){
	document.getElementById('saveButton').onclick = function(event){
		var data = function(){return document.getElementById('data').value};
		var filename = function(){return document.getElementById('filename').value};
		var json = JSON.stringify(data),
		blob = new Blob([json], {type: "octet/stream"}),
		url = window.URL.createObjectURL(blob);
  		this.href = url;
		this.target = '_blank';
		this.download = filename;
	}
}
	
function downLoadify(){
	Downloadify.create('downloadify',{
		filename: function(){
			return document.getElementById('filename').value;
		},
		data: function(){ 
			return document.getElementById('data').value;
		},
		onComplete: function(){ fine(); },
		onCancel: function(){ notFine() },
		onError: function(){ alert('You must put something in the File Contents or there will be nothing to save!'); },
		swf: 'fileadmin/templates/cml/./scripts/Downlodify/media/downloadify.swf',
		//downloadImage: 'fileadmin/templates/cml/./scripts/Downlodify/images/download.png',
		downloadImage: 'fileadmin/templates/cml/scripts/Downlodify/images/button.png',
		width: 153,
		height: 44,
		transparent: true,
		append: false
	});
}

function fine() {
	document.getElementById("divForma").innerHTML = "<p>Your file has been saved. Now follow the instructions in Step 3.</p>";
	document.getElementById("bottom").innerHTML = "<p><a class='gradient-button-1' href='http://www.podoblaz.net/cml/?bibgen'>Bst generator home page</a></p>";
	highLightR(3);
}
function notFine() {
	document.getElementById("bottom").innerHTML = "<p>You have cancelled the saving of file! <br />Please, try it again, or save the file manually " +
		"(<a href='http://kopimistsamfundet.se/english/' alt='Kopimism' title='Church of Kopimism'>Ctrl+C Ctrl+V</a>).<br />" +
		"Then follow the instructions in Step 3.</p>" +
		"<p><br /><a class='gradient-button-1' href='http://www.podoblaz.net/cml/?bibgen'>Bst generator home page</a></p>";
	highLightR(3);
}
	
function highLightR(n) {
	switch (n) {
			case 0:
				document.getElementById("step1").className = "inactive";
				document.getElementById("step2").className = "inactive";
				document.getElementById("step3").className = "inactive";
			break;
			case 1:
				document.getElementById("step1").className = "active";
				document.getElementById("step2").className = "inactive";
				document.getElementById("step3").className = "inactive";
			break;
			case 2:
				document.getElementById("step1").className = "inactive";
				document.getElementById("step2").className = "active";
				document.getElementById("step3").className = "inactive";
			break;
			case 3:
				document.getElementById("step1").className = "inactive";
				document.getElementById("step2").className = "inactive";
				document.getElementById("step3").className = "active";
			break;
			default:
				document.getElementById("step1").className = "active";
				document.getElementById("step2").className = "active";
				document.getElementById("step3").className = "active";
	}	
}

// To-do:
/*
- doplnit language field
- cistic !!!
*/
