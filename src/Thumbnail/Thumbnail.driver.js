import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const thumbnailDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),

    /** Get the current count */
    getCountText: async () => base.$('[data-hook="thumbnail-count"]').text(),

    /** Click the button */
    clickButton: async () => base.$('[data-hook="thumbnail-button"]').click(),

    /** Get the button's text */
    getButtonText: async () => base.$('[data-hook="thumbnail-button"]').text(),
  };
};
