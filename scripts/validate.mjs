import fs from 'node:fs';
const design=JSON.parse(fs.readFileSync('site/design.json','utf8'));
const fields=JSON.parse(fs.readFileSync('site/design-fields.json','utf8'));
for(const f of fields){
 const v=design[f.name];
 if(f.type==='number'&&(String(v).trim()===''||!Number.isFinite(Number(v))||Number(v)<0||Number(v)>100))throw Error(`${f.label}: 0〜100の数値を入力してください`);
 if(f.type==='boolean'&&typeof v!=='boolean')throw Error(`${f.label}: 真偽値が必要です`);
 if(['string','text'].includes(f.type)&&typeof v!=='string')throw Error(`${f.label}: 文字を入力してください`);
 if((f.name.endsWith('Color')||f.name.endsWith('Background'))&&!/^#[\da-f]{6}$/i.test(v))throw Error(`${f.label}: #123456形式で入力してください`);
}
const c=JSON.parse(fs.readFileSync('site/connection.json','utf8'));
if(!/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/.test(c.endpoint))throw Error('GAS接続先が正しくありません');
console.log('デザイン設定・接続先の検証に成功しました');
