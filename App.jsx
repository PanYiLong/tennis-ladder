import { useState, useMemo } from "react";

// ─── REAL DATA ───────────────────────────────────────────────
const PLAYERS = [
  "Peter Champe","Dan Brenner","Patrick Elliott","Ming Cai","Karlston Nasser",
  "Peter McIntosh","Paul Dingus","Jeff Park","Yash Chandak","Michael Voecks",
  "Saied Delagah","Ricardo Yunis","Colin Clarkin","Oscar Castillo","Gaurav Kukreja",
  "Jordan Logan","Ben Thengvall","Aaron Pattillo","Lorne Noble","Nicholas Golovanov",
  "Darren Berns","Brent Nelson","Jason Eckstein","Victor Casler","Bob Tawa",
  "JD Tulloch","Dave Corujo","James Atwell","Zach Apiratitham","Brent Schmierbach",
  "Bryan Alcorn","Dez Nagle","Aaron Schacht","Duncan Rover","Phil Astras","Ryan Draves"
];

const PLAYER_DIRECTORY = {
  "Bryan Alcorn": { phone: "831-524-6533", email: "alcorn.bryan@gmail.com" },
  "Zach Apiratitham": { phone: "206-747-8995", email: "zack@vatthikorn.com" },
  "Phil Astras": { phone: "616-406-6369", email: "philipastras@gmail.com" },
  "James Atwell": { phone: "303-859-4098", email: "iguanajames@gmail.com" },
  "Darren Berns": { phone: "303-442-1017", email: "darrenberns@comcast.net" },
  "Dan Brenner": { phone: "845-537-6805", email: "dbrenner816@gmail.com" },
  "Ming Cai": { phone: "970-286-9232", email: "mingxuan.c@gmail.com" },
  "Victor Casler": { phone: "231-360-9869", email: "viccasler@gmail.com" },
  "Oscar Castillo": { phone: "980-428-3007", email: "medaid8184@gmail.com" },
  "Peter Champe": { phone: "303-241-8115", email: "pchampe@gmail.com" },
  "Yash Chandak": { phone: "303-507-6065", email: "yashdc16@gmail.com" },
  "Colin Clarkin": { phone: "813-334-1426", email: "coco.clarkin@gmail.com" },
  "Dave Corujo": { phone: "303-906-5687", email: "davujo@gmail.com" },
  "Saied Delagah": { phone: "303-912-6793", email: "loving2bliving@gmail.com" },
  "Paul Dingus": { phone: "432-559-8054", email: "williampdingus@gmail.com" },
  "Ryan Draves": { phone: "231-349-3607", email: "ryan.draves@colorado.edu" },
  "Jason Eckstein": { phone: "303-917-2629", email: "jekyllstein@gmail.com" },
  "Patrick Elliott": { phone: "818-425-7852", email: "patrickaelliott@gmail.com" },
  "Nicholas Golovanov": { phone: "610-709-7689", email: "nicholasgo14@gmail.com" },
  "Gaurav Kukreja": { phone: "917-680-4400", email: "gkukreja@yahoo.com" },
  "Jordan Logan": { phone: "303-884-2279", email: "jordanglogan@gmail.com" },
  "Peter McIntosh": { phone: "720-235-7140", email: "peter_j_mcintosh@yahoo.com" },
  "Dez Nagle": { phone: "202-492-7953", email: "deryanagle@gmail.com" },
  "Karlston Nasser": { phone: "832-657-3510", email: "kqnasser@gmail.com" },
  "Brent Nelson": { phone: "303-475-8157", email: "brett.nelson15@gmail.com" },
  "Lorne Noble": { phone: "720-548-8160", email: "lornenoble@gmail.com" },
  "Jeff Park": { phone: "720-427-1655", email: "jwpark22@gmail.com" },
  "Aaron Pattillo": { phone: "303-803-2750", email: "apattillo@gmail.com" },
  "Duncan Rover": { phone: "757-513-8891", email: "duncanrover@gmail.com" },
  "Aaron Schacht": { phone: "949-989-0800", email: "aaronschacht@mac.com" },
  "Brent Schmierbach": { phone: "720-386-2272", email: "brentschmierbach@hotmail.com" },
  "Bob Tawa": { phone: "508-415-0098", email: "taware8@gmail.com" },
  "Ben Thengvall": { phone: "720-840-4837", email: "benthengvall@gmail.com" },
  "JD Tulloch": { phone: "303-253-4344", email: "tullochjd@gmail.com" },
  "Michael Voecks": { phone: "720-979-7100", email: "voecks.michael@gmail.com" },
  "Ricardo Yunis": { phone: "419-351-2256", email: "e.r.yunis@gmail.com" },
};

const KATHY_EMAIL = "kathy.webber@maritzselect.com";

const WEEK_STANDINGS = [
  { week: 1, label: "Week 1 (Start)", standings: PLAYERS.map((p,i) => ({ name: p, rank: i+1, points: null })) },
  { week: 2, label: "Week 2", standings: [
    {name:"Lorne Noble",rank:1,points:24},{name:"Zach Apiratitham",rank:2,points:24},
    {name:"Yash Chandak",rank:3,points:23},{name:"Ricardo Yunis",rank:4,points:23},
    {name:"Phil Astras",rank:5,points:22},{name:"James Atwell",rank:6,points:21},
    {name:"Karlston Nasser",rank:7,points:20},{name:"Aaron Pattillo",rank:8,points:20},
    {name:"Jordan Logan",rank:9,points:19},{name:"JD Tulloch",rank:10,points:19},
    {name:"Victor Casler",rank:11,points:18},{name:"Duncan Rover",rank:12,points:17},
    {name:"Brent Nelson",rank:13,points:16},{name:"Oscar Castillo",rank:14,points:15},
    {name:"Dan Brenner",rank:15,points:14},{name:"Patrick Elliott",rank:16,points:14},
    {name:"Bryan Alcorn",rank:17,points:14},{name:"Peter Champe",rank:18,points:12},
    {name:"Ming Cai",rank:19,points:12},{name:"Colin Clarkin",rank:20,points:11},
    {name:"Darren Berns",rank:21,points:10},{name:"Aaron Schacht",rank:22,points:9},
    {name:"Jason Eckstein",rank:23,points:8},{name:"Gaurav Kukreja",rank:24,points:7},
    {name:"Bob Tawa",rank:25,points:7},{name:"Peter McIntosh",rank:26,points:6},
    {name:"Ben Thengvall",rank:27,points:6},{name:"Dave Corujo",rank:28,points:5},
    {name:"Ryan Draves",rank:29,points:4},{name:"Michael Voecks",rank:30,points:3},
    {name:"Saied Delagah",rank:31,points:3},{name:"Nicholas Golovanov",rank:32,points:2},
    {name:"Brent Schmierbach",rank:33,points:2},{name:"Paul Dingus",rank:34,points:0},
    {name:"Jeff Park",rank:35,points:0},{name:"Dez Nagle",rank:36,points:0}
  ]},
  { week: 3, label: "Week 3", standings: [
    {name:"Peter Champe",rank:1,points:53},{name:"Karlston Nasser",rank:2,points:44},
    {name:"Ming Cai",rank:3,points:43},{name:"Phil Astras",rank:4,points:41},
    {name:"Yash Chandak",rank:5,points:39},{name:"Victor Casler",rank:6,points:37},
    {name:"Lorne Noble",rank:7,points:36},{name:"Brent Nelson",rank:8,points:36},
    {name:"JD Tulloch",rank:9,points:35},{name:"Darren Berns",rank:10,points:34},
    {name:"Ricardo Yunis",rank:11,points:33},{name:"Dan Brenner",rank:12,points:31},
    {name:"Jordan Logan",rank:13,points:29},{name:"James Atwell",rank:14,points:28},
    {name:"Dave Corujo",rank:15,points:26},{name:"Zach Apiratitham",rank:16,points:24},
    {name:"Aaron Pattillo",rank:17,points:24},{name:"Duncan Rover",rank:18,points:24},
    {name:"Ryan Draves",rank:19,points:24},{name:"Patrick Elliott",rank:20,points:23},
    {name:"Jason Eckstein",rank:21,points:23},{name:"Oscar Castillo",rank:22,points:21},
    {name:"Bob Tawa",rank:23,points:19},{name:"Brent Schmierbach",rank:24,points:19},
    {name:"Gaurav Kukreja",rank:25,points:18},{name:"Saied Delagah",rank:26,points:15},
    {name:"Bryan Alcorn",rank:27,points:14},{name:"Colin Clarkin",rank:28,points:14},
    {name:"Aaron Schacht",rank:29,points:11},{name:"Ben Thengvall",rank:30,points:11},
    {name:"Michael Voecks",rank:31,points:9},{name:"Paul Dingus",rank:32,points:9},
    {name:"Peter McIntosh",rank:33,points:6},{name:"Nicholas Golovanov",rank:34,points:2},
    {name:"Jeff Park",rank:35,points:0},{name:"Dez Nagle",rank:36,points:0}
  ]},
  { week: 4, label: "Week 4", standings: [
    {name:"Karlston Nasser",rank:1,points:83},{name:"Bob Tawa",rank:2,points:82},
    {name:"Peter Champe",rank:3,points:71},{name:"Jason Eckstein",rank:4,points:65},
    {name:"Victor Casler",rank:5,points:59},{name:"Phil Astras",rank:6,points:58},
    {name:"Lorne Noble",rank:7,points:58},{name:"Ming Cai",rank:8,points:52},
    {name:"JD Tulloch",rank:9,points:52},{name:"Jordan Logan",rank:10,points:48},
    {name:"Dez Nagle",rank:11,points:48},{name:"Dave Corujo",rank:12,points:45},
    {name:"Duncan Rover",rank:13,points:45},{name:"Yash Chandak",rank:14,points:43},
    {name:"Darren Berns",rank:15,points:43},{name:"Brent Nelson",rank:16,points:42},
    {name:"Oscar Castillo",rank:17,points:42},{name:"James Atwell",rank:18,points:35},
    {name:"Ricardo Yunis",rank:19,points:33},{name:"Dan Brenner",rank:20,points:31},
    {name:"Aaron Pattillo",rank:21,points:31},{name:"Bryan Alcorn",rank:22,points:31},
    {name:"Ryan Draves",rank:23,points:29},{name:"Michael Voecks",rank:24,points:25},
    {name:"Patrick Elliott",rank:25,points:23},{name:"Ben Thengvall",rank:26,points:21},
    {name:"Aaron Schacht",rank:27,points:20},{name:"Brent Schmierbach",rank:28,points:19},
    {name:"Gaurav Kukreja",rank:29,points:18},{name:"Jeff Park",rank:30,points:18},
    {name:"Saied Delagah",rank:31,points:17},{name:"Colin Clarkin",rank:32,points:14},
    {name:"Paul Dingus",rank:33,points:9},{name:"Peter McIntosh",rank:34,points:6}
  ]}
];

