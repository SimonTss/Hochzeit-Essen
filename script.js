let gaeste=[];
function norm(s){return (s||"").toLowerCase().trim().replace(/\s+/g," ");}

fetch("daten.csv")
.then(r=>{
 if(!r.ok) throw new Error("CSV konnte nicht geladen werden");
 return r.text();
})
.then(t=>{
 const lines=t.replace(/\r/g,"").split("\n").filter(x=>x);
 const headers=lines[0].split(";");
 gaeste=lines.slice(1).map(line=>{
   const cols=line.split(";");
   let o={};
   headers.forEach((h,i)=>o[h.trim()]=cols[i]?cols[i].trim():"");
   return o;
 });
 document.getElementById("status").textContent="✓ "+gaeste.length+" Gäste geladen.";
})
.catch(e=>{
 document.getElementById("status").textContent="❌ "+e.message;
});

document.getElementById("searchBtn").addEventListener("click",suche);
document.getElementById("nameInput").addEventListener("keydown",e=>{if(e.key==="Enter")suche();});

function suche(){
 const s=norm(document.getElementById("nameInput").value);
 const g=gaeste.find(x=>norm(x.Vorname+" "+x.Nachname)===s);
 const r=document.getElementById("result");
 if(!g){r.innerHTML='<div class="card">❌ Kein Eintrag gefunden.</div>';return;}
 r.innerHTML=`<div class="card">
 <h2>Hallo ${g.Vorname}!</h2>
 <span class="label">🥗 Vorspeise</span>${g.Vorspeise}
 <span class="label">🍖 Hauptspeise</span>${g.Hauptspeise}
 <span class="label">🍰 Nachspeise</span>${g.Nachspeise}
 ${g.Kommentar?`<span class="label">💬 Kommentar</span>${g.Kommentar}`:""}
 </div>`;
}
