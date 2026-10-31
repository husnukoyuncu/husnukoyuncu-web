(async()=>{
const RAW='https://raw.githubusercontent.com/husnukoyuncu/husnukoyuncu-web/uncteks-gorseller/';
const api=async(method,url,body)=>{for(let t=0;t<3;t++){const tok=decodeURIComponent((document.cookie.split('; ').find(c=>c.startsWith('X-CSRF-TOKEN='))||'').split('=')[1]||'');try{const r=await fetch(url,{method,credentials:'include',headers:{'Content-Type':'application/json','Accept':'application/json','X-CSRF-TOKEN':tok,'x-ideasoft-locale':'tr'},body:body?JSON.stringify(body):undefined});const tx=await r.text();let j;try{j=JSON.parse(tx)}catch(e){j=tx} if(r.status>=500||r.status===429){await new Promise(s=>setTimeout(s,2000));continue;} return {s:r.status,j};}catch(e){await new Promise(s=>setTimeout(s,2000));}} return {s:0,j:'fail'};};
const C={Siyah:[5,'SYH'],Beyaz:[6,'BYZ'],'Füme':[7,'FUM'],Lacivert:[8,'LAC'],'Kırmızı':[9,'KRM'],'Yeşil':[10,'YSL'],'Neon Orange':[11,'NOR'],'Neon Sarı':[12,'NSR'],Gri:[25,'GRI'],Haki:[26,'HAK'],Mavi:[27,'MAV']};
const S={'116/128':13,'134/140':14,'146/152':15,'158/164':16,'170/176':17,S:18,M:19,L:20,XL:21,XXL:22,'3XL':23,'4XL':24};
const P=window.__prog={done:0,total:0,log:[],errors:[],cur:''};
const spec=await (await fetch(RAW+'spec.json?'+Date.now())).json();
P.total=spec.reduce((a,m)=>a+m.groups.reduce((b,g)=>b+m.colors.length*Math.max(1,g.sizes.length),0),0);
const all=[];for(let p=1;p<20;p++){const l=await api('GET','/admin-app/products?page='+p+'&limit=100&fields=id,sku,parent');const d=l.j.data||l.j;if(!d.length)break;all.push(...d);if(d.length<100)break;}
const bySku={};all.forEach(x=>{if(!x.parent)bySku[x.sku]=x.id});
const im=(code,f)=>({filename:f.replace('.jpg',''),extension:'jpg',alt:'',attachment:RAW+code+'/'+f});
const only=window.__only;
for(const m of spec){ if(only && !only.includes(m.code)) continue;
 const first=m.colors.map(c=>m.imgs[c][0]).filter(Boolean);
 const extra=(m.imgs[m.colors[0]]||[]).slice(1);
 const pimgs=[...first,...extra].slice(0,20).map(f=>im(m.code,f));
 for(const g of m.groups){
  P.cur=g.sku;
  const hasSize=g.sizes.length>0;
  let pid=bySku[g.sku]; let existed=!!pid;
  const body={name:g.name,slug:g.slug,sku:g.sku,barcode:'',stockAmount:0,price1:g.price,currency:{id:3},discount:0,discountType:1,moneyOrderDiscount:0,buyingPrice:0,taxIncluded:0,tax:10,warranty:0,volumetricWeight:0,stockTypeLabel:'Piece',customShippingDisabled:1,customShippingCost:0,hasGift:0,gift:'',status:1,hasOption:1,categoryShowcaseStatus:1,categories:g.cats.map(id=>({id})),pageTitle:'',metaDescription:'',metaKeywords:'',images:pimgs};
  if(!pid){const r=await api('POST','/admin-app/products',body); if(r.s!==201){P.errors.push(g.sku+' parent '+r.s+' '+JSON.stringify(r.j).slice(0,200));continue;} pid=r.j.id;}
  else {const gg=await api('GET','/admin-app/products/'+pid); const p=gg.j; Object.assign(p,{name:g.name,categories:body.categories,status:1,images:pimgs}); const r=await api('PUT','/admin-app/products/'+pid,p); if(r.s!==200)P.errors.push(g.sku+' put '+r.s);}
  // details
  const gg=await api('GET','/admin-app/products/'+pid);
  if(gg.j.detail&&gg.j.detail.id){await api('PUT','/admin-app/product_details/'+gg.j.detail.id,{id:gg.j.detail.id,sku:g.sku,details:m.html,product:{id:pid}});}
  else {const r=await api('POST','/admin-app/product_details',{product:{id:pid},sku:g.sku,details:m.html,extraDetails:''}); if(r.s!==201)P.errors.push(g.sku+' detail '+r.s+' '+JSON.stringify(r.j).slice(0,150));}
  if(existed){P.done+=m.colors.length*Math.max(1,g.sizes.length);P.log.push(g.sku+' updated '+pid);continue;}
  const jobs=[];
  for(const c of m.colors){const ci=(m.imgs[c]||[]).slice(0,4).map(f=>im(m.code,f));
   for(const s of (hasSize?g.sizes:[null])){
    const price=g.price+((m.neon&&c.startsWith('Neon'))?m.neon:0);
    const og=[{id:3,options:[{id:C[c][0]}]}]; if(s)og.push({id:4,options:[{id:S[s]}]});
    jobs.push({name:c+(s?' '+s:''),sku:g.sku+'-'+C[c][1]+(s?'-'+s.replace('/','-'):''),stockAmount:100,price1:price,currency:{id:3},taxIncluded:0,tax:10,discount:0,discountType:1,status:1,hasOption:0,stockTypeLabel:'Piece',customShippingDisabled:1,parent:{id:pid},optionGroups:og,images:ci});}}
  const worker=async()=>{while(jobs.length){const b=jobs.shift();const r=await api('POST','/admin-app/products',b); if(r.s!==201)P.errors.push(b.sku+' '+r.s+' '+JSON.stringify(r.j).slice(0,150)); P.done++;}};
  await Promise.all([worker(),worker(),worker()]);
  P.log.push(g.sku+' created '+pid);
 }}
P.finished=true;
})();
'started'