const MATCHES = [
  {week:1,type:"assigned",p1:"Peter Champe",p2:"Dan Brenner",winner:"Dan Brenner",score:"5-7, 7-5, 6-2"},
  {week:1,type:"assigned",p1:"Patrick Elliott",p2:"Ming Cai",winner:"Patrick Elliott",score:"2-6, 7-6, 1-0"},
  {week:1,type:"assigned",p1:"Karlston Nasser",p2:"Peter McIntosh",winner:"Karlston Nasser",score:"4-6, 6-0, 6-2"},
  {week:1,type:"assigned",p1:"Yash Chandak",p2:"Michael Voecks",winner:"Yash Chandak",score:"6-3, 6-0"},
  {week:1,type:"assigned",p1:"Saied Delagah",p2:"Ricardo Yunis",winner:"Ricardo Yunis",score:"6-2, 6-1"},
  {week:1,type:"assigned",p1:"Colin Clarkin",p2:"Oscar Castillo",winner:"Oscar Castillo",score:"7-6, 7-5"},
  {week:1,type:"assigned",p1:"Gaurav Kukreja",p2:"Jordan Logan",winner:"Jordan Logan",score:"6-2, 7-5"},
  {week:1,type:"assigned",p1:"Ben Thengvall",p2:"Aaron Pattillo",winner:"Aaron Pattillo",score:"6-4, 6-2"},
  {week:1,type:"assigned",p1:"Lorne Noble",p2:"Nicholas Golovanov",winner:"Lorne Noble",score:"6-1, 6-1"},
  {week:1,type:"assigned",p1:"Darren Berns",p2:"Brent Nelson",winner:"Brent Nelson",score:"6-4, 3-6, 1-0"},
  {week:1,type:"assigned",p1:"Jason Eckstein",p2:"Victor Casler",winner:"Victor Casler",score:"6-2, 4-6, 1-0"},
  {week:1,type:"assigned",p1:"Bob Tawa",p2:"JD Tulloch",winner:"JD Tulloch",score:"6-4, 6-3"},
  {week:1,type:"assigned",p1:"Dave Corujo",p2:"James Atwell",winner:"James Atwell",score:"6-3, 6-2"},
  {week:1,type:"assigned",p1:"Zach Apiratitham",p2:"Brent Schmierbach",winner:"Zach Apiratitham",score:"6-1, 6-1"},
  {week:1,type:"assigned",p1:"Bryan Alcorn",p2:"Dez Nagle",winner:"Bryan Alcorn",score:"w/o"},
  {week:1,type:"assigned",p1:"Aaron Schacht",p2:"Duncan Rover",winner:"Duncan Rover",score:"1-6, 6-3, 1-0"},
  {week:1,type:"assigned",p1:"Phil Astras",p2:"Ryan Draves",winner:"Phil Astras",score:"6-2, 6-2"},
  {week:2,type:"assigned",p1:"Lorne Noble",p2:"Zach Apiratitham",winner:"Lorne Noble",score:"w/o"},
  {week:2,type:"assigned",p1:"Yash Chandak",p2:"Ricardo Yunis",winner:"Yash Chandak",score:"4-6, 6-4, 1-0"},
  {week:2,type:"assigned",p1:"Phil Astras",p2:"James Atwell",winner:"Phil Astras",score:"7-5, 6-2"},
  {week:2,type:"assigned",p1:"Karlston Nasser",p2:"Aaron Pattillo",winner:"Karlston Nasser",score:"6-1, 6-3"},
  {week:2,type:"assigned",p1:"Jordan Logan",p2:"JD Tulloch",winner:"JD Tulloch",score:"6-4, 7-6"},
  {week:2,type:"assigned",p1:"Victor Casler",p2:"Duncan Rover",winner:"Victor Casler",score:"7-5, 6-2"},
  {week:2,type:"assigned",p1:"Brent Nelson",p2:"Oscar Castillo",winner:"Brent Nelson",score:"6-1, 7-5"},
  {week:2,type:"assigned",p1:"Dan Brenner",p2:"Patrick Elliott",winner:"Dan Brenner",score:"6-3, 1-6, 3-0"},
  {week:2,type:"assigned",p1:"Bryan Alcorn",p2:"Peter Champe",winner:"Peter Champe",score:"3-6, 6-1, 7-5"},
  {week:2,type:"assigned",p1:"Ming Cai",p2:"Colin Clarkin",winner:"Ming Cai",score:"6-0, 6-3"},
  {week:2,type:"assigned",p1:"Darren Berns",p2:"Aaron Schacht",winner:"Darren Berns",score:"6-1, 6-1"},
  {week:2,type:"assigned",p1:"Jason Eckstein",p2:"Gaurav Kukreja",winner:"Jason Eckstein",score:"7-5, 7-6"},
  {week:2,type:"assigned",p1:"Bob Tawa",p2:"Peter McIntosh",winner:"Bob Tawa",score:"w/o"},
  {week:2,type:"assigned",p1:"Ben Thengvall",p2:"Dave Corujo",winner:"Dave Corujo",score:"6-2, 6-3"},
  {week:2,type:"assigned",p1:"Ryan Draves",p2:"Michael Voecks",winner:"Ryan Draves",score:"6-4, 6-2"},
  {week:2,type:"assigned",p1:"Saied Delagah",p2:"Nicholas Golovanov",winner:"Saied Delagah",score:"w/o"},
  {week:2,type:"assigned",p1:"Brent Schmierbach",p2:"Paul Dingus",winner:"Brent Schmierbach",score:"3-6, 6-3, 1-0"},
  {week:2,type:"challenge",p1:"Peter Champe",p2:"Ming Cai",winner:"Peter Champe",score:"6-3, 7-5"},
  {week:3,type:"assigned",p1:"Peter Champe",p2:"Karlston Nasser",winner:"Karlston Nasser",score:"6-4, 1-6, 7-5"},
  {week:3,type:"assigned",p1:"Ming Cai",p2:"Phil Astras",winner:"Phil Astras",score:"6-7, 6-2, 1-0"},
  {week:3,type:"assigned",p1:"Yash Chandak",p2:"Victor Casler",winner:"Victor Casler",score:"6-3, 6-1"},
  {week:3,type:"assigned",p1:"Lorne Noble",p2:"Brent Nelson",winner:"Lorne Noble",score:"6-3, 6-3"},
  {week:3,type:"assigned",p1:"JD Tulloch",p2:"Darren Berns",winner:"JD Tulloch",score:"3-6, 6-3, 1-0"},
  {week:3,type:"assigned",p1:"Jordan Logan",p2:"James Atwell",winner:"Jordan Logan",score:"7-6, 6-1"},
  {week:3,type:"assigned",p1:"Dave Corujo",p2:"Aaron Pattillo",winner:"Dave Corujo",score:"2-6, 6-1, 1-0"},
  {week:3,type:"assigned",p1:"Duncan Rover",p2:"Ryan Draves",winner:"Duncan Rover",score:"6-1, 6-4"},
  {week:3,type:"assigned",p1:"Patrick Elliott",p2:"Jason Eckstein",winner:"Jason Eckstein",score:"w/o"},
  {week:3,type:"assigned",p1:"Oscar Castillo",p2:"Bob Tawa",winner:"Oscar Castillo",score:"3-6, 6-3, 1-0"},
  {week:3,type:"assigned",p1:"Bryan Alcorn",p2:"Aaron Schacht",winner:"Bryan Alcorn",score:"6-3, 2-6, 6-3"},
  {week:3,type:"assigned",p1:"Ben Thengvall",p2:"Michael Voecks",winner:"Michael Voecks",score:"6-4, 2-6, 1-0"},
  {week:3,type:"assigned",p1:"Jeff Park",p2:"Dez Nagle",winner:"Dez Nagle",score:"1-6, 6-3, 1-0"},
  {week:3,type:"challenge",p1:"Peter Champe",p2:"Karlston Nasser",winner:"Karlston Nasser",score:"6-4, 6-4"},
  {week:3,type:"challenge",p1:"Jeff Park",p2:"Dez Nagle",winner:"Dez Nagle",score:"3-6, 6-3, 1-0"},
  {week:3,type:"challenge",p1:"Jason Eckstein",p2:"Oscar Castillo",winner:"Jason Eckstein",score:"6-1, 6-3"},
  {week:3,type:"challenge",p1:"Jason Eckstein",p2:"Bob Tawa",winner:"Bob Tawa",score:"6-2, 6-3"},
];

