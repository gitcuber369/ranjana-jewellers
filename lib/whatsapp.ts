export const WHATSAPP_NUMBER = "919560019819";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export function absoluteImageUrl(image: string | null) {
  if (!image) return null;
  return image.startsWith("http") ? image : `${SITE_URL}${image}`;
}

export function enquiryWhatsAppLink(productName: string, image: string | null) {
  const lines = [
    `Hi Ranjana Jewellers, I'm interested in the ${productName}. Could you please share more details and pricing?`,
  ];
  const imageUrl = absoluteImageUrl(image);
  if (imageUrl) lines.push(imageUrl);
  if (SITE_URL) lines.push(`Website: ${SITE_URL}`);
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(lines.join("\n\n"))}`;
}

export function generalWhatsAppLink() {
  const text = `Hi Ranjana Jewellers, I'd like to know more about your jewellery collection and pricing.${
    SITE_URL ? `\n\nWebsite: ${SITE_URL}` : ""
  }`;
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(text)}`;
}

export function productShareLink({
  name,
  description,
  image,
}: {
  name: string;
  description: string;
  image: string | null;
}) {
  const lines = [`Check out this ${name} from Ranjana Jewellers!`];
  if (description) lines.push(description);
  const imageUrl = absoluteImageUrl(image);
  if (imageUrl) lines.push(imageUrl);
  if (SITE_URL) lines.push(`Website: ${SITE_URL}`);
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(lines.join("\n\n"))}`;
}
