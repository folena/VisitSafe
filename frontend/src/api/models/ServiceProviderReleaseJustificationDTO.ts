export type ServiceProviderReleaseJustificationDTO = {
  /**
   * @description Justification for late exit
   * @type string
   */
  justification: string
  /**
   * @description Base64 encoded image data
   * @type string | undefined
   */
  imageData?: string
  /**
   * @description Image MIME type (e.g., image/jpeg, image/png)
   * @type string | undefined
   */
  imageType?: string
  /**
   * @description Time when the resident was notified about the late exit
   * @type string | undefined
   */
  notificationTime?: string
}