const WEEK4_ASSIGNMENTS = [
  ["Karlston Nasser","Bob Tawa"],["Peter Champe","Jason Eckstein"],
  ["Victor Casler","Phil Astras"],["Lorne Noble","Ming Cai"],
  ["JD Tulloch","Dez Nagle"],["Jordan Logan","Dave Corujo"],
  ["Duncan Rover","Yash Chandak"],["Darren Berns","Oscar Castillo"],
  ["Brent Nelson","James Atwell"],["Ricardo Yunis","Aaron Pattillo"],
  ["Dan Brenner","Bryan Alcorn"],["Ryan Draves","Patrick Elliott"],
  ["Michael Voecks","Aaron Schacht"],["Ben Thengvall","Brent Schmierbach"],
  ["Gaurav Kukreja","Jeff Park"],["Saied Delagah","Paul Dingus"],
  ["Colin Clarkin","Peter McIntosh"]
];

// ─── UTILITIES ───────────────────────────────────────────────
function getRankHistory(playerName) {
  return WEEK_STANDINGS.map(ws => {
    const entry = ws.standings.find(s => s.name === playerName);
    return { week: ws.week, label: ws.label, rank: entry ? entry.rank : null, points: entry ? entry.points : null };
  }).filter(r => r.rank !== null);
}
function getPlayerMatches(playerName) {
  return MATCHES.filter(m => m.p1 === playerName || m.p2 === playerName);
}
function getPlayerRecord(playerName) {
  const matches = getPlayerMatches(playerName);
  let w = 0, l = 0;
  matches.forEach(m => { if (m.winner === playerName) w++; else l++; });
  return { wins: w, losses: l, total: w + l };
}
function getMovement(playerName) {
  const hist = getRankHistory(playerName);
  if (hist.length < 2) return 0;
  return hist[0].rank - hist[hist.length - 1].rank;
}
function getChallengeCount(playerName) {
  return MATCHES.filter(m => m.type === "challenge" && (m.p1 === playerName || m.p2 === playerName)).length;
}

function getRecordByType(playerName, type) {
  const matches = MATCHES.filter(m =>
    (m.p1 === playerName || m.p2 === playerName) &&
    (type === "all" ? true : m.type === type)
  );
  let w = 0, l = 0;
  matches.forEach(m => { if (m.winner === playerName) w++; else l++; });
  return { wins: w, losses: l, total: w + l };
}

// Scoring formula: only first 2 sets count. Scores are from winner's perspective.
// Winner = 26 - loser's games in first 2 sets. Loser = their games in first 2 sets.
function computeMatchPoints(match) {
  if (match.score === "w/o") return { winnerPts: 12, loserPts: 0 };
  const sets = match.score.split(", ").map(s => {
    const parts = s.replace(/\s*\(.*\)/, "").split("-").map(Number);
    return parts;
  });
  // Only first 2 sets; sideB (second number) = loser's games
  const loserGames = sets.slice(0, 2).reduce((sum, [a, b]) => sum + b, 0);
  return { winnerPts: 26 - loserGames, loserPts: loserGames };
}

function computePointStandings(matchTypeFilter) {
  const filtered = matchTypeFilter === "all"
    ? MATCHES
    : MATCHES.filter(m => m.type === matchTypeFilter);
  const points = {};
  const records = {};
  PLAYERS.forEach(p => { points[p] = 0; records[p] = { wins: 0, losses: 0 }; });
  // Also include players who dropped out (may not be in PLAYERS if added late)
  filtered.forEach(match => {
    const { winnerPts, loserPts } = computeMatchPoints(match);
    const loser = match.winner === match.p1 ? match.p2 : match.p1;
    points[match.winner] = (points[match.winner] || 0) + winnerPts;
    points[loser] = (points[loser] || 0) + loserPts;
    if (!records[match.winner]) records[match.winner] = { wins: 0, losses: 0 };
    if (!records[loser]) records[loser] = { wins: 0, losses: 0 };
    records[match.winner].wins++;
    records[loser].losses++;
  });
  const sorted = Object.entries(points)
    .map(([name, pts]) => ({ name, points: pts, ...records[name] }))
    .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));
  return sorted.map((s, i) => ({ ...s, rank: i + 1 }));
}

// ─── SPARKLINE ──────────────────────────────────────────────
function RankSparkline({ playerName, width = 120, height = 32 }) {
  const hist = getRankHistory(playerName);
  if (hist.length < 2) return <span style={{color:"#888",fontSize:11}}>N/A</span>;
  const maxRank = 36;
  const pts = hist.map((h, i) => ({
    x: (i / (hist.length - 1)) * (width - 8) + 4,
    y: ((h.rank - 1) / (maxRank - 1)) * (height - 8) + 4
  }));
  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const improving = pts[pts.length - 1].y < pts[0].y;
  const color = improving ? "#16a34a" : pts[pts.length - 1].y === pts[0].y ? "#888" : "#dc2626";
  return (
    <svg width={width} height={height} style={{display:"block"}}>
      <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r="3" fill={color}/>
    </svg>
  );
}

