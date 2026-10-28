// Original illustrated SVG assets: no icon font, emoji, or external dependency.
const fs=require('node:fs'),path=require('node:path');
const directory=path.join(__dirname,'../src/assets');fs.mkdirSync(directory,{recursive:true});
const icons={
campus:'<path fill="#f8d895" d="M12 29h40v27H12z"/><path fill="#7ab6a1" d="M7 28 32 9l25 19z"/><path fill="#fff4d9" d="M26 38h12v18H26z"/><path stroke="#6c9b98" d="M18 36v7m28-7v7"/><circle cx="32" cy="23" r="5" fill="#fff9de"/>',
quest:'<rect x="15" y="12" width="36" height="46" rx="8" fill="#f8d591"/><rect x="23" y="7" width="20" height="10" rx="4" fill="#96c9ae"/><path stroke="#a99369" d="M33 29h10M33 40h10"/><path stroke="#68ac8b" d="m21 28 3 3 5-6m-8 14 3 3 5-6"/>',
notebook:'<path fill="#97c4db" d="M15 9h33a5 5 0 0 1 5 5v40H16z"/><path fill="#fff7df" d="M17 47h35v9H17a5 5 0 0 1 0-9"/><path stroke="#5b91b2" d="M20 10v36"/><path fill="#ffe2a6" d="M29 9h13v23l-6-4-7 4z"/>',
plant:'<path fill="#dca37c" d="m18 36 5 21h20l5-21z"/><rect x="15" y="32" width="36" height="9" rx="4" fill="#efbd92"/><path stroke="#72a177" d="M33 33V18"/><path fill="#99c586" d="M31 25C17 29 13 17 16 12c12-2 17 4 15 13"/><path fill="#79b291" d="M34 20C33 7 45 6 51 8c1 11-7 16-17 12"/>',
computer:'<rect x="9" y="10" width="47" height="35" rx="7" fill="#a0c8c1"/><rect x="15" y="16" width="35" height="22" rx="3" fill="#e2f3d5"/><path stroke="#77aa94" d="m22 23 6 4-6 4m11 0h8"/><path fill="#88aaa1" d="M28 45h10v8H28z"/><rect x="20" y="52" width="26" height="6" rx="3" fill="#b8cdc1"/>',
chat:'<path fill="#fff4d6" d="M10 10h44a4 4 0 0 1 4 4v27a5 5 0 0 1-5 5H30L17 57V46h-7a5 5 0 0 1-5-5V15a5 5 0 0 1 5-5"/><g fill="#8ca88c" stroke="none"><circle cx="19" cy="29" r="3"/><circle cx="32" cy="29" r="3"/><circle cx="45" cy="29" r="3"/></g>',
settings:'<path fill="#b1c8c5" d="M26 6h12l3 8h8l7 11-5 7 5 7-7 11h-8l-3 8H26l-3-8h-8L8 39l5-7-5-7 7-11h8z"/><circle cx="32" cy="32" r="12" fill="#fff7dd"/>',
sound:'<path fill="#e7bc77" d="M9 25h11L34 13v38L20 39H9z"/><path fill="none" stroke="#79a6a0" stroke-width="5" d="M43 23q10 9 0 18m7-26q17 17 0 34"/>',
fullscreen:'<path fill="none" stroke="#79a6a0" stroke-width="7" d="M24 12H12v12m28-12h12v12M12 40v12h12m28-12v12H40"/>',
map:'<path fill="#b5d59e" d="m5 15 18-7 18 7 18-7v42l-18 7-18-7-18 7z"/><path stroke="#fff1ce" stroke-width="5" d="M23 9v40m18-33v39"/><path fill="#e7a18b" d="M47 21c0 8-9 17-9 17s-9-9-9-17a9 9 0 0 1 18 0"/><circle cx="38" cy="21" r="3" fill="#fff5dd"/>',
pin:'<path fill="#df9b7c" d="M49 25c0 14-17 31-17 31S15 39 15 25a17 17 0 0 1 34 0"/><circle cx="32" cy="25" r="7" fill="#fff5dd"/>',
arrow:'<path fill="#6e9b85" d="M32 10 53 33H41v21H23V33H11z"/><path stroke="#b7d6b8" d="m24 26 8-9 8 9"/>',
chevron:'<path fill="none" stroke="#819d88" stroke-width="7" d="m17 25 15 15 15-15"/>',
next:'<path fill="#75ab91" d="m24 12 23 20-23 20z"/>',
close:'<circle fill="#f3d3b6" cx="32" cy="32" r="25"/><path stroke="#a27b65" stroke-width="5" d="m23 23 18 18m0-18L23 41"/>',
star:'<path fill="#f5cf78" d="m32 6 8 16 18 3-13 13 3 19-16-9-16 9 3-19L6 25l18-3z"/><path stroke="#ffedb1" d="m23 25 8-2 4-8"/>',
paw:'<ellipse cx="32" cy="42" rx="15" ry="12" fill="#b2c5a1"/><g fill="#b2c5a1" stroke="none"><ellipse cx="14" cy="28" rx="6" ry="8"/><ellipse cx="26" cy="17" rx="6" ry="8"/><ellipse cx="40" cy="17" rx="6" ry="8"/><ellipse cx="51" cy="28" rx="6" ry="8"/></g>',
postgres:'<path fill="#8cb4d1" d="M12 19q0-14 20-14t20 14v17q-3 12-12 8l-2-10h-8v14q0 13-12 8l-3-7q11 5 10-4V33l-9 10q-9-5-4-24"/><path fill="none" stroke="#eaf4eb" d="M24 18q8-6 16 0v16m-16-9 6 7h7"/><circle stroke="none" cx="37" cy="22" r="2" fill="#42637b"/>',
mysql:'<path fill="#81bdd0" d="M6 44Q16 15 39 16l7-9 1 12 11 9-13-1Q28 49 6 44"/><path fill="#ffdeb0" d="m28 37 3 16 8-20"/><path stroke="#e3f0dc" d="M15 38q10-13 25-15"/><circle fill="#405d70" stroke="none" cx="43" cy="22" r="2"/>',
mariadb:'<path fill="#a0c5c7" d="M7 44q6-27 29-27l12-9-1 13 10 8-12 2q-9 20-29 17l-8 8z"/><path fill="#f4deb8" d="M18 42q7-16 21-17-6 20-21 17"/><path fill="#e7b894" d="m35 36 10 10-14-3"/><circle fill="#42616a" stroke="none" cx="44" cy="25" r="2"/>',
timescale:'<ellipse cx="26" cy="15" rx="19" ry="8" fill="#b6b0d6"/><path fill="#c6c0df" d="M7 15v29c0 11 38 11 38 0V15c0 11-38 11-38 0"/><path fill="none" stroke="#9a92b7" d="M7 28c0 11 38 11 38 0"/><circle cx="44" cy="44" r="15" fill="#fff0bd"/><path stroke="#a59871" d="M44 35v10l7 4"/>',
hana:'<path fill="#d8e7be" stroke="none" d="M0 0h64v64H0z"/><path fill="#776257" d="M14 31C6 5 56-5 52 31l2 22H11z"/><path fill="#f1c7a1" d="M19 23h28v16q-14 19-28 0z"/><path fill="#ffe4b9" d="M19 24q15 1 22-9l6 12v-9H19z"/><path fill="#8fb7a0" d="M8 64q2-17 19-19h11q17 2 19 19"/><path fill="#fff6df" d="m26 45 7 8 7-8-2 15H27z"/><g fill="#5b4e45" stroke="none"><circle cx="26" cy="31" r="1.8"/><circle cx="40" cy="31" r="1.8"/></g><path fill="none" stroke="#c48473" stroke-width="2" d="M29 38q4 4 8 0"/><circle cx="17" cy="19" r="5" fill="#f0d382"/>'
};
for(const [name,body] of Object.entries(icons))fs.writeFileSync(path.join(directory,name+'.svg'),`<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><g stroke="#516b61" stroke-opacity=".35" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round">${body}</g></svg>\n`,'utf8');
console.log(Object.keys(icons).length+' SVG image assets created.');
