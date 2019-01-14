import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { getStylableState } from '../../test/utils/stylable-uni-testkit';
import thumbnail from './Thumbnail.st.css';

export const thumbnailDriverFactory = base => {
  const getSelectedIcon = async () =>
    base.$('[data-hook="thumbnail-selected-icon"]');

  const getImage = async () => base.$('[data-hook="thumbnail-image"]');

  return {
    ...baseUniDriverFactory(base),

    /** Get thumbnail title */
    getTitle: async () => base.$('[data-hook="thumbnail-title"]').text(),

    /** Get thumbnail description */
    getDescription: async () =>
      base.$('[data-hook="thumbnail-description"]').text(),

    /** Get selected icon */
    getSelectedIcon,

    /** Does the selected icon exist */
    selectedIconExists: async () => !!getSelectedIcon(),

    /** Is Thumbnail selected */
    isSelected: async () => {
      const stylableState = await getStylableState(base, thumbnail, 'selected');
      return stylableState === 'true';
    },

    /** Is Thumbnail selected */
    isDisabled: async () => {
      const stylableState = await getStylableState(base, thumbnail, 'disabled');
      return stylableState === 'true';
    },

    /** Get thumbnail image */
    getImage,

    /** Does the thumbnails image exist */
    imageExists: async () => !!getImage(),
  };
};