// ─── RANK CHART ─────────────────────────────────────────────
function RankChart({ playerName }) {
  const hist = getRankHistory(playerName);
  const W = 380, H = 200, PAD = { t: 20, r: 30, b: 30, l: 40 };
  const iw = W - PAD.l - PAD.r, ih = H - PAD.t - PAD.b;
  const maxRank = 36;
  const pts = hist.map((h, i) => ({
    x: PAD.l + (hist.length > 1 ? (i / (hist.length - 1)) * iw : iw / 2),
    y: PAD.t + ((h.rank - 1) / (maxRank - 1)) * ih,
    rank: h.rank
  }));
  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const gId = `grad-${playerName.replace(/\s/g,"")}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",maxWidth:400,display:"block",margin:"0 auto"}}>
      <defs>
        <linearGradient id={gId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#dc2626" stopOpacity="0.15"/>
        </linearGradient>
      </defs>
      <rect x={PAD.l} y={PAD.t} width={iw} height={ih} fill={`url(#${gId})`} rx="4"/>
      {[1,9,18,27,36].map(r => {
        const y = PAD.t + ((r-1)/(maxRank-1))*ih;
        return <g key={r}><line x1={PAD.l} x2={W-PAD.r} y1={y} y2={y} stroke="#ddd" strokeWidth="0.5"/>
          <text x={PAD.l-6} y={y+4} textAnchor="end" fontSize="10" fill="#999">#{r}</text></g>;
      })}
      {pts.map((p,i) => <text key={i} x={p.x} y={H-6} textAnchor="middle" fontSize="9" fill="#888">W{hist[i].week}</text>)}
      <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {pts.map((p,i) => <g key={i}>
        <circle cx={p.x} cy={p.y} r="5" fill="#fff" stroke="#2563eb" strokeWidth="2"/>
        <text x={p.x} y={p.y-10} textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">#{p.rank}</text>
      </g>)}
    </svg>
  );
}

