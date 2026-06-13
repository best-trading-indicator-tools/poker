/* ================= GAME MODE REGISTRY ================= */
const MODES={};
function registerMode(id,hooks){MODES[id]=hooks;}
function getMode(cfg){
  const id=(cfg||state?.cfg)?.gameType||'sng';
  return MODES[id]||MODES.sng;
}
function isCashGame(cfg){return (cfg||state?.cfg)?.gameType==='cash';}
