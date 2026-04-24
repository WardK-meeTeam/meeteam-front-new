export const PROJECT_FALLBACK_IMAGE_SRC = '/brand/meeteam_character_fallback.png';

export function getProjectImageSrc(src?: string | null) {
  return src?.trim() || PROJECT_FALLBACK_IMAGE_SRC;
}
