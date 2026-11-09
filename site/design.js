const reportDetailsState=new Map();
function applyDesign(){
 const keys=['reporting','dailyHours','visits','approaches','presentations','closings','combined','units','totalHours'];
 const n=(k,fallback)=>Number.isFinite(Number(design[k]))?Math.max(0,Math.min(100,Number(design[k]))):fallback;
 const color=(k,fallback)=>/^#[0-9a-f]{6}$/i.test(design[k]||'')?design[k]:fallback;
 const size=(selector,key,fallback)=>`${selector}{font-size:${n(key,fallback)}pt!important}`;
 let css=`:root{--navy:${color('headerColor','#173e7c')};--blue:${color('numberColor','#2467db')};--bg:${color('pageBackground','#f4f7fb')}}
 .card.attention,.assessment{background:${color('issueBackground','#fff4df')}!important}
 .card.attention .metric,.card.attention h3,.assessmentGap strong:not(.secondaryIssue),.attentionLabel,.assessmentBadge{color:${color('issueColor','#b42318')}!important}
 .card{padding-top:${n('cardPadding',14)}px!important;padding-bottom:${n('cardPadding',14)}px!important;border-radius:${n('radius',13)}px!important}
 .cards{gap:${n('cardGap',16)}px!important}.staffReport{margin-bottom:${n('staffGap',28)}px!important}
 .cards{grid-template-columns:repeat(${design.columns==='2'?2:1},minmax(0,1fr))!important}
 .reportDetails{grid-column:1/-1;margin:0;border:1px solid var(--line);border-radius:10px;background:white;padding:14px}
 .reportDetails>summary{font-size:${n('labelSize',10.75)}pt;color:var(--navy);font-weight:700;cursor:pointer;padding:4px}
 .reportDetails>.cards{margin-top:14px}
 @media(max-width:600px){.cards{grid-template-columns:1fr!important}}
 `;
 for(const [s,k,v] of [['h1','titleSize',18.75],['.identity h2','staffSize',18.75],['.assessmentGap strong','issueSize',17],['.card h3','labelSize',10.75],['.card .metric','valueSize',16.5],['.card.attention .metric','primaryValueSize',21.5],['.card .unit','unitSize',14.75],['.card .progress,.card.attention .progress','progressSize',17.4],['.card .standard','standardSize',10],['.card .reportReminder','reminderSize',5.75],['.card .conversionLabel','conversionSize',11.75],['.card .attentionLabel','badgeSize',9]])css+=size(s,k,v);
 let style=document.getElementById('editableDesign');if(!style){style=document.createElement('style');style.id='editableDesign';document.head.append(style);}style.textContent=css;
 document.getElementById('title').textContent=(data?.areaLabel?data.areaLabel+'｜':'')+(design.title||'スタッフ別活動レポート');
 document.title=document.getElementById('title').textContent;
 document.querySelectorAll('.staffReport').forEach(staff=>{
  const container=staff.querySelector('[data-field="cards"]');
  const cards=[...staff.querySelectorAll('.card')];
  cards.forEach((card,i)=>{if(!card.dataset.metric)card.dataset.metric=keys[i];});
  cards.sort((a,b)=>n('order_'+a.dataset.metric,keys.indexOf(a.dataset.metric)+1)-n('order_'+b.dataset.metric,keys.indexOf(b.dataset.metric)+1)||keys.indexOf(a.dataset.metric)-keys.indexOf(b.dataset.metric));
  const details=document.createElement('details');details.className='reportDetails';
  const summary=document.createElement('summary');summary.textContent=design.detailsLabel||'詳細を見る';details.append(summary);
  const inner=document.createElement('div');inner.className='cards';details.append(inner);
  cards.forEach(card=>{
   const key=card.dataset.metric,place=design['placement_'+key]||(design['show_'+key]===false?'hidden':'main');
   card.hidden=place==='hidden';
   if(design['label_'+key])card.querySelector('h3').textContent=design['label_'+key];
   (place==='details'?inner:container).append(card);
  });
  staff.querySelectorAll('.reportDetails').forEach(x=>x.remove());
  if(inner.children.length){
   const identity=staff.querySelector('h2').textContent;
   details.open=reportDetailsState.has(identity)?reportDetailsState.get(identity):design.detailsOpen===true;
   details.addEventListener('toggle',()=>reportDetailsState.set(identity,details.open));
   container.append(details);
  }
  staff.querySelector('[data-field="assessment"]').hidden=design.showAssessment===false;
 });
 document.querySelectorAll('.reportReminder').forEach(x=>x.textContent=design.reminder??'出勤日数分の日報が入力されているかご確認ください');
 document.querySelectorAll('.attentionLabel,.assessmentBadge').forEach(x=>x.textContent=design.badge||'要確認');
 document.querySelectorAll('.standard').forEach(x=>{if(x.textContent.startsWith('10口達成者水準'))x.textContent=x.textContent.replace('10口達成者水準',design.standard||'10口達成者水準');});
}