// ─── SCORE REPORT FORM ──────────────────────────────────────
function ScoreReportForm() {
  const [matchType, setMatchType] = useState("assigned");
  const [selectedMatch, setSelectedMatch] = useState("");
  const [challengeP1, setChallengeP1] = useState("");
  const [challengeP2, setChallengeP2] = useState("");
  const [set1a, setSet1a] = useState(""); const [set1b, setSet1b] = useState("");
  const [set2a, setSet2a] = useState(""); const [set2b, setSet2b] = useState("");
  const [set3a, setSet3a] = useState(""); const [set3b, setSet3b] = useState("");
  const [set3type, setSet3type] = useState("set");
  const [winner, setWinner] = useState("");
  const [walkover, setWalkover] = useState(false);
  const [sent, setSent] = useState(false);

  const currentAssignment = selectedMatch !== "" ? WEEK4_ASSIGNMENTS[parseInt(selectedMatch)] : null;
  const p1Name = matchType === "assigned" ? currentAssignment?.[0] : challengeP1;
  const p2Name = matchType === "assigned" ? currentAssignment?.[1] : challengeP2;
  const currentPlayers = WEEK_STANDINGS[3].standings.map(s => s.name);

  const scoreString = walkover ? "w/o" : [
    set1a && set1b ? `${set1a}-${set1b}` : null,
    set2a && set2b ? `${set2a}-${set2b}` : null,
    set3a && set3b ? `${set3a}-${set3b}${set3type === "tb10" ? " (10-pt TB)" : ""}` : null,
  ].filter(Boolean).join(", ");

  const isValid = p1Name && p2Name && winner && (walkover || (set1a && set1b && set2a && set2b));

  const buildMailto = () => {
    const typeLabel = matchType === "challenge" ? "CHALLENGE " : "";
    const subject = encodeURIComponent(`3.5 Ladder - Week 4 ${typeLabel}Score: ${p1Name} vs ${p2Name}`);
    const winnerName = winner === "p1" ? p1Name : p2Name;
    const body = encodeURIComponent(
      `Hi Kathy,\n\nReporting our Week 4 ${typeLabel}match result:\n\n` +
      `${p1Name} vs ${p2Name}\n` +
      `Score: ${scoreString}\n` +
      `Winner: ${winnerName}\n\nThanks!`
    );
    const p1Email = PLAYER_DIRECTORY[p1Name]?.email || "";
    const p2Email = PLAYER_DIRECTORY[p2Name]?.email || "";
    const ccList = [p1Email, p2Email].filter(Boolean).join(",");
    const ccParam = ccList ? `&cc=${encodeURIComponent(ccList)}` : "";
    return `mailto:${KATHY_EMAIL}?subject=${subject}${ccParam}&body=${body}`;
  };

  const inp = { padding:"8px 12px",fontSize:14,border:"1px solid #d6d3d1",borderRadius:8,outline:"none",background:"#fff",width:"100%",boxSizing:"border-box" };
  const sel = { ...inp, appearance:"auto" };
  const lbl = { fontSize:12,fontWeight:600,color:"#57534e",display:"block",marginBottom:4 };
  const sci = { ...inp,width:52,textAlign:"center",padding:"8px 4px",fontSize:18,fontWeight:700,fontFamily:"'SF Mono',monospace" };

  const resetForm = () => { setSent(false); setSelectedMatch(""); setWinner(""); setSet1a(""); setSet1b(""); setSet2a(""); setSet2b(""); setSet3a(""); setSet3b(""); setWalkover(false); setChallengeP1(""); setChallengeP2(""); };

  if (sent) return (
    <div style={{textAlign:"center",padding:"40px 20px"}}>
      <div style={{fontSize:48,marginBottom:12}}>&#9989;</div>
      <h3 style={{margin:"0 0 8px",fontSize:18,fontWeight:700}}>Email Ready!</h3>
      <p style={{fontSize:13,color:"#78716c",margin:"0 0 20px"}}>Your email client should have opened with the score pre-filled. Just hit send.</p>
      <button onClick={resetForm} style={{padding:"8px 20px",fontSize:13,background:"#1a472a",color:"#fff",border:"none",borderRadius:8,cursor:"pointer",fontWeight:600}}>Report Another Score</button>
    </div>
  );

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      {/* Match Type */}
      <div>
        <label style={lbl}>Match Type</label>
        <div style={{display:"flex",gap:0,borderRadius:8,overflow:"hidden",border:"1px solid #d6d3d1"}}>
          {[{id:"assigned",label:"Assigned Match"},{id:"challenge",label:"Challenge Match"}].map(t => (
            <button key={t.id} onClick={() => { setMatchType(t.id); setSelectedMatch(""); setWinner(""); setChallengeP1(""); setChallengeP2(""); }}
              style={{flex:1,padding:"8px 12px",fontSize:13,fontWeight:matchType===t.id?700:400,background:matchType===t.id?"#1a472a":"#fff",color:matchType===t.id?"#fff":"#44403c",border:"none",cursor:"pointer"}}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* Match Selection */}
      {matchType === "assigned" ? (
        <div>
          <label style={lbl}>Select Your Match</label>
          <select value={selectedMatch} onChange={e => { setSelectedMatch(e.target.value); setWinner(""); }} style={sel}>
            <option value="">Choose match...</option>
            {WEEK4_ASSIGNMENTS.map(([a,b], i) => <option key={i} value={i}>{a} vs {b}</option>)}
          </select>
        </div>
      ) : (
        <div style={{display:"flex",gap:12}}>
          <div style={{flex:1}}>
            <label style={lbl}>Challenger</label>
            <select value={challengeP1} onChange={e => { setChallengeP1(e.target.value); setWinner(""); }} style={sel}>
              <option value="">Select player...</option>
              {currentPlayers.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div style={{flex:1}}>
            <label style={lbl}>Opponent</label>
            <select value={challengeP2} onChange={e => { setChallengeP2(e.target.value); setWinner(""); }} style={sel}>
              <option value="">Select player...</option>
              {currentPlayers.filter(p => p !== challengeP1).map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>
      )}

      {/* Walkover */}
      {(p1Name && p2Name) && (
        <label style={{display:"flex",alignItems:"center",gap:8,fontSize:13,cursor:"pointer",color:"#57534e"}}>
          <input type="checkbox" checked={walkover} onChange={e => setWalkover(e.target.checked)} style={{width:16,height:16,accentColor:"#1a472a"}}/>
          Walkover (opponent didn't show / withdrew)
        </label>
      )}

      {/* Scores */}
      {(p1Name && p2Name && !walkover) && (
        <div>
          <label style={lbl}>Score</label>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <div style={{display:"grid",gridTemplateColumns:"80px 52px 20px 52px",gap:8,alignItems:"center",fontSize:11,fontWeight:600,color:"#a8a29e"}}>
              <span></span><span style={{textAlign:"center"}}>{p1Name.split(" ").pop()}</span><span></span><span style={{textAlign:"center"}}>{p2Name.split(" ").pop()}</span>
            </div>
            {/* Set 1 */}
            <div style={{display:"grid",gridTemplateColumns:"80px 52px 20px 52px",gap:8,alignItems:"center"}}>
              <span style={{fontSize:12,fontWeight:600,color:"#57534e"}}>Set 1</span>
              <input type="number" min="0" max="7" value={set1a} onChange={e => setSet1a(e.target.value)} style={sci}/>
              <span style={{textAlign:"center",color:"#d6d3d1",fontWeight:700}}>:</span>
              <input type="number" min="0" max="7" value={set1b} onChange={e => setSet1b(e.target.value)} style={sci}/>
            </div>
            {/* Set 2 */}
            <div style={{display:"grid",gridTemplateColumns:"80px 52px 20px 52px",gap:8,alignItems:"center"}}>
              <span style={{fontSize:12,fontWeight:600,color:"#57534e"}}>Set 2</span>
              <input type="number" min="0" max="7" value={set2a} onChange={e => setSet2a(e.target.value)} style={sci}/>
              <span style={{textAlign:"center",color:"#d6d3d1",fontWeight:700}}>:</span>
              <input type="number" min="0" max="7" value={set2b} onChange={e => setSet2b(e.target.value)} style={sci}/>
            </div>
            {/* Set 3 / TB */}
            <div style={{display:"grid",gridTemplateColumns:"80px 52px 20px 52px",gap:8,alignItems:"center"}}>
              <select value={set3type} onChange={e => setSet3type(e.target.value)}
                style={{fontSize:11,border:"1px solid #d6d3d1",borderRadius:4,padding:"2px 4px",background:"#fff",color:"#57534e"}}>
                <option value="set">Set 3</option>
                <option value="tb10">10-pt TB</option>
              </select>
              <input type="number" min="0" max={set3type==="tb10"?"15":"7"} value={set3a} onChange={e => setSet3a(e.target.value)} style={sci} placeholder="-"/>
              <span style={{textAlign:"center",color:"#d6d3d1",fontWeight:700}}>:</span>
              <input type="number" min="0" max={set3type==="tb10"?"15":"7"} value={set3b} onChange={e => setSet3b(e.target.value)} style={sci} placeholder="-"/>
            </div>
          </div>
        </div>
      )}

      {/* Winner */}
      {(p1Name && p2Name) && (
        <div>
          <label style={lbl}>Winner</label>
          <div style={{display:"flex",gap:8}}>
            {[{id:"p1",name:p1Name},{id:"p2",name:p2Name}].map(opt => (
              <button key={opt.id} onClick={() => setWinner(opt.id)}
                style={{flex:1,padding:"10px 12px",fontSize:13,fontWeight:winner===opt.id?700:400,
                  background:winner===opt.id?"#f0fdf4":"#fff",color:winner===opt.id?"#16a34a":"#44403c",
                  border:winner===opt.id?"2px solid #16a34a":"1px solid #d6d3d1",borderRadius:8,cursor:"pointer",transition:"all 0.1s"}}>
                {winner===opt.id && "\u2713 "}{opt.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Preview */}
      {isValid && (
        <div style={{background:"#f5f5f4",borderRadius:8,padding:12,fontSize:13,color:"#44403c",lineHeight:1.6}}>
          <div style={{fontWeight:600,marginBottom:4,fontSize:11,color:"#a8a29e",textTransform:"uppercase"}}>Email Preview</div>
          <div><strong>To:</strong> {KATHY_EMAIL}</div>
          <div><strong>Subject:</strong> 3.5 Ladder - Week 4 {matchType==="challenge"?"CHALLENGE ":""}Score: {p1Name} vs {p2Name}</div>
          <div style={{marginTop:8}}>{p1Name} vs {p2Name}<br/>Score: {scoreString}<br/>Winner: {winner === "p1" ? p1Name : p2Name}</div>
        </div>
      )}

      <a href={isValid ? buildMailto() : undefined} onClick={() => { if (isValid) setSent(true); }}
        style={{display:"block",textAlign:"center",padding:"12px 20px",fontSize:14,fontWeight:700,
          background:isValid?"#1a472a":"#d6d3d1",color:isValid?"#fff":"#a8a29e",
          border:"none",borderRadius:10,cursor:isValid?"pointer":"not-allowed",textDecoration:"none",
          transition:"all 0.15s",pointerEvents:isValid?"auto":"none"}}>
        Open in Email &rarr;
      </a>
      <p style={{fontSize:11,color:"#a8a29e",textAlign:"center",margin:0}}>Opens your email client with the score pre-filled. You and your opponent will be CC'd if emails are on file.</p>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────
export default function TennisLadderTracker() {
  const [view, setView] = useState("standings");
  const [selectedWeek, setSelectedWeek] = useState(4);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dirSearch, setDirSearch] = useState("");
  const [standingsMode, setStandingsMode] = useState("assigned"); // "assigned" (official) or "all"
  const [resultFilter, setResultFilter] = useState("all"); // "all", "assigned", "challenge"

  const currentStandings = WEEK_STANDINGS[selectedWeek - 1]?.standings || [];
  const prevStandings = selectedWeek > 1 ? WEEK_STANDINGS[selectedWeek - 2]?.standings : null;

  const filteredStandings = useMemo(() => {
    if (!searchTerm) return currentStandings;
    return currentStandings.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [currentStandings, searchTerm]);

  const getRankChange = (name) => {
    if (!prevStandings) return 0;
    const prev = prevStandings.find(s => s.name === name);
    const curr = currentStandings.find(s => s.name === name);
    if (!prev || !curr) return 0;
    return prev.rank - curr.rank;
  };

  const playerDetail = selectedPlayer ? {
    name: selectedPlayer,
    record: getPlayerRecord(selectedPlayer),
    matches: getPlayerMatches(selectedPlayer),
    challenges: getChallengeCount(selectedPlayer),
    movement: getMovement(selectedPlayer),
    currentRank: currentStandings.find(s => s.name === selectedPlayer)?.rank,
    currentPoints: currentStandings.find(s => s.name === selectedPlayer)?.points,
  } : null;

  const directoryList = useMemo(() => {
    const list = WEEK_STANDINGS[3].standings.map(s => ({
      name: s.name, rank: s.rank,
      phone: PLAYER_DIRECTORY[s.name]?.phone || "",
      email: PLAYER_DIRECTORY[s.name]?.email || "",
    }));
    list.sort((a,b) => a.name.localeCompare(b.name));
    if (!dirSearch) return list;
    return list.filter(p => p.name.toLowerCase().includes(dirSearch.toLowerCase()));
  }, [dirSearch]);

  const TABS = [
    {id:"standings",label:"Standings"},
    {id:"results",label:"Results"},
    {id:"week4",label:"This Week"},
    {id:"report",label:"Report Score"},
    {id:"directory",label:"Players"},
    {id:"stats",label:"Stats"}
  ];

  return (
    <div style={{fontFamily:"'Instrument Sans','SF Pro Display',-apple-system,sans-serif",maxWidth:800,margin:"0 auto",background:"#fafaf9",minHeight:"100vh",color:"#1c1917"}}>

      {/* Header */}
      <div style={{background:"linear-gradient(135deg, #1a472a 0%, #2d5016 100%)",padding:"24px 20px 16px",color:"#fff"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
          <span style={{fontSize:28}}>&#127934;</span>
          <div>
            <h1 style={{margin:0,fontSize:22,fontWeight:700,letterSpacing:"-0.02em"}}>Spring 2026 Ladder</h1>
            <p style={{margin:0,fontSize:12,opacity:0.75,marginTop:2}}>Men's 3.5 Singles &middot; Feb 25 - Apr 22 &middot; 36 Players</p>
          </div>
        </div>
        <div style={{display:"flex",gap:4,marginTop:14,flexWrap:"wrap"}}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => {setView(tab.id); setSelectedPlayer(null);}}
              style={{padding:"6px 12px",fontSize:12,fontWeight:view===tab.id?700:500,
                background:view===tab.id?"rgba(255,255,255,0.2)":"transparent",
                color:"#fff",border:"1px solid rgba(255,255,255,0.2)",borderRadius:20,cursor:"pointer",transition:"all 0.15s"}}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{padding:"16px 16px 40px"}}>

        {/* Player Detail */}
        {selectedPlayer && playerDetail && (
          <div style={{background:"#fff",borderRadius:12,padding:20,marginBottom:16,border:"1px solid #e7e5e4",boxShadow:"0 1px 3px rgba(0,0,0,0.06)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
              <div>
                <h2 style={{margin:0,fontSize:20,fontWeight:700}}>{playerDetail.name}</h2>
                <p style={{margin:"4px 0 0",fontSize:13,color:"#78716c"}}>
                  Rank #{playerDetail.currentRank} &middot; {playerDetail.currentPoints} pts &middot; {playerDetail.record.wins}W-{playerDetail.record.losses}L
                  {playerDetail.challenges > 0 ? ` \u00B7 ${playerDetail.challenges} challenge${playerDetail.challenges>1?"s":""}` : ""}
                </p>
                {playerDetail.challenges > 0 && (() => {
                  const aRec = getRecordByType(selectedPlayer, "assigned");
                  const cRec = getRecordByType(selectedPlayer, "challenge");
                  return (
                    <p style={{margin:"2px 0 0",fontSize:11,color:"#a8a29e"}}>
                      Assigned: {aRec.wins}W-{aRec.losses}L &middot; Challenge: {cRec.wins}W-{cRec.losses}L
                    </p>
                  );
                })()}
                {(PLAYER_DIRECTORY[selectedPlayer]?.phone || PLAYER_DIRECTORY[selectedPlayer]?.email) && (
                  <p style={{margin:"4px 0 0",fontSize:12,color:"#a8a29e"}}>
                    {PLAYER_DIRECTORY[selectedPlayer]?.phone && <a href={`tel:${PLAYER_DIRECTORY[selectedPlayer].phone}`} style={{color:"#2563eb",textDecoration:"none",marginRight:12}}>{PLAYER_DIRECTORY[selectedPlayer].phone}</a>}
                    {PLAYER_DIRECTORY[selectedPlayer]?.email && <a href={`mailto:${PLAYER_DIRECTORY[selectedPlayer].email}`} style={{color:"#2563eb",textDecoration:"none"}}>{PLAYER_DIRECTORY[selectedPlayer].email}</a>}
                  </p>
                )}
              </div>
              <button onClick={() => setSelectedPlayer(null)} style={{background:"#f5f5f4",border:"none",borderRadius:8,padding:"4px 10px",cursor:"pointer",fontSize:16}}>&#10005;</button>
            </div>
            <RankChart playerName={selectedPlayer}/>
            <h3 style={{fontSize:14,fontWeight:600,marginTop:16,marginBottom:8,color:"#44403c"}}>Match History</h3>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {playerDetail.matches.map((m, i) => {
                const won = m.winner === selectedPlayer;
                const opponent = m.p1 === selectedPlayer ? m.p2 : m.p1;
                return (
                  <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",borderRadius:8,fontSize:13,
                    background:won?"#f0fdf4":"#fef2f2",border:won?"1px solid #bbf7d0":"1px solid #fecaca"}}>
                    <div>
                      <span style={{fontWeight:600,color:won?"#16a34a":"#dc2626"}}>{won ? "W" : "L"}</span>
                      <span style={{marginLeft:8}}>vs {opponent}</span>
                      <span style={{marginLeft:6,fontSize:10,
                        background:m.type === "challenge" ? "#fef3c7" : "#eff6ff",
                        color:m.type === "challenge" ? "#92400e" : "#2563eb",
                        padding:"1px 5px",borderRadius:4}}>{m.type === "challenge" ? "CHALLENGE" : "ASSIGNED"}</span>
                    </div>
                    <span style={{color:"#78716c",fontSize:12,fontFamily:"'SF Mono',monospace"}}>Wk{m.week} &middot; {m.score}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Standings */}
        {view === "standings" && !selectedPlayer && (() => {
          const assignedRankings = standingsMode === "assigned" ? computePointStandings("assigned") : null;
          const displayList = standingsMode === "all"
            ? filteredStandings
            : (() => {
                let list = assignedRankings || [];
                if (searchTerm) list = list.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
                return list;
              })();

          return (
            <>
              {/* Week selector + search */}
              <div style={{display:"flex",gap:8,marginBottom:8,alignItems:"center",flexWrap:"wrap"}}>
                {standingsMode === "all" && WEEK_STANDINGS.map(ws => (
                  <button key={ws.week} onClick={() => setSelectedWeek(ws.week)}
                    style={{padding:"5px 12px",fontSize:12,fontWeight:selectedWeek===ws.week?700:400,
                      background:selectedWeek===ws.week?"#1a472a":"#fff",color:selectedWeek===ws.week?"#fff":"#44403c",
                      border:"1px solid #d6d3d1",borderRadius:16,cursor:"pointer"}}>
                    Wk {ws.week}
                  </button>
                ))}
                <input type="text" placeholder="Search player..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                  style={{marginLeft:"auto",padding:"5px 12px",fontSize:12,border:"1px solid #d6d3d1",borderRadius:16,outline:"none",width:140,background:"#fff"}}/>
              </div>

              {/* Assigned vs All toggle */}
              <div style={{display:"flex",gap:0,borderRadius:8,overflow:"hidden",border:"1px solid #d6d3d1",marginBottom:12}}>
                {[{id:"assigned",label:"Official Standings (Assigned)"},{id:"all",label:"All Matches (incl Challenges)"}].map(t => (
                  <button key={t.id} onClick={() => setStandingsMode(t.id)}
                    style={{flex:1,padding:"7px 12px",fontSize:12,fontWeight:standingsMode===t.id?700:400,
                      background:standingsMode===t.id?"#1a472a":"#fff",color:standingsMode===t.id?"#fff":"#44403c",
                      border:"none",cursor:"pointer",transition:"all 0.15s"}}>
                    {t.label}
                  </button>
                ))}
              </div>

              {standingsMode === "all" && (
                <div style={{background:"#fef3c7",border:"1px solid #fde68a",borderRadius:8,padding:"8px 12px",marginBottom:12,fontSize:12,color:"#92400e"}}>
                  Includes challenge matches. Official ladder prize is based on assigned matches only.
                </div>
              )}

              <div style={{background:"#fff",borderRadius:12,border:"1px solid #e7e5e4",overflow:"hidden"}}>
                {standingsMode === "all" ? (
                  <>
                    <div style={{display:"grid",gridTemplateColumns:"42px 1fr 60px 70px 100px",padding:"8px 12px",fontSize:11,fontWeight:600,color:"#a8a29e",borderBottom:"1px solid #e7e5e4",textTransform:"uppercase",letterSpacing:"0.05em"}}>
                      <span>#</span><span>Player</span><span>Pts</span><span>Move</span><span>Trend</span>
                    </div>
                    {displayList.map(s => {
                      const change = getRankChange(s.name);
                      const isAaron = s.name === "Aaron Pattillo";
                      const chCount = getChallengeCount(s.name);
                      return (
                        <div key={s.name} onClick={() => setSelectedPlayer(s.name)}
                          style={{display:"grid",gridTemplateColumns:"42px 1fr 60px 70px 100px",padding:"10px 12px",fontSize:13,cursor:"pointer",alignItems:"center",
                            borderBottom:"1px solid #f5f5f4",background:isAaron?"#eff6ff":"transparent",transition:"background 0.1s"}}
                          onMouseEnter={e => { if(!isAaron) e.currentTarget.style.background="#fafaf9"; }}
                          onMouseLeave={e => { if(!isAaron) e.currentTarget.style.background="transparent"; }}>
                          <span style={{fontWeight:700,color:s.rank<=3?"#1a472a":"#78716c",fontSize:14}}>{s.rank}</span>
                          <span style={{fontWeight:isAaron?700:500}}>
                            {s.name}
                            {isAaron && <span style={{marginLeft:6,fontSize:9,background:"#2563eb",color:"#fff",padding:"1px 5px",borderRadius:4,verticalAlign:"middle"}}>YOU</span>}
                            {chCount > 0 && <span style={{marginLeft:6,fontSize:9,background:"#fef3c7",color:"#92400e",padding:"1px 5px",borderRadius:4,verticalAlign:"middle"}}>{chCount}CH</span>}
                          </span>
                          <span style={{fontWeight:600,color:"#44403c"}}>{s.points ?? "\u2014"}</span>
                          <span style={{fontWeight:600,fontSize:12,color:change>0?"#16a34a":change<0?"#dc2626":"#a8a29e"}}>
                            {change > 0 ? `\u25B2${change}` : change < 0 ? `\u25BC${Math.abs(change)}` : "\u2014"}
                          </span>
                          <RankSparkline playerName={s.name}/>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <div style={{display:"grid",gridTemplateColumns:"42px 1fr 60px 80px",padding:"8px 12px",fontSize:11,fontWeight:600,color:"#a8a29e",borderBottom:"1px solid #e7e5e4",textTransform:"uppercase",letterSpacing:"0.05em"}}>
                      <span>#</span><span>Player</span><span>Pts</span><span>Record</span>
                    </div>
                    {displayList.map((s, idx) => {
                      const isAaron = s.name === "Aaron Pattillo";
                      return (
                        <div key={s.name} onClick={() => setSelectedPlayer(s.name)}
                          style={{display:"grid",gridTemplateColumns:"42px 1fr 60px 80px",padding:"10px 12px",fontSize:13,cursor:"pointer",alignItems:"center",
                            borderBottom:"1px solid #f5f5f4",background:isAaron?"#eff6ff":"transparent",transition:"background 0.1s"}}
                          onMouseEnter={e => { if(!isAaron) e.currentTarget.style.background="#fafaf9"; }}
                          onMouseLeave={e => { if(!isAaron) e.currentTarget.style.background="transparent"; }}>
                          <span style={{fontWeight:700,color:s.rank<=3?"#1a472a":"#78716c",fontSize:14}}>{s.rank}</span>
                          <span style={{fontWeight:isAaron?700:500}}>
                            {s.name}
                            {isAaron && <span style={{marginLeft:6,fontSize:9,background:"#2563eb",color:"#fff",padding:"1px 5px",borderRadius:4,verticalAlign:"middle"}}>YOU</span>}
                          </span>
                          <span style={{fontWeight:600,color:"#44403c"}}>{s.points}</span>
                          <span style={{fontWeight:600,color:"#16a34a",fontSize:12}}>{s.wins}W-{s.losses}L</span>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </>
          );
        })()}

        {/* Results */}
        {view === "results" && !selectedPlayer && (() => {
          const weekNum = selectedWeek - 1;
          const weekMatches = MATCHES.filter(m => m.week === weekNum);
          const assignedMatches = weekMatches.filter(m => m.type === "assigned");
          const challengeMatches = weekMatches.filter(m => m.type === "challenge");
          const showAssigned = resultFilter === "all" || resultFilter === "assigned";
          const showChallenge = resultFilter === "all" || resultFilter === "challenge";

          const MatchRow = ({ m, i, isLast }) => (
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",
              borderBottom:!isLast?"1px solid #f5f5f4":"none",fontSize:13}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{fontWeight:m.winner===m.p1?700:400,color:m.winner===m.p1?"#16a34a":"#78716c"}}>{m.p1}</span>
                <span style={{color:"#d6d3d1",fontSize:11}}>vs</span>
                <span style={{fontWeight:m.winner===m.p2?700:400,color:m.winner===m.p2?"#16a34a":"#78716c"}}>{m.p2}</span>
              </div>
              <span style={{color:"#a8a29e",fontSize:12,fontFamily:"'SF Mono',monospace"}}>{m.score}</span>
            </div>
          );

          return (
            <>
              {/* Week selector */}
              <div style={{display:"flex",gap:8,marginBottom:8}}>
                {[1,2,3].map(w => (
                  <button key={w} onClick={() => setSelectedWeek(w+1)}
                    style={{padding:"5px 12px",fontSize:12,fontWeight:selectedWeek===w+1?700:400,
                      background:selectedWeek===w+1?"#1a472a":"#fff",color:selectedWeek===w+1?"#fff":"#44403c",
                      border:"1px solid #d6d3d1",borderRadius:16,cursor:"pointer"}}>
                    Wk {w}
                  </button>
                ))}
              </div>

              {/* Match type filter */}
              <div style={{display:"flex",gap:0,borderRadius:8,overflow:"hidden",border:"1px solid #d6d3d1",marginBottom:12}}>
                {[{id:"all",label:"All Matches"},{id:"assigned",label:"Assigned"},{id:"challenge",label:`Challenges${challengeMatches.length?` (${challengeMatches.length})`:""}`}].map(t => (
                  <button key={t.id} onClick={() => setResultFilter(t.id)}
                    style={{flex:1,padding:"7px 12px",fontSize:12,fontWeight:resultFilter===t.id?700:400,
                      background:resultFilter===t.id?"#1a472a":"#fff",color:resultFilter===t.id?"#fff":"#44403c",
                      border:"none",cursor:"pointer",transition:"all 0.15s"}}>
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Assigned matches */}
              {showAssigned && assignedMatches.length > 0 && (
                <div style={{background:"#fff",borderRadius:12,border:"1px solid #e7e5e4",padding:16,marginBottom:challengeMatches.length > 0 && showChallenge ? 12 : 0}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                    <h3 style={{margin:0,fontSize:15,fontWeight:700}}>Week {weekNum} Assigned Matches</h3>
                    <span style={{fontSize:11,background:"#e7e5e4",color:"#57534e",padding:"2px 8px",borderRadius:10}}>{assignedMatches.length}</span>
                  </div>
                  {assignedMatches.map((m, i) => <MatchRow key={i} m={m} i={i} isLast={i === assignedMatches.length - 1}/>)}
                </div>
              )}

              {/* Challenge matches */}
              {showChallenge && challengeMatches.length > 0 && (
                <div style={{background:"#fffbeb",borderRadius:12,border:"1px solid #fde68a",padding:16}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                    <h3 style={{margin:0,fontSize:15,fontWeight:700,color:"#92400e"}}>Week {weekNum} Challenge Matches</h3>
                    <span style={{fontSize:11,background:"#fef3c7",color:"#92400e",padding:"2px 8px",borderRadius:10}}>{challengeMatches.length}</span>
                  </div>
                  {challengeMatches.map((m, i) => <MatchRow key={i} m={m} i={i} isLast={i === challengeMatches.length - 1}/>)}
                </div>
              )}

              {showChallenge && challengeMatches.length === 0 && resultFilter === "challenge" && (
                <div style={{background:"#fff",borderRadius:12,border:"1px solid #e7e5e4",padding:"32px 16px",textAlign:"center"}}>
                  <p style={{fontSize:13,color:"#a8a29e",margin:0}}>No challenge matches were played in Week {weekNum}.</p>
                </div>
              )}
            </>
          );
        })()}

        {/* This Week */}
        {view === "week4" && !selectedPlayer && (
          <div style={{background:"#fff",borderRadius:12,border:"1px solid #e7e5e4",padding:16}}>
            <h3 style={{margin:"0 0 4px",fontSize:15,fontWeight:700}}>Week 4 Assignments</h3>
            <p style={{margin:"0 0 14px",fontSize:12,color:"#78716c"}}>Scores due Wednesday, April 1 by 8:00pm</p>
            {WEEK4_ASSIGNMENTS.map(([a, b], i) => {
              const isYours = a === "Aaron Pattillo" || b === "Aaron Pattillo";
              const aRank = WEEK_STANDINGS[3].standings.find(s => s.name === a)?.rank;
              const bRank = WEEK_STANDINGS[3].standings.find(s => s.name === b)?.rank;
              return (
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 12px",borderRadius:8,marginBottom:4,fontSize:13,
                  background:isYours?"#eff6ff":(i%2===0?"#fafaf9":"#fff"),border:isYours?"2px solid #93c5fd":"1px solid transparent"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:11,color:"#a8a29e",width:20}}>#{aRank}</span>
                    <span style={{fontWeight:600}}>{a}</span>
                    <span style={{color:"#d6d3d1",fontSize:11}}>vs</span>
                    <span style={{fontWeight:600}}>{b}</span>
                    <span style={{fontSize:11,color:"#a8a29e"}}>#{bRank}</span>
                  </div>
                  {isYours && <span style={{fontSize:10,background:"#2563eb",color:"#fff",padding:"2px 6px",borderRadius:4}}>YOUR MATCH</span>}
                </div>
              );
            })}
          </div>
        )}

        {/* Report Score */}
        {view === "report" && !selectedPlayer && (
          <div style={{background:"#fff",borderRadius:12,border:"1px solid #e7e5e4",padding:20}}>
            <h3 style={{margin:"0 0 4px",fontSize:15,fontWeight:700}}>Report a Score</h3>
            <p style={{margin:"0 0 16px",fontSize:12,color:"#78716c"}}>Fill in the match details below. This opens a pre-formatted email to Kathy with your opponent CC'd.</p>
            <ScoreReportForm/>
          </div>
        )}

        {/* Directory */}
        {view === "directory" && !selectedPlayer && (
          <div>
            <div style={{marginBottom:12}}>
              <input type="text" placeholder="Search players..." value={dirSearch} onChange={e => setDirSearch(e.target.value)}
                style={{padding:"8px 14px",fontSize:13,border:"1px solid #d6d3d1",borderRadius:20,outline:"none",width:"100%",boxSizing:"border-box",background:"#fff"}}/>
            </div>
            <div style={{background:"#fff",borderRadius:12,border:"1px solid #e7e5e4",overflow:"hidden"}}>
              <div style={{display:"grid",gridTemplateColumns:"36px 1fr 1fr 1fr",padding:"8px 12px",fontSize:11,fontWeight:600,color:"#a8a29e",
                borderBottom:"1px solid #e7e5e4",textTransform:"uppercase",letterSpacing:"0.05em"}}>
                <span>#</span><span>Name</span><span>Phone</span><span>Email</span>
              </div>
              {directoryList.map((p, i) => {
                const isAaron = p.name === "Aaron Pattillo";
                return (
                  <div key={p.name} style={{display:"grid",gridTemplateColumns:"36px 1fr 1fr 1fr",padding:"10px 12px",fontSize:13,alignItems:"center",
                    borderBottom:i<directoryList.length-1?"1px solid #f5f5f4":"none",background:isAaron?"#eff6ff":"transparent"}}>
                    <span style={{fontWeight:600,color:"#a8a29e",fontSize:11}}>{p.rank}</span>
                    <span style={{fontWeight:isAaron?700:500,cursor:"pointer"}} onClick={() => setSelectedPlayer(p.name)}>
                      {p.name}
                      {isAaron && <span style={{marginLeft:6,fontSize:9,background:"#2563eb",color:"#fff",padding:"1px 5px",borderRadius:4,verticalAlign:"middle"}}>YOU</span>}
                    </span>
                    <span style={{color:p.phone?"#44403c":"#d6d3d1",fontSize:12}}>
                      {p.phone ? <a href={`tel:${p.phone}`} style={{color:"#2563eb",textDecoration:"none"}}>{p.phone}</a> : "Not listed"}
                    </span>
                    <span style={{color:p.email?"#44403c":"#d6d3d1",fontSize:12,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                      {p.email ? <a href={`mailto:${p.email}`} style={{color:"#2563eb",textDecoration:"none"}}>{p.email}</a> : "Not listed"}
                    </span>
                  </div>
                );
              })}
            </div>
            <p style={{fontSize:11,color:"#a8a29e",textAlign:"center",marginTop:12}}>Contact info from Kathy's registration list. Tap a name to see their ladder stats.</p>
          </div>
        )}

        {/* Stats */}
        {view === "stats" && !selectedPlayer && (() => {
          const allPlayers = WEEK_STANDINGS[3].standings;
          const rec = allPlayers.map(s => ({name:s.name,...getPlayerRecord(s.name),challenges:getChallengeCount(s.name),movement:getMovement(s.name),points:s.points}));
          const topWins = [...rec].sort((a,b) => b.wins - a.wins).slice(0,8);
          const climbers = [...rec].sort((a,b) => b.movement - a.movement).slice(0,5);
          const fallers = [...rec].sort((a,b) => a.movement - b.movement).slice(0,5);
          const challLeaders = rec.filter(r => r.challenges > 0).sort((a,b) => b.challenges - a.challenges);

          const StatCard = ({title,subtitle,items,renderRight}) => (
            <div style={{background:"#fff",borderRadius:12,border:"1px solid #e7e5e4",padding:16}}>
              <h3 style={{margin:"0 0 2px",fontSize:15,fontWeight:700}}>{title}</h3>
              {subtitle && <p style={{margin:"0 0 10px",fontSize:11,color:"#78716c"}}>{subtitle}</p>}
              {!subtitle && <div style={{marginBottom:10}}/>}
              {items.map((r,i) => (
                <div key={r.name} onClick={() => setSelectedPlayer(r.name)}
                  style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",cursor:"pointer",fontSize:13,
                    borderBottom:i<items.length-1?"1px solid #f5f5f4":"none"}}>
                  <span style={{fontWeight:500}}>{r.name}</span>
                  {renderRight(r)}
                </div>
              ))}
            </div>
          );

          return (
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              <StatCard title="Most Wins" items={topWins}
                renderRight={r => <span style={{color:"#16a34a",fontWeight:700}}>{r.wins}W-{r.losses}L</span>}/>
              <StatCard title="Biggest Climbers" items={climbers}
                renderRight={r => <span style={{color:r.movement>0?"#16a34a":"#dc2626",fontWeight:700}}>{r.movement>0?`\u25B2 ${r.movement}`:`\u25BC ${Math.abs(r.movement)}`} spots</span>}/>
              <StatCard title="Biggest Drops" items={fallers}
                renderRight={r => <span style={{color:r.movement>0?"#16a34a":"#dc2626",fontWeight:700}}>{r.movement>0?`\u25B2 ${r.movement}`:`\u25BC ${Math.abs(r.movement)}`} spots</span>}/>
              <StatCard title="Challenge Match Leaders" subtitle="Prize: most challenges played (min 3). Tie broken by games won."
                items={challLeaders.length?challLeaders:[{name:"No challenge matches yet",challenges:0}]}
                renderRight={r => r.challenges ? <span style={{fontWeight:700,color:"#92400e"}}>{r.challenges} challenge{r.challenges>1?"s":""}</span> : null}/>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
