import React from 'react';
import { createUniDriverFactory } from 'wix-ui-test-utils/uni-driver-factory';

import Thumbnail from './Thumbnail';
import { thumbnailPrivateDriverFactory } from './Thumbnail.driver.private';

describe('Thumbnail', () => {
  const createDriver = createUniDriverFactory(thumbnailPrivateDriverFactory);

  it('should render', async () => {
    const driver = createDriver(<Thumbnail />);

    expect(await driver.exists()).toBeTruthy();
  });

  it('should allow adding title', async () => {
    const title = 'I am a title';
    const driver = createDriver(<Thumbnail title={title} />);

    expect(await driver.getTitle()).toEqual(title);
  });

  it('should allow adding description', async () => {
    const description = 'I am a description';
    const driver = createDriver(<Thumbnail description={description} />);

    expect(await driver.getDescription()).toEqual(description);
  });

  describe('Image', () => {
    it('should allow adding image URL', async () => {
      const driver = createDriver(<Thumbnail image="john.jpg" />);

      expect(await driver.imageExists()).toEqual(true);
    });

    it('should allow adding image node', async () => {
      const image = <div>boom</div>;
      const driver = createDriver(<Thumbnail image={image} />);

      expect(await driver.imageExists()).toEqual(true);
    });
  });

  describe('BackgroundImage', async () => {
    it('should allow adding backgroundImage as URL', async () => {
      const driver = await createDriver(
        <Thumbnail
          title="title"
          description="description"
          image="image.jpg"
          backgroundImage="john.jpg"
        />,
      );
      expect(await driver.getBackgroundImage().attr('style')).toEqual(
        'background-image: url(john.jpg);',
      );
    });

    it('should disable title, description and image', async () => {
      const driver = await createDriver(
        <Thumbnail
          title="title"
          description="description"
          image="image.jpg"
          backgroundImage="john.jpg"
        />,
      );
      expect(await driver.titleExists()).toEqual(false);
      expect(await driver.descriptionExists()).toEqual(false);
      expect(await driver.imageExists()).toEqual(false);
    });
  });

  describe('Selected', () => {
    const driver = createDriver(<Thumbnail selected />);

    it('should have selected icon', async () => {
      expect(await driver.selectedIconExists()).toEqual(true);
    });

    it('should have selected state', async () => {
      expect(await driver.isSelected()).toEqual(true);
    });
  });

  describe('Disabled', () => {
    const driver = createDriver(<Thumbnail disabled />);

    it('should have disabled state', async () => {
      expect(await driver.isDisabled()).toEqual(true);
    });
  });
});
