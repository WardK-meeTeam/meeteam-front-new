export const PROJECT_FALLBACK_IMAGE_SRC = '/brand/project_fallback.png';

export function getProjectImageSrc(src?: string | null) {
  return src?.trim() || PROJECT_FALLBACK_IMAGE_SRC;
}
