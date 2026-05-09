export const CONTACT_INFO = {
  phone: '5585981254006',
  whatsappMessage: 'Olá! Vi seu portfólio e gostaria de conversar sobre a criação de um site para o meu negócio.',
  instagram: 'triumtech_',
  email: 'contato@triumtech.com.br', // Reservado para uso futuro
};

export const getWhatsAppUrl = () => {
  const encodedMessage = encodeURIComponent(CONTACT_INFO.whatsappMessage);
  return `https://wa.me/${CONTACT_INFO.phone}?text=${encodedMessage}`;
};

export const getInstagramUrl = () => `https://www.instagram.com/${CONTACT_INFO.instagram}/`;
