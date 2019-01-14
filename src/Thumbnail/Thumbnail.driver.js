import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { getStylableState } from '../../test/utils/stylable-uni-testkit';
import thumbnail from './Thumbnail.st.css';
import textDriverFactory from '../Text/Text.driver';
import { testkitFactoryCreator } from 'wix-ui-test-utils/vanilla';

const textTestkitFactory = testkitFactoryCreator(textDriverFactory);

export const thumbnailDriverFactory = base => {
  const byHook = hook => base.$(`[data-hook*="${hook}"]`);
  const getSelectedIcon = () => byHook('thumbnail-selected-icon');
  const getImage = () => byHook('thumbnail-image');
  const getDescription = () => byHook('thumbnail-description').text();
  const titleDriver = async () =>
    textTestkitFactory({
      wrapper: await byHook('thumbnail-title').getNative(),
      dataHook: 'thumbnail-title',
    });

  return {
    ...baseUniDriverFactory(base),

    /** Get thumbnail title */
    getTitle: async () => (await titleDriver()).getText(),

    /** Get thumbnail description */
    getDescription,

    /** Get selected icon */
    getSelectedIcon,

    getBackgroundImage: () => byHook('thumbnail-background-image'),

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
  };
};
