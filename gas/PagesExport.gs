// 既存doGetを次の分岐に変更する。既存のGAS画面は引き続き利用できる。
// function doGet(e) {
//   if (e && e.parameter && e.parameter.format === 'pages') return pagesExport_(e);
//   return dashboardPage_(e);
// }
function pagesExport_(e) {
  var p = e.parameter || {};
  var area = String(p.area || '');
  dArea_(area);
  var month = String(p.month || '');
  if (month && !/^202[6-9]-(0[1-9]|1[0-2])$/.test(month)) throw Error('対象月を確認してください。');
  var r = getDashboard(month, '', area);
  // 掲載対象に限定し、社員番号・名寄せ情報・未掲載者は出力しない。
  var fields = ['name','branch','days','reportedDays','units','minutes','metrics','presentationRate','closingRate','primaryIssue'];
  var staff = r.staff.filter(function(s) { return !s.excludeFromReport && !!s.primaryIssue; }).map(function(s) {
    var v = {}; fields.forEach(function(k) { v[k] = s[k]; }); return v;
  });
  var out = {areaLabel:r.areaLabel, month:r.month, months:r.months, cutoff:r.cutoff,
    reportUntil:r.reportUntil, updatedAt:r.updatedAt, version:r.version,
    updateFailed:r.updateFailed, staff:staff, issues:[], mappingPendingCount:r.mappingPendingCount,
    invalidCount:r.invalidCount};
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}
