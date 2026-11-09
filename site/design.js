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
 `;
 for(const [s,k,v] of [['h1','titleSize',18.75],['.identity h2','staffSize',18.75],['.assessmentGap strong','issueSize',17],['.card h3','labelSize',10.75],['.card .metric','valueSize',16.5],['.card.attention .metric','primaryValueSize',21.5],['.card .unit','unitSize',14.75],['.card .progress,.card.attention .progress','progressSize',17.4],['.card .standard','standardSize',10],['.card .reportReminder','reminderSize',5.75],['.card .conversionLabel','conversionSize',11.75],['.card .attentionLabel','badgeSize',9]])css+=size(s,k,v);
 let style=document.getElementById('editableDesign');if(!style){style=document.createElement('style');style.id='editableDesign';document.head.append(style);}style.textContent=css;
 document.getElementById('title').textContent=(data?.areaLabel?data.areaLabel+'｜':'')+(design.title||'スタッフ別活動レポート');
 document.title=document.getElementById('title').textContent;
 document.querySelectorAll('.staffReport').forEach(staff=>{
  staff.querySelectorAll('.cards>.card').forEach((card,i)=>{
   const key=keys[i];card.hidden=design['show_'+key]===false;
   if(design['label_'+key])card.querySelector('h3').textContent=design['label_'+key];
  });
 });
 document.querySelectorAll('.reportReminder').forEach(x=>x.textContent=design.reminder??'出勤日数分の日報が入力されているかご確認ください');
 document.querySelectorAll('.attentionLabel,.assessmentBadge').forEach(x=>x.textContent=design.badge||'要確認');
 document.querySelectorAll('.standard').forEach(x=>{if(x.textContent.startsWith('10口達成者水準'))x.textContent=x.textContent.replace('10口達成者水準',design.standard||'10口達成者水準');});
}
