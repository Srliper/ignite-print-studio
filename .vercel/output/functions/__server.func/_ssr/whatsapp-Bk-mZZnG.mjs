const WHATSAPP_NUMBER = "5515981183740";
function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
export {
  WHATSAPP_NUMBER as W,
  openWhatsApp as o
};
