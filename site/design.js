const reportDetailsState=new Map();
function applyDesign(scope=document){
 const keys=['reporting','dailyHours','visits','approaches','presentations','closings','combined','contracts','units'];
 const n=(k,fallback)=>Number.isFinite(Number(design[k]))?Math.max(0,Math.min(100,Number(design[k]))):fallback;
 const color=(k,fallback)=>/^#[0-9a-f]{6}$/i.test(design[k]||'')?design[k]:fallback;
 const fontIncrease={labelSize:2,valueSize:2,primaryValueSize:2,reminderSize:5};
 const size=(selector,key,fallback)=>`${selector}{font-size:${n(key,fallback)+(fontIncrease[key]||0)}pt!important}`;
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
 css+=`
 .card .channelDetails summary,.channelRows>div,.compactMeta,.subMetricLabel{font-size:calc(12px + 2pt)}
 .card[data-metric="dailyHours"] .compactMeta{font-size:calc(12px + 5pt)}
 @media(max-width:600px){
  .staffReport .cards>.card h3{font-size:calc(12px + 2pt)!important}
  .staffReport .cards>.card .metric{font-size:calc(22px + 2pt)!important}
  .staffReport .cards>.card .reportReminder{font-size:calc(11px + 5pt)!important}
  .card .channelDetails summary,.channelRows>div,.compactMeta,.subMetricLabel{font-size:calc(10px + 2pt)}
  .card[data-metric="dailyHours"] .compactMeta{font-size:calc(10px + 5pt)}
 }
 `;
 let style=document.getElementById('editableDesign');if(!style){style=document.createElement('style');style.id='editableDesign';document.head.append(style);}style.textContent=css;
 document.getElementById('title').textContent=(data?.areaLabel?data.areaLabel+'｜':'')+(design.title||'スタッフ別活動レポート');
 document.title=document.getElementById('title').textContent;
 scope.querySelectorAll('.staffReport').forEach(staff=>{
  const container=staff.querySelector('[data-field="cards"]');
  const cards=[...staff.querySelectorAll('.card')];
  cards.forEach((card,i)=>{if(!card.dataset.metric)card.dataset.metric=keys[i];});
  cards.sort((a,b)=>keys.indexOf(a.dataset.metric)-keys.indexOf(b.dataset.metric));
  const details=document.createElement('details');details.className='reportDetails';
  const summary=document.createElement('summary');summary.textContent=design.detailsLabel||'詳細を見る';details.append(summary);
  const inner=document.createElement('div');inner.className='cards';details.append(inner);
  cards.forEach(card=>{
   const key=card.dataset.metric,place='main';
   card.hidden=place==='hidden';
   if(design['label_'+key]&&!['dailyHours','visits','contracts','units'].includes(key))card.querySelector('h3').textContent=design['label_'+key];
   const heading=card.querySelector('h3');
   if(key==='dailyHours')heading.innerHTML='募集活動時間（1活動日あたり）<span class="activityExclusion">※会議、移動時間などは除く</span>';
   else if(!heading.textContent.includes('月累計'))heading.textContent+='（月累計）';
   (place==='details'?inner:container).append(card);
  });
  const flow=staff.querySelector('[data-field="transitionFlow"]');
  if(flow)staff.querySelector('summary.identity').insertAdjacentElement('afterend',flow);
  staff.querySelectorAll('.reportDetails').forEach(x=>x.remove());
  if(inner.children.length){
   const identity=staff.querySelector('h2').textContent;
   details.open=reportDetailsState.has(identity)?reportDetailsState.get(identity):design.detailsOpen===true;
   details.addEventListener('toggle',()=>reportDetailsState.set(identity,details.open));
   container.append(details);
  }
  staff.querySelector('[data-field="assessment"]').hidden=design.showAssessment===false||!staff.querySelector('.assessmentGap');
 });
 if(scope===document)requestAnimationFrame(syncClosedCardHeights);
 scope.querySelectorAll('.reportReminder').forEach(x=>x.textContent=design.reminder??'出勤日数分の日報が入力されているかご確認ください');
 scope.querySelectorAll('.attentionLabel,.assessmentBadge').forEach(x=>x.textContent=design.badge||'要確認');
 scope.querySelectorAll('.standard').forEach(x=>{if(x.textContent.startsWith('10口達成者水準'))x.textContent=x.textContent.replace('10口達成者水準',design.standard||'10口達成者水準');});
}

let cardHeightFrame;
function syncClosedCardHeights(){
 document.querySelectorAll('.staffReport[open]').forEach(staff=>{
  const cards=[...staff.querySelectorAll('.card')].filter(c=>!['contracts','units'].includes(c.dataset.metric));
  let maximum=0;
  cards.forEach(card=>{
   const clone=card.cloneNode(true);
   clone.querySelectorAll('details').forEach(x=>x.open=false);
   clone.style.cssText='position:fixed;visibility:hidden;pointer-events:none;left:-10000px;top:0;width:'+card.getBoundingClientRect().width+'px;height:auto!important;min-height:0!important;aspect-ratio:auto!important';
   card.parentElement.append(clone);
   maximum=Math.max(maximum,Math.ceil(clone.getBoundingClientRect().height));clone.remove();
  });
  if(maximum)staff.style.setProperty('--closed-card-height',maximum+'px');
  cards.forEach(card=>{
   const rows=card.querySelector('.channelRows');
   if(rows&&card.querySelector('details[open]'))card.style.setProperty('--detail-height',rows.getBoundingClientRect().height+'px');
  });
 });
}
document.addEventListener('toggle',event=>{
 if(event.target.matches('.staffReport,.channelDetails')){cancelAnimationFrame(cardHeightFrame);cardHeightFrame=requestAnimationFrame(syncClosedCardHeights);}
},true);
window.addEventListener('resize',()=>{cancelAnimationFrame(cardHeightFrame);cardHeightFrame=requestAnimationFrame(syncClosedCardHeights);});